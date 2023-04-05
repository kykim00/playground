import { TControl } from '@/types/form';
import { ForwardedRef, forwardRef } from 'react';
import { useController } from 'react-hook-form';
import { Input, InputProps } from './input';

function TextInput(
  { control, name, rules, type = 'text', disabled = false, value = undefined }: InputProps & TControl<any>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    field: { value: controllerValue, onChange },
  } = useController({ name, rules, control });

  return <Input type={type} value={value ?? controllerValue} onChange={onChange} ref={ref} disabled={disabled} />;
}

export default forwardRef(TextInput);
