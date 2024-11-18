import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/components/Stack';
import Divider from '@/components/Divider';

import Chip from './Chip';

const meta: Meta<typeof Chip> = {
    title: 'components/Chip',
    component: Chip,
};

export const template: StoryObj<typeof Chip> = {
    render: () => {
        return (
            <Stack orientation="row" spacing="small">
                <Chip label="contained" variant="contained" />
                <Chip label="outlined" variant="outlined" />
            </Stack>
        );
    }
};

export const colors: StoryObj<typeof Chip> = {
    render: () => {
        return (
            <>
                <Stack orientation="row" spacing="small">
                    <Chip label="primary" color="primary" variant="contained" />
                    <Chip label="secondary" color="secondary" variant="contained" />
                    <Chip label="success" color="success" variant="contained" />
                    <Chip label="error" color="error" variant="contained" />
                    <Chip label="warning" color="warning" variant="contained" />
                    <Chip label="info" color="info" variant="contained" />
                </Stack>
                <Divider />
                <Stack orientation="row" spacing="small">
                    <Chip label="primary" color="primary" variant="outlined" />
                    <Chip label="secondary" color="secondary" variant="outlined" />
                    <Chip label="success" color="success" variant="outlined" />
                    <Chip label="error" color="error" variant="outlined" />
                    <Chip label="warning" color="warning" variant="outlined" />
                    <Chip label="info" color="info" variant="outlined" />
                </Stack>
            </>
        );
    }
};

export const clickabel: StoryObj<typeof Chip> = {
    render: () => {
        return (
            <Stack orientation="row" spacing="small">
                <Chip onClick={() => ''} label="contained" variant="contained" />
            </Stack>
        );
    }
};

export default meta;