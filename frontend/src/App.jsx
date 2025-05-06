import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Login from './Components/Login/Login.jsx'
import Profile from './Components/Profile/Profile.jsx'
import Registration from './Components/Registration/Registration.jsx'
import Forecast from './Components/DemandForecasting/Forecast.jsx'
import Layout from './Components/Layout/Layout.jsx'
import InventoryOptimization from './Components/InventoryOptimize/InventoryOptimize.jsx'
import SupplierAnalytics from './Components/SupplierAnalytics/SupplierAnalytics.jsx'
import RouteOptimization from './Components/RouteOptimization/RouteOptimization.jsx'
import PurchaseOrders from './Components/PurchaseOrderSuggest/PurchaseOrderSuggest.jsx'
import DynamicPricing from './Components/DynamicPricing/DynamicPricing.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={localStorage.getItem('user') ? <Profile /> : <Navigate to="/login" />} />
        <Route path="registration" element={<Registration />} />
        <Route path="demand-forecasting" element={<Forecast />} />
        <Route path="inventory-optimization" element={<InventoryOptimization />} />
        <Route path="supplier-analytics" element={<SupplierAnalytics />} />
        <Route path="route-optimization" element={<RouteOptimization />} />
        <Route path="purchase-orders" element={<PurchaseOrders />} />
        <Route path="dynamic-pricing" element={<DynamicPricing />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Route>
    </Routes>
  )
}

export default App