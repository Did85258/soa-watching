import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const BASE_URL = "http://localhost:8082";
Modal.setAppElement('#root');


export default function HistoryOrderContent() {
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
        if (resultOrder.data && Array.isArray(resultOrder.data)  ) {
          const statuses = [
            "Success",
            "Order Cancel"
          ];
          const filteredOrders = resultOrder.data.filter(order => statuses.includes(order.status));
      
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

  
  

  return (
    <div className="px-6 py-8 mt-14 lg:ml-64 h-auto">
      <div className="pt-1 grid overflow-x-auto">
        <div className="flex items-start h-full justify-center">
          <div className="p-6 grid h-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <div className="text-center py-4">
              <span className="text-2xl font-semibold text-gray-800">
                History Order
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
                        {
                          row.status === "Success"
                          ? "✅ Success":
                          row.status === "Order Cancel"
                          ? "❌ Order Cancel"
                          : ''}
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
