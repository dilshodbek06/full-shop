import type { CSSProperties } from "react";
import { PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    title: "Sifat kafolati",
    description:
      "Ishonchli brendlar va tekshirilgan mahsulotlar bilan ishlaymiz.",
    icon: ShieldCheck,
  },
  {
    title: "Keng assortiment",
    description:
      "Uy, texnika, go'zallik va kundalik ehtiyojlar barchasi bir joyda.",
    icon: PackageCheck,
  },
  {
    title: "Trend va foydali",
    description: "Yangiliklar, chegirmalar va mashhur to'plamlar har kuni.",
    icon: Sparkles,
  },
  {
    title: "Tez yetkazib berish",
    description: "Toshkentda 24 soat, viloyatlarda 72 soat ichida.",
    icon: Truck,
  },
];

const stats = [
  { label: "Mahsulotlar", value: "120+" },
  { label: "Sotuvlar", value: "18K+" },
  { label: "Brendlar", value: "35+" },
];

const AboutUs = () => {
  return (
    <section id="about-us" className="scroll-mt-24">
      <div
        className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white px-6 py-10 sm:px-10 lg:px-12"
        style={
          {
            "--about-base":
              "linear-gradient(120deg,#ecfeff 0%,#f0fdf4 40%,#ffffff 100%)",
            "--about-grid": "rgba(15, 23, 42, 0.08)",
            "--about-ink": "#0f172a",
            backgroundImage: "var(--about-base)",
          } as CSSProperties
        }
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-emerald-200/50 blur-3xl" />
          <div className="absolute -bottom-20 right-6 h-64 w-64 rounded-full bg-cyan-200/50 blur-3xl" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(90deg,var(--about-grid) 1px,transparent 1px),linear-gradient(0deg,var(--about-grid) 1px,transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center">
          <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-50">
              About us
            </div>
            <div>
              <h2 className="text-3xl font-[var(--font-display)] text-[var(--about-ink)] sm:text-4xl lg:text-5xl">
                Oddiy internet magazin, xarid qilish esa qulay va tez.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
                Biz uchun asosiy narsa - ishonchli mahsulotlar, adolatli narxlar
                va qulay yetkazib berish. Sizga kerakli narsani tez topasiz va
                ishonch bilan buyurtma berasiz.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/discounts"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 active:scale-[0.98]"
              >
                Chegirmalarni ko'rish
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white/70 px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:border-emerald-300 hover:bg-white active:scale-[0.98]"
              >
                Katalogga o'tish
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-emerald-100 bg-white/80 px-4 py-3 shadow-sm backdrop-blur"
                >
                  <div className="text-lg font-semibold text-slate-900 sm:text-xl">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-700">
            <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white/85 p-4 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                <span>Our shop</span>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px]">
                  Since 2012
                </span>
              </div>
              <div className="mt-4 overflow-hidden rounded-xl">
                <img
                  src="https://picsum.photos/seed/online-shop/700/520"
                  alt="Online shop"
                  loading="lazy"
                  className="h-44 w-full object-cover sm:h-52"
                />
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Kichik jamoa, katta e'tibor: buyurtmangizni tez tayyorlaymiz va
                doimiy yangiliklar bilan xursand qilamiz.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-emerald-100 bg-white/85 p-4 shadow-sm backdrop-blur"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
