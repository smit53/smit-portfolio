import { useEffect, useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars: Array<{ x: number; y: number; z: number; size: number }> = []
    const count = 120

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random(),
        size: Math.random() * 1.5 + 0.3,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        star.z -= 0.002
        if (star.z <= 0) star.z = 1
        const x = (star.x - canvas.width / 2) / star.z + canvas.width / 2
        const y = (star.y - canvas.height / 2) / star.z + canvas.height / 2
        const alpha = (1 - star.z) * 0.6
        ctx.beginPath()
        ctx.arc(x, y, star.size / star.z, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(250, 204, 21, ${alpha * 0.15})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }
    animate()

    return () => window.removeEventListener('resize', resize)
  }, [])

  const starOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.6, 0.6, 1])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-950" />
      <motion.div style={{ opacity: starOpacity }} className="absolute inset-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(250,204,21,0.08),transparent)]" />
    </div>
  )
}

export default CosmicBackground
