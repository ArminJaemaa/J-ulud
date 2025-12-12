import { Route, Routes } from "react-router-dom"
import "./App.css"
import MainPage from "./pages/MainPage"
import Selection from "./pages/Selection"
import SnowLayer from "./components/snow"

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-red-900 via-green-800 to-red-800 relative overflow-hidden">
        <div
          id="snow"
          className="absolute inset-0 pointer-events-none z-10"
        ></div>
        <SnowLayer />
        <Routes>
          <Route
            path="/"
            element={<MainPage />}
          />
          <Route
            path="/selection"
            element={<Selection />}
          />
        </Routes>
      </div>
    </>
  )
}

export default App
