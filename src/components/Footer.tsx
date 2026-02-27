import { useConsole } from '../context/ConsoleContext'

const Footer: React.FC = () => {
  const { setOpen } = useConsole()
  return (
    <footer className="shrink-0 border-t border-zinc-200 dark:border-zinc-800 py-8 px-6 min-h-[12vh] flex items-center bg-white dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-zinc-500 dark:text-zinc-400 text-xs">© {new Date().getFullYear()} Smit Borasaniya</p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href="https://github.com/smit53" target="_blank" rel="noopener noreferrer" className="text-zinc-500 dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 text-xs transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/smitborasaniya" target="_blank" rel="noopener noreferrer" className="text-zinc-500 dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 text-xs transition-colors">LinkedIn</a>
          <a href="mailto:smit.borasaniya@gmail.com" className="text-zinc-500 dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 text-xs transition-colors">Email</a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-zinc-500 dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 text-xs transition-colors"
          >
            Exploring new tools? Open the assistant
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
