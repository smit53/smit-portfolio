/**
 * Grid Hover Effect — pixel grid that fills with color on hover.
 * Adapted from Framer: https://framer.com/m/Grid-Hover-Effect-ASlO.js
 */

import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GridHoverEffectProps {
  gridSize?: number
  hoverColors?: [string, string, string, string]
  backgroundColor?: string
  animationDuration?: number
  maxOpacity?: number
  borderColor?: string
  borderWidth?: number
  showCursor?: boolean
  cursorColor?: string
  cursorSize?: number
  className?: string
}

const DEFAULT_COLORS: [string, string, string, string] = [
  'rgba(255, 107, 0, 0.55)',
  'rgba(255, 140, 50, 0.5)',
  'rgba(255, 180, 100, 0.45)',
  'rgba(200, 100, 0, 0.5)',
]

export default function GridHoverEffect({
  gridSize = 18,
  hoverColors = DEFAULT_COLORS,
  backgroundColor = 'transparent',
  animationDuration = 0.8,
  maxOpacity = 0.9,
  borderColor = 'rgba(255,255,255,0.06)',
  borderWidth = 1,
  showCursor = false,
  cursorColor = '#FF6B00',
  cursorSize = 20,
  className = '',
}: GridHoverEffectProps) {
  const [animatingPixels, setAnimatingPixels] = useState<Set<string>>(new Set())
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isMouseInside, setIsMouseInside] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerDimensions({ width: rect.width, height: rect.height })
      }
    }
    updateDimensions()
    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  const actualGridSize = Math.max(
    5,
    Math.min(gridSize, Math.floor(Math.min(containerDimensions.width, containerDimensions.height) / 12))
  )

  const pixels = useMemo(() => {
    const pixelArray: { row: number; col: number; id: string }[] = []
    for (let row = 0; row < actualGridSize; row++) {
      for (let col = 0; col < actualGridSize; col++) {
        pixelArray.push({ row, col, id: `${row}-${col}` })
      }
    }
    return pixelArray
  }, [actualGridSize])

  const handlePixelHover = useCallback((pixelId: string) => {
    setAnimatingPixels((prev) => new Set(prev).add(pixelId))
  }, [])

  const handleAnimationComplete = useCallback((pixelId: string) => {
    setAnimatingPixels((prev) => {
      const next = new Set(prev)
      next.delete(pixelId)
      return next
    })
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setCursorPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const getPixelColor = useCallback(
    (pixelId: string) => {
      const hash = pixelId.split('-').reduce((acc, val) => acc + parseInt(val, 10), 0)
      return hoverColors[hash % hoverColors.length]
    },
    [hoverColors]
  )

  if (containerDimensions.width === 0 || containerDimensions.height === 0) {
    return <div ref={containerRef} className={`absolute inset-0 ${className}`} />
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        backgroundColor,
        display: 'grid',
        gridTemplateColumns: `repeat(${actualGridSize}, 1fr)`,
        gridTemplateRows: `repeat(${actualGridSize}, 1fr)`,
        gap: borderWidth,
        cursor: 'default',
        userSelect: 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsMouseInside(true)}
      onMouseLeave={() => setIsMouseInside(false)}
    >
      {pixels.map((pixel) => {
        const isAnimating = animatingPixels.has(pixel.id)
        return (
          <div
            key={pixel.id}
            className="relative w-full h-full"
            style={{ border: `${borderWidth}px solid ${borderColor}` }}
            onMouseEnter={() => handlePixelHover(pixel.id)}
          >
            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0, maxOpacity, maxOpacity * 0.7, 0],
                    scale: [0.8, 1, 1.1, 1.2],
                  }}
                  exit={{ opacity: 0, scale: 1.3 }}
                  transition={{
                    duration: animationDuration,
                    ease: 'easeOut',
                    times: [0, 0.3, 0.7, 1],
                  }}
                  onAnimationComplete={() => handleAnimationComplete(pixel.id)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: getPixelColor(pixel.id),
                    borderRadius: 2,
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        )
      })}
      {showCursor && isMouseInside && (
        <motion.div
          style={{
            position: 'absolute',
            width: cursorSize,
            height: cursorSize,
            backgroundColor: cursorColor,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 1000,
            left: cursorPosition.x - cursorSize / 2,
            top: cursorPosition.y - cursorSize / 2,
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  )
}
