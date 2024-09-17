import { useEffect, useState } from "react";
import OrderUser from "../../washPackage/OrderUser";
import React from "react";
import HistoryImage from "../../washPackage/HistoryImage";

const BASE_URL = "http://localhost:8082";

export default function historyContent() {
  
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    const fetcHitoryData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          console.error("No token found");
          setError("No token found");
          return;
        }
        const userId = localStorage.getItem("userId");
        const responseOrder = await fetch(
          `${BASE_URL}/orders/readAllByUser?id=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!responseOrder.ok) {
          throw new Error(`HTTP error! status: ${responseOrder.status}`);
        }

        const resultOrder = await responseOrder.json();
        if (resultOrder.data && Array.isArray(resultOrder.data)) {
          setOrderData(resultOrder.data);
        } else {
          throw new Error("Data received is not an array");
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
        setError("Failed to fetch data from server.");
      }
    };

    fetcHitoryData();
  }, []);

  return (
    <div className="px-6 py-8 mt-14 lg:ml-64 h-auto">
  <div className="pt-1 grid overflow-x-auto">
    <div className="flex items-start h-full justify-center">
      <div className="p-6 grid h-auto bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="text-center py-4">
          <span className="text-2xl font-semibold text-gray-800">
            History
          </span>
        </div>
        <div className="relative overflow-x-auto md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase">No.</th>
                
                <th className="px-6 py-4 text-left text-sm font-medium uppercase">อุณหภูมิน้ำ</th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase">น้ำยาปรับผ้านุ่ม</th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase">Package</th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase">รูปภาพ</th>

                <th className="px-6 py-4 text-left text-sm font-medium uppercase">พนักเช็ค</th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase">พนักรับ</th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase">พนักส่ง</th>

                <th className="px-6 py-4 text-left text-sm font-medium uppercase">สถานะ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {orderData.map((row, index) => (
                <tr key={row.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>

                  
                  <td className="px-6 py-4 text-sm text-gray-700">{row.watertmp}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{row.fabrisoftener}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{row.mypackage}</td>
                  <td className="px-6 py-4 text-sm text-gray-700"><HistoryImage orderId={row.id} /></td>

                  <td className="px-6 py-4 text-sm text-gray-700">{row.empbycheck|| '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{row.empbysender|| '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{row.empbyreciever|| '-'}</td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                  {row.status === 'Success' ? '✅ Success' : 
                  row.status === 'Payment Pending' ? '💳 Payment Pending' :
                   row.status === 'Payment Transferred' ? '💸  Payment Transferred' : 
                  row.status === 'Receiving' ? '📥 Receiving' :
                  row.status === 'Washing' ? '🏠 Washing' :
                  row.status === 'Sending' ? '🛵 Sending' :
                  row.status === "Payment Success" ? '💰 Payment Success' :
                  row.status === "Order Cancel" ? '❌ Order Cancel' :''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

  

  );
}
