import { allProducts, type ProductItem } from "./products";

export type ReelItem = {
  id: string;
  product: ProductItem;
  videoUrl: string;
  thumbnail: string;
  duration: string;
};

const videoSources = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
];

const durations = ["00:24", "00:37", "00:48", "01:02", "00:33", "00:29"];

export const reels: ReelItem[] = allProducts
  .slice(0, 8)
  .map((product, idx) => ({
    id: `reel-${idx + 1}`,
    product,
    videoUrl: videoSources[idx % videoSources.length],
    thumbnail: product.image,
    duration: durations[idx % durations.length],
  }));
