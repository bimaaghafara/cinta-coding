
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// pages
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import DetailPosting from '../../pages/DetailPosting';
import DetailProfile from '../../pages/DetailProfile';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/detail-posting" element={<DetailPosting />} />
        <Route path="/detail-profile" element={<DetailProfile />} />
      </Routes>
    </BrowserRouter>
  )
};