import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  usersPerPage,
  setUsersPerPage,
}) => {
  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);
  const handlePreviousPage = () => setCurrentPage(currentPage - 1);
  const handleNextPage = () => setCurrentPage(currentPage + 1);

  return (
    <div className="row align-items-center">
      {/* Cột chứa select */}
      <div className="col-auto">
        <select
          className="form-control w-auto"
          value={usersPerPage}
          onChange={(e) => setUsersPerPage(Number(e.target.value))}
        >
          <option value={5}>5 rows</option>
          <option value={10}>10 rows</option>
          <option value={20}>20 rows</option>
        </select>
      </div>

      {/* Cột chứa các nút */}
      <div className="col d-flex justify-content-end">
        <button
          className="btn btn-secondary"
          onClick={handleFirstPage}
          disabled={currentPage === 1}
        >
          First Page
        </button>
        <button
          className="btn btn-secondary mx-2"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-secondary mx-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
        >
          Last Page
        </button>
      </div>
    </div>
  );
};

export default Pagination;
