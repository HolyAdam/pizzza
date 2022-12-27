import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

export const Pagination = ({ onChangePage }) => {
  return (
    <div className={styles.root}>
        <ReactPaginate
            className={styles.pagination}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => onChangePage(e.selected + 1)}
            pageRangeDisplayed={3}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    </div>
  )
}
