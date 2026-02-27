import { Star } from "lucide-react";
import { siteConfig } from "../config";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function ReviewCard({
  testimonial,
  index,
}: {
  testimonial: (typeof siteConfig.testimonials)[0];
  index: number;
}) {
  const { ref, style } = useScrollAnimation({
    staggerDelay: index * 80,
    type: "fade-up",
    distance: 28,
    duration: 500,
    threshold: 0.15,
  });

  return (
    <div
      ref={ref}
      style={{
        ...style,
        backgroundColor: "var(--colour-white)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        borderRadius: 8,
        padding: 24,
      }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} size={16} fill="#FBBF24" color="#FBBF24" />
        ))}
      </div>
      <p
        style={{
          fontSize: 15,
          color: "var(--colour-dark)",
          fontStyle: "italic",
          lineHeight: 1.6,
          fontFamily: "'Inter', sans-serif",
          margin: "0 0 16px 0",
        }}
      >
        "{testimonial.quote}"
      </p>
      <div>
        <div
          className="font-heading"
          style={{ fontWeight: 700, fontSize: 14, color: "var(--colour-dark)" }}
        >
          {testimonial.name}
        </div>
        <div style={{ fontSize: 13, color: "var(--colour-mid)" }}>
          {testimonial.location}
        </div>
      </div>
    </div>
  );
}

export function Reviews() {
  const reviewsUrl = (siteConfig as { reviews_url?: string }).reviews_url;

  const { ref, style } = useScrollAnimation({
    type: "fade-up",
    distance: 28,
    duration: 500,
    threshold: 0.15,
  });

  return (
    <section
      id="reviews"
      style={{ backgroundColor: "var(--colour-subtle)", padding: "80px 6%" }}
      className="max-md:!py-12"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Heading */}
        <div ref={ref} style={style} className="text-center mb-10">
          <span className="eyebrow" style={{ display: "block", marginBottom: 12 }}>
            Reviews
          </span>
          <h2
            className="font-heading"
            style={{
              fontWeight: 700,
              fontSize: "clamp(34px, 3.5vw, 44px)",
              color: "var(--colour-dark)",
              margin: "0 0 12px 0",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            What Our Customers Say
          </h2>
          <div
            className="flex items-center justify-center gap-2"
            style={{ fontSize: 13, color: "var(--colour-mid)" }}
          >
            <span style={{ fontWeight: 600 }}>
              <span style={{ color: "#4285F4" }}>G</span>
              <span style={{ color: "#EA4335" }}>o</span>
              <span style={{ color: "#FBBC05" }}>o</span>
              <span style={{ color: "#4285F4" }}>g</span>
              <span style={{ color: "#34A853" }}>l</span>
              <span style={{ color: "#EA4335" }}>e</span>
            </span>
            Verified Google Reviews
          </div>
        </div>

        {reviewsUrl ? (
          <div className="mb-8 flex justify-center">
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--colour-accent)",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: 14,
                border: "1px solid var(--colour-border)",
                borderRadius: 999,
                padding: "10px 18px",
                backgroundColor: "var(--colour-white)",
              }}
            >
              View All Google Reviews
            </a>
          </div>
        ) : null}

        {/* Static Fallback Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.testimonials.map((t, i) => (
            <ReviewCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
