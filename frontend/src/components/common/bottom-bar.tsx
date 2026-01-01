import { Home, Package, Play, ShoppingBag, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/use-cart";

const BottomBar = () => {
  const cartCount = useCart((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const bottomNav = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Reels", to: "/reels" },
    { label: "Cart", to: "/cart", badge: cartCount },
    { label: "Profile", to: "/profile" },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t border-slate-200 bg-white px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden">
      {bottomNav.map(({ label, to, badge }) => {
        const Icon =
          label === "Home"
            ? Home
            : label === "Products"
            ? Package
            : label === "Reels"
            ? Play
            : label === "Cart"
            ? ShoppingBag
            : UserRound;

        if (to.startsWith("#")) {
          return (
            <span
              key={label}
              className="relative flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1 text-xs font-semibold text-slate-400"
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
              {badge ? (
                <span className="absolute right-5 -top-0.5 flex h-5 min-w-4.5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
                  {badge}
                </span>
              ) : null}
            </span>
          );
        }

        return (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              cn(
                "relative flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1 text-xs font-semibold text-slate-600 transition hover:text-emerald-700",
                isActive && "text-emerald-700"
              )
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
            {badge ? (
              <span className="absolute right-5 -top-0.5 flex h-5 min-w-4.5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
                {badge}
              </span>
            ) : null}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomBar;
