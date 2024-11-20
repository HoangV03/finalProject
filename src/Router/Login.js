import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../Pages/Store";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setAuthenticated, updateLastActiveTime, isAuthenticated } =
    useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    useUserStore.getState().loadSessionFromStorage();
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        username: email,
        password,
      });

      const { accessToken, role } = response.data.data;
      console.log(response.data)
      if (role === "ADMIN") {
        setAuthenticated(true);
        updateLastActiveTime();

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("lastActiveTime", new Date().getTime().toString());
        localStorage.setItem("accessToken", accessToken);

        setSuccessMessage("Đăng Nhập Thành Công");

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 1000);
      } else {
        setErrorMessage("Bạn không có quyền truy cập.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Thông tin đăng nhập sai.");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Trang Đăng Nhập</h2>
      <form onSubmit={handleLogin} className="mt-4">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Đăng Nhập
        </button>
      </form>
      {successMessage && (
        <div className="alert alert-success mt-3 text-center">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger mt-3 text-center">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Login;
