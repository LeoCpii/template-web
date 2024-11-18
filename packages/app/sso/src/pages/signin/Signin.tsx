import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@template-web/ui/components/Box';
import Logo from '@template-web/ui/components/Logo';
import Icon from '@template-web/ui/components/Icon';
import Slide from '@template-web/ui/animations/Slide';
import Input from '@template-web/ui/components/Input';
import Stack from '@template-web/ui/components/Stack';
import Button from '@template-web/ui/components/Button';
import Divider from '@template-web/ui/components/Divider';
import Loading from '@template-web/ui/components/Loading';
import { useAlert } from '@template-web/ui/components/Alert';
import Container from '@template-web/ui/components/Container';
import ButtonIcon from '@template-web/ui/components/ButtonIcon';
import Typography from '@template-web/ui/components/Typography';
import { Card, CardContent } from '@template-web/ui/components/Card';
import Form, { Control, useForm, FormControl } from '@template-web/ui/components/Form';

import logger from '@template-web/toolkit/logger';

import { authServices, release, url } from '@/services/core';

const FIREBASE = {
    'auth/user-not-found': 'Email ou senha inválidos',
    'auth/wrong-password': 'Email ou senha inválidos',
    // eslint-disable-next-line max-len
    'auth/too-many-requests': 'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.',
};

function EmailAndPasswordForm() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [type, setType] = useState<'text' | 'password'>('password');

    const { addAlert } = useAlert();

    const iconEye = type === 'text' ? 'eye-slash' : 'eye';

    const [formGroup] = useForm<{ email: string; password: string }>({
        form: {
            email: new FormControl({ value: '', type: 'email', required: true }),
            password: new FormControl({ value: '', type: 'password', required: true }),
        },
        handle: {
            submit: (form) => {
                setLoading(true);
                const { email, password } = form.values;

                authServices.loginWithPassword(email, password)
                    .then(() => {
                        // redirect();
                        console.log('Logado');
                    })
                    .catch((e) => {
                        const { code } = e;

                        addAlert({
                            color: 'error',
                            message: FIREBASE[code] || 'Erro ao fazer login',
                            icon: <Icon name="error" />,
                        });

                        logger.info('Error on login:', { e });
                    })
                    .finally(() => { setLoading(false); });
            }
        }
    }, []);

    const redirect = () => {
        const managerUrl = `${url.manager}?token=${authServices.access_token}&email=${formGroup.controls.email.value}`;
        logger.info('Redirecting to manager page:', managerUrl);
        window.open(managerUrl, '_self');
    };

    const toggleType = () => { setType(prev => prev === 'text' ? 'password' : 'text'); };

    const goToSignup = () => { navigate('/signup'); };

    return (
        <Form formGroup={formGroup}>
            <Stack spacing="small">
                <Control
                    controlName="email"
                    field={(control) => <Input
                        fullWidth
                        gutterBottom
                        placeholder="Email"
                        data-cy="email-input"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.messageError}
                    />}
                />
                <Control
                    controlName="password"
                    field={(control) => <Input
                        fullWidth
                        gutterBottom
                        type={type}
                        placeholder="Senha"
                        data-cy="password-input"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.messageError}
                        endIcon={
                            <ButtonIcon type="button" onClick={toggleType}>
                                <Icon name={iconEye} />
                            </ButtonIcon>
                        }
                    />}
                />
                <Button
                    fullWidth
                    size="large"
                    type="submit"
                    data-cy="signin-submit"
                    disabled={loading}
                    loading={loading && <Loading />}
                >
                    Entrar
                </Button>
                <Divider />
                <Stack orientation="row" justifyContent="center">
                    <Typography variant="body2" style={{ textAlign: 'center' }}>Não possui conta?</Typography>
                    <Button
                        noHover
                        size="small"
                        type="button"
                        variant="text"
                        data-cy="signup-button"
                        onClick={goToSignup}
                    >
                        Criar conta
                    </Button>
                </Stack>
            </Stack>
        </Form>
    );
}

export default function Signin() {
    return (
        <Slide enter direction="top">
            <Stack
                justifyContent="center"
                style={{ height: '100vh' }}
                sx={{ backgroundColor: ({ background }) => background.paper }}
            >
                <Container sm="100%" md={500} lg={500}>
                    <Box sx={{ mb: 2 }} textAlign="center">
                        <Logo
                            width={200}
                            color="primary.main"
                            style={{ margin: 'auto' }}
                        />
                    </Box>
                    <Card sx={{ backgroundColor: ({ background }) => background.default }}>
                        <CardContent>
                            <Typography variant="subtitle1" noMargin gutterBottom>Login</Typography>

                            <Stack spacing="small">
                                <EmailAndPasswordForm />
                            </Stack>
                        </CardContent>
                    </Card>
                    <Box>
                        <Typography
                            variant="body2"
                            color="secondary.contrastText"
                            style={{ textAlign: 'center' }}
                        >
                            Desafio Template web - Leonardo Gonçalves
                        </Typography>
                        <Typography
                            variant="body2"
                            color="secondary.contrastText"
                            style={{ textAlign: 'center' }}
                        >
                            Versão: {release}
                        </Typography>
                    </Box>
                </Container>
            </Stack>
        </Slide>
    );
}