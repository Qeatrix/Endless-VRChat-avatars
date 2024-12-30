import css from "./Search.module.less";

export const Pagination = ({ currentPage, setCurrentPage, searchAvatars, searchValue, totalPages }) => {
  return (
    <>
      <div className={css.Pagination}>
        {/* Force go to the first page */}
        {currentPage > 6 && (
          <>
            <button
              className={`btn`}
              onClick={() => {
                setCurrentPage(1);
                searchAvatars(searchValue, 1);
              }}
            >
              &laquo;
            </button>
            <span className={css.Ellipsis}>...</span>
          </>
        )}

        {/* First page */}
        {currentPage > 1 && currentPage <= 6 && (
          <button
            className={`${currentPage === 1 ? css.ActivePage : ""} btn`}
            onClick={() => {
              setCurrentPage(1);
              searchAvatars(searchValue, 1);
            }}
          >
            1
          </button>
        )}

        {/* 2 pages before this page */}
        {Array.from({ length: 2 }, (_, index) => currentPage - 5 + index)
          .filter((pageNumber) => pageNumber > 1)
          .map((pageNumber) => (
            <button
              key={pageNumber}
              className={`${currentPage === pageNumber ? css.ActivePage : ""} btn`}
              onClick={() => {
                setCurrentPage(pageNumber);
                searchAvatars(searchValue, pageNumber);
              }}
            >
              {pageNumber}
            </button>
          ))}

        {/* This page */}
        <button className={` ${css.ActivePage} btn`}>
          {currentPage}
        </button>

        {/* 2 pages after this page */}
        {Array.from({ length: 2 }, (_, index) => currentPage + 1 + index)
          .filter((pageNumber) => pageNumber < totalPages)
          .map((pageNumber) => (
            <button
              key={pageNumber}
              className={`${currentPage === pageNumber ? css.ActivePage : ""} btn`}
              onClick={() => {
                setCurrentPage(pageNumber);
                searchAvatars(searchValue, pageNumber);
              }}
            >
              {pageNumber}
            </button>
          ))}

        {/* Force go to the last page */}
        {currentPage < totalPages - 5 && (
          <>
            <span className={css.Ellipsis}>...</span>
            <button
              className={`btn`}
              onClick={() => {
                setCurrentPage(totalPages);
                searchAvatars(searchValue, totalPages);
              }}
            >
              &raquo;
            </button>
          </>
        )}
      </div>
    </>
  )
}
