import { useEffect, useRef } from 'react';

interface Viewer360Props {
  imageUrl: string;
}

export default function Viewer360({ imageUrl }: Viewer360Props) {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
    script.async = true;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';

    document.head.appendChild(link);
    document.head.appendChild(script);

    script.onload = () => {
      if (viewerRef.current && (window as any).pannellum) {
        (window as any).pannellum.viewer(viewerRef.current, {
          type: 'equirectangular',
          panorama: imageUrl,
          autoLoad: true,
          autoRotate: -2,
          pitch: 0,
          yaw: 0,
          hfov: 100,
          showZoomCtrl: false,
          mouseZoom: true,
          showFullscreenCtrl: true,
          showControls: true
        });
      }
    };

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(link);
    };
  }, [imageUrl]);

  return (
    <div
      ref={viewerRef}
      className="w-full h-full"
      style={{ minHeight: '600px', height: '600px', background: '#000' }}
    />
  );
}
