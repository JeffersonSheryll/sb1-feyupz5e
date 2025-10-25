import { Mail, Phone, Instagram, Youtube, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white py-20 px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent"
            style={{ left: `${(i + 1) * 6.66}%` }}
          ></div>
        ))}
      </div>

      <div className="max-w-[1600px] mx-auto relative">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-black tracking-tighter mb-6">XANDER JONKERS</h3>
            <p className="text-zinc-400 leading-relaxed max-w-md mb-8">
              Professionele luchtfotografie en videografie voor projecten die impact maken.
              Van vastgoed tot evenementen, ik lever beelden die spreken.
            </p>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-orange-500 hover:text-orange-400 transition-colors font-bold"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-zinc-400">Contact</h4>
            <div className="space-y-4 text-sm">
              <a
                href="mailto:info@xanderjonkers.nl"
                className="flex items-center gap-3 text-zinc-300 hover:text-orange-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@xanderjonkers.nl</span>
              </a>
              <a
                href="tel:+31613750618"
                className="flex items-center gap-3 text-zinc-300 hover:text-orange-500 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+31 6 1375 0618</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-zinc-400">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/xanderjonkers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-zinc-900 hover:bg-orange-500 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://vimeo.com/user205980618"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-zinc-900 hover:bg-orange-500 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t-2 border-zinc-900 flex justify-center items-center">
          <p className="text-zinc-500 text-sm font-medium">
            © {currentYear} XANDER JONKERS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"></div>
    </footer>
  );
}
