import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-zinc-900">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent"
            style={{ left: `${(i + 1) * 5}%` }}
          ></div>
        ))}
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-500/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-orange-500/5 to-transparent"></div>

      <div className="relative z-10 px-8 w-full max-w-[1600px] mx-auto py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-px bg-orange-500"></div>
                <span className="text-orange-500 text-sm font-medium tracking-[0.3em] uppercase">
                  Drone Cinematography
                </span>
              </div>

              <h1 className="space-y-3">
                <span className="block text-7xl md:text-[8rem] lg:text-[10rem] font-black leading-none tracking-tighter text-white">
                  AERIAL
                </span>
                <span className="block text-6xl md:text-[7rem] lg:text-[9rem] font-black leading-none tracking-tighter text-transparent text-outline">
                  VIEWS
                </span>
              </h1>

              <div className="relative pl-8 border-l-4 border-orange-500">
                <p className="text-xl text-zinc-400 leading-relaxed max-w-xl">
                  Unieke luchtbeelden die jouw project naar een hoger niveau tillen.
                  Van vastgoed tot evenementen, wij vangen het perfecte perspectief.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <button
                onClick={scrollToPortfolio}
                className="group relative px-8 py-4 bg-orange-500 text-black font-bold tracking-wide overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  VIEW WORK
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
              </button>

              <a
                href="#contact"
                className="group px-8 py-4 border-2 border-white text-white font-bold tracking-wide hover:bg-white hover:text-black transition-all"
              >
                GET IN TOUCH
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] clip-angle overflow-hidden">
              <iframe
                src="https://player.vimeo.com/video/1130191076?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100vw',
                  height: '100vh',
                  transform: 'translate(-50%, -50%)',
                  minWidth: '100%',
                  minHeight: '100%',
                  objectFit: 'cover'
                }}
                title="Drone Showreel"
              ></iframe>
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent z-10">
                <p className="text-white font-bold text-lg">SHOWREEL 2024</p>
                <p className="text-zinc-400 text-sm">Aerial Cinematography</p>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-full h-full border-2 border-orange-500/30 clip-angle -z-10"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <button
          onClick={scrollToPortfolio}
          className="text-zinc-500 hover:text-orange-500 transition-colors text-sm font-medium tracking-wider"
        >
          SCROLL DOWN
        </button>
      </div>
    </section>
  );
}
