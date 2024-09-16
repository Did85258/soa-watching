import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "flowbite";
import Login from "./page/users/Login.jsx";
import Test from "./page/test.jsx";
import Home from "./page/users/Home.jsx";
import ProtectedRoute from "./components/Protect/ProtectedRoute.jsx";
import Orders from "./page/users/Orders.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <ProtectedRoute element={<Home />} />, // ใช้ ProtectedRoute สำหรับ Home
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/orders",
    element: <ProtectedRoute element={<Orders />} />,
  },
  {
    path: "/test",
    element: <ProtectedRoute element={<Test />} />, // ใช้ ProtectedRoute สำหรับ Test
  },


]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
