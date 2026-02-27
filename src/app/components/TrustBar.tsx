import { Shield, Tag, Home, Clock3 } from "lucide-react";
import { siteConfig } from "../config";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const items = [
  { icon: Shield, label: "Fully Insured", desc: "Public liability covered" },
  { icon: Tag, label: "Free Quotes", desc: "No obligation, ever" },
  {
    icon: Home,
    label: "Years Experience",
    desc: "25+",
  },
  { icon: Clock3, label: "Fast Response", desc: "Quick local callouts" },
];

function TrustItem({
  item,
  index,
  mobile = false,
}: {
  item: (typeof items)[0];
  index: number;
  mobile?: boolean;
}) {
  const { ref, style } = useScrollAnimation({
    staggerDelay: index * 80,
    type: "fade-up",
    distance: 28,
    duration: 500,
  });

  return (
    <div ref={ref} style={style} className={mobile ? "flex items-start gap-3" : "flex items-center gap-3"}>
      <item.icon
        size={mobile ? 22 : 24}
        style={{ color: "var(--colour-accent)", ...(mobile ? { marginTop: 2 } : {}) }}
      />
      <div>
        <div
          className="font-heading"
          style={{
            fontWeight: 700,
            fontSize: mobile ? 14 : 15,
            color: "var(--colour-dark)",
          }}
        >
          {item.label}
        </div>
        <div
          style={{
            fontSize: mobile ? 12 : 13,
            color: "var(--colour-mid)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {item.desc}
        </div>
      </div>
    </div>
  );
}

export function TrustBar() {
  return (
    <section
      style={{
        backgroundColor: "var(--colour-subtle)",
        borderTop: "1px solid #E5E7EB",
        borderBottom: "1px solid #E5E7EB",
        padding: "28px 6%",
      }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Desktop: single row */}
        <div className="hidden md:flex items-center justify-between">
          {items.map((item, i) => (
            <div key={item.label} className="flex items-center">
              {i > 0 && (
                <span
                  style={{
                    width: 1,
                    height: 40,
                    backgroundColor: "#E5E7EB",
                    marginRight: 32,
                  }}
                />
              )}
              <TrustItem item={item} index={i} />
            </div>
          ))}
        </div>

        {/* Mobile: 2x2 grid */}
        <div className="grid grid-cols-2 gap-6 md:hidden">
          {items.map((item, i) => (
            <TrustItem key={item.label} item={item} index={i} mobile />
          ))}
        </div>
      </div>
    </section>
  );
}
