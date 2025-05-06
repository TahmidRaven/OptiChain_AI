import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [feedbackReportLink, setFeedbackReportLink] = useState("");

  // Fetch inventory alerts when the component mounts
  useEffect(() => {
    const fetchInventoryAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/inventory/alerts');
        setAlerts(response.data.alerts);
      } catch (error) {
        console.error('Error fetching inventory alerts:', error);
      }
    };
    fetchInventoryAlerts();
  }, []);

  const generateFeedbackReport = async (sku) => {
    try {
      const response = await axios.post('http://localhost:8000/generate_feedback_report/', {
        sku,
        start_date: '2024-01-01',
        end_date: '2024-01-30',  // Example date range
      });
      setFeedbackReportLink(response.data.report_path);
    } catch (error) {
      console.error('Error generating feedback report:', error);
    }
  };

  return (
    <div>
      <h2>Real-Time Inventory Alerts</h2>
      {alerts.length === 0 ? (
        <p>No products need reordering at the moment.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Current Stock</th>
              <th>Reorder Quantity</th>
              <th>Forecasted Sales (Next 30 Days)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, index) => (
              <tr key={index}>
                <td>{alert.sku}</td>
                <td>{alert.current_stock}</td>
                <td>{alert.reorder_quantity}</td>
                <td>{alert.forecasted_sales.toFixed(2)}</td>
                <td>
                  <button onClick={() => generateFeedbackReport(alert.sku)}>Generate Feedback Report</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {feedbackReportLink && (
        <div>
          <h3>Download Feedback Report</h3>
          <a href={feedbackReportLink} download>Download Report</a>
        </div>
      )}
    </div>
  );
};

export default InventoryAlerts;
