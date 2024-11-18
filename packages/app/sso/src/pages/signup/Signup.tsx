import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Box from '@template-web/ui/components/Box';
import Icon from '@template-web/ui/components/Icon';
import Logo from '@template-web/ui/components/Logo';
import Slide from '@template-web/ui/animations/Slide';
import Stack from '@template-web/ui/components/Stack';
import Input from '@template-web/ui/components/Input';
import Button from '@template-web/ui/components/Button';
import Divider from '@template-web/ui/components/Divider';
import Loading from '@template-web/ui/components/Loading';
import { useAlert } from '@template-web/ui/components/Alert';
import Container from '@template-web/ui/components/Container';
import ButtonIcon from '@template-web/ui/components/ButtonIcon';
import Typography from '@template-web/ui/components/Typography';
import { Card, CardContent } from '@template-web/ui/components/Card';
import Form, { Control, FormControl, useForm } from '@template-web/ui/components/Form';

import logger from '@template-web/toolkit/logger';

import { authServices, url, userServices } from '@/services/core';

interface SignupForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const FIREBASE = {
    'auth/email-already-in-use': 'Email já em uso',
};

export default function Signup() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [type, setType] = useState<'text' | 'password'>('password');

    const { addAlert } = useAlert();

    const iconEye = type === 'text' ? 'eye-slash' : 'eye';

    const [formGroup] = useForm<SignupForm>({
        form: {
            name: new FormControl({ value: '', type: 'text', required: true }),
            email: new FormControl({ value: '', type: 'email', required: true }),
            password: new FormControl({ value: '', type: 'password', required: true }),
            confirmPassword: new FormControl({ value: '', type: 'password', required: true }),
        },
        handle: {
            submit(form) {
                setLoading(true);
                const { email, confirmPassword } = form.values;

                authServices.createUserWithPassword(email, confirmPassword)
                    .then((user) => {
                        logger.info('usuario criado no autenticador!', user);
                        return user;
                    })
                    .then((user) => userServices.createUser({
                        ...user,
                        ...{ picture: `https://robohash.org/${email}` }
                    }))
                    .then(() => logger.info('usuario criado com sucesso!'))
                    // .then(() => admissionServices.createAdmission(userServices.currentByToken.user_id))
                    .then(() => logger.info('admissão criada com sucesso!'))
                    .then(() => redirect())
                    .catch((e) => {
                        const { code } = e;

                        addAlert({
                            color: 'error',
                            message: FIREBASE[code] || 'Erro ao criar usuário',
                            icon: <Icon name="error" />,
                        });

                        logger.error('Erro ao criar ususario, ', { e });
                    })
                    .finally(() => setLoading(false));
            },
        },
        validator: {
            password: (form) => {
                const { password } = form.values;

                if (password.length < 6) {
                    return 'A senha deve ter no mínimo 6 caracteres';
                }

                return '';
            },
            confirmPassword: (form) => {
                const { password, confirmPassword } = form.values;

                if (confirmPassword && (confirmPassword !== password)) {
                    return 'As senhas devem ser iguais';
                }

                return '';
            }
        }
    }, []);

    const redirect = () => {
        const managerUrl = `${url.manager}?token=${authServices.access_token}&email=${formGroup.controls.email.value}`;
        logger.info('Redirecting to manager page:', managerUrl);
        window.open(managerUrl, '_self');
    };

    const toggleType = () => { setType(prev => prev === 'text' ? 'password' : 'text'); };

    const goToSignin = () => { navigate('/signin'); };

    return (
        <Slide enter direction="top">
            <Stack
                justifyContent="center"
                style={{ height: '100vh' }}
                sx={{ backgroundColor: ({ primary }) => primary.main }}
            >
                <Container sm="100%" md={500} lg={500}>
                    <Box sx={{ mb: 2 }} textAlign="center">
                        <Logo
                            width={200}
                            color="primary.contrastText"
                            style={{ margin: 'auto' }}
                        />
                    </Box>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" noMargin gutterBottom>Criar conta</Typography>

                            <Stack spacing="small">
                                <Form formGroup={formGroup}>
                                    <Stack spacing="small">
                                        <Control
                                            controlName="name"
                                            field={(control) => (
                                                <Input
                                                    fullWidth
                                                    gutterBottom
                                                    label="Name"
                                                    placeholder="ex: Desafio Template web"
                                                    data-cy="name-input"
                                                    value={control.value}
                                                    error={control.isInvalid}
                                                    helperText={control.messageError}
                                                />
                                            )}
                                        />
                                        <Control
                                            controlName="email"
                                            field={(control) => (
                                                <Input
                                                    fullWidth
                                                    gutterBottom
                                                    label="Email"
                                                    placeholder="ex: desafio@template-web.com"
                                                    data-cy="email-input"
                                                    value={control.value}
                                                    error={control.isInvalid}
                                                    helperText={control.messageError}
                                                />
                                            )}
                                        />
                                        <Control
                                            controlName="password"
                                            field={(control) => (
                                                <Input
                                                    fullWidth
                                                    gutterBottom
                                                    label="Senha"
                                                    data-cy="password-input"
                                                    type={type}
                                                    value={control.value}
                                                    error={control.isInvalid}
                                                    helperText={control.messageError}
                                                    endIcon={
                                                        <ButtonIcon onClick={toggleType}>
                                                            <Icon name={iconEye} />
                                                        </ButtonIcon>
                                                    }
                                                />
                                            )}
                                        />
                                        <Control
                                            controlName="confirmPassword"
                                            field={(control) => (
                                                <Input
                                                    required
                                                    fullWidth
                                                    gutterBottom
                                                    label="Confirmar senha"
                                                    data-cy="confirm-password-input"
                                                    type={type}
                                                    value={control.value}
                                                    error={control.isInvalid}
                                                    helperText={control.messageError}
                                                />
                                            )}
                                        />
                                        <Button
                                            fullWidth
                                            type="submit"
                                            size="large"
                                            data-cy="signup-submit"
                                            disabled={loading}
                                            loading={loading && <Loading />}
                                        >
                                            Criar conta
                                        </Button>
                                        <Divider />
                                        <Stack orientation="row" justifyContent="center">
                                            <Typography variant="body2" style={{ textAlign: 'center' }}>
                                                Já possui conta?
                                            </Typography>
                                            <Button
                                                noHover
                                                size="small"
                                                type="button"
                                                variant="text"
                                                data-cy="signin-button"
                                                onClick={goToSignin}
                                            >
                                                Entrar
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Form>
                            </Stack>
                        </CardContent>
                    </Card>
                </Container>
            </Stack>
        </Slide>
    );
}