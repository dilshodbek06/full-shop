import { useState } from "react";
import { ArrowLeft, PackageX } from "lucide-react";
import { Link } from "react-router-dom";
import BottomBar from "@/components/common/bottom-bar";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "new", label: "Yangi" },
  { id: "all", label: "Barchasi" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>("new");

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-3">
        <div className="hidden lg:block ">
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
            <h1 className="text-lg font-semibold">Buyurtmalarim</h1>
            <div className="h-10 w-10" />
          </div>

          <div className="hidden lg:block">
            <h1 className="text-2xl font-semibold">Buyurtmalarim</h1>
          </div>

          <div className="mt-6 border-b border-slate-200">
            <div className="grid grid-cols-2 text-sm font-semibold">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "border-b-2 border-transparent py-3 text-center transition",
                    activeTab === tab.id
                      ? "border-emerald-600 text-emerald-700"
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-50 text-slate-400 shadow-sm">
              <PackageX className="h-14 w-14" />
            </div>
            <h2 className="mt-6 text-lg font-semibold text-slate-900">
              Sizda buyurtmalar yo'q
            </h2>
            <p className="mt-2 max-w-md text-sm text-slate-500">
              Bu yerda siz buyurtma qilgan mahsulotlar paydo bo'ladi.
            </p>
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

export default OrdersPage;
