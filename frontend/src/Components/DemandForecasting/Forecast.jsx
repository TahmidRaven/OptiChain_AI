import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Forecast = () => {
  const [sku, setSku] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [forecastData, setForecastData] = useState(null);
  const [feedbackReportLink, setFeedbackReportLink] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/forecast/', {
        sku,
        start_date: startDate,
        end_date: endDate
      });
      setForecastData(response.data.forecast);

      // Clear feedback report link whenever new forecast is generated
      setFeedbackReportLink("");
    } catch (error) {
      console.error('Error fetching forecast:', error);
    }
  };

  // Function to generate the feedback report
  const generateFeedbackReport = async () => {
    try {
      const response = await axios.post('http://localhost:8000/generate_feedback_report/', {
        sku,
        start_date: startDate,
        end_date: endDate
      });
      setFeedbackReportLink(response.data.report_path);
    } catch (error) {
      console.error('Error generating feedback report:', error);
    }
  };

  // Chart data preparation
  const chartData = {
    labels: forecastData ? forecastData.map(item => item.ds) : [],  // Dates for x-axis
    datasets: [
      {
        label: 'Forecasted Sales',
        data: forecastData ? forecastData.map(item => item.yhat) : [],  // Forecasted sales for y-axis
        borderColor: 'rgba(75,192,192,1)',
        fill: false,  // Line chart, no fill
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 8
      }
    ]
  };

  return (
    <div>
      <h2>Demand Forecasting</h2>
      <div>
        <input
          type="text"
          placeholder="Enter SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleSubmit}>Get Forecast</button>
      </div>

      {forecastData && (
        <div>
          <h3>Forecasted Demand</h3>
          {/* Line chart to show forecasted sales */}
          <Line data={chartData} />
        </div>
      )}

      {/* Button to generate feedback report */}
      <button onClick={generateFeedbackReport}>Generate Feedback Report</button>

      {/* Display download link for feedback report if available */}
      {feedbackReportLink && (
        <div>
          <h3>Download Feedback Report</h3>
          <a href={feedbackReportLink} download>Download Report</a>
        </div>
      )}
    </div>
  );
};

export default Forecast;
