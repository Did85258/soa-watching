import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const BASE_URL = "http://localhost:8082";

export default function WashPackage({
  price,
  kg,
  dry,
  url_img,
  img_height,
  size,
  packageId,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [softenerData, setSoftenerData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [softener, setSoftener] = useState(1);
  const [temp, setTemp] = useState(1);

  const createOrder = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");
      const userId = localStorage.getItem("userId");
      console.log(userId);
      console.log(temp);
      console.log(softener);
      console.log(packageId);
      const responseCreate = await fetch(`${BASE_URL}/orders/cerate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: userId,
          watertmp: temp,
          fabrisoftener: softener,
          mypackage: packageId,
          status: "Payment Pending",
        }),
      });

      if (responseCreate.ok) {
        navigate("/orders");
        Swal.fire({
          title: "Success!",
          text: "Order successful.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        setError("Network response was not ok");
        Swal.fire({
          title: "Error!",
          text: "Network response was not ok.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to login");
      Swal.fire({
        title: "Error!",
        text: "Failed to login.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    const fetchSoftenerData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          console.error("No token found");
          setError("No token found");
          return;
        }

        const response = await fetch(`${BASE_URL}/fab/readAll`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const responseTemp = await fetch(`${BASE_URL}/water/readAll`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log("Response status:", response.status);
        if (!responseTemp.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const resultTemp = await responseTemp.json();

        if (result.data && Array.isArray(result.data)) {
          setSoftenerData(result.data);
        } else {
          throw new Error("Data received is not an array");
        }

        if (resultTemp.data && Array.isArray(resultTemp.data)) {
          setTempData(resultTemp.data);
        } else {
          throw new Error("Data received is not an array");
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
        setError("Failed to fetch data from server.");
      }
    };

    fetchSoftenerData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <button
        className="bg-pink-200 text-teal-800 p-4 rounded-md hover:bg-pink-300 flex flex-wrap justify-center items-center w-52"
        onClick={openModal}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">{size}</h1>
          <img src={url_img} className={img_height} alt={size} />
          <p>ราคา: {price} บาท</p>
          <p>ซัก: {kg} kg</p>
          <p>อบ: {dry} นาที</p>
        </div>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-auto">
            <h2 className="text-2xl font-semibold mb-4">
              รายละเอียดแพ็กเกจ Size: {size}
            </h2>
            <p>ราคา: {price} บาท</p>
            <p>ซัก: {kg} kg</p>
            <p>อบ: {dry} นาที</p>
            <form onSubmit={createOrder}>
              <div className="flex flex-wrap">
                <label htmlFor="softener" className="p-1">
                  น้ำยาปรับผ้านุ่ม :
                </label>
                <select
                  className=" w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ps-2 p-2.5  "
                  placeholder="Choose Softener"
                  onChange={(e) => setSoftener(e.target.value)}
                >
                  {softenerData.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name} ราคา: {item.price} บาท
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-wrap py-1">
                <label htmlFor="temp" className="p-1">
                  อุณหภูมิน้ำ :
                </label>
                <select
                  className=" w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ps-2 p-2.5  "
                  placeholder="Choose Softener"
                  onChange={(e) => setTemp(e.target.value)}
                >
                  {tempData.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name} ราคา: {item.price} บาท
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-wrap">
                <div className="px-2">
                  <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded "
                    type="submit"
                  >
                    ยืนยัน
                  </button>
                </div>
                <div className="px-2">
                  <button
                    className="mt-4 bg-red-700 text-white px-4 py-2 rounded"
                    onClick={closeModal}
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
