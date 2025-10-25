import { useEffect, useState } from 'react';
import { Play, X, ExternalLink, Orbit } from 'lucide-react';
import { supabase, PortfolioItem } from '../lib/supabase';
import Viewer360 from './Viewer360';

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEmbedUrl = (url: string) => {
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }

    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
    }

    return url;
  };

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  if (loading) {
    return (
      <section id="portfolio" className="py-32 px-8 bg-black">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-6xl font-black text-white">PORTFOLIO</h2>
          <p className="text-zinc-400">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="portfolio" className="py-32 px-8 bg-black relative overflow-hidden">
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
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-px bg-orange-500"></div>
              <span className="text-orange-500 text-sm font-medium tracking-[0.3em] uppercase">
                Our Work
              </span>
            </div>
            <h2 className="text-7xl md:text-[8rem] font-black text-white leading-none tracking-tighter mb-8">
              PORTFOLIO
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl">
              Een collectie van onze beste luchtopnames. Van cinematische landschappen tot dynamische evenementen.
            </p>
          </div>

          {items.length === 0 ? (
            <div className="py-40 text-center">
              <p className="text-zinc-500 text-lg">Geen portfolio items beschikbaar</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openModal(item)}
                  className="group relative aspect-[4/5] cursor-pointer overflow-hidden bg-zinc-900"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-6 left-6 z-20">
                    <span className="text-6xl font-black text-white/10">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {item.media_type === 'video' ? (
                    <>
                      {item.thumbnail_url ? (
                        <img
                          src={item.thumbnail_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-800"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="w-20 h-20 bg-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-10 h-10 text-black ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </>
                  ) : item.media_type === '360_image' ? (
                    <>
                      <img
                        src={item.media_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                      <div className="absolute top-6 right-6 z-20">
                        <div className="bg-orange-500 p-2 rounded">
                          <Orbit className="w-6 h-6 text-black" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={item.media_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    </>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                        <p className="text-zinc-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.description}
                        </p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                  </div>

                  <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-6"
          onClick={closeModal}
        >
          <div
            className="relative max-w-7xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-16 right-0 z-50 w-12 h-12 bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="bg-zinc-900 overflow-hidden">
              <div className="w-full bg-black" style={{ height: selectedItem.media_type === '360_image' ? '600px' : 'auto', aspectRatio: selectedItem.media_type === '360_image' ? 'unset' : '16/9' }}>
                {selectedItem.media_type === 'video' ? (
                  selectedItem.media_url.includes('vimeo.com') || selectedItem.media_url.includes('youtube.com') || selectedItem.media_url.includes('youtu.be') ? (
                    <iframe
                      src={getEmbedUrl(selectedItem.media_url)}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      src={selectedItem.media_url}
                      controls
                      autoPlay
                      className="w-full h-full"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )
                ) : selectedItem.media_type === '360_image' ? (
                  <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
                    <Viewer360 imageUrl={selectedItem.media_url} />
                  </div>
                ) : (
                  <img
                    src={selectedItem.media_url}
                    alt={selectedItem.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="p-10 border-t-4 border-orange-500">
                <h3 className="text-4xl font-black text-white mb-4 tracking-tight">
                  {selectedItem.title}
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
