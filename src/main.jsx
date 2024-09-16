import * as React from "react";
import * as ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "flowbite";
import Login from "./page/users/Login.jsx";
import Test from "./page/test.jsx";
import Home from "./page/users/Home.jsx";
import ProtectedRoute from "./components/Protect/ProtectedRoute.jsx";
import Orders from "./page/users/Orders.jsx";
import History from "./page/users/History.jsx";
import Register from "./page/users/Register.jsx";

import LoginEmployee from "./page/employees/LoginEmployee.jsx";
import Employeehome from "./page/employees/HomeEmployee.jsx";



const router = createBrowserRouter([
  {
    path: "/home",
    element: <ProtectedRoute element={<Home />} />, // ใช้ ProtectedRoute สำหรับ Home
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/employee/login",
    element: <LoginEmployee />,
  },
  {
    path: "/orders",
    element: <ProtectedRoute element={<Orders />} />,
  },
  {
    path: "/test",
    element: <ProtectedRoute element={<Test />} />, // ใช้ ProtectedRoute สำหรับ Test
  },
  {
    path: "/history",
    element: <ProtectedRoute element={<History />} />, // ใช้ ProtectedRoute สำหรับ Test
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/employee/home",
    element: <Employeehome />,
  },


]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
