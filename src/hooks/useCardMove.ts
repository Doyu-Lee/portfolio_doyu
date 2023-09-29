import { useCallback, useLayoutEffect, useRef } from 'react';
import { useCheckMobile } from './useCheckMobile';

export const useCardMove = () => {
  const wrap = useRef<HTMLDivElement>(null);

  const xRef = useRef<number>(0);
  const yRef = useRef<number>(0);
  const mxRef = useRef<number>(0);
  const myRef = useRef<number>(0);

  const isMobile = useCheckMobile();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    xRef.current = e.clientX - window.innerWidth / 2;
    yRef.current = e.clientY - window.innerHeight / 2;
  }, []);

  const handleMobileMove = useCallback((e: DeviceOrientationEvent) => {
    if (e.gamma && e.beta) {
      xRef.current = e.gamma;
      yRef.current = e.beta;
    }
  }, []);

  const loop = useCallback(() => {
    mxRef.current += (xRef.current - mxRef.current) * 0.1;
    myRef.current += (yRef.current - myRef.current) * 0.1;

    if (wrap.current) {
      wrap.current.style.transform = `translate3d(-50%, -50%, 0) rotateX(${
        myRef.current / 10
      }deg) rotateY(${-mxRef.current / 10}deg)`;
    }

    window.requestAnimationFrame(loop);
  }, []);

  const loopMobile = useCallback(() => {
    mxRef.current += (xRef.current - mxRef.current) * 0.1;
    myRef.current += (yRef.current - myRef.current) * 0.1;
    if (wrap.current) {
      wrap.current.style.transform = `translate3d(-50%, -50%, 0) rotateX(${
        myRef.current - 50
      }deg) rotateY(${mxRef.current}deg)`;
    }
    window.requestAnimationFrame(loopMobile);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) {
      window.addEventListener('deviceorientation', handleMobileMove);
      loopMobile();

      return () => {
        window.removeEventListener('deviceorientation', handleMobileMove);
      };
    }
    window.addEventListener('mousemove', handleMouseMove);
    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile, loop, loopMobile, handleMouseMove, handleMobileMove]);

  return { wrap };
};
