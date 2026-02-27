import { motion } from 'framer-motion'

interface FlowNode {
  id: string
  label: string
  x: number
  y: number
}

interface FlowEdge {
  from: string
  to: string
}

export interface FlowConfig {
  nodes: FlowNode[]
  edges: FlowEdge[]
}

interface InfraFlowProps {
  config: FlowConfig
}

const NODE_W = 120
const NODE_H = 40

const InfraFlow: React.FC<InfraFlowProps> = ({ config }) => {
  const nodeMap = new Map(config.nodes.map((n) => [n.id, n]))

  return (
    <div className="relative w-full overflow-x-auto">
      <svg
        viewBox="0 0 800 200"
        className="w-full h-auto min-w-[600px]"
        fill="none"
      >
        {config.edges.map((edge, i) => {
          const from = nodeMap.get(edge.from)
          const to = nodeMap.get(edge.to)
          if (!from || !to) return null

          const x1 = from.x + NODE_W / 2
          const y1 = from.y + NODE_H / 2
          const x2 = to.x + NODE_W / 2
          const y2 = to.y + NODE_H / 2
          const midX = (x1 + x2) / 2

          const pathD = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`
          const pathLen = Math.hypot(x2 - x1, y2 - y1) * 1.3

          return (
            <g key={`${edge.from}-${edge.to}`}>
              <motion.path
                d={pathD}
                stroke="rgba(255,107,0,0.25)"
                strokeWidth={1.5}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.circle
                r={3}
                fill="#FF6B00"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2,
                  delay: 0.8 + i * 0.12,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <animateMotion
                  dur={`${pathLen / 80}s`}
                  repeatCount="indefinite"
                  path={pathD}
                  begin={`${0.8 + i * 0.12}s`}
                />
              </motion.circle>
            </g>
          )
        })}

        {config.nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <rect
              x={node.x}
              y={node.y}
              width={NODE_W}
              height={NODE_H}
              rx={10}
fill="rgba(255,255,255,0.95)"
                      stroke="rgba(255,107,0,0.4)"
              strokeWidth={1}
            />
            <text
              x={node.x + NODE_W / 2}
              y={node.y + NODE_H / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(24,24,27,0.85)"
              fontSize={11}
              fontFamily="DM Sans, system-ui, sans-serif"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

export default InfraFlow
