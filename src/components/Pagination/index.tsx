import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  onChangePage,
  currentPage,
}) => (
  <div className={styles.root}>
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={3}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
    />
  </div>
);
