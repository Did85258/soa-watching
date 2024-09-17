
import EmployeeNavbar from "../../components/navbar/NavbarEmployee";
import EmployeeSidebar from "../../components/sidebar/SidebarEmployee";
export default function HomeEmployee() {
  return (
    <>
      <EmployeeNavbar />
      <EmployeeSidebar />
      <EmployeeManage />
    </>
  );
}
