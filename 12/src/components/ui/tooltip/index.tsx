import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

interface Props {
  children: ReactNode;
}

const Tooltip = ({ children }: Props) => {
  return <TooltipContainer>{children}</TooltipContainer>;
};

const TooltipContainer = styled.div`
  position: absolute;
  left: 50%;
  top: calc(100% + 8px);
  transform: translateX(-50%);
  white-space: nowrap;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
  line-height: 1.5;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export default Tooltip;
