import ScrollVelocity from "@/components/fx/ScrollVelocity";

const rows = [
  { text: "Websites people trust ✦ Built to convert ✦ ", v: 3, color: "var(--ink)", star: "#F81048", delay: 0 },
  { text: "Found on Google ✦ Fast on every phone ✦ ", v: -3, color: "#F81048", star: "var(--ink)", delay: 120 },
  { text: "Real estate ✦ Healthcare ✦ Fitness ✦ Corporate ✦ Hotels ✦ Retail ✦ ", v: 2.4, color: "var(--ink)", star: "#F81048", delay: 240 },
  { text: "United Kingdom ✦ USA ✦ Canada ✦ Sweden ✦ ", v: -2.4, color: "#F81048", star: "var(--ink)", delay: 360 },
];

export default function Reach() {
  return (
    <section id="reach" className="relative box-border flex min-h-screen w-screen flex-col justify-center overflow-hidden py-[clamp(48px,6vw,88px)]">
      <div aria-hidden className="relative flex flex-col">
        {rows.map((r) => (
          <div key={r.text} className="font-display text-[clamp(44px,9.2vw,150px)] font-bold tracking-[-0.07em]" style={{ color: r.color }}>
            <ScrollVelocity text={r.text} velocity={r.v} starColor={r.star} delay={r.delay} />
          </div>
        ))}
      </div>
      <p className="relative mx-auto mt-[clamp(20px,3vw,40px)] max-w-[56ch] px-6 text-center text-[clamp(15px,1.2vw,18px)] leading-[1.55] text-mute">
        Fast, search-ready websites that turn visitors into calls, bookings and enquiries, for every industry and every market we serve.
      </p>
    </section>
  );
}
