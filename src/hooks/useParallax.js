import { useEffect, useRef } from 'react';

/**
 * useParallax
 * Lightweight, GPU-accelerated scroll parallax hook.
 * Directly applies translate3d via requestAnimationFrame for 60/120fps performance.
 * Avoids any React re-renders during scrolling.
 * Respects prefers-reduced-motion and mobile viewports.
 * 
 * @param {Object} options
 * @param {number} [options.speed=0.12] - Speed factor for parallax movement
 * @param {number} [options.maxOffset=30] - Maximum pixel displacement clamped
 * @param {boolean} [options.reverse=false] - Invert parallax direction
 * @param {boolean} [options.disabled=false] - Manually disable
 */
export function useParallax({
  speed = 0.12,
  maxOffset = 30,
  reverse = false,
  disabled = false
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    // Respect reduced motion accessibility setting
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.transform = '';
      return;
    }

    // Skip on touch/mobile devices to avoid unnecessary battery use and maintain native smooth scroll
    if (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) {
      el.style.transform = '';
      return;
    }

    let ticking = false;

    const updateParallax = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const winHeight = window.innerHeight;

      // Only perform work if element is within or entering viewport
      if (rect.bottom >= -120 && rect.top <= winHeight + 120) {
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = winHeight / 2;
        const delta = elementCenter - viewportCenter;
        const direction = reverse ? -1 : 1;
        const rawOffset = delta * speed * direction;
        const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, rawOffset));

        el.style.transform = `translate3d(0, ${clampedOffset.toFixed(1)}px, 0)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (el) el.style.transform = '';
    };
  }, [speed, maxOffset, reverse, disabled]);

  return ref;
}
