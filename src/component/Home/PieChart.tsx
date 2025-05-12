import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CareerDetailsResponse } from "../../store/dashboard/get-leadsCareerCountByUsername-slice";

ChartJS.register(ArcElement, Tooltip, Legend);

interface typeFor {
  sourceResponse: Record<string, string> | any;
  statusResponse?: CareerDetailsResponse | Record<string, string>;
}

const PieChart: React.FC<typeFor> = ({ sourceResponse }) => {

  // Combine both responses into a single dataset
  const combinedLabels = [ ...Object.keys(sourceResponse)];
  const combinedValues = [ ...Object.values(sourceResponse).map(Number)];

  const data = {
    // labels: combinedLabels,
    datasets: [
      {
        // label: "Distribution",
        data: combinedValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 50, 132, 0.2)",
          "rgba(54, 200, 235, 0.2)",
          "rgba(255, 180, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 50, 132, 1)",
          "rgba(54, 200, 235, 1)",
          "rgba(255, 180, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const label = combinedLabels[tooltipItem.dataIndex] || "";
            const value = combinedValues[tooltipItem.dataIndex] || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return <div style={{ width: "270px", height: "270px" }}>
  <Pie data={data} options={options} />
</div>
;
};

export default PieChart;
