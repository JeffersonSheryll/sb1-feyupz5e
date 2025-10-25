import { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        ]);

      if (error) throw error;

      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('Er ging iets mis. Probeer het opnieuw.');
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-32 px-8 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent"
            style={{ left: `${(i + 1) * 5}%` }}
          ></div>
        ))}
      </div>

      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-orange-500/5 to-transparent"></div>

      <div className="max-w-[1600px] mx-auto relative">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-px bg-orange-500"></div>
            <span className="text-orange-500 text-sm font-medium tracking-[0.3em] uppercase">
              Get In Touch
            </span>
          </div>
          <h2 className="text-7xl md:text-[8rem] font-black text-white leading-none tracking-tighter mb-8">
            LET'S TALK
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Klaar om je project naar een hoger niveau te tillen? Neem contact op en laten we samen iets bijzonders creëren.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="bg-zinc-900/50 p-8 border-l-4 border-orange-500">
              <h3 className="text-2xl font-black text-white mb-8 tracking-tight">CONTACT INFO</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider mb-2">Email</p>
                    <a
                      href="mailto:info@xanderjonkers.nl"
                      className="text-white hover:text-orange-500 transition-colors text-lg font-medium"
                    >
                      info@xanderjonkers.nl
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider mb-2">Phone</p>
                    <a
                      href="tel:+31613750618"
                      className="text-white hover:text-orange-500 transition-colors text-lg font-medium"
                    >
                      +31 6 1375 0618
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider mb-2">Location</p>
                    <p className="text-white text-lg font-medium">Nederland</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8">
              <h3 className="text-2xl font-black text-black mb-6 tracking-tight">WHY CHOOSE US?</h3>
              <ul className="space-y-4 text-black">
                <li className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Professionele cinematische kwaliteit</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Snelle levering en communicatie</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">State-of-the-art equipment</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Flexibel en creatief</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-zinc-900 p-10 relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-sm text-zinc-400 font-medium uppercase tracking-wider mb-3">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-0 py-4 bg-transparent border-b-2 border-zinc-700 focus:border-orange-500 focus:outline-none transition-colors text-white text-lg"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-zinc-400 font-medium uppercase tracking-wider mb-3">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-0 py-4 bg-transparent border-b-2 border-zinc-700 focus:border-orange-500 focus:outline-none transition-colors text-white text-lg"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm text-zinc-400 font-medium uppercase tracking-wider mb-3">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-0 py-4 bg-transparent border-b-2 border-zinc-700 focus:border-orange-500 focus:outline-none transition-colors text-white text-lg"
                  placeholder="+31 6 1375 0618"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-zinc-400 font-medium uppercase tracking-wider mb-3">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-0 py-4 bg-transparent border-b-2 border-zinc-700 focus:border-orange-500 focus:outline-none transition-colors resize-none text-white text-lg"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group relative w-full bg-orange-500 text-black py-5 font-bold tracking-wide uppercase overflow-hidden flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">{status === 'loading' ? 'Verzenden...' : 'Send Message'}</span>
                <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
              </button>

              {status === 'success' && (
                <div className="bg-green-500/10 border-2 border-green-500 px-6 py-4 text-center">
                  <p className="text-green-500 font-bold">Bericht succesvol verzonden!</p>
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-500/10 border-2 border-red-500 px-6 py-4 text-center">
                  <p className="text-red-500 font-bold">{errorMessage}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
