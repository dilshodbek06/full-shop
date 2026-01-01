import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BottomBar from "@/components/common/bottom-bar";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

type Region = {
  id: string;
  name: string;
  districts: string[];
};

const regions: Region[] = [
  {
    id: "andijon",
    name: "Andijon",
    districts: [
      "Andijon shahri",
      "Andijon tumani",
      "Asaka",
      "Baliqchi",
      "Bo'z",
      "Buloqboshi",
      "Izboskan",
      "Jalaquduq",
      "Marhamat",
      "Oltinko'l",
      "Paxtaobod",
      "Qo'rg'ontepa",
      "Shahrixon",
      "Ulug'nor",
      "Xo'jaobod",
    ],
  },
  {
    id: "buxoro",
    name: "Buxoro",
    districts: [
      "Buxoro shahri",
      "Buxoro tumani",
      "G'ijduvon",
      "Jondor",
      "Kogon shahri",
      "Kogon tumani",
      "Olot",
      "Peshku",
      "Qorako'l",
      "Qorovulbozor",
      "Romitan",
      "Shofirkon",
      "Vobkent",
    ],
  },
  {
    id: "fargona",
    name: "Farg'ona",
    districts: [
      "Farg'ona shahri",
      "Farg'ona tumani",
      "Marg'ilon shahri",
      "Qo'qon shahri",
      "Beshariq",
      "Bog'dod",
      "Buvayda",
      "Dang'ara",
      "Furqat",
      "Oltiariq",
      "Qo'shtepa",
      "Quva",
      "Quvasoy shahri",
      "Rishton",
      "So'x",
      "Toshloq",
      "Uchko'prik",
      "Yozyovon",
      "O'zbekiston tumani",
    ],
  },
  {
    id: "jizzax",
    name: "Jizzax",
    districts: [
      "Jizzax shahri",
      "Sharof Rashidov",
      "Arnasoy",
      "Baxmal",
      "Do'stlik",
      "Forish",
      "G'allaorol",
      "Mirzacho'l",
      "Paxtakor",
      "Yangiobod",
      "Zafarobod",
      "Zarbdor",
      "Zomin",
    ],
  },
  {
    id: "xorazm",
    name: "Xorazm",
    districts: [
      "Urganch shahri",
      "Urganch tumani",
      "Xiva shahri",
      "Xiva tumani",
      "Bog'ot",
      "Gurlan",
      "Hazorasp",
      "Xonqa",
      "Qo'shko'pir",
      "Shovot",
      "Tuproqqal'a",
      "Yangibozor",
    ],
  },
  {
    id: "namangan",
    name: "Namangan",
    districts: [
      "Namangan shahri",
      "Namangan tumani",
      "Chortoq",
      "Chust",
      "Kosonsoy",
      "Mingbuloq",
      "Norin",
      "Pop",
      "To'raqo'rg'on",
      "Uchqo'rg'on",
      "Uychi",
      "Yangiqo'rg'on",
      "Davlatobod",
    ],
  },
  {
    id: "navoiy",
    name: "Navoiy",
    districts: [
      "Navoiy shahri",
      "Zarafshon shahri",
      "Karmana",
      "Konimex",
      "Navbahor",
      "Nurota",
      "Qiziltepa",
      "Tomdi",
      "Uchquduq",
      "Xatirchi",
    ],
  },
  {
    id: "qashqadaryo",
    name: "Qashqadaryo",
    districts: [
      "Qarshi shahri",
      "Qarshi tumani",
      "Chiroqchi",
      "Dehqonobod",
      "G'uzor",
      "Kasbi",
      "Kitob",
      "Koson",
      "Mirishkor",
      "Muborak",
      "Nishon",
      "Qamashi",
      "Shahrisabz shahri",
      "Shahrisabz tumani",
      "Yakkabog'",
    ],
  },
  {
    id: "samarqand",
    name: "Samarqand",
    districts: [
      "Samarqand shahri",
      "Samarqand tumani",
      "Bulung'ur",
      "Ishtixon",
      "Jomboy",
      "Kattaqo'rg'on shahri",
      "Kattaqo'rg'on tumani",
      "Narpay",
      "Nurabad",
      "Oqdaryo",
      "Paxtachi",
      "Payariq",
      "Pastdarg'om",
      "Qo'shrabot",
      "Tayloq",
      "Urgut",
    ],
  },
  {
    id: "sirdaryo",
    name: "Sirdaryo",
    districts: [
      "Guliston shahri",
      "Guliston tumani",
      "Bayaut",
      "Boyovut",
      "Mirzaobod",
      "Oqoltin",
      "Sayxunobod",
      "Sardoba",
      "Sirdaryo tumani",
      "Xovos",
      "Yangiyer shahri",
      "Shirin shahri",
    ],
  },
  {
    id: "surxondaryo",
    name: "Surxondaryo",
    districts: [
      "Termiz shahri",
      "Termiz tumani",
      "Angor",
      "Bandixon",
      "Boysun",
      "Denov",
      "Jarqo'rg'on",
      "Qiziriq",
      "Qumqo'rg'on",
      "Muzrabot",
      "Oltinsoy",
      "Sariosiyo",
      "Sherobod",
      "Sho'rchi",
      "Uzun",
    ],
  },
  {
    id: "toshkent",
    name: "Toshkent",
    districts: [
      "Nurafshon shahri",
      "Angren shahri",
      "Bekobod shahri",
      "Chirchiq shahri",
      "Olmaliq shahri",
      "Yangiyo'l shahri",
      "Bekobod tumani",
      "Bo'ka",
      "Bo'stonliq",
      "Chinoz",
      "Ohangaron tumani",
      "Oqqo'rg'on",
      "Parkent",
      "Piskent",
      "Qibray",
      "Quyi Chirchiq",
      "O'rta Chirchiq",
      "Toshkent tumani",
      "Yangiyo'l tumani",
      "Yuqori Chirchiq",
      "Zangiota",
    ],
  },
  {
    id: "qoraqalpogiston",
    name: "Qoraqalpog'iston Respublikasi",
    districts: [
      "Nukus shahri",
      "Nukus tumani",
      "Amudaryo",
      "Beruniy",
      "Bo'zatov",
      "Chimboy",
      "Ellikqal'a",
      "Kegeyli",
      "Mo'ynoq",
      "Qonliko'l",
      "Qo'ng'irot",
      "Qorao'zak",
      "Shumanay",
      "Taxtako'pir",
      "Taxiatosh",
      "To'rtko'l",
      "Xo'jayli",
    ],
  },
  {
    id: "toshkent-shahri",
    name: "Toshkent shahri",
    districts: [
      "Bektemir",
      "Chilonzor",
      "Mirobod",
      "Mirzo Ulug'bek",
      "Olmazor",
      "Sergeli",
      "Shayxontohur",
      "Uchtepa",
      "Yakkasaroy",
      "Yashnobod",
      "Yangihayot",
      "Yunusobod",
    ],
  },
];

