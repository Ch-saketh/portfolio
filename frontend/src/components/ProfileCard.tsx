import React, { useEffect, useRef, useCallback, useMemo } from 'react';

/**
 * PROFILE CARD COMPONENT
 * Total Lines: ~400+
 * Includes: Full Tilt Engine, Gesture Logic, and Integrated Layout Fixes
 */

interface ProfileCardProps {
  avatarUrl: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
  link?: string;
}

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180,
} as const;

// --- UTILITIES ---
const clamp = (v: number, min = 0, max = 100): number => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3): number => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number): number =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl,
  iconUrl = '',
  grainUrl = '',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = '',
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = 'Chokkapu Saketh',
  title = 'Software Engineer',
  handle = 'ch-saketh',
  status = 'Online',
  contactText = 'Contact',
  showUserInfo = true,
  onContactClick,
  link,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  // --- TILT ENGINE LOGIC ---
  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--rotate-x': `${round(-(centerY / 6))}deg`, // Slightly reduced for smoother feel
        '--rotate-y': `${round(centerX / 6)}deg`,
      } as Record<string, string>;

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    return {
      setImmediate(x: number, y: number) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x: number, y: number) {
        targetX = x;
        targetY = y;
        if (!running) {
          running = true;
          lastTs = 0;
          rafId = requestAnimationFrame(step);
        }
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs: number) {
        initialUntil = performance.now() + durationMs;
        if (!running) {
          running = true;
          lastTs = 0;
          rafId = requestAnimationFrame(step);
        }
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      },
    };
  }, [enableTilt]);

  // --- EVENT HANDLERS ---
  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const rect = shell.getBoundingClientRect();
      tiltEngine.setTarget(event.clientX - rect.left, event.clientY - rect.top);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      shell.classList.add('active', 'entering');
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);
      handlePointerMove(event);
    },
    [tiltEngine, handlePointerMove]
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    tiltEngine.toCenter();
    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      if (Math.hypot(tx - x, ty - y) < 0.6) {
        shell.classList.remove('active');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;

    const pointerMoveHandler = handlePointerMove as EventListener;
    const pointerEnterHandler = handlePointerEnter as EventListener;
    const pointerLeaveHandler = handlePointerLeave as EventListener;

    shell.addEventListener('pointerenter', pointerEnterHandler);
    shell.addEventListener('pointermove', pointerMoveHandler);
    shell.addEventListener('pointerleave', pointerLeaveHandler);

    // Initial Animation
    tiltEngine.setImmediate(shell.clientWidth - 70, 60);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', pointerEnterHandler);
      shell.removeEventListener('pointermove', pointerMoveHandler);
      shell.removeEventListener('pointerleave', pointerLeaveHandler);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
    };
  }, [tiltEngine, handlePointerMove, handlePointerEnter, handlePointerLeave]);

  const cardStyle = useMemo(
    () =>
      ({
        '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
        '--behind-glow-color': behindGlowColor ?? 'rgba(125, 190, 255, 0.4)',
        '--behind-glow-size': behindGlowSize ?? '60%',
      }) as React.CSSProperties,
    [innerGradient, behindGlowColor, behindGlowSize]
  );

  const onContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (link) window.location.href = link;
    else onContactClick?.();
  };

  return (
    <>
      <style>{`
        .pc-card-wrapper {
          position: relative;
          perspective: 1000px;
          padding: 20px;
          display: inline-block;
        }
        .pc-behind {
          position: absolute;
          inset: 0;
          background: var(--behind-glow-color);
          filter: blur(80px);
          width: var(--behind-glow-size);
          height: var(--behind-glow-size);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 0;
          opacity: 0.5;
        }
        .pc-card-shell {
          position: relative;
          width: 360px;
          background: var(--inner-gradient);
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          overflow: hidden;
          z-index: 1;
          transform: rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg));
          transition: transform 0.15s ease-out;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .pc-inside {
          position: relative;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-sizing: border-box;
        }
        .pc-shine {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(255,255,255,0.2) 0%, transparent 60%);
          pointer-events: none;
        }
        .avatar-main {
          width: 100%;
          height: 320px;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .pc-details-box {
          text-align: center;
          color: white;
        }
        .pc-details-box h2 {
          margin: 0;
          font-size: 2rem;
          font-weight: 800;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .pc-details-box p {
          margin: 5px 0 0;
          opacity: 0.8;
          font-size: 1rem;
        }
        /* THE INNER BOX BAR FIX */
        .pc-user-info-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(15px);
          padding: 12px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 100%;
          box-sizing: border-box; /* CRITICAL FIX */
          margin-top: auto;
        }
        .pc-bar-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pc-mini-avatar {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .pc-bar-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .pc-handle {
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
        }
        .pc-status {
          color: #4ade80;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .pc-status::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #4ade80;
          border-radius: 50%;
          box-shadow: 0 0 8px #4ade80;
        }
        .pc-contact-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }
        .pc-contact-btn:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }
      `}</style>

      <div ref={wrapRef} className={`pc-card-wrapper ${className}`} style={cardStyle}>
        {behindGlowEnabled && <div className="pc-behind" />}
        
        <div ref={shellRef} className="pc-card-shell">
          <div className="pc-inside">
            <div className="pc-shine" />
            
            {/* Main Avatar */}
            <img src={avatarUrl} alt={name} className="avatar-main" />

            {/* Name & Title */}
            <div className="pc-details-box">
              <h2>{name}</h2>
              <p>{title}</p>
            </div>

            {/* Bottom Bar (Inner Box) */}
            {showUserInfo && (
              <div className="pc-user-info-bar">
                <div className="pc-bar-left">
                  <img 
                    src={miniAvatarUrl || avatarUrl} 
                    className="pc-mini-avatar" 
                    alt="mini" 
                  />
                  <div className="pc-bar-text">
                    <span className="pc-handle">@{handle}</span>
                    <span className="pc-status">{status}</span>
                  </div>
                </div>
                
                <button 
                  type="button" 
                  className="pc-contact-btn" 
                  onClick={onContact}
                >
                  {contactText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ProfileCard);