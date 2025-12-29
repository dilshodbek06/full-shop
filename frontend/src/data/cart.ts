export type CartItem = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
};

export const cartItems: CartItem[] = [
  {
    id: "c-1",
    title: "ZIPPY Nabor iz 2 longslivov s printom Mickey Mouse",
    subtitle: "Rangli / 6-9m / 6 oyda",
    price: 239_200,
    quantity: 1,
    image: "https://picsum.photos/seed/cart-1/400/400",
  },
  {
    id: "c-2",
    title: "ZIPPY Nabor iz 2 par leginsov Mickey Mouse",
    subtitle: "Svetlo-seryy / 6-9m",
    price: 223_200,
    quantity: 1,
    image: "https://picsum.photos/seed/cart-2/400/400",
  },
  {
    id: "c-3",
    title: "ZIPPY Komplekt iz 2 leginsov s printom",
    subtitle: "Temno-siniy / 7-8y",
    price: 135_200,
    quantity: 1,
    image: "https://picsum.photos/seed/cart-3/400/400",
  },
  {
    id: "c-4",
    title:
      "Kabrita Kasha, na kozyem moloke, tykva, multizlakovaya, 6+ mes., 180 g",
    subtitle: "Ko'proq energiya va vitaminlar",
    price: 129_900,
    quantity: 1,
    image: "https://picsum.photos/seed/cart-4/400/400",
  },
  {
    id: "c-5",
    title:
      "Kabrita Kasha, na kozyem moloke, grechnevaya, yabloko, abrikos, 5+ mes., 180 g",
    subtitle: "Tabiiy shakarsiz, yumshoq ta'm",
    price: 129_900,
    quantity: 1,
    image: "https://picsum.photos/seed/cart-5/400/400",
  },
  {
    id: "c-6",
    title:
      "Nestle Shagayka Kasha s ovsyanymi khlopyami, yabloko, banan, grusha, multizlakovaya, 12+ mes., 190 g",
    subtitle: "Oson hazm bo'ladi, bolalar uchun",
    price: 29_900,
    quantity: 1,
    image: "https://picsum.photos/seed/cart-6/400/400",
  },
];
