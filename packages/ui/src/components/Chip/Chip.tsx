import { HTMLAttributes } from 'react';

import { Colors } from '@/theme';
import Ripple from '@/components/Ripple';
import joinClass from '@/utils/joinClass';
import createComponent from '@/core/createComponent';

import './Chip.scss';

export interface ChipProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    label: string;
    color?: Colors | 'default';
    variant?: 'contained' | 'outlined';
};
function Chip({ label, color = 'default', variant = 'contained', ...props }: ChipProps) {
    const clss = joinClass([
        'ui-chip',
        `ui-chip--${color}`,
        `ui-chip--${color}--${variant}`,
        props.onClick && 'ui-chip--clickable',
        props.className
    ]);

    return (
        <div {...props} className={clss} style={{ ...props.style }}>
            <span>{label}</span>
            {props.onClick && <Ripple />}
        </div>
    );
}

export default createComponent(Chip);
