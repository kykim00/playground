import styled from '@emotion/styled';
import { ForwardedRef, forwardRef } from 'react';

type InputType = 'number' | 'text' | 'password' | 'radio' | 'checkbox';

export interface InputProps {
  /**
   * Is this the principal call to action on the page?
   */
  type?: InputType;
  /**
   * disable
   */
  disabled?: boolean;
  /**
   * Input contents
   */
  value?: string;
  /**
   * Optional change event handler
   */
  onChange?: () => void;
  // style variant props
}

/**
 * Primary UI component for user interaction
 */
export const Input = forwardRef(
  (
    { type = 'text', disabled = false, value = undefined, onChange = () => {} }: InputProps,
    ref?: ForwardedRef<HTMLInputElement>,
  ) => {
    return <StyledInput type={type} value={value} onChange={onChange} ref={ref} disabled={disabled} />;
  },
);

const StyledInput = styled.input`
  &:not([type='radio']):not([type='checkbox']) {
    width: 400px !important;
  }
`;
