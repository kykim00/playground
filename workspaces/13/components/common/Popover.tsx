import { PropsWithChildren, ReactNode, useState } from 'react';
import { usePopper } from 'react-popper';
import { Popover as HeadlessUiPopover, Transition } from '@headlessui/react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface PopperProps extends BaseProps {
  placement?:
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';
  offset?: [number, number];
}

export interface BaseProps {
  className?: string;
}

export interface PopoverProps extends PopperProps {
  type?: 'simple' | 'custom';
  content: ReactNode;
  isShow?: boolean;
  onClickButton?: () => void;
  onBlurButton?: () => void;
}

const Popover = ({
  children,
  placement = 'auto',
  content,
  offset = [0, 16],
  type = 'simple',
  className,
  isShow,
  onClickButton,
  onBlurButton,
}: PropsWithChildren<PopoverProps>) => {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: { offset },
      },
    ],
  });

  const handleClickButton = () => {
    onClickButton?.();
  };

  const handleBlurButton = () => {
    onBlurButton?.();
  };

  return (
    <HeadlessUiPopover className={className}>
      <PopoverButton ref={setReferenceElement} onClick={handleClickButton} onBlur={handleBlurButton}>
        {children}
      </PopoverButton>

      <Transition show={isShow}>
        <PopoverPanel ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          <PopoverContent type={type}>{content}</PopoverContent>
        </PopoverPanel>
      </Transition>
    </HeadlessUiPopover>
  );
};

export default Popover;

const PopoverButton = styled(HeadlessUiPopover.Button)`
  outline: none;
`;

const PopoverPanel = styled(HeadlessUiPopover.Panel)`
  z-index: 10;
`;

const PopoverContent = styled.div<{ type: 'simple' | 'custom' }>`
  border-radius: 4px;
  width: max-content;
  height: max-content;

  ${({ type }) =>
    type === 'simple'
      ? css({
          padding: '12px',
          fontSize: '12px',
          color: 'grey',
          background: 'lightgrey',
          border: '1px solid #eee',
        })
      : css({
          padding: '12px',
          fontSize: '12px',
          color: 'grey',
          background: 'lightgrey',
          border: '1px solid #eee',
        })}
`;
