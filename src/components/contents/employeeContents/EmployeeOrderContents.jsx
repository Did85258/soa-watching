import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";

const BASE_URL = "http://localhost:8082";

export default function ManageOrderContent() {
  const [orderData, setOrderData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [slipImage, setSlipImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const token = localStorage.getItem("employeeToken");
        if (!token) {
          console.error("No token found");
          return;
        }
        const responseOrder = await fetch(`${BASE_URL}/emp/orders/readAll`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!responseOrder.ok) {
          throw new Error(`HTTP error! status: ${responseOrder.status}`);
        }

        const resultOrder = await responseOrder.json();
        if (resultOrder.data && Array.isArray(resultOrder.data)) {
          const statuses = [
            "Payment Pending",
            "Payment Transferred",
            "Payment Success",
            "Receiving",
            "Washing",
            "Sending",
          ];
          const filteredOrders = resultOrder.data.filter((order) =>
            statuses.includes(order.status)
          );

          setOrderData(filteredOrders);
        } else {
          throw new Error("Data received is not an array");
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchOrderData();
  }, []);

  // ฟังก์ชันสำหรับเรียก API เพื่อดึงรูปสลิป
  const fetchSlipImage = async (orderId) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("employeeToken");
      const response = await fetch(`${BASE_URL}/orders/image/${orderId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setSlipImage(imageUrl);
        setModalIsOpen(true);
      } else {
        console.error("Error fetching slip image");
      }
    } catch (error) {
      console.error("Error fetching slip image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSlipImage("");
  };

  // ฟังก์ชันสำหรับเปลี่ยนสถานะและยิง API
  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("employeeToken");
      const empID = localStorage.getItem("employeeId");

      if (!token) {
        console.error("Token not found");
        return;
      }

      if (!empID) {
        console.error("Employee ID not found");
        return;
      }

      let url = "";
      let body = {};

      // เลือก URL และ Body ตามสถานะใหม่ที่กำหนด
      switch (newStatus) {
        case "Sending":
          url = `${BASE_URL}/emp/orders/EmpBySender`;
          body = { id: orderId, emp: empID };
          break;
        case "Payment Success":
          url = `${BASE_URL}/emp/orders/EmpByCheck`;
          body = { id: orderId, emp: empID };
          break;
        case "Receiving":
          url = `${BASE_URL}/emp/orders/EmpByReciever`;
          body = { id: orderId, emp: empID };
          break;
        default:
          url = "http://localhost:8082/orders/Status";
          body = { id: orderId, status: newStatus };
          break;
      }

      // เรียก API แรกตามสถานะที่เลือก
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("First API call succeeded");

        // เมื่อ API แรกสำเร็จ ให้เรียก API เปลี่ยนสถานะต่อไป
        const statusUrl = `${BASE_URL}/orders/Status`;
        const statusBody = { id: orderId, status: newStatus };
        Swal.fire({
          title: "Are you sure?",
          text: "You will Change Status the order.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const statusResponse = await fetch(statusUrl, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(statusBody),
            });
            if (statusResponse.ok) {
              
              const result = statusResponse.json();
              console.log("Status updated:", result);
              window.location.reload();
            } else {
              Swal.fire({
                title: "Error updating?",
                text: "Error updating status:"+ statusResponse.status,
                icon: "warning",
                confirmButtonText: "OK",
              })
            }
          }
        });
      } else {
        console.error("Error in first API call:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="px-6 py-8 mt-14 lg:ml-64 h-auto">
      <div className="pt-1 grid overflow-x-auto">
        <div className="flex items-start h-full justify-center">
          <div className="p-6 grid h-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <div className="text-center py-4">
              <span className="text-2xl font-semibold text-gray-800">
                Manage Order
              </span>
            </div>
            <div className="relative overflow-x-auto md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      ชื่อลูกค้า
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      อุณหภูมิน้ำ
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      น้ำยาปรับผ้านุ่ม
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      Package
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      รูปภาพ
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      พนักเช็ค
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      พนักรับ
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      พนักส่ง
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      สถานะ
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      เปลี่ยนสถานะ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {orderData.map((row, index) => (
                    <tr key={row.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {row.user}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {row.watertmp}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {row.fabrisoftener}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {row.mypackage}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {/* ปุ่มสำหรับดูรูปสลิป */}
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => fetchSlipImage(row.id)}
                        >
                          {isLoading ? "กำลังโหลด..." : "ดูสลิป"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {row.empbycheck || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {row.empbyreciever || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {row.empbysender || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {row.status === "Payment Pending"
                          ? "💳 Payment Pending"
                          : row.status === "Payment Transferred"
                          ? "💸 Payment Transferred"
                          : row.status === "Payment Success"
                          ? "💰 Payment Success"
                          : row.status === "Receiving"
                          ? "📥 Receiving"
                          : row.status === "Washing"
                          ? "🏠 Washing"
                          : row.status === "Sending"
                          ? "🛵 Sending"
                          : ""}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {/* ปุ่มเปลี่ยนสถานะแต่ละแบบ */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            className={`px-3 py-1 rounded-lg ${
                              row.status === "Payment Pending"
                                ? "bg-yellow-500"
                                : "bg-gray-200"
                            }`}
                            onClick={() =>
                              handleChangeStatus(row.id, "Payment Pending")
                            }
                          >
                            Payment Pending
                          </button>
                          <button
                            className={`px-3 py-1 rounded-lg ${
                              row.status === "Payment Transferred"
                                ? "bg-blue-500"
                                : "bg-gray-200"
                            }`}
                            onClick={() =>
                              handleChangeStatus(row.id, "Payment Transferred")
                            }
                          >
                            Payment Transferred
                          </button>
                          <button
                            className={`px-3 py-1 rounded-lg ${
                              row.status === "Payment Success"
                                ? "bg-green-400"
                                : "bg-gray-200"
                            }`}
                            onClick={() =>
                              handleChangeStatus(row.id, "Payment Success")
                            }
                          >
                            Payment Success
                          </button>
                          <button
                            className={`px-3 py-1 rounded-lg ${
                              row.status === "Receiving"
                                ? "bg-green-500"
                                : "bg-gray-200"
                            }`}
                            onClick={() =>
                              handleChangeStatus(row.id, "Receiving")
                            }
                          >
                            Receiving
                          </button>
                          <button
                            className={`px-3 py-1 rounded-lg ${
                              row.status === "Washing"
                                ? "bg-purple-500"
                                : "bg-gray-200"
                            }`}
                            onClick={() =>
                              handleChangeStatus(row.id, "Washing")
                            }
                          >
                            Washing
                          </button>
                          <button
                            className={`px-3 py-1 rounded-lg ${
                              row.status === "Sending"
                                ? "bg-orange-500"
                                : "bg-gray-200"
                            }`}
                            onClick={() =>
                              handleChangeStatus(row.id, "Sending")
                            }
                          >
                            Sending
                          </button>
                          <button
                            className={`px-3 py-1 rounded-lg ${
                              row.status === "Success"
                                ? "bg-green-700"
                                : "bg-gray-200"
                            }`}
                            onClick={() =>
                              handleChangeStatus(row.id, "Success")
                            }
                          >
                            Success
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal สำหรับดูรูปสลิป */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Slip Image Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        style={{
          content: {
            width: "400px", // ปรับขนาดกว้าง
            height: "300px", // ปรับขนาดสูง
            margin: "auto", // จัด modal ให้อยู่ตรงกลาง
            borderRadius: "10px", // ขอบโค้งมน
          },
        }}
      >
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">รูปสลิปเงิน:</h2>
          <img
            src={slipImage}
            alt="Slip"
            className="w-full h-auto rounded-lg"
          />
          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            ปิด
          </button>
        </div>
      </Modal>
    </div>
  );
}
