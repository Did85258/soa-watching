import { useState } from "react";
import Swal from "sweetalert2";
const BASE_URL = "http://localhost:8082";

export default function OrderUser({
  mypackage,
  price,
  wash,
  dry,
  fabrisoftener,
  watertmp,
  status,
  orderId,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteOrder = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        Swal.fire({
          title: "Error!",
          text: "No token found. Please login.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      Swal.fire({
        title: "Are you sure?",
        text: "You will delete the order.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const responseDelete = await fetch(
            `${BASE_URL}/orders/delete?id=${orderId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (responseDelete.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "Your order has been deleted.",
              icon: "success",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Network response was not ok",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the order.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="p-4">
      <div className="bg-pink-200 text-teal-800 p-4 rounded-md hover:bg-pink-300 flex justify-center items-center w-72">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">{mypackage}</h1>
          <p>ราคา {price} บาท</p>
          <p>ซัก {wash} kg</p>
          <p>อบ {dry} นาที</p>
          <p>น้ำยาปรับผ้านุ่ม: {fabrisoftener} </p>
          <p>อุณหภูมิน้ำ: {watertmp} </p>
          <p>สถานะ: {status}</p>
          <h2 className="text-xl font-bold">ราคารวม {price} บาท</h2>
          <div className="flex flex-wrap">
            <div className="px-2">
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded "
                type="submit"
                onClick={openModal}
              >
                ชำระเงิน
              </button>
            </div>
            <div className="px-2">
              <button
                className="mt-4 bg-red-700 text-white px-4 py-2 rounded"
                onClick={deleteOrder}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">การชำระเงิน</h2>
            <p>ข้อมูลแพ็กเกจขนาด S</p>
            <p>ราคา: 100 บาท</p>
            <p>ซัก 10.5 kg</p>
            <p>อบ 25 นาที</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
