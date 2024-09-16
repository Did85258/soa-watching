import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/users/Home";
import Login from "./page/users/Login";
import Test from "./page/test";
import Navbar from "./components/navbar/NavbarUser";
import Sidebar from "./components/sidebar/SidebarUser";
import Orders from "./page/users/Orders";

function App() {
  return (
    <>
      {location.pathname !== "/login" && <Navbar />}
      {location.pathname !== "/login" && <Sidebar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </>
  );
}

export default App;
