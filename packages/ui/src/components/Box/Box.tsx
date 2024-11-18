import { HTMLAttributes } from 'react';

import joinClass from '@/utils/joinClass';
import createComponent from '@/core/createComponent';

interface BoxProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}
function Box({ children, ...props }: BoxProps) {
    const className = joinClass(['cj-box', props.className]);

    return (
        <div {...props} className={className}>
            {children}
        </div>
    );
}

export default createComponent(Box);