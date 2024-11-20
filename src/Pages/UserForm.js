import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPosts, createPost, updatePost } from "../API/Axios";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");
  const [role, setRole] = useState("User");
  const [errors, setErrors] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const users = await getPosts();
          const userToEdit = users.find((user) => user.id === id);

          console.log("User data:", userToEdit);
          if (userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
            setRole(userToEdit.role);
          } else {
            console.error("User not found");
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        if (id) {
          await updatePost(id, { name, email, role });
        } else {
          await createPost({ name, email, role, password });
        }
        navigate("/");
      } catch (error) {
        console.error("Failed to save user:", error);
      }
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!name.trim()) {
      formErrors.name = "Name is required!";
      isValid = false;
    } else if (name.length < 3) {
      formErrors.name = "Name must be at least 3 characters long.";
      isValid = false;
    }

    if (!email.trim()) {
      formErrors.email = "Email is required!";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid!";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  return (
    <div className="card mt-4">
      <div className="card-header">{id ? "Edit User" : "Add User"}</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>
          <div className="form-group">
    <label>Password</label>
    <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
    />
</div>

          <div className="form-group">
            <label>Role</label>
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            {id ? "Update" : "Add"} User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
