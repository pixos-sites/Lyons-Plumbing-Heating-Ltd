import {
  Hammer,
  Home,
  PaintBucket,
  DoorOpen,
  Fence,
  Wrench,
} from "lucide-react";
import { siteConfig } from "../config";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Hammer,
  Home,
  PaintBucket,
  DoorOpen,
  Fence,
  Wrench,
};

function ServiceCard({
  service,
  index,
}: {
  service: (typeof siteConfig.services_list)[0];
  index: number;
}) {
  const { ref, style } = useScrollAnimation({
    staggerDelay: index * 80,
    type: "fade-up",
    distance: 28,
    duration: 500,
  });
  const Icon = iconMap[service.icon] || Hammer;

  return (
    <div ref={ref} style={style} className="group">
      <div
        className="h-full transition-all duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        style={{
          backgroundColor: "var(--colour-white)",
          border: "1px solid var(--colour-border)",
          borderRadius: 8,
          padding: 20,
          borderTop: "3px solid transparent",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderTopColor =
            "var(--colour-accent)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderTopColor =
            "transparent";
        }}
      >
        {/* Icon */}
        <div
          className="flex items-center justify-center"
          style={{
            width: 48,
            height: 48,
            borderRadius: 8,
            backgroundColor: "var(--colour-accent-light)",
            marginBottom: 16,
          }}
        >
          <Icon size={22} style={{ color: "var(--colour-accent)" }} />
        </div>

        {/* Name */}
        <h3
          className="font-heading"
          style={{
            fontWeight: 700,
            fontSize: 20,
            color: "var(--colour-dark)",
            margin: "0 0 8px 0",
          }}
        >
          {service.name}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: 14,
            color: "var(--colour-mid)",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.6,
            margin: "0 0 12px 0",
          }}
        >
          {service.description}
        </p>

        {/* Learn More */}
        <span
          className="hidden md:group-hover:inline-flex items-center gap-1"
          style={{
            fontSize: 13,
            color: "var(--colour-accent)",
            fontWeight: 500,
          }}
        >
          → Learn more
        </span>
      </div>
    </div>
  );
}

export function Services() {
  const { ref, style } = useScrollAnimation({
    type: "fade-up",
    distance: 28,
    duration: 500,
    threshold: 0.15,
  });

  return (
    <section
      id="services"
      style={{
        backgroundColor: "var(--colour-white)",
        padding: "80px 6%",
      }}
      className="max-md:!py-12"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Heading */}
        <div ref={ref} style={style} className="text-center mb-12">
          <span className="eyebrow" style={{ display: "block", marginBottom: 12 }}>
            What We Do
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
            {siteConfig.trade} Services in {siteConfig.location}
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--colour-mid)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Quality craftsmanship for homes and businesses across the region.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services_list.map((service, i) => (
            <ServiceCard key={service.name} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
