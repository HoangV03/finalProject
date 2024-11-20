import React from "react";

export const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  handleSearch, // Hàm tìm kiếm mới được truyền từ UserTable
  roleFilter,
  setRoleFilter,
}) => {
  return (
    <div className="d-flex mb-3">
      <input
        type="text"
        className="form-control mr-2"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
      <select
        className="form-control w-auto ml-2"
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
      >
        <option value="">All Roles</option>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
      </select>
    </div>
  );
};

export default SearchFilter;
