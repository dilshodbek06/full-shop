import * as React from "react";
import { Drawer } from "vaul";
import { cn } from "@/lib/utils";

type DrawerVariant = "bottom" | "modal";

type UniversalDrawerProps = React.ComponentProps<typeof Drawer.Root> & {
  variant?: DrawerVariant;
};

const VariantContext = React.createContext<DrawerVariant>("bottom");

const UniversalDrawer = ({
  variant = "bottom",
  modal = true,
  shouldScaleBackground = variant === "bottom",
  ...props
}: UniversalDrawerProps) => (
  <VariantContext.Provider value={variant}>
    <Drawer.Root
      modal={modal}
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  </VariantContext.Provider>
);

const UniversalDrawerTrigger = Drawer.Trigger;
const UniversalDrawerClose = Drawer.Close;

const UniversalDrawerOverlay = React.forwardRef<
  React.ElementRef<typeof Drawer.Overlay>,
  React.ComponentPropsWithoutRef<typeof Drawer.Overlay>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(VariantContext);

  return (
    <Drawer.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm",
        variant === "modal" && "bg-slate-900/80",
        className
      )}
      {...props}
    />
  );
});
UniversalDrawerOverlay.displayName = "UniversalDrawerOverlay";

const UniversalDrawerContent = React.forwardRef<
  React.ElementRef<typeof Drawer.Content>,
  React.ComponentPropsWithoutRef<typeof Drawer.Content>
>(({ className, children, ...props }, ref) => {
  const variant = React.useContext(VariantContext);

  return (
    <Drawer.Portal>
      <UniversalDrawerOverlay />
      <Drawer.Content
        ref={ref}
        className={cn(
          "fixed z-60 flex flex-col bg-white text-slate-900 shadow-lg outline-none",
          variant === "bottom"
            ? "inset-x-0 bottom-0 max-h-[85vh] rounded-t-3xl border border-slate-200"
            : "left-1/2 top-1/2 w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200",
          className
        )}
        {...props}
      >
        {children}
      </Drawer.Content>
    </Drawer.Portal>
  );
});
UniversalDrawerContent.displayName = "UniversalDrawerContent";

const UniversalDrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("px-4 pb-3 pt-4 text-center sm:text-left", className)}
    {...props}
  />
);

const UniversalDrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto px-4 pb-4", className)} {...props} />
);

const UniversalDrawerTitle = React.forwardRef<
  React.ElementRef<typeof Drawer.Title>,
  React.ComponentPropsWithoutRef<typeof Drawer.Title>
>(({ className, ...props }, ref) => (
  <Drawer.Title
    ref={ref}
    className={cn("text-base font-semibold text-slate-900", className)}
    {...props}
  />
));
UniversalDrawerTitle.displayName = "UniversalDrawerTitle";

const UniversalDrawerDescription = React.forwardRef<
  React.ElementRef<typeof Drawer.Description>,
  React.ComponentPropsWithoutRef<typeof Drawer.Description>
>(({ className, ...props }, ref) => (
  <Drawer.Description
    ref={ref}
    className={cn("mt-1 text-sm text-slate-500", className)}
    {...props}
  />
));
UniversalDrawerDescription.displayName = "UniversalDrawerDescription";

export {
  UniversalDrawer,
  UniversalDrawerTrigger,
  UniversalDrawerClose,
  UniversalDrawerContent,
  UniversalDrawerHeader,
  UniversalDrawerFooter,
  UniversalDrawerTitle,
  UniversalDrawerDescription,
};
