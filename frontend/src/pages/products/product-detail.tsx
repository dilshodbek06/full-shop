import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  Share2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BottomBar from "@/components/common/bottom-bar";
import Footer from "@/components/common/footer";
import { allProducts } from "@/data/products";
import { useCart } from "@/store/use-cart";
import { useWishlist } from "@/store/use-wishlist";
import type { WishlistItem } from "@/data/wishlist";
import Header from "@/components/common/header";

const formatPrice = (value: number) => `${value.toLocaleString("ru-RU")} so'm`;

type SectionId = "description" | "delivery" | "share";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product =
    allProducts.find((item) => item.id === productId) ?? allProducts[0];

  // accordion
  const [openSections, setOpenSections] = useState<SectionId[]>([
    "description",
  ]);

  // gallery
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);

  // cart
  const addItem = useCart((s) => s.addItem);
  const setQuantity = useCart((s) => s.setQuantity);
  const quantity =
    useCart((s) => s.items.find((item) => item.id === product.id)?.quantity) ??
    0;

  // wishlist
  const addWishlistItem = useWishlist((s) => s.addItem);
  const removeWishlistItem = useWishlist((s) => s.removeItem);
  const isWished =
    useWishlist((s) => s.items.some((item) => item.id === product.id)) ?? false;

  // ✅ images-only source (safe fallback)
  const gallery = useMemo(() => {
    const imgs = product.images?.filter(Boolean) ?? [];
    return imgs.length
      ? imgs
      : ["https://via.placeholder.com/800?text=No+Image"];
  }, [product.images]);

  // ✅ always keep activeImage in range
  useEffect(() => {
    if (activeImage > gallery.length - 1) setActiveImage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gallery.length]);

  useEffect(() => {
    // reset when route changes
    setActiveImage(0);
    setOpenSections(["description"]);
    setIsZoomOpen(false);
    setZoomLevel(1);
    thumbsRef.current?.scrollTo({ left: 0 });
  }, [product.id]);

  const wishlistPayload: WishlistItem = useMemo(
    () => ({
      id: product.id,
      title: product.name,
      subtitle: product.pieces ?? product.category ?? "Mahsulot",
      price: product.priceValue,
      image: gallery[0], // ✅ main image
      badge: product.badge,
      availability:
        product.stock === "out"
          ? "out"
          : product.stock === "low"
          ? "low"
          : "available",
    }),
    [
      product.id,
      product.name,
      product.pieces,
      product.category,
      product.priceValue,
      product.badge,
      product.stock,
      gallery,
    ]
  );

  const toggleWishlist = () => {
    if (isWished) removeWishlistItem(product.id);
    else addWishlistItem(wishlistPayload);
  };

  const ensureInCart = () => {
    if (quantity > 0) return;
    addItem({
      id: product.id,
      title: product.name,
      subtitle: "",
      price: product.priceValue,
      quantity: 1,
      image: gallery[0], // ✅ main image
    });
  };

  const handleBuyNow = () => {};

  const handleDecrease = () => {
    const next = Math.max(0, quantity - 1);
    setQuantity(product.id, next);
  };

  const handleIncrease = () => {
    if (quantity > 0) setQuantity(product.id, quantity + 1);
    else ensureInCart();
  };

  const badgeLabel =
    product.stock === "low"
      ? "Qoldi 5 dona"
      : product.badge
      ? "Chegirma"
      : "Sotuvda";

  const handlePrevImage = () => {
    if (gallery.length <= 1) return;
    setActiveImage((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleNextImage = () => {
    if (gallery.length <= 1) return;
    setActiveImage((prev) => (prev + 1) % gallery.length);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    didSwipe.current = false;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = touchStartX.current - endX;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    didSwipe.current = true;
    if (delta > 0) handleNextImage();
    else handlePrevImage();
  };

  const handleZoomOpen = () => {
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }
    setIsZoomOpen(true);
  };

  const ActionControls = ({ variant }: { variant: "bar" | "panel" }) => {
    const isPanel = variant === "panel";
    const wrapperClass = isPanel ? "grid gap-3" : "flex items-center gap-3";
    const buyNowClass = isPanel
      ? "w-full rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 active:scale-[0.98]"
      : "flex-1 rounded-lg bg-slate-200 px-4 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-300 active:scale-[0.98]";
    const cartButtonClass = isPanel
      ? "w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-600 active:scale-[0.98]"
      : "w-44 rounded-lg bg-emerald-800 px-4 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-700 active:scale-[0.98]";
    const counterClass = isPanel
      ? "flex w-full items-center justify-between rounded-xl bg-emerald-800 px-4 py-2 text-white"
      : "flex w-44 items-center justify-between rounded-lg bg-emerald-800 px-3 py-2 text-white transition-all duration-300";
    const stepButtonClass = isPanel
      ? "flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/15 active:scale-[0.97]"
      : "flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/15 active:scale-[0.97]";
    const quantityClass = isPanel
      ? "text-base font-semibold"
      : "text-lg font-semibold";

    return (
      <div className={wrapperClass}>
        <button type="button" onClick={handleBuyNow} className={buyNowClass}>
          1 klikda xarid qilish
        </button>

        {quantity > 0 ? (
          <div className={counterClass}>
            <button
              type="button"
              onClick={handleDecrease}
              className={stepButtonClass}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className={quantityClass}>{quantity}</span>

            <button
              type="button"
              onClick={handleIncrease}
              className={stepButtonClass}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleIncrease}
            className={cartButtonClass}
          >
            Savatga qo'shish
          </button>
        )}
      </div>
    );
  };

  const sections: Array<{
    id: SectionId;
    title: string;
    content: React.ReactNode;
  }> = [
    {
      id: "description",
      title: "Mahsulot tavsifi",
      content:
        "Yumshoq mato, kundalik kiyish uchun qulay. Rangini yo'qotmaydi va teriga yoqimli.",
    },
    {
      id: "delivery",
      title: "Yetkazib berish",
      content:
        "Toshkent shahri bo'ylab - 24 soat, viloyatlarga 72 soat ichida yetkazib beriladi.",
    },
    {
      id: "share",
      title: "Ulashish",
      content: (
        <button
          type="button"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-700 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 active:scale-[0.98]"
        >
          <Share2 className="h-5 w-5" />
          Ulashish
        </button>
      ),
    },
  ];

  const ImageBlock = (
    <div className="overflow-hidden bg-white shadow-sm sm:rounded-3xl">
      <div className="bg-slate-50">
        <div
          className="relative aspect-4/5 w-full sm:aspect-3/4 lg:aspect-square"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={gallery[Math.min(activeImage, gallery.length - 1)]}
            alt={product.name}
            className="h-full w-full cursor-zoom-in object-cover sm:p-6"
            loading="lazy"
            onClick={handleZoomOpen}
          />

          {gallery.length > 1 ? (
            <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2 sm:hidden">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handlePrevImage();
                }}
                className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm"
                aria-label="Previous image"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleNextImage();
                }}
                className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm"
                aria-label="Next image"
              >
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </button>
            </div>
          ) : null}

          {gallery.length > 1 ? (
            <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5 sm:hidden">
              {gallery.map((_, idx) => (
                <span
                  key={`dot-${idx}`}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    idx === activeImage ? "bg-emerald-600" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {gallery.length > 1 ? (
        <div
          ref={thumbsRef}
          className="hidden gap-2 overflow-x-auto px-3 pb-3 sm:flex [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onClick={(e) => e.stopPropagation()}
          role="list"
          aria-label="Product images"
        >
          {gallery.map((src, idx) => {
            const active = idx === activeImage;
            return (
              <button
                key={`${src}-${idx}`}
                type="button"
                role="listitem"
                onClick={() => setActiveImage(idx)}
                className={`relative mt-1 flex h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-1 transition ${
                  active
                    ? "ring-emerald-500"
                    : "ring-slate-200 hover:ring-slate-300"
                }`}
                aria-label={`View image ${idx + 1}`}
                aria-current={active ? "true" : "false"}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );

  const ContentBlock = (
    <div className="space-y-4">
      <div className="sm:rounded-xl bg-white p-4 shadow-sm">
        <span className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
          {badgeLabel}
        </span>

        <h1 className="mt-2 line-clamp-2 text-2xl sm:text-3xl  font-bold text-slate-900">
          {product.name}
        </h1>

        <div className="mt-4 text-3xl font-bold text-slate-900">
          {formatPrice(product.priceValue)}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
            <span>Sotib olish</span>
            {quantity > 0 ? (
              <span className="text-xs font-medium text-slate-500">
                Savatda: {quantity}
              </span>
            ) : null}
          </div>
          <div className="mt-4">
            <ActionControls variant="panel" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {sections.map((section) => {
          const isOpen = openSections.includes(section.id);
          return (
            <div key={section.id} className="sm:rounded-xl bg-white shadow-sm">
              <button
                type="button"
                onClick={() =>
                  setOpenSections((prev) =>
                    prev.includes(section.id)
                      ? prev.filter((id) => id !== section.id)
                      : [...prev, section.id]
                  )
                }
                className="flex w-full items-center justify-between px-4 py-4 text-left text-lg font-semibold text-slate-900"
                aria-expanded={isOpen}
              >
                {section.title}
                <ChevronDown
                  className={`h-6 w-6 text-slate-400 transition ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen ? (
                <div className="px-4 pb-4 text-sm font-medium text-slate-600">
                  {section.content}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl sm:px-3">
        <div className="hidden lg:block">
          <Header />
        </div>

        <main className="pb-40 sm:pt-4 lg:pb-16">
          <div className="flex items-center justify-between gap-3 sm:rounded-xl bg-white px-3 py-2 shadow-sm">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
              aria-label="Back"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>

            <h1 className="line-clamp-1 sm:hidden text-sm font-semibold text-slate-900">
              {product.name}
            </h1>

            <button
              type="button"
              onClick={toggleWishlist}
              aria-pressed={isWished}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
              aria-label="Wishlist"
            >
              <Heart
                className="h-6 w-6"
                fill={isWished ? "#0f766e" : "none"}
                strokeWidth={isWished ? 0 : 2}
              />
            </button>
          </div>

          <div className="sm:mt-4 space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            <div className="lg:sticky lg:top-4 lg:self-start">{ImageBlock}</div>
            <div>{ContentBlock}</div>
          </div>
        </main>
      </div>

      <div className="fixed inset-x-0 bottom-16 z-40 border-t border-slate-200 bg-white/95 shadow-[0_-12px_30px_rgba(15,23,42,0.15)] backdrop-blur md:bottom-6 md:inset-x-6 md:rounded-2xl md:border md:shadow-[0_12px_30px_rgba(15,23,42,0.12)] lg:hidden">
        <div className="mx-auto max-w-5xl px-3 py-3">
          <ActionControls variant="bar" />
        </div>
      </div>

      <div className="hidden sm:block">
        <Footer />
      </div>
      <BottomBar />

      {isZoomOpen ? (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsZoomOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              onClick={() => setIsZoomOpen(false)}
              className="max-h-[80vh] cursor-zoom-out overflow-auto"
            >
              <img
                src={gallery[Math.min(activeImage, gallery.length - 1)]}
                alt={product.name}
                className="mx-auto h-auto max-h-[70vh] w-full max-w-full origin-center object-contain transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})` }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailPage;
