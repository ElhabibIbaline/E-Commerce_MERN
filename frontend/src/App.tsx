import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage.tsx"

import NavBar from "./components/NavBar"
import RegisterPage from "./pages/RegisterPage.tsx"
import AuthProvider from "./context/Auth/AuthProvider.tsx"
import LoginPage from "./pages/LoginPage.tsx"

function App() {


  return (

    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
