import { Route, Routes } from "react-router-dom";
import { Home } from "./routes/home/Home";
import About from "./routes/home/About";
import Contact from "./routes/home/Contact";
import Signup from "./routes/Auth/Signup";
import Login from "./routes/Auth/Login";
import AddOrder from "./routes/userDashboard/AddOrder";
import UserDashBoard from "./routes/userDashboard/UserDashboard";
import { DashBoard } from "./routes/Admin/Dashboard";
import { UserProtectedRoute } from "./protected/UserProtectedRoute";
import { AdminProtectedRoute } from "./protected/AdminProtectedRoute";
import { NotFoundPage } from "./routes/NotFoundPage";

export const router = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    <Route
      path="/add-order"
      element={
        <UserProtectedRoute>
          <AddOrder />
        </UserProtectedRoute>
      }
    />
    <Route
      path="/dashboard"
      element={
        <UserProtectedRoute>
          <UserDashBoard />
         </UserProtectedRoute>
      }
    />

    <Route
      path="/admin/dashboard"
      element={
        <AdminProtectedRoute>
          <DashBoard />
        </AdminProtectedRoute>
      }
    />
    <Route path="*" element={<NotFoundPage />}></Route>
  </Routes>
);
