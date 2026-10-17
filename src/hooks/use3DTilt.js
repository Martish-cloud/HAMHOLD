import { useState, useRef, useCallback } from 'react';

/**
 * use3DTilt
 * Reusable, high-performance 3D perspective tilt and specular lighting hook.
 * Uses normalized pointer coordinates with requestAnimationFrame throttling.
 * Returns transform styles and specular glare coordinates for ultra-luxury cards.
 */
export function use3DTilt({
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  translateZ = 14,
  elevationY = -8,
  speed = 400,
  glare = true
} = {}) {
  const [tiltState, setTiltState] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    isHovered: false
  });

  const rafId = useRef(null);
  const elementRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    // Only apply on fine-pointer desktop devices and if motion is allowed
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    }

    const currentTarget = e.currentTarget;
    if (!currentTarget) return;

    const rect = currentTarget.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const x = (clientX - rect.left) / rect.width; // 0 to 1
      const y = (clientY - rect.top) / rect.height; // 0 to 1

      // Tilt angles: hovering near top tilts down (positive rotateX), right tilts right (positive rotateY)
      const rotX = (0.5 - y) * (maxTilt * 2);
      const rotY = (x - 0.5) * (maxTilt * 2);

      setTiltState({
        rotateX: Number(rotX.toFixed(2)),
        rotateY: Number(rotY.toFixed(2)),
        glareX: Number((x * 100).toFixed(1)),
        glareY: Number((y * 100).toFixed(1)),
        glareOpacity: 0.85,
        isHovered: true
      });
    });
  }, [maxTilt]);

  const handleMouseEnter = useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    setTiltState((prev) => ({ ...prev, isHovered: true }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);

    setTiltState({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
      isHovered: false
    });
  }, []);

  const tiltStyle = {
    transform: tiltState.isHovered
      ? `perspective(${perspective}px) rotateX(${tiltState.rotateX}deg) rotateY(${tiltState.rotateY}deg) translateY(${elevationY}px) translateZ(${translateZ}px) scale3d(${scale}, ${scale}, 1)`
      : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0px) scale3d(1, 1, 1)`,
    transformStyle: 'preserve-3d',
    transition: tiltState.isHovered
      ? 'transform 0.12s ease-out'
      : `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow ${speed}ms cubic-bezier(0.16, 1, 0.3, 1), border-color ${speed}ms ease`,
    willChange: 'transform, box-shadow'
  };

  const glareStyle = glare ? {
    background: `radial-gradient(circle at ${tiltState.glareX}% ${tiltState.glareY}%, rgba(214, 194, 154, 0.22) 0%, rgba(214, 194, 154, 0.05) 45%, transparent 75%)`,
    opacity: tiltState.isHovered ? tiltState.glareOpacity : 0,
    transition: tiltState.isHovered ? 'opacity 0.2s ease-out' : `opacity ${speed}ms ease`
  } : null;

  return {
    ref: elementRef,
    tiltState,
    tiltStyle,
    glareStyle,
    bind: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    }
  };
}
