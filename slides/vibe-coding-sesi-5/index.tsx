import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { type CSSProperties, type ReactNode, useId, useState } from 'react';
import codepolitanLogo from '../../assets/Logo medium.png';

export const design: DesignSystem = {
  palette: { bg: '#FFFEFC', text: '#191919', accent: '#3CA5A1' },
  fonts: {
    display: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif',
  },
  typeScale: { hero: 118, body: 28 },
  radius: 24,
};

const SLIDE_ID = 'vibe-coding-sesi-5';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..800&family=Newsreader:ital,opsz,wght@1,6..72,400&family=JetBrains+Mono:wght@500;700&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;
const KEYFRAMES = `
@keyframes s5-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes s5-fade { from { opacity: 0 } to { opacity: 1 } }
.s5-interactive { transition: transform 0.18s cubic-bezier(0, 0, 0.2, 1), box-shadow 0.18s cubic-bezier(0, 0, 0.2, 1), background-color 0.18s ease; cursor: pointer; user-select: none; }
.s5-interactive:hover { transform: translateY(-2px); }
.s5-interactive:active { transform: translateY(0); }
`;

if (typeof document !== 'undefined') {
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (link.href !== FONT_HREF) link.href = FONT_HREF;

  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  if (style.textContent !== KEYFRAMES) style.textContent = KEYFRAMES;
}

const INK = 'var(--osd-text)';
const TEAL = 'var(--osd-accent)';
const INK_HEX = '#191919';
const TEAL_HEX = '#3CA5A1';
const CORAL_HEX = '#FF5F7C';
const BODY = '#5F5E5B';
const SOFT = '#8E8D8A';
const RULE = 'rgba(25,25,25,0.12)';
const SERIF = '"Newsreader", "Iowan Old Style", Georgia, serif';
const MONO = '"JetBrains Mono", monospace';

const YELLOW = '#F8DA7E';
const PINK = '#F6C3CF';
const GREEN = '#A6D4B2';
const HIGHLIGHT = '#FCE38A';
const HIGHLIGHT_TEAL = '#D4F2F0';
const HIGHLIGHT_PINK = '#FADDE4';

const TINT_YELLOW = '#FBF3DB';
const TINT_BLUE = '#E7F3F8';
const TINT_PINK = '#FAF1F5';
const TINT_GREEN = '#EDF3EC';
const TINT_TEAL = '#EBF7F6';
const TINT_NEUTRAL = '#F5F4F0';

const X0 = 120;
const W = 1680;

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const HOLD: Keyframe[] = [{ opacity: 1 }, { opacity: 1 }];

