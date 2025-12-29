import { Headset, ShieldCheck, Truck, Heart } from "lucide-react";

const valueProps = [
  {
    title: "Tez va qulay yetkazib berish",
    description:
      "Buyurtmalarni shahar bo‘ylab va viloyatlarga tezkor yetkazib beramiz.",
    icon: Truck,
    badge: "Fast delivery",
  },
  {
    title: "24/7 mijozlarni qo‘llab-quvvatlash",
    description:
      "Savollaringiz bo‘lsa, chat yoki qo‘ng‘iroq orqali doimo aloqadamiz.",
    icon: Headset,
    badge: "24/7 Support",
  },
  {
    title: "Xavfsiz to‘lov va kafolat",
    description:
      "To‘lovlar himoyalangan, mahsulot sifati va qaytarish kafolatlanadi.",
    icon: ShieldCheck,
    badge: "Secure payment",
  },
  {
    title: "Keng assortiment bir joyda",
    description:
      "Texnika, aksessuarlar, kundalik mahsulotlar va yana ko‘plab toifalar.",
    icon: Heart,
    badge: "Wide selection",
  },
];

const ValueProps = () => {
  return (
    <section className="py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Why people choose us
          </p>
          <h3 className="text-2xl font-semibold text-slate-900">
            Tezkor dorixonangiz, qulay xizmat bilan
          </h3>
          <p className="text-sm text-slate-500">
            Dori-darmonlar, maslahat va profilaktika mahsulotlari - barchasi
            shaffof narxlarda va ishonchli yetkazib berishda.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
            Qo'llab-quvvatlash 7/7
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {valueProps.map((item) => (
          <div
            key={item.title}
            className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-emerald-200 hover:shadow-sm"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 ring-1 ring-emerald-100 transition group-hover:scale-105">
              <item.icon className="h-5 w-5" />
            </div>
            <h4 className="text-base font-semibold text-slate-900">
              {item.title}
            </h4>
            <p className="mt-1 text-sm text-slate-500">{item.description}</p>
            <span className="mt-3 inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
              {item.badge}
            </span>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-emerald-50/40 via-transparent to-white/60 opacity-0 transition group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueProps;
