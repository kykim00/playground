import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';

export interface PaginationProps {
  /** 총 데이터의 개수 */
  total?: number;
  /** 한 페이지에 들어갈 데이터의 개수 */
  limit?: number;
  /** 현재 페이지 */
  currentPageProps?: number;
  /** 페이지네이션 단위 */
  pageSet?: number;
  /** 특정 페이지 버튼 클릭 시 동작하는 핸들러 */
  onClickPage: (currentPage: number) => void;
  /** 총 데이터 개수가 0일 때 페이지네이션 노출 여부 */
  isShowFirstPageProps?: boolean;
  /** 총 페이지 수. 1 이하의 경우 노출시키지 않음*/
  totalPage: number;
}

const calculatePageIndex = (currentPage: number, pageSet: number): number => {
  return Math.ceil(currentPage / pageSet) - 1;
};

const Pagination = ({
  currentPageProps = 1,
  pageSet = 10,
  isShowFirstPageProps = false,
  onClickPage,
  totalPage,
}: PaginationProps) => {
  const [pageIndex, setPageIndex] = useState(calculatePageIndex(currentPageProps, pageSet));
  const [currentPage, setCurrentPage] = useState(currentPageProps);
  const [isShowFirstPage, setIsShowFirstPage] = useState(isShowFirstPageProps);

  // const totalPage = useMemo(() => {
  //   if (isShowFirstPage) {
  //     return total ? Math.ceil(total / limit) : 1;
  //   }
  //   return Math.ceil(total / limit);
  // }, [total, limit, isShowFirstPage]);

  const firstPage = useMemo(() => pageIndex * pageSet + 1, [pageIndex, pageSet]);
  const lastPage = useMemo(
    () => (pageSet * (pageIndex + 1) > totalPage ? totalPage : pageSet * (pageIndex + 1)),
    [pageIndex, pageSet, totalPage],
  );

  const maxPageIndex = useMemo(() => Math.ceil(totalPage / pageSet) - 1, [pageSet, totalPage]);
  const paginationList = Array.from({ length: lastPage - firstPage + 1 }, (_, i) => firstPage + i);

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPage;

  const handlePreviousClick = () => {
    setPageIndex(currentIndex => (currentIndex === 0 ? currentIndex : currentIndex - 1));
    const currentLastPage = pageIndex === 0 ? 1 : pageSet * pageIndex;
    setCurrentPage(currentLastPage);
    handleCurrentPage(currentLastPage);
  };
  const handleNextClick = () => {
    setPageIndex(currentIndex => (currentIndex === maxPageIndex ? currentIndex : currentIndex + 1));
    const currentFirstPage = pageIndex === maxPageIndex ? lastPage : pageSet * (pageIndex + 1) + 1;
    setCurrentPage(currentFirstPage);
    handleCurrentPage(currentFirstPage);
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    handleCurrentPage(pageNumber);
  };

  const handleFirstClick = () => {
    setCurrentPage(1);
    setPageIndex(0);
    handleCurrentPage(1);
  };

  const handleLastClick = () => {
    setCurrentPage(totalPage);
    setPageIndex(maxPageIndex);
    handleCurrentPage(totalPage);
  };

  const handleCurrentPage = (currentPage: number) => {
    if (onClickPage) {
      onClickPage(currentPage);
    }
  };

  useEffect(() => {
    setPageIndex(calculatePageIndex(currentPageProps, pageSet));
    setCurrentPage(currentPageProps);
    setIsShowFirstPage(isShowFirstPageProps);
  }, [currentPageProps, pageSet, isShowFirstPageProps]);

  if (totalPage <= 1) return null;
  return (
    <>
      <PaginationContainer>
        <PaginationButton type="button" onClick={handleFirstClick} disabled={isPreviousDisabled}>
          {'<<'}
        </PaginationButton>
        <PaginationButton type="button" onClick={handlePreviousClick} disabled={isPreviousDisabled}>
          {'<'}
        </PaginationButton>
        {paginationList.map((pageNumber, index) => (
          <PaginationButton
            type="button"
            key={index}
            onClick={() => handlePageClick(pageNumber)}
            aria-current={currentPage === pageNumber ? 'page' : undefined}
            disabled={false}
          >
            {pageNumber}
          </PaginationButton>
        ))}
        <PaginationButton type="button" onClick={handleNextClick} disabled={isNextDisabled}>
          {'>'}
        </PaginationButton>
        <PaginationButton type="button" onClick={handleLastClick} disabled={isNextDisabled}>
          {'>>'}
        </PaginationButton>
      </PaginationContainer>
    </>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  margin-top: 25px;
  text-align: center;
`;

const PaginationButton = styled.button<{ disabled: boolean }>`
  margin: 0 4px;
  max-height: 34px;
  min-width: 34px;
  border: 1px solid #d6d6d6;
  border-radius: 0.25rem;
  background-color: #fff;
  padding: 7px 0;
  font-size: 13px;
  color: #333;
  z-index: 5;
  &:hover:not([disabled]) {
    background-color: #eaeaea;
  }
  &:disabled {
    cursor: default;
    background-color: #f8f8f84d;
    border: 1px solid #d6d6d64d;
  }
  &:active {
    border-color: #909090;
    color: #585858;
  }
  &[aria-current] {
    border: none;
    background-color: #2985db;
    color: #fff;
  }
`;
