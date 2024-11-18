import { ButtonHTMLAttributes } from 'react';

import { joinClass } from '@/utils';
import Ripple from '@/components/Ripple';

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { label: string; }
export default function MenuButton({ label, ...props }: MenuButtonProps) {
    const className = joinClass(['cj-menu__item', props.className]);

    return (
        <button {...props} className={className}>
            {label}
            <Ripple />
        </button>
    );
}