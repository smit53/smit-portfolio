import { useState } from 'react'
import { useTextScrambleSwap } from '../hooks/useTextScramble'

interface SecretTextProps {
  visible: string
  secret: string
  className?: string
  secretClassName?: string
}

const SecretText: React.FC<SecretTextProps> = ({
  visible,
  secret,
  className = '',
  secretClassName = 'text-brand-500',
}) => {
  const [hovered, setHovered] = useState(false)
  const { displayText, isAnimating } = useTextScrambleSwap({
    textA: visible,
    textB: secret,
    active: hovered,
  })

  const isShowingSecret = hovered && !isAnimating
  const isScrambling = isAnimating

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`cursor-default transition-colors duration-200 ${
        isShowingSecret ? secretClassName : isScrambling ? 'text-brand-400/70' : className
      }`}
      style={isShowingSecret ? { textShadow: '0 0 20px rgba(255, 107, 0, 0.3)' } : undefined}
    >
      {displayText}
    </span>
  )
}

export default SecretText
