import { useState } from 'react'
import { motion } from 'framer-motion'

type CardType = 'image'

interface Interest {
  title: string
  tag: string
  description: string
  type: CardType
  image?: string
  rotation: number
  height: string
  col: 0 | 1 | 2
}

const INTERESTS: Interest[] = [
  {
    title: 'Volleyball',
    tag: 'Sport',
    description: 'The rally never lies — every touch is a decision under pressure. I play for the chaos and the calm right after a perfect set.',
    type: 'image',
    image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=900&q=85&fit=crop',
    rotation: -4,
    height: 'h-72 sm:h-[340px]',
    col: 0,
  },
  {
    title: 'Reading',
    tag: 'Mind',
    description: 'One book can rewire how you think for months. Fiction, systems thinking, philosophy — I read to get uncomfortable.',
    type: 'image',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=85&fit=crop',
    rotation: 3,
    height: 'h-52 sm:h-60',
    col: 1,
  },
  {
    title: 'Marathons',
    tag: 'Endurance',
    description: 'Mile 20 is where character lives. Running long taught me that discomfort is just the cost of becoming.',
    type: 'image',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=85&fit=crop',
    rotation: -2,
    height: 'h-64 sm:h-80',
    col: 2,
  },
  {
    title: 'Building software',
    tag: 'Craft',
    description: 'There\'s nothing like the moment a system just clicks. Clean abstractions, honest tradeoffs, code that holds up.',
    type: 'image',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=85&fit=crop',
    rotation: 2,
    height: 'h-56 sm:h-64',
    col: 0,
  },
  {
    title: 'AI & ML',
    tag: 'Frontier',
    description: 'I\'m obsessed with the gap between human intuition and what a model can learn. Still the most interesting problem in the room.',
    type: 'image',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85&fit=crop',
    rotation: -3,
    height: 'h-56 sm:h-64',
    col: 1,
  },
  {
    title: 'Adventure & travel',
    tag: 'Explore',
    description: 'Every new place resets your defaults. I travel to find friction — in language, food, perspective, direction.',
    type: 'image',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&fit=crop',
    rotation: 1,
    height: 'h-72 sm:h-[340px]',
    col: 2,
  },
  {
    title: 'Teaching & sharing',
    tag: 'People',
    description: 'If you can\'t explain it simply, you don\'t understand it. Teaching forces clarity — and clarity is where the good work starts.',
    type: 'image',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=85&fit=crop',
    rotation: -2,
    height: 'h-48 sm:h-56',
    col: 0,
  },
  {
    title: 'Deep work',
    tag: 'Focus',
    description: 'Flow state is not a luxury — it\'s the only way hard problems get solved. I protect focus like it\'s a resource.',
    type: 'image',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=85&fit=crop',
    rotation: 3,
    height: 'h-52 sm:h-60',
    col: 1,
  },
  {
    title: 'Continuous learning',
    tag: 'Growth',
    description: 'The best engineers I know are relentlessly curious. I read, tinker, take courses — then apply it all somewhere real.',
    type: 'image',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&q=85&fit=crop',
    rotation: -3,
    height: 'h-48 sm:h-56',
    col: 2,
  },
]

function InterestCard({ interest, index }: { interest: Interest; index: number }) {
  const [hovered, setHovered] = useState(false)
  const { title, tag, description, type, image, rotation, height } = interest

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
      style={{ rotate: rotation, zIndex: hovered ? 20 : 1, position: 'relative' }}
      className={`${height} rounded-2xl overflow-hidden cursor-pointer will-change-transform shadow-sm`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      transition={{ type: 'spring', stiffness: 300, damping: 24, opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.07 * index } } as any}
    >

      {/* ── IMAGE card ── */}
      {type === 'image' && (
        <div className="relative w-full h-full group">
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${hovered ? 'scale-110' : 'scale-100'}`}
          />

          {/* base gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* default state: tag + title */}
          <motion.div
            className="absolute inset-x-0 bottom-0 p-4 sm:p-5"
            animate={{ opacity: hovered ? 0 : 1, y: hovered ? 8 : 0 }}
            transition={{ duration: 0.22 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-400 mb-1.5">
              {tag}
            </p>
            <p className="font-display text-white text-lg sm:text-xl font-bold leading-tight">
              {title}
            </p>
          </motion.div>

          {/* hover state: full overlay with description */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.2) 100%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-400 mb-2">
              {tag}
            </p>
            <p className="font-display text-white text-lg sm:text-xl font-bold leading-tight mb-3">
              {title}
            </p>
            <div className="w-6 h-px bg-brand-500 mb-3" />
            <p className="text-white/80 text-sm leading-[1.65]">
              {description}
            </p>
          </motion.div>
        </div>
      )}

    </motion.div>
  )
}

const Interests: React.FC = () => {
  const col0 = INTERESTS.filter(i => i.col === 0)
  const col1 = INTERESTS.filter(i => i.col === 1)
  const col2 = INTERESTS.filter(i => i.col === 2)

  return (
    <div className="w-full pb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 items-start">
        <div className="flex flex-col gap-3 sm:gap-4">
          {col0.map((interest) => (
            <InterestCard key={interest.title} interest={interest} index={INTERESTS.indexOf(interest)} />
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 mt-10 sm:mt-14">
          {col1.map((interest) => (
            <InterestCard key={interest.title} interest={interest} index={INTERESTS.indexOf(interest)} />
          ))}
        </div>
        <div className="hidden sm:flex flex-col gap-4 mt-5 sm:mt-7">
          {col2.map((interest) => (
            <InterestCard key={interest.title} interest={interest} index={INTERESTS.indexOf(interest)} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Interests
