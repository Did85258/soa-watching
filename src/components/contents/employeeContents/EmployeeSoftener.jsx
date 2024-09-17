import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
Modal.setAppElement("#root");

const BASE_URL = "http://localhost:8082";

export default function SoftenerContent() {
  const [softenerData, setSoftenerData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenUpdate, setModalIsOpenUpdate] = useState(false);

  const [softenerName, setSoftenerName] = useState("");
  const [softenerPrice, setSoftenerPrice] = useState();

  const [nameUpdate, setNameUpdate] = useState();
  const [priceUpdate, setPriceUpdate] = useState();
  const [idUpdate, setIdUpdate] = useState();

  useEffect(() => {
    const fetchSoftenerData = async () => {
      try {
        const token = localStorage.getItem("employeeToken");
        if (!token) {
          console.error("No token found");
          return;
        }
        const responseSoftener = await fetch(`${BASE_URL}/fab/readAll`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!responseSoftener.ok) {
          throw new Error(`HTTP error! status: ${responseSoftener.status}`);
        }

        const resultSoftener = await responseSoftener.json();
        if (resultSoftener.data && Array.isArray(resultSoftener.data)) {
          const filteredOrders = resultSoftener.data.filter(
            (softener) => softener.id !== 1
          );
          setSoftenerData(filteredOrders);
        } else {
          throw new Error("Data received is not an array");
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchSoftenerData();
  }, []);

  const CreateSoftener = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("employeeToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      //   console.log(token);
      const responseCreate = await fetch(`${BASE_URL}/emp/fab/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: softenerName, price: softenerPrice }),
      });

      if (responseCreate.ok) {
        Swal.fire({
          title: "Create Success!",
          text: "Create Softener Success!",
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
          text: "Failed to Create.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to Create.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const deleteSoftener = async (id) => {
    try {
      const token = localStorage.getItem("employeeToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      console.log(id);
      await Swal.fire({
        title: "Are you sure?",
        text: "You will Change Status the order.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const responseDelete = await fetch(
            `${BASE_URL}/emp/fab/delete?id=${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (responseDelete.ok) {
            window.location.reload();
          } else {
            Swal.fire({
              title: "Error  ?",
              text: "Error Delete Softener!",
              icon: "warning",
              confirmButtonText: "OK",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to Create.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const updateSoftener = async () => {
    try {
      const token = localStorage.getItem("employeeToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      console.log(nameUpdate + "." + priceUpdate);
      const responseUpdate = await fetch(`${BASE_URL}/emp/fab/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ id:idUpdate , name: nameUpdate, price: priceUpdate }),
      });

      if (responseUpdate.ok) {
        Swal.fire({
          title: "Create Success!",
          text: "Create Softener Success!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            // window.location.reload();s
          }
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to Create.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to Create.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const closeModalUpdate = () => {
    setModalIsOpenUpdate(false);

  };

  const handleSoftenerNameChange = (event) => {
    setSoftenerName(event.target.value);
  };

  const handleSoftenerPriceChange = (event) => {
    setSoftenerPrice(event.target.value);
  };

  const handleNameUpdateChange = (event) => {
    setNameUpdate(event.target.value);
  };

  const handlePriceUpdateChange = (event) => {
    setPriceUpdate(event.target.value);
  };
  console.log(idUpdate)

  return (
    <div className="px-6 py-8 mt-14 lg:ml-64 h-auto">
      <div className="pt-1 grid overflow-x-auto">
        <div className="flex items-start h-full justify-center">
          <div className="p-6 grid h-auto bg-white shadow-lg rounded-lg border border-gray-200 w-2/3">
            <div className="text-center py-4">
              <span className="text-2xl font-semibold text-gray-800">
                Manage Softener
              </span>
            </div>

            <div className="relative overflow-x-auto md:rounded-lg w-full">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => setModalIsOpen(true)}
              >
                เพิ่ม
              </button>
              <table className="min-w-full divide-y divide-gray-300 mt-2 ">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      #
                    </th>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      ชื่อพนัก
                    </th>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      ตำแหน่ง
                    </th>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      แก้ไข
                    </th>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      ลบ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {softenerData.map((row, index) => (
                    <tr key={row.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {row.name}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        {row.price}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            setModalIsOpenUpdate(true);
                            setNameUpdate(row.name);
                            setPriceUpdate(row.price);
                            setIdUpdate(row.id);
                          }}
                          
                        >
                          แก้ไข
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => deleteSoftener(row.id)}
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Create */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Slip Image Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        style={{
          content: {
            width: "600px", // ปรับขนาดกว้าง
            height: "300px", // ปรับขนาดสูง
            margin: "auto", // จัด modal ให้อยู่ตรงกลาง
            borderRadius: "10px", // ขอบโค้งมน
          },
        }}
      >
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-center">Softener</h2>
          <form className="" onSubmit={CreateSoftener}>
            <div className="flex items-center">
              ชื่อน้ำยา
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Softener Name.."
                onChange={handleSoftenerNameChange}
                required
              />
            </div>
            <div className="flex items-center mt-2">
              ราคา
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5  placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Price.."
                onChange={handleSoftenerPriceChange}
                required
              />
            </div>
            <div className="flex  ">
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
              >
                ยืนยัน
              </button>
              <button
                onClick={closeModal}
                className="mt-4 px-4 py-2 ml-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                ปิด
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Modal Create */}
      <Modal
        isOpen={modalIsOpenUpdate}
        onRequestClose={closeModalUpdate}
        contentLabel="Slip Image Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        style={{
          content: {
            width: "600px", // ปรับขนาดกว้าง
            height: "300px", // ปรับขนาดสูง
            margin: "auto", // จัด modal ให้อยู่ตรงกลาง
            borderRadius: "10px", // ขอบโค้งมน
          },
        }}
      >
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-center">แก้ไข</h2>
          <form className="" onSubmit={updateSoftener} >
            <div className="flex items-center">
              ชื่อน้ำยา
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Softener Name.."
                value={nameUpdate}
                onChange={handleNameUpdateChange}
                required
              />
            </div>
            <div className="flex items-center mt-2">
              ราคา
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5  placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Price.."
                value={priceUpdate}
                onChange={handlePriceUpdateChange}
                required
              />
            </div>
            <div className="flex  ">
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                
              >
                ยืนยัน
              </button>
              <button
                onClick={closeModalUpdate}
                className="mt-4 px-4 py-2 ml-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                ปิด
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
