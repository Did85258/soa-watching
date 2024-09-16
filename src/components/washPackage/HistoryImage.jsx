export default function HistoryImage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="px-2">
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded "
          onClick={openModal}
        >
          ชำระเงิน
        </button>
      </div>
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
          </div>
        </div>
      )}
    </>
  );
}
