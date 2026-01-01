import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BottomBar from "@/components/common/bottom-bar";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

const promoCodes = [
  {
    id: "promo-1",
    discount: "10%",
    code: "8A9B4277",
    expires: "16:11 11-11-2025 gacha amal qiladi",
  },
  {
    id: "promo-2",
    discount: "15%",
    code: "UZB2025",
    expires: "14:30 05-06-2026 gacha amal qiladi",
  },
  {
    id: "promo-3",
    discount: "5%",
    code: "WELCOME05",
    expires: "09:00 01-01-2026 gacha amal qiladi",
  },
];

const PromoCodesPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-3">
        <div className="hidden lg:block">
          <Header />
        </div>

        <main className="pt-4 pb-24">
          <div className="flex items-center justify-between gap-3 lg:hidden">
            <Link
              to="/profile"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-white hover:text-slate-700 active:scale-95"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold">Promo-kodlarim</h1>
            <div className="h-10 w-10" />
          </div>

          <div className="hidden lg:block">
            <h1 className="text-2xl font-semibold">Promo-kodlarim</h1>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {promoCodes.map((promo) => (
              <div
                key={promo.id}
                className="relative overflow-hidden rounded-[24px] bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-400 px-5 py-6 text-white shadow-lg"
              >
                <span className="pointer-events-none absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-slate-50" />
                <span className="pointer-events-none absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-slate-50" />
                <div className="text-2xl font-bold">
                  {promo.discount} chegirma {promo.code}
                </div>
                <div className="my-4 border-t border-dashed border-white/70" />
                <p className="text-sm font-semibold sm:text-base">
                  {promo.expires}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>

      <div className="hidden sm:block">
        <Footer />
      </div>
      <BottomBar />
    </div>
  );
};

export default PromoCodesPage;
