import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/navbar"
import { Home } from "./pages/home"
import { Dashboard } from "./pages/dasboard.jsx"
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App