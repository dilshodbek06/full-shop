import { Heart, ShieldCheck } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useWishlist } from "@/store/use-wishlist";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Discounts", to: "#" },
  { label: "Reels", to: "/reels" },
  { label: "About us", to: "#" },
];

const Header = () => {
  const wishlistCount = useWishlist((s) => s.items.length);

  return (
    <header className="relative py-2 ring-slate-100">
      <div className="flex justify-between items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl py-2 text-emerald-700"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="font-semibold">Shop</h2>
        </Link>

        <nav className="hidden  items-center gap-5 text-sm font-semibold text-slate-700 md:flex">
          {navLinks.map((link) =>
            link.to.startsWith("#") ? (
              <span
                key={link.label}
                className="rounded-full px-3 py-2 text-slate-400"
              >
                {link.label}
              </span>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-700",
                    isActive && "bg-emerald-50 text-emerald-700"
                  )
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            to="/wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-4.5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            ) : null}
          </Link>

          <Button size="sm" className="px-4 rounded-lg">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
