export type WishlistItem = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  badge?: string;
  availability?: "available" | "low" | "out";
  note?: string;
};

export const wishlistItems: WishlistItem[] = [
  {
    id: "w-1",
    title: "Deep Hydrate Serum",
    subtitle: "50 ml · teri parvarishi",
    price: 320000,
    image: "https://picsum.photos/seed/wishlist-1/800/800",
    badge: "Yangi",
    availability: "available",
  },
  {
    id: "w-2",
    title: "Omega-3 Gold Fish Oil",
    subtitle: "120 kapsula · vitamin",
    price: 540000,
    image: "https://picsum.photos/seed/wishlist-2/800/800",
    availability: "low",
    note: "Cheklangan miqdor",
  },
  {
    id: "w-3",
    title: "Immuno Plus Vitamin C",
    subtitle: "30 tabletka · immunitet",
    price: 180000,
    image: "https://picsum.photos/seed/wishlist-3/800/800",
    badge: "-25%",
    availability: "available",
  },
  {
    id: "w-4",
    title: "Portable Nebulizer Device",
    subtitle: "1 dona · tibbiy asbob",
    price: 1200000,
    image: "https://picsum.photos/seed/wishlist-4/800/800",
    availability: "out",
    note: "Qayta kirim kutilmoqda",
  },
  {
    id: "w-5",
    title: "Calm Night Magnesium",
    subtitle: "90 kapsula · qo'shimcha",
    price: 220000,
    image: "https://picsum.photos/seed/wishlist-5/800/800",
    availability: "available",
  },
  {
    id: "w-6",
    title: "Sport Electrolyte Mix",
    subtitle: "20 sachet · sport",
    price: 350000,
    image: "https://picsum.photos/seed/wishlist-6/800/800",
    badge: "Sevimli",
    availability: "available",
  },
];
