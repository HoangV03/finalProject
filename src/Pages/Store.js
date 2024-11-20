import { create } from "zustand";

const useUserStore = create((set) => ({
  isAuthenticated: false,
  lastActiveTime: null,

  // Thiết lập trạng thái đăng nhập
  setAuthenticated: (value) => set({ isAuthenticated: value }),

  // Cập nhật thời gian hoạt động cuối cùng
  updateLastActiveTime: () => set({ lastActiveTime: new Date().getTime() }),

  // Phương thức đăng xuất
  logout: () => {
    set({ isAuthenticated: false, lastActiveTime: null });
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("lastActiveTime");
  },

  // Tải trạng thái từ localStorage
  loadSessionFromStorage: () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const lastActiveTime = localStorage.getItem("lastActiveTime");
    if (isAuthenticated && lastActiveTime) {
      set({ isAuthenticated, lastActiveTime: parseInt(lastActiveTime, 10) });
    }
  },
}));

export default useUserStore;
