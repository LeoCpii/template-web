import { HTMLAttributes } from 'react';

import { getInitials } from '@template-web/toolkit/string';

import Icon from '@/components/Icon';
import Ripple from '@/components/Ripple';
import joinClass from '@/utils/joinClass';
import createComponent from '@/core/createComponent';

import './Avatar.scss';

interface AvatarProps extends HTMLAttributes<HTMLElement> {
    alt?: string;
    src?: string;
    name?: string;
}
function Avatar({ src, alt, name, ...props }: AvatarProps) {
    const className = joinClass([
        'cj-avatar',
        src && 'cj-avatar--image',
        name && 'cj-avatar--name',
        !src && !name && 'cj-avatar--icon',
        props.onClick && 'cj-avatar--clickable',
        props.className
    ]);

    const content = () => {
        if (src) { return <img style={{ width: '100%' }} src={src} alt={alt} />; }
        if (name) { return <span>{getInitials(name)}</span>; }

        return (
            <Icon name="user" className="cj-avatar__icon" />
        );
    };

    return (
        <div {...props} className={className} style={{ ...props.style }}>
            {content()}
            {props.onClick && <Ripple />}
        </div>
    );
}

export default createComponent(Avatar);