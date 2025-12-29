import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export type HeroSlide = {
  id: string;
  image: string;
  productId?: string;
  href?: string;
};

const heroSlides: HeroSlide[] = [
  {
    id: "s1",
    image: "/images/banner/banner.png",
    productId: "prod_1",
  },
  {
    id: "s2",
    image: "/images/banner/banner2.png",
    productId: "prod_2",
  },
  {
    id: "s3",
    image: "/images/banner/banner3.png",
    productId: "prod_3",
  },
];

function defaultOnBuy(slide: HeroSlide) {
  // Replace with your router/navigation logic
  if (slide.href) {
    window.location.href = slide.href;
    return;
  }
  if (slide.productId) {
    window.location.href = `/products/${slide.productId}`;
    return;
  }
}

export default function Hero({
  slides = heroSlides,
  onBuy = defaultOnBuy,
}: {
  slides?: HeroSlide[];
  onBuy?: (slide: HeroSlide) => void;
}) {
  return (
    <section className="w-full px-3 sm:px-4">
      <Carousel autoPlayInterval={5200} className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              {/* Outer shell (adds separation from page + premium feel) */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
                {/* Compact responsive heights (your old h-45/h-75 were not valid Tailwind by default) */}
                <div className="relative bg-white h-45 sm:h-60 md:h-70 lg:h-96">
                  {/* Image */}
                  <img
                    src={slide.image}
                    alt="Banner"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />

                  {/* CTA contrast helpers (no text on banner) */}
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />

                  {/* Buy button only (premium floating pill) */}
                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => onBuy(slide)}
                      className="
                        group rounded-full
                        bg-white/95 text-slate-900
                        shadow-lg backdrop-blur-md
                        hover:bg-white hover:shadow-xl
                        transition
                      "
                    >
                      Sotib olish
                      <ArrowRight className=" h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls (desktop only, minimal) */}
        <CarouselPrevious className="absolute left-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 rounded-full border-white/20 bg-black/25 text-white backdrop-blur-sm shadow-sm hover:bg-black/40 md:flex">
          <ChevronLeft className="h-4 w-4" />
        </CarouselPrevious>

        <CarouselNext className="absolute right-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 rounded-full border-white/20 bg-black/25 text-white backdrop-blur-sm shadow-sm hover:bg-black/40 md:flex">
          <ChevronRight className="h-4 w-4" />
        </CarouselNext>

        {/* Dots */}
        <CarouselIndicators className="absolute bottom-2 left-1/2 -translate-x-1/2" />
      </Carousel>
    </section>
  );
}
