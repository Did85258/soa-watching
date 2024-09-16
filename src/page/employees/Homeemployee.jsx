
import EmployeeNavbar from "../../components/navbar/NavbarEmployee";
import EmployeeSidebar from "../../components/sidebar/SidebarEmployee";
import EmployeeHomeContent from "../../components/contents/employeeContents/EmployeeHomeContent";
export default function HomeEmployee() {
  return (
    <>
      <EmployeeNavbar />
      <EmployeeSidebar />
      <EmployeeHomeContent />
    </>
  );
}
