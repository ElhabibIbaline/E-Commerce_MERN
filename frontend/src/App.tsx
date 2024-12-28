import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage.tsx"

import NavBar from "./components/NavBar"
import RegisterPage from "./pages/RegisterPage.tsx"

function App() {


  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
