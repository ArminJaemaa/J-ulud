import { useEffect } from "react"
import snowflake from "../assets/snowflake.png"

export default function SnowLayer() {
  useEffect(() => {
    const container = document.getElementById("snow-flakes")!
    const flakes: HTMLImageElement[] = []

    for (let i = 0; i < 50; i++) {
      const flake = document.createElement("img")
      flake.src = snowflake
      flake.style.position = "absolute"
      flake.style.width = `${10 + Math.random() * 20}px`
      flake.style.opacity = `${0.4 + Math.random() * 0.6}`
      flake.style.left = `${Math.random() * window.innerWidth}px`
      flake.style.top = `${Math.random() * window.innerHeight}px`
      container.appendChild(flake)
      flakes.push(flake)
    }

    let animationId: number

    function animate() {
      flakes.forEach(flake => {
        const top = parseFloat(flake.style.top!)
        flake.style.top = `${top + 1 + Math.random() * 2}px`
        if (parseFloat(flake.style.top) > window.innerHeight) {
          flake.style.top = "-20px"
          flake.style.left = `${Math.random() * window.innerWidth}px`
        }
      })
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div
      id="snow-flakes"
      className="absolute inset-0 pointer-events-none z-10"
    ></div>
  )
}
