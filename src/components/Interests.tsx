import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextScramble from './TextScramble'

const interests: Array<{
  title: string
  description: string
  size: 'sm' | 'md' | 'lg'
  tilt?: number
  gif: string
  image?: string
}> = [
  {
    title: 'Volleyball',
    description:
      'I play for the rush of the rally—teamwork, quick decisions, and that moment when the ball finds the perfect pass.',
    size: 'lg',
    tilt: -0.5,
    gif: 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600',
  },
  {
    title: 'Reading',
    description:
      'Books are my reset. Fiction, tech, philosophy—every book shifts how I think about work and life.',
    size: 'md',
    gif: 'https://media.giphy.com/media/3o85xrRijSEEDoYikg/giphy.gif',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600',
  },
  {
    title: 'Marathons',
    description:
      'Long runs teach patience, pacing, and pushing through when it gets hard—on the road and off.',
    size: 'lg',
    tilt: 0.5,
    gif: 'https://media.giphy.com/media/l0MYt5jPR6QX5nqFO/giphy.gif',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600',
  },
  {
    title: 'Building software',
    description:
      'Crafting elegant solutions to complex problems. Flow in turning ideas into working systems.',
    size: 'md',
    tilt: 0.3,
    gif: 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600',
  },
  {
    title: 'AI & ML',
    description:
      'Fascinated by how machines learn. I explore the intersection of automation and human intuition.',
    size: 'sm',
    gif: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600',
  },
  {
    title: 'Adventure & travel',
    description:
      'New places reshape perspective. I seek experiences that challenge how I think.',
    size: 'md',
    tilt: -0.3,
    gif: 'https://media.giphy.com/media/3o7TKsQ8MJHyTASOry/giphy.gif',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600',
  },
  {
    title: 'Continuous learning',
    description:
      'Always exploring—new tech, design, philosophy. I read, take courses, and tinker.',
    size: 'sm',
    gif: 'https://media.giphy.com/media/3o6Zt6ML6BklvQk5fi/giphy.gif',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600',
  },
  {
    title: 'Deep work',
    description:
      'I value uninterrupted blocks for complex tasks. Calm environments and clear priorities.',
    size: 'md',
    tilt: 0.4,
    gif: 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600',
  },
  {
    title: 'Teaching & sharing',
    description:
      'I enjoy explaining ideas and helping others level up. Knowledge grows when shared.',
    size: 'sm',
    tilt: -0.2,
    gif: 'https://media.giphy.com/media/1L5YuVU8BnO9e/giphy.gif',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600',
  },
]

const sizeMap = {
  sm: 'min-w-[140px] flex-[1_1_140px] max-w-[220px]',
  md: 'min-w-[180px] flex-[1_1_200px] max-w-[280px]',
  lg: 'min-w-[220px] flex-[1_1_260px] max-w-[340px]',
}

function InterestItem({
  title,
  description,
  image,
  size,
  tilt = 0,
  index,
}: {
  title: string
  description: string
  image?: string
  size: 'sm' | 'md' | 'lg'
  tilt?: number
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const src = image && !imgError ? image : 'https://images.unsplash.com/photo-1557683316-973673baf926?w=600'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.08 * index,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${sizeMap[size]} aspect-[4/3] rounded-2xl overflow-hidden cursor-default focus-within:ring-2 focus-within:ring-brand-500/50 focus-within:ring-offset-2 dark:focus-within:ring-offset-zinc-950 outline-none`}
      style={{ rotate: tilt }}
    >
      <button
        type="button"
        className="relative w-full h-full block text-left overflow-hidden rounded-2xl"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {/* Back layer: description (revealed on hover) */}
        <motion.div
          className="absolute inset-0 z-0 flex flex-col justify-end p-4 sm:p-5 bg-gradient-to-t from-zinc-900 via-zinc-800 to-zinc-700 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800"
          initial={false}
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.98,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-display text-brand-400 text-sm sm:text-base font-semibold mb-2 block">
            {title}
          </span>
          <p className="text-white/95 dark:text-zinc-200 text-xs sm:text-sm leading-relaxed line-clamp-4 sm:line-clamp-5">
            {description}
          </p>
        </motion.div>

        {/* Front layer: image (slides up on hover to reveal content behind) */}
        <motion.div
          className="absolute inset-0 z-10 rounded-2xl overflow-hidden"
          initial={false}
          animate={{
            y: hovered ? '-100%' : 0,
            scale: hovered ? 1.05 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 35,
          }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
            }}
          />
          <span className="absolute bottom-3 left-3 right-3 font-display text-white text-base sm:text-lg font-bold drop-shadow-lg">
            {title}
          </span>
        </motion.div>
      </button>
    </motion.div>
  )
}

const Interests: React.FC = () => {
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full h-full min-h-0 flex flex-col pb-8 overflow-y-auto">
      {/* Minimal intro — one line, flows into content */}
      <motion.div
        className="mb-8 sm:mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          <TextScramble text="What I'm into." triggerOnMount delay={400} speed={22} />
        </h2>
        <motion.p
          className="mt-2 text-zinc-500 dark:text-zinc-400 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          Hover any image to reveal what it means to me.
        </motion.p>
      </motion.div>

      {/* Free-flowing wrap: no grid, no tiles, varied sizes */}
      <AnimatePresence mode="wait">
        {introDone && (
          <motion.div
            className="flex flex-wrap gap-4 sm:gap-5 md:gap-6 justify-start items-start content-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {interests.map((interest, index) => (
              <InterestItem
                key={interest.title}
                title={interest.title}
                description={interest.description}
                image={interest.image}
                size={interest.size}
                tilt={interest.tilt}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Interests
