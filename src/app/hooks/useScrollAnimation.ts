import { useEffect, useRef, useState, useCallback } from "react";

type AnimationType = "fade-up" | "fade-in" | "slide-left" | "slide-right";

interface ScrollAnimationOptions {
  staggerDelay?: number;
  type?: AnimationType;
  threshold?: number;
  duration?: number;
  distance?: number;
}

export function useScrollAnimation(opts: ScrollAnimationOptions | number = {}) {
  // Backwards-compatible: accept a number as staggerDelay
  const options: ScrollAnimationOptions =
    typeof opts === "number" ? { staggerDelay: opts } : opts;

  const {
    staggerDelay = 0,
    type = "fade-up",
    threshold = 0.15,
    duration = 500,
    distance = 28,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), staggerDelay);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [staggerDelay, threshold]);

  const getTransform = (visible: boolean): string => {
    if (visible) return "translate(0, 0)";
    switch (type) {
      case "fade-up":
        return `translateY(${distance}px)`;
      case "fade-in":
        return "translate(0, 0)";
      case "slide-left":
        return `translateX(-${distance}px)`;
      case "slide-right":
        return `translateX(${distance}px)`;
      default:
        return `translateY(${distance}px)`;
    }
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(isVisible),
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  };

  return { ref, style, isVisible };
}

/**
 * Count-up animation hook for stat numbers.
 * Parses numbers like "50+", "15+", "100%" and animates from 0.
 */
export function useCountUp(
  target: string,
  durationMs = 1200
): { ref: React.RefObject<HTMLDivElement | null>; displayValue: string } {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState("0");
  const hasAnimated = useRef(false);

  // Parse target into numeric part and suffix
  const parseTarget = useCallback(() => {
    const match = target.match(/^(\d+)(.*)/);
    if (!match) return { num: 0, suffix: target };
    return { num: parseInt(match[1], 10), suffix: match[2] };
  }, [target]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setDisplayValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const { num, suffix } = parseTarget();
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            // ease-out: 1 - (1 - t)^3
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * num);
            setDisplayValue(`${current}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, durationMs, parseTarget]);

  return { ref, displayValue };
}

/**
 * Hero cascade hook — triggers sequential reveal after page load.
 */
export function useHeroCascade(
  itemCount: number,
  staggerMs = 100,
  initialDelayMs = 200
) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisibleItems(new Array(itemCount).fill(true));
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < itemCount; i++) {
      timers.push(
        setTimeout(() => {
          setVisibleItems((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, initialDelayMs + i * staggerMs)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, [itemCount, staggerMs, initialDelayMs]);

  const getStyle = (index: number): React.CSSProperties => ({
    opacity: visibleItems[index] ? 1 : 0,
    transform: visibleItems[index] ? "translateY(0)" : "translateY(28px)",
    transition: "opacity 500ms ease-out, transform 500ms ease-out",
  });

  return { visibleItems, getStyle };
}
