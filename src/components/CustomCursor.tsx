import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const HOVER_SELECTOR = 'a, button, [role="button"], input, select, textarea, [data-cursor-hover]'

/**
 * Custom cursor: orange dot by default; dot + ring when over interactive elements.
 * Only active on devices with a fine pointer (mouse); hidden on touch.
 */
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const prefersPointer = window.matchMedia('(pointer: fine)').matches
    setIsPointer(prefersPointer)
  }, [])

  useEffect(() => {
    if (!isPointer) return

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
      const target = e.target as Node
      if (target && typeof (target as Element).closest === 'function') {
        setIsHovering((target as Element).closest(HOVER_SELECTOR) != null)
      }
    }
    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    document.body.addEventListener('mouseenter', handleEnter)
    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.body.removeEventListener('mouseenter', handleEnter)
    }
  }, [isPointer, visible])

  useEffect(() => {
    if (!isPointer) return
    document.body.classList.add('custom-cursor-active')
    return () => document.body.classList.remove('custom-cursor-active')
  }, [isPointer])

  if (!isPointer) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden
    >
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-brand-500 dark:bg-brand-400"
        style={{ left: position.x, top: position.y, x: '-50%', y: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.5 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="absolute w-8 h-8 rounded-full border-2 border-brand-500/60 dark:border-brand-400/60"
        style={{ left: position.x, top: position.y, x: '-50%', y: '-50%' }}
        animate={{
          opacity: visible && isHovering ? 1 : 0,
          scale: visible && isHovering ? 1 : 0.8,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </div>
  )
}
