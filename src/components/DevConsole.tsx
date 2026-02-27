import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useVisitor } from '../context/VisitorContext'
import { useConsole } from '../context/ConsoleContext'

const FORMSPREE_URL = 'https://formspree.io/f/maqdvgep'

type LogEntry = { type: 'system' | 'user' | 'assistant'; text: string }

const ASSISTANT_NAME = "Smit's Assistant"

const FALLBACK_REPLY = "I'm not sure how to answer that. Try \"who are you\", \"experience\", \"skills\", \"contact\", or \"help\". You can also type \"suggest\" or \"feedback\" followed by your message to send it to Smit."

const helpText = `Commands I understand:
  who are you / about smit  → intro
  experience / work         → roles & companies
  skills / tech             → tech stack
  contact / reach           → how to reach Smit
  resume                    → resume link
  suggest <message>         → send your question/suggestion to Smit
  feedback <message>        → same as suggest
  help                      → this message

Tip: Type "admin" anywhere to open this assistant.`

function getAssistantResponse(input: string): { reply: string; isUnrecognized: boolean } {
  const lower = input.trim().toLowerCase()
  if (!lower) return { reply: "Type something and press Enter. Try \"who are you\" or \"help\".", isUnrecognized: false }

  if (lower.includes('help') || lower === '?') return { reply: helpText, isUnrecognized: false }
  if (lower.includes('who') && (lower.includes('you') || lower.includes('smit')) || lower.includes('about')) {
    return { reply: "Smit is a Software Development Engineer at Intuit (Aerolens). He builds AI-powered solutions where elegance meets scale—clean code, thoughtful design, systems that grow. He has a Master's in Computer Science from Indiana University and loves shipping iteratively and owning reliability.", isUnrecognized: false }
  }
  if (lower.includes('experience') || lower.includes('work') || lower.includes('job')) {
    return { reply: "Experience:\n  • Intuit (Aerolens) — SDE, Mountain View (Jun 2024 – Present): Playwright, AI incident prevention, CI/CD, on-call for QuickBooks Time & Payroll.\n  • IU Ride, Fleet Services — Associate Director, Bloomington (Jun 2023 – May 2024): Tableau, engagement +35%.\n  • Infosense — Data Scientist Intern, India (Jan–Jul 2022): Data pipelines, Tableau/Power BI.", isUnrecognized: false }
  }
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
    return { reply: "Tech: Python, JS/TS, Go, AWS, Azure, Kubernetes, Docker, TensorFlow, MLflow, Prometheus, Grafana, Splunk, Playwright, GitLab CI/CD, PostgreSQL, MongoDB, and more. See the Capabilities section on the portfolio for depth.", isUnrecognized: false }
  }
  if (lower.includes('contact') || lower.includes('reach') || lower.includes('email') || lower.includes('linkedin')) {
    return { reply: "Reach Smit:\n  Email: smit.borasaniya@gmail.com\n  LinkedIn: linkedin.com/in/smitborasaniya\n  GitHub: github.com/smit53\n  Location: Mountain View, CA. He's open to opportunities and conversations.", isUnrecognized: false }
  }
  if (lower.includes('resume')) {
    return { reply: "Resume: Use the \"Keep in touch\" section on the portfolio — there's a Download Resume link. Or go to the bottom of the page.", isUnrecognized: false }
  }
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    return { reply: "Hi! I'm Smit's assistant. Ask me about his experience, skills, or how to get in touch. Type \"help\" for commands.", isUnrecognized: false }
  }
  if (lower.includes('thanks') || lower.includes('thank you')) return { reply: "You're welcome! Good luck with your search.", isUnrecognized: false }
  if (lower.includes('bye') || lower.includes('exit')) return { reply: "Bye! Close the console with ESC. Have a great day.", isUnrecognized: false }

  const suggestMatch = lower.match(/^(?:suggest|feedback)\s+(.+)$/s)
  if (suggestMatch) {
    const message = suggestMatch[1].trim()
    if (message) {
      return { reply: '__SUGGEST__', isUnrecognized: false }
    }
  }

  if (lower === 'send' || lower === 'yes') {
    return { reply: '__SEND_PENDING__', isUnrecognized: false }
  }

  return { reply: FALLBACK_REPLY, isUnrecognized: true }
}

