import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Lấy token từ localStorage (hoặc nơi bạn lưu trữ token)
const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Hàm GET - Lấy danh sách tất cả người dùng
export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: getAuthHeader(),
    });
    // Kiểm tra nếu response.data có thuộc tính data thì lấy mảng data đó
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      console.error("Dữ liệu không phải là mảng:", response.data);
      return []; // Trả về mảng rỗng nếu dữ liệu không đúng định dạng
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error.message);
    throw new Error("Không thể lấy danh sách người dùng");
  }
};

// Hàm GET - Lấy thông tin người dùng theo ID
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(
      `Lỗi khi lấy thông tin người dùng với ID: ${id}`,
      error.message
    );
    throw new Error("Không thể lấy thông tin người dùng");
  }
};

// Hàm POST - Tạo người dùng mới
export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, postData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo người dùng:", error.message);
    throw new Error("Không thể tạo người dùng");
  }
};

// Hàm PUT - Cập nhật thông tin người dùng
export const updatePost = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, updatedData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(
      `Lỗi khi cập nhật thông tin người dùng với ID: ${id}`,
      error.message
    );
    throw new Error("Không thể cập nhật người dùng");
  }
};

// Hàm DELETE - Xóa người dùng theo ID
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa người dùng với ID: ${id}`, error.message);
    throw new Error("Không thể xóa người dùng");
  }
};

// Hàm GET - Lấy thông tin người dùng theo email
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/users?email=${email}`, {
      headers: getAuthHeader(),
    });
    const users = response.data;
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error(
      `Lỗi khi lấy thông tin người dùng với email: ${email}`,
      error.message
    );
    throw new Error("Không thể lấy thông tin người dùng");
  }
};
