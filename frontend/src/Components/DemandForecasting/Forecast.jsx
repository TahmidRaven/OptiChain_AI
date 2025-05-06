import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const Forecast = () => {
  const [sku, setSku] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [forecastData, setForecastData] = useState(null);
  const [feedbackReportLink, setFeedbackReportLink] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/forecast/", {
        sku,
        start_date: startDate,
        end_date: endDate,
      });
      setForecastData(response.data.forecast);

      const reportResponse = await axios.post(
        "http://localhost:8000/generate_feedback_report/",
        {
          sku,
          start_date: startDate,
          end_date: endDate,
        }
      );
      setFeedbackReportLink(reportResponse.data.report_path);
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  };

  const data = {
    labels: forecastData ? forecastData.map((item) => item.ds) : [],
    datasets: [
      {
        label: "Forecasted Sales",
        data: forecastData ? forecastData.map((item) => item.yhat) : [],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
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
          <Line data={data} />
        </div>
      )}

      {feedbackReportLink && (
        <div>
          <h3>Download Feedback Report</h3>
          <a href={feedbackReportLink} download>
            Download Report
          </a>
        </div>
      )}
    </div>
  );
};

export default Forecast;
