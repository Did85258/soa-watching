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
    labels: [],
    datasets: [
      {
        label: "Order Status",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)", // Payment Pending
          "rgba(54, 162, 235, 0.8)", // Payment Transferred
          "rgba(255, 206, 86, 0.8)", // Payment Success
          "rgba(75, 192, 192, 0.8)", // Receiving
          "rgba(153, 102, 255, 0.8)", // Washing
          "rgba(255, 159, 64, 0.8)", // Sending
          "rgba(201, 203, 207, 0.8)", // Order Cancel
          "rgba(0, 255, 127, 0.8)", // Success
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(201, 203, 207, 1)",
          "rgba(0, 255, 127, 1)",
        ],
        borderWidth: 2,
        barPercentage: 0.6,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Order Status ทั้งหมด",
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
        formatter: (value) => {
          return value; // Show the count on top of each bar
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff", // X-axis labels color
        },
      },
      y: {
        ticks: {
          color: "#fff", // Y-axis labels color
        },
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("employeeToken");
        const response = await fetch(
          "http://localhost:8082/emp/orders/chartstatus",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        if (result.code === 200) {
          const statusLabels = [
            "Payment Pending",
            "Payment Transferred",
            "Payment Success",
            "Receiving",
            "Washing",
            "Sending",
            "Order Cancel",
            "Success",
          ];
          
          const data = statusLabels.map((status) => {
            const statusItem = result.data.find((item) => item.status === status);
            return statusItem ? statusItem.count : 0;
          });

          setChartData((prevData) => ({
            ...prevData,
            labels: statusLabels,
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
    <div className="px-2 py-3 mt-14 lg:ml-64 h-auto">
      <div className="pt-1 grid overflow-x-auto">
        <div className="flex items-start h-full justify-center">
          <div className="w-full max-w-4xl mx-auto mt-5 bg-gray-900 p-4 rounded-lg shadow-lg">
            <Bar data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusChart;
