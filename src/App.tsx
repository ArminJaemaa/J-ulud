import { Route, Routes } from "react-router-dom"
import "./App.css"
import MainPage from "./pages/MainPage"
import Selection from "./pages/Selection"
import SnowLayer from "./components/snow"
import { useEffect, useRef } from "react"

function App() {
  const bgMusicRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    bgMusicRef.current = new Audio(
      import.meta.env.BASE_URL + "sounds/felizNavida.mp3",
    )
    bgMusicRef.current.loop = true
    bgMusicRef.current.volume = 0.4

    const startMusic = () => {
      bgMusicRef.current?.play().catch(() => {})
      window.removeEventListener("click", startMusic)
      window.removeEventListener("touchstart", startMusic)
    }

    window.addEventListener("click", startMusic)
    window.addEventListener("touchstart", startMusic)

    return () => {
      bgMusicRef.current?.pause()
    }
  }, [])

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
            element={<Selection bgMusicRef={bgMusicRef} />}
          />
        </Routes>
      </div>
    </>
  )
}

export default App
