import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

type MotionButtonProps = {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  variant?: 'primary' | 'ghost' | 'outline' | 'nav'
  className?: string
  as?: 'button' | 'a'
  href?: string
  download?: boolean | string
  target?: string
  rel?: string
}

const variants = {
  primary:
    'px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold rounded-full hover:bg-zinc-800 dark:hover:bg-white shadow-lg shadow-zinc-900/10 dark:shadow-zinc-100/10 hover:shadow-brand-500/20 dark:hover:shadow-brand-400/20 hover:scale-[1.02] active:scale-[0.98] transition-shadow duration-300',
  ghost:
    'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-4 py-2 rounded-xl',
  outline:
    'px-6 py-3 rounded-2xl border-2 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 hover:border-brand-500/50 dark:hover:border-brand-500/40 hover:bg-brand-500/5 dark:hover:bg-brand-500/10 transition-colors duration-300',
  nav: 'relative py-2.5 px-4 rounded-[1.25rem] text-[13px] font-medium text-zinc-600 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors duration-200',
}

export default function MotionButton({
  children,
  onClick,
  type = 'button',
  disabled,
  variant = 'primary',
  className = '',
  as = 'button',
  href,
  download,
  target,
  rel,
}: MotionButtonProps) {
  const baseClass = variants[variant]
  const combined = `${baseClass} ${className}`.trim()

  const motionProps = {
    className: combined,
    whileHover: { scale: variant === 'primary' ? 1.02 : 1.01 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  }

  if (as === 'a' && href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        download={download !== undefined ? (download === true ? '' : download) : undefined}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} {...motionProps}>
      {children}
    </motion.button>
  )
}
