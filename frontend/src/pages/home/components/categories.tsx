import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Personal Care",
    image:
      "https://images.unsplash.com/photo-1613521140785-e85e427f8002?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    name: "Diabetic Care",
    image:
      "https://images.unsplash.com/photo-1684156486280-ff59f07fc5bb?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    name: "Supplement",
    image:
      "https://images.unsplash.com/photo-1700911772670-410b44ac7392?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    name: "Devices",
    image:
      "https://images.unsplash.com/photo-1631278063933-e1d7ea312b7a?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    name: "Baby Care",
    image:
      "https://images.unsplash.com/photo-1718628814859-668100957933?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    name: "Hair Care",
    image:
      "https://images.unsplash.com/photo-1747098393451-6b985f62a2c2?auto=format&fit=crop&w=800&h=1000&q=80",
  },
];

const Categories = () => {
  return (
    <div>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Shop by Category</h3>
          <button className="flex bg-gray-100 px-3 py-2 cursor-pointer hover:bg-gray-200/80 rounded-lg items-center gap-2 text-sm font-semibold text-emerald-700">
            View Categories
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="
        group relative overflow-hidden rounded-2xl
        border border-slate-200/70 bg-white
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
        focus-within:ring-2 focus-within:ring-slate-900/20
      "
            >
              {/* Image: full width/height of parent */}
              <div className="relative w-full aspect-4/5">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="
            absolute inset-0 h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-[1.06]
          "
                />

                {/* Subtle gradient to help text readability */}
                <div
                  className="
            pointer-events-none absolute inset-0
            bg-linear-to-t from-black/40 via-black/15 to-transparent
            opacity-90 transition-opacity duration-300
            group-hover:opacity-100
          "
                />

                {/* Bottom blur overlay title (always visible for clarity) */}
                <div className="absolute inset-x-0 bottom-0">
                  <div className="m-3 rounded-xl bg-white/15 px-3 py-2 text-center text-white backdrop-blur-md  transition duration-300 group-hover:bg-white/25">
                    <p className="truncate text-sm font-semibold">
                      {category.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Categories;
