import React, { useEffect, useState } from 'react';
import './PurchaseOrderSuggest.css'

const PurchaseOrderSuggest = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/purchase-orders")
      .then(res => res.json())
      .then(data => setSuggestions(data))
      .catch(err => console.error("Error fetching PO suggestions", err));
  }, []);

  return (
    <div className="purchase-order">
      <h2>Suggested Purchase Orders</h2>
      <ul>
        {suggestions.map((s, idx) => (
          <li key={idx}>
            SKU: {s.sku} | Suggested Order Quantity: {s.suggested_order}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseOrderSuggest;
