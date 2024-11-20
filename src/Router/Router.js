import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import useUserStore from "../Pages/Store";

// Sử dụng lazy để tải các component khi cần thiết
const Login = lazy(() => import("./Login"));
const UserTable = lazy(() => import("../Pages/UserTable"));
const UserForm = lazy(() => import("../Pages/UserForm"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login setIsAuthenticated={useUserStore.getState().setAuthenticated} />
      </Suspense>
    ),
  },
  {
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute
          isAuthenticated={useUserStore.getState().isAuthenticated}
        />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserTable />
          </Suspense>
        ),
      },
      {
        path: "/add-user",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserForm />
          </Suspense>
        ),
      },
      {
        path: "/edit-user/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserForm />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;
