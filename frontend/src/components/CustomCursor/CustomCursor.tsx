import { useEffect, useState, useRef } from 'react';
import styles from './CustomCursor.module.css';

interface CustomCursorProps {
  enabled: boolean;
}

export default function CustomCursor({ enabled }: CustomCursorProps) {
  const [isMobile, setIsMobile] = useState(true);
  const [hovered, setHovered] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Detect mobile/tablet to disable custom cursor
    const checkDevice = () => {
      const mobileWidth = window.innerWidth <= 1024;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(mobileWidth || hasTouch);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (!enabled || isMobile) {
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], img, [data-tilt], [class*="card"], [class*="Card"]');
      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // LERP animation loop
    const animate = () => {
      // Smooth out ring transition using linear interpolation
      ringX.current += (mouseX.current - ringX.current) * 0.15;
      ringY.current += (mouseY.current - ringY.current) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX.current}px, ${mouseY.current}px, 0)`;
      }

      if (ringRef.current) {
        // 18px is half of 36px ring diameter to align perfectly on center
        const offset = hovered ? 26 : 18;
        ringRef.current.style.transform = `translate3d(${ringX.current - offset}px, ${ringY.current - offset}px, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-active');
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [enabled, isMobile, hovered]);

  if (!enabled || isMobile) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        className={`${styles.cursorDot} ${hovered ? styles.cursorDotHovered : ''}`} 
      />
      <div 
        ref={ringRef} 
        className={`${styles.cursorRing} ${hovered ? styles.cursorRingHovered : ''}`} 
      />
    </>
  );
}
