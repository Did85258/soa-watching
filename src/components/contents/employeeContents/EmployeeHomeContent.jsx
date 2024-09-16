import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const StatusChart = () => {
  const [chartData, setChartData] = useState({
    
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
        barPercentage: 0.6, // ความกว้างของแถบ
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      
      title: {
        display: true,
        text: "Order Status Distribution",
        color: "#fff",
        font: {
          size: 20,
        },
      },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#fff",
        font: {
          weight: "bold",
        },
        formatter: (value, context) => {
          return value; // แสดงจำนวนที่ด้านบนของแต่ละแท่ง
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff", // สีของ label แกน x
        },
      },
      y: {
        ticks: {
          color: "#fff", // สีของ label แกน y
        },
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8082/emp/orders/chartstatus",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcyNjUwNzg2OCwiZXhwIjoxNzI2NTQzODY4fQ.MGQgpSKgQksi-crbzZOE4BMeyysmzKfXM3_JNcb1kNc", // แนบ Bearer Token
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        if (result.code === 200) {
          const labels = result.data.map((item) => item.status);
          const data = result.data.map((item) => item.count);

          setChartData((prevData) => ({
            ...prevData,
            labels: labels,
            datasets: [
              {
                ...prevData.datasets[0],
                data: data,
              },
            ],
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-2 py-3 mt-14 lg:ml-64 h-auto ">
      <div className="pt-1 grid overflow-x-auto">
        <div className="flex items-start h-full justify-center  ">
          
          <div className="w-full max-w-4xl mx-auto mt-5 bg-gray-900 p-4 rounded-lg shadow-lg ">
            <Bar data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusChart;
