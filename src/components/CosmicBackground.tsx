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
      {/* Subtle animated gradient orbs */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[10%] left-[20%] w-[40vmax] h-[40vmax] rounded-full bg-amber-500/[0.04] blur-[80px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[60%] right-[10%] w-[30vmax] h-[30vmax] rounded-full bg-amber-400/[0.03] blur-[60px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute bottom-[20%] left-[40%] w-[25vmax] h-[25vmax] rounded-full bg-orange-500/[0.03] blur-[50px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>
      {/* Soft grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(250,204,21,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(250,204,21,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      <motion.div style={{ opacity: starOpacity }} className="absolute inset-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(250,204,21,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_80%,rgba(250,204,21,0.04),transparent)]" />
    </div>
  )
}

export default CosmicBackground
