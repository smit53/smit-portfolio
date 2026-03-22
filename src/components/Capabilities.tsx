/**
 * Capabilities — physics-based icon field.
 *
 * - Cursor creates a repulsion force field that pushes icons away
 * - Icons spring back to their origin positions (spring + damping)
 * - Click anywhere to fire a shockwave that scatters all nearby icons
 * - Proximity glow: icons near the cursor illuminate with their brand color
 * - Nearest icon tooltip always visible as you move around
 * - Icons are grouped into clusters by category
 */

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  SiPython, SiJavascript, SiTypescript, SiGo, SiR, SiGnubash, SiApachegroovy,
  SiKubernetes, SiDocker, SiArgo, SiJenkins, SiGithubactions,
  SiTensorflow, SiMlflow, SiApacheairflow, SiMongodb, SiPostgresql, SiNeo4J,
  SiApachecassandra, SiMysql,
  SiPrometheus, SiGrafana, SiSplunk, SiDatadog, SiPagerduty, SiJira,
  SiGitlab, SiRedis, SiQlik,
} from 'react-icons/si'
import { Cloud, Database, Globe, Activity, BarChart2, PieChart, FlaskConical } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = React.ComponentType<any>

interface IconItem { name: string; Icon: AnyIcon; color: string }

const ALL_ICONS: IconItem[] = [
  { name: 'Python',      Icon: SiPython,          color: '#3776AB' },
  { name: 'JavaScript',  Icon: SiJavascript,      color: '#F7DF1E' },
  { name: 'TypeScript',  Icon: SiTypescript,      color: '#3178C6' },
  { name: 'Go',          Icon: SiGo,              color: '#00ADD8' },
  { name: 'R',           Icon: SiR,               color: '#276DC3' },
  { name: 'SQL',         Icon: Database,          color: '#64748b' },
  { name: 'Groovy',      Icon: SiApachegroovy,    color: '#4298B8' },
  { name: 'Bash',        Icon: SiGnubash,         color: '#4EAA25' },
  { name: 'AWS',         Icon: Cloud,             color: '#FF9900' },
  { name: 'Azure',       Icon: Cloud,             color: '#0078D4' },
  { name: 'Kubernetes',  Icon: SiKubernetes,      color: '#326CE5' },
  { name: 'Docker',      Icon: SiDocker,          color: '#2496ED' },
  { name: 'Argo CD',     Icon: SiArgo,            color: '#EF7B4D' },
  { name: 'CI/CD',       Icon: SiGithubactions,   color: '#2088FF' },
  { name: 'Jenkins',     Icon: SiJenkins,         color: '#D33833' },
  { name: 'TensorFlow',  Icon: SiTensorflow,      color: '#FF6F00' },
  { name: 'MLflow',      Icon: SiMlflow,          color: '#0194E2' },
  { name: 'Airflow',     Icon: SiApacheairflow,   color: '#017CEE' },
  { name: 'MongoDB',     Icon: SiMongodb,         color: '#47A248' },
  { name: 'PostgreSQL',  Icon: SiPostgresql,      color: '#336791' },
  { name: 'Neo4j',       Icon: SiNeo4J,           color: '#008CC1' },
  { name: 'Cassandra',   Icon: SiApachecassandra, color: '#1287B1' },
  { name: 'MySQL',       Icon: SiMysql,           color: '#4479A1' },
  { name: 'Redis',       Icon: SiRedis,           color: '#DC382D' },
  { name: 'Prometheus',  Icon: SiPrometheus,      color: '#E6522C' },
  { name: 'Grafana',     Icon: SiGrafana,         color: '#F46800' },
  { name: 'Wavefront',   Icon: Activity,          color: '#00B4E2' },
  { name: 'Splunk',      Icon: SiSplunk,          color: '#65A637' },
  { name: 'Datadog',     Icon: SiDatadog,         color: '#632CA6' },
  { name: 'PagerDuty',   Icon: SiPagerduty,       color: '#25C151' },
  { name: 'JIRA',        Icon: SiJira,            color: '#0052CC' },
  { name: 'Playwright',  Icon: FlaskConical,      color: '#2EAD33' },
  { name: 'GitLab',      Icon: SiGitlab,          color: '#FC6D26' },
  { name: 'REST API',    Icon: Globe,             color: '#6366F1' },
  { name: 'Tableau',     Icon: BarChart2,         color: '#E97627' },
  { name: 'Power BI',    Icon: PieChart,          color: '#F2C811' },
  { name: 'Qlik',        Icon: SiQlik,            color: '#009845' },
]

