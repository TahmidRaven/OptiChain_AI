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
import styled from 'styled-components';

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

// Styled components
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  width: 50%;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  border: none;
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
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
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ReportContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const Link = styled.a`
  display: inline-block;
  margin-top: 1rem;
  padding: 1rem 2rem;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  text-decoration: none;

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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/forecast/', {
        sku,
        start_date: startDate,
        end_date: endDate
      });
      setForecastData(response.data.forecast);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching forecast:', error);
      setLoading(false);
    }
  };

  const generateFeedbackReport = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/generate_feedback_report/', {
        sku,
        start_date: startDate,
        end_date: endDate
      });
      setFeedbackReportLink(response.data.report_path);
      setLoading(false);
    } catch (error) {
      console.error('Error generating feedback report:', error);
      setLoading(false);
    }
  };

  const chartData = {
    labels: forecastData ? forecastData.map(item => item.ds) : [], // Dates for x-axis
    datasets: [
      {
        label: 'Forecasted Sales',
        data: forecastData ? forecastData.map(item => item.yhat) : [], // Forecasted sales for y-axis
        borderColor: '#4caf50',
        fill: false,
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 8
      }
    ]
  };

  return (
    <Container>
      <Heading>Demand Forecasting</Heading>
      <Form>
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
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Loading..." : "Get Forecast"}
        </Button>
      </Form>

      {forecastData && (
        <ChartContainer>
          <h3>Forecasted Demand</h3>
          {/* Line chart to show forecasted sales */}
          <Line data={chartData} />
        </ChartContainer>
      )}

      <Button onClick={generateFeedbackReport} disabled={loading}>
        {loading ? "Generating Report..." : "Generate Feedback Report"}
      </Button>

      {/* Display download link for feedback report if available */}
      {feedbackReportLink && (
        <ReportContainer>
          <h3>Download Feedback Report</h3>
          <Link href={feedbackReportLink} download>
            Download Report
          </Link>
        </ReportContainer>
      )}
    </Container>
  );
};

export default Forecast;