async function submitFeedback(payload: { message: string; visitorName?: string | null; persona?: string | null }): Promise<boolean> {
  try {
    const url = typeof import.meta.env.VITE_FEEDBACK_FORM_URL === 'string' && import.meta.env.VITE_FEEDBACK_FORM_URL
      ? import.meta.env.VITE_FEEDBACK_FORM_URL
      : FORMSPREE_URL
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: payload.message,
        visitorName: payload.visitorName ?? undefined,
        persona: payload.persona ?? undefined,
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

const DevConsole: React.FC = () => {
  const { open, setOpen } = useConsole()
  const [log, setLog] = useState<LogEntry[]>([])
  const [input, setInput] = useState('')
  const [bootDone, setBootDone] = useState(false)
  const [pendingFeedback, setPendingFeedback] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const bufferRef = useRef('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { visitorName, persona } = useVisitor()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (open && e.key === 'Escape') {
        setOpen(false)
        return
      }
      bufferRef.current += e.key.toLowerCase()
      if (bufferRef.current.length > 12) bufferRef.current = bufferRef.current.slice(-12)
      if (bufferRef.current.includes('admin')) {
        bufferRef.current = ''
        setOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, setOpen])

  useEffect(() => {
    if (!open) return
    setLog([])
    setBootDone(false)
    setPendingFeedback(null)
    const boot: LogEntry[] = [
      { type: 'system', text: '> system.status' },
      { type: 'assistant', text: '  Portfolio v2.0 · Smit\'s Assistant ready.' },
      { type: 'system', text: '' },
      { type: 'system', text: `> visitor.current` },
      { type: 'assistant', text: `  name: "${visitorName ?? 'anonymous'}" | persona: "${persona ?? '—'}"` },
      { type: 'system', text: '' },
      { type: 'assistant', text: `  Hi, I'm ${ASSISTANT_NAME}. Ask me anything about Smit — experience, skills, contact, or type "help". Send suggestions with "suggest <message>".` },
      { type: 'system', text: '' },
    ]
    let i = 0
    const id = setInterval(() => {
      if (i >= boot.length) {
        clearInterval(id)
        setBootDone(true)
        setTimeout(() => inputRef.current?.focus(), 100)
        return
      }
      const entry = boot[i]
      if (entry && typeof entry.type !== 'undefined') {
        setLog((prev) => [...prev, entry])
      }
      i++
    }, 100)
    return () => clearInterval(id)
  }, [open, visitorName, persona])

  const appendReply = (reply: string) => {
    setLog((prev) => [...prev, { type: 'assistant', text: `  ${reply.split('\n').join('\n  ')}` }])
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const send = async () => {
    const msg = input.trim()
    setInput('')
    if (!msg) return

    if (pendingFeedback != null && (msg === 'send' || msg === 'yes')) {
      const toSend = pendingFeedback
      setPendingFeedback(null)
      setSending(true)
      const ok = await submitFeedback({ message: toSend, visitorName, persona })
      setSending(false)
      if (ok) {
        appendReply("Sent to Smit. He'll see it in his feedback form.")
      } else {
        appendReply("Failed to send. You can email him directly at smit.borasaniya@gmail.com")
      }
      return
    }

    setLog((prev) => [...prev, { type: 'user', text: `> ${msg}` }])

    const { reply, isUnrecognized } = getAssistantResponse(msg)

    if (reply === '__SUGGEST__') {
      const message = msg.replace(/^(?:suggest|feedback)\s+/i, '').trim()
      setSending(true)
      const ok = await submitFeedback({ message, visitorName, persona })
      setSending(false)
      if (ok) {
        appendReply("Got it, I've sent that to Smit. He'll see it in his feedback form.")
      } else {
        appendReply("Failed to send. You can email him directly at smit.borasaniya@gmail.com")
      }
      return
    }

    if (reply === '__SEND_PENDING__') {
      if (pendingFeedback) {
        setSending(true)
        const ok = await submitFeedback({ message: pendingFeedback, visitorName, persona })
        setPendingFeedback(null)
        setSending(false)
        if (ok) appendReply("Sent to Smit. He'll see it in his feedback form.")
        else appendReply("Failed to send. You can email him at smit.borasaniya@gmail.com")
      } else {
        appendReply("Nothing to send. Ask something first, then type 'send' to submit your last message to Smit.")
      }
      return
    }

    setTimeout(() => {
      appendReply(reply)
      if (isUnrecognized) {
        setPendingFeedback(msg)
        appendReply("Send this to Smit? Type 'send' to submit.")
      }
    }, 300)
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [log])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[200] h-[55vh] max-h-[520px] flex flex-col bg-zinc-900 border-t border-brand-500/30 font-mono text-sm shadow-2xl"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-700/60 bg-zinc-800/80 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-500/90" />
              <span className="text-brand-500 text-xs tracking-wider">{ASSISTANT_NAME.toUpperCase()}</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
            >
              ESC to close
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 min-h-0">
            {log.filter((e): e is LogEntry => e != null && typeof e.type !== 'undefined').map((entry, i) => (
              <motion.div
                key={`${i}-${entry.type}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.12 }}
                className={`leading-relaxed whitespace-pre-wrap break-words ${
                  entry.type === 'system' ? 'text-brand-500' :
                  entry.type === 'user' ? 'text-blue-300/90' : 'text-green-400/90'
                }`}
              >
                {entry.text ?? '\u00A0'}
              </motion.div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="shrink-0 p-3 border-t border-zinc-700/60 bg-zinc-800/50 flex flex-col gap-2">
            {pendingFeedback != null && (
              <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                <span>Last message can be sent to Smit.</span>
                <button
                  type="button"
                  onClick={async () => {
                    const toSend = pendingFeedback
                    setPendingFeedback(null)
                    setSending(true)
                    const ok = await submitFeedback({ message: toSend, visitorName, persona })
                    setSending(false)
                    if (ok) appendReply("Sent to Smit. He'll see it in his feedback form.")
                    else appendReply("Failed to send. You can email him at smit.borasaniya@gmail.com")
                  }}
                  disabled={sending}
                  className="px-2 py-1 rounded bg-brand-500/20 text-brand-500 hover:bg-brand-500/30 disabled:opacity-50 text-xs"
                >
                  Send to Smit
                </button>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-brand-500/80">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') void send() }}
                placeholder={bootDone ? (pendingFeedback ? "Type 'send' or click Send to Smit above..." : 'Ask about Smit...') : 'Loading...'}
                disabled={!bootDone || sending}
                className="flex-1 bg-transparent text-white placeholder-zinc-500 focus:outline-none text-sm"
                autoComplete="off"
              />
              <button
                onClick={() => void send()}
                disabled={!bootDone || !input.trim() || sending}
                className="px-3 py-1 rounded bg-brand-500/20 text-brand-500 text-xs font-medium hover:bg-brand-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DevConsole
