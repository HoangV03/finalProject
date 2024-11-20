import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../Pages/Store"; // Nhập useUserStore

const Navbar = () => {
  const { logout } = useUserStore(); // Lấy phương thức logout từ store
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Gọi phương thức logout để thực hiện đăng xuất
    navigate("/login"); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
            Customer
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">
            Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/settings">
            Product
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
            Order
            </Link>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
