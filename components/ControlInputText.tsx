import { ForwardedRef, forwardRef } from 'react';
import { useController } from 'react-hook-form';

import { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

export type TControl<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: Omit<RegisterOptions<T>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
};

function InputText({ control, name, rules }: TControl<any>, ref: ForwardedRef<HTMLInputElement>) {
  const {
    field: { value, onChange },
  } = useController({ name, rules, control });

  return <input className="input" value={value} onChange={onChange} ref={ref} />;
}

export default forwardRef(InputText);
