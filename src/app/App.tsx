import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { TrustBar } from "./components/TrustBar";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { About } from "./components/About";
import { Reviews } from "./components/Reviews";
import { InstagramFeed } from "./components/InstagramFeed";
import { Contact } from "./components/Contact";
import { MapEmbed } from "./components/MapEmbed";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { siteConfig } from "./config";

function hexToRgb(hex: string) {
  const cleaned = hex.replace("#", "").trim();
  const full = cleaned.length === 3 ? cleaned.split("").map((c) => c + c).join("") : cleaned;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  const num = Number.parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export default function App() {
  const rgb = hexToRgb(siteConfig.accent_colour ?? "");
  const accent = siteConfig.accent_colour || "#1E4D8C";
  const accentLight = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)` : "rgba(30, 77, 140, 0.15)";

  return (
    <div
      className="w-full min-h-screen"
      style={{
        fontFamily: "'Inter', sans-serif",
        ["--colour-accent" as string]: accent,
        ["--colour-accent-light" as string]: accentLight,
      }}
    >
      <Navigation />
      <Hero />
      <TrustBar />
      <Services />
      <Gallery />
      <About />
      <Reviews />
      <InstagramFeed />
      <Contact />
      <MapEmbed />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
