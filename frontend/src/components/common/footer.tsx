const footerLinks = [
  {
    title: "Shop",
    links: [
      "New arrivals",
      "Bundles",
      "Personal care",
      "Supplements",
      "Baby care",
    ],
  },
  {
    title: "Support",
    links: ["FAQs", "Delivery info", "Returns & refunds", "Contact pharmacy"],
  },
  {
    title: "Company",
    links: ["About us", "Careers", "Press", "Blog"],
  },
];

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="container mx-auto max-w-7xl px-3">
        <div className="grid gap-10 py-10 md:grid-cols-12">
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2 rounded-xl py-2 text-emerald-700">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
                <span className="text-lg font-bold">Rx</span>
              </div>
              <h2 className="text-lg font-semibold">Full Shop</h2>
            </div>
            <p className="text-sm text-slate-500">
              Licensed pharmacy & wellness hub. Tez yetkazib berish, shaffof
              narx va professional qo'llab-quvvatlash.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-emerald-700">
              <span className="rounded-full bg-emerald-50 px-3 py-1 ring-1 ring-emerald-100">
                24/7 chat
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 ring-1 ring-emerald-100">
                Licensed pharmacy
              </span>
            </div>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-900">
                  {group.title}
                </h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a className="transition hover:text-emerald-700" href="#">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="md:col-span-3 space-y-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-5">
            <h4 className="text-base font-semibold text-slate-900">
              Yangiliklar va chegirmalar uchun
            </h4>
            <p className="text-sm text-slate-500">
              Foydali maqolalar, yangi mahsulotlar va promo kodlar - haftasiga
              bir marta.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Email manzilingiz"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600/90"
              >
                Yozilish
              </button>
            </form>
            <p className="text-xs text-slate-400">
              Yozilish orqali shartlarimizga rozilik bildirasiz. Spam
              yubormaymiz.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-white/70">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-3 py-4 text-xs text-slate-500 sm:flex-row">
          <p>
            Copyright {new Date().getFullYear()} Full Shop. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a className="hover:text-emerald-700" href="#">
              Privacy
            </a>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <a className="hover:text-emerald-700" href="#">
              Terms
            </a>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <a className="hover:text-emerald-700" href="#">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