export const transition: SlideTransition = {
  duration: 240,
  exit: { duration: 240, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 240,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(5px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const abs = (left: number, top: number, width?: number, height?: number): CSSProperties => ({
  position: 'absolute',
  left,
  top,
  width,
  height,
  boxSizing: 'border-box',
});

const row: CSSProperties = { display: 'flex', alignItems: 'center' };

const root: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: INK,
  fontFamily: 'var(--osd-font-body)',
  fontVariantNumeric: 'tabular-nums',
  WebkitFontSmoothing: 'antialiased',
  overflow: 'hidden',
};

const headline = (size: number): CSSProperties => ({
  margin: 0,
  fontFamily: 'var(--osd-font-display)',
  fontSize: size,
  fontWeight: 780,
  lineHeight: 1.04,
  letterSpacing: size >= 90 ? '-0.038em' : '-0.028em',
  wordSpacing: '0.02em',
});

const Ink = ({
  width,
  height,
  viewBox,
  style,
  wobble = 2.0,
  children,
}: {
  width: number;
  height: number;
  viewBox?: string;
  style?: CSSProperties;
  wobble?: number;
  children: ReactNode;
}) => {
  const id = `s5${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg
      aria-hidden
      width={width}
      height={height}
      viewBox={viewBox ?? `0 0 ${width} ${height}`}
      fill="none"
      stroke={INK_HEX}
      strokeWidth={3.0}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block', overflow: 'visible', ...style }}
    >
      <defs>
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={5} />
          <feDisplacementMap in="SourceGraphic" scale={wobble} />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>{children}</g>
    </svg>
  );
};

const Stroke = ({
  d,
  live,
  delay = 0.25,
  dur = 0.65,
  color = INK_HEX,
  width = 3.0,
  fill = 'none',
}: {
  d: string;
  live: boolean;
  delay?: number;
  dur?: number;
  color?: string;
  width?: number;
  fill?: string;
}) => (
  <path
    d={d}
    pathLength={1}
    strokeDasharray={1}
    stroke={color}
    strokeWidth={width}
    fill={fill}
    style={{ animation: live ? `s5-draw ${dur}s ${EASE_OUT} ${delay}s both` : undefined }}
  />
);

const loopPath = (w: number, h: number) => {
  const p = (x: number, y: number) => `${((x * w) / 100).toFixed(1)} ${((y * h) / 100).toFixed(1)}`;
  return `M${p(30, 8)}C${p(55, 2)} ${p(90, 8)} ${p(96, 40)}C${p(100, 70)} ${p(72, 94)} ${p(42, 93)}C${p(14, 92)} ${p(2, 74)} ${p(4, 50)}C${p(6, 26)} ${p(26, 10)} ${p(56, 5)}`;
};

const CircleDoodle = ({
  x,
  y,
  w,
  h,
  color = CORAL_HEX,
  live,
  delay = 0.35,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
  live: boolean;
  delay?: number;
}) => (
  <Ink width={w} height={h} style={{ ...abs(x, y), pointerEvents: 'none' }} wobble={1.5}>
    <Stroke d={loopPath(w, h)} color={color} width={3.4} live={live} delay={delay} dur={0.75} />
  </Ink>
);

const UnderlineDoodle = ({
  x,
  y,
  w = 340,
  color = TEAL_HEX,
  live,
  delay = 0.4,
}: {
  x: number;
  y: number;
  w?: number;
  color?: string;
  live: boolean;
  delay?: number;
}) => (
  <Ink width={w} height={32} style={{ ...abs(x, y), pointerEvents: 'none' }}>
    <Stroke
      d={`M6 20C${w * 0.28} 10 ${w * 0.62} 26 ${w - 8} 14`}
      color={color}
      live={live}
      delay={delay}
      width={3.4}
    />
  </Ink>
);

const Sparkle = ({
  x,
  y,
  s = 1,
  fill = YELLOW,
}: {
  x: number;
  y: number;
  s?: number;
  fill?: string;
}) => (
  <path
    transform={`translate(${x} ${y}) scale(${s})`}
    d="M0 -20Q3 -3 20 0Q3 3 0 20Q-3 3 -20 0Q-3 -3 0 -20Z"
    fill={fill}
    strokeWidth={3 / s}
  />
);

const Highlight = ({ children, color = HIGHLIGHT }: { children: ReactNode; color?: string }) => (
  <span
    style={{
      background: color,
      borderRadius: '6px 12px 8px 14px',
      padding: '0 8px',
      margin: '0 -2px',
      color: INK,
      WebkitBoxDecorationBreak: 'clone',
      boxDecorationBreak: 'clone',
    }}
  >
    {children}
  </span>
);

const CodepolitanLogo = ({ height = 24 }: { height?: number }) => (
  <img
    src={codepolitanLogo}
    alt="CODEPOLITAN"
    style={{
      height,
      width: 'auto',
      display: 'block',
      objectFit: 'contain',
    }}
  />
);

const pad2 = (n: number) => String(n).padStart(2, '0');

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        ...abs(X0, 1004, W, 32),
        ...row,
        justifyContent: 'space-between',
        fontSize: 20,
        color: SOFT,
      }}
    >
      <span style={{ ...row, gap: 14 }}>
        <CodepolitanLogo height={22} />
        <span style={{ color: RULE }}>·</span>
        <span>Vibe Coding Bootcamp · Batch 4 · Sesi 5</span>
      </span>
      <span style={{ fontFamily: MONO, fontSize: 18 }}>
        {pad2(current)} / {pad2(total)}
      </span>
    </div>
  );
};

const Frame = ({
  children,
  hideFooter = false,
}: {
  children: ReactNode;
  hideFooter?: boolean;
}) => (
  <div data-osd-interactive="true" style={root}>
    {children}
    {!hideFooter && <Footer />}
  </div>
);

const Eyebrow = ({
  children,
  top = 86,
  color = TEAL,
}: {
  children: ReactNode;
  top?: number;
  color?: string;
}) => (
  <div
    style={{
      ...abs(X0, top),
      fontSize: 23,
      fontWeight: 700,
      color,
      letterSpacing: '-0.01em',
    }}
  >
    {children}
  </div>
);

const CheckMark = ({ color = TEAL_HEX, size = 26 }: { color?: string; size?: number }) => (
  <Ink width={size} height={size} viewBox="0 0 30 30" wobble={1.3}>
    <path d="M5 16L12 23L26 6" stroke={color} strokeWidth={3.6} />
  </Ink>
);

const TallyBox = ({ x, accent = false }: { x: number; accent?: boolean }) => (
  <g transform={`translate(${x} 0)`}>
    <rect
      x="2"
      y="2"
      width="44"
      height="44"
      rx="8"
      fill={accent ? TINT_TEAL : TINT_GREEN}
      strokeWidth={2.6}
    />
    <path d="M12 24L21 33L36 14" stroke={accent ? TEAL_HEX : INK_HEX} strokeWidth={3.2} />
  </g>
);

/* ============================================================================ */
/* SLIDE 01 — COVER                                                             */
/* ============================================================================ */

const CoverAIProductArt = () => (
  <Ink width={780} height={760} style={abs(1020, 110)}>
    <ellipse cx="400" cy="360" rx="350" ry="310" fill={TINT_TEAL} stroke="none" />
    <circle cx="650" cy="140" r="82" fill={YELLOW} stroke="none" />
    <circle cx="90" cy="560" r="74" fill={TINT_PINK} stroke="none" />

    {/* 1. UrbanStore Main Window + Floating Chat Widget */}
    <g transform="translate(30, 44)">
      <rect x="0" y="0" width="560" height="334" rx="16" fill="#FFFFFF" />
      <path d="M0 44H560" />
      <circle cx="24" cy="22" r="5" fill={CORAL_HEX} stroke="none" />
      <circle cx="42" cy="22" r="5" fill={YELLOW} stroke="none" />
      <circle cx="60" cy="22" r="5" fill={GREEN} stroke="none" />
      <rect x="88" y="10" width="210" height="24" rx="6" fill={TINT_NEUTRAL} />
      <path d="M104 22h130" strokeWidth={2.4} />
      <rect x="316" y="10" width="124" height="24" rx="12" fill={TINT_TEAL} stroke="none" />
      <circle cx="332" cy="22" r="4" fill={TEAL_HEX} stroke="none" />
      <path d="M344 22h80" stroke={TEAL_HEX} strokeWidth={2.2} />

      {/* Storefront Catalog Mini Preview (Left) */}
      <rect x="20" y="62" width="250" height="252" rx="12" fill={TINT_NEUTRAL} />
      <rect x="34" y="76" width="104" height="106" rx="8" fill="#FFFFFF" />
      <path d="M68 104l18-14 18 14-5 44H73z" fill={TINT_TEAL} strokeWidth={2.2} />
      <rect x="150" y="76" width="104" height="106" rx="8" fill="#FFFFFF" />
      <path d="M184 102l18-12 18 12-4 46h-28z" fill={TINT_YELLOW} strokeWidth={2.2} />
      <path d="M34 202h90m26 0h90" strokeWidth={2.6} />
      <path d="M34 220h60m56 0h60" stroke={CORAL_HEX} strokeWidth={2.6} />
      <rect x="34" y="244" width="220" height="54" rx="10" fill="#FFFFFF" />
      <path d="M52 264h110m-110 16h160" strokeWidth={2.2} />

      {/* Floating Chat Asisten CS Overlay (Right) */}
      <rect x="288" y="62" width="254" height="252" rx="14" fill="#FFFFFF" strokeWidth={2.6} />
      <rect x="288" y="62" width="254" height="42" rx="14" fill={TEAL_HEX} stroke="none" />
      <circle cx="312" cy="83" r="10" fill="#FFFFFF" stroke="none" />
      <path d="M332 83h120" stroke="#FFFFFF" strokeWidth={2.6} />

      {/* User BB/TB Query Bubble */}
      <rect x="338" y="118" width="190" height="44" rx="10" fill={TINT_YELLOW} />
      <path d="M352 134h140m-140 14h100" strokeWidth={2.2} />

      {/* AI CS Reply: Stok + Size L + Mix & Match */}
      <rect x="304" y="174" width="204" height="72" rx="10" fill={TINT_TEAL} />
      <path d="M320 192h150m-150 16h170m-170 16h120" strokeWidth={2.2} />

      {/* Floating Chat Input */}
      <rect x="304" y="260" width="174" height="36" rx="8" fill={TINT_NEUTRAL} />
      <path d="M320 278h110" strokeWidth={2.0} />
      <circle cx="508" cy="278" r="18" fill={CORAL_HEX} stroke="none" />
      <path d="M502 278h12m-5-5l5 5-5 5" stroke="#FFFFFF" strokeWidth={2.4} />
    </g>

    {/* 2. Connector Pipes to Gemini API / 9Router */}
    <path d="M180 378v86" strokeDasharray="6 4" stroke={TEAL_HEX} strokeWidth={3.0} />
    <polygon points="174,464 186,464 180,476" fill={TEAL_HEX} stroke="none" />
    <rect x="108" y="408" width="144" height="26" rx="13" fill="#FFFFFF" strokeWidth={2.0} />
    <circle cx="122" cy="421" r="4" fill={TEAL_HEX} stroke="none" />
    <path d="M134 421h100" strokeWidth={2.2} />

    <path d="M460 378c0 42 80 32 80 86" strokeDasharray="6 4" stroke={INK_HEX} strokeWidth={3.0} />
    <polygon points="534,464 546,464 540,476" fill={INK_HEX} stroke="none" />
    <rect x="424" y="406" width="150" height="26" rx="13" fill="#FFFFFF" strokeWidth={2.2} />
    <circle cx="438" cy="419" r="4" fill={CORAL_HEX} stroke="none" />
    <path d="M450 419h106" strokeWidth={2.2} />

    {/* 3. Admin Sales Strategy Doc (Bottom Left) */}
    <g transform="translate(30, 484)">
      <rect x="0" y="0" width="320" height="220" rx="16" fill="#FFFFFF" />
      <rect x="0" y="0" width="320" height="44" rx="16" fill={TINT_YELLOW} />
      <path d="M0 44h320" />
      <circle cx="26" cy="22" r="8" fill={YELLOW} />
      <path d="M46 22h140" strokeWidth={2.8} />

      {/* Mini Bar Chart + Strategy Bullets */}
      <rect x="26" y="66" width="26" height="62" rx="4" fill={TINT_TEAL} />
      <rect x="64" y="84" width="26" height="44" rx="4" fill={TINT_BLUE} />
      <rect x="102" y="58" width="26" height="70" rx="4" fill={TEAL_HEX} stroke="none" />
      <path d="M150 72h140m-140 20h120m-140 20h136" strokeWidth={2.4} />
      <rect x="24" y="148" width="272" height="52" rx="10" fill={TINT_PINK} />
      <circle cx="44" cy="174" r="7" fill={CORAL_HEX} stroke="none" />
      <path d="M64 166h196m-196 16h150" strokeWidth={2.4} />
    </g>

    {/* 4. Gemini + 9Router Hub (Bottom Right) */}
    <g transform="translate(390, 484)">
      <rect x="10" y="0" width="310" height="220" rx="18" fill={INK_HEX} />
      <rect x="34" y="24" width="262" height="48" rx="10" fill={TEAL_HEX} stroke="none" />
      <path d="M56 48h160" stroke="#FFFFFF" strokeWidth={3.0} />
      <circle cx="268" cy="48" r="10" fill={YELLOW} stroke="none" />

      <rect x="34" y="92" width="122" height="48" rx="10" fill="#FFFFFF" stroke="none" />
      <path d="M52 116h86" stroke={INK_HEX} strokeWidth={2.6} />
      <rect x="174" y="92" width="122" height="48" rx="10" fill={TINT_YELLOW} stroke="none" />
      <path d="M192 116h86" stroke={INK_HEX} strokeWidth={2.6} />

      <rect x="34" y="156" width="262" height="42" rx="10" fill="rgba(255,255,255,0.12)" stroke="#FFFFFF" strokeWidth={1.8} />
      <path d="M54 177h180" stroke="#7CE8E4" strokeWidth={2.6} />
    </g>

    <Sparkle x={12} y={120} s={0.9} fill={TEAL_HEX} />
    <Sparkle x={630} y={40} s={1.15} fill={YELLOW} />
    <Sparkle x={718} y={430} s={0.85} fill={PINK} />
    <Sparkle x={346} y={462} s={0.95} fill={TEAL_HEX} />
  </Ink>
);

const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <Frame hideFooter>
      <div style={{ ...abs(X0, 96), ...row, gap: 16 }}>
        <CodepolitanLogo height={40} />
        <span
          style={{
            marginLeft: 6,
            padding: '6px 18px',
            borderRadius: 99,
            background: TINT_TEAL,
            color: TEAL_HEX,
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          VIBE CODING BOOTCAMP · BATCH 4 · SESI 5
        </span>
      </div>

      <h1 style={{ ...abs(X0, 206, 880), ...headline(98) }}>
        AI Feature
        <br />
        Integration.
      </h1>

      <p
        style={{
          ...abs(X0, 464, 860),
          margin: 0,
          fontSize: 36,
          fontFamily: SERIF,
          fontStyle: 'italic',
          lineHeight: 1.35,
          color: INK,
        }}
      >
        From <Highlight color={HIGHLIGHT_TEAL}>Functional App</Highlight> to{' '}
        <Highlight>Intelligent Product</Highlight>
      </p>

      <p
        style={{
          ...abs(X0, 552, 830),
          margin: 0,
          fontSize: 24,
          lineHeight: 1.52,
          color: BODY,
        }}
      >
        Meningkatkan <strong style={{ color: INK }}>UrbanStore Web App</strong> dengan{' '}
        <strong style={{ color: INK }}>Gemini API (Google AI Studio)</strong>: Floating Chat CS
        untuk Customer serta AI Deskripsi Produk &amp; Dokumen Analisis Penjualan untuk Admin —
        lengkap dengan <strong style={{ color: INK }}>9Router</strong> &amp;{' '}
        <strong style={{ color: INK }}>Cost Optimization</strong>.
      </p>

      <div style={{ ...abs(X0, 756), ...row, gap: 12 }}>
        <span
          style={{
            padding: '9px 18px',
            borderRadius: 99,
            background: TINT_TEAL,
            fontSize: 18,
            fontWeight: 720,
            color: TEAL_HEX,
          }}
        >
          01 · Floating Chat CS
        </span>
        <span
          style={{
            padding: '9px 18px',
            borderRadius: 99,
            background: TINT_YELLOW,
            fontSize: 18,
            fontWeight: 720,
            color: '#946200',
          }}
        >
          02 · Admin AI Strategist
        </span>
        <span
          style={{
            padding: '9px 18px',
            borderRadius: 99,
            background: TINT_PINK,
            fontSize: 18,
            fontWeight: 720,
            color: CORAL_HEX,
          }}
        >
          Gemini + 9Router
        </span>
      </div>

      <div style={{ ...abs(X0, 880), fontSize: 21, fontWeight: 650, color: SOFT }}>
        by CODEPOLITAN
      </div>

      <CoverAIProductArt />
      <CircleDoodle x={102} y={306} w={620} h={134} color={CORAL_HEX} live={live} delay={0.4} />
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 02 — LEARNING OBJECTIVES                                               */
/* ============================================================================ */

const ObjectiveRow = ({
  top,
  code,
  text,
  tag,
  accent = false,
  active = false,
  onClick,
}: {
  top: number;
  code: string;
  text: string;
  tag: string;
  accent?: boolean;
  active?: boolean;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className="s5-interactive"
    style={{
      ...abs(760, top, 1040, 106),
      borderTop: `1.5px solid ${RULE}`,
      background: active ? TINT_TEAL : 'transparent',
      borderRadius: active ? 14 : 0,
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ ...row, gap: 22, maxWidth: 740 }}>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 32,
          fontWeight: 780,
          color: accent ? CORAL_HEX : TEAL_HEX,
          minWidth: 48,
        }}
      >
        {code}
      </span>
      <span
        style={{
          fontSize: 23,
          fontWeight: active ? 720 : 620,
          color: INK,
          lineHeight: 1.32,
        }}
      >
        {text}
      </span>
    </div>
    <div
      style={{
        ...row,
        gap: 10,
        fontSize: 20,
        fontWeight: 700,
        color: accent ? CORAL_HEX : BODY,
        whiteSpace: 'nowrap',
      }}
    >
      <CheckMark color={accent ? CORAL_HEX : TEAL_HEX} size={24} />
      <span>{tag}</span>
    </div>
  </div>
);

const Slide02Objectives: Page = () => {
  const live = useIsActivePage();
  const [selected, setSelected] = useState(2);

  return (
    <Frame>
      <Eyebrow>Learning Objectives</Eyebrow>
      <h2 style={{ ...abs(X0, 134, 580), ...headline(74) }}>
        Setelah sesi ini
        <br />
        kamu mampu...
      </h2>

      <p
        style={{
          ...abs(X0, 314, 560),
          margin: 0,
          fontSize: 22,
          lineHeight: 1.46,
          color: BODY,
        }}
      >
        Hari ini aplikasi <strong style={{ color: INK }}>UrbanStore</strong> naik level menjadi{' '}
        <Highlight color={HIGHLIGHT_TEAL}>intelligent product</Highlight> di sisi Pembeli maupun
        Penjual.
      </p>

      <Ink width={420} height={50} style={abs(X0, 412)}>
        <TallyBox x={0} />
        <TallyBox x={56} />
        <TallyBox x={112} accent />
        <TallyBox x={168} />
        <TallyBox x={224} accent />
        <TallyBox x={280} />
        <TallyBox x={336} />
      </Ink>

      <div style={{ ...abs(X0, 484, 580), fontSize: 19, fontWeight: 780, color: INK }}>
        DUA SISI FITUR AI URBANSTORE
      </div>

      <div
        style={{
          ...abs(X0, 520, 580, 190),
          borderRadius: 22,
          background: TINT_TEAL,
          border: `2px solid ${TEAL_HEX}`,
          padding: '20px 26px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 760, color: TEAL_HEX }}>
            01 · SISI CUSTOMER
          </span>
          <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 700, color: INK }}>
            Floating Chat CS
          </span>
        </div>
        <div>
          <div style={{ ...headline(28), marginBottom: 6 }}>Asisten Belanja Real-time</div>
          <div style={{ fontSize: 19, lineHeight: 1.38, color: BODY }}>
            Tanya stok, konsultasi ukuran BB &amp; TB, dan rekomendasi mix &amp; match produk katalog.
          </div>
        </div>
      </div>

      <div
        style={{
          ...abs(X0, 730, 580, 190),
          borderRadius: 22,
          background: TINT_YELLOW,
          border: `2px solid #E2B93B`,
          padding: '20px 26px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 760, color: '#946200' }}>
            02 · SISI STORE ADMIN
          </span>
          <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 700, color: CORAL_HEX }}>
            AI Business Tools
          </span>
        </div>
        <div>
          <div style={{ ...headline(28), marginBottom: 6 }}>Deskripsi &amp; Strategi Penjualan</div>
          <div style={{ fontSize: 19, lineHeight: 1.38, color: BODY }}>
            Generate deskripsi produk otomatis &amp; dokumen analisis strategi penjualan ke depan.
          </div>
        </div>
      </div>

      <ObjectiveRow
        top={146}
        code="01"
        text="Memahami cara kerja LLM modern (Input → Prompt → Model → Output)."
        tag="LLM Core"
        active={selected === 0}
        onClick={() => setSelected(0)}
      />
      <ObjectiveRow
        top={254}
        code="02"
        text="Ambil Gemini API Key dari Google AI Studio & integrasikan aman di Backend."
        tag="Gemini API"
        active={selected === 1}
        onClick={() => setSelected(1)}
      />
      <ObjectiveRow
        top={362}
        code="03"
        text="Membangun Floating Chat CS Customer (stok, BB/TB, mix & match)."
        tag="Customer AI"
        accent
        active={selected === 2}
        onClick={() => setSelected(2)}
      />
      <ObjectiveRow
        top={470}
        code="04"
        text="Membangun Admin AI: Generate Deskripsi & Dokumen Analisis Penjualan."
        tag="Admin AI"
        active={selected === 3}
        onClick={() => setSelected(3)}
      />
      <ObjectiveRow
        top={578}
        code="05"
        text="Mendesain AI UX (streaming, skeleton, quick prompt, retry, error state)."
        tag="AI UX"
        accent
        active={selected === 4}
        onClick={() => setSelected(4)}
      />
      <ObjectiveRow
        top={686}
        code="06"
        text="Menggunakan AI Skill untuk audit keamanan, bug, dan anti-hallucination."
        tag="Skill Audit"
        active={selected === 5}
        onClick={() => setSelected(5)}
      />
      <ObjectiveRow
        top={794}
        code="07"
        text="Menggunakan 9Router & menerapkan AI Cost Optimization."
        tag="9Router & Cost"
        active={selected === 6}
        onClick={() => setSelected(6)}
      />
      <div style={{ ...abs(760, 902, 1040), borderTop: `1.5px solid ${RULE}` }} />
      <UnderlineDoodle x={X0} y={282} w={340} color={TEAL_HEX} live={live} />
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 03 — STUDI KASUS DUA SISI AI URBANSTORE                                */
/* ============================================================================ */

const FeatureLineCard = ({
  code,
  title,
  desc,
  accentColor,
}: {
  code: string;
  title: string;
  desc: string;
  accentColor: string;
}) => (
  <div
    style={{
      ...row,
      gap: 14,
      background: '#FFFFFF',
      padding: '13px 18px',
      borderRadius: 12,
      fontSize: 20,
      color: INK,
    }}
  >
    <span
      style={{
        fontFamily: MONO,
        fontSize: 17,
        fontWeight: 780,
        color: accentColor,
        minWidth: 34,
      }}
    >
      {code}
    </span>
    <div>
      <strong style={{ fontWeight: 730 }}>{title}:</strong>{' '}
      <span style={{ color: BODY, fontWeight: 540 }}>{desc}</span>
    </div>
  </div>
);

const Slide03TwoSidedStudyCase: Page = () => {
  const [focusRole, setFocusRole] = useState<'both' | 'customer' | 'admin'>('both');

  return (
    <Frame>
      <Eyebrow>Studi Kasus · Dua Sisi Fitur AI di UrbanStore</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(46) }}>
        Melengkapi <Highlight color={HIGHLIGHT_TEAL}>Customer</Highlight> dan{' '}
        <Highlight>Store Admin</Highlight> dari Sesi 4 dengan kecerdasan AI.
      </h2>

      <div
        onClick={() => setFocusRole(focusRole === 'customer' ? 'both' : 'customer')}
        className="s5-interactive"
        style={{
          ...abs(X0, 224, 816, 560),
          borderRadius: 26,
          background: TINT_TEAL,
          border: `2.5px solid ${focusRole === 'customer' ? INK_HEX : TEAL_HEX}`,
          opacity: focusRole === 'admin' ? 0.55 : 1,
          padding: '26px 30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
              01 · SISI CUSTOMER (PEMBELI)
            </span>
            <span
              style={{
                padding: '5px 14px',
                borderRadius: 99,
                background: '#FFFFFF',
                fontFamily: MONO,
                fontSize: 16,
                fontWeight: 700,
                color: INK,
              }}
            >
              Floating Chat Widget
            </span>
          </div>

          <h3 style={{ ...headline(34), marginBottom: 8 }}>Floating Chat Asisten CS</h3>
          <p style={{ margin: '0 0 16px', fontSize: 20, lineHeight: 1.4, color: BODY }}>
            Membantu pembeli langsung di etalase sebelum memasukkan barang ke keranjang:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <FeatureLineCard
              code="C1"
              title="Tanya Ketersediaan Stok"
              desc="Menjawab stok & varian ukuran produk nyata yang diinput Admin."
              accentColor={TEAL_HEX}
            />
            <FeatureLineCard
              code="C2"
              title="Konsultasi Ukuran (BB & TB)"
              desc="Saran ukuran S/M/L/XL sesuai berat badan & tinggi badan pembeli."
              accentColor={TEAL_HEX}
            />
            <FeatureLineCard
              code="C3"
              title="Rekomendasi Mix & Match"
              desc="Padu padan pakaian berdasarkan produk yang dimiliki katalog toko."
              accentColor={TEAL_HEX}
            />
          </div>
        </div>

        <div
          style={{
            borderRadius: 12,
            background: '#FFFFFF',
            padding: '11px 16px',
            fontFamily: MONO,
            fontSize: 16,
            color: INK,
          }}
        >
          Alur: Chat Customer + Katalog Aktif ➔ Gemini ➔ Stok / Size / Mix &amp; Match ➔ Cart
        </div>
      </div>

      <div
        onClick={() => setFocusRole(focusRole === 'admin' ? 'both' : 'admin')}
        className="s5-interactive"
        style={{
          ...abs(984, 224, 816, 560),
          borderRadius: 26,
          background: TINT_YELLOW,
          border: `2.5px solid ${focusRole === 'admin' ? INK_HEX : '#E2B93B'}`,
          opacity: focusRole === 'customer' ? 0.55 : 1,
          padding: '26px 30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: '#946200' }}>
              02 · SISI STORE ADMIN (PENJUAL)
            </span>
            <span
              style={{
                padding: '5px 14px',
                borderRadius: 99,
                background: INK_HEX,
                fontFamily: MONO,
                fontSize: 16,
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              Dashboard /admin
            </span>
          </div>

          <h3 style={{ ...headline(34), marginBottom: 8 }}>AI Business &amp; Catalog Tools</h3>
          <p style={{ margin: '0 0 16px', fontSize: 20, lineHeight: 1.4, color: BODY }}>
            Mempercepat pengelolaan etalase dan membantu pemilik toko mengambil keputusan:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <FeatureLineCard
              code="A1"
              title="Generate Deskripsi Produk"
              desc="Otomatis buat deskripsi dari nama produk, kategori, harga, & ukuran."
              accentColor={CORAL_HEX}
            />
            <FeatureLineCard
              code="A2"
              title="AI Analisis Penjualan"
              desc="Mengolah data order & omzet dari Sesi 4 menjadi ringkasan insight."
              accentColor={CORAL_HEX}
            />
            <FeatureLineCard
              code="A3"
              title="Dokumen Strategi Kedepan"
              desc="Output dokumen rekomendasi promo, bundling, & prioritas restock."
              accentColor={CORAL_HEX}
            />
          </div>
        </div>

        <div
          style={{
            borderRadius: 12,
            background: '#FFFFFF',
            padding: '11px 16px',
            fontFamily: MONO,
            fontSize: 16,
            color: INK,
          }}
        >
          Alur: Data Order / Input Produk ➔ Gemini ➔ Dokumen Strategi / Deskripsi ➔ Simpan
        </div>
      </div>

      <div
        style={{
          ...abs(X0, 810, W, 134),
          borderRadius: 22,
          background: INK_HEX,
          color: '#FFFFFF',
          padding: '22px 34px',
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ maxWidth: 1320 }}>
          <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: YELLOW, marginBottom: 4 }}>
            INSIGHT ARSITEKTUR
          </div>
          <div style={{ fontSize: 22, lineHeight: 1.4, color: '#F5F4F0' }}>
            AI bekerja di atas <strong style={{ color: '#7CE8E4' }}>data nyata UrbanStore</strong>{' '}
            (katalog produk &amp; riwayat pesanan Sesi 4). Validasi stok, penyimpanan produk, dan
            keputusan bisnis tetap berada di tangan aplikasi &amp; Admin.
          </div>
        </div>
        <span
          style={{
            padding: '10px 20px',
            borderRadius: 12,
            background: 'rgba(255,255,255,0.1)',
            fontFamily: MONO,
            fontSize: 17,
            fontWeight: 700,
            color: '#7CE8E4',
            whiteSpace: 'nowrap',
          }}
        >
          PRD Sesi 2 ➔ Live!
        </span>
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 04 — CARA KERJA AI                                                     */
/* ============================================================================ */

const PipelineNode = ({
  step,
  title,
  subtitle,
  bg,
  border,
  accent,
}: {
  step: string;
  title: string;
  subtitle: string;
  bg: string;
  border: string;
  accent: string;
}) => (
  <div
    style={{
      flex: 1,
      borderRadius: 20,
      background: bg,
      border: `2.5px solid ${border}`,
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 152,
    }}
  >
    <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: accent }}>{step}</div>
    <div>
      <div style={{ ...headline(32), marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 18, color: BODY, lineHeight: 1.3 }}>{subtitle}</div>
    </div>
  </div>
);

const Slide04HowAIWorks: Page = () => {
  const [caseTab, setCaseTab] = useState<'customer' | 'admin'>('customer');

  return (
    <Frame>
      <Eyebrow>Cara Kerja AI · Pola Dasar LLM</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        Semua Large Language Model bekerja dengan{' '}
        <Highlight color={HIGHLIGHT_TEAL}>pola yang sama</Highlight>.
      </h2>

      {/* Top 4-Stage Pipeline */}
      <div style={{ ...abs(X0, 224, W, 152), ...row, gap: 18 }}>
        <PipelineNode
          step="01 · INPUT"
          title="Input + Data"
          subtitle="Pertanyaan user / data order + katalog"
          bg={TINT_NEUTRAL}
          border={INK_HEX}
          accent={INK_HEX}
        />
        <span style={{ fontSize: 34, fontWeight: 800, color: TEAL_HEX }}>→</span>
        <PipelineNode
          step="02 · PROMPT"
          title="Instruksi"
          subtitle="Peran AI, batasan fakta, & format"
          bg={TINT_YELLOW}
          border="#E2B93B"
          accent="#946200"
        />
        <span style={{ fontSize: 34, fontWeight: 800, color: TEAL_HEX }}>→</span>
        <PipelineNode
          step="03 · MODEL"
          title="Gemini LLM"
          subtitle="Memproses konteks & menghasilkan teks"
          bg={TINT_TEAL}
          border={TEAL_HEX}
          accent={TEAL_HEX}
        />
        <span style={{ fontSize: 34, fontWeight: 800, color: TEAL_HEX }}>→</span>
        <PipelineNode
          step="04 · OUTPUT"
          title="Hasil Siap Pakai"
          subtitle="Jawaban CS / Dokumen / Deskripsi"
          bg={TINT_PINK}
          border={CORAL_HEX}
          accent={CORAL_HEX}
        />
      </div>

      {/* Tab Switcher */}
      <div style={{ ...abs(X0, 410, W, 56), ...row, justifyContent: 'space-between' }}>
        <div style={{ ...row, gap: 12 }}>
          <button
            type="button"
            onClick={() => setCaseTab('customer')}
            className="s5-interactive"
            style={{
              padding: '12px 24px',
              borderRadius: 12,
              border: `2px solid ${caseTab === 'customer' ? TEAL_HEX : RULE}`,
              background: caseTab === 'customer' ? TEAL_HEX : '#FFFFFF',
              color: caseTab === 'customer' ? '#FFFFFF' : INK,
              fontSize: 19,
              fontWeight: 740,
            }}
          >
            Contoh 1 · Floating Chat CS (Customer)
          </button>
          <button
            type="button"
            onClick={() => setCaseTab('admin')}
            className="s5-interactive"
            style={{
              padding: '12px 24px',
              borderRadius: 12,
              border: `2px solid ${caseTab === 'admin' ? INK_HEX : RULE}`,
              background: caseTab === 'admin' ? INK_HEX : '#FFFFFF',
              color: caseTab === 'admin' ? '#FFFFFF' : INK,
              fontSize: 19,
              fontWeight: 740,
            }}
          >
            Contoh 2 · Analisis Penjualan &amp; Deskripsi (Admin)
          </button>
        </div>
        <span style={{ fontFamily: MONO, fontSize: 17, color: SOFT }}>
          Klik tab untuk melihat contoh penerapan di UrbanStore
        </span>
      </div>

      {/* Concrete Comparison Panel */}
      {caseTab === 'customer' ? (
        <div
          style={{
            ...abs(X0, 488, W, 336),
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 22,
          }}
        >
          <div
            style={{
              borderRadius: 22,
              background: TINT_NEUTRAL,
              border: `2px solid ${RULE}`,
              padding: '24px 28px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: BODY, marginBottom: 10 }}>
              INPUT CUSTOMER + KONTEKS
            </div>
            <div style={{ fontSize: 21, fontWeight: 680, color: INK, lineHeight: 1.42, marginBottom: 14 }}>
              “TB 170 cm, BB 65 kg. Oversized Tee masih ada stok? Cocok size apa &amp; bagusnya di-mix sama apa?”
            </div>
            <div
              style={{
                borderRadius: 12,
                background: '#FFFFFF',
                padding: '12px 16px',
                fontFamily: MONO,
                fontSize: 15,
                color: BODY,
              }}
            >
              + Ringkasan Katalog Aktif (Nama, Harga, Stok, Varian S–XL)
            </div>
          </div>

          <div
            style={{
              borderRadius: 22,
              background: TINT_YELLOW,
              border: `2px solid #E2B93B`,
              padding: '24px 28px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: '#946200', marginBottom: 10 }}>
              SYSTEM PROMPT KE GEMINI
            </div>
            <div style={{ fontSize: 20, lineHeight: 1.48, color: INK }}>
              Berperan sebagai CS &amp; Stylist UrbanStore. Jawab ramah, hitung rekomendasi size dari
              BB/TB, dan <strong>dilarang mengarang produk atau stok</strong> di luar data katalog
              yang diberikan.
            </div>
          </div>

          <div
            style={{
              borderRadius: 22,
              background: TINT_TEAL,
              border: `2px solid ${TEAL_HEX}`,
              padding: '24px 28px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX, marginBottom: 10 }}>
              OUTPUT KE FLOATING CHAT
            </div>
            <div style={{ fontSize: 20, lineHeight: 1.48, color: INK }}>
              “Stok <strong>Urban Oversized Tee</strong> ready! Untuk TB 170 cm / BB 65 kg pas pakai{' '}
              <strong>Size L</strong>. Biar makin keren, coba mix dengan{' '}
              <strong>Cargo Pants Olive (Rp 249.000)</strong> yang tersedia di katalog!”
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            ...abs(X0, 488, W, 336),
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 22,
          }}
        >
          <div
            style={{
              borderRadius: 22,
              background: TINT_NEUTRAL,
              border: `2px solid ${RULE}`,
              padding: '24px 28px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: BODY, marginBottom: 10 }}>
              INPUT ADMIN (SESI 4)
            </div>
            <div style={{ fontSize: 20, fontWeight: 680, color: INK, lineHeight: 1.42, marginBottom: 12 }}>
              1) Ringkasan Order &amp; Omzet (total pesanan, produk terlaris, kategori, stok menipis).
            </div>
            <div style={{ fontSize: 20, fontWeight: 680, color: INK, lineHeight: 1.42 }}>
              2) Form Produk Baru (Nama: Boxy Hoodie, Kategori: Outerwear, Bahan: Fleece).
            </div>
          </div>

          <div
            style={{
              borderRadius: 22,
              background: TINT_YELLOW,
              border: `2px solid #E2B93B`,
              padding: '24px 28px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: '#946200', marginBottom: 10 }}>
              SYSTEM PROMPT KE GEMINI
            </div>
            <div style={{ fontSize: 20, lineHeight: 1.48, color: INK }}>
              Susun <strong>Dokumen Analisis Penjualan</strong> terstruktur berisi evaluasi produk &amp;
              rekomendasi strategi promo/restock. Untuk form produk, tulis deskripsi fashion singkat &amp;
              persuasif.
            </div>
          </div>

          <div
            style={{
              borderRadius: 22,
              background: TINT_PINK,
              border: `2px solid ${CORAL_HEX}`,
              padding: '24px 28px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: CORAL_HEX, marginBottom: 10 }}>
              OUTPUT KE ADMIN DASHBOARD
            </div>
            <div style={{ fontSize: 20, lineHeight: 1.48, color: INK }}>
              Dokumen laporan siap baca (Ringkasan Performa, Top Item, &amp; 3 Aksi Strategi Penjualan) +
              teks deskripsi produk yang langsung mengisi textarea form Admin!
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          ...abs(X0, 846, W, 96),
          borderRadius: 18,
          background: INK_HEX,
          color: '#FFFFFF',
          padding: '18px 32px',
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 650 }}>
          <strong style={{ color: YELLOW }}>Prinsip Utama:</strong> Semakin akurat Input (data nyata
          UrbanStore) dan semakin spesifik Prompt, semakin tepat guna Output AI.
        </span>
        <span style={{ fontFamily: MONO, fontSize: 17, color: '#7CE8E4' }}>Garbage In = Garbage Out</span>
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 05 — MENGHUBUNGKAN AI KE APLIKASI (GOOGLE AI STUDIO & BACKEND)         */
/* ============================================================================ */

const SetupStepCard = ({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) => (
  <div
    style={{
      borderRadius: 16,
      background: '#FFFFFF',
      border: `1.5px solid ${RULE}`,
      padding: '16px 22px',
      ...row,
      gap: 18,
    }}
  >
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: TINT_TEAL,
        color: TEAL_HEX,
        fontFamily: MONO,
        fontSize: 18,
        fontWeight: 780,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {num}
    </div>
    <div>
      <div style={{ fontSize: 21, fontWeight: 740, color: INK }}>{title}</div>
      <div style={{ fontSize: 18, color: BODY, marginTop: 2 }}>{desc}</div>
    </div>
  </div>
);

const ArchNode = ({
  label,
  detail,
  accent = TEAL_HEX,
}: {
  label: string;
  detail: string;
  accent?: string;
}) => (
  <div
    style={{
      borderRadius: 14,
      background: 'rgba(255,255,255,0.08)',
      border: `1.5px solid rgba(255,255,255,0.16)`,
      padding: '13px 20px',
      ...row,
      justifyContent: 'space-between',
    }}
  >
    <span style={{ fontSize: 20, fontWeight: 740, color: '#FFFFFF' }}>{label}</span>
    <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 700, color: accent }}>{detail}</span>
  </div>
);

const Slide05GeminiIntegration: Page = () => (
  <Frame>
    <Eyebrow>Menghubungkan AI ke Aplikasi · Gemini API &amp; Google AI Studio</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(48) }}>
      Ambil API Key dari <Highlight color={HIGHLIGHT_TEAL}>Google AI Studio</Highlight> &amp;
      simpan aman di <Highlight color={HIGHLIGHT_PINK}>Backend</Highlight>.
    </h2>

    {/* Left Column: Setup API Key & Security Warning */}
    <div
      style={{
        ...abs(X0, 224, 770, 720),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          borderRadius: 24,
          background: TINT_NEUTRAL,
          border: `2px solid ${RULE}`,
          padding: '26px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
            PERSIAPAN GEMINI API KEY
          </span>
          <span style={{ fontFamily: MONO, fontSize: 16, color: BODY }}>aistudio.google.com</span>
        </div>

        <SetupStepCard
          num="01"
          title="Buka Google AI Studio"
          desc="Login dengan akun Google dan pilih menu Get API Key."
        />
        <SetupStepCard
          num="02"
          title="Create & Copy API Key"
          desc="Buat key baru untuk project UrbanStore dan salin nilainya."
        />
        <SetupStepCard
          num="03"
          title="Simpan di File .env (Backend)"
          desc="Tempel sebagai GEMINI_API_KEY=... dan pastikan .env masuk .gitignore."
        />
      </div>

      <div
        style={{
          borderRadius: 24,
          background: TINT_PINK,
          border: `2.5px solid ${CORAL_HEX}`,
          padding: '24px 30px',
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: CORAL_HEX, marginBottom: 8 }}>
          ATURAN KEAMANAN WAJIB
        </div>
        <div style={{ fontSize: 21, fontWeight: 720, color: INK, lineHeight: 1.4, marginBottom: 8 }}>
          Jangan pernah menaruh Gemini API Key di kode Frontend / Browser!
        </div>
        <div style={{ fontSize: 18, color: BODY, lineHeight: 1.45 }}>
          Siapa pun bisa membuka DevTools ➔ Network tab dan mencuri API Key jika dipanggil langsung
          dari client. Semua request AI wajib lewat Backend API Route.
        </div>
      </div>
    </div>

    {/* Right Column: Backend Architecture Flow */}
    <div
      style={{
        ...abs(924, 224, 876, 720),
        borderRadius: 26,
        background: INK_HEX,
        color: '#FFFFFF',
        padding: '28px 34px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ ...row, justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: YELLOW }}>
            WORKFLOW INTEGRASI AI URBANSTORE
          </span>
          <span style={{ fontFamily: MONO, fontSize: 16, color: '#7CE8E4' }}>Server-Side Proxy</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ArchNode
            label="1. User (Customer Chat / Admin Dashboard)"
            detail="UI Trigger"
            accent={YELLOW}
          />
          <div style={{ textAlign: 'center', fontFamily: MONO, fontSize: 18, color: '#7CE8E4' }}>↓</div>
          <ArchNode
            label="2. Frontend UrbanStore"
            detail="Kirim Request ke Backend"
            accent="#FFFFFF"
          />
          <div style={{ textAlign: 'center', fontFamily: MONO, fontSize: 18, color: '#7CE8E4' }}>↓</div>
          <ArchNode
            label="3. Backend API (/api/chat · /api/admin/...)"
            detail="Baca .env + Katalog/Order"
            accent="#7CE8E4"
          />
          <div style={{ textAlign: 'center', fontFamily: MONO, fontSize: 18, color: '#7CE8E4' }}>↓</div>
          <ArchNode
            label="4. Gemini API (Google AI Studio)"
            detail="Proses Prompt + Konteks"
            accent={YELLOW}
          />
          <div style={{ textAlign: 'center', fontFamily: MONO, fontSize: 18, color: '#7CE8E4' }}>↓</div>
          <ArchNode
            label="5. Validasi & Render ke Frontend"
            detail="Chat / Deskripsi / Laporan"
            accent={GREEN}
          />
        </div>
      </div>

      <div
        style={{
          borderRadius: 16,
          background: 'rgba(255,255,255,0.06)',
          border: '1.5px solid rgba(255,255,255,0.14)',
          padding: '14px 20px',
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 18, color: '#E2E1DD' }}>
          <strong style={{ color: '#FFFFFF' }}>Alternatif via 9Router:</strong> OpenAI · Claude · Grok ·
          DeepSeek · Groq
        </span>
        <span style={{ fontFamily: MONO, fontSize: 16, color: '#7CE8E4' }}>Primary: Gemini</span>
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 06 — DETAIL 3 FITUR AI YANG AKAN DIBANGUN                              */
/* ============================================================================ */

const Slide06ThreeAIFeatures: Page = () => {
  const [activeFeature, setActiveFeature] = useState<'chat' | 'describe' | 'analyze'>('chat');

  return (
    <Frame>
      <Eyebrow>Fitur AI UrbanStore yang Akan Dibangun</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(48) }}>
        Tiga modul AI nyata untuk <Highlight color={HIGHLIGHT_TEAL}>Pembeli</Highlight> &amp;{' '}
        <Highlight>Pemilik Toko</Highlight>.
      </h2>

      {/* 3 Selectable Feature Columns */}
      <div
        style={{
          ...abs(X0, 224, W, 380),
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 24,
        }}
      >
        {/* Card 1: Floating Chat CS */}
        <div
          onClick={() => setActiveFeature('chat')}
          className="s5-interactive"
          style={{
            borderRadius: 24,
            background: TINT_TEAL,
            border: `2.5px solid ${activeFeature === 'chat' ? INK_HEX : TEAL_HEX}`,
            padding: '24px 26px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: TEAL_HEX }}>
                01 · SISI CUSTOMER
              </span>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: 99,
                  background: '#FFFFFF',
                  fontFamily: MONO,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Floating Widget
              </span>
            </div>
            <h3 style={{ ...headline(28), marginBottom: 12 }}>Floating Chat Asisten CS</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 19, color: INK }}>
              <div>• <strong>Cek Stok:</strong> Tanya stok &amp; ukuran item aktif.</div>
              <div>• <strong>Konsultasi BB &amp; TB:</strong> Saran ukuran S/M/L/XL sesuai postur.</div>
              <div>• <strong>Mix &amp; Match:</strong> Padu padan outfit dari katalog toko.</div>
            </div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, color: TEAL_HEX }}>
            Endpoint: POST /api/chat
          </div>
        </div>

        {/* Card 2: Generate Deskripsi Produk */}
        <div
          onClick={() => setActiveFeature('describe')}
          className="s5-interactive"
          style={{
            borderRadius: 24,
            background: TINT_YELLOW,
            border: `2.5px solid ${activeFeature === 'describe' ? INK_HEX : '#E2B93B'}`,
            padding: '24px 26px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: '#946200' }}>
                02 · SISI ADMIN
              </span>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: 99,
                  background: '#FFFFFF',
                  fontFamily: MONO,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Form Produk
              </span>
            </div>
            <h3 style={{ ...headline(28), marginBottom: 12 }}>AI Generate Deskripsi Produk</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 19, color: INK }}>
              <div>• Terpasang di Form Tambah Produk Admin (Sesi 4).</div>
              <div>• Membaca nama, kategori, harga, ukuran, &amp; bahan.</div>
              <div>• Otomatis mengisi copywriting deskripsi siap review &amp; edit.</div>
            </div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, color: '#946200' }}>
            Endpoint: POST /api/admin/describe
          </div>
        </div>

        {/* Card 3: AI Analisis Penjualan */}
        <div
          onClick={() => setActiveFeature('analyze')}
          className="s5-interactive"
          style={{
            borderRadius: 24,
            background: TINT_PINK,
            border: `2.5px solid ${activeFeature === 'analyze' ? INK_HEX : CORAL_HEX}`,
            padding: '24px 26px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: CORAL_HEX }}>
                03 · SISI ADMIN
              </span>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: 99,
                  background: '#FFFFFF',
                  fontFamily: MONO,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Order Dashboard
              </span>
            </div>
            <h3 style={{ ...headline(28), marginBottom: 12 }}>AI Analisis Penjualan</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 19, color: INK }}>
              <div>• Membaca data pesanan &amp; omzet Admin (Sesi 4).</div>
              <div>• Menghasilkan <strong>Dokumen Analisis AI</strong> terstruktur.</div>
              <div>• Memberi <strong>rekomendasi strategi penjualan</strong> ke depannya.</div>
            </div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, color: CORAL_HEX }}>
            Endpoint: POST /api/admin/analyze
          </div>
        </div>
      </div>

      {/* Bottom Interactive Preview Area */}
      <div
        style={{
          ...abs(X0, 626, W, 322),
          borderRadius: 24,
          background: INK_HEX,
          color: '#FFFFFF',
          padding: '26px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: YELLOW }}>
            {activeFeature === 'chat'
              ? 'LIVE PREVIEW · FLOATING CHAT ASISTEN CS'
              : activeFeature === 'describe'
                ? 'LIVE PREVIEW · FORM ADMIN GENERATE DESKRIPSI'
                : 'LIVE PREVIEW · DOKUMEN ANALISIS & STRATEGI PENJUALAN AI'}
          </span>
          <span style={{ fontFamily: MONO, fontSize: 15, color: '#7CE8E4' }}>
            Klik salah satu kartu di atas untuk mengganti preview
          </span>
        </div>

        {activeFeature === 'chat' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 24, alignItems: 'center' }}>
            <div
              style={{
                borderRadius: 16,
                background: 'rgba(255,255,255,0.08)',
                padding: '18px 22px',
                fontSize: 20,
                lineHeight: 1.45,
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 14, color: YELLOW, marginBottom: 6 }}>
                CUSTOMER QUESTION
              </div>
              “Kak, tinggi aku 172 cm berat 68 kg. Oversized Tee warna hitam masih ada? Cocok size
              apa dan enaknya dipaduin sama apa?”
            </div>
            <div
              style={{
                borderRadius: 16,
                background: 'rgba(60,165,161,0.22)',
                border: `1.5px solid ${TEAL_HEX}`,
                padding: '18px 22px',
                fontSize: 20,
                lineHeight: 1.45,
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 14, color: '#7CE8E4', marginBottom: 6 }}>
                GEMINI CS ASSISTANT (GROUNDED CATALOG)
              </div>
              “Ready kak! Sisa 12 pcs. Untuk 172 cm / 68 kg paling pas pakai <strong>Size L</strong>.
              Biar makin clean, bisa di-mix sama <strong>Urban Relaxed Chino (Rp 259.000)</strong>{' '}
              atau <strong>Boxy Zip Hoodie (Rp 329.000)</strong>!”
            </div>
          </div>
        )}

        {activeFeature === 'describe' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 24, alignItems: 'center' }}>
            <div
              style={{
                borderRadius: 16,
                background: 'rgba(255,255,255,0.08)',
                padding: '18px 22px',
                fontFamily: MONO,
                fontSize: 17,
                lineHeight: 1.5,
              }}
            >
              Nama: Urban Boxy Work Jacket
              <br />
              Kategori: Outerwear · Rp 349.000
              <br />
              Ukuran: M, L, XL · Catatan: Canvas tebal, resleting YKK
            </div>
            <div
              style={{
                borderRadius: 16,
                background: 'rgba(248,218,126,0.16)',
                border: `1.5px solid ${YELLOW}`,
                padding: '18px 22px',
                fontSize: 20,
                lineHeight: 1.45,
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 14, color: YELLOW, marginBottom: 6 }}>
                HASIL GENERATE DESKRIPSI AI (SIAP EDIT ADMIN)
              </div>
              “Tampil effortless dengan <strong>Urban Boxy Work Jacket</strong>. Dibuat dari bahan
              canvas premium yang kokoh dengan potongan boxy modern dan resleting YKK yang awet
              untuk aktivitas harian maupun hangout.”
            </div>
          </div>
        )}

        {activeFeature === 'analyze' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 24, alignItems: 'center' }}>
            <div
              style={{
                borderRadius: 16,
                background: 'rgba(255,255,255,0.08)',
                padding: '18px 22px',
                fontFamily: MONO,
                fontSize: 17,
                lineHeight: 1.5,
              }}
            >
              Total Order Lunas: 48 transaksi (Rp 14.2jt)
              <br />
              Top Category: Essentials (54%) &amp; Outerwear (28%)
              <br />
              Low Stock Alert: Oversized Tee Size L (sisa 2)
            </div>
            <div
              style={{
                borderRadius: 16,
                background: 'rgba(255,95,124,0.18)',
                border: `1.5px solid ${CORAL_HEX}`,
                padding: '18px 22px',
                fontSize: 19,
                lineHeight: 1.45,
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 14, color: '#FF8DA1', marginBottom: 6 }}>
                DOKUMEN ANALISIS &amp; REKOMENDASI STRATEGI PENJUALAN
              </div>
              <strong>1. Restock Segera:</strong> Size L Essentials menyumbang 60% penjualan.{' '}
              <strong>2. Strategi Bundling:</strong> Buat paket “Campus Starter Pack” (Tee +
              Outerwear diskon 10%) untuk menaikkan nilai rata-rata order (AOV).
            </div>
          </div>
        )}
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 07 — AI USER EXPERIENCE (AI UX)                                        */
/* ============================================================================ */

const UXCheckCard = ({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) => (
  <div
    style={{
      borderRadius: 18,
      background: '#FFFFFF',
      border: `2px solid ${RULE}`,
      padding: '16px 22px',
      ...row,
      gap: 16,
    }}
  >
    <div
      style={{
        width: 42,
        height: 42,
        borderRadius: 10,
        background: TINT_TEAL,
        color: TEAL_HEX,
        fontFamily: MONO,
        fontSize: 17,
        fontWeight: 780,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {num}
    </div>
    <div>
      <div style={{ fontSize: 21, fontWeight: 750, color: INK }}>{title}</div>
      <div style={{ fontSize: 18, color: BODY, marginTop: 2 }}>{desc}</div>
    </div>
  </div>
);

const Slide07AIUX: Page = () => {
  const [uxState, setUxState] = useState<'loading' | 'success' | 'error'>('loading');

  return (
    <Frame>
      <Eyebrow>AI User Experience (AI UX)</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        AI yang baik bukan hanya pintar — tetapi juga{' '}
        <Highlight color={HIGHLIGHT_TEAL}>nyaman digunakan</Highlight>.
      </h2>

      {/* Left Column: 5 Checklist Cards */}
      <div
        style={{
          ...abs(X0, 224, 790, 720),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <UXCheckCard
          num="01"
          title="Contextual Loading State"
          desc="Jelaskan apa yang sedang AI kerjakan, jangan hanya menulis 'Loading...'."
        />
        <UXCheckCard
          num="02"
          title="Typing Indicator & Streaming"
          desc="Tampilkan respons secara bertahap di Floating Chat & Dokumen Analisis Admin."
        />
        <UXCheckCard
          num="03"
          title="Skeleton Loading"
          desc="Berikan kerangka UI saat Admin menunggu Dokumen Analisis Penjualan selesai."
        />
        <UXCheckCard
          num="04"
          title="Quick Prompt Chips & Retry Button"
          desc="Sediakan tombol pertanyaan cepat di chat dan tombol 'Coba Lagi' jika gagal."
        />
        <UXCheckCard
          num="05"
          title="Error & Empty State yang Ramah"
          desc="Tangani limit Gemini API, koneksi putus, atau data transaksi yang masih kosong."
        />
      </div>

      {/* Right Column: Interactive UX State Simulator */}
      <div
        style={{
          ...abs(946, 224, 854, 720),
          borderRadius: 26,
          background: TINT_NEUTRAL,
          border: `2.5px solid ${INK_HEX}`,
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
              SIMULASI STATE AI UX
            </span>
            <div style={{ ...row, gap: 8 }}>
              <button
                type="button"
                onClick={() => setUxState('loading')}
                className="s5-interactive"
                style={{
                  padding: '6px 14px',
                  borderRadius: 99,
                  border: `1.5px solid ${uxState === 'loading' ? TEAL_HEX : RULE}`,
                  background: uxState === 'loading' ? TEAL_HEX : '#FFFFFF',
                  color: uxState === 'loading' ? '#FFFFFF' : INK,
                  fontFamily: MONO,
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                Loading
              </button>
              <button
                type="button"
                onClick={() => setUxState('success')}
                className="s5-interactive"
                style={{
                  padding: '6px 14px',
                  borderRadius: 99,
                  border: `1.5px solid ${uxState === 'success' ? INK_HEX : RULE}`,
                  background: uxState === 'success' ? INK_HEX : '#FFFFFF',
                  color: uxState === 'success' ? '#FFFFFF' : INK,
                  fontFamily: MONO,
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                Success
              </button>
              <button
                type="button"
                onClick={() => setUxState('error')}
                className="s5-interactive"
                style={{
                  padding: '6px 14px',
                  borderRadius: 99,
                  border: `1.5px solid ${uxState === 'error' ? CORAL_HEX : RULE}`,
                  background: uxState === 'error' ? CORAL_HEX : '#FFFFFF',
                  color: uxState === 'error' ? '#FFFFFF' : INK,
                  fontFamily: MONO,
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                Error
              </button>
            </div>
          </div>

          {/* Preview Box */}
          <div
            style={{
              borderRadius: 20,
              background: '#FFFFFF',
              border: `2px solid ${RULE}`,
              padding: '24px 28px',
              minHeight: 330,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {uxState === 'loading' && (
              <>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 15, color: TEAL_HEX, fontWeight: 760 }}>
                    FLOATING CHAT &amp; ADMIN ANALYST · PROCESSING
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 740, color: INK, marginTop: 10 }}>
                    “Asisten sedang mengecek stok katalog &amp; mencocokkan ukuran BB/TB-mu...”
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
                  <div style={{ height: 28, width: '92%', borderRadius: 8, background: TINT_TEAL }} />
                  <div style={{ height: 28, width: '78%', borderRadius: 8, background: TINT_NEUTRAL }} />
                  <div style={{ height: 28, width: '64%', borderRadius: 8, background: TINT_NEUTRAL }} />
                </div>
              </>
            )}

            {uxState === 'success' && (
              <>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 15, color: '#2F7A43', fontWeight: 760 }}>
                    ✓ RESPONSE READY · ACTIONABLE UI
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 720, color: INK, marginTop: 10, lineHeight: 1.42 }}>
                    Rekomendasi: <strong>Size L</strong> untuk TB 170 / BB 65. Mix dengan{' '}
                    <strong>Oversized Hoodie Olive (Stok: 8)</strong>.
                  </div>
                </div>
                <div style={{ ...row, gap: 12, marginTop: 20 }}>
                  <span
                    style={{
                      padding: '10px 18px',
                      borderRadius: 10,
                      background: TEAL_HEX,
                      color: '#FFFFFF',
                      fontSize: 17,
                      fontWeight: 720,
                    }}
                  >
                    + Lihat Produk di Katalog
                  </span>
                  <span
                    style={{
                      padding: '10px 18px',
                      borderRadius: 10,
                      background: TINT_NEUTRAL,
                      color: INK,
                      fontSize: 17,
                      fontWeight: 700,
                    }}
                  >
                    ↻ Tanya Kombinasi Lain
                  </span>
                </div>
              </>
            )}

            {uxState === 'error' && (
              <>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 15, color: CORAL_HEX, fontWeight: 760 }}>
                    ✕ GRACEFUL ERROR HANDLING
                  </div>
                  <div style={{ fontSize: 23, fontWeight: 740, color: INK, marginTop: 10 }}>
                    “Maaf, asisten sedang sibuk karena batas kuota Gemini API tercapai.”
                  </div>
                  <div style={{ fontSize: 18, color: BODY, marginTop: 8 }}>
                    Jangan tampilkan raw error JSON/stacktrace ke customer atau admin!
                  </div>
                </div>
                <div style={{ marginTop: 20 }}>
                  <span
                    onClick={() => setUxState('loading')}
                    className="s5-interactive"
                    style={{
                      display: 'inline-block',
                      padding: '10px 20px',
                      borderRadius: 10,
                      background: CORAL_HEX,
                      color: '#FFFFFF',
                      fontSize: 17,
                      fontWeight: 740,
                    }}
                  >
                    ↻ Coba Lagi Sekarang
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Comparison Footer */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ borderRadius: 16, background: TINT_PINK, padding: '16px 20px' }}>
            <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 780, color: CORAL_HEX }}>
              ✕ BURUK
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: INK, marginTop: 4 }}>
              “Loading...”
            </div>
          </div>
          <div style={{ borderRadius: 16, background: TINT_TEAL, padding: '16px 20px' }}>
            <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 780, color: TEAL_HEX }}>
              ✓ JAUH LEBIH BAIK
            </div>
            <div style={{ fontSize: 19, fontWeight: 700, color: INK, marginTop: 4 }}>
              “Menyusun analisis penjualan &amp; strategi...”
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 08 — MENGGUNAKAN AI SKILL                                              */
/* ============================================================================ */

const SkillPillarCard = ({
  tag,
  title,
  desc,
  tint,
  accent,
}: {
  tag: string;
  title: string;
  desc: string;
  tint: string;
  accent: string;
}) => (
  <div
    style={{
      borderRadius: 20,
      background: tint,
      border: `2px solid ${accent}`,
      padding: '20px 24px',
    }}
  >
    <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 780, color: accent, marginBottom: 6 }}>
      {tag}
    </div>
    <div style={{ ...headline(26), marginBottom: 6 }}>{title}</div>
    <div style={{ fontSize: 18, color: BODY, lineHeight: 1.4 }}>{desc}</div>
  </div>
);

const Slide08AISkillAudit: Page = () => (
  <Frame>
    <Eyebrow>Menggunakan AI Skill · Audit Fitur AI</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
      Setelah fitur AI berjalan, gunakan <Highlight color={HIGHLIGHT_TEAL}>Skill</Highlight> untuk
      melakukan audit.
    </h2>

    {/* Left 2x2 Grid of Skill Pillars */}
    <div
      style={{
        ...abs(X0, 230, 820, 560),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20,
      }}
    >
      <SkillPillarCard
        tag="SKILL 01 · SECURITY"
        title="Keamanan API Key"
        desc="Pastikan GEMINI_API_KEY tidak bocor ke client & input chat aman dari prompt injection."
        tint={TINT_PINK}
        accent={CORAL_HEX}
      />
      <SkillPillarCard
        tag="SKILL 02 · RELIABILITY"
        title="Anti-Hallucination"
        desc="Cegah chat CS mengarang produk/stok palsu dan pastikan angka analisis penjualan akurat."
        tint={TINT_TEAL}
        accent={TEAL_HEX}
      />
      <SkillPillarCard
        tag="SKILL 03 · PERFORMANCE"
        title="Efisiensi Payload"
        desc="Cek apakah data katalog & data order yang dikirim ke Gemini terlalu besar / boros token."
        tint={TINT_YELLOW}
        accent="#946200"
      />
      <SkillPillarCard
        tag="SKILL 04 · TESTING"
        title="Refactor & Edge Case"
        desc="Uji kondisi stok 0, input BB/TB tidak lengkap, dan data pesanan Admin masih kosong."
        tint={TINT_GREEN}
        accent="#2F7A43"
      />
    </div>

    {/* Bottom Left Insight */}
    <div
      style={{
        ...abs(X0, 816, 820, 128),
        borderRadius: 20,
        background: TINT_NEUTRAL,
        border: `2px solid ${RULE}`,
        padding: '20px 26px',
        ...row,
      }}
    >
      <div style={{ fontSize: 20, lineHeight: 1.42, color: INK }}>
        <strong>Insight:</strong> Skill menjaga kualitas fitur AI UrbanStore secara konsisten
        tanpa perlu menulis prompt audit panjang berulang kali.
      </div>
    </div>

    {/* Right Dark Audit Terminal Output */}
    <div
      style={{
        ...abs(976, 230, 824, 714),
        borderRadius: 26,
        background: INK_HEX,
        color: '#FFFFFF',
        padding: '28px 34px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ ...row, justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: YELLOW }}>
            CONTOH OUTPUT · AI SKILL AUDIT
          </span>
          <span style={{ fontFamily: MONO, fontSize: 15, color: '#7CE8E4' }}>UrbanStore AI</span>
        </div>

        <div
          style={{
            borderRadius: 14,
            background: 'rgba(255,255,255,0.08)',
            padding: '14px 20px',
            fontFamily: MONO,
            fontSize: 17,
            color: '#7CE8E4',
            marginBottom: 18,
          }}
        >
          $ Audit Floating Chat CS, Product Copywriter, &amp; Sales Analyst
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              borderRadius: 16,
              background: 'rgba(255,95,124,0.16)',
              border: `1.5px solid ${CORAL_HEX}`,
              padding: '16px 20px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 780, color: '#FF8DA1' }}>
              [POTENSI BUG · CHAT CS]
            </div>
            <div style={{ fontSize: 19, marginTop: 4, lineHeight: 1.4 }}>
              Chat belum memfilter produk dengan <code>stock === 0</code>, sehingga item habis
              masih ikut direkomendasikan untuk mix &amp; match.
            </div>
          </div>

          <div
            style={{
              borderRadius: 16,
              background: 'rgba(248,218,126,0.14)',
              border: `1.5px solid ${YELLOW}`,
              padding: '16px 20px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 780, color: YELLOW }}>
              [OPTIMASI TOKEN · ADMIN ANALYST]
            </div>
            <div style={{ fontSize: 19, marginTop: 4, lineHeight: 1.4 }}>
              Ringkas array order menjadi agregat metrik sebelum dikirim ke Gemini untuk menghemat
              hingga 70% input token.
            </div>
          </div>

          <div
            style={{
              borderRadius: 16,
              background: 'rgba(60,165,161,0.2)',
              border: `1.5px solid ${TEAL_HEX}`,
              padding: '16px 20px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 780, color: '#7CE8E4' }}>
              [IMPROVEMENT · SECURITY &amp; UX]
            </div>
            <div style={{ fontSize: 19, marginTop: 4, lineHeight: 1.4 }}>
              Tambahkan timeout handler 15 detik dan pastikan seluruh panggilan Gemini API berada di
              server route.
            </div>
          </div>
        </div>
      </div>

      <div style={{ fontFamily: MONO, fontSize: 16, color: '#A0A09C' }}>
        Status: 3 Temuan ditemukan ➔ Siap diperbaiki AI Agent
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 09 — APA ITU 9ROUTER?                                                  */
/* ============================================================================ */

const ProviderHubRow = ({
  name,
  role,
  active,
  onClick,
}: {
  name: string;
  role: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s5-interactive"
    style={{
      borderRadius: 16,
      background: active ? TEAL_HEX : '#FFFFFF',
      color: active ? '#FFFFFF' : INK,
      border: `2px solid ${active ? TEAL_HEX : RULE}`,
      padding: '15px 22px',
      ...row,
      justifyContent: 'space-between',
    }}
  >
    <span style={{ fontSize: 22, fontWeight: 760 }}>{name}</span>
    <span
      style={{
        fontFamily: MONO,
        fontSize: 16,
        fontWeight: 700,
        color: active ? '#EBF7F6' : BODY,
      }}
    >
      {role}
    </span>
  </div>
);

const Slide09WhatIs9Router: Page = () => {
  const [provider, setProvider] = useState('Gemini (Google AI Studio)');

  return (
    <Frame>
      <Eyebrow>AI Router · Mengenal 9Router</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(54) }}>
        9Router adalah <Highlight color={HIGHLIGHT_TEAL}>AI Router</Highlight>. Bukan AI Model.
      </h2>

      {/* Left Explanation */}
      <div
        style={{
          ...abs(X0, 236, 740, 700),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            borderRadius: 24,
            background: TINT_NEUTRAL,
            border: `2px solid ${RULE}`,
            padding: '30px 34px',
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX, marginBottom: 10 }}>
            KONSEP DASAR
          </div>
          <p style={{ margin: '0 0 18px', fontSize: 25, fontWeight: 680, lineHeight: 1.42, color: INK }}>
            9Router bertugas menjadi <strong>satu pintu perantara</strong> untuk memilih dan
            mengarahkan request aplikasi kita ke provider AI yang paling sesuai kebutuhan.
          </p>
          <div
            style={{
              borderRadius: 16,
              background: '#FFFFFF',
              padding: '18px 22px',
              fontSize: 21,
              color: BODY,
              lineHeight: 1.48,
            }}
          >
            Saat ini UrbanStore memakai <strong style={{ color: INK }}>Gemini API</strong>. Dengan
            9Router, jika suatu saat ingin mencoba OpenAI, Claude, atau DeepSeek — kode aplikasi
            tidak perlu dirombak.
          </div>
        </div>

        <div
          style={{
            borderRadius: 24,
            background: INK_HEX,
            color: '#FFFFFF',
            padding: '28px 34px',
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: YELLOW, marginBottom: 8 }}>
            MANTRA 9ROUTER
          </div>
          <div style={{ ...headline(38), color: '#FFFFFF' }}>
            Satu endpoint.
            <br />
            <span style={{ color: '#7CE8E4' }}>Banyak model AI.</span>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 16, color: '#D0CFCB', marginTop: 14 }}>
            Route aktif saat ini: {provider}
          </div>
        </div>
      </div>

      {/* Right Interactive Hub Diagram */}
      <div
        style={{
          ...abs(900, 236, 900, 700),
          borderRadius: 26,
          background: TINT_TEAL,
          border: `2.5px solid ${TEAL_HEX}`,
          padding: '30px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
            WORKFLOW 9ROUTER
          </span>
          <span style={{ fontFamily: MONO, fontSize: 16, color: BODY }}>
            Klik provider untuk simulasi routing
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 60px 1.2fr',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {/* App + 9Router Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              style={{
                borderRadius: 18,
                background: '#FFFFFF',
                border: `2px solid ${INK_HEX}`,
                padding: '22px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 15, color: BODY }}>APPLICATION</div>
              <div style={{ fontSize: 24, fontWeight: 780, color: INK, marginTop: 4 }}>
                UrbanStore Backend
              </div>
              <div style={{ fontSize: 16, color: BODY, marginTop: 4 }}>Chat CS &amp; Admin AI</div>
            </div>

            <div style={{ textAlign: 'center', fontSize: 28, fontWeight: 800, color: TEAL_HEX }}>↓</div>

            <div
              style={{
                borderRadius: 18,
                background: INK_HEX,
                color: '#FFFFFF',
                padding: '24px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 15, color: YELLOW }}>SINGLE ENDPOINT</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#7CE8E4', marginTop: 4 }}>
                9Router
              </div>
              <div style={{ fontSize: 16, color: '#D0CFCB', marginTop: 4 }}>Smart Model Gateway</div>
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: 38, fontWeight: 800, color: INK_HEX }}>→</div>

          {/* Provider List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ProviderHubRow
              name="Gemini"
              role="Google AI Studio · Utama"
              active={provider === 'Gemini (Google AI Studio)'}
              onClick={() => setProvider('Gemini (Google AI Studio)')}
            />
            <ProviderHubRow
              name="OpenAI"
              role="GPT Series"
              active={provider === 'OpenAI'}
              onClick={() => setProvider('OpenAI')}
            />
            <ProviderHubRow
              name="Claude"
              role="Anthropic Reasoning"
              active={provider === 'Claude'}
              onClick={() => setProvider('Claude')}
            />
            <ProviderHubRow
              name="DeepSeek"
              role="Cost-Efficient Model"
              active={provider === 'DeepSeek'}
              onClick={() => setProvider('DeepSeek')}
            />
            <ProviderHubRow
              name="Groq"
              role="Ultra-Fast Inference"
              active={provider === 'Groq'}
              onClick={() => setProvider('Groq')}
            />
          </div>
        </div>

        <div
          style={{
            borderRadius: 14,
            background: '#FFFFFF',
            padding: '14px 20px',
            fontFamily: MONO,
            fontSize: 17,
            color: INK,
          }}
        >
          ✓ Endpoint UrbanStore tetap sama — cukup ganti target model di 9Router.
        </div>
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 10 — MENGAPA MENGGUNAKAN 9ROUTER?                                      */
/* ============================================================================ */

const BenefitCard = ({
  num,
  title,
  desc,
  tint,
  accent,
}: {
  num: string;
  title: string;
  desc: string;
  tint: string;
  accent: string;
}) => (
  <div
    style={{
      borderRadius: 20,
      background: tint,
      border: `2px solid ${accent}`,
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: accent }}>{num}</div>
    <div>
      <div style={{ ...headline(26), marginTop: 8, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 18, color: BODY, lineHeight: 1.4 }}>{desc}</div>
    </div>
  </div>
);

const Slide10Why9Router: Page = () => (
  <Frame>
    <Eyebrow>Keuntungan 9Router</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
      Mengapa developer modern memakai <Highlight color={HIGHLIGHT_TEAL}>9Router</Highlight>?
    </h2>

    {/* Left 2x2 Grid of Benefits + 5th Highlight */}
    <div
      style={{
        ...abs(X0, 232, 920, 560),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20,
      }}
    >
      <BenefitCard
        num="01 · HEMAT BIAYA"
        title="Pilih Model Sesuai Budget"
        desc="Task ringan seperti deskripsi produk pakai model hemat; analisis strategi pakai model kuat."
        tint={TINT_TEAL}
        accent={TEAL_HEX}
      />
      <BenefitCard
        num="02 · FLEKSIBEL"
        title="Mudah Berpindah Model"
        desc="Ganti provider cukup lewat konfigurasi tanpa merombak kode Floating Chat atau Dashboard."
        tint={TINT_YELLOW}
        accent="#946200"
      />
      <BenefitCard
        num="03 · STANDAR API"
        title="Satu API Banyak Provider"
        desc="Tidak perlu belajar dan merawat banyak SDK berbeda untuk tiap penyedia LLM."
        tint={TINT_BLUE}
        accent="#2B6CB0"
      />
      <BenefitCard
        num="04 · ANTI LOCK-IN"
        title="Cadangan Saat Limit Habis"
        desc="Jika Gemini API terkena rate-limit saat ramai, request langsung dialihkan ke model lain."
        tint={TINT_PINK}
        accent={CORAL_HEX}
      />
    </div>

    <div
      style={{
        ...abs(X0, 816, 920, 128),
        borderRadius: 20,
        background: TINT_GREEN,
        border: `2px solid #2F7A43`,
        padding: '20px 28px',
        ...row,
        gap: 18,
      }}
    >
      <CheckMark color="#2F7A43" size={30} />
      <div style={{ fontSize: 21, fontWeight: 700, color: INK }}>
        <strong>05 · Mengurangi Vendor Lock-in:</strong> Aplikasi UrbanStore tidak bergantung mati
        pada satu penyedia AI saja.
      </div>
    </div>

    {/* Right Column: Day-by-Day Switching Scenario */}
    <div
      style={{
        ...abs(1076, 232, 724, 712),
        borderRadius: 26,
        background: INK_HEX,
        color: '#FFFFFF',
        padding: '30px 34px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: YELLOW, marginBottom: 10 }}>
          CONTOH SKENARIO DI URBANSTORE
        </div>
        <h3 style={{ ...headline(32), color: '#FFFFFF', marginBottom: 22 }}>
          Ganti Model Tanpa Mengubah Logika Aplikasi
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              borderRadius: 16,
              background: 'rgba(60,165,161,0.22)',
              border: `1.5px solid ${TEAL_HEX}`,
              padding: '18px 22px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 15, color: '#7CE8E4', fontWeight: 760 }}>
              HARI INI · MVP LAUNCH
            </div>
            <div style={{ fontSize: 24, fontWeight: 760, marginTop: 4 }}>Gemini (Google AI Studio)</div>
            <div style={{ fontSize: 17, color: '#E2E1DD', marginTop: 4 }}>
              Menjalankan Floating Chat CS &amp; Generate Deskripsi Produk.
            </div>
          </div>

          <div style={{ textAlign: 'center', fontFamily: MONO, fontSize: 22, color: YELLOW }}>↓</div>

          <div
            style={{
              borderRadius: 16,
              background: 'rgba(248,218,126,0.14)',
              border: `1.5px solid ${YELLOW}`,
              padding: '18px 22px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 15, color: YELLOW, fontWeight: 760 }}>
              BESOK · UJI KUALITAS STRATEGI
            </div>
            <div style={{ fontSize: 24, fontWeight: 760, marginTop: 4 }}>Claude</div>
            <div style={{ fontSize: 17, color: '#E2E1DD', marginTop: 4 }}>
              Menguji kedalaman Dokumen Analisis Penjualan Admin.
            </div>
          </div>

          <div style={{ textAlign: 'center', fontFamily: MONO, fontSize: 22, color: YELLOW }}>↓</div>

          <div
            style={{
              borderRadius: 16,
              background: 'rgba(255,255,255,0.08)',
              border: '1.5px solid rgba(255,255,255,0.2)',
              padding: '18px 22px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 15, color: '#FF8DA1', fontWeight: 760 }}>
              MINGGU DEPAN · SCALE EFISIEN
            </div>
            <div style={{ fontSize: 24, fontWeight: 760, marginTop: 4 }}>DeepSeek</div>
            <div style={{ fontSize: 17, color: '#E2E1DD', marginTop: 4 }}>
              Menekan biaya operasional chat CS harian tanpa ubah kode UI.
            </div>
          </div>
        </div>
      </div>

      <div style={{ fontFamily: MONO, fontSize: 16, color: '#7CE8E4' }}>
        Kode Frontend, Cart, &amp; Database UrbanStore = 0% berubah.
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 11 — TIPS "UNLIMITED" CODING WITH AI                                   */
/* ============================================================================ */

const StrategyStep = ({
  num,
  title,
  desc,
  bg,
  border,
  accent,
}: {
  num: string;
  title: string;
  desc: string;
  bg: string;
  border: string;
  accent: string;
}) => (
  <div
    style={{
      borderRadius: 20,
      background: bg,
      border: `2px solid ${border}`,
      padding: '18px 26px',
      ...row,
      justifyContent: 'space-between',
    }}
  >
    <div style={{ ...row, gap: 20 }}>
      <span style={{ fontFamily: MONO, fontSize: 24, fontWeight: 780, color: accent }}>{num}</span>
      <div>
        <div style={{ fontSize: 23, fontWeight: 760, color: INK }}>{title}</div>
        <div style={{ fontSize: 18, color: BODY, marginTop: 2 }}>{desc}</div>
      </div>
    </div>
    <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 700, color: accent }}>STEP {num}</span>
  </div>
);

const Slide11UnlimitedCoding: Page = () => (
  <Frame>
    <Eyebrow>Tips “Unlimited” Coding with AI</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
      Strategi developer profesional mengelola{' '}
      <Highlight color={HIGHLIGHT_TEAL}>kuota &amp; model AI</Highlight>.
    </h2>

    {/* Left Column: 4-Step Strategy Ladder */}
    <div
      style={{
        ...abs(X0, 232, 980, 580),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <StrategyStep
        num="01"
        title="Gunakan model gratis / ringan terlebih dahulu"
        desc="Cocok untuk styling UI, generate deskripsi produk, dan chat CS standar."
        bg={TINT_TEAL}
        border={TEAL_HEX}
        accent={TEAL_HEX}
      />
      <div style={{ paddingLeft: 32, fontSize: 22, fontWeight: 800, color: TEAL_HEX }}>↓</div>
      <StrategyStep
        num="02"
        title="Evaluasi: Apakah butuh reasoning kompleks?"
        desc="Seperti merancang arsitektur API, debugging logic order, atau strategi bisnis."
        bg={TINT_YELLOW}
        border="#E2B93B"
        accent="#946200"
      />
      <div style={{ paddingLeft: 32, fontSize: 22, fontWeight: 800, color: TEAL_HEX }}>↓</div>
      <StrategyStep
        num="03"
        title="Baru gunakan model premium seperlunya"
        desc="Hemat kuota model termahal hanya untuk keputusan teknis & bisnis yang berat."
        bg={TINT_BLUE}
        border="#2B6CB0"
        accent="#2B6CB0"
      />
      <div style={{ paddingLeft: 32, fontSize: 22, fontWeight: 800, color: TEAL_HEX }}>↓</div>
      <StrategyStep
        num="04"
        title="Jika limit habis, pindah provider via 9Router"
        desc="Momentum coding dan layanan AI UrbanStore tetap jalan tanpa terhenti."
        bg={TINT_PINK}
        border={CORAL_HEX}
        accent={CORAL_HEX}
      />
    </div>

    {/* Right Column: Task-to-Model Matrix */}
    <div
      style={{
        ...abs(1140, 232, 660, 712),
        borderRadius: 26,
        background: INK_HEX,
        color: '#FFFFFF',
        padding: '30px 34px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: YELLOW, marginBottom: 10 }}>
          PEMETAAN TASK URBANSTORE
        </div>
        <h3 style={{ ...headline(30), color: '#FFFFFF', marginBottom: 20 }}>
          Pilih Tier Model yang Tepat
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              borderRadius: 16,
              background: 'rgba(255,255,255,0.08)',
              padding: '18px 20px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 15, color: '#7CE8E4', fontWeight: 760 }}>
              MODEL CEPAT &amp; HEMAT (FLASH / LITE)
            </div>
            <div style={{ fontSize: 19, marginTop: 6, lineHeight: 1.42 }}>
              • Floating Chat CS (cek stok &amp; BB/TB)
              <br />• AI Generate Deskripsi Produk Admin
              <br />• Perbaikan CSS / komponen UI kecil
            </div>
          </div>

          <div
            style={{
              borderRadius: 16,
              background: 'rgba(248,218,126,0.14)',
              border: `1.5px solid ${YELLOW}`,
              padding: '18px 20px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 15, color: YELLOW, fontWeight: 760 }}>
              MODEL REASONING KUAT (PRO / FLAGSHIP)
            </div>
            <div style={{ fontSize: 19, marginTop: 6, lineHeight: 1.42 }}>
              • AI Analisis Penjualan &amp; Strategi Bisnis
              <br />• Skill Audit keamanan &amp; bug aplikasi
              <br />• Debugging backend &amp; alur transaksi kompleks
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderRadius: 16,
          background: 'rgba(60,165,161,0.22)',
          border: `1.5px solid ${TEAL_HEX}`,
          padding: '18px 22px',
          fontSize: 20,
          lineHeight: 1.4,
        }}
      >
        <strong>Aturan Emas:</strong> Gunakan model sesuai kebutuhan task, bukan yang paling mahal.
      </div>
    </div>

    <div
      style={{
        ...abs(X0, 838, 980, 106),
        borderRadius: 18,
        background: TINT_NEUTRAL,
        border: `2px solid ${RULE}`,
        padding: '18px 26px',
        ...row,
      }}
    >
      <span style={{ fontSize: 21, fontWeight: 700, color: INK }}>
        Hasilnya: Biaya token terkendali dan kuota gratis/berbayar bertahan jauh lebih lama.
      </span>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 12 — AI COST OPTIMIZATION                                              */
/* ============================================================================ */

const CostLineItem = ({
  icon,
  text,
  iconColor,
}: {
  icon: string;
  text: string;
  iconColor: string;
}) => (
  <div
    style={{
      borderRadius: 14,
      background: '#FFFFFF',
      padding: '15px 18px',
      ...row,
      gap: 14,
      fontSize: 20,
      lineHeight: 1.38,
      color: INK,
    }}
  >
    <span style={{ fontSize: 22, fontWeight: 800, color: iconColor, flexShrink: 0 }}>{icon}</span>
    <span>{text}</span>
  </div>
);

const Slide12AICostOptimization: Page = () => (
  <Frame>
    <Eyebrow>AI Cost Optimization · Hemat Token</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
      Pangkas pemborosan token saat{' '}
      <Highlight color={HIGHLIGHT_PINK}>coding</Highlight> maupun saat{' '}
      <Highlight color={HIGHLIGHT_TEAL}>aplikasi berjalan</Highlight>.
    </h2>

    {/* Left Column: Mistakes */}
    <div
      style={{
        ...abs(X0, 226, 816, 560),
        borderRadius: 26,
        background: TINT_PINK,
        border: `2.5px solid ${CORAL_HEX}`,
        padding: '26px 30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: CORAL_HEX, marginBottom: 6 }}>
          ✕ KESALAHAN YANG SERING DILAKUKAN
        </div>
        <h3 style={{ ...headline(32), marginBottom: 18 }}>Penyebab Token Boros</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <CostLineItem
            icon="✕"
            iconColor={CORAL_HEX}
            text="Prompt terlalu panjang, berulang, dan tidak fokus pada satu masalah."
          />
          <CostLineItem
            icon="✕"
            iconColor={CORAL_HEX}
            text="Mengirim seluruh source code proyek ke AI Agent untuk edit kecil."
          />
          <CostLineItem
            icon="✕"
            iconColor={CORAL_HEX}
            text="Mengirim seluruh metadata & deskripsi panjang katalog ke Floating Chat CS."
          />
          <CostLineItem
            icon="✕"
            iconColor={CORAL_HEX}
            text="Mengirim ribuan baris order mentah ke AI Analisis Penjualan tanpa diringkas."
          />
        </div>
      </div>

      <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 700, color: CORAL_HEX }}>
        Dampak: Kuota cepat habis &amp; respons AI menjadi lambat.
      </div>
    </div>

    {/* Right Column: Best Practices */}
    <div
      style={{
        ...abs(984, 226, 816, 560),
        borderRadius: 26,
        background: TINT_TEAL,
        border: `2.5px solid ${TEAL_HEX}`,
        padding: '26px 30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX, marginBottom: 6 }}>
          ✓ TIPS MENGHEMAT TOKEN
        </div>
        <h3 style={{ ...headline(32), marginBottom: 18 }}>Optimasi Konteks UrbanStore</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <CostLineItem
            icon="✓"
            iconColor={TEAL_HEX}
            text="Chat CS: Kirim field ringkas katalog (id, name, category, price, sizes, stock)."
          />
          <CostLineItem
            icon="✓"
            iconColor={TEAL_HEX}
            text="Admin Analyst: Hitung agregat di backend (omzet, top produk) lalu kirim ringkasannya."
          />
          <CostLineItem
            icon="✓"
            iconColor={TEAL_HEX}
            text="Coding Agent: Kirim hanya file relevan & pecah task (One Prompt = One Feature)."
          />
          <CostLineItem
            icon="✓"
            iconColor={TEAL_HEX}
            text="Reuse Prompt Library & PRD_UrbanStore.md daripada mengetik konteks berulang."
          />
        </div>
      </div>

      <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 700, color: TEAL_HEX }}>
        Dampak: Token hemat, biaya turun, jawaban Gemini tetap akurat.
      </div>
    </div>

    {/* Bottom Concrete Payload Bar */}
    <div
      style={{
        ...abs(X0, 810, W, 134),
        borderRadius: 22,
        background: INK_HEX,
        color: '#FFFFFF',
        padding: '22px 34px',
        ...row,
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: YELLOW, marginBottom: 4 }}>
          CONTOH NYATA OPTIMASI PAYLOAD CHAT CS
        </div>
        <div style={{ fontFamily: MONO, fontSize: 19, color: '#7CE8E4' }}>
          {'{ id: "P01", name: "Oversized Tee", cat: "Essentials", price: 179000, sizes: ["M","L"], stock: 12 }'}
        </div>
      </div>
      <div
        style={{
          padding: '12px 22px',
          borderRadius: 12,
          background: TEAL_HEX,
          fontFamily: MONO,
          fontSize: 18,
          fontWeight: 780,
          whiteSpace: 'nowrap',
        }}
      >
        ~70% Lebih Hemat Token
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 13 — WORKFLOW AI DEVELOPMENT                                           */
/* ============================================================================ */

const WorkflowTile = ({
  num,
  label,
  sub,
  active,
  onClick,
}: {
  num: string;
  label: string;
  sub: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s5-interactive"
    style={{
      borderRadius: 18,
      background: active ? TEAL_HEX : '#FFFFFF',
      color: active ? '#FFFFFF' : INK,
      border: `2px solid ${active ? TEAL_HEX : RULE}`,
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 146,
    }}
  >
    <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 780, color: active ? YELLOW : TEAL_HEX }}>
      STEP {num}
    </div>
    <div>
      <div style={{ fontSize: 25, fontWeight: 780 }}>{label}</div>
      <div style={{ fontSize: 16, color: active ? '#EBF7F6' : BODY, marginTop: 4 }}>{sub}</div>
    </div>
  </div>
);

const BatchJourneyCard = ({
  sesi,
  title,
  desc,
  highlight = false,
}: {
  sesi: string;
  title: string;
  desc: string;
  highlight?: boolean;
}) => (
  <div
    style={{
      borderRadius: 20,
      background: highlight ? INK_HEX : TINT_NEUTRAL,
      color: highlight ? '#FFFFFF' : INK,
      border: `2px solid ${highlight ? INK_HEX : RULE}`,
      padding: '22px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: highlight ? YELLOW : TEAL_HEX }}>
      {sesi}
    </div>
    <div>
      <div style={{ fontSize: 24, fontWeight: 780, marginTop: 8, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 18, lineHeight: 1.4, color: highlight ? '#E2E1DD' : BODY }}>{desc}</div>
    </div>
  </div>
);

const Slide13AIWorkflow: Page = () => {
  const [step, setStep] = useState(6);

  return (
    <Frame>
      <Eyebrow>Workflow AI Development · Standar Kerja</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        AI bukan langkah terakhir — AI adalah{' '}
        <Highlight color={HIGHLIGHT_TEAL}>bagian dari workflow</Highlight>.
      </h2>

      {/* 8-Step Grid (4x2) */}
      <div
        style={{
          ...abs(X0, 224, W, 316),
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 18,
        }}
      >
        <WorkflowTile num="01" label="PRD" sub="Acuan fitur & aturan" active={step === 0} onClick={() => setStep(0)} />
        <WorkflowTile num="02" label="Prompt" sub="Instruksi spesifik" active={step === 1} onClick={() => setStep(1)} />
        <WorkflowTile num="03" label="LLM" sub="Gemini API / Coding AI" active={step === 2} onClick={() => setStep(2)} />
        <WorkflowTile num="04" label="Review" sub="Cek UI, logic, & data" active={step === 3} onClick={() => setStep(3)} />
        <WorkflowTile num="05" label="Improve" sub="Perbaiki UX & edge case" active={step === 4} onClick={() => setStep(4)} />
        <WorkflowTile num="06" label="Testing" sub="Uji alur Chat & Admin" active={step === 5} onClick={() => setStep(5)} />
        <WorkflowTile num="07" label="Skill Audit" sub="Cek security & token" active={step === 6} onClick={() => setStep(6)} />
        <WorkflowTile num="08" label="Deploy" sub="Rilis produk cerdas" active={step === 7} onClick={() => setStep(7)} />
      </div>

      {/* Bottom Roadmap Continuity Sesi 1-5 */}
      <div style={{ ...abs(X0, 578, W), fontFamily: MONO, fontSize: 18, fontWeight: 780, color: BODY }}>
        PETA PERJALANAN URBANSTORE · BATCH 4
      </div>

      <div
        style={{
          ...abs(X0, 616, W, 324),
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }}
      >
        <BatchJourneyCard
          sesi="SESI 1 – 2"
          title="Prompt & PRD"
          desc="Merancang strategi produk & PRD_UrbanStore.md sebagai acuan AI Agent."
        />
        <BatchJourneyCard
          sesi="SESI 3"
          title="Landing Page"
          desc="Membangun identitas visual & presence awal toko fashion UrbanStore."
        />
        <BatchJourneyCard
          sesi="SESI 4"
          title="Web App MVP"
          desc="Admin input produk & konfirmasi order, Customer pilih size, cart, & checkout."
        />
        <BatchJourneyCard
          sesi="SESI 5 · HARI INI"
          title="Intelligent Product"
          desc="Floating Chat CS, AI Deskripsi Produk, Dokumen Analisis Penjualan, 9Router & Cost Opt."
          highlight
        />
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 14 — DEMO MENTOR                                                       */
/* ============================================================================ */

const DemoStepRow = ({
  num,
  title,
  detail,
}: {
  num: string;
  title: string;
  detail: string;
}) => (
  <div
    style={{
      borderRadius: 16,
      background: '#FFFFFF',
      border: `1.5px solid ${RULE}`,
      padding: '13px 20px',
      ...row,
      gap: 16,
    }}
  >
    <span
      style={{
        fontFamily: MONO,
        fontSize: 18,
        fontWeight: 780,
        color: TEAL_HEX,
        minWidth: 38,
      }}
    >
      {num}
    </span>
    <div>
      <span style={{ fontSize: 20, fontWeight: 740, color: INK }}>{title}: </span>
      <span style={{ fontSize: 19, color: BODY }}>{detail}</span>
    </div>
  </div>
);

const OutputBadgeRow = ({ text }: { text: string }) => (
  <div
    style={{
      borderRadius: 14,
      background: 'rgba(255,255,255,0.08)',
      border: '1.5px solid rgba(255,255,255,0.14)',
      padding: '15px 20px',
      ...row,
      gap: 14,
      fontSize: 20,
      fontWeight: 650,
      color: '#FFFFFF',
    }}
  >
    <span style={{ color: '#7CE8E4', fontWeight: 800, fontSize: 22 }}>✓</span>
    <span>{text}</span>
  </div>
);

const Slide14MentorDemo: Page = () => (
  <Frame>
    <Eyebrow>Demo Mentor · Live Walkthrough</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
      Live Demo: Menambahkan <Highlight color={HIGHLIGHT_TEAL}>Dua Sisi AI</Highlight> ke
      UrbanStore Sesi 4.
    </h2>

    {/* Left Column: 6 Demo Steps */}
    <div
      style={{
        ...abs(X0, 224, 980, 720),
        borderRadius: 26,
        background: TINT_NEUTRAL,
        border: `2px solid ${RULE}`,
        padding: '26px 30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
        SKENARIO LIVE DEMO MENTOR
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <DemoStepRow
          num="01"
          title="Google AI Studio & .env"
          detail="Membuat Gemini API Key di aistudio.google.com dan menyimpannya aman di Backend."
        />
        <DemoStepRow
          num="02"
          title="Backend AI Endpoints"
          detail="Membuat route /api/chat, /api/admin/describe, & /api/admin/analyze."
        />
        <DemoStepRow
          num="03"
          title="Customer: Floating Chat CS"
          detail="Uji tanya stok, konsultasi size via BB/TB, dan rekomendasi mix & match katalog."
        />
        <DemoStepRow
          num="04"
          title="Admin: AI Deskripsi Produk"
          detail="Klik Generate Deskripsi otomatis di Form Tambah Produk, review, lalu simpan."
        />
        <DemoStepRow
          num="05"
          title="Admin: Analisis Penjualan"
          detail="Generate dokumen analisis order Sesi 4 & rekomendasi strategi penjualan kedepan."
        />
        <DemoStepRow
          num="06"
          title="9Router, Skill Audit, & Git"
          detail="Hubungkan 9Router, uji switch model, jalankan Skill Audit, lalu Git Commit."
        />
      </div>

      <div style={{ fontFamily: MONO, fontSize: 16, color: BODY }}>
        Repository: UrbanStore Web App (Lanjutan Sesi 4)
      </div>
    </div>

    {/* Right Column: Output Demo */}
    <div
      style={{
        ...abs(1136, 224, 664, 720),
        borderRadius: 26,
        background: INK_HEX,
        color: '#FFFFFF',
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: YELLOW, marginBottom: 10 }}>
          OUTPUT DEMO YANG DIVERIFIKASI
        </div>
        <h3 style={{ ...headline(32), color: '#FFFFFF', marginBottom: 20 }}>
          Checklist Keberhasilan Demo
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          <OutputBadgeRow text="Floating Chat CS menjawab stok, BB/TB, & mix & match nyata" />
          <OutputBadgeRow text="AI Generate Deskripsi Produk berjalan di Form Admin" />
          <OutputBadgeRow text="Dokumen Analisis Penjualan & Strategi tampil rapi" />
          <OutputBadgeRow text="Gemini API Key aman di Backend + 9Router aktif" />
          <OutputBadgeRow text="Skill Audit memberi temuan & tersimpan di Git" />
        </div>
      </div>

      <div
        style={{
          borderRadius: 16,
          background: TEAL_HEX,
          padding: '16px 22px',
          fontSize: 19,
          fontWeight: 720,
          color: '#FFFFFF',
        }}
      >
        Siap lanjut ke sesi praktik peserta (Hands-on Session) →
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 15 — PRAKTIK & HANDS-ON CHALLENGE                                      */
/* ============================================================================ */

const ChallengeCard = ({
  num,
  role,
  title,
  desc,
  tint,
  accent,
}: {
  num: string;
  role: string;
  title: string;
  desc: string;
  tint: string;
  accent: string;
}) => (
  <div
    style={{
      borderRadius: 22,
      background: tint,
      border: `2px solid ${accent}`,
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div>
      <div style={{ ...row, justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: accent }}>{num}</span>
        <span
          style={{
            padding: '4px 12px',
            borderRadius: 99,
            background: '#FFFFFF',
            fontFamily: MONO,
            fontSize: 14,
            fontWeight: 740,
            color: INK,
          }}
        >
          {role}
        </span>
      </div>
      <div style={{ ...headline(25), marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 18, lineHeight: 1.38, color: BODY }}>{desc}</div>
    </div>
  </div>
);

const Slide15HandsOnChallenge: Page = () => (
  <Frame>
    <Eyebrow>Praktik &amp; Hands-on Session</Eyebrow>
    <h2 style={{ ...abs(X0, 128, W), ...headline(48) }}>
      Saatnya upgrade <Highlight color={HIGHLIGHT_TEAL}>UrbanStore-mu</Highlight> menjadi{' '}
      <Highlight>Intelligent Product</Highlight>!
    </h2>

    {/* 3x2 Challenge Grid */}
    <div
      style={{
        ...abs(X0, 212, W, 536),
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: '1fr 1fr',
        gap: 20,
      }}
    >
      <ChallengeCard
        num="CHALLENGE 01"
        role="GOOGLE AI STUDIO"
        title="Setup Gemini API di Backend"
        desc="Ambil API Key dari Google AI Studio dan simpan di .env Backend tanpa ekspos ke Frontend."
        tint={TINT_TEAL}
        accent={TEAL_HEX}
      />
      <ChallengeCard
        num="CHALLENGE 02"
        role="CUSTOMER"
        title="Floating Chat Asisten CS"
        desc="Buat floating chat untuk cek stok, konsultasi ukuran (BB & TB), dan rekomendasi mix & match."
        tint={TINT_YELLOW}
        accent="#946200"
      />
      <ChallengeCard
        num="CHALLENGE 03"
        role="STORE ADMIN"
        title="AI Generate Deskripsi Produk"
        desc="Pasang tombol generate deskripsi otomatis di Form Tambah Produk dari nama, kategori, & ukuran."
        tint={TINT_BLUE}
        accent="#2B6CB0"
      />
      <ChallengeCard
        num="CHALLENGE 04"
        role="STORE ADMIN"
        title="Dokumen Analisis Penjualan"
        desc="Olah data pesanan Sesi 4 menjadi dokumen analisis AI + rekomendasi strategi penjualan kedepan."
        tint={TINT_PINK}
        accent={CORAL_HEX}
      />
      <ChallengeCard
        num="CHALLENGE 05"
        role="UX & 9ROUTER"
        title="AI UX, 9Router, & Hemat Token"
        desc="Terapkan skeleton/loading state, retry, 9Router switch model, & ringkas payload katalog/order."
        tint={TINT_GREEN}
        accent="#2F7A43"
      />
      <ChallengeCard
        num="CHALLENGE 06"
        role="SKILL & GIT"
        title="Skill Audit & Git Commit"
        desc="Audit keamanan API key, anti-hallucination stok, perbaiki temuan, lalu commit rapi ke Git."
        tint={TINT_NEUTRAL}
        accent={INK_HEX}
      />
    </div>

    {/* Bottom Final Output Banner */}
    <div
      style={{
        ...abs(X0, 774, W, 174),
        borderRadius: 24,
        background: INK_HEX,
        color: '#FFFFFF',
        padding: '24px 36px',
        ...row,
        justifyContent: 'space-between',
      }}
    >
      <div style={{ maxWidth: 1240 }}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 17,
            fontWeight: 780,
            color: YELLOW,
            marginBottom: 6,
          }}
        >
          FINAL OUTPUT SESI 5 · URBANSTORE INTELLIGENT PRODUCT
        </div>
        <h3 style={{ ...headline(36), color: '#FFFFFF', marginBottom: 6 }}>
          Aplikasi Web E-Commerce Cerdas Siap Pakai
        </h3>
        <p style={{ margin: 0, fontSize: 20, lineHeight: 1.38, color: '#E2E1DD' }}>
          Floating Chat CS (Stok, BB/TB, Mix &amp; Match) · AI Deskripsi Produk · Dokumen Analisis
          &amp; Strategi Penjualan · Gemini API Aman · AI UX · 9Router · Cost Optimization.
        </p>
      </div>
      <div
        style={{
          padding: '16px 28px',
          borderRadius: 16,
          background: TEAL_HEX,
          color: '#FFFFFF',
          fontSize: 21,
          fontWeight: 780,
          whiteSpace: 'nowrap',
        }}
      >
        ✓ Siap Demo &amp; Review
      </div>
    </div>
  </Frame>
);

export const meta: SlideMeta = {
  title: '[VCB Batch 4] Sesi 5 - AI Feature Integration & Cost Optimization',
  createdAt: '2026-11-13T14:17:13.503Z',
  theme: 'swiss-japanese',
};

export const notes: (string | undefined)[] = [
  `Selamat datang di Sesi 5 Vibe Coding Bootcamp Batch 4: AI Feature Integration & AI Cost Optimization. Hari ini UrbanStore kita naik level dari aplikasi web fungsional menjadi produk cerdas.`,
  `Tujuan pembelajaran hari ini mencakup cara kerja LLM, setup Gemini API Key dari Google AI Studio secara aman, membangun fitur AI di sisi Customer & Admin, AI UX, AI Skill Audit, 9Router, dan Cost Optimization.`,
  `Studi kasus kita menghubungkan dua sisi dari Sesi 4: Customer mendapat Floating Chat Asisten CS (tanya stok, konsultasi BB/TB, mix & match katalog), sedangkan Store Admin mendapat AI Generate Deskripsi Produk & Dokumen Analisis Strategi Penjualan.`,
  `Pola dasar semua LLM sama: Input -> Prompt -> Model -> Output. Tekankan pentingnya grounding agar Gemini hanya merujuk produk dan transaksi nyata milik UrbanStore.`,
  `Tunjukkan cara mengambil Gemini API Key di Google AI Studio (aistudio.google.com) dan tegaskan aturan mutlak: simpan API Key di .env Backend, jangan pernah di Frontend!`,
  `Jelaskan detail 3 modul AI yang dibangun: Floating Chat CS di sudut toko, tombol Generate Deskripsi di Form Produk Admin, dan Dokumen Analisis & Strategi Penjualan di Dashboard Order Admin.`,
  `AI UX menjembatani jeda waktu respons LLM. Gunakan status loading kontekstual, skeleton, typing indicator, quick prompt chips, dan tombol retry.`,
  `Setelah fitur AI berjalan, gunakan AI Skill untuk mengaudit keamanan API key, mencegah halusinasi stok 0, dan mengoptimalkan payload sebelum rilis.`,
  `Kenalkan 9Router sebagai AI Router (bukan AI Model) yang menjadi satu endpoint untuk mengakses Gemini, OpenAI, Claude, DeepSeek, hingga Groq.`,
  `Jelaskan keuntungan 9Router: hemat biaya, mudah berpindah model tanpa mengubah logika aplikasi UrbanStore, dan punya cadangan saat provider terkena rate-limit.`,
  `Strategi Unlimited Coding with AI: mulai dari model ringan/gratis untuk task standar, gunakan model reasoning kuat hanya bila perlu, dan pindah provider via 9Router jika limit habis.`,
  `AI Cost Optimization: ringkas payload katalog untuk chat CS (cukup id, name, category, price, sizes, stock) dan kirim agregat transaksi untuk AI Analisis Penjualan — bisa menghemat hingga ~70% token.`,
  `Workflow AI Development: PRD -> Prompt -> LLM -> Review -> Improve -> Testing -> Skill Audit -> Deploy. Lihat kesinambungan UrbanStore dari Sesi 1 hingga Sesi 5.`,
  `Lakukan Live Demo berurutan: ambil API key Google AI Studio, buat backend endpoints, demo Floating Chat CS, demo Admin Generate Deskripsi & Dokumen Analisis Penjualan, pasang 9Router, audit Skill, dan Git Commit.`,
  `Saatnya Hands-on Session! Peserta melanjutkan repository UrbanStore dari Sesi 4 dengan 6 Challenge terstruktur hingga menghasilkan produk e-commerce cerdas.`,
];

export default [
  Slide01Cover,
  Slide02Objectives,
  Slide03TwoSidedStudyCase,
  Slide04HowAIWorks,
  Slide05GeminiIntegration,
  Slide06ThreeAIFeatures,
  Slide07AIUX,
  Slide08AISkillAudit,
  Slide09WhatIs9Router,
  Slide10Why9Router,
  Slide11UnlimitedCoding,
  Slide12AICostOptimization,
  Slide13AIWorkflow,
  Slide14MentorDemo,
  Slide15HandsOnChallenge,
] satisfies Page[];

