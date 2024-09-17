import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const BASE_URL = "http://localhost:8082";

export default function ManageEmpContent() {
  const [empData, setEmpData] = useState([]);


  useEffect(() => {
    const fetchEmpData = async () => {
      try {
        const token = localStorage.getItem("employeeToken");
        if (!token) {
          console.error("No token found");
          return;
        }
        const responseOrder = await fetch(`${BASE_URL}/emp/readAll`, {
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

          setEmpData(resultOrder.data);
        } else {
          throw new Error("Data received is not an array");
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchEmpData();
  }, []);

  

 

  
  

  return (
    <div className="px-6 py-8 mt-14 lg:ml-64 h-auto">
      <div className="pt-1 grid overflow-x-auto">
        <div className="flex items-start h-full justify-center">
          <div className="p-6 grid h-auto bg-white shadow-lg rounded-lg border border-gray-200 w-2/3">
            <div className="text-center py-4">
              <span className="text-2xl font-semibold text-gray-800">
                Manage Employee
              </span>
            </div>
            <div className="relative overflow-x-auto md:rounded-lg w-full">
              <table className="min-w-full divide-y divide-gray-300">
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

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {empData.map((row, index) => (
                    <tr key={row.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {row.name}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        {row.position}
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
