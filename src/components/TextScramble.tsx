import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useTextScramble } from '../hooks/useTextScramble'

interface TextScrambleProps {
  text: string
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
  speed?: number
  triggerOnMount?: boolean
  onComplete?: () => void
}

const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  speed = 30,
  triggerOnMount = false,
  onComplete,
}) => {
  const [triggered, setTriggered] = useState(triggerOnMount)
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.3,
    onChange: (inView) => {
      if (inView && !triggerOnMount) {
        if (delay > 0) {
          setTimeout(() => setTriggered(true), delay)
        } else {
          setTriggered(true)
        }
      }
    },
  })

  const startRef = useState(() => {
    if (triggerOnMount && delay > 0) {
      setTimeout(() => setTriggered(true), delay)
      return false
    }
    return triggerOnMount
  })[0]

  const actualTrigger = triggerOnMount ? (delay > 0 ? triggered : startRef !== false) : triggered

  const { displayText } = useTextScramble({ text, trigger: actualTrigger, speed, onComplete })

  return (
    <Tag ref={!triggerOnMount ? ref : undefined} className={className}>
      {actualTrigger ? displayText : '\u00A0'}
    </Tag>
  )
}

export default TextScramble
