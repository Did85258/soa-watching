import { useState } from "react";
const BASE_URL = "http://localhost:8082";
export default function Test() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const softenerData = fetch(`${BASE_URL}/fab/readAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  console.log(softenerData);

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
            <div className="row-span-3 relative overflow-x-auto md:rounded-lg flex space-x-5 space-y-5 flex-wrap justify-center items-center">
              <div className="bg-pink-200 text-teal-800 p-4 rounded-md hover:bg-pink-300 flex justify-center items-center w-72">
                <div className="flex flex-col items-center">
                  <h1 className="text-4xl font-bold">S</h1>
                  <p>ราคา 100 บาท</p>
                  <p>ซัก 10.5 kg</p>
                  <p>อบ 25 นาที</p>
                  <p>น้ำยาปรับผ้านุ่ม: </p>
                  <p>อุณหภูมิน้ำ: </p>
                  <p>สถานะ: </p>
                  <h2 className="text-xl font-bold">ราคารวม 200บาท</h2>
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
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg w-96">
                  <h2 className="text-2xl font-semibold mb-4">รายละเอียดแพ็กเกจ</h2>
                  <p>ข้อมูลแพ็กเกจขนาด S</p>
                  <p>ราคา: 100 บาท</p>
                  <p>ซัก 10.5 kg</p>
                  <p>อบ 25 นาที</p>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={closeModal}>
                    ปิด
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
