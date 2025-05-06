import React, { useEffect, useState } from 'react';

const RouteOptimization = () => {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/route-optimization")
      .then(res => res.json())
      .then(data => setRoute(data))
      .catch(err => console.error("Error fetching route data", err));
  }, []);

  return (
      <div className="route-optimization">
        <h2>Optimal Delivery Route</h2>
      {route ? (
        <p>
          From {route.origin} to {route.destination} — Estimated Time: {route.estimated_time} hrs
        </p>
      ) : (
        <p>Loading route data...</p>
      )}
    </div>
  );
};

export default RouteOptimization;
