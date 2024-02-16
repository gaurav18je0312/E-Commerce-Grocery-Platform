import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import UserRoute from "./Utils/UserRoute";
import AdminRoute from "./Utils/AdminRoute";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import { CartProvider } from "./context/CartContext";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <div className="browser">
      <Router>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route element={<LoginPage />} path="login" />
              <Route element={<SignupPage />} path="signUp" />
              <Route element={<ForgetPasswordPage />} path="forgotPassword" />
              <Route exact element={<HomePage />} path="" />
              <Route
                element={
                  <UserRoute>
                    <CartPage />
                  </UserRoute>
                }
                path="cart"
              />
              <Route
                element={
                  <UserRoute>
                    <OrderHistoryPage />
                  </UserRoute>
                }
                path="orderHistory"
              />
              <Route element={<CategoryPage />} path=":filter/:category" />
              <Route element={<ProductPage />} path="product/:id" />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
