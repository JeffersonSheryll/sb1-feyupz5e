import { Award, Target, Users, Zap } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: Award, label: 'Vlieghoogte', value: '120M' },
    { icon: Users, label: 'Tevreden', value: '100%' },
    { icon: Target, label: 'Focus', value: '4K' },
    { icon: Zap, label: 'Reactietijd', value: '24U' },
  ];

  return (
    <section id="about" className="py-32 px-8 bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"
            style={{ top: `${(i + 1) * 8.33}%` }}
          ></div>
        ))}
      </div>

      <div className="max-w-[1600px] mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-px bg-orange-500"></div>
                <span className="text-orange-500 text-sm font-medium tracking-[0.3em] uppercase">
                  About Us
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-black text-white leading-none tracking-tighter mb-8">
                FRESH<br />
                <span className="text-transparent text-outline">PERSPECTIVE</span>
              </h2>
              <p className="text-xl text-zinc-400 leading-relaxed">
                Nieuwe in de game, maar gedreven om elke vlucht tot een meesterwerk te maken.
                Met een frisse blik en onbeperkte ambitie leg ik jouw verhaal vast vanuit de lucht.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="group relative bg-zinc-800/50 p-6 border-l-4 border-orange-500 hover:bg-zinc-800 transition-colors">
                  <stat.icon className="w-8 h-8 text-orange-500 mb-4" />
                  <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-zinc-400 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pl-8 border-l-4 border-orange-500">
              <p className="text-zinc-300 leading-relaxed">
                Klaar om jouw project naar nieuwe hoogtes te tillen. Geen jarenlange ervaring,
                maar wel de nieuwste technieken en een onvermoeibare drive voor perfectie.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Elke opdracht is een kans om te leren, groeien en beelden te leveren
                waar je trots op kunt zijn. Laten we samen iets moois creëren.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square bg-gradient-to-br from-zinc-800 to-black clip-diagonal overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 border-4 border-orange-500 mx-auto mb-6 flex items-center justify-center">
                    <span className="text-orange-500 font-black text-2xl">FOTO</span>
                  </div>
                  <p className="text-zinc-400 font-medium">Your Image Here</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-full h-full border-4 border-orange-500/20 clip-diagonal -z-10"></div>
            <div className="absolute top-8 left-8 w-24 h-24 bg-orange-500/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
