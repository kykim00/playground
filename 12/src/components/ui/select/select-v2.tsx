import React, { ForwardedRef, Fragment } from 'react';
import { Listbox } from '@headlessui/react';
import styled from '@emotion/styled';
import ChevronDown from '@/components/icons/ChevronDown';
import ChevronUp from '@/components/icons/ChevronUp';

export interface OptionValue {
  /** 각 옵션 항목의 키값 */
  id: number | string;
  /** 각 옵션 항목의 이름(보여지는 값) */
  name: string;
  /** 각 옵션 항목의 비활성 여부 */
  disabled?: boolean;
  /** 다음 항목에 구분선 추가 여부 */
  divideNextLine?: boolean;
  /** 각 옵션 항목의 아이콘 src값 (iconSrc와 iconClass이 둘다 존재할 경우, iconSrc 우선순위) */
  iconSrc?: string;
  /** 각 옵션 항목의 아이콘 클래스명 (iconSrc와 iconClass이 둘다 존재할 경우, iconSrc 우선순위) */
  iconClass?: string;
  /** 이미지 파일의 경우 alt값 */
  alt?: string;
}

export interface SelectProps {
  /** 스크린 리더가 읽어주는 라벨 텍스트 */
  label: string;
  /** 옵션 리스트 */
  options: OptionValue[] | string[];
  /** 선택된 값 (최초 실행시 초기값) */
  value?: OptionValue | OptionValue[] | string;
  /** 옵션 선택 처리 핸들러 (isMultiple이 false일때 전용 핸들러) */
  onChange?: ((value: OptionValue) => void) | ((value: string) => void);
  /** 옵션 선택 처리 핸들러 (isMultiple이 true일때 전용 핸들러) */
  onMultipleChange?: (value: OptionValue[]) => void;
  /** Select 컴포넌트 전체 비활성 여부 */
  isDisabled?: boolean;
  /** Select 중복 선택 가능 여부 */
  isMultiple?: boolean;
  /** 옵션 리스트 다음에 나올 요소 */
  elementAfterOptions?: React.ReactElement;
  placeholder?: string;
  className?: string;
}

const Select = React.forwardRef(
  (
    {
      label,
      options = [],
      value,
      onChange,
      onMultipleChange,
      isDisabled = false,
      isMultiple = false,
      elementAfterOptions,
      placeholder = '',
      className,
    }: SelectProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    let labelText = '';

    if (!value) {
      labelText = placeholder;
    } else if (typeof value === 'object') {
      if (Array.isArray(value)) {
        labelText = value.map(v => v.name).join(', ') || placeholder;
      } else {
        labelText = value.name;
      }
    } else {
      labelText = value;
    }

    return (
      <div className={className}>
        <ListBox
          value={value}
          onChange={isMultiple ? onMultipleChange : onChange}
          multiple={isMultiple}
          disabled={isDisabled}
        >
          {({ open }) => (
            <>
              <ListLabel>{label}</ListLabel>
              <ListButton ref={ref}>
                {labelText}
                {open ? <ChevronUp /> : <ChevronDown />}
              </ListButton>

              <ListOptions>
                <>
                  {options.map(option => {
                    if (typeof option === 'string') {
                      return (
                        <Fragment key={option}>
                          <Listbox.Option value={option} as={Fragment}>
                            {({ selected }) => {
                              const isSelected = labelText.includes(option) || selected;
                              return (
                                <ListOptionElement selected={isSelected}>
                                  <div>{option}</div>
                                  {isSelected && <i className="far fa-check" />}
                                </ListOptionElement>
                              );
                            }}
                          </Listbox.Option>
                        </Fragment>
                      );
                    }

                    return (
                      option.id !== '' && (
                        <Fragment key={option.id}>
                          <Listbox.Option value={option} disabled={option.disabled || false} as={Fragment}>
                            {({ selected, disabled }) => {
                              const isSelected = labelText.includes(option.name) || selected;
                              return (
                                <ListOptionElement selected={isSelected} disabled={disabled}>
                                  {isMultiple && <input type="checkbox" checked={isSelected} />}
                                  {(option.iconSrc || option.iconClass) && (
                                    <span>
                                      {option.iconSrc ? (
                                        <img src={option.iconSrc} alt={option.alt} />
                                      ) : (
                                        <i className={option.iconClass} />
                                      )}
                                    </span>
                                  )}
                                  <div>{option.name}</div>
                                  {isSelected && <i className="far fa-check" />}
                                </ListOptionElement>
                              );
                            }}
                          </Listbox.Option>
                          {option.divideNextLine && <DividerElement />}
                        </Fragment>
                      )
                    );
                  })}

                  {elementAfterOptions && (
                    <>
                      <DividerElement />
                      <AfterOptionElement>{elementAfterOptions}</AfterOptionElement>
                    </>
                  )}
                </>
              </ListOptions>
            </>
          )}
        </ListBox>
      </div>
    );
  },
);

Select.displayName = 'Select';
export default Select;

const ListBox = styled(Listbox)`
  position: relative;
`;

const ListLabel = styled(Listbox.Label)`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const ListButton = styled(Listbox.Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  width: inherit;
  font-size: 14px;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.basic.gray[600]};
  background-color: ${({ theme }) => theme.semantic.select.background.default};
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.basic.gray[70]};
  &:focus {
    border: 1px solid ${({ theme }) => theme.basic.blue[500]};
  }
  &:disabled {
    color: ${({ theme }) => theme.basic.gray[70]};
    background-color: ${({ theme }) => theme.semantic.select.background.disabled};
    cursor: default;
  }
  & > i {
    color: ${({ theme }) => theme.basic.gray[300]};
    font-size: 12px;
  }
`;

const ListOptions = styled(Listbox.Options)`
  position: absolute;
  width: inherit;
  z-index: 10;
  padding: 10px 0;
  font-size: 14px;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.basic.gray[600]};
  background-color: ${({ theme }) => theme.semantic.select.background.default};
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.basic.gray[300]};
  box-shadow: 2px 5px 4px #00000029;
`;

const ListOptionElement = styled.li<{ selected: Boolean; disabled?: Boolean }>`
  background-color: ${({ selected, theme }) =>
    selected ? theme.basic.gray[30] : theme.semantic.select.background.default};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  margin-bottom: 1px;
  height: 38px;
  font-size: 14px;
  line-height: 1.25rem;
  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    background-color: ${({ disabled, theme }) => !disabled && theme.semantic.select.background.hover};
  }
  &:active {
    background-color: ${({ disabled, theme }) => !disabled && theme.semantic.select.background.active};
  }
  color: ${({ disabled, theme }) => disabled && theme.basic.gray[70]};

  span {
    display: flex;
    align-items: center;
    margin-right: 10px;
    width: 16px;
    height: 16px;
    img {
      width: 100%;
      height: 100%;
    }
    i {
      font-size: 16px;
      line-height: 1.25rem;
      color: ${({ theme }) => theme.basic.gray[300]};
    }
  }
  & > i {
    color: ${({ selected, theme }) => selected && theme.basic.blue[500]};
  }
`;

const DividerElement = styled.li`
  list-style: none;
  margin: 10px 14px;
  border-top: 1px solid ${({ theme }) => theme.basic.gray[70]};
`;

const AfterOptionElement = styled.li`
  padding: 0 14px;
  min-height: 38px;
`;
