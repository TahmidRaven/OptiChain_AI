import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";

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

// Styled-components for enhanced design
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f4f7fc;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  text-align: center;
  color: #2c3e50;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 0.8rem;
  width: 50%;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ChartContainer = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ReportContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const DownloadLink = styled.a`
  padding: 0.8rem 1.5rem;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Forecast = () => {
  const [sku, setSku] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [forecastData, setForecastData] = useState(null);
  const [feedbackReportLink, setFeedbackReportLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sku && startDate && endDate) {
      const fetchForecast = async () => {
        setLoading(true);
        try {
          const response = await axios.post("http://localhost:8000/get_forecast/", {
            sku,
            start_date: startDate,
            end_date: endDate,
          });
          setForecastData(response.data.forecast); // Set forecast data from backend
          setLoading(false);
        } catch (error) {
          console.error("Error fetching forecast data:", error);
          setLoading(false);
        }
      };

      fetchForecast(); // Trigger API call when SKU, start date, and end date are entered
    }
  }, [sku, startDate, endDate]);

  const chartData = {
    labels: forecastData ? forecastData.map((item) => item.ds) : [], // Dates for x-axis
    datasets: [
      {
        label: "Forecasted Sales",
        data: forecastData ? forecastData.map((item) => item.yhat) : [], // Forecasted sales for y-axis
        borderColor: "#4caf50",
        fill: false,
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const generateFeedbackReport = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/generate_feedback_report/", {
        sku,
        start_date: startDate,
        end_date: endDate,
      });
      setFeedbackReportLink(response.data.report_path); // Set the path for download
      setLoading(false);
    } catch (error) {
      console.error("Error generating feedback report:", error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Heading>Demand Forecasting</Heading>
      <FormContainer>
        <Input
          type="text"
          placeholder="Enter SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button onClick={generateFeedbackReport} disabled={loading}>
          {loading ? "Generating Report..." : "Generate Feedback Report"}
        </Button>
      </FormContainer>

      {forecastData && (
        <ChartContainer>
          <h3>Forecasted Demand</h3>
          <Line data={chartData} />
        </ChartContainer>
      )}

      {feedbackReportLink && (
        <ReportContainer>
          <h3>Download Feedback Report</h3>
          <DownloadLink href={feedbackReportLink} download>
            Download Report
          </DownloadLink>
        </ReportContainer>
      )}
    </Container>
  );
};

export default Forecast;
