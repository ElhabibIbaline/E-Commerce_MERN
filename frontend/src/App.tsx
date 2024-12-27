import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { Login } from "./pages/Login"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<HomePage />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
