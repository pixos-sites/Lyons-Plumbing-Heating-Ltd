import { ArrowRight, Phone, Star } from "lucide-react";
import { siteConfig } from "../config";
import { useHeroCascade } from "../hooks/useScrollAnimation";

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Hero() {
  const { getStyle } = useHeroCascade(5, 100, 200);
  const useHeroImage = (siteConfig as { use_hero_image?: boolean }).use_hero_image !== false;
  const gasSafeBadgeLogo = (siteConfig as { gas_safe_badge_logo?: string }).gas_safe_badge_logo;
  const gasSafeLicenceNo = (siteConfig as { gas_safe_licence_no?: string }).gas_safe_licence_no;
  const phone = siteConfig.phone?.trim();
  const phoneHref = phone ? `tel:${phone.replace(/\s/g, "")}` : null;
  const whatsapp = siteConfig.whatsapp_number?.trim();
  const whatsappHref = whatsapp ? `https://wa.me/${whatsapp}` : null;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full" style={{ height: "100svh", minHeight: 700 }}>
      {useHeroImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${siteConfig.hero_image})` }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 100%)",
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(1200px 700px at 12% 10%, rgba(21,101,192,0.35), transparent 60%)",
              "radial-gradient(900px 550px at 90% 85%, rgba(56,189,248,0.18), transparent 55%)",
              "linear-gradient(135deg, #0B1220 0%, #111827 45%, #1E293B 100%)",
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.035) 0, rgba(255,255,255,0.035) 2px, transparent 2px, transparent 10px)",
            ].join(", "),
          }}
        />
      )}

      {/* Content */}
      <div
        className="relative h-full flex flex-col justify-center"
        style={{
          paddingLeft: "6%",
          paddingRight: "6%",
          paddingTop: "calc(72px + env(safe-area-inset-top, 0px))",
          paddingBottom: 24,
        }}
      >
        <div style={{ maxWidth: 640 }}>
          {/* Eyebrow — cascade item 0 */}
          <span
            className="eyebrow"
            style={{
              ...getStyle(0),
              color: "rgba(255,255,255,0.88)",
              marginBottom: 12,
              display: "block",
            }}
          >
            {siteConfig.trade} · {siteConfig.location}
          </span>

          {/* H1 — cascade item 1 */}
          <h1
            className="font-heading"
            style={{
              ...getStyle(1),
              fontWeight: 700,
              fontSize: "clamp(40px, 11vw, 76px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#fff",
              margin: "0 0 20px 0",
            }}
          >
            {siteConfig.tagline}
          </h1>

          {/* Subheading — cascade item 2 */}
          <p
            style={{
              ...getStyle(2),
              color: "rgba(255,255,255,0.7)",
              fontSize: "clamp(16px, 1.4vw, 18px)",
              fontFamily: "'Inter', sans-serif",
              margin: "0 0 32px 0",
              maxWidth: 480,
            }}
          >
            Local {siteConfig.trade.toLowerCase()} specialists. Fully insured.
            Free quotes. Quality guaranteed.
          </p>

          {/* CTA Row — cascade item 3 */}
          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            style={getStyle(3)}
          >
            <button
              onClick={() => scrollTo("contact")}
              className="flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--colour-accent)",
                color: "#fff",
                borderRadius: 4,
                padding: "14px 28px",
                fontSize: 15,
                fontWeight: 600,
                border: "none",
                minHeight: 44,
              }}
            >
              Get a Free Quote
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("gallery")}
              className="flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "transparent",
                color: "#fff",
                borderRadius: 4,
                padding: "14px 28px",
                fontSize: 15,
                fontWeight: 600,
                border: "1.5px solid rgba(255,255,255,0.8)",
                minHeight: 44,
              }}
            >
              See Our Work
            </button>
          </div>

          {gasSafeBadgeLogo && gasSafeLicenceNo ? (
            <div style={getStyle(3)} className="mt-4 flex justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-2.5 py-1.5 shadow-[0_6px_16px_rgba(0,0,0,0.18)] backdrop-blur-md">
                <div className="h-8 w-8 overflow-hidden rounded-md bg-black/70 p-0.5 shrink-0">
                  <img src={gasSafeBadgeLogo} alt="Gas Safe Register" className="h-full w-full object-cover rounded-lg" />
                </div>
                <div>
                  <div className="font-heading text-white" style={{ fontSize: "clamp(0.82rem,1vw,0.95rem)", lineHeight: 1.05 }}>
                    Gas Safe Registered
                  </div>
                  <div className="font-heading text-white/70" style={{ fontSize: "clamp(0.72rem,0.85vw,0.82rem)", marginTop: 1 }}>
                    Licence No. {gasSafeLicenceNo}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Bottom Anchor Bar — cascade item 4 */}
      <div
        className="absolute bottom-0 left-0 right-0 hidden md:flex flex-wrap items-center justify-center gap-3 md:gap-6 overflow-hidden"
        style={{
          ...getStyle(4),
          minHeight: 56,
          backgroundColor: "rgba(0,0,0,0.45)",
          paddingLeft: "6%",
          paddingRight: "6%",
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        {/* Phone */}
        {phoneHref ? (
          <a
            href={phoneHref}
            className="flex items-center gap-2 shrink-0"
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <Phone size={15} />
            {phone}
          </a>
        ) : null}

        {phoneHref ? (
          <span className="hidden sm:block" style={{ width: 1, height: 24, backgroundColor: "rgba(255,255,255,0.25)" }} />
        ) : null}

        {/* WhatsApp */}
        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 shrink-0"
            style={{ color: "#fff", fontSize: 13, textDecoration: "none", fontWeight: 500 }}
          >
            <WhatsAppIcon size={16} />
            WhatsApp Us
          </a>
        ) : null}

        {whatsappHref ? (
          <span className="hidden sm:block" style={{ width: 1, height: 24, backgroundColor: "rgba(255,255,255,0.25)" }} />
        ) : null}

        {/* Stars */}
        <div className="flex items-center gap-1.5 shrink-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={14} fill="#FBBF24" color="#FBBF24" />
          ))}
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 500, marginLeft: 4 }}>
            5-Star Rated
          </span>
        </div>
      </div>
    </section>
  );
}
