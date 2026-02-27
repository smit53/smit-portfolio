import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, motion, useSpring } from 'framer-motion'

const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll()
  const [, setMousePos] = useState({ x: 0, y: 0 })

  const orbX = useSpring(0, { damping: 40, stiffness: 60 })
  const orbY = useSpring(0, { damping: 40, stiffness: 60 })
  const starX = useSpring(0, { damping: 50, stiffness: 40 })
  const starY = useSpring(0, { damping: 50, stiffness: 40 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
      orbX.set(-x * 20)
      orbY.set(-y * 20)
      starX.set(-x * 8)
      starY.set(-y * 8)
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [orbX, orbY, starX, starY])

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
        ctx.fillStyle = `rgba(255, 107, 0, ${alpha * 0.18})`
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
      <div className="absolute inset-0 bg-black" />
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{ x: orbX, y: orbY }}
      >
        <div className="absolute top-[10%] left-[20%] w-[40vmax] h-[40vmax] rounded-full bg-brand-500/[0.06] blur-[80px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[60%] right-[10%] w-[30vmax] h-[30vmax] rounded-full bg-brand-400/[0.05] blur-[60px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute bottom-[20%] left-[40%] w-[25vmax] h-[25vmax] rounded-full bg-brand-500/[0.04] blur-[50px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </motion.div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,107,0,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      <motion.div style={{ opacity: starOpacity, x: starX, y: starY }} className="absolute inset-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,107,0,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_80%,rgba(255,107,0,0.04),transparent)]" />
    </div>
  )
}

export default CosmicBackground
