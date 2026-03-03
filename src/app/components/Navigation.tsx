import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { siteConfig } from "../config";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const phone = siteConfig.phone?.trim();
  const phoneHref = phone ? `tel:${phone.replace(/\s/g, "")}` : null;
  const logoPath = (siteConfig as { logo_path?: string }).logo_path;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
          height: 68,
          backgroundColor: scrolled ? "var(--colour-white)" : "transparent",
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div
          className="flex h-full items-center justify-between"
          style={{ padding: "0 6%" }}
        >
          {/* Wordmark */}
          <div className="flex items-center gap-2">
            {logoPath ? (
              <img src={logoPath} alt={`${siteConfig.business_name} logo`} className="h-9 md:h-10 w-auto object-contain" />
            ) : (
              <>
                <span
                  className="inline-block"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 2,
                    backgroundColor: "var(--colour-accent)",
                  }}
                />
                <span
                  className="font-heading"
                  style={{
                    fontWeight: 700,
                    fontSize: 17,
                    color: scrolled ? "var(--colour-dark)" : "#fff",
                  }}
                >
                  {siteConfig.business_name}
                </span>
              </>
            )}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Services", id: "services" },
              { label: "Work", id: "gallery" },
              { label: "Contact", id: "contact" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="transition-colors cursor-pointer"
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: scrolled
                    ? "var(--colour-mid)"
                    : "rgba(255,255,255,0.85)",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
              >
                {link.label}
              </button>
            ))}
            {phoneHref ? (
              <a
                href={phoneHref}
                className="flex items-center gap-2 transition-colors"
                style={{
                  backgroundColor: "var(--colour-accent)",
                  color: "#fff",
                  borderRadius: 4,
                  padding: "8px 16px",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <Phone size={14} />
                Call Now
              </a>
            ) : null}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center cursor-pointer"
            onClick={() => setMenuOpen(true)}
            style={{
              width: 44,
              height: 44,
              background: "none",
              border: "none",
              color: scrolled ? "var(--colour-dark)" : "#fff",
            }}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col"
          style={{ backgroundColor: "var(--colour-dark)" }}
        >
          <div
            className="flex items-center justify-between"
            style={{ height: 56, padding: "0 24px" }}
          >
            <div className="flex items-center gap-2">
              {logoPath ? (
                <img src={logoPath} alt={`${siteConfig.business_name} logo`} className="h-9 md:h-10 w-auto object-contain" />
              ) : (
                <>
                  <span
                    className="inline-block"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 2,
                      backgroundColor: "var(--colour-accent)",
                    }}
                  />
                  <span
                    className="font-heading"
                    style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}
                  >
                    {siteConfig.business_name}
                  </span>
                </>
              )}
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center cursor-pointer"
              style={{
                width: 44,
                height: 44,
                background: "none",
                border: "none",
                color: "#fff",
              }}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 gap-8">
            {[
              { label: "Services", id: "services" },
              { label: "Our Work", id: "gallery" },
              { label: "About", id: "about" },
              { label: "Contact", id: "contact" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-heading cursor-pointer"
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#fff",
                  background: "none",
                  border: "none",
                  minHeight: 44,
                }}
              >
                {link.label}
              </button>
            ))}

            {phoneHref ? (
              <a
                href={phoneHref}
                className="flex items-center gap-3 mt-4"
                style={{
                  backgroundColor: "var(--colour-accent)",
                  color: "#fff",
                  borderRadius: 4,
                  padding: "14px 32px",
                  fontSize: 18,
                  fontWeight: 600,
                  textDecoration: "none",
                  minHeight: 44,
                }}
              >
                <Phone size={18} />
                {phone}
              </a>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
