'use client';

import CheckboxHeadless from '../components/HLButton';

export default function Home() {
  return (
    <main>
      <CheckboxHeadless>
        {({ isChecked, onChange }) => {
          return (
            <label>
              <input type="checkbox" checked={isChecked} onChange={onChange} />
              <span>체크박스</span>
            </label>
          );
        }}
      </CheckboxHeadless>
    </main>
  );
}
