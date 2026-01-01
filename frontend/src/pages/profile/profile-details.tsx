import { ArrowLeft, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import BottomBar from "@/components/common/bottom-bar";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

const ProfileDetailsPage = () => {
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
            <h1 className="text-lg font-semibold">Profilim</h1>
            <div className="h-10 w-10" />
          </div>

          <div className="hidden lg:block">
            <h1 className="text-2xl font-semibold">Profilim</h1>
          </div>

          <div className="mt-6 flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
              <UserRound className="h-10 w-10 text-slate-400" />
            </div>
            <p className="mt-4 text-lg font-semibold text-slate-900">
              dilshod_ziyodulloyev
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Ma'lumotlarni himoya qilish kafolati
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Shaxsiy ma'lumotlaringiz xavfsiz serverlarda saqlanadi
                  </p>
                </div>
              </div>
            </div>

            <form className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700">
                  Ismingiz <span className="text-rose-500">*</span>
                  <input
                    type="text"
                    defaultValue="dilshod_ziyodulloyev"
                    className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Telefon raqami <span className="text-rose-500">*</span>
                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 shadow-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
                    <span className="text-sm font-semibold text-slate-600">
                      +998
                    </span>
                    <input
                      type="tel"
                      placeholder="90 123 45 67"
                      className="h-12 w-full bg-transparent text-sm text-slate-900 focus:outline-none"
                    />
                  </div>
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Jinsni tanlang <span className="text-rose-500">*</span>
                  <select
                    defaultValue=""
                    className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-500 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="" disabled>
                      Jinsni tanlang
                    </option>
                    <option value="male">Erkak</option>
                    <option value="female">Ayol</option>
                  </select>
                </label>

                <button
                  type="button"
                  className="mt-2 w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 active:scale-[0.98]"
                >
                  Saqlash
                </button>
              </div>
            </form>
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

export default ProfileDetailsPage;
