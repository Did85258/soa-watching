import * as React from "react";
import * as ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "flowbite";
import Login from "./page/users/Login.jsx";
import Test from "./page/test.jsx";
import Home from "./page/users/Home.jsx";

import Orders from "./page/users/Orders.jsx";
import History from "./page/users/History.jsx";
import Register from "./page/users/Register.jsx";

import LoginEmployee from "./page/employees/LoginEmployee.jsx";
import Employeehome from "./page/employees/HomeEmployee.jsx";
import ManageOrderContent from "./components/contents/employeeContents/EmployeeOrderContents.jsx";
import ManageOrderEmployee from "./page/employees/ManagOrders.jsx";
import HistoryEmployee from "./page/employees/HistoryEmployee.jsx";
import ManageEmployee from "./page/employees/ManageEmployee.jsx";
import {
  ProtectedRouteEmployee,
  ProtectedRouteUser,
} from "./components/Protect/ProtectedRoute.jsx";
import SoftenerEmployee from "./page/employees/SoftenerEmployee.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <ProtectedRouteUser element={<Home />} />, // ใช้ ProtectedRoute สำหรับ Home
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
    element: <ProtectedRouteUser element={<Orders />} />,
  },
  {
    path: "/test",
    element: <ProtectedRouteUser element={<Test />} />, // ใช้ ProtectedRoute สำหรับ Test
  },
  {
    path: "/history",
    element: <ProtectedRouteUser element={<History />} />, // ใช้ ProtectedRoute สำหรับ Test
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/employee/home",
    element: <ProtectedRouteEmployee element={<Employeehome />} />,
  },
  {
    path: "/employee/manageorder",
    element: <ProtectedRouteEmployee element={<ManageOrderEmployee />} />,
  },
  {
    path: "/employee/emphistoryorder",
    element: <ProtectedRouteEmployee element={<HistoryEmployee />} />,
  },
  {
    path: "/employee/empmanage",
    element: <ProtectedRouteEmployee element={<ManageEmployee />} />,
  },
  {
    path: "/employee/softener",
    element: <ProtectedRouteEmployee element={<SoftenerEmployee />} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
