import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import axios from "axios";
import "./D3Chart.css";

// Define the dimensions for the D3 chart
const width = 400;
const height = 400;
const margin = 60;
const radius = Math.min(width, height) / 2 - margin;

function D3Chart() {
  const chartContainer = useRef(null);
  const [budgetData, setBudgetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data Fetching
  useEffect(() => {
    axios
      .get("/pb-data.json")
      .then((res) => {
        if (res.data && Array.isArray(res.data.myBudget)) {
          setBudgetData(res.data.myBudget);
          setLoading(false);
        } else {
          setError("Data received from API is not in the expected format.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching budget data:", err);
        setError("Failed to fetch data. Check network and API path.");
        setLoading(false);
      });
  }, []);

  // D3 Drawing
  useEffect(() => {
    if (budgetData.length > 0 && chartContainer.current) {
      drawChart();
    }
  }, [budgetData]);

  const drawChart = () => {
    // Clear any previous chart
    d3.select(chartContainer.current).select("svg").remove();

    // 1. Create the SVG element
    const svg = d3
      .select(chartContainer.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // 2. Define the D3 Color Scale
    const color = d3
      .scaleOrdinal()
      .domain(budgetData.map((d) => d.title))
      .range(budgetData.map((d) => d.backgroundColor));

    // 3. Compute the pie/donut angles
    const pie = d3
      .pie()
      .value((d) => d.budget)
      .sort(null);

    const data_ready = pie(budgetData);

    // 4. Define the arc generator
    const arc = d3
      .arc()
      .innerRadius(radius * 0.5) // Donut chart inner radius
      .outerRadius(radius);

    // Define an outer arc generator for positioning the labels slightly outside the donut
    const outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // 5. Draw the arcs
    svg
      .selectAll("slices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.title))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // 6. Add Tooltips (using <title> element)
    svg
      .selectAll("slices")
      .data(data_ready)
      .enter()
      .append("title")
      .text((d) => `${d.data.title}: $${d.data.budget}`);

    // 7. Add Labels

    svg
      .selectAll("labels")
      .data(data_ready)
      .enter()
      .append("text")
      .text((d) => d.data.title) // Use the title as the label text
      .attr("transform", function (d) {
        // Calculate the center position of the arc and move the text there
        return "translate(" + arc.centroid(d) + ")";
      })
      .style("text-anchor", "middle") // Center the text horizontally
      .style("font-size", 12)
      .style("fill", "black") // Set a visible font color
      .call(wrap, 40); // Call the wrapping function if needed (see notes below)

    // Add percentage labels
    svg
      .selectAll("percentages")
      .data(data_ready)
      .enter()
      .append("text")
      .text((d) => {
        const total = d3.sum(budgetData, (d) => d.budget);
        const percent = (d.data.budget / total) * 100;
        return `${percent.toFixed(1)}%`;
      })
      .attr("transform", function (d) {
        // Adjust position to place percentage below the title label
        const [x, y] = arc.centroid(d);
        return `translate(${x}, ${y + 15})`;
      })
      .style("text-anchor", "middle")
      .style("font-size", 10)
      .style("fill", "black");
  };

  // Conditional Rendering
  if (loading) {
    return <div>Loading chart...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (budgetData.length === 0) {
    return <div>No budget data available to display.</div>;
  }

  // --- Final Render (JSX) ---
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Personal Budget Donut Chart</h2>
      <div ref={chartContainer}></div>
    </div>
  );
}

// NOTE: A text wrapping function is sometimes necessary for long labels,
// but is usually complex for pie charts and often replaced by a legend.
function wrap(text, width) {
  // Simple D3 text wrapping function
}

export default D3Chart;
