import { useState, useEffect } from "react"

export default function MainPage() {
  const [playerName, setPlayerName] = useState("")
  const [players, setPlayers] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("players")
    if (saved) setPlayers(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players))
  }, [players])

  const addPlayer = () => {
    if (!playerName.trim()) return
    setPlayers([...players, playerName.trim()])
    setPlayerName("")
  }

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index))
  }

  return (
    <div className="relative min-h-screen p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-6">Vali nimed</h1>

      <div className="flex mb-4 w-80 max-w-full">
        <input
          type="text"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          placeholder="Sisesta siia nimi"
          onKeyDown={e => e.key === "Enter" && addPlayer()}
          className="flex-1 px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none bg-white/30 text-black placeholder-black/50"
        />
        <button
          onClick={addPlayer}
          className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700"
        >
          Add
        </button>
      </div>

      <ul className="fixed top-4 right-4 w-64 space-y-2 z-20">
        {players.map((name, index) => (
          <li
            key={index}
            className="flex items-center justify-end bg-black/60 px-4 py-2 rounded-md"
          >
            <span className="mr-auto text-white text-right overflow-hidden">
              {name}
            </span>
            <button
              onClick={() => removePlayer(index)}
              className="text-red-500 hover:text-red-700 ml-4"
            >
              Kustuta
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
