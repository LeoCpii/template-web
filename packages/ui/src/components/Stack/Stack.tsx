import { HTMLAttributes, CSSProperties } from 'react';

import joinClass from '@/utils/joinClass';
import createComponent from '@/core/createComponent';

import './Stack.scss';

export type Orientation = 'row' | 'column';
export type Distance = 'small' | 'medium' | 'large';

export interface StackProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    tag?: React.ElementType;
    nogap?: boolean;
    spacing?: Distance;
    orientation?: Orientation;
}

function Stack({
    children,
    tag = 'div',
    nogap = false,
    spacing = 'medium',
    orientation = 'column',
    ...props
}: Readonly<StackProps>) {
    const CustomTag = tag;
    const cls = joinClass([
        'cj-stack',
        nogap && 'cj-stack__nogap',
        `cj-stack__${spacing}`,
        `cj-stack__${orientation}`,
        props.className
    ]);

    return (
        <CustomTag
            {...props}
            className={cls}
            style={{ ...props.style }}
        >
            {children}
        </CustomTag>
    );
}

export default createComponent(Stack);