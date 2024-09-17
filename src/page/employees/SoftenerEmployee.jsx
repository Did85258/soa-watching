
import SoftenerContent from "../../components/contents/employeeContents/EmployeeSoftener";
import EmployeeNavbar from "../../components/navbar/NavbarEmployee";
import EmployeeSidebar from "../../components/sidebar/SidebarEmployee";

export default function SoftenerEmployee() {
  return (
    <>
      <EmployeeNavbar />
      <EmployeeSidebar />
      <SoftenerContent />
    </>
  );
}
