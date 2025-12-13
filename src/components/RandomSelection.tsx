import { useRef, useState } from "react"
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
  const applauseRef = useRef<HTMLAudioElement | null>(null)

  if (!applauseRef.current) {
    applauseRef.current = new Audio(
      import.meta.env.BASE_URL + "sounds/applause.mp3",
    )
    applauseRef.current.volume = 0.5
  }

  const playYippe = () => {
    const yipe = new Audio(import.meta.env.BASE_URL + "sounds/yipee.mp3")
    yipe.volume = 0.7
    yipe.play()
    applauseRef.current?.play()
  }

  const stopApplause = () => {
    if (!applauseRef.current) return
    applauseRef.current.pause()
    applauseRef.current.currentTime = 0
  }

  const playDrumRoll = () => {
    bgMusicRef?.current.pause()

    const drum = new Audio(import.meta.env.BASE_URL + "sounds/drum_roll.mp3")
    drum.volume = 0.7
    drum.play()

    drum.onended = () => {
      playYippe()
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
    <div
      className="
  bg-black/90 rounded-xl text-center shadow-xl
  p-4 sm:p-6 lg:p-10 2xl:p-16
  min-w-[250px]
"
    >
      <h2 className="sm:text-xl lg:text-2xl xl:text-3xl text-white mb-4 font-bold bg-green-900/90 p-2 rounded-xl">
        Randomisaator
      </h2>

      <button
        onClick={pickRandom}
        className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold mb-4"
        disabled={isDrawing}
      >
        {"->"}Käivita{"<-"}
      </button>

      <div className="text-3xl text-white font-bold min-h-[50px]">
        {selected ?? "_______"}
      </div>

      <div className=" text-2xl text-gray-300 mt-2 font-bold">
        Järele jäänud
        {activePlayers.map(name => (
          <div
            key={name}
            className="
      flex items-center justify-between gap-4
      text-base sm:text-lg lg:text-xl 2xl:text-2xl
      font-bold
    "
          >
            <span className="truncate">{name}</span>

            {setLeftOut && (
              <button
                onClick={() => optOut(name)}
                className="
          flex-shrink-0
          bg-red-500 hover:bg-red-700 text-white
          rounded
          px-2 sm:px-3 2xl:px-4
          py-1 sm:py-2
          text-sm sm:text-base 2xl:text-xl
        "
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/100 flex items-center justify-center z-50">
          {confettiActive && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={500}
              gravity={0.3}
              initialVelocityY={50}
              wind={0.05}
              tweenDuration={10000}
              confettiSource={{
                x: 0,
                y: window.innerHeight - 10,
                w: window.innerWidth,
                h: 0,
              }}
            />
          )}

          <div
            className="
    relative bg-gradient-to-br from-red-700 via-green-800 to-red-600
    rounded-3xl shadow-2xl text-center
    p-6 sm:p-12 lg:p-20 2xl:p-32
    max-w-lg sm:max-w-2xl lg:max-w-4xl 2xl:max-w-6xl
    w-full
  "
          >
            <div>
              <button
                onClick={() => {
                  setModalOpen(false)
                  setConfettiActive(false)
                  bgMusicRef?.current.play()
                  stopApplause()
                }}
                disabled={isDrawing}
                className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold hover:bg-red-600"
              >
                X
              </button>
              {!selected ? (
                <p
                  className="
    font-bold text-white animate-pulse
    text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl
    tracking-wide
  "
                >
                  JA KINGI SAAAAAAAAB...
                </p>
              ) : (
                <p
                  className="
    font-extrabold text-white
    text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl
    tracking-wide
    animate-bounce
  "
                >
                  {selected}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
