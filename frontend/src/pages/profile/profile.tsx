import { useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Globe,
  Heart,
  HelpCircle,
  LogOut,
  MapPin,
  Package,
  Ticket,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import BottomBar from "@/components/common/bottom-bar";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import {
  UniversalDrawer,
  UniversalDrawerClose,
  UniversalDrawerContent,
  UniversalDrawerTitle,
  UniversalDrawerTrigger,
} from "@/components/ui/universal-drawer";

type MenuItem = {
  label: string;
  icon: LucideIcon;
  description?: string;
  value?: string;
  to?: string;
  href?: string;
  tone?: "default" | "danger";
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const languageOptions = [
  { id: "uz", label: "O'zbekcha", short: "UZ" },
  { id: "ru", label: "Ruscha", short: "RU" },
  { id: "en", label: "English", short: "EN" },
] as const;

type LanguageId = (typeof languageOptions)[number]["id"];

const MenuRow = ({
  icon: Icon,
  label,
  description,
  value,
  to,
  href,
  tone = "default",
}: MenuItem) => {
  const labelTone = tone === "danger" ? "text-rose-600" : "text-slate-900";
  const iconTone =
    tone === "danger"
      ? "bg-rose-50 text-rose-600"
      : "bg-slate-100 text-slate-700";

  const content = (
    <>
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconTone}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="flex-1">
        <span className={`block text-sm font-semibold ${labelTone}`}>
          {label}
        </span>
        {description ? (
          <span className="mt-0.5 block text-xs text-slate-500">
            {description}
          </span>
        ) : null}
      </span>
      {value ? (
        <span className="text-sm font-semibold text-slate-500">{value}</span>
      ) : null}
      <ChevronRight className="h-5 w-5 text-slate-400" />
    </>
  );

  if (href) {
    return (
      <Link
        to={href}
        rel="noreferrer"
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
      >
        {content}
      </Link>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
    >
      {content}
    </button>
  );
};

const profileSections: MenuSection[] = [
  {
    title: "XARIDLAR",
    items: [
      { label: "Buyurtmalarim", icon: Package, value: "0", to: "/orders" },
      { label: "Sevimlilar", icon: Heart, to: "/wishlist" },
    ],
  },
  {
    title: "SHAXSIY KABINET",
    items: [
      { label: "Profilim", icon: UserRound, to: "/profile/details" },
      { label: "Manzillarim", icon: MapPin, to: "/profile/addresses" },
      { label: "Promokodlarim", icon: Ticket, to: "/profile/promocodes" },
    ],
  },
];

const ProfilePage = () => {
  const [language, setLanguage] = useState<LanguageId>("uz");
  const activeLanguage =
    languageOptions.find((option) => option.id === language)?.label ??
    "O'zbekcha";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-3">
        <div className="hidden lg:block">
          <Header />
        </div>

        <main className="pt-4 pb-24">
          <div className=" sm:hidden flex items-center justify-between gap-3">
            <Link
              to="/"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-white hover:text-slate-700 active:scale-95"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold">Profil</h1>
            <div className="h-10 w-10" />
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <Link
                to="/profile/details"
                className="flex w-full items-center gap-4 text-left"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-tr from-emerald-400 via-cyan-400 to-sky-500 p-0.5">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-slate-500">
                    <UserRound className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-slate-900">
                    dilshod_ziyodulloyev
                  </p>
                  <p className="text-sm text-slate-500">+998</p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </Link>
            </div>

            {profileSections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl bg-white shadow-sm"
              >
                <div className="px-4 pt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {section.title}
                </div>
                <div className="mt-2 divide-y divide-slate-100 pb-2">
                  {section.items.map((item) => (
                    <MenuRow key={item.label} {...item} />
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-2xl bg-white shadow-sm">
              <div className="px-4 pt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                SOZLAMALAR VA YORDAM
              </div>
              <div className="mt-2 divide-y divide-slate-100 pb-2">
                <UniversalDrawer>
                  <UniversalDrawerTrigger asChild>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                        <Globe className="h-5 w-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-slate-900">
                          Til
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-500">
                          {activeLanguage}
                        </span>
                      </span>
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </button>
                  </UniversalDrawerTrigger>
                  <UniversalDrawerContent className="pb-5">
                    <div className="flex items-center justify-between px-5 pt-5">
                      <UniversalDrawerTitle className="text-2xl font-semibold">
                        Tilni tanlang
                      </UniversalDrawerTitle>
                      <UniversalDrawerClose asChild>
                        <button
                          type="button"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100"
                          aria-label="Close"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </UniversalDrawerClose>
                    </div>
                    <div className="mt-4 border-t border-slate-200">
                      {languageOptions.map((option) => (
                        <label
                          key={option.id}
                          className="flex cursor-pointer items-center gap-4 px-5 py-4 text-slate-900"
                        >
                          <input
                            type="radio"
                            name="language"
                            value={option.id}
                            checked={language === option.id}
                            onChange={() => setLanguage(option.id)}
                            className="h-5 w-5 accent-emerald-600"
                          />

                          <span className="text-base font-semibold">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                    <div className="px-5 pt-4">
                      <UniversalDrawerClose asChild>
                        <button
                          type="button"
                          className="w-full rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 active:scale-[0.98]"
                        >
                          Tanlash
                        </button>
                      </UniversalDrawerClose>
                    </div>
                  </UniversalDrawerContent>
                </UniversalDrawer>
                <MenuRow
                  label="Yordam"
                  icon={HelpCircle}
                  href="https://t.me/dilshod_ziyodulloyev"
                />
              </div>
            </section>

            <section className="rounded-2xl bg-white shadow-sm">
              <MenuRow label="Chiqish" icon={LogOut} tone="danger" />
            </section>
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

export default ProfilePage;
