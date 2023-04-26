import styled from '@emotion/styled';

export const StyledTableCell = styled.td<{ groupingLineCount?: number }>`
  white-space: nowrap;
  font-size: 12px;
  input[type='checkbox'] {
    margin-top: 2px;
  }
  height: ${({ groupingLineCount }) => (groupingLineCount ? `${40 * groupingLineCount}px` : '40px')};
`;
