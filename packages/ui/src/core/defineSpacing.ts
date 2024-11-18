import type { CSSProperties } from 'react';

import { useTheme } from '@/theme';

import { Plugin } from './plugin';
import type { CustomOptions } from './customOptions';

export interface SpacingOptions {
    p: number;
    py: number;
    px: number;
    pt: number;
    pb: number;
    pl: number;
    pr: number;
    m: number;
    my: number;
    mx: number;
    mt: number;
    mb: number;
    ml: number;
    mr: number;
}

function definePadding(options: CustomOptions): CSSProperties {
    const { theme: { spacing } } = useTheme();

    const { p, pb, pl, pr, pt, px, py } = options;

    const hasP = p ? p * spacing : undefined;

    const hasPt = pt ? pt * spacing : undefined;
    const hasPb = pb ? pb * spacing : undefined;

    const hasPy = py ? py * spacing : undefined;
    const hasPx = px ? px * spacing : undefined;

    const hasPl = pl ? pl * spacing : undefined;
    const hasPr = pr ? pr * spacing : undefined;

    return {
        padding: hasP,
        paddingTop: hasPt || hasPy || hasP,
        paddingBottom: hasPb || hasPy || hasP,
        paddingLeft: hasPl || hasPx || hasP,
        paddingRight: hasPr || hasPx || hasP,
    };
};

function defineMargin(options: CustomOptions): CSSProperties {
    const { theme: { spacing } } = useTheme();

    const { m, mb, ml, mr, mt, mx, my } = options;

    const hasM = m ? m * spacing : undefined;

    const hasMt = mt ? mt * spacing : undefined;
    const hasMb = mb ? mb * spacing : undefined;

    const hasMy = my ? my * spacing : undefined;
    const hasMx = mx ? mx * spacing : undefined;

    const hasMl = ml ? ml * spacing : undefined;
    const hasMr = mr ? mr * spacing : undefined;

    return {
        margin: hasM,
        marginTop: hasMt || hasMy || hasM,
        marginBottom: hasMb || hasMy || hasM,
        marginLeft: hasMl || hasMx || hasM,
        marginRight: hasMr || hasMx || hasM,
    };
};

export default function defineSpacing(): Plugin[] {
    return [
        definePadding,
        defineMargin
    ];
}