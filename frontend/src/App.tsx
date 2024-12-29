import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage.tsx"

import NavBar from "./components/NavBar"
import RegisterPage from "./pages/RegisterPage.tsx"
import AuthProvider from "./context/Auth/AuthProvider.tsx"
import LoginPage from "./pages/LoginPage.tsx"
import CartPage from "./pages/CartPage.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx"
import CartProvider from "./context/Cart/CartProvider.tsx"

function App() {


  return (

    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>

  )
}

export default App
