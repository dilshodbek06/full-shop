/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ShoppingBag, Minus, Plus, Heart } from "lucide-react";
import type { ProductItem } from "@/data/products";
import { Button } from "../ui/button";
import { useCart } from "@/store/use-cart";
import { useWishlist } from "@/store/use-wishlist";
import type { WishlistItem } from "@/data/wishlist";

type ProductCardProps = {
  product: ProductItem;
  actions?: ReactNode;
};

const ProductCard = ({ product, actions }: ProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCart((s) => s.addItem);
  const setQuantity = useCart((s) => s.setQuantity);
  const quantity =
    useCart(
      (s) => s.items.find((item) => item.id === product.id)?.quantity ?? 0
    ) ?? 0;
  const addWishlistItem = useWishlist((s) => s.addItem);
  const removeWishlistItem = useWishlist((s) => s.removeItem);
  const isWished =
    useWishlist((s) => s.items.some((item) => item.id === product.id)) ?? false;

  const wishlistPayload: WishlistItem = useMemo(
    () => ({
      id: product.id,
      title: product.name,
      subtitle: product.pieces ?? product.category ?? "Mahsulot",
      price: product.priceValue,
      image: product.image,
      badge: product.badge,
      availability:
        product.stock === "out"
          ? "out"
          : product.stock === "low"
          ? "low"
          : "available",
    }),
    [product]
  );

  useEffect(() => {
    if (quantity > 0) setIsAdding(false);
  }, [quantity]);

  const handleAdd = () => {
    setIsAdding(true);
    const numericPrice = product.priceValue;

    addItem({
      id: product.id,
      title: product.name,
      subtitle: product.pieces ?? product.category ?? "Mahsulot",
      price: numericPrice,
      quantity: 1,
      image: product.image,
    });
    // Fallback in case store update is delayed
    setTimeout(() => setIsAdding(false), 400);
  };

  const toggleWishlist = () => {
    if (isWished) {
      removeWishlistItem(product.id);
      return;
    }
    addWishlistItem(wishlistPayload);
  };

  return (
    <div className="group relative flex h-full flex-col rounded-2xl bg-white p-px transition">
      <button
        type="button"
        onClick={toggleWishlist}
        aria-pressed={isWished}
        className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-500 shadow-sm backdrop-blur transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700"
      >
        <Heart
          className="h-4 w-4"
          fill={isWished ? "#059669" : "none"}
          strokeWidth={isWished ? 0 : 2}
        />
      </button>
      <div className="relative mb-2.5 flex items-center justify-center">
        <div className="flex aspect-3/4 w-full items-center justify-center overflow-hidden rounded-lg bg-slate-50">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
        {product.badge ? (
          <span className="absolute left-2 top-2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {product.badge}
          </span>
        ) : null}
      </div>
      <h4 className="line-clamp-1 text-sm font-semibold text-slate-900">
        {product.name}
      </h4>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-base font-bold text-emerald-700 sm:text-lg">
          {product.price}
        </span>
        {product.oldPrice ? (
          <span className="text-xs text-slate-400 line-through sm:text-sm">
            {product.oldPrice}
          </span>
        ) : null}
      </div>
      {product.pieces ? (
        <p className="text-xs text-slate-500">{product.pieces}</p>
      ) : null}

      <div className="mt-2.5 relative min-h-13">
        {actions ? (
          actions
        ) : (
          <>
            <div
              className={`absolute inset-0 transition-all duration-200 ease-out ${
                quantity > 0
                  ? "pointer-events-none -translate-y-1 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <Button
                variant="main"
                className="w-full rounded-lg text-sm transition active:scale-[0.98]"
                size="sm"
                onClick={handleAdd}
                disabled={isAdding}
              >
                {isAdding ? (
                  <span className="flex w-full items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                    Qo'shilmoqda...
                  </span>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    Savatga qo'shish
                  </>
                )}
              </Button>
            </div>

            <div
              className={`absolute inset-0 transition-all duration-200 ease-out ${
                quantity > 0
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-1 opacity-0"
              }`}
            >
              <div className="flex h-full items-center justify-between rounded-lg bg-slate-50 p-2">
                <button
                  type="button"
                  onClick={() => setQuantity(product.id, quantity - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-[0.97]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-sm font-semibold text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(product.id, quantity + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm transition hover:bg-emerald-500 active:scale-[0.97]"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
