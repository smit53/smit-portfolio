const Footer: React.FC = () => {
  return (
    <footer className="shrink-0 border-t border-zinc-800/50 py-4 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-zinc-600 text-xs">© {new Date().getFullYear()} Smit Borasaniya</p>
        <div className="flex gap-6">
          <a href="https://github.com/smit53" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/smitborasaniya" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">LinkedIn</a>
          <a href="mailto:smit.borasaniya@gmail.com" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">Email</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
