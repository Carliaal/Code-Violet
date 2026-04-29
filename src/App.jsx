import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/navbar"
import { Home } from "./pages/home"
import { Dashboard } from "./pages/dasboard"
import { DemografiaPage } from "./pages/demografia"
import { EpisodioPage } from "./pages/episodio"
import { ConsecuenciasPage } from "./pages/consecuencias"
import { BarrerasPage } from "./pages/barreras"
import { RecursosPage } from "./pages/recursos"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/demografia" element={<DemografiaPage />} />
        <Route path="/dashboard/episodio" element={<EpisodioPage />} />
        <Route path="/dashboard/consecuencias" element={<ConsecuenciasPage />} />
        <Route path="/dashboard/barreras" element={<BarrerasPage />} />
        <Route path="/dashboard/recursos" element={<RecursosPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
