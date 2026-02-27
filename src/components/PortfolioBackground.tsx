/**
 * Unified gradient background that transitions as you move through pages.
 * No 3D — just a continuous gradient that shifts with scroll.
 */
interface PortfolioBackgroundProps {
  scrollProgress?: number
}

export default function PortfolioBackground({ scrollProgress = 0 }: PortfolioBackgroundProps) {
  // Shift gradient orbs slightly as user scrolls through pages
  const orb1Left = -20 + scrollProgress * 15
  const orb2Right = -15 - scrollProgress * 10

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Single continuous base — same for all pages */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" />

      {/* Gradient orbs that transition position as you scroll through pages */}
      <div className="absolute inset-0">
        <div
          className="absolute w-[100vmax] h-[100vmax] rounded-full opacity-[0.07] dark:opacity-[0.12] blur-[120px] transition-all duration-500"
          style={{
            top: '-30%',
            left: `${orb1Left}%`,
            background: 'radial-gradient(circle, rgba(255,107,0,0.4) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute w-[80vmax] h-[80vmax] rounded-full opacity-[0.06] dark:opacity-[0.1] blur-[100px] transition-all duration-500"
          style={{
            bottom: '-20%',
            right: `${orb2Right}%`,
            background: 'radial-gradient(circle, rgba(255,107,0,0.35) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute w-[60vmax] h-[60vmax] rounded-full opacity-[0.04] dark:opacity-[0.08] blur-[80px] transition-all duration-500"
          style={{
            top: `${40 + scrollProgress * 10}%`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(255,107,0,0.25) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Very subtle grid — continuous */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,107,0,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,0,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Soft horizon line feel */}
      <div
        className="absolute left-0 right-0 h-px opacity-20 dark:opacity-10"
        style={{
          bottom: '15%',
          background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.3), transparent)',
        }}
      />
    </div>
  )
}
