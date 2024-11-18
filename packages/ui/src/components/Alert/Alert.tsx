import { cloneElement, HtmlHTMLAttributes } from 'react';

import { Colors } from '@/theme';
import { joinClass } from '@/utils';
import ButtonIcon from '@/components/ButtonIcon';
import Typography from '@/components/Typography';
import createComponent from '@/core/createComponent';
import Icon, { type IconProps } from '@/components/Icon';

import './Alert.scss';

export interface AlertProps extends HtmlHTMLAttributes<HTMLDivElement> {
    color?: Colors;
    icon?: React.JSX.Element;
    children: React.JSX.Element | string;
    onClose?: () => void;
}
function Alert({ children, icon, color = 'primary', onClose, ...props }: AlertProps) {

    const className = joinClass([
        'cj-alert',
        `cj-alert--${color}`
    ]);

    const message = typeof children === 'string'
        ? <Typography variant="body1" color={`${color}.dark`}>{children}</Typography>
        : children;

    const renderIcon = (icon: React.JSX.Element) => {
        return cloneElement<IconProps>(icon, {
            color: `${color}.dark`
        });
    };

    return (
        <div className={className} {...props}>
            {
                icon && (
                    <div className="cj-alert__icon">
                        {renderIcon(icon)}
                    </div>
                )
            }
            {message}
            {
                !!onClose && (
                    <ButtonIcon onClick={onClose} color={`${color}.dark`} className="cj-alert__button">
                        <Icon name="times" />
                    </ButtonIcon>
                )
            }
        </div>
    );
}

export default createComponent(Alert);