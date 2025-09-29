import { React } from "react";
import { useEffect, useState } from "react";
// import pb from "../pb-data.json";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);
const dataSource = {
  datasets: [
    {
      data: [],
      backgroundColor: [],
    },
  ],
  labels: [],
};

function Chart() {
  // Use state to hold the chart data
  const [chartData, setChartData] = useState(dataSource);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Fetch data asynchronously inside useEffect
    // The URL should point to your JSON file, ensure it's accessible.
    // If it's a static file in the 'public' folder, use the path:
    axios
      .get("/pb-data.json")
      .then((res) => {
        // 2. Safely check for the required data structure
        if (res.data && Array.isArray(res.data.myBudget)) {
          const apiData = res.data.myBudget;

          const newChartData = {
            labels: apiData.map((item) => item.title),
            datasets: [
              {
                data: apiData.map((item) => item.budget),
                backgroundColor: apiData.map((item) => item.backgroundColor),
                // It's good practice to have the hover color as well
                hoverBackgroundColor: apiData.map(
                  (item) => item.backgroundColor
                ),
              },
            ],
          };

          // 3. Update state, which triggers a re-render
          setChartData(newChartData);
          setLoading(false);
        } else {
          // Handle case where data is malformed
          setError("Data received from API is not in the expected format.");
          setLoading(false);
        }
      })
      .catch((err) => {
        // 4. Handle fetch errors (like 404)
        console.error("Error fetching budget data:", err);
        setError("Failed to fetch data. Check network and API path.");
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Conditional Rendering ---
  if (loading) {
    return <div>Loading chart...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  // A Doughnut chart requires at least one data point to render properly
  if (chartData.labels.length === 0) {
    return <div>No budget data available to display.</div>;
  }

  // --- Final Render ---
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Personal Budget Doughnut Chart</h2>
      {/* 5. Use the Doughnut component and pass the state as its 'data' prop */}
      <Doughnut data={chartData} />
    </div>
  );
}

export default Chart;