// ─── Clusters ─────────────────────────────────────────────────────────────────
const CLUSTERS = [
  { label: 'Languages',     cx: 18, cy: 28, names: ['Python','JavaScript','TypeScript','Go','R','SQL','Groovy','Bash'] },
  { label: 'Cloud & Infra', cx: 78, cy: 26, names: ['AWS','Azure','Kubernetes','Docker','Argo CD','CI/CD','Jenkins'] },
  { label: 'AI & ML',       cx: 50, cy: 46, names: ['TensorFlow','MLflow','Airflow'] },
  { label: 'Databases',     cx: 20, cy: 74, names: ['MongoDB','PostgreSQL','Neo4j','Cassandra','MySQL','Redis'] },
  { label: 'Observability', cx: 74, cy: 72, names: ['Prometheus','Grafana','Wavefront','Splunk','Datadog','PagerDuty'] },
  { label: 'Tools',         cx: 50, cy: 86, names: ['JIRA','Playwright','GitLab','REST API','Tableau','Power BI','Qlik'] },
]

// ─── Deterministic pseudo-random ──────────────────────────────────────────────
function sr(seed: number) {
  const x = Math.sin(seed + 1.618) * 10000
  return x - Math.floor(x)
}

// ─── Build flat layout array ───────────────────────────────────────────────────
interface LayoutItem { icon: IconItem; ox: number; oy: number; clusterLabel: string }

function buildLayout(): LayoutItem[] {
  const items: LayoutItem[] = []
  for (const cluster of CLUSTERS) {
    const n = cluster.names.length
    cluster.names.forEach((name, i) => {
      const icon = ALL_ICONS.find(ic => ic.name === name)!
      const angle = (i / n) * Math.PI * 2 + sr(i * 13) * 0.4
      const rx = 16 + sr(i * 7 + 1) * 7
      const ry = 13 + sr(i * 7 + 2) * 5
      items.push({
        icon,
        ox: Math.max(3, Math.min(95, cluster.cx + Math.cos(angle) * rx)),
        oy: Math.max(3, Math.min(95, cluster.cy + Math.sin(angle) * ry)),
        clusterLabel: cluster.label,
      })
    })
  }
  return items
}

const LAYOUT = buildLayout()

// ─── Physics constants ─────────────────────────────────────────────────────────
const REPEL_R    = 155
const REPEL_STR  = 15
const SPRING_K   = 0.075
const DAMP       = 0.82
const WAVE_R     = 380
const WAVE_STR   = 50

