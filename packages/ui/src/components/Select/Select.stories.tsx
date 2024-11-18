import { Meta, StoryObj } from '@storybook/react';

import Select from './Select';
import Option from './Option';

const meta: Meta<typeof Select> = {
    title: 'components/Select',
    component: Select,
};

export const size: StoryObj<typeof Select> = {
    render: () => {
        return (
            <>
                <Select placeholder="Selecione um valor" value="1">
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                    <Option value="3">Option 3</Option>
                </Select>
            </>
        );
    }
};

export default meta;