import type { Color } from './Theme';
import { hexToHsl } from './hexToHsl';
import { adjustLightness } from './adjustLightness';
import { getContrastColor } from './getContrastColor';

export default function generateSupportColors(hex: string): Color {
    const variation = 20;

    const hsl = hexToHsl(hex);

    const contrastColor = getContrastColor(hex);
    const lighterColor = adjustLightness(hsl.h, hsl.s, hsl.l, variation);
    const darkerColor = adjustLightness(hsl.h, hsl.s, hsl.l, -variation);

    return { main: hex, light: lighterColor, dark: darkerColor, contrastText: contrastColor };
}