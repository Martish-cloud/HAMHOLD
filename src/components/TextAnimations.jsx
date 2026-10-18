import React, { useState, useEffect, useRef, useMemo } from 'react';

function checkReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * 1. NEON YELLOW LEFT-TO-RIGHT TYPEWRITING EFFECT
 * Apply to:
 * - NEW ARRIVALS
 * - MOST WANTED
 * - PRIVATE JEWELLERY OFFERS
 * - CRAFTED WITH INTENTION.
 * - FIND SOMETHING THEY'LL NEVER FORGET
 *
 * Re-triggerable: Resets when leaving viewport, replays from Character 1 when entering again.
 */
export function NeonTypewriterText({ text, className = '' }) {
  const containerRef = useRef(null);
  const chars = Array.from(text);

  const [isInView, setIsInView] = useState(() => checkReducedMotion());
  const [revealedIndex, setRevealedIndex] = useState(() =>
    checkReducedMotion() ? chars.length : 0
  );
  const [isComplete, setIsComplete] = useState(() => checkReducedMotion());

  // Group characters into words to strictly prevent intra-word wrapping (e.g. "f-orget")
  const wordTokens = useMemo(() => {
    const tokens = [];
    let currentWord = [];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === ' ') {
        if (currentWord.length > 0) {
          tokens.push({ type: 'word', chars: currentWord });
          currentWord = [];
        }
        tokens.push({ type: 'space', index: i });
      } else {
        currentWord.push({ char, index: i });
      }
    }
    if (currentWord.length > 0) {
      tokens.push({ type: 'word', chars: currentWord });
    }
    return tokens;
  }, [text]);

  useEffect(() => {
    if (typeof window === 'undefined' || checkReducedMotion()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setRevealedIndex(0);
            setIsComplete(false);
          } else {
            setIsInView(false);
            setRevealedIndex(0);
            setIsComplete(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentEl = containerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
      observer.disconnect();
    };
  }, [chars.length]);

  useEffect(() => {
    if (!isInView || isComplete) return;

    if (revealedIndex >= chars.length) {
      return;
    }

    // Typing cadence: 38ms per character for an elegant, fluid luxury feel
    const timer = setTimeout(() => {
      setRevealedIndex((prev) => {
        const next = prev + 1;
        if (next >= chars.length) {
          setIsComplete(true);
        }
        return next;
      });
    }, 38);

    return () => clearTimeout(timer);
  }, [isInView, revealedIndex, chars.length, isComplete]);

  return (
    <span
      ref={containerRef}
      className={`inline-block relative ${className}`}
      aria-label={text}
    >
      <span aria-hidden="true" className="whitespace-normal md:whitespace-nowrap">
        {wordTokens.map((token, tIdx) => {
          if (token.type === 'space') {
            const isRevealed = token.index < revealedIndex;
            return (
              <span
                key={`space-${tIdx}`}
                className={isRevealed ? 'inline' : 'opacity-0 select-none pointer-events-none inline'}
              >
                {' '}
              </span>
            );
          }
          return (
            <span key={`word-${tIdx}`} className="inline-block whitespace-nowrap">
              {token.chars.map(({ char, index }) => {
                const isRevealed = index < revealedIndex;
                const isLead = index === revealedIndex - 1 && !isComplete;
                const isRecent = index >= revealedIndex - 3 && index < revealedIndex - 1 && !isComplete;

                let charClass = 'transition-colors duration-500 inline-block';

                if (!isRevealed) {
                  charClass += ' opacity-0 select-none pointer-events-none';
                } else if (isLead) {
                  charClass += ' text-[#FAFF00] drop-shadow-[0_0_10px_rgba(250,255,0,0.85)] drop-shadow-[0_0_20px_rgba(250,255,0,0.45)]';
                } else if (isRecent) {
                  charClass += ' text-[#FAF4A8] drop-shadow-[0_0_6px_rgba(250,255,0,0.35)]';
                } else {
                  charClass += ' text-inherit';
                }

                return (
                  <span key={index} className={charClass}>
                    {char}
                  </span>
                );
              })}
            </span>
          );
        })}

        {/* Subtle, non-blinking luxury neon yellow lead indicator while typing */}
        {!isComplete && revealedIndex > 0 && revealedIndex < chars.length && (
          <span
            aria-hidden="true"
            className="inline-block w-[2px] h-[0.7em] bg-[#FAFF00] shadow-[0_0_8px_#FAFF00] align-baseline ml-0.5 rounded-full"
          />
        )}
      </span>
    </span>
  );
}

/**
 * 2. BLUR WIPE TEXT EFFECT
 * Apply to:
 * - FOR HER
 * - FOR HIM
 * - HAMHOLD
 * - THE HAMHOLD EDIT
 *
 * Re-triggerable: Resets when leaving viewport, replays blur wipe from 0% when entering again.
 */
export function BlurWipeText({ text, children, className = '' }) {
  const content = text || children;
  const containerRef = useRef(null);

  const [animKey, setAnimKey] = useState(0);
  const [animState, setAnimState] = useState(() =>
    checkReducedMotion() ? 'finished' : 'idle'
  );

  useEffect(() => {
    if (typeof window === 'undefined' || checkReducedMotion()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimKey((prev) => prev + 1);
            setAnimState('animating');
          } else {
            setAnimState('idle');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentEl = containerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
      observer.disconnect();
    };
  }, []);

  return (
    <span ref={containerRef} className={`inline-block relative ${className}`}>
      <span
        key={animKey}
        onAnimationEnd={() => setAnimState('finished')}
        className={
          animState === 'finished'
            ? 'inline-block'
            : animState === 'animating'
            ? 'animate-blur-wipe inline-block'
            : 'opacity-0 inline-block'
        }
      >
        {content}
      </span>
    </span>
  );
}

/**
 * 3. GHOST INTERLEAP TEXT EFFECT
 * Apply to:
 * - Signature Collection
 * - THE HAMHOLD COLLECTIONS
 * - DISCOVER YOUR SIGNATURE
 * - WHY HAMHOLD?
 * - JEWELLERY THAT HOLDS *A MOMENT.
 *
 * Re-triggerable: Resets when leaving viewport, replays convergence from 0% when entering again.
 */
export function GhostInterleapText({ text, children, className = '' }) {
  const content = text || children;
  const containerRef = useRef(null);

  const [animKey, setAnimKey] = useState(0);
  const [animState, setAnimState] = useState(() =>
    checkReducedMotion() ? 'finished' : 'idle'
  );

  useEffect(() => {
    if (typeof window === 'undefined' || checkReducedMotion()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimKey((prev) => prev + 1);
            setAnimState('animating');
          } else {
            setAnimState('idle');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentEl = containerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
      observer.disconnect();
    };
  }, []);

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Ghost Layer 1: subtle leading ghost converging from left/top */}
      {animState === 'animating' && (
        <span
          key={`ghost-1-${animKey}`}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none select-none animate-ghost-converge-1"
        >
          {content}
        </span>
      )}

      {/* Ghost Layer 2: subtle counter ghost converging from right/bottom */}
      {animState === 'animating' && (
        <span
          key={`ghost-2-${animKey}`}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none select-none animate-ghost-converge-2"
        >
          {content}
        </span>
      )}

      {/* Main Text: converges cleanly into position */}
      <span
        key={`main-${animKey}`}
        onAnimationEnd={() => setAnimState('finished')}
        className={
          animState === 'finished'
            ? 'inline-block'
            : animState === 'animating'
            ? 'animate-ghost-main inline-block'
            : 'opacity-0 inline-block'
        }
      >
        {content}
      </span>
    </span>
  );
}
