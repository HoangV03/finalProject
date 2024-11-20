import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";
import { getPosts, deletePost } from "../API/Axios";
import styles from "./Table.module.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const usersData = await getPosts();
      if (Array.isArray(usersData)) {
        setUsers(usersData);
      } else {
        console.error("Dữ liệu không phải là mảng:", usersData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter(
      (user) =>
        (user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(searchValue.toLowerCase())) &&
        (roleFilter === "" || user.role === roleFilter)
    )
    .sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === "id") {
        return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
      }
      return 0;
    });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deletePost(id);
        await fetchUsers(); // Gọi lại danh sách người dùng
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
};  

  const handleEdit = (user) => {
    navigate(`/edit-user/${user.id}`);
  };

  const handleSearch = () => {
    setSearchValue(searchTerm);
    setCurrentPage(1);
  };

  const handleSelectUser = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelectedUsers = async () => {
    if (selectedUsers.length === 0) {
      return;
    }

    if (window.confirm("Are you sure you want to delete selected users?")) {
      try {
        await Promise.all(selectedUsers.map((id) => deletePost(id)));
        setSelectedUsers([]);
        setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
      } catch (error) {
        console.error("Failed to delete selected users:", error);
      }
    }
  };

  const toggleSortOrder = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-header">User Management</div>
      <div className="card-body">
        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate("/add-user")}
        >
          Add New User
        </button>

        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />

        <button
          className="btn btn-danger mb-3"
          onClick={handleDeleteSelectedUsers}
          disabled={selectedUsers.length === 0}
        >
          Delete Selected Users
        </button>

        <table className={`table table-striped table-hover ${styles.table}`}>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setSelectedUsers(
                      isChecked ? currentUsers.map((user) => user.id) : []
                    );
                  }}
                  checked={
                    selectedUsers.length === currentUsers.length &&
                    currentUsers.length > 0
                  }
                />
              </th>
              <th style={{ width: "5%", cursor: "pointer" }} onClick={() => toggleSortOrder("id")}>
                ID{" "}
                {sortField === "id" ? (
                  sortOrder === "asc" ? (
                    <span>&#9650;</span>
                  ) : (
                    <span>&#9660;</span>
                  )
                ) : null}
              </th>
              <th style={{ width: "25%", cursor: "pointer" }} onClick={() => toggleSortOrder("name")}>
                Name{" "}
                {sortField === "name" ? (
                  sortOrder === "asc" ? (
                    <span>&#9650;</span>
                  ) : (
                    <span>&#9660;</span>
                  )
                ) : null}
              </th>
              <th style={{ width: "25%" }}>Email</th>
              <th style={{ width: "15%" }}>Role</th>
              <th style={{ width: "30%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id} onClick={() => handleEdit(user)}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(user.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
          setCurrentPage={setCurrentPage}
          usersPerPage={usersPerPage}
          setUsersPerPage={setUsersPerPage}
        />
      </div>
    </div>
  );
};

export default UserTable;
