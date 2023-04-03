import { TControl } from '@/types/form';
import styled from '@emotion/styled';
import { ForwardedRef, forwardRef } from 'react';
import { useController } from 'react-hook-form';

type InputType = 'number' | 'text' | 'password';

interface TextInputProps extends TControl<any> {
  type?: InputType;
  // style variant props
}

function TextInput({ control, name, rules, type = 'text' }: TextInputProps, ref: ForwardedRef<HTMLInputElement>) {
  const {
    field: { value, onChange },
  } = useController({ name, rules, control });

  return <Input value={value} onChange={onChange} ref={ref} />;
}

const Input = styled.input`
  width: 400px !important;
`;
export default forwardRef(TextInput);
