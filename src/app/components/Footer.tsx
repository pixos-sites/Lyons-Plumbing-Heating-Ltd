import { siteConfig } from "../config";

export function Footer() {
  const phone = siteConfig.phone?.trim();
  const phoneHref = phone ? `tel:${phone.replace(/\s/g, "")}` : null;
  const logoPath = (siteConfig as { logo_path?: string }).logo_path;

  return (
    <footer
      style={{
        backgroundColor: "var(--colour-dark)",
        borderTop: "1px solid var(--colour-mid)",
        padding: "0 6%",
      }}
    >
      <div
        className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ minHeight: 64, padding: "16px 0" }}
      >
        {/* Left: Wordmark */}
        <div className="flex items-center gap-2">
          {logoPath ? (
            <img src={logoPath} alt={`${siteConfig.business_name} logo`} className="h-10 w-auto object-contain" />
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
                style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}
              >
                {siteConfig.business_name}
              </span>
            </>
          )}
        </div>

        {/* Centre */}
        <span style={{ fontSize: 13, color: "var(--colour-mid)" }}>
          {siteConfig.trade} · {siteConfig.location}
        </span>

        {/* Right */}
        <div className="flex items-center gap-4">
          {phoneHref ? (
            <a
              href={phoneHref}
              style={{ color: "#fff", fontSize: 13, textDecoration: "none" }}
            >
              {phone}
            </a>
          ) : null}
          <span style={{ fontSize: 12, color: "var(--colour-mid)" }}>
            © 2025 {siteConfig.business_name}
          </span>
        </div>
      </div>
    </footer>
  );
}
