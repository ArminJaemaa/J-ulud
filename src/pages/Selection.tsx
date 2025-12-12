import { useEffect, useState } from "react"
import RandomSelection from "../components/RandomSelection"

export default function Selection({ bgMusicRef }: { bgMusicRef: any }) {
  const [players, setPlayers] = useState<string[]>([])
  const [leftOut, setLeftOut] = useState<string[]>([])
  const [received, setReceived] = useState<string[]>([])

  useEffect(() => {
    const p = localStorage.getItem("players")
    const lo = localStorage.getItem("players_left_out")
    const r = localStorage.getItem("players_gifted")

    if (p) setPlayers(JSON.parse(p))
    if (lo) setLeftOut(JSON.parse(lo))
    if (r) setReceived(JSON.parse(r))
  }, [])

  useEffect(() => {
    localStorage.setItem("players_left_out", JSON.stringify(leftOut))
  }, [leftOut])

  useEffect(() => {
    localStorage.setItem("players_gifted", JSON.stringify(received))
  }, [received])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      <div className="flex flex-col items-start">
        <h2 className=" text-xl text-white rounded-xl bg-green-700/90 pl-5 pr-5 font-bold mb-3">
          Välja jäetud
        </h2>

        <ul className="space-y-2">
          {leftOut.map(name => (
            <li
              key={name}
              className="flex justify-between bg-black/30 p-2 rounded"
            >
              <span>{name}</span>

              <button
                onClick={() => setLeftOut(prev => prev.filter(n => n !== name))}
                className="px-2 py-1 rounded text-sm bg-green-500 text-white"
              >
                Put back
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center items-start">
        <RandomSelection
          players={players}
          leftOut={leftOut}
          received={received}
          setReceived={setReceived}
          setLeftOut={setLeftOut}
          bgMusicRef={bgMusicRef}
        />
      </div>

      <div className="flex flex-col items-end">
        <h2 className="text-xl text-white rounded-xl bg-green-700/90 pl-5 pr-5 font-bold mb-3">
          Received Gifts
        </h2>

        <ul className="space-y-2">
          {received.map(name => (
            <li
              key={name}
              className="flex justify-between bg-green-600/40 p-2 rounded"
            >
              <span>{name}</span>
              <button
                onClick={() =>
                  setReceived(prev => prev.filter(n => n !== name))
                }
                className="px-2 py-1 bg-red-500 text-white rounded text-sm"
              >
                Undo
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
