import { MapPin } from "lucide-react";
import { siteConfig } from "../config";

export function MapEmbed() {
  const mapUrl = (siteConfig as { map_embed_url?: string }).map_embed_url;

  return (
    <section className="relative w-full" style={{ height: "clamp(260px, 30vw, 380px)" }}>
      {mapUrl ? (
        <iframe
          src={mapUrl}
          title={`${siteConfig.business_name} map`}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: "#E5E7EB" }}
        >
          <div className="text-center" style={{ color: "var(--colour-mid)", fontSize: 14 }}>
            [ Google Maps Embed Placeholder ]
            <br />
            <span style={{ fontSize: 12 }}>Add `map_embed_url` in src/app/config.ts</span>
          </div>
        </div>
      )}

      {/* Overlay Pill */}
      <div
        className="absolute top-4 left-4 flex items-center gap-2"
        style={{
          backgroundColor: "var(--colour-white)",
          borderRadius: 8,
          padding: 12,
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        }}
      >
        <MapPin size={18} style={{ color: "var(--colour-accent)" }} />
        <div>
          <div
            className="font-heading"
            style={{ fontWeight: 700, fontSize: 14, color: "var(--colour-dark)" }}
          >
            {siteConfig.business_name}
          </div>
          <div style={{ fontSize: 13, color: "var(--colour-mid)" }}>
            {siteConfig.location}
          </div>
        </div>
      </div>
    </section>
  );
}