// ─── Component ────────────────────────────────────────────────────────────────
export default function Capabilities() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const dispRefs      = useRef<(HTMLDivElement | null)[]>([])   // displacement div (RAF updates this)
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([])   // visual card (for glow/scale)
  const physics       = useRef(LAYOUT.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 })))
  const mouseRef      = useRef({ x: -9999, y: -9999 })
  const [nearest, setNearest]   = useState<number | null>(null)
  const [ripples,  setRipples]  = useState<{ id: number; x: number; y: number }[]>([])
  const rippleId = useRef(0)

  useEffect(() => {
    let raf: number
    let lastNearest = -1

    function tick() {
      const container = containerRef.current
      if (!container) { raf = requestAnimationFrame(tick); return }

      const cRect = container.getBoundingClientRect()
      const mx = mouseRef.current.x - cRect.left
      const my = mouseRef.current.y - cRect.top
      const ph = physics.current

      let closestDist = Infinity
      let closestIdx  = -1

      for (let i = 0; i < LAYOUT.length; i++) {
        const p   = ph[i]
        const lay = LAYOUT[i]

        // Actual icon center in container coords
        const icx = (lay.ox / 100) * cRect.width  + p.x
        const icy = (lay.oy / 100) * cRect.height + p.y
        const dx  = icx - mx
        const dy  = icy - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Repulsion
        if (dist < REPEL_R && dist > 0) {
          const f = (1 - dist / REPEL_R) * REPEL_STR
          p.vx += (dx / dist) * f
          p.vy += (dy / dist) * f
        }

        // Spring back to origin
        p.vx += -p.x * SPRING_K
        p.vy += -p.y * SPRING_K

        p.vx *= DAMP
        p.vy *= DAMP
        p.x  += p.vx
        p.y  += p.vy

        // Apply displacement directly to DOM
        const dispEl = dispRefs.current[i]
        if (dispEl) dispEl.style.transform = `translate(${p.x}px,${p.y}px)`

        // Proximity glow + scale on the card element
        const cardEl = cardRefs.current[i]
        if (cardEl) {
          const prox = Math.max(0, 1 - dist / REPEL_R)
          const glowAlpha = Math.round(prox * 200).toString(16).padStart(2, '0')
          cardEl.style.boxShadow = prox > 0.01
            ? `0 0 ${16 + prox * 28}px ${lay.icon.color}${glowAlpha}, 0 6px 24px rgba(0,0,0,0.12)`
            : `0 2px 12px rgba(0,0,0,0.08)`
          cardEl.style.transform = `scale(${1 + prox * 0.18})`
        }

        if (dist < closestDist) { closestDist = dist; closestIdx = i }
      }

      const newNearest = closestDist < 90 ? closestIdx : -1
      if (newNearest !== lastNearest) {
        lastNearest = newNearest
        setNearest(newNearest === -1 ? null : newNearest)
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      mouseRef.current = { x: t.clientX, y: t.clientY }
    }

    const onClick = (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return
      const cRect = container.getBoundingClientRect()
      const mx = e.clientX - cRect.left
      const my = e.clientY - cRect.top

      // Shockwave
      const ph = physics.current
      for (let i = 0; i < LAYOUT.length; i++) {
        const p   = ph[i]
        const lay = LAYOUT[i]
        const ox  = (lay.ox / 100) * cRect.width
        const oy  = (lay.oy / 100) * cRect.height
        const dx  = ox - mx
        const dy  = oy - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < WAVE_R && dist > 0) {
          const f = (1 - dist / WAVE_R) * WAVE_STR
          p.vx += (dx / dist) * f
          p.vy += (dy / dist) * f
        }
      }

      // Visual ripple
      const id = rippleId.current++
      setRipples(r => [...r, { id, x: mx, y: my }])
      setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 800)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onLeave)
    const el = containerRef.current
    el?.addEventListener('click', onClick)
    el?.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onLeave)
      el?.removeEventListener('click', onClick)
      el?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Field */}
      <div
        ref={containerRef}
        className="relative w-full rounded-3xl cursor-crosshair overflow-hidden"
        style={{ height: 'clamp(460px, 55vh, 640px)' }}
      >
        {/* Cluster labels */}
        {CLUSTERS.map(c => (
          <div
            key={c.label}
            className="absolute font-display font-black uppercase select-none pointer-events-none text-zinc-800/[0.18] dark:text-zinc-100/[0.28] leading-none tracking-widest"
            style={{
              left: `${c.cx}%`,
              top:  `${c.cy}%`,
              transform: 'translate(-50%,-50%)',
              fontSize: 'clamp(13px, 1.6vw, 22px)',
            }}
          >
            {c.label}
          </div>
        ))}

        {/* Click ripple */}
        {ripples.map(r => (
          <motion.div
            key={r.id}
            className="absolute rounded-full border border-brand-500/40 pointer-events-none"
            style={{ left: r.x, top: r.y, x: '-50%', y: '-50%' }}
            initial={{ width: 0, height: 0, opacity: 0.7 }}
            animate={{ width: 360, height: 360, opacity: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          />
        ))}

        {/* Icons */}
        {LAYOUT.map((lay, i) => (
          <div
            key={lay.icon.name}
            style={{
              position: 'absolute',
              left: `${lay.ox}%`,
              top:  `${lay.oy}%`,
              transform: 'translate(-50%,-50%)',
            }}
          >
            {/* displacement layer — RAF updates transform */}
            <div ref={el => { dispRefs.current[i] = el }}>
              {/* visual card — RAF updates box-shadow + scale */}
              <div
                ref={el => { cardRefs.current[i] = el }}
                className="w-[68px] h-[68px] rounded-2xl flex items-center justify-center bg-white dark:bg-zinc-800 will-change-transform"
                style={{ transition: 'box-shadow 0.1s' }}
              >
                <lay.icon.Icon size={32} style={{ color: lay.icon.color }} />
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {nearest === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.8 }}
                    animate={{ opacity: 1, y: -6, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.8 }}
                    transition={{ duration: 0.1 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[11px] font-bold whitespace-nowrap pointer-events-none z-50"
                  >
                    {lay.icon.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
