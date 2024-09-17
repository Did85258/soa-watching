import { useState } from "react";
import Swal from "sweetalert2";
const BASE_URL = "http://localhost:8082";
export default function HistoryImage({ orderId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [slipImage, setSlipImage] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const fetchUpload = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    // if (!selectedImage) return;
    console.log(selectedImage);
    const formData = new FormData();
    formData.append("file", selectedImage, {
      type: "image/jpeg",
    });

    try {
      const responseUpload = await fetch(
        `${BASE_URL}/orders/upload?id=${orderId}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (responseUpload.ok) {
        Swal.fire({
          title: "Success!",
          text: "Update successful.",
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
          text: "Network response was not ok.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  const fetchSlipImage = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(`${BASE_URL}/orders/image/${orderId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setSlipImage(imageUrl);
      } else {
        console.error("Error fetching slip image");
      }
    } catch (error) {
      console.error("Error fetching slip image:", error);
    }
  };

  const openEditImage = () => {
    setShowUploadButton(true);
  };
  const closeEditImage = () => {
    setShowUploadButton(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded "
          onClick={() => {
            openModal();
            fetchSlipImage();
          }}
        >
          ดูรูป
        </button>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-auto ">
            <div >
              <img src={slipImage} alt="Slip" className="h-72 rounded-lg" />
            </div>
            <div>
              {showUploadButton && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={fetchUpload}
                  >
                    ยืนยัน
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-wrap">
              <div className="px-2">
                <button
                  className="mt-4 bg-green-500  text-white px-4 py-2 rounded "
                  type="submit"
                  onClick={openEditImage}
                >
                  แก้ไขรูป
                </button>
              </div>
              <div className="px-2">
                <button
                  className="mt-4 bg-red-700 text-white px-4 py-2 rounded"
                  onClick={() => {
                    closeModal();
                    closeEditImage();
                  }}
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
