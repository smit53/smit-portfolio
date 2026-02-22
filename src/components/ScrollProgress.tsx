import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScroll } from '../context/ScrollContext'

const ScrollProgress: React.FC = () => {
  const { scrollRef } = useScroll()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const main = scrollRef.current
    if (!main) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = main
      const max = scrollHeight - clientHeight
      setProgress(max <= 0 ? 0 : scrollTop / max)
    }
    main.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => main.removeEventListener('scroll', onScroll)
  }, [scrollRef])

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:block w-px h-24 bg-zinc-800/60 rounded-full overflow-hidden">
      <motion.div
        className="w-full bg-amber-400/60 rounded-full origin-top"
        style={{ scaleY: progress }}
      />
    </div>
  )
}

export default ScrollProgress
