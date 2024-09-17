
import ManageEmpContent from "../../components/contents/employeeContents/EmployeeManage";
import EmployeeNavbar from "../../components/navbar/NavbarEmployee";
import EmployeeSidebar from "../../components/sidebar/SidebarEmployee";

export default function ManageEmployee() {
  return (
    <>
      <EmployeeNavbar />
      <EmployeeSidebar />
      <ManageEmpContent />
    </>
  );
}
