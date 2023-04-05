import styled from '@emotion/styled';
import { ForwardedRef, forwardRef } from 'react';
import { ChangeHandler } from 'react-hook-form/dist/types';

type InputType = 'number' | 'text' | 'password' | 'radio' | 'checkbox';
type EventType = (() => void) | ((e: React.ChangeEvent<HTMLInputElement>) => void) | ChangeHandler;
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
  onChange?: EventType;
  // style variant props
  onBlur?: EventType;
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
