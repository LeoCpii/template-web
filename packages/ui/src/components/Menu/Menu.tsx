import { Children, cloneElement, forwardRef, ReactElement, useEffect, useMemo, useState, CSSProperties } from 'react';

import { uuid } from '@template-web/toolkit/uuid';

import { joinClass, debounce } from '@/utils';
import { Card, CardContent } from '@/components/Card';
import useListenerResized from '@/hooks/useListenerResized';

import './Menu.scss';

type Direction = 'left' | 'right' | 'center';
type AnimationClass = 'open' | 'close';
type State = 'visible' | 'invisible';
type Coordinates = { top?: number; right?: number; bottom?: number; left?: number; };
type Config = { animation: AnimationClass, state: State; width: CSSProperties['width'] };

interface MenuListProps extends React.HTMLAttributes<HTMLDivElement> {
    open: boolean;
    direction?: Direction;
    width?: CSSProperties['width'];
    children: React.JSX.Element | React.JSX.Element[];
    anchorEl: HTMLElement | null;
    onClose: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}
export default forwardRef<HTMLDivElement, MenuListProps>(function Menu({
    open,
    children,
    anchorEl,
    width,
    direction = 'left',
    onClose,
    ...props
}: MenuListProps, ref) {
    const [coordinate, setCoordinate] = useState<Coordinates>();
    const [config, setConfig] = useState<Config>({ state: 'invisible', animation: 'close', width: 'auto' });

    const GAP = 16;
    const ANIMATION_DURATION = 150;

    const arrayChildren = Children.toArray(children) as ReactElement<any>[];

    const id = useMemo(() => uuid(), []);

    useListenerResized(() => changePosition(), [anchorEl]);

    useEffect(() => { changePosition(); }, [anchorEl]);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    useEffect(() => { open ? handleOpen() : handleClose(); }, [open]);

    const changePosition = () => {
        if (anchorEl) {
            setTimeout(() => {
                let coordinates: Coordinates = {};

                const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = anchorEl;

                setConfig(prev => ({ ...prev, width: offsetWidth }));

                const top = offsetTop + offsetHeight + (GAP / 2);

                const el = document.getElementById(id) as HTMLElement;

                if (direction === 'center') { coordinates = { top, right: offsetWidth }; }

                if (direction === 'left') { coordinates = { top, left: offsetLeft }; }

                if (direction === 'right') { coordinates = { top, left: offsetLeft - (el.offsetWidth - offsetWidth) }; }

                setCoordinate(coordinates);
            }, 0);
        }
    };

    const handleOpen = () => {
        setConfig(prev => ({ ...prev, state: 'visible' }));

        setTimeout(() => { setConfig(prev => ({ ...prev, animation: 'open' })); }, 10);
    };

    const handleClose = () => {
        setConfig(prev => ({ ...prev, animation: 'close' }));

        setTimeout(() => { setConfig(prev => ({ ...prev, state: 'invisible' })); }, ANIMATION_DURATION);
    };

    const renderChildren = () => {
        return arrayChildren.map((child, index) => {
            return cloneElement(child, {
                'tabIndex': index + 1,
                key: index,
                onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                    debounce.delay(() => {
                        if (child.props.autoClose) {
                            onClose(e);
                            handleClose();
                        }

                        if (child.props.onClick) { child.props.onClick(e); }
                    }, 50);
                },
            });
        });
    };

    return (
        <div
            id={id}
            ref={ref}
            style={{
                width: width || config.width,
                top: coordinate?.top,
                left: coordinate?.left,
                display: config?.state === 'visible' ? 'block' : 'none',
                transition: `all ${ANIMATION_DURATION}ms ease-in`,
                zIndex: 50,
            }}
            className={joinClass(['cj-menu', config?.animation])}
            {...props}
        >
            <Card>
                <CardContent
                    sx={{ py: 1 }}
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    {renderChildren()}
                </CardContent>
            </Card>
        </div>
    );
});

// export default createComponent(Menu);