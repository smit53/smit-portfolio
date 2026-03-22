/**
 * 3D Neumorphic Theme Toggle
 * Pill-shaped toggle with inset container + raised sliding thumb.
 * Sun/moon icons rotate in on state change.
 */

import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme, transitionState } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      disabled={transitionState !== 'idle'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      whileTap={{ scale: 0.94 }}
      style={{
        width: 68,
        height: 34,
        borderRadius: 17,
        padding: 3,
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        flexShrink: 0,
        /* Neumorphic inset container */
        background: isDark ? '#161616' : '#e8e8e8',
        boxShadow: isDark
          ? 'inset 4px 4px 8px #0a0a0a, inset -4px -4px 8px #222222'
          : 'inset 4px 4px 8px #cacaca, inset -3px -3px 7px #ffffff',
        transition: 'background 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Track icons */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          pointerEvents: 'none',
        }}
      >
        <Sun
          size={12}
          strokeWidth={2}
          style={{
            color: isDark ? '#3a3a3a' : '#ff6b00',
            transition: 'color 0.3s ease',
          }}
        />
        <Moon
          size={12}
          strokeWidth={2}
          style={{
            color: isDark ? '#a1a1aa' : '#c4c4c4',
            transition: 'color 0.3s ease',
          }}
        />
      </div>

      {/* Sliding thumb */}
      <motion.div
        animate={{ x: isDark ? 34 : 0 }}
        transition={{ type: 'spring', stiffness: 480, damping: 32 }}
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          flexShrink: 0,
          /* Neumorphic raised thumb — opposite of container */
          background: isDark ? '#1e1e1e' : '#f0f0f0',
          boxShadow: isDark
            ? '3px 3px 7px #0a0a0a, -3px -3px 7px #2e2e2e'
            : '3px 3px 7px #c8c8c8, -3px -3px 7px #ffffff',
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -40, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 40, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex' }}
            >
              <Moon size={13} strokeWidth={2} style={{ color: '#fbbf24' }} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 40, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -40, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex' }}
            >
              <Sun size={13} strokeWidth={2} style={{ color: '#ff6b00' }} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}
