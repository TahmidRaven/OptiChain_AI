import React, { useEffect, useState } from 'react';

const DynamicPricing = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/dynamic-pricing")
      .then(res => res.json())
      .then(data => setPrices(data))
      .catch(err => console.error("Error fetching pricing data", err));
  }, []);

  return (
    <div className="dynamic-pricing">
      <h2>Dynamic Pricing Recommendations</h2>
      <ul>
        {prices.map((p, idx) => (
          <li key={idx}>
            SKU: {p.sku} | Recommended Price: ৳{p.recommended_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DynamicPricing;
