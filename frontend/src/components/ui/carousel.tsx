import * as React from "react";
import { cn } from "@/lib/utils";

type CarouselContextValue = {
  currentIndex: number;
  itemsCount: number;
  setItemsCount: React.Dispatch<React.SetStateAction<number>>;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

const useCarousel = () => {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel components must be used inside <Carousel>");
  }
  return context;
};

type CarouselProps = {
  children: React.ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
};

const Carousel = ({
  children,
  autoPlay = true,
  autoPlayInterval = 6000,
  className,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [itemsCount, setItemsCount] = React.useState(0);

  const next = React.useCallback(() => {
    setCurrentIndex((prev) => {
      if (itemsCount === 0) return prev;
      return (prev + 1) % itemsCount;
    });
  }, [itemsCount]);

  const prev = React.useCallback(() => {
    setCurrentIndex((prev) => {
      if (itemsCount === 0) return prev;
      return (prev - 1 + itemsCount) % itemsCount;
    });
  }, [itemsCount]);

  const goTo = React.useCallback(
    (index: number) => {
      setCurrentIndex((prev) => {
        if (itemsCount === 0) return prev;
        const normalized = ((index % itemsCount) + itemsCount) % itemsCount;
        return normalized;
      });
    },
    [itemsCount]
  );

  React.useEffect(() => {
    if (!autoPlay || itemsCount < 2) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => ((prev + 1) % itemsCount) || 0);
    }, autoPlayInterval);

    return () => window.clearInterval(timer);
  }, [autoPlay, autoPlayInterval, itemsCount]);

  const value = React.useMemo(
    () => ({
      currentIndex,
      itemsCount,
      setItemsCount,
      next,
      prev,
      goTo,
    }),
    [currentIndex, itemsCount, next, prev, goTo]
  );

  return (
    <CarouselContext.Provider value={value}>
      <div className={cn("relative", className)}>{children}</div>
    </CarouselContext.Provider>
  );
};

type CarouselContentProps = React.HTMLAttributes<HTMLDivElement>;

const CarouselContent = ({ children, className, ...props }: CarouselContentProps) => {
  const { currentIndex, setItemsCount } = useCarousel();
  const items = React.Children.toArray(children);

  React.useEffect(() => {
    setItemsCount(items.length);
  }, [items.length, setItemsCount]);

  return (
    <div className={cn("overflow-hidden", className)} {...props}>
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((child, index) => (
          <div key={index} className="min-w-full">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("h-full w-full", className)} {...props} />
  )
);
CarouselItem.displayName = "CarouselItem";

const baseControlClasses =
  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/70 text-slate-900 shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-60";

const CarouselPrevious = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { prev, itemsCount } = useCarousel();
  return (
    <button
      type="button"
      aria-label="Previous slide"
      onClick={prev}
      disabled={itemsCount === 0}
      className={cn(baseControlClasses, className)}
      {...props}
    >
      {children ?? <span className="text-lg font-semibold">‹</span>}
    </button>
  );
};

const CarouselNext = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { next, itemsCount } = useCarousel();
  return (
    <button
      type="button"
      aria-label="Next slide"
      onClick={next}
      disabled={itemsCount === 0}
      className={cn(baseControlClasses, className)}
      {...props}
    >
      {children ?? <span className="text-lg font-semibold">›</span>}
    </button>
  );
};

type CarouselIndicatorsProps = React.HTMLAttributes<HTMLDivElement>;

const CarouselIndicators = ({ className, ...props }: CarouselIndicatorsProps) => {
  const { itemsCount, currentIndex, goTo } = useCarousel();

  if (itemsCount <= 1) return null;

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {Array.from({ length: itemsCount }).map((_, index) => {
        const isActive = currentIndex === index;
        return (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "h-2.5 w-8 rounded-full transition-all duration-300",
              isActive ? "bg-white shadow-lg" : "bg-white/40 hover:bg-white/60"
            )}
          />
        );
      })}
    </div>
  );
};

export {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
};
