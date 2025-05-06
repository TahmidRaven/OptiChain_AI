import React, { useEffect, useState } from 'react';

const SupplierAnalytics = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/supplier-analytics")
      .then(res => res.json())
      .then(data => setSuppliers(data))
      .catch(err => console.error("Error fetching supplier data", err));
  }, []);

  return (
    <div className="supplier-analytics">
      <h2>Supplier Performance Analytics</h2>
      <ul>
        {suppliers.map((s, idx) => (
          <li key={idx}>
            Supplier: {s.name} | Performance Score: {s.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierAnalytics;
