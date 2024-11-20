import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import Stack from '@/components/Stack';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import ButtonIcon from '@/components/ButtonIcon';
import { useTheme } from '@/theme';

import './Header.scss';
import Tooltip from '@/components/Tooltip';

interface User {
    name: string;
    email: string;
    picture: string;
}

interface HeaderProps {
    user: User;
    onUpdateMode: () => void;
    onStartGuide: () => void;
}
export default function Header({
    user,
    onStartGuide,
    onUpdateMode,
}: HeaderProps) {
    const { theme } = useTheme();

    const { name, email, picture } = user;

    const modeIcon = theme.palette.mode === 'dark' ? 'moon' : 'sun';

    return (
        <div className="ui-header">
            <div className="ui-header__logo">
                <button>
                    <Logo width={150} />
                </button>
            </div>

            <Stack orientation="row" justifyContent="flex-end" alignItems="center">
                <Button
                    size="small"
                    variant="text"
                    startIcon={<Icon name="question-circle" />}
                    onClick={onStartGuide}
                >
                    Ajuda
                </Button>
                <ButtonIcon onClick={onUpdateMode}>
                    <Icon name={modeIcon} />
                </ButtonIcon>
                <Tooltip direction="bottom" label={name}>
                    <Avatar
                        name={name}
                        alt={name}
                        src={picture}
                        sx={{ backgroundColor: ({ secondary }) => secondary.main }}
                    />
                </Tooltip>
            </Stack>
        </div>
    );
}