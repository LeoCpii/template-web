import type { Theme } from './Theme';

export const defaultSpacing: Theme['spacing'] = 8;
export const defaultShape: Theme['shape'] = { radius: 4 };

export const themeDefaultLight: Theme = {
    palette: {
        mode: 'light',
        info: '#3767e1',
        error: '#f44336',
        warning: '#ff9800',
        success: '#A6D577',
        primary: '#6d56f3',
        secondary: '#dcf356',
        grey: '#616161',
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)'
        },
        background: {
            paper: '#f1f1f1',
            default: '#f9f9f9',
        },
        divider: 'rgba(0, 0, 0, 0.12)'
    },
    spacing: defaultSpacing,
    shape: defaultShape
};

export const themeDefaultDark: Theme = {
    palette: {
        mode: 'dark',
        info: '#3767e1',
        error: '#f44336',
        warning: '#ff9800',
        success: '#4caf50',
        primary: '#1abc9c',
        secondary: '#e80537',
        grey: '#616161',
        text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)'
        },
        background: {
            paper: '#424242',
            default: '#303030',
        },
        divider: 'rgba(255, 255, 255, 0.12)'
    },
    spacing: defaultSpacing,
    shape: defaultShape
};