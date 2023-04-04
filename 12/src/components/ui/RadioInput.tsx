import { TControl } from '@/types/form';
import { ForwardedRef, forwardRef } from 'react';
import { useController } from 'react-hook-form';

interface RadioInputProps extends TControl<any> {
  disabled?: boolean;
  checked?: boolean;
  value: string;
}

function RadioInput({ control, name, rules, checked, value }: RadioInputProps, ref: ForwardedRef<HTMLInputElement>) {
  return <input type="radio" value={value} checked={checked} ref={ref} />;
}

export default forwardRef(RadioInput);
