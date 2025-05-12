import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface typeFor {
  responseData: Record<string, string> | any;
}

const VerticalBarChart: React.FC<typeFor> = ({ responseData }) => {
  // Extract keys and values dynamically
  const labels = Object.keys(responseData);
  const values = Object.values(responseData).map(Number);

  const data = {
    labels,
    datasets: [
      {
        label: "Career Count",
        data: values,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          // No need for filtering since we only have one dataset now
          filter: (legendItem: any) => legendItem.text !== "Career Count",
        },
      },
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-full max-h-[420px] p-3 flex justify-center">
      <Bar options={options} data={data} />
    </div>
  );
};

export default VerticalBarChart;
