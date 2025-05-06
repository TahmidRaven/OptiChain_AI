import React, { useEffect, useState } from 'react';

const InventoryOptimize = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/inventory-optimize")
      .then(res => res.json())
      .then(data => setRecommendations(data))
      .catch(err => console.error("Error fetching inventory data", err));
  }, []);

  return (
    <div className="inventory-page">
      <h2>Inventory Optimization</h2>
      <ul>
        {recommendations.map((item, idx) => (
          <li key={idx}>
            SKU: {item.sku} | Reorder Point: {item.reorder_point} | Safety Stock: {item.safety_stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryOptimize;