import React, { useContext, ReactElement, cloneElement, InputHTMLAttributes, } from 'react';

import useControl from './useControl';
import FormContext from './FormContext';
import FormControl from './formControl';

interface ControlProps<
    Form, Key extends keyof Form = keyof Form
> extends InputHTMLAttributes<InputHTMLAttributes<any>> {
    controlName: Key;
    // children: React.ReactNode;
    action?: 'onChange' | 'onInput';
    type?: 'text' | 'checkbox' | 'radio' | 'number';
    field: (control: FormControl<any>) => React.JSX.Element;
}
export default function Control<Form>({
    field,
    controlName,
    type = 'text',
    action = 'onInput',
}: ControlProps<Form>) {
    const { formGroup } = useContext(FormContext);
    const { control, update } = useControl<Form>(controlName);

    const renderChildren = (child: ReactElement<ControlProps<Form>>) => {
        return cloneElement(child, {
            required: control.required,
            onBlur: (e: any) => {
                control.dirty = true;
                update(e.target['value']);
            },
            onInput: (e: any) => {
                update(e.target['value']);
                if (action === 'onInput') { control.dirty = true; };
            },
            onChange: (e: any) => {
                update(
                    ['radio', 'checkbox'].includes(type)
                        ? e.target['checked']
                        : e.target['value']
                );
                if (action === 'onChange') { control.dirty = true; };
            }
        });
    };

    return (
        renderChildren(field(formGroup.controls[controlName]))
    );
}

