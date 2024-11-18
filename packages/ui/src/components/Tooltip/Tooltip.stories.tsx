import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/components/Stack';
import Button from '@/components/Button';

import Tooltip from './Tooltip';

const meta: Meta<typeof Tooltip> = {
    title: 'components/Tooltip',
    component: Tooltip,
};

export const template: StoryObj<typeof Tooltip> = {
    render: () => {
        return (
            <>
                <Stack orientation="row" style={{ height: 350 }} alignItems="center">
                    <Tooltip direction="top">
                        <Button>Top</Button>
                    </Tooltip>
                    <Tooltip direction="right">
                        <Button>Right</Button>
                    </Tooltip>
                    <Tooltip direction="bottom">
                        <Button>Bottom</Button>
                    </Tooltip>
                    <Tooltip direction="left">
                        <Button>Left</Button>
                    </Tooltip>
                </Stack>
            </>
        );
    }
};

export default meta;