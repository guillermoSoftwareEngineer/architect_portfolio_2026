export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 mt-12 bg-black/50">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Guillermo Vásquez</h3>
          <p className="text-gray-500 text-sm">Ingeniero de Sistemas Aplicados.</p>
        </div>
        
        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/guillermovasbendev" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">
            LinkedIn
          </a>
          <a href="https://github.com/guillermoSoftwareEngineer" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">
            GitHub
          </a>
        </div>
        
        <div className="w-full h-[1px] bg-white/5 my-4" />
        
        <p className="text-xs text-gray-600 font-mono">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
