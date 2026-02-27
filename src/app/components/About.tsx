import { Phone } from "lucide-react";
import { siteConfig } from "../config";
import { useScrollAnimation, useCountUp } from "../hooks/useScrollAnimation";

function StatItem({ num, label }: { num: string; label: string }) {
  const { ref, displayValue } = useCountUp(num, 1200);

  return (
    <div ref={ref}>
      <div
        className="font-heading"
        style={{
          fontWeight: 700,
          fontSize: 36,
          color: "var(--colour-accent)",
          lineHeight: 1,
        }}
      >
        {displayValue}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "var(--colour-mid)",
          fontFamily: "'Inter', sans-serif",
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function About() {
  const phone = siteConfig.phone?.trim();
  const phoneHref = phone ? `tel:${phone.replace(/\s/g, "")}` : null;
  const { ref, style } = useScrollAnimation({
    type: "fade-up",
    distance: 28,
    duration: 500,
    threshold: 0.15,
  });

  return (
    <section
      id="about"
      style={{ backgroundColor: "var(--colour-white)", padding: "80px 6%" }}
      className="max-md:!py-12"
    >
      <div className="max-w-[1280px] mx-auto">
        <div ref={ref} style={style} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image — first on mobile */}
          <div className="relative order-first md:order-last">
            <div className="relative">
              <img
                src={siteConfig.about_image}
                alt="About our work"
                className="w-full object-cover"
                style={{
                  borderRadius: 8,
                  aspectRatio: "4/5",
                  maxHeight: 520,
                }}
              />
              {/* Accent left border */}
              <div
                className="absolute hidden md:block"
                style={{
                  left: -2,
                  top: "22.5%",
                  width: 4,
                  height: "55%",
                  backgroundColor: "var(--colour-accent)",
                  borderRadius: 2,
                }}
              />
            </div>
            {/* Consistent 24px margin below image on mobile */}
            <div className="h-6 md:hidden" />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <span className="eyebrow" style={{ display: "block", marginBottom: 12 }}>
              About Us
            </span>
            <h2
              className="font-heading"
              style={{
                fontWeight: 700,
                fontSize: "clamp(34px, 3.5vw, 44px)",
                color: "var(--colour-dark)",
                margin: "0 0 20px 0",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Your Local {siteConfig.trade} in {siteConfig.location}
            </h2>

            {siteConfig.about_text.map((p, i) => (
              <p
                key={i}
                style={{
                  fontSize: 16,
                  color: "var(--colour-mid)",
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1.7,
                  margin: "0 0 16px 0",
                }}
              >
                {p}
              </p>
            ))}

            {/* Stats Row */}
            <div className="flex items-start justify-center md:justify-start gap-8 mt-6">
              {[
                { num: "50+", label: "Projects Completed" },
                { num: "25+", label: "Years Experience" },
                { num: "100%", label: "Satisfaction Rate" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-start gap-8">
                  <StatItem num={stat.num} label={stat.label} />
                  {i < 2 && (
                    <span
                      className="hidden sm:block"
                      style={{
                        width: 1,
                        height: 48,
                        backgroundColor: "var(--colour-border)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            {phoneHref ? (
              <a
                href={phoneHref}
                className="flex items-center justify-center gap-2 mt-6 w-full md:w-fit max-w-[320px] mx-auto md:mx-0 transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "var(--colour-accent)",
                  color: "#fff",
                  borderRadius: 4,
                  padding: "10px 24px",
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  height: 40,
                }}
              >
                <Phone size={15} />
                Call {phone}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
