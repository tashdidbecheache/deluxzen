"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { EMAIL, PHONE_LABEL, PHONE_TEL, WHATSAPP_URL } from "@/lib/data";
import { Shimmer } from "@/components/ui";

const cards = [
  { href: WHATSAPP_URL, external: true, bg: "#F81048", fg: "#FFFFFF", border: "#F81048", iconBg: "rgba(255,255,255,.18)", icon: "ui-whatsapp-FFFFFF", title: "Chat on WhatsApp", sub: `Fastest reply · ${PHONE_LABEL}`, subColor: "#FFFFFF" },
  { href: PHONE_TEL, bg: "#0A0A0A", fg: "#FFFFFF", border: "#0A0A0A", iconBg: "rgba(255,255,255,.1)", icon: "ui-call-F81048", title: "Call us", sub: `Sat–Thu, 10am–7pm · ${PHONE_LABEL}`, subColor: "#BDBDBD" },
  { href: `mailto:${EMAIL}`, bg: "var(--surface)", fg: "var(--ink)", border: "var(--line)", iconBg: "#FFE8EE", icon: "ui-mail-F81048", title: "Email us", sub: EMAIL, subColor: "var(--mute)" },
  { href: "#quote", bg: "var(--surface)", fg: "var(--ink)", border: "var(--line)", iconBg: "#FFE8EE", icon: "ui-calendar-F81048", title: "Book a free call", sub: "Pick a time that suits you", subColor: "var(--mute)" },
];

const BUSINESS_TYPES = ["Hospital / Clinic", "Gym / Fitness", "Corporate", "Real Estate", "Restaurant", "School / Education", "Hotel", "Retail / E-commerce", "Other"];
const field = "box-border w-full rounded-xl px-3.5 py-[13px] font-[inherit] text-sm";

function ContactCard({ c, dup }: { c: (typeof cards)[number]; dup?: boolean }) {
  return (
    <a
      href={c.href}
      target={c.external ? "_blank" : undefined}
      rel={c.external ? "noopener" : undefined}
      data-dx-cdup={dup || undefined}
      aria-hidden={dup || undefined}
      tabIndex={dup ? -1 : undefined}
      className="relative box-border flex min-h-[150px] flex-col gap-4 overflow-hidden rounded-[18px] border p-[22px] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(10,10,10,.12)]"
      style={{ background: c.bg, color: c.fg, borderColor: c.border }}
    >
      <span className="relative grid size-11 place-items-center rounded-xl" style={{ background: c.iconBg }}>
        <img src={`/assets/icons/${c.icon}.svg`} width={24} height={24} alt="" className="block" />
      </span>
      <span className="relative mt-auto flex flex-col gap-1">
        <span className="font-display text-xl font-semibold tracking-[-0.02em]">{c.title}</span>
        <span className="text-[13px]" style={{ color: c.subColor }}>
          {c.sub}
        </span>
      </span>
    </a>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="mx-auto box-border flex min-h-screen w-full max-w-[1280px] flex-col justify-center gap-7 px-6 pt-24 pb-8">
      <div data-dx-head className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="m-0 max-w-[20ch] font-display text-[clamp(32px,3.9vw,56px)] leading-[1.1] font-medium tracking-[-0.045em] text-balance">
          Let&apos;s build something <span className="text-brand">people</span> trust.
        </h2>
        <p className="m-0 max-w-[38ch] text-right text-sm text-mute">Tell us about your business. Choose whichever way is easiest for you, and we&apos;ll reply within 24 hours.</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-5">
        <div className="flex min-w-0 flex-col gap-3.5">
          <div data-dx-cwrap>
            <div data-dx-ctrack className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
              {cards.map((c) => (
                <ContactCard key={c.title} c={c} />
              ))}
              {cards.map((c) => (
                <ContactCard key={c.title + "-dup"} c={c} dup />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 px-1 pt-2 text-sm text-ink2">
            <span className="font-semibold text-ink">Office</span>
            <span>Gulshan Avenue, Dhaka 1212, Bangladesh</span>
            <span className="text-mute">Working hours: Saturday to Thursday, 10:00am – 7:00pm (GMT+6)</span>
          </div>
        </div>

        <form
          id="quote"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="box-border flex scroll-mt-24 flex-col gap-3 rounded-3xl border border-brand bg-brand p-6 text-white"
        >
          {sent ? (
            <div className="flex flex-col items-center gap-3 px-3 py-10 text-center">
              <span aria-hidden className="grid size-12 place-items-center rounded-full bg-white text-xl font-semibold text-brand">
                ✓
              </span>
              <span className="max-w-[34ch] text-base leading-[1.55] text-white">Thank you! We&apos;ve received your message and will contact you within 24 hours.</span>
            </div>
          ) : (
            <>
              <span className="font-display text-[22px] font-semibold tracking-[-0.02em]">Get a free quote</span>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-2.5">
                <input name="name" aria-label="Your name" placeholder="Your name" required className={field} />
                <input name="business" aria-label="Business name" placeholder="Business name" className={field} />
                <select name="type" aria-label="Business type" defaultValue="" className={field}>
                  <option value="" disabled>
                    Business type
                  </option>
                  {BUSINESS_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <input name="phone" type="tel" aria-label="Phone or WhatsApp number" placeholder="Phone or WhatsApp number" required className={field} />
              </div>
              <input name="email" type="email" aria-label="Email (optional)" placeholder="Email (optional)" className={field} />
              <textarea name="message" rows={4} aria-label="Tell us what you need" placeholder="Tell us what you need" className={`${field} resize-y`} />
              <button
                type="submit"
                className="relative mt-1 w-full overflow-hidden rounded-full border-0 bg-[#0A0A0A] px-5 py-[15px] font-[inherit] text-[15px] font-medium text-white transition-colors hover:bg-white hover:text-[#0A0A0A]"
              >
                Send Message
                <Shimmer />
              </button>
              <span className="text-center text-xs text-white/82">We reply within 24 hours. Your details are never shared.</span>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
