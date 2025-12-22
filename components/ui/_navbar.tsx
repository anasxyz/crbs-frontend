export default function Navbar() {
  return (
    <nav className="p-8 flex justify-between items-center max-w-5xl mx-auto">
      <span className="font-bold tracking-tighter text-xl">STUDIO</span>
      <div className="space-x-8 text-sm uppercase tracking-widest opacity-60">
        <a href="#" className="hover:opacity-100 transition-opacity p-2">Work</a>
        <a href="#" className="hover:opacity-100 transition-opacity p-2">Contact</a>
      </div>
    </nav>
  );
}
