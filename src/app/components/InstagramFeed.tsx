import { siteConfig } from "../config";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export function InstagramFeed() {
  const { ref, style } = useScrollAnimation({
    type: "fade-up",
    distance: 28,
    duration: 500,
    threshold: 0.15,
  });

  return (
    <section
      style={{ backgroundColor: "var(--colour-white)", padding: "80px 6%" }}
      className="max-md:!py-12"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Heading */}
        <div ref={ref} style={style} className="text-center mb-10">
          <span className="eyebrow" style={{ display: "block", marginBottom: 12 }}>
            Latest Work
          </span>
          <h2
            className="font-heading"
            style={{
              fontWeight: 700,
              fontSize: "clamp(34px, 3.5vw, 44px)",
              color: "var(--colour-dark)",
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            Recent Project Highlights.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
          {siteConfig.instagram_feed.map((src, i) => (
            <div
              key={i}
              className="relative group block overflow-hidden"
              style={{ aspectRatio: "1/1" }}
            >
              <img
                src={src}
                alt={`Recent project ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
