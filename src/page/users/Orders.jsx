import OrderContent from "../../components/contents/userContents/OrderConternt";
import Navbar from "../../components/navbar/NavbarUser";
import Sidebar from "../../components/sidebar/SidebarUser";

export default function Orders() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <OrderContent />
    </>
  );
}
