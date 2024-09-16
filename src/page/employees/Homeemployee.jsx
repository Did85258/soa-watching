
import Navbar from "../../components/navbar/NavbarUser";
import Sidebar from "../../components/sidebar/SidebarUser";
import EmployeeHomeContent from "../../components/contents/employeeContents/EmployeeHomeContent";
export default function Home() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <EmployeeHomeContent />
    </>
  );
}
