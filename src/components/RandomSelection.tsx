import { useState } from "react"
import Confetti from "react-confetti"

interface Props {
  players: string[]
  leftOut: string[]
  received: string[]
  setReceived: React.Dispatch<React.SetStateAction<string[]>>
  setLeftOut?: React.Dispatch<React.SetStateAction<string[]>>
  bgMusicRef?: React.RefObject<HTMLAudioElement>
}

export default function RandomSelection({
  players,
  leftOut,
  received,
  setReceived,
  setLeftOut,
  bgMusicRef,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [confettiActive, setConfettiActive] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)

  const playDrumRoll = () => {
    bgMusicRef?.current.pause()

    const drum = new Audio(import.meta.env.BASE_URL + "sounds/drum_roll.mp3")
    drum.volume = 0.7
    drum.play()

    drum.onended = () => {
      if (bgMusicRef?.current) {
        bgMusicRef.current.volume = 0.4
      }
    }
  }

  const optOut = (name: string) => {
    if (!setLeftOut) return
    setLeftOut(prev => [...prev, name])
  }

  const activePlayers = players.filter(
    p => !leftOut.includes(p) && !received.includes(p),
  )

  function pickRandom() {
    if (isDrawing) return
    if (activePlayers.length === 0) {
      setSelected("HURRA KÕIK SAID KINGI!!!")
      return
    }

    const randomPlayer =
      activePlayers[Math.floor(Math.random() * activePlayers.length)]

    setIsDrawing(true)
    setModalOpen(true)
    playDrumRoll()
    setSelected(null)

    setTimeout(() => {
      setSelected(randomPlayer)
      setReceived(prev => [...prev, randomPlayer])
      setConfettiActive(true)
      setIsDrawing(false)
    }, 5500)
  }

  return (
    <div className="bg-black/30 p-6 rounded-xl text-center shadow-xl min-w-[250px]">
      <h2 className="text-xl text-white mb-4 font-bold bg-green-700/90 p-2 rounded-xl">
        Random Selection
      </h2>

      <button
        onClick={pickRandom}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold mb-4"
        disabled={isDrawing}
      >
        Pick Random
      </button>

      <div className="text-2xl text-white font-bold min-h-[50px]">
        {selected ?? "—"}
      </div>

      <div className=" text-xl text-gray-300 mt-2">
        Järele jäänud
        {activePlayers.map(name => (
          <div
            key={name}
            className="text-xl font-bold"
          >
            <span>{name}</span>
            {setLeftOut && (
              <button
                onClick={() => optOut(name)}
                className="bg-red-500 text-white ml-5 px-2 py-1 rounded text-sm"
              >
                Opt out
              </button>
            )}
          </div>
        ))}
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/100 flex items-center justify-center z-50">
          {confettiActive && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={300}
              gravity={0.3}
              initialVelocityY={50}
              wind={0.05}
              tweenDuration={4000}
              confettiSource={{
                x: 0,
                y: window.innerHeight - 10,
                w: window.innerWidth,
                h: 0,
              }}
            />
          )}

          <div className="relative bg-gradient-to-br from-red-700 via-green-800 to-red-600 rounded-3xl p-16 max-w-3xl w-full text-center shadow-2xl">
            <div>
              <button
                onClick={() => {
                  setModalOpen(false)
                  setConfettiActive(false)
                  bgMusicRef?.current.play()
                }}
                disabled={isDrawing}
                className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold hover:bg-red-600"
              >
                X
              </button>
              {!selected ? (
                <p className="text-xl font-bold text-white animate-pulse">
                  JA KINGI SAAAAAAAAB...
                </p>
              ) : (
                <p className="text-3xl font-bold text-white">{selected}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
