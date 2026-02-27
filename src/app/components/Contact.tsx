import { useState } from "react";
import { Phone, Lock, ArrowRight } from "lucide-react";
import { siteConfig } from "../config";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const WEB3FORMS_ACCESS_KEY = "ca9c9fe3-7e54-4750-b5f3-dab5153f81ea";

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Contact() {
  const leftAnim = useScrollAnimation({
    type: "slide-left",
    distance: 28,
    duration: 500,
    threshold: 0.15,
  });
  const rightAnim = useScrollAnimation({
    type: "slide-right",
    distance: 28,
    duration: 500,
    threshold: 0.15,
  });

  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const phone = siteConfig.phone?.trim();
  const phoneHref = phone ? `tel:${phone.replace(/\s/g, "")}` : null;
  const whatsapp = siteConfig.whatsapp_number?.trim();
  const whatsappHref = whatsapp ? `https://wa.me/${whatsapp}` : null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!form.phone.trim()) errs.phone = "Please enter your phone number";
    if (!form.message.trim()) errs.message = "Please tell us about your job";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length !== 0) return;

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New enquiry - ${siteConfig.business_name}`,
          from_name: form.name,
          name: form.name,
          phone: form.phone,
          message: form.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setForm({ name: "", phone: "", message: "" });
      } else {
        setSubmitError("Something went wrong sending your enquiry. Please call or WhatsApp us.");
      }
    } catch {
      setSubmitError("Something went wrong sending your enquiry. Please call or WhatsApp us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: "12px 14px",
    fontSize: 15,
    fontFamily: "'Inter', sans-serif",
    borderRadius: 10,
    border: errors[field]
      ? "2px solid #EF4444"
      : "1px solid #D6DEE8",
    outline: "none",
    backgroundColor: "#F8FAFC",
    color: "var(--colour-dark)",
    transition: "border-color 200ms, box-shadow 200ms",
  });

  return (
    <section
      id="contact"
      style={{
        padding: "88px 6%",
        backgroundImage: [
          "radial-gradient(1100px 420px at 15% 20%, rgba(21,101,192,0.22), transparent 62%)",
          "radial-gradient(900px 380px at 85% 80%, rgba(14,165,233,0.15), transparent 64%)",
          "linear-gradient(120deg, #07132B 0%, #0A1E3F 45%, #091A35 100%)",
        ].join(", "),
      }}
      className="max-md:!py-12"
    >
      <div className="max-w-[1280px] mx-auto">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-stretch"
          style={{
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.14)",
            backgroundColor: "rgba(5,16,34,0.4)",
            backdropFilter: "blur(4px)",
            padding: "clamp(20px, 3vw, 34px)",
          }}
        >
          {/* Left Column — slides in from left */}
          <div ref={leftAnim.ref} style={leftAnim.style} className="flex flex-col justify-center items-center text-center">
            <span
              className="eyebrow"
              style={{ color: "rgba(255,255,255,0.78)", display: "block", marginBottom: 12 }}
            >
              Contact
            </span>
            <h2
              className="font-heading"
              style={{
                fontWeight: 700,
                fontSize: "clamp(34px, 3.5vw, 44px)",
                color: "#fff",
                margin: "0 0 14px 0",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Get Your Free Quote
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 16,
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.6,
                margin: "0 0 28px 0",
                maxWidth: 560,
              }}
            >
              No obligation. Fast local response across Manchester and surrounding areas.
            </p>

            {/* Phone Number */}
            {phoneHref ? (
              <a
                href={phoneHref}
                className="flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                style={{
                  border: "1px solid rgba(255,255,255,0.28)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  height: 44,
                  maxWidth: 280,
                  width: "100%",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                <Phone size={17} />
                {phone}
              </a>
            ) : (
              <div
                className="font-heading"
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(24px, 3vw, 30px)",
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                Contact details available on request
              </div>
            )}

            {/* WhatsApp */}
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-3 transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "#25D366",
                  color: "#fff",
                  borderRadius: 10,
                  height: 44,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  maxWidth: 280,
                  width: "100%",
                }}
              >
                <WhatsAppIcon size={18} />
                Chat on WhatsApp
              </a>
            ) : null}

          </div>

          {/* Right Column - Form — slides in from right */}
          <div ref={rightAnim.ref} style={rightAnim.style} className="flex flex-col">
            <div
              style={{
                backgroundColor: "var(--colour-white)",
                borderRadius: 14,
                border: "1px solid #D6DEE8",
                boxShadow: "0 16px 36px rgba(5,16,34,0.24)",
                overflow: "hidden",
              }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <div
                    className="flex items-center justify-center mb-4"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      backgroundColor: "#DEF7EC",
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3
                    className="font-heading"
                    style={{ fontWeight: 700, fontSize: 20, color: "var(--colour-dark)", textAlign: "center" }}
                  >
                    Enquiry Sent!
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--colour-mid)", textAlign: "center", marginTop: 8 }}>
                    We'll be in touch within a few hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(21,101,192,0.10) 0%, rgba(14,165,233,0.10) 100%)",
                      borderBottom: "1px solid #E5EAF1",
                      padding: "18px 22px 14px",
                      textAlign: "center",
                    }}
                  >
                    <h3
                      className="font-heading"
                      style={{
                        fontWeight: 700,
                        fontSize: 24,
                        color: "var(--colour-dark)",
                        margin: "0 0 4px 0",
                        lineHeight: 1.2,
                      }}
                    >
                      Tell us about the job
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--colour-mid)",
                        fontFamily: "'Inter', sans-serif",
                        margin: 0,
                      }}
                    >
                      Fill this in and we will call you back shortly.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3" style={{ padding: "18px 22px 22px" }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" style={{ fontSize: 12, color: "#475569", display: "block", marginBottom: 6 }}>
                        Full name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                          if (submitError) setSubmitError("");
                        }}
                        style={inputStyle("name")}
                      />
                      {errors.name && (
                        <p style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>{errors.name}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="contact-phone" style={{ fontSize: 12, color: "#475569", display: "block", marginBottom: 6 }}>
                        Phone number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="Best number to reach you"
                        value={form.phone}
                        onChange={(e) => {
                          setForm({ ...form, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: "" });
                          if (submitError) setSubmitError("");
                        }}
                        style={inputStyle("phone")}
                      />
                      {errors.phone && (
                        <p style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>{errors.phone}</p>
                      )}
                    </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" style={{ fontSize: 12, color: "#475569", display: "block", marginBottom: 6 }}>
                        Job details
                      </label>
                      <textarea
                        id="contact-message"
                        placeholder="Tell us what you need done"
                        rows={4}
                        value={form.message}
                        onChange={(e) => {
                          setForm({ ...form, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: "" });
                          if (submitError) setSubmitError("");
                        }}
                        style={{
                          ...inputStyle("message"),
                          resize: "vertical" as const,
                        }}
                      />
                      {errors.message && (
                        <p style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>{errors.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-90"
                      disabled={isSubmitting}
                      style={{
                        width: "100%",
                        height: 46,
                        backgroundColor: "var(--colour-accent)",
                        color: "#fff",
                        borderRadius: 8,
                        fontSize: 15,
                        fontWeight: 600,
                        border: "none",
                        marginTop: 2,
                        opacity: isSubmitting ? 0.8 : 1,
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send Enquiry"}
                      {!isSubmitting ? <ArrowRight size={16} /> : null}
                    </button>

                    {submitError ? (
                      <p style={{ color: "#DC2626", fontSize: 12, textAlign: "center", margin: "2px 0 0 0" }}>
                        {submitError}
                      </p>
                    ) : null}

                    {/* Privacy note */}
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                      <Lock size={12} style={{ color: "var(--colour-mid)" }} />
                      <span style={{ fontSize: 12, color: "var(--colour-mid)" }}>
                        We never share your details.
                      </span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
