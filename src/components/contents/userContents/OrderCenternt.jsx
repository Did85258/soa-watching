import { useEffect, useState } from "react";
import OrderUser from "../../washPackage/OrderUser";
const BASE_URL = "http://localhost:8082";

export default function OrderContent() {
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    const fetchOrderData = async () => {
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
          // กรองเฉพาะรายการที่มี status เป็น "Payment Pending"
          const filteredOrders = resultOrder.data.filter(
            (order) => order.status === "Payment Pending"
          );
          setOrderData(filteredOrders);
        } else {
          throw new Error("Data received is not an array");
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
        setError("Failed to fetch data from server.");
      }
    };

    fetchOrderData();
  }, []);

  return (
    <div className="px-2 py-3 mt-14 lg:ml-64 h-auto">
      <div className="pt-1 grid overflow-x-auto">
        <div className="flex items-start h-full justify-center bg-gray-200">
          <div className="p-4 grid h-auto">
            <div className="justify-center text-center py-2">
              <span className="self-center text-xl font-semibold md:text-2xl whitespace-nowrap">
                Package
              </span>
            </div>
            <div className="row-span-3 relative overflow-x-auto md:rounded-lg flex  flex-wrap justify-center items-center">
              {orderData.map((item, index) => (
                <OrderUser
                  key={index}
                  mypackage={item.mypackage}
                  price={item.price}
                  wash={item.wash}
                  dry={item.dry}
                  fabrisoftener={item.fabrisoftener}
                  watertmp={item.watertmp}
                  status={item.status}
                  orderId={item.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
