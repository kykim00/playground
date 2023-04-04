import { TControl } from '@/types/form';
import styled from '@emotion/styled';
import { ForwardedRef, forwardRef } from 'react';
import { useController } from 'react-hook-form';

type InputType = 'number' | 'text' | 'password' | 'radio' | 'checkbox';

interface InputProps extends TControl<any> {
  type?: InputType;
  disabled?: boolean;
  value?: string;
  // style variant props
}

function Input(
  { control, name, rules, type = 'text', disabled = false, value = undefined }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    field: { value: controllerValue, onChange },
  } = useController({ name, rules, control });

  return <StyledInput type={type} value={value ?? controllerValue} onChange={onChange} ref={ref} disabled={disabled} />;
}

const StyledInput = styled.input`
  &:not([type='radio']):not([type='checkbox']) {
    width: 400px !important;
  }
`;
export default forwardRef(Input);