const AddressFormPage = () => {
  const [regionId, setRegionId] = useState("");
  const [district, setDistrict] = useState("");
  const selectedRegion = regions.find((region) => region.id === regionId);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-3">
        <div className="hidden lg:block">
          <Header />
        </div>

        <main className="pt-4 pb-24">
          <div className="flex items-center justify-between gap-3 lg:hidden">
            <Link
              to="/profile/addresses"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-white hover:text-slate-700 active:scale-95"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold">Manzilni qo'shish</h1>
            <div className="h-10 w-10" />
          </div>

          <div className="hidden lg:block">
            <h1 className="text-2xl font-semibold">Manzilni qo'shish</h1>
          </div>

          <form className="mt-6 space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
              Viloyatni tanlang <span className="text-rose-500">*</span>
              <select
                value={regionId}
                onChange={(event) => {
                  setRegionId(event.target.value);
                  setDistrict("");
                }}
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              >
                <option value="" disabled>
                  Viloyatni tanlang
                </option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Tuman/Shaharni tanlang <span className="text-rose-500">*</span>
              <select
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                disabled={!selectedRegion}
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              >
                <option value="" disabled>
                  {selectedRegion
                    ? "Tuman/Shaharni tanlang"
                    : "Avval viloyatni tanlang"}
                </option>
                {(selectedRegion?.districts ?? []).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Ko'cha <span className="text-rose-500">*</span>
              <input
                type="text"
                placeholder="Ko'cha"
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Mo'ljal
              <input
                type="text"
                placeholder="Mo'ljal"
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 active:scale-[0.98]"
            >
              Saqlash
            </button>
          </form>
        </main>
      </div>

      <div className="hidden sm:block">
        <Footer />
      </div>
      <BottomBar />
    </div>
  );
};

export default AddressFormPage;
