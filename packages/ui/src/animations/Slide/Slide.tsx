import React, { useEffect, useState } from 'react';

import type { Style, Direction } from '../interface';

const styledShow = (timeout: number): Style => ({
    opacity: 1,
    transform: '',
    transition: `all ${timeout}s ease-in-out`,
});

const styledHide = (timeout: number, direction: Direction): Style => {
    const translate = {
        top: 'translateY(-10px)',
        left: 'translateX(-10px)',
        right: 'translateX(10px)',
        bottom: 'translateY(10px)',
    };

    return {
        opacity: 0,
        transform: translate[direction],
        transition: `all ${timeout}s ease-in-out`
    };
};

interface SlideProps extends React.HTMLAttributes<HTMLDivElement> {
    enter: boolean,
    delay?: number;
    timeout?: number;
    direction?: Direction;
    children: React.ReactNode;
}
export default function Slide({
    children,
    enter,
    delay = 50,
    timeout = .2,
    direction = 'right',
    ...props
}: SlideProps) {
    const [style, setStyle] = useState<Style>(styledHide(timeout, direction));

    useEffect(() => {
        setTimeout(() => {
            setStyle(enter ? styledShow(timeout) : styledHide(timeout, direction));
        }, delay);
    }, [enter]);

    return (
        <div style={style} {...props}>
            {children}
        </div>
    );
}