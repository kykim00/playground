'use client';

import CheckboxHeadless from '../../components/HLButton';

const T = () => (
  <CheckboxHeadless>
    {({ isChecked, onChange }) => (
      <>
        <input type="checkbox" onChange={onChange} checked={isChecked}></input>
      </>
    )}
  </CheckboxHeadless>
);

export default T;
