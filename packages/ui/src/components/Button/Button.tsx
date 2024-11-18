import { type PropsWithChildren, type ButtonHTMLAttributes, cloneElement } from 'react';

import Ripple from '@/components/Ripple';
import joinClass from '@/utils/joinClass';
import type { Colors, Size } from '@/theme';
import createComponent from '@/core/createComponent';
import type { LoadingProps } from '@/components/Loading';

import './Button.scss';

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    size?: Size;
    color?: Colors;
    fullWidth?: boolean;
    endIcon?: React.JSX.Element;
    loading?: React.JSX.Element | boolean;
    startIcon?: React.JSX.Element;
    noHover?: boolean;
    variant?: 'contained' | 'outlined' | 'text';
};
function Button({
    size = 'medium',
    color = 'primary',
    variant = 'contained',
    fullWidth,
    startIcon,
    noHover = false,
    endIcon,
    loading,
    children,
    ...props
}: ButtonProps) {
    const cls = joinClass([
        'cj-button',
        `cj-button--${size}`,
        `cj-button--${color}`,
        `cj-button--${color}--${variant}`,
        noHover && 'cj-button--noHover',
        fullWidth && 'cj-button--fullWidth',
        props.className
    ]);

    const renderIcon = (icon: React.JSX.Element, direction: 'left' | 'right') => {
        return cloneElement(icon, {
            className: joinClass([icon.props.className, 'cj-button__icon', `cj-button__icon--${direction}`])
        });
    };

    const renderLoading = (loading: React.JSX.Element) => {
        return cloneElement<LoadingProps>(loading, {
            className: joinClass([loading.props.className, 'cj-button__loading', `cj-button__loading--${size}`]),
            size: '1.1rem',
        });
    };

    return (
        <button
            className={cls}
            {...props}
            onClick={(e) => !loading && props.onClick?.(e)}
        >
            {
                loading ? renderLoading(loading as React.JSX.Element) : (
                    <>
                        {startIcon && renderIcon(startIcon, 'left')}
                        {children}
                        {endIcon && renderIcon(endIcon, 'right')}
                    </>
                )
            }
            <Ripple />
        </button>
    );
}

export default createComponent(Button);