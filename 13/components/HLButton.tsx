import { useState } from 'react';

type CheckboxHeadlessProps = {
  isChecked: boolean;
  onChange: () => void;
};

const CheckboxHeadless = (props: { children: (args: CheckboxHeadlessProps) => JSX.Element }) => {
  const [isChecked, setIsChecked] = useState(false);

  if (!props.children || typeof props.children !== 'function') return null;

  return props.children({
    isChecked,
    onChange: () => setIsChecked(!isChecked),
  });
};

export default CheckboxHeadless;
