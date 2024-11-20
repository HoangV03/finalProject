import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserForm from "./Pages/UserForm";
import UserTable from "./Pages/UserTable";
import ProtectedRoute from "./Router/ProtectedRoute";
import Login from "./Router/Login";
import useUserStore from "./Pages/Store";

const App = () => {
  const {
    users,
    setUsers,
    editUserId,
    setEditUserId,
    isAuthenticated,
    setAuthenticated,
  } = useUserStore();
  const handleSetIsAuthenticated = (value) => {
    setAuthenticated(value); // Cập nhật trạng thái xác thực
  };

  const [errors, setErrors] = useState({ name: "", email: "" });

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={handleSetIsAuthenticated} />} // Đăng nhập
        />
      </Routes>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar />
                <UserTable
                  users={users}
                  setUsers={setUsers}
                  editUserId={editUserId}
                  setEditUserId={setEditUserId}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-user"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar />
                <UserForm
                  users={users}
                  setUsers={setUsers}
                  errors={errors}
                  setErrors={setErrors}
                  editUserId={editUserId}
                  setEditUserId={setEditUserId}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-user/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar />
                <UserForm
                  users={users}
                  setUsers={setUsers}
                  errors={errors}
                  setErrors={setErrors}
                  editUserId={editUserId}
                  setEditUserId={setEditUserId}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
