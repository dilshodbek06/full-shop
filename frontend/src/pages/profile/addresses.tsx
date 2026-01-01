import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import BottomBar from "@/components/common/bottom-bar";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

const savedAddresses = [
  {
    id: "buxoro-1",
    label: "Buxoro viloyati Buxoro tumani, Temir",
  },
  {
    id: "jizzax-1",
    label: "Jizzax viloyati Jizzax shahri, Serfer",
  },
];

const AddressesPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
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
            <h1 className="text-lg font-semibold">Manzillarim</h1>
            <div className="h-10 w-10" />
          </div>

          <div className="hidden lg:block">
            <h1 className="text-2xl font-semibold">Manzillarim</h1>
          </div>

          <div className="mt-6 divide-y divide-slate-200">
            {savedAddresses.map((address) => (
              <div
                key={address.id}
                className="flex items-center justify-between gap-3 py-4 text-sm font-semibold text-slate-800"
              >
                <span className="text-base font-medium text-slate-900">
                  {address.label}
                </span>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50  active:scale-95 hover:text-red-500"
                  aria-label="Delete address"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}

            <Link
              to="/profile/addresses/new"
              className="flex items-center justify-between gap-3 py-4 text-sm font-semibold text-slate-700 transition"
            >
              <span className="text-base font-medium text-slate-900">
                Manzilni qo'shish
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700">
                <Plus className="h-5 w-5" />
              </span>
            </Link>
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

export default AddressesPage;
