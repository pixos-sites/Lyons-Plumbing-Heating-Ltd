import { useState, useCallback, useEffect } from "react";
import { Maximize2, ChevronLeft, ChevronRight, X, Instagram } from "lucide-react";
import { siteConfig } from "../config";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function GalleryImage({
  src,
  index,
  onOpen,
  style: customStyle,
}: {
  src: string;
  index: number;
  onOpen: (i: number) => void;
  style: React.CSSProperties;
}) {
  const { ref, style: animStyle } = useScrollAnimation({
    staggerDelay: index * 60,
    type: "fade-in",
    duration: 500,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden cursor-pointer group"
      style={{ ...customStyle, ...animStyle, borderRadius: 8 }}
      onClick={() => onOpen(index)}
    >
      <img
        src={src}
        alt={`Project ${index + 1}`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250"
        style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
      >
        <Maximize2 size={24} color="#fff" />
      </div>
    </div>
  );
}

export function Gallery() {
  const { ref, style } = useScrollAnimation({
    type: "fade-up",
    distance: 28,
    duration: 500,
    threshold: 0.15,
  });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = siteConfig.gallery_images;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  }, [images.length]);
  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));
  }, [images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, prev, next]);

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: "var(--colour-dark)",
        padding: "80px 6%",
      }}
      className="max-md:!py-12"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Heading */}
        <div ref={ref} style={style} className="text-center mb-12">
          <span className="eyebrow" style={{ display: "block", marginBottom: 12, color: "var(--colour-accent)" }}>
            Portfolio
          </span>
          <h2
            className="font-heading"
            style={{
              fontWeight: 700,
              fontSize: "clamp(34px, 3.5vw, 44px)",
              color: "#fff",
              margin: "0 0 12px 0",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            Real Work. Real Results.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif" }}>
            Every project photographed on-site.
          </p>
        </div>

        {/* Desktop Asymmetric Grid */}
        <div className="hidden md:block">
          {/* Row 1: 65/35 */}
          <div className="flex gap-1 mb-1">
            <GalleryImage src={images[0]} index={0} onOpen={openLightbox} style={{ width: "65%", height: 400 }} />
            <GalleryImage src={images[1]} index={1} onOpen={openLightbox} style={{ width: "35%", height: 400 }} />
          </div>
          {/* Row 2: 3 equal */}
          <div className="flex gap-1 mb-1">
            {[2, 3, 4].map((i) => (
              <GalleryImage key={i} src={images[i]} index={i} onOpen={openLightbox} style={{ flex: 1, height: 280 }} />
            ))}
          </div>
          {/* Row 3: 2 equal */}
          <div className="flex gap-1">
            {[5, 0].map((i, idx) => (
              <GalleryImage key={`r3-${idx}`} src={images[i]} index={idx + 5} onOpen={openLightbox} style={{ flex: 1, height: 320 }} />
            ))}
          </div>
        </div>

        {/* Mobile 2-column grid */}
        <div className="grid grid-cols-2 gap-1 md:hidden">
          {images.map((src, i) => (
            <GalleryImage key={i} src={src} index={i} onOpen={openLightbox} style={{ width: "100%", height: 200 }} />
          ))}
        </div>

        {/* Instagram link */}
        <div className="flex justify-center mt-8">
          <a
            href={`https://instagram.com/${siteConfig.instagram_handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
            style={{
              color: "var(--colour-accent)",
              fontSize: 14,
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            <Instagram size={16} />
            Follow us for more
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 cursor-pointer flex items-center justify-center"
            style={{ width: 44, height: 44, background: "none", border: "none", color: "#fff" }}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 cursor-pointer flex items-center justify-center"
            style={{ width: 44, height: 44, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: "50%" }}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 cursor-pointer flex items-center justify-center"
            style={{ width: 44, height: 44, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: "50%" }}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
          <img
            src={images[lightboxIndex % images.length]}
            alt="Gallery full view"
            className="max-w-[90vw] max-h-[85vh] object-contain"
            style={{ borderRadius: 4 }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
