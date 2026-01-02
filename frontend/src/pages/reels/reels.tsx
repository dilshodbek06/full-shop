"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Clock, ShoppingBag, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";
import { reels } from "@/data/reels";

type ReelVideoHandle = {
  id: string;
  ref: React.RefObject<HTMLVideoElement | null>;
};

const ReelsPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const handles: ReelVideoHandle[] = useMemo(
    () =>
      reels.map((r) => ({
        id: r.id,
        ref: React.createRef<HTMLVideoElement>(),
      })),
    []
  );

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reel-id]")
    );

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (!best) return;
        const id = best.target.getAttribute("data-reel-id");
        if (!id) return;
        setActiveId(id);
      },
      { root, threshold: [0.6, 0.75, 0.9] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    for (const h of handles) {
      const vid = h.ref.current;
      if (!vid) continue;

      // eslint-disable-next-line react-hooks/immutability
      vid.muted = muted;
      vid.playsInline = true;

      if (h.id === activeId) {
        const p = vid.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } else {
        vid.pause();
        try {
          vid.currentTime = 0;
        } catch {
          /* empty */
        }
      }
    }
  }, [activeId, muted, handles]);

  useEffect(() => {
    const activeHandle = handles.find((h) => h.id === activeId);
    const vid = activeHandle?.ref.current;

    if (!vid) {
      setProgress(0);
      return;
    }

    const handleTimeUpdate = () => {
      if (!vid.duration || Number.isNaN(vid.duration)) {
        setProgress(0);
        return;
      }
      setProgress(
        Math.min(100, Math.max(0, (vid.currentTime / vid.duration) * 100))
      );
    };

    const handleEnded = () => setProgress(100);

    vid.addEventListener("timeupdate", handleTimeUpdate);
    vid.addEventListener("ended", handleEnded);
    handleTimeUpdate();

    return () => {
      vid.removeEventListener("timeupdate", handleTimeUpdate);
      vid.removeEventListener("ended", handleEnded);
    };
  }, [activeId, handles]);

  return (
    <div className="relative h-dvh bg-black text-white">
      {/* Top bar */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 w-full">
        <div className="pointer-events-auto mx-auto flex max-w-xl items-center justify-between px-4 py-3">
          <Link
            to="/"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur-md transition hover:bg-white/20"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <button
            type="button"
            onClick={() => setMuted((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 backdrop-blur-md sm:mr-2 hover:bg-white/15 transition"
          >
            {muted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
            {muted ? "Muted" : "Sound"}
          </button>
        </div>
      </div>

      {/* Feed */}
      <main
        ref={containerRef}
        className="h-dvh overflow-y-auto snap-y snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none]"
      >
        <style>{`main::-webkit-scrollbar{display:none}`}</style>

        {reels.map((reel, idx) => {
          const videoRef = handles[idx]?.ref;

          return (
            <section
              key={reel.id}
              data-reel-id={reel.id}
              className="relative h-dvh snap-start overflow-hidden bg-black"
            >
              {/* ===== Desktop/Large screens: blurred background ===== */}
              <video
                className="absolute inset-0 hidden h-full w-full object-cover blur-2xl opacity-35 scale-110 md:block"
                src={reel.videoUrl}
                poster={reel.thumbnail}
                muted
                playsInline
                loop
                preload="metadata"
              />

              {/* ===== Main centered reel (mobile full width, desktop 9:16) ===== */}
              <div className="relative z-10 mx-auto flex h-full w-full items-center justify-center px-0 md:px-6">
                <div
                  className="
      relative h-full w-full
      sm:w-[clamp(420px,38vw,560px)]
      md:ring-1 md:ring-white/10
      md:shadow-[0_28px_90px_rgba(0,0,0,0.60)]
    "
                >
                  <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover"
                    src={reel.videoUrl}
                    poster={reel.thumbnail}
                    loop
                    playsInline
                    preload="metadata"
                  />

                  {/* ✅ FIX: Tailwind gradient class */}
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Progress bar */}
                  <div className="absolute left-0 right-0 bottom-0 z-10 h-1.5 bg-white/15">
                    <div
                      className="h-full bg-emerald-500 transition-[width] duration-150 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-6 left-0 right-0 z-10 px-4">
                    <div className="mx-auto max-w-xl">
                      <div className="mb-3 flex items-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-md">
                          <Clock className="h-3.5 w-3.5 text-emerald-300" />
                          {reel.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-3 text-slate-900 shadow-[0_18px_50px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                          <img
                            src={reel.product.image}
                            alt={reel.product.name}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                            {reel.product.category}
                          </p>
                          <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug">
                            {reel.product.name}
                          </h3>

                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="text-sm font-bold">
                              {reel.product.price}
                            </span>
                            {reel.product.oldPrice ? (
                              <span className="text-xs font-semibold text-slate-400 line-through">
                                {reel.product.oldPrice}
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <button
                          type="button"
                          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 active:scale-[0.98]"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Sotib olish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safe top fade (helps under header) */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-black/60 to-transparent" />
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default ReelsPage;
