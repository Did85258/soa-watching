
import HistoryOrderContent from "../../components/contents/employeeContents/EmployeeHistory";
import EmployeeNavbar from "../../components/navbar/NavbarEmployee";
import EmployeeSidebar from "../../components/sidebar/SidebarEmployee";

export default function HistoryEmployee() {
  return (
    <>
      <EmployeeNavbar />
      <EmployeeSidebar />
      <HistoryOrderContent />
    </>
  );
}
