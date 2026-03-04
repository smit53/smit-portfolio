/**
 * Flat background only — single contrasting color (white / black). No gradients or tints.
 */
interface PortfolioBackgroundProps {
  scrollProgress?: number
}

export default function PortfolioBackground(_props: PortfolioBackgroundProps) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-white dark:bg-black" />
    </div>
  )
}
