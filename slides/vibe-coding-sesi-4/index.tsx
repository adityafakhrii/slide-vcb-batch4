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

const SLIDE_ID = 'vibe-coding-sesi-4';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..800&family=Newsreader:ital,opsz,wght@1,6..72,400&family=JetBrains+Mono:wght@500;700&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;
const KEYFRAMES = `
@keyframes s4-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes s4-fade { from { opacity: 0 } to { opacity: 1 } }
.s4-interactive { transition: transform 0.18s cubic-bezier(0, 0, 0.2, 1), box-shadow 0.18s cubic-bezier(0, 0, 0.2, 1), background-color 0.18s ease; cursor: pointer; user-select: none; }
.s4-interactive:hover { transform: translateY(-2px); }
.s4-interactive:active { transform: translateY(0); }
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
  const id = `s4${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
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
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={4} />
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
    style={{ animation: live ? `s4-draw ${dur}s ${EASE_OUT} ${delay}s both` : undefined }}
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
        <span>Vibe Coding Bootcamp · Batch 4 · Sesi 4</span>
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
  <div style={root}>
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

const CoverWebAppArt = ({ live }: { live: boolean }) => (
  <Ink width={780} height={760} style={abs(1020, 110)}>
    {/* Soft ambient background circles */}
    <ellipse cx="400" cy="360" rx="360" ry="320" fill={TINT_TEAL} stroke="none" />
    <circle cx="660" cy="150" r="84" fill={YELLOW} stroke="none" />
    <circle cx="90" cy="560" r="74" fill={TINT_PINK} stroke="none" />

    {/* ================================================================ */}
    {/* 1. MAIN APP WINDOW: UrbanStore Web Application                    */}
    {/* ================================================================ */}
    <g transform="translate(30, 40)">
      {/* Browser Frame */}
      <rect x="0" y="0" width="560" height="340" rx="16" fill="#FFFFFF" />
      {/* Window Controls Header */}
      <path d="M0 44H560" />
      <circle cx="24" cy="22" r="5" fill={CORAL_HEX} stroke="none" />
      <circle cx="42" cy="22" r="5" fill={YELLOW} stroke="none" />
      <circle cx="60" cy="22" r="5" fill={GREEN} stroke="none" />

      {/* URL / Brand Pill */}
      <rect x="88" y="10" width="220" height="24" rx="6" fill={TINT_NEUTRAL} />
      <path d="M106 22h140" strokeWidth={2.4} />

      {/* Live State Badge */}
      <rect x="324" y="10" width="96" height="24" rx="12" fill={TINT_GREEN} stroke="none" />
      <circle cx="338" cy="22" r="3" fill={GREEN} stroke="none" />
      <path d="M348 22h60" stroke={GREEN} strokeWidth={2.2} />

      {/* Cart Icon & Badge on Header */}
      <rect x="436" y="8" width="108" height="28" rx="8" fill={TINT_PINK} />
      <path d="M452 26l4-12h24l3 12h-31z" fill="none" strokeWidth={2.2} />
      <circle cx="458" cy="29" r="2.5" fill={INK_HEX} stroke="none" />
      <circle cx="474" cy="29" r="2.5" fill={INK_HEX} stroke="none" />
      <circle cx="488" cy="14" r="8" fill={CORAL_HEX} stroke="none" />
      <path d="M485 14h6" stroke="#FFFFFF" strokeWidth={2.2} />
      <path d="M504 22h26" strokeWidth={2.4} />

      {/* Window Content: Split into Product Catalog (Left) & Cart Drawer (Right) */}

      {/* Left Column: Product Card */}
      <rect x="20" y="60" width="245" height="260" rx="12" fill={TINT_NEUTRAL} />
      {/* Product Image Box */}
      <rect x="36" y="74" width="213" height="110" rx="8" fill="#FFFFFF" />
      {/* Hoodie Graphic Outline */}
      <path d="M112 110l20-18 20 18-6 48h-28z" fill={TINT_TEAL} strokeWidth={2.4} />
      <path d="M132 92v24m-10-10l20 0" stroke={TEAL_HEX} strokeWidth={2.0} />
      {/* Product Title & Price */}
      <path d="M38 202h120" strokeWidth={3.0} />
      <path d="M38 220h80" stroke={CORAL_HEX} strokeWidth={3.2} />
      {/* Size Selector Chips */}
      <rect x="38" y="238" width="28" height="24" rx="4" fill="#FFFFFF" strokeWidth={2.0} />
      <rect x="74" y="238" width="28" height="24" rx="4" fill={TEAL_HEX} stroke="none" />
      <path d="M84 250h8" stroke="#FFFFFF" strokeWidth={2.4} />
      <rect x="110" y="238" width="28" height="24" rx="4" fill="#FFFFFF" strokeWidth={2.0} />
      {/* Add to Cart CTA */}
      <rect x="38" y="274" width="209" height="32" rx="6" fill={CORAL_HEX} stroke="none" />
      <path d="M72 290h140" stroke="#FFFFFF" strokeWidth={2.8} />

      {/* Right Column: Live Cart Drawer */}
      <rect x="280" y="60" width="260" height="260" rx="12" fill="#FFFFFF" strokeWidth={2.4} />
      {/* Cart Title Bar */}
      <rect x="294" y="74" width="232" height="26" rx="6" fill={TINT_YELLOW} />
      <path d="M308 87h120" strokeWidth={2.6} />
      {/* Cart Item 1 */}
      <rect x="294" y="110" width="232" height="42" rx="6" fill={TINT_NEUTRAL} />
      <circle cx="312" cy="131" r="10" fill={TINT_TEAL} />
      <path d="M332 126h96m-96 10h64" strokeWidth={2.2} />
      <rect x="500" y="123" width="16" height="16" rx="3" fill="#FFFFFF" />
      {/* Cart Item 2 */}
      <rect x="294" y="160" width="232" height="42" rx="6" fill={TINT_PINK} />
      <circle cx="312" cy="181" r="10" fill={TINT_PINK} />
      <path d="M332 176h84m-84 10h56" strokeWidth={2.2} />
      <rect x="500" y="173" width="16" height="16" rx="3" fill="#FFFFFF" />
      {/* Total & Checkout */}
      <path d="M294 214h232" strokeWidth={1.5} strokeDasharray="4 3" />
      <path d="M294 228h80m72 0h80" strokeWidth={2.6} />
      <rect x="294" y="246" width="232" height="34" rx="6" fill={INK_HEX} stroke="none" />
      <path d="M340 263h140" stroke="#FFFFFF" strokeWidth={2.8} />
    </g>

    {/* ================================================================ */}
    {/* 2. DATA FLOW CONNECTION PIPES (Animated)                          */}
    {/* ================================================================ */}
    {/* Left Pipe: Web App -> Checkout Invoice */}
    <path
      d="M170 380v80"
      strokeDasharray="6 4"
      stroke={TEAL_HEX}
      strokeWidth={3.0}
    />
    <polygon points="164,460 176,460 170,472" fill={TEAL_HEX} stroke="none" />
    {/* Payload Badge */}
    <rect x="110" y="408" width="120" height="24" rx="12" fill="#FFFFFF" strokeWidth={2.0} />
    <circle cx="122" cy="420" r="4" fill={TEAL_HEX} stroke="none" />
    <path d="M134 420h84" strokeWidth={2.0} />

    {/* Right Pipe: Web App <-> Database Engine */}
    <path
      d="M450 380c0 40 100 30 100 80"
      strokeDasharray="6 4"
      stroke={INK_HEX}
      strokeWidth={3.0}
    />
    <polygon points="544,460 556,460 550,472" fill={INK_HEX} stroke="none" />
    {/* API Badge */}
    <rect x="420" y="400" width="130" height="26" rx="13" fill="#FFFFFF" strokeWidth={2.2} />
    <circle cx="434" cy="413" r="4" fill={GREEN} stroke="none" />
    <path d="M448 413h88" strokeWidth={2.2} />

    {/* ================================================================ */}
    {/* 3. CHECKOUT INVOICE / PAYMENT STATUS (Bottom Left)                */}
    {/* ================================================================ */}
    <g transform="translate(30, 480)">
      <rect x="0" y="0" width="310" height="220" rx="16" fill="#FFFFFF" />
      {/* Invoice Header */}
      <rect x="0" y="0" width="310" height="42" rx="16" fill={TINT_YELLOW} />
      <path d="M0 42h310" />
      <circle cx="24" cy="21" r="7" fill={YELLOW} />
      <path d="M42 21h120" strokeWidth={2.8} />
      <rect x="210" y="10" width="84" height="22" rx="6" fill="#FFFFFF" />
      <path d="M222 21h60" strokeWidth={2.0} />

      {/* Invoice Content */}
      <path d="M24 64h150m-150 18h200m-200 18h130" strokeWidth={2.4} />

      {/* Total Amount Tag */}
      <rect x="24" y="114" width="262" height="38" rx="8" fill={TINT_NEUTRAL} />
      <circle cx="44" cy="133" r="6" fill={CORAL_HEX} stroke="none" />
      <path d="M60 133h80m40 0h60" strokeWidth={3.0} />

      {/* Admin Confirmation Toggle */}
      <rect x="24" y="164" width="262" height="38" rx="8" fill={TINT_TEAL} />
      <circle cx="44" cy="183" r="8" fill={TEAL_HEX} stroke="none" />
      <path d="M40 183l3 3 6-6" stroke="#FFFFFF" strokeWidth={2.2} />
      <path d="M64 183h160" strokeWidth={2.6} />
    </g>

    {/* ================================================================ */}
    {/* 4. DATABASE ENGINE (Bottom Right)                                 */}
    {/* ================================================================ */}
    <g transform="translate(390, 470)">
      {/* Multi-tiered 3D Database Cylinder */}
      {/* Bottom Plate */}
      <path d="M50 180c0 18 67 32 150 32s150-14 150-32v40c0 18-67 32-150 32s-150-14-150-32z" fill={TINT_NEUTRAL} />
      {/* Tier 3 Body */}
      <path d="M50 120c0 18 67 32 150 32s150-14 150-32v40c0 18-67 32-150 32s-150-14-150-32z" fill={TINT_YELLOW} />
      {/* Tier 2 Body */}
      <path d="M50 60c0 18 67 32 150 32s150-14 150-32v40c0 18-67 32-150 32s-150-14-150-32z" fill={TINT_BLUE} />
      {/* Tier 1 Body */}
      <path d="M50 0c0 18 67 32 150 32s150-14 150-32v40c0 18-67 32-150 32s-150-14-150-32z" fill={TINT_TEAL} />
      {/* Top Cap */}
      <ellipse cx="200" cy="0" rx="150" ry="32" fill="#FFFFFF" />
      <path d="M140 0h120" strokeWidth={3.0} />

      {/* Floating Table Entities */}
      <rect x="70" y="44" width="110" height="24" rx="6" fill="#FFFFFF" strokeWidth={2.0} />
      <path d="M84 56h82" stroke={TEAL_HEX} strokeWidth={2.4} />

      <rect x="220" y="104" width="110" height="24" rx="6" fill="#FFFFFF" strokeWidth={2.0} />
      <path d="M234 116h82" stroke={CORAL_HEX} strokeWidth={2.4} />

      <rect x="70" y="164" width="120" height="24" rx="6" fill="#FFFFFF" strokeWidth={2.0} />
      <path d="M84 176h92" stroke={INK_HEX} strokeWidth={2.4} />
    </g>

    {/* Sparkles & Accents */}
    <Sparkle x={10} y={120} s={0.9} fill={TEAL_HEX} />
    <Sparkle x={630} y={40} s={1.1} fill={YELLOW} />
    <Sparkle x={710} y={430} s={0.8} fill={PINK} />
    <Sparkle x={340} y={460} s={0.95} fill={TEAL_HEX} />
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
          VIBE CODING BOOTCAMP · BATCH 4 · SESI 4
        </span>
      </div>

      <h1 style={{ ...abs(X0, 210, 880), ...headline(108) }}>
        Build Web
        <br />
        Application.
      </h1>

      <p
        style={{
          ...abs(X0, 488, 840),
          margin: 0,
          fontSize: 38,
          fontFamily: SERIF,
          fontStyle: 'italic',
          lineHeight: 1.35,
          color: INK,
        }}
      >
        From <Highlight color={HIGHLIGHT_TEAL}>Landing Page</Highlight> to{' '}
        <Highlight>Functional Web App</Highlight>
      </p>

      <p
        style={{
          ...abs(X0, 578, 820),
          margin: 0,
          fontSize: 25,
          lineHeight: 1.52,
          color: BODY,
        }}
      >
        Mengembangkan <strong style={{ color: INK }}>UrbanStore Landing Page</strong> menjadi
        aplikasi web fungsional dengan <strong style={{ color: INK }}>Database Thinking</strong>:
        Admin mengelola produk &amp; pesanan, Customer memilih ukuran, belanja di keranjang, dan
        checkout.
      </p>

      <div style={{ ...abs(X0, 760), ...row, gap: 12 }}>
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
          01 · Store Admin Panel
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
          02 · Cart &amp; Checkout Flow
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
          One Prompt = One Feature
        </span>
      </div>

      <div style={{ ...abs(X0, 880), fontSize: 21, fontWeight: 650, color: SOFT }}>
        by CODEPOLITAN
      </div>

      <CoverWebAppArt live={live} />
      <CircleDoodle x={104} y={320} w={680} h={146} color={CORAL_HEX} live={live} delay={0.4} />
    </Frame>
  );
};

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
    className="s4-interactive"
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
        Hari ini kita beralih dari halaman statis menjadi{' '}
        <Highlight color={HIGHLIGHT_TEAL}>aplikasi web fungsional</Highlight> yang menghubungkan
        Penjual dan Pembeli.
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
        DUA SISI URBANSTORE WEB APP
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
            01 · SISI PENJUAL (STORE ADMIN)
          </span>
          <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 700, color: INK }}>
            /admin
          </span>
        </div>
        <div>
          <div style={{ ...headline(30), marginBottom: 6 }}>Kelola Produk &amp; Pesanan</div>
          <div style={{ fontSize: 20, lineHeight: 1.38, color: BODY }}>
            Menambah produk baru ke etalase dan mengonfirmasi pembayaran masuk.
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
            02 · SISI PEMBELI (CUSTOMER)
          </span>
          <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 700, color: CORAL_HEX }}>
            UrbanStore Shop
          </span>
        </div>
        <div>
          <div style={{ ...headline(30), marginBottom: 6 }}>Katalog, Cart, &amp; Checkout</div>
          <div style={{ fontSize: 20, lineHeight: 1.38, color: BODY }}>
            Memilih ukuran pakaian, mengelola keranjang, checkout, dan konfirmasi bayar.
          </div>
        </div>
      </div>

      <ObjectiveRow
        top={146}
        code="01"
        text="Mengubah Landing Page menjadi Fullstack Web Application."
        tag="Web App Transition"
        active={selected === 0}
        onClick={() => setSelected(0)}
      />
      <ObjectiveRow
        top={254}
        code="02"
        text="Memahami Database Thinking & relasi data e-commerce."
        tag="Database Thinking"
        active={selected === 1}
        onClick={() => setSelected(1)}
      />
      <ObjectiveRow
        top={362}
        code="03"
        text="Membangun fitur Admin: Tambah & Kelola Produk."
        tag="Product CRUD"
        accent
        active={selected === 2}
        onClick={() => setSelected(2)}
      />
      <ObjectiveRow
        top={470}
        code="04"
        text="Menampilkan produk dinamis & pemilihan ukuran (Size Picker)."
        tag="Dynamic Catalog"
        active={selected === 3}
        onClick={() => setSelected(3)}
      />
      <ObjectiveRow
        top={578}
        code="05"
        text="Membangun Shopping Cart, Checkout Form, & Order Invoice."
        tag="Cart & Checkout"
        accent
        active={selected === 4}
        onClick={() => setSelected(4)}
      />
      <ObjectiveRow
        top={686}
        code="06"
        text="Mengembangkan aplikasi bertahap (One Prompt = One Feature)."
        tag="Modular Prompting"
        active={selected === 5}
        onClick={() => setSelected(5)}
      />
      <ObjectiveRow
        top={794}
        code="07"
        text="Menerapkan disiplin Git Workflow selama development."
        tag="Git Hygiene"
        active={selected === 6}
        onClick={() => setSelected(6)}
      />
      <div style={{ ...abs(760, 902, 1040), borderTop: `1.5px solid ${RULE}` }} />
      <UnderlineDoodle x={X0} y={282} w={340} color={TEAL_HEX} live={live} />
    </Frame>
  );
};

const ScopeFeatureRow = ({
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
      padding: '12px 18px',
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
        minWidth: 32,
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

const Slide03UrbanStoreMVPScope: Page = () => {
  const live = useIsActivePage();
  const [focusRole, setFocusRole] = useState<'both' | 'admin' | 'customer'>('both');

  return (
    <Frame>
      <Eyebrow>Studi Kasus · UrbanStore Web Application MVP</Eyebrow>
      <h2 style={{ ...abs(X0, 132, W), ...headline(48) }}>
        Menghubungkan <Highlight color={HIGHLIGHT_TEAL}>Penjual (Admin)</Highlight> dan{' '}
        <Highlight>Pembeli (Customer)</Highlight> dalam satu aplikasi.
      </h2>

      <div
        onClick={() => setFocusRole(focusRole === 'admin' ? 'both' : 'admin')}
        className="s4-interactive"
        style={{
          ...abs(X0, 236, 816, 588),
          borderRadius: 26,
          background: TINT_TEAL,
          border: `2.5px solid ${focusRole === 'admin' ? INK_HEX : TEAL_HEX}`,
          opacity: focusRole === 'customer' ? 0.55 : 1,
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 780, color: TEAL_HEX }}>
              01 · STORE ADMIN (SISI PENJUAL)
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
              Route: /admin
            </span>
          </div>

          <h3 style={{ ...headline(36), marginBottom: 10 }}>Store Admin Dashboard</h3>
          <p style={{ margin: '0 0 18px', fontSize: 20, lineHeight: 1.4, color: BODY }}>
            <strong style={{ color: INK }}>Peran:</strong> mengisi etalase dengan produk nyata dan
            memverifikasi pesanan pelanggan.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ScopeFeatureRow
              code="A1"
              title="Tambah Produk Baru"
              desc="Input nama, kategori, harga, ukuran (S–XL), stok, & foto."
              accentColor={TEAL_HEX}
            />
            <ScopeFeatureRow
              code="A2"
              title="Kelola Katalog"
              desc="Melihat daftar produk aktif di etalase & ketersediaan stok."
              accentColor={TEAL_HEX}
            />
            <ScopeFeatureRow
              code="A3"
              title="Monitoring Pesanan"
              desc="Memantau seluruh order baru yang masuk dari customer."
              accentColor={TEAL_HEX}
            />
            <ScopeFeatureRow
              code="A4"
              title="Konfirmasi Pembayaran"
              desc="Verifikasi transfer & ubah status ke Lunas & Diproses."
              accentColor={TEAL_HEX}
            />
          </div>
        </div>
      </div>

      <div
        onClick={() => setFocusRole(focusRole === 'customer' ? 'both' : 'customer')}
        className="s4-interactive"
        style={{
          ...abs(984, 236, 816, 588),
          borderRadius: 26,
          background: TINT_YELLOW,
          border: `2.5px solid ${focusRole === 'customer' ? INK_HEX : '#E2B93B'}`,
          opacity: focusRole === 'admin' ? 0.55 : 1,
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 780, color: '#946200' }}>
              02 · CUSTOMER (SISI PEMBELI)
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
              Guest Checkout
            </span>
          </div>

          <h3 style={{ ...headline(36), marginBottom: 10 }}>Customer Storefront</h3>
          <p style={{ margin: '0 0 18px', fontSize: 20, lineHeight: 1.4, color: BODY }}>
            <strong style={{ color: INK }}>Peran:</strong> menjelajahi produk yang diinput admin,
            memilih ukuran, dan menyelesaikan pembelian.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ScopeFeatureRow
              code="C1"
              title="Katalog & Pilih Ukuran"
              desc="Melihat produk dari admin & memilih size (S, M, L, XL)."
              accentColor={CORAL_HEX}
            />
            <ScopeFeatureRow
              code="C2"
              title="Shopping Cart"
              desc="Tambah barang, ubah kuantitas, hapus item, & hitung subtotal."
              accentColor={CORAL_HEX}
            />
            <ScopeFeatureRow
              code="C3"
              title="Checkout Pengiriman"
              desc="Isi nama, WhatsApp, & alamat tanpa wajib buat akun."
              accentColor={CORAL_HEX}
            />
            <ScopeFeatureRow
              code="C4"
              title="Invoice & Konfirmasi"
              desc="Lihat nomor order unik, rekening toko, & klik Sudah Transfer."
              accentColor={CORAL_HEX}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          ...abs(X0, 854, W, 96),
          borderRadius: 20,
          background: INK_HEX,
          color: '#FFFFFF',
          padding: '0 36px',
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, gap: 16, fontSize: 22, fontWeight: 650 }}>
          <span style={{ color: YELLOW, fontFamily: MONO, fontWeight: 780 }}>CATATAN SCOPE:</span>
          <span>
            Fokus pada logika inti aplikasi. Payment gateway otomatis (Midtrans/Xendit) &amp; API
            kurir real-time belum termasuk di MVP Sesi 4.
          </span>
        </div>
        <span style={{ fontFamily: MONO, fontSize: 18, color: '#7CE8E4', whiteSpace: 'nowrap' }}>
          PRD Sesi 2 → MVP Sesi 4
        </span>
      </div>

      <UnderlineDoodle x={X0} y={190} w={460} color={TEAL_HEX} live={live} delay={0.4} />
    </Frame>
  );
};

const QuestionBox = ({ num, title, sub }: { num: string; title: string; sub: string }) => (
  <div
    style={{
      borderRadius: 16,
      background: '#FFFFFF',
      border: `1.5px solid ${RULE}`,
      padding: '16px 20px',
    }}
  >
    <div style={{ ...row, gap: 12, marginBottom: 4 }}>
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: TINT_TEAL,
          color: TEAL_HEX,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: MONO,
          fontSize: 16,
          fontWeight: 780,
        }}
      >
        {num}
      </span>
      <span style={{ fontSize: 21, fontWeight: 740, color: INK }}>{title}</span>
    </div>
    <div style={{ fontSize: 18, color: BODY, paddingLeft: 40 }}>{sub}</div>
  </div>
);

const EntityCard = ({
  code,
  name,
  fields,
  selected,
  onClick,
}: {
  code: string;
  name: string;
  fields: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s4-interactive"
    style={{
      borderRadius: 16,
      padding: '18px 20px',
      background: selected ? TINT_TEAL : TINT_NEUTRAL,
      border: `2px solid ${selected ? TEAL_HEX : 'transparent'}`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ ...row, justifyContent: 'space-between', marginBottom: 6 }}>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 18,
          fontWeight: 780,
          color: selected ? TEAL_HEX : SOFT,
        }}
      >
        {code}
      </span>
      {selected && <span style={{ fontSize: 14, fontWeight: 760, color: TEAL_HEX }}>ENTITY</span>}
    </div>
    <div>
      <div style={{ fontSize: 22, fontWeight: 750, color: INK, marginBottom: 4 }}>{name}</div>
      <div style={{ fontFamily: MONO, fontSize: 16, lineHeight: 1.35, color: BODY }}>{fields}</div>
    </div>
  </div>
);

const Slide04DatabaseThinking: Page = () => {
  const [activeEntity, setActiveEntity] = useState(0);

  return (
    <Frame>
      <Eyebrow>Database Thinking · Fondasi Aplikasi Web</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        Sebelum membuat fitur,{' '}
        <Highlight color={HIGHLIGHT_TEAL}>rancang struktur datanya terlebih dahulu.</Highlight>
      </h2>
      <p style={{ ...abs(X0, 198, 1420), margin: 0, fontSize: 23, color: BODY }}>
        Tanpa rancangan data yang jelas, AI Agent akan menghasilkan komponen yang tidak saling
        tersambung.
      </p>

      <div
        style={{
          ...abs(X0, 264, 680, 682),
          borderRadius: 24,
          background: TINT_NEUTRAL,
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 760, color: TEAL_HEX }}>
            3 PERTANYAAN WAJIB
          </div>
          <h3 style={{ ...headline(34), margin: '8px 0 18px' }}>Cara Berpikir Berbasis Data</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <QuestionBox
              num="1"
              title="Data apa yang dibutuhkan?"
              sub="Entitas & atribut apa saja yang wajib disimpan."
            />
            <QuestionBox
              num="2"
              title="Siapa yang membuat & membaca?"
              sub="Admin input produk → Customer baca & buat order."
            />
            <QuestionBox
              num="3"
              title="Bagaimana perubahan statusnya?"
              sub="Keranjang → Order Dibuat → Menunggu Bayar → Lunas."
            />
          </div>
        </div>

        <div
          style={{
            borderRadius: 16,
            background: INK_HEX,
            color: '#FFFFFF',
            padding: '18px 22px',
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 17,
              fontWeight: 780,
              color: YELLOW,
              marginBottom: 4,
            }}
          >
            RULE UTAMA
          </div>
          <div style={{ fontSize: 20, lineHeight: 1.38, fontWeight: 640 }}>
            Feature yang baik selalu diawali dari desain data yang baik.
          </div>
        </div>
      </div>

      <div
        style={{
          ...abs(836, 264, 964, 682),
          borderRadius: 24,
          background: '#FFFFFF',
          border: `2px solid ${INK_HEX}`,
          padding: '28px 34px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 760, color: CORAL_HEX }}>
              DATA MODELING
            </div>
            <h3 style={{ ...headline(34), marginTop: 4 }}>6 Entitas Utama UrbanStore</h3>
          </div>
          <span
            style={{
              padding: '6px 16px',
              borderRadius: 99,
              background: TINT_NEUTRAL,
              fontFamily: MONO,
              fontSize: 17,
              fontWeight: 700,
              color: BODY,
            }}
          >
            Klik entitas untuk fokus
          </span>
        </div>

        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          <EntityCard
            code="E1"
            name="Products"
            fields="id, name, categoryId, price, stock, sizes[], imageUrl"
            selected={activeEntity === 0}
            onClick={() => setActiveEntity(0)}
          />
          <EntityCard
            code="E2"
            name="Categories"
            fields="id, name (Men, Women, Essentials, Outerwear), slug"
            selected={activeEntity === 1}
            onClick={() => setActiveEntity(1)}
          />
          <EntityCard
            code="E3"
            name="Cart Items"
            fields="sessionId, productId, selectedSize, qty, subtotal"
            selected={activeEntity === 2}
            onClick={() => setActiveEntity(2)}
          />
          <EntityCard
            code="E4"
            name="Orders"
            fields="orderId (#URB-001), customerName, phone, address, total"
            selected={activeEntity === 3}
            onClick={() => setActiveEntity(3)}
          />
          <EntityCard
            code="E5"
            name="Order Items"
            fields="orderId, productId, productName, size, priceAtPurchase, qty"
            selected={activeEntity === 4}
            onClick={() => setActiveEntity(4)}
          />
          <EntityCard
            code="E6"
            name="Payment Status"
            fields="orderId, method (Bank Transfer), status (Pending / Paid)"
            selected={activeEntity === 5}
            onClick={() => setActiveEntity(5)}
          />
        </div>
      </div>
    </Frame>
  );
};

const FlowStepRow = ({
  num,
  actor,
  text,
  isAdmin,
}: {
  num: string;
  actor: string;
  text: string;
  isAdmin?: boolean;
}) => (
  <div
    style={{
      ...row,
      gap: 14,
      background: '#FFFFFF',
      padding: '11px 16px',
      borderRadius: 12,
      border: `1.5px solid ${RULE}`,
    }}
  >
    <span
      style={{
        fontFamily: MONO,
        fontSize: 17,
        fontWeight: 780,
        color: isAdmin ? TEAL_HEX : '#946200',
        minWidth: 26,
      }}
    >
      {num}
    </span>
    <span
      style={{
        padding: '3px 10px',
        borderRadius: 6,
        background: isAdmin ? TINT_TEAL : TINT_YELLOW,
        color: isAdmin ? TEAL_HEX : '#946200',
        fontFamily: MONO,
        fontSize: 14,
        fontWeight: 780,
        minWidth: 84,
        textAlign: 'center',
      }}
    >
      {actor}
    </span>
    <span style={{ fontSize: 19, fontWeight: 640, color: INK }}>{text}</span>
  </div>
);

const Slide05EntityAndBusinessFlow: Page = () => {
  const [selectedNode, setSelectedNode] = useState(1);

  const nodeNotes = [
    'Categories mengelompokkan koleksi pakaian (Men, Women, Essentials, Outerwear).',
    'Products dibuat oleh Admin dan langsung menjadi sumber data utama katalog.',
    'Cart Items menyimpan pilihan ukuran dan kuantitas belanja sementara milik Customer.',
    'Orders menyimpan transaksi resmi beserta snapshot item dan alamat pengiriman.',
    'Payment Status mencatat tahapan pembayaran dari Menunggu Transfer hingga Lunas.',
  ];

  return (
    <Frame>
      <Eyebrow>Entity Relationship &amp; Business Flow</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(48) }}>
        Alur lengkap dari <Highlight color={HIGHLIGHT_TEAL}>input produk</Highlight> sampai{' '}
        <Highlight>konfirmasi pembayaran lunas.</Highlight>
      </h2>

      <div
        style={{
          ...abs(X0, 236, 820, 710),
          borderRadius: 24,
          background: '#FFFFFF',
          border: `2.5px solid ${INK_HEX}`,
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
                RELASI ANTAR ENTITAS
              </div>
              <h3 style={{ ...headline(34), marginTop: 4 }}>Alur Perpindahan Data</h3>
            </div>
            <span style={{ fontSize: 17, color: SOFT }}>Klik blok untuk detail</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div
              onClick={() => setSelectedNode(0)}
              className="s4-interactive"
              style={{
                ...row,
                justifyContent: 'space-between',
                padding: '15px 20px',
                borderRadius: 14,
                background: selectedNode === 0 ? TINT_TEAL : TINT_NEUTRAL,
                border: `2px solid ${selectedNode === 0 ? TEAL_HEX : 'transparent'}`,
              }}
            >
              <span style={{ fontSize: 21, fontWeight: 740 }}>01 · Category (1) ─── (N) Product</span>
              <span style={{ fontFamily: MONO, fontSize: 16, color: TEAL_HEX }}>KATALOG</span>
            </div>

            <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 800, color: SOFT }}>
              ↓ Admin Input Produk
            </div>

            <div
              onClick={() => setSelectedNode(1)}
              className="s4-interactive"
              style={{
                ...row,
                justifyContent: 'space-between',
                padding: '15px 20px',
                borderRadius: 14,
                background: selectedNode === 1 ? TINT_TEAL : TINT_NEUTRAL,
                border: `2px solid ${selectedNode === 1 ? TEAL_HEX : 'transparent'}`,
              }}
            >
              <span style={{ fontSize: 21, fontWeight: 740 }}>
                02 · Product (1) ─── (N) Cart Item
              </span>
              <span style={{ fontFamily: MONO, fontSize: 16, color: TEAL_HEX }}>PILIH SIZE</span>
            </div>

            <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 800, color: SOFT }}>
              ↓ Customer Checkout
            </div>

            <div
              onClick={() => setSelectedNode(2)}
              className="s4-interactive"
              style={{
                ...row,
                justifyContent: 'space-between',
                padding: '15px 20px',
                borderRadius: 14,
                background: selectedNode === 2 ? TINT_TEAL : TINT_NEUTRAL,
                border: `2px solid ${selectedNode === 2 ? TEAL_HEX : 'transparent'}`,
              }}
            >
              <span style={{ fontSize: 21, fontWeight: 740 }}>
                03 · Cart Items ───► Order &amp; Order Items
              </span>
              <span style={{ fontFamily: MONO, fontSize: 16, color: CORAL_HEX }}>TRANSAKSI</span>
            </div>

            <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 800, color: SOFT }}>
              ↓ Transfer &amp; Verifikasi Admin
            </div>

            <div
              onClick={() => setSelectedNode(4)}
              className="s4-interactive"
              style={{
                ...row,
                justifyContent: 'space-between',
                padding: '15px 20px',
                borderRadius: 14,
                background: selectedNode === 4 ? TINT_TEAL : TINT_NEUTRAL,
                border: `2px solid ${selectedNode === 4 ? TEAL_HEX : 'transparent'}`,
              }}
            >
              <span style={{ fontSize: 21, fontWeight: 740 }}>
                04 · Order (1) ─── (1) Payment Status
              </span>
              <span style={{ fontFamily: MONO, fontSize: 16, color: '#946200' }}>STATUS</span>
            </div>
          </div>
        </div>

        <div
          style={{
            borderRadius: 16,
            background: TINT_TEAL,
            border: `1.5px solid ${TEAL_HEX}`,
            padding: '16px 20px',
            fontSize: 19,
            fontWeight: 640,
            color: INK,
          }}
        >
          {nodeNotes[selectedNode]}
        </div>
      </div>

      <div
        style={{
          ...abs(976, 236, 824, 710),
          borderRadius: 24,
          background: TINT_NEUTRAL,
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: CORAL_HEX }}>
            END-TO-END BUSINESS FLOW
          </div>
          <h3 style={{ ...headline(34), margin: '4px 0 18px' }}>7 Tahap Transaksi UrbanStore</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <FlowStepRow
              num="01"
              actor="ADMIN"
              text="Input produk fashion baru (nama, harga, ukuran, foto)."
              isAdmin
            />
            <FlowStepRow
              num="02"
              actor="CUSTOMER"
              text="Melihat produk yang baru tayang di etalase katalog."
            />
            <FlowStepRow
              num="03"
              actor="CUSTOMER"
              text="Memilih ukuran pakaian (S/M/L/XL) & masukkan ke Cart."
            />
            <FlowStepRow
              num="04"
              actor="CUSTOMER"
              text="Mengisi form pengiriman & menyelesaikan Checkout."
            />
            <FlowStepRow
              num="05"
              actor="CUSTOMER"
              text="Menerima Invoice (#URB-001) & nomor rekening toko."
            />
            <FlowStepRow
              num="06"
              actor="CUSTOMER"
              text="Melakukan transfer bank & klik 'Saya Sudah Transfer'."
            />
            <FlowStepRow
              num="07"
              actor="ADMIN"
              text="Memeriksa pesanan masuk & klik 'Konfirmasi Lunas'."
              isAdmin
            />
          </div>
        </div>
      </div>
    </Frame>
  );
};

const StepChainItem = ({
  num,
  title,
  active,
  onClick,
}: {
  num: string;
  title: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s4-interactive"
    style={{
      ...row,
      justifyContent: 'space-between',
      padding: '11px 18px',
      borderRadius: 12,
      background: active ? INK_HEX : '#FFFFFF',
      color: active ? '#FFFFFF' : INK,
      border: `1.5px solid ${active ? INK_HEX : RULE}`,
    }}
  >
    <div style={{ ...row, gap: 14 }}>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 17,
          fontWeight: 780,
          color: active ? YELLOW : TEAL_HEX,
        }}
      >
        {num}
      </span>
      <span style={{ fontSize: 20, fontWeight: 680 }}>{title}</span>
    </div>
    <span style={{ fontFamily: MONO, fontSize: 15, color: active ? '#7CE8E4' : SOFT }}>
      1 Prompt
    </span>
  </div>
);

const Slide06IncrementalDevelopment: Page = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Frame>
      <Eyebrow>Bangun Fitur Secara Bertahap · Modular Prompting</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        Jangan minta AI membuat seluruh aplikasi sekaligus.{' '}
        <Highlight color={HIGHLIGHT}>One Prompt = One Feature.</Highlight>
      </h2>

      <div
        style={{
          ...abs(X0, 236, 760, 710),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: 24,
            background: TINT_PINK,
            border: `2px solid ${CORAL_HEX}`,
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: CORAL_HEX }}>
              ✕ KESALAHAN PEMULA
            </div>
            <h3 style={{ ...headline(34), margin: '6px 0 16px' }}>Prompt Raksasa Sekaligus</h3>

            <div
              style={{
                borderRadius: 16,
                background: '#FFFFFF',
                border: `1.5px solid ${CORAL_HEX}`,
                padding: '18px 22px',
                fontSize: 20,
                fontStyle: 'italic',
                lineHeight: 1.42,
                color: INK,
                marginBottom: 20,
              }}
            >
              “AI, buatkan website UrbanStore lengkap dengan halaman admin tambah produk, katalog,
              keranjang belanja, checkout, dan laporan penjualan.”
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ ...row, gap: 12, fontSize: 21, fontWeight: 650, color: INK }}>
                <span style={{ color: CORAL_HEX, fontWeight: 800 }}>✕</span>
                <span>Output AI terpotong karena batas token / context limit.</span>
              </div>
              <div style={{ ...row, gap: 12, fontSize: 21, fontWeight: 650, color: INK }}>
                <span style={{ color: CORAL_HEX, fontWeight: 800 }}>✕</span>
                <span>Banyak tombol yang hanya tampilan tanpa logika.</span>
              </div>
              <div style={{ ...row, gap: 12, fontSize: 21, fontWeight: 650, color: INK }}>
                <span style={{ color: CORAL_HEX, fontWeight: 800 }}>✕</span>
                <span>Sulit direview dan sulit melacak sumber bug.</span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderRadius: 22,
            background: INK_HEX,
            color: '#FFFFFF',
            padding: '22px 28px',
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: YELLOW }}>
            PRINSIP UTAMA SESI 4
          </div>
          <div style={{ fontSize: 23, fontWeight: 740, marginTop: 4 }}>
            Buat 1 Fitur → Uji di Browser → Git Commit → Lanjut Fitur Berikutnya.
          </div>
        </div>
      </div>

      <div
        style={{
          ...abs(916, 236, 884, 710),
          borderRadius: 24,
          background: TINT_TEAL,
          border: `2px solid ${TEAL_HEX}`,
          padding: '28px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
              ✓ WORKFLOW YANG BENAR
            </span>
            <span style={{ fontFamily: MONO, fontSize: 17, color: INK }}>7 Tahap Terukur</span>
          </div>
          <h3 style={{ ...headline(34), marginBottom: 18 }}>Urutan Pembangunan Fitur</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <StepChainItem
              num="STEP 01"
              title="Setup Data Schema & Form Tambah Produk Admin"
              active={activeStep === 0}
              onClick={() => setActiveStep(0)}
            />
            <StepChainItem
              num="STEP 02"
              title="Tampilkan Produk Admin di Katalog Depan Customer"
              active={activeStep === 1}
              onClick={() => setActiveStep(1)}
            />
            <StepChainItem
              num="STEP 03"
              title="Modal / Halaman Detail Produk & Size Picker (S–XL)"
              active={activeStep === 2}
              onClick={() => setActiveStep(2)}
            />
            <StepChainItem
              num="STEP 04"
              title="Sistem Shopping Cart (Add, Update Qty, Subtotal)"
              active={activeStep === 3}
              onClick={() => setActiveStep(3)}
            />
            <StepChainItem
              num="STEP 05"
              title="Formulir Checkout & Validasi Alamat Pengiriman"
              active={activeStep === 4}
              onClick={() => setActiveStep(4)}
            />
            <StepChainItem
              num="STEP 06"
              title="Order Generation & Halaman Invoice Pembayaran"
              active={activeStep === 5}
              onClick={() => setActiveStep(5)}
            />
            <StepChainItem
              num="STEP 07"
              title="Dashboard Pesanan Admin & Konfirmasi Lunas"
              active={activeStep === 6}
              onClick={() => setActiveStep(6)}
            />
          </div>
        </div>
      </div>
    </Frame>
  );
};

const Slide07AuthAndRole: Page = () => {
  const [roleView, setRoleView] = useState<'admin' | 'customer'>('admin');

  return (
    <Frame>
      <Eyebrow>Authentication &amp; Role · Hak Akses Pengguna</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        Pisahkan pengalaman <Highlight color={HIGHLIGHT_TEAL}>Store Admin</Highlight> dan{' '}
        <Highlight>Customer</Highlight> secara tegas.
      </h2>

      <div
        style={{
          ...abs(X0, 236, 760, 710),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 18,
        }}
      >
        <div
          onClick={() => setRoleView('admin')}
          className="s4-interactive"
          style={{
            flex: 1,
            borderRadius: 24,
            background: TINT_TEAL,
            border: `2.5px solid ${roleView === 'admin' ? INK_HEX : TEAL_HEX}`,
            padding: '24px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ ...row, justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
                ROLE 01 · STORE ADMIN
              </span>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: 99,
                  background: '#FFFFFF',
                  fontFamily: MONO,
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                Area Terproteksi (/admin)
              </span>
            </div>
            <h3 style={{ ...headline(32), marginBottom: 10 }}>Pengelola Toko</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 20 }}>
              <div>• Menambah produk baru &amp; mengatur stok pakaian.</div>
              <div>• Melihat seluruh daftar pesanan masuk dari pembeli.</div>
              <div>• Memverifikasi transfer &amp; mengubah status menjadi Lunas.</div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setRoleView('customer')}
          className="s4-interactive"
          style={{
            flex: 1,
            borderRadius: 24,
            background: TINT_YELLOW,
            border: `2.5px solid ${roleView === 'customer' ? INK_HEX : '#E2B93B'}`,
            padding: '24px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ ...row, justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: '#946200' }}>
                ROLE 02 · CUSTOMER
              </span>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: 99,
                  background: INK_HEX,
                  color: '#FFFFFF',
                  fontFamily: MONO,
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                Tanpa Wajib Login
              </span>
            </div>
            <h3 style={{ ...headline(32), marginBottom: 10 }}>Pembeli (Frictionless)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 20 }}>
              <div>• Menjelajahi katalog &amp; memilih ukuran tanpa buat akun.</div>
              <div>• Checkout praktis cukup dengan Nama, WhatsApp, &amp; Alamat.</div>
              <div>• Membuka halaman Invoice pesanan melalui Order ID unik.</div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          ...abs(916, 236, 884, 710),
          borderRadius: 24,
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
              CONTOH PROMPT · ROLE &amp; ACCESS
            </span>
            <span style={{ fontFamily: MONO, fontSize: 16, color: '#7CE8E4' }}>
              Google AI Studio
            </span>
          </div>

          <div
            style={{
              borderRadius: 18,
              background: 'rgba(255,255,255,0.06)',
              border: '1.5px solid rgba(255,255,255,0.14)',
              padding: '22px 26px',
              fontFamily: MONO,
              fontSize: 18,
              lineHeight: 1.55,
              color: '#F5F4F0',
            }}
          >
            <div>
              <span style={{ color: '#7CE8E4', fontWeight: 700 }}>Role:</span> Senior Fullstack
              Developer.
            </div>
            <div style={{ marginTop: 10 }}>
              <span style={{ color: YELLOW, fontWeight: 700 }}>Task:</span> Buat pemisahan akses
              Store Admin dan Customer pada aplikasi UrbanStore.
            </div>
            <div style={{ marginTop: 10 }}>
              <span style={{ color: '#FF8DA1', fontWeight: 700 }}>Context:</span>
              <br />
              1. Customer dapat melihat katalog, memilih ukuran, mengelola keranjang, dan checkout
              tanpa wajib registrasi akun.
              <br />
              2. Store Admin memiliki akses ke dashboard (/admin) untuk menginput produk baru dan
              memantau pesanan masuk.
            </div>
            <div style={{ marginTop: 10 }}>
              <span style={{ color: GREEN, fontWeight: 700 }}>Format:</span> Sediakan switcher mode
              Customer / Admin di header agar mudah diuji, dan pastikan form tambah produk hanya
              tampil di area Admin.
            </div>
          </div>
        </div>

        <div
          style={{
            borderRadius: 14,
            background: 'rgba(60,165,161,0.2)',
            border: `1.5px solid ${TEAL_HEX}`,
            padding: '14px 20px',
            fontSize: 19,
            color: '#FFFFFF',
          }}
        >
          <strong style={{ color: '#7CE8E4' }}>Tip:</strong> Jangan mewajibkan Customer membuat
          akun di awal agar proses pengujian belanja berjalan cepat.
        </div>
      </div>
    </Frame>
  );
};

const FormFieldPreview = ({ label, value, mono }: { label: string; value: string; mono?: boolean }) => (
  <div
    style={{
      borderRadius: 12,
      background: TINT_NEUTRAL,
      border: `1.5px solid ${RULE}`,
      padding: '11px 16px',
      ...row,
      justifyContent: 'space-between',
    }}
  >
    <span style={{ fontSize: 18, fontWeight: 640, color: BODY }}>{label}</span>
    <span
      style={{
        fontFamily: mono ? MONO : undefined,
        fontSize: 19,
        fontWeight: 740,
        color: INK,
      }}
    >
      {value}
    </span>
  </div>
);

const Slide08AdminProductManagement: Page = () => {
  const [saved, setSaved] = useState(true);

  return (
    <Frame>
      <Eyebrow>Fitur 1 · Admin Tambah &amp; Kelola Produk</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        Isi etalase toko dengan <Highlight color={HIGHLIGHT_TEAL}>produk nyata</Highlight> dari
        dashboard Admin.
      </h2>
      <p style={{ ...abs(X0, 198, 1460), margin: 0, fontSize: 23, color: BODY }}>
        Sebelum customer bisa berbelanja, Store Admin memasukkan data produk pakaian ke dalam
        database aplikasi.
      </p>

      <div
        style={{
          ...abs(X0, 264, 860, 682),
          borderRadius: 24,
          background: '#FFFFFF',
          border: `2.5px solid ${INK_HEX}`,
          padding: '28px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
                ADMIN PRODUCT FORM
              </div>
              <h3 style={{ ...headline(34), marginTop: 4 }}>Form Tambah Produk Baru</h3>
            </div>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: 99,
                background: TINT_TEAL,
                color: TEAL_HEX,
                fontFamily: MONO,
                fontSize: 16,
                fontWeight: 760,
              }}
            >
              /admin/products
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <FormFieldPreview label="Nama Produk" value="Urban Oversized Heavy Tee" />
            <FormFieldPreview label="Kategori" value="Essentials · Men & Women" />
            <FormFieldPreview label="Harga Satuan (Rp)" value="Rp 189.000" mono />
            <FormFieldPreview label="Pilihan Ukuran Tersedia" value="[✓] S   [✓] M   [✓] L   [✓] XL" mono />
            <FormFieldPreview label="Jumlah Stok Awal" value="25 pcs" mono />
            <FormFieldPreview label="URL Foto Produk" value="https://.../oversized-tee.jpg" mono />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSaved(!saved)}
          className="s4-interactive"
          style={{
            width: '100%',
            padding: '16px 24px',
            borderRadius: 14,
            border: 'none',
            background: saved ? TEAL_HEX : INK_HEX,
            color: '#FFFFFF',
            fontSize: 21,
            fontWeight: 760,
            ...row,
            justifyContent: 'center',
            gap: 12,
          }}
        >
          <span>{saved ? '✓ Produk Tersimpan & Tayang di Katalog' : '+ Simpan Produk ke Etalase'}</span>
        </button>
      </div>

      <div
        style={{
          ...abs(1016, 264, 784, 682),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: 24,
            background: TINT_TEAL,
            border: `2px solid ${TEAL_HEX}`,
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
              VALIDASI &amp; LOGIKA DATA
            </div>
            <h3 style={{ ...headline(34), margin: '6px 0 18px' }}>Aturan Input Produk</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div
                style={{
                  background: '#FFFFFF',
                  padding: '14px 18px',
                  borderRadius: 12,
                  fontSize: 20,
                  fontWeight: 640,
                }}
              >
                1. Nama produk, kategori, dan harga wajib diisi.
              </div>
              <div
                style={{
                  background: '#FFFFFF',
                  padding: '14px 18px',
                  borderRadius: 12,
                  fontSize: 20,
                  fontWeight: 640,
                }}
              >
                2. Harga dan jumlah stok harus lebih besar dari 0.
              </div>
              <div
                style={{
                  background: '#FFFFFF',
                  padding: '14px 18px',
                  borderRadius: 12,
                  fontSize: 20,
                  fontWeight: 640,
                }}
              >
                3. Minimal memilih 1 varian ukuran pakaian (S/M/L/XL).
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderRadius: 24,
            background: TINT_YELLOW,
            border: `2px solid #E2B93B`,
            padding: '24px 32px',
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 18,
              fontWeight: 780,
              color: '#946200',
              marginBottom: 6,
            }}
          >
            EFEK LANGSUNG (REAL-TIME SYNC)
          </div>
          <div style={{ fontSize: 21, lineHeight: 1.42, fontWeight: 650, color: INK }}>
            Begitu Admin menekan tombol Simpan, produk baru otomatis masuk ke state/database dan{' '}
            <strong>langsung muncul di halaman katalog Customer</strong> untuk dibeli!
          </div>
        </div>
      </div>
    </Frame>
  );
};

const Slide09ShoppingCartAndSize: Page = () => {
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL'>('L');
  const [qty, setQty] = useState(2);
  const unitPrice = 189000;

  return (
    <Frame>
      <Eyebrow>Fitur 2 · Customer Shopping Cart &amp; Size Selection</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        Pilih ukuran pakaian dan hitung{' '}
        <Highlight color={HIGHLIGHT_TEAL}>total keranjang secara otomatis.</Highlight>
      </h2>

      <div
        style={{
          ...abs(X0, 236, 820, 710),
          borderRadius: 24,
          background: '#FFFFFF',
          border: `2.5px solid ${INK_HEX}`,
          padding: '28px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
              INTERACTIVE CART SIMULATOR
            </span>
            <span style={{ fontFamily: MONO, fontSize: 16, color: SOFT }}>
              Coba pilih ukuran &amp; qty
            </span>
          </div>

          <h3 style={{ ...headline(34), marginBottom: 6 }}>Urban Oversized Heavy Tee</h3>
          <div style={{ fontFamily: MONO, fontSize: 24, fontWeight: 780, color: TEAL_HEX, marginBottom: 20 }}>
            Rp 189.000
          </div>

          <div style={{ fontSize: 19, fontWeight: 720, marginBottom: 10 }}>
            1. Pilih Ukuran Pakaian (Wajib):
          </div>
          <div style={{ ...row, gap: 12, marginBottom: 24 }}>
            {(['S', 'M', 'L', 'XL'] as const).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setSelectedSize(sz)}
                className="s4-interactive"
                style={{
                  width: 68,
                  height: 54,
                  borderRadius: 12,
                  border: `2px solid ${selectedSize === sz ? INK_HEX : RULE}`,
                  background: selectedSize === sz ? INK_HEX : TINT_NEUTRAL,
                  color: selectedSize === sz ? '#FFFFFF' : INK,
                  fontFamily: MONO,
                  fontSize: 20,
                  fontWeight: 780,
                }}
              >
                {sz}
              </button>
            ))}
          </div>

          <div style={{ fontSize: 19, fontWeight: 720, marginBottom: 10 }}>
            2. Atur Jumlah Barang (Quantity):
          </div>
          <div style={{ ...row, gap: 16 }}>
            <button
              type="button"
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="s4-interactive"
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                border: `1.5px solid ${INK_HEX}`,
                background: '#FFFFFF',
                fontSize: 24,
                fontWeight: 780,
              }}
            >
              −
            </button>
            <span style={{ fontFamily: MONO, fontSize: 26, fontWeight: 780, minWidth: 44, textAlign: 'center' }}>
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty(qty + 1)}
              className="s4-interactive"
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                border: `1.5px solid ${INK_HEX}`,
                background: '#FFFFFF',
                fontSize: 24,
                fontWeight: 780,
              }}
            >
              +
            </button>
          </div>
        </div>

        <div
          style={{
            borderRadius: 18,
            background: INK_HEX,
            color: '#FFFFFF',
            padding: '20px 26px',
            ...row,
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontFamily: MONO, fontSize: 16, color: YELLOW }}>
              CART ITEM · SIZE {selectedSize} × {qty} PCS
            </div>
            <div style={{ fontSize: 20, fontWeight: 650, marginTop: 4 }}>Subtotal Keranjang</div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 28, fontWeight: 780, color: '#7CE8E4' }}>
            Rp {(unitPrice * qty).toLocaleString('id-ID')}
          </div>
        </div>
      </div>

      <div
        style={{
          ...abs(976, 236, 824, 710),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: 24,
            background: TINT_NEUTRAL,
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: CORAL_HEX }}>
              ALUR KERJA SHOPPING CART
            </div>
            <h3 style={{ ...headline(34), margin: '6px 0 18px' }}>4 Komponen Logika Keranjang</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ScopeFeatureRow
                code="01"
                title="Size Picker Wajib"
                desc="Cegah Add to Cart sebelum ukuran pakaian dipilih."
                accentColor={TEAL_HEX}
              />
              <ScopeFeatureRow
                code="02"
                title="Snapshot Item"
                desc="Simpan Product ID, Nama, Ukuran, Harga Satuan, & Qty."
                accentColor={TEAL_HEX}
              />
              <ScopeFeatureRow
                code="03"
                title="Update & Delete"
                desc="Tombol +/- mengubah kuantitas dan tombol hapus item."
                accentColor={TEAL_HEX}
              />
              <ScopeFeatureRow
                code="04"
                title="Kalkulasi Otomatis"
                desc="Subtotal dihitung ulang setiap kali qty berubah."
                accentColor={TEAL_HEX}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            borderRadius: 24,
            background: TINT_TEAL,
            border: `2px solid ${TEAL_HEX}`,
            padding: '22px 30px',
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 18,
              fontWeight: 780,
              color: TEAL_HEX,
              marginBottom: 4,
            }}
          >
            TIPS PENTING
          </div>
          <div style={{ fontSize: 20, lineHeight: 1.4, fontWeight: 640, color: INK }}>
            Pisahkan baris item di keranjang jika ukurannya berbeda (contoh: 1 baju ukuran M dan 1
            baju yang sama ukuran L disimpan sebagai 2 baris berbeda).
          </div>
        </div>
      </div>
    </Frame>
  );
};

const Slide10CheckoutAndOrderCreation: Page = () => {
  const [shipping, setShipping] = useState<'reg' | 'exp'>('reg');
  const subtotal = 378000;
  const shippingCost = shipping === 'reg' ? 15000 : 30000;

  return (
    <Frame>
      <Eyebrow>Fitur 3 · Checkout Form &amp; Order Generation</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        Ubah isi keranjang menjadi <Highlight color={HIGHLIGHT_TEAL}>pesanan resmi</Highlight>{' '}
        dengan Order ID unik.
      </h2>

      <div
        style={{
          ...abs(X0, 236, 820, 710),
          borderRadius: 24,
          background: TINT_NEUTRAL,
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
            CHECKOUT FORM (GUEST CHECKOUT)
          </div>
          <h3 style={{ ...headline(34), margin: '6px 0 18px' }}>Data Pengiriman Pembeli</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <FormFieldPreview label="Nama Penerima" value="Budi Santoso" />
            <FormFieldPreview label="Nomor WhatsApp" value="0812-3456-7890" mono />
            <FormFieldPreview label="Email" value="budi.santoso@email.com" mono />
            <FormFieldPreview label="Alamat Lengkap" value="Jl. Kemang Raya No. 12, Jakarta Selatan" />
          </div>

          <div style={{ fontSize: 19, fontWeight: 720, margin: '18px 0 10px' }}>
            Pilih Metode Pengiriman:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button
              type="button"
              onClick={() => setShipping('reg')}
              className="s4-interactive"
              style={{
                padding: '14px 16px',
                borderRadius: 12,
                border: `2px solid ${shipping === 'reg' ? TEAL_HEX : RULE}`,
                background: shipping === 'reg' ? TINT_TEAL : '#FFFFFF',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 740, color: INK }}>Regular Shipping</div>
              <div style={{ fontFamily: MONO, fontSize: 17, color: TEAL_HEX, marginTop: 2 }}>
                Rp 15.000
              </div>
            </button>
            <button
              type="button"
              onClick={() => setShipping('exp')}
              className="s4-interactive"
              style={{
                padding: '14px 16px',
                borderRadius: 12,
                border: `2px solid ${shipping === 'exp' ? TEAL_HEX : RULE}`,
                background: shipping === 'exp' ? TINT_TEAL : '#FFFFFF',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 740, color: INK }}>Express Next Day</div>
              <div style={{ fontFamily: MONO, fontSize: 17, color: TEAL_HEX, marginTop: 2 }}>
                Rp 30.000
              </div>
            </button>
          </div>
        </div>

        <div
          style={{
            borderRadius: 16,
            background: INK_HEX,
            color: '#FFFFFF',
            padding: '16px 22px',
            ...row,
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 700 }}>Total Tagihan (Subtotal + Ongkir)</span>
          <span style={{ fontFamily: MONO, fontSize: 24, fontWeight: 780, color: YELLOW }}>
            Rp {(subtotal + shippingCost).toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      <div
        style={{
          ...abs(976, 236, 824, 710),
          borderRadius: 24,
          background: '#FFFFFF',
          border: `2.5px solid ${INK_HEX}`,
          padding: '28px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: CORAL_HEX }}>
            PROSES PEMBUATAN PESANAN
          </div>
          <h3 style={{ ...headline(34), margin: '6px 0 18px' }}>Apa yang Terjadi Saat Submit?</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <FlowStepRow
              num="01"
              actor="SYSTEM"
              text="Validasi seluruh kolom nama, WhatsApp, dan alamat pengiriman."
              isAdmin
            />
            <FlowStepRow
              num="02"
              actor="SYSTEM"
              text="Generate Nomor Order Unik (contoh: #URB-2026-001)."
              isAdmin
            />
            <FlowStepRow
              num="03"
              actor="SYSTEM"
              text="Simpan snapshot item belanja & total harga ke tabel Orders."
              isAdmin
            />
            <FlowStepRow
              num="04"
              actor="SYSTEM"
              text="Set status awal pesanan menjadi 'Menunggu Pembayaran'."
              isAdmin
            />
            <FlowStepRow
              num="05"
              actor="SYSTEM"
              text="Kosongkan isi keranjang belanja (Cart Reset)."
              isAdmin
            />
            <FlowStepRow
              num="06"
              actor="CUSTOMER"
              text="Arahkan ke halaman Invoice & Petunjuk Transfer Bank."
            />
          </div>
        </div>

        <div
          style={{
            borderRadius: 16,
            background: TINT_YELLOW,
            border: `1.5px solid #E2B93B`,
            padding: '16px 22px',
            fontSize: 19,
            fontWeight: 650,
            color: INK,
          }}
        >
          <strong style={{ color: '#946200' }}>Penting:</strong> Simpan harga barang pada saat
          dibeli (snapshot) agar riwayat invoice tidak berubah jika Admin mengubah harga produk di
          kemudian hari.
        </div>
      </div>
    </Frame>
  );
};

const Slide11InvoiceAndManualPayment: Page = () => {
  const [paidClicked, setPaidClicked] = useState(false);

  return (
    <Frame>
      <Eyebrow>Fitur 4 · Invoice, Pembayaran Manual, &amp; Konfirmasi</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(48) }}>
        Gunakan <Highlight color={HIGHLIGHT_TEAL}>transfer bank manual</Highlight> untuk memvalidasi
        alur bisnis MVP dengan cepat.
      </h2>

      <div
        style={{
          ...abs(X0, 236, 840, 710),
          borderRadius: 24,
          background: '#FFFFFF',
          border: `2.5px solid ${INK_HEX}`,
          padding: '28px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
                INVOICE PESANAN PELANGGAN
              </div>
              <h3 style={{ ...headline(34), marginTop: 4 }}>Order #URB-2026-001</h3>
            </div>
            <span
              style={{
                padding: '8px 16px',
                borderRadius: 99,
                background: paidClicked ? TINT_TEAL : TINT_YELLOW,
                color: paidClicked ? TEAL_HEX : '#946200',
                fontFamily: MONO,
                fontSize: 16,
                fontWeight: 780,
              }}
            >
              {paidClicked ? '● Menunggu Verifikasi Admin' : '● Menunggu Pembayaran'}
            </span>
          </div>

          <div
            style={{
              borderRadius: 18,
              background: INK_HEX,
              color: '#FFFFFF',
              padding: '20px 24px',
              marginBottom: 18,
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 16, color: YELLOW, marginBottom: 4 }}>
              INSTRUKSI TRANSFER BANK MANUAL
            </div>
            <div style={{ fontSize: 24, fontWeight: 780, marginBottom: 4 }}>
              Bank BCA · 123-456-7890
            </div>
            <div style={{ fontSize: 18, color: '#D8D7D4' }}>
              a.n. PT UrbanStore Fashion Indonesia
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <FormFieldPreview label="Item Belanja" value="2× Urban Oversized Heavy Tee (Size L)" />
            <FormFieldPreview label="Penerima" value="Budi Santoso · Jakarta Selatan" />
            <FormFieldPreview label="Total Nominal Transfer" value="Rp 393.000" mono />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPaidClicked(!paidClicked)}
          className="s4-interactive"
          style={{
            width: '100%',
            padding: '16px 24px',
            borderRadius: 14,
            border: 'none',
            background: paidClicked ? TEAL_HEX : CORAL_HEX,
            color: '#FFFFFF',
            fontSize: 21,
            fontWeight: 780,
          }}
        >
          {paidClicked
            ? '✓ Konfirmasi Terkirim ke Admin (Klik untuk Reset)'
            : 'Saya Sudah Transfer → Beri Tahu Admin'}
        </button>
      </div>

      <div
        style={{
          ...abs(1000, 236, 800, 710),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: 24,
            background: TINT_YELLOW,
            border: `2px solid #E2B93B`,
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: '#946200' }}>
              STRATEGI MVP
            </div>
            <h3 style={{ ...headline(34), margin: '6px 0 18px' }}>
              Mengapa Pembayaran Manual?
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ScopeFeatureRow
                code="01"
                title="Implementasi Cepat"
                desc="Tidak perlu menunggu verifikasi legalitas akun merchant."
                accentColor="#946200"
              />
              <ScopeFeatureRow
                code="02"
                title="Fokus Alur Bisnis"
                desc="Memastikan relasi produk, cart, dan order berjalan sempurna."
                accentColor="#946200"
              />
              <ScopeFeatureRow
                code="03"
                title="Tanpa Biaya Komisi"
                desc="Nol biaya potongan per transaksi selama fase pengujian."
                accentColor="#946200"
              />
              <ScopeFeatureRow
                code="04"
                title="Siap Di-upgrade"
                desc="Mudah dihubungkan ke QRIS / Payment Gateway di versi v2."
                accentColor="#946200"
              />
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
};

const Slide12AdminOrderDashboard: Page = () => {
  const [order1Paid, setOrder1Paid] = useState(false);

  return (
    <Frame>
      <Eyebrow>Fitur 5 · Dashboard Monitoring Pesanan Admin</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        Pantau pesanan masuk dan{' '}
        <Highlight color={HIGHLIGHT_TEAL}>konfirmasi pembayaran pelanggan.</Highlight>
      </h2>

      <div
        style={{
          ...abs(X0, 236, W, 152),
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 22,
        }}
      >
        <div
          style={{
            borderRadius: 22,
            background: TINT_NEUTRAL,
            border: `1.5px solid ${RULE}`,
            padding: '22px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 760, color: BODY }}>
            TOTAL PESANAN MASUK
          </span>
          <span style={{ ...headline(44), color: INK }}>12 Pesanan</span>
        </div>

        <div
          style={{
            borderRadius: 22,
            background: TINT_YELLOW,
            border: `2px solid #E2B93B`,
            padding: '22px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 760, color: '#946200' }}>
            MENUNGGU KONFIRMASI ADMIN
          </span>
          <span style={{ ...headline(44), color: INK }}>{order1Paid ? '0 Pesanan' : '1 Pesanan'}</span>
        </div>

        <div
          style={{
            borderRadius: 22,
            background: TINT_TEAL,
            border: `2px solid ${TEAL_HEX}`,
            padding: '22px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 760, color: TEAL_HEX }}>
            OMZET TERKONFIRMASI
          </span>
          <span style={{ ...headline(44), color: INK }}>
            {order1Paid ? 'Rp 4.283.000' : 'Rp 3.890.000'}
          </span>
        </div>
      </div>

      <div
        style={{
          ...abs(X0, 414, W, 532),
          borderRadius: 24,
          background: '#FFFFFF',
          border: `2.5px solid ${INK_HEX}`,
          padding: '26px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: CORAL_HEX }}>
                ADMIN ORDER MANAGEMENT (/admin/orders)
              </div>
              <h3 style={{ ...headline(32), marginTop: 4 }}>Daftar Transaksi Pelanggan</h3>
            </div>
            <span style={{ fontSize: 18, color: SOFT }}>
              Klik tombol Konfirmasi Lunas untuk simulasi
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                ...row,
                justifyContent: 'space-between',
                padding: '18px 22px',
                borderRadius: 16,
                background: order1Paid ? TINT_TEAL : TINT_YELLOW,
                border: `2px solid ${order1Paid ? TEAL_HEX : '#E2B93B'}`,
              }}
            >
              <div style={{ ...row, gap: 24 }}>
                <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 780 }}>
                  #URB-2026-001
                </span>
                <div>
                  <div style={{ fontSize: 21, fontWeight: 740 }}>Budi Santoso (0812-3456-7890)</div>
                  <div style={{ fontSize: 18, color: BODY }}>
                    2× Urban Oversized Heavy Tee (Size L) · Jakarta Selatan
                  </div>
                </div>
              </div>

              <div style={{ ...row, gap: 20 }}>
                <span style={{ fontFamily: MONO, fontSize: 21, fontWeight: 780 }}>Rp 393.000</span>
                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: 99,
                    background: '#FFFFFF',
                    fontFamily: MONO,
                    fontSize: 16,
                    fontWeight: 760,
                    color: order1Paid ? TEAL_HEX : '#946200',
                  }}
                >
                  {order1Paid ? '✓ Lunas & Diproses' : 'Menunggu Verifikasi'}
                </span>
                <button
                  type="button"
                  onClick={() => setOrder1Paid(!order1Paid)}
                  className="s4-interactive"
                  style={{
                    padding: '10px 20px',
                    borderRadius: 10,
                    border: 'none',
                    background: order1Paid ? INK_HEX : TEAL_HEX,
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: 760,
                  }}
                >
                  {order1Paid ? 'Batalkan' : '✓ Konfirmasi Lunas'}
                </button>
              </div>
            </div>

            <div
              style={{
                ...row,
                justifyContent: 'space-between',
                padding: '18px 22px',
                borderRadius: 16,
                background: TINT_NEUTRAL,
              }}
            >
              <div style={{ ...row, gap: 24 }}>
                <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 780 }}>
                  #URB-2026-002
                </span>
                <div>
                  <div style={{ fontSize: 21, fontWeight: 740 }}>Siti Rahma (0813-9876-5432)</div>
                  <div style={{ fontSize: 18, color: BODY }}>
                    1× Minimalist Work Jacket (Size M) · Bandung
                  </div>
                </div>
              </div>

              <div style={{ ...row, gap: 20 }}>
                <span style={{ fontFamily: MONO, fontSize: 21, fontWeight: 780 }}>Rp 364.000</span>
                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: 99,
                    background: TINT_TEAL,
                    fontFamily: MONO,
                    fontSize: 16,
                    fontWeight: 760,
                    color: TEAL_HEX,
                  }}
                >
                  ✓ Lunas &amp; Dikirim
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderRadius: 14,
            background: INK_HEX,
            color: '#FFFFFF',
            padding: '14px 22px',
            ...row,
            justifyContent: 'space-between',
            fontSize: 19,
          }}
        >
          <span>
            Status yang diperbarui oleh Admin otomatis terlihat pada halaman pelacakan pesanan
            Customer.
          </span>
          <span style={{ fontFamily: MONO, color: YELLOW }}>Two-Way Data Sync</span>
        </div>
      </div>
    </Frame>
  );
};

const CommitRow = ({ step, msg, desc }: { step: string; msg: string; desc: string }) => (
  <div
    style={{
      borderRadius: 14,
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.14)',
      padding: '13px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}
  >
    <div style={{ ...row, justifyContent: 'space-between' }}>
      <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 740, color: '#7CE8E4' }}>
        git commit -m &quot;{msg}&quot;
      </span>
      <span style={{ fontFamily: MONO, fontSize: 15, color: YELLOW }}>{step}</span>
    </div>
    <div style={{ fontSize: 17, color: '#D0CFCC' }}>{desc}</div>
  </div>
);

const Slide13GitWorkflow: Page = () => {
  return (
    <Frame>
      <Eyebrow>Git Workflow &amp; Best Practice Development</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        Setiap fitur yang selesai dan teruji{' '}
        <Highlight color={HIGHLIGHT}>wajib langsung di-commit ke Git.</Highlight>
      </h2>

      <div
        style={{
          ...abs(X0, 236, 740, 710),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <div
          style={{
            borderRadius: 24,
            background: TINT_TEAL,
            border: `2px solid ${TEAL_HEX}`,
            padding: '26px 30px',
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
            SIKLUS DEVELOPMENT
          </div>
          <h3 style={{ ...headline(32), margin: '6px 0 16px' }}>Disiplin Per Fitur</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ScopeFeatureRow
              code="01"
              title="Pilih 1 Fitur dari PRD"
              desc="Fokus pada satu modul kecil."
              accentColor={TEAL_HEX}
            />
            <ScopeFeatureRow
              code="02"
              title="Prompt & Generate"
              desc="Berikan konteks data & batasan jelas."
              accentColor={TEAL_HEX}
            />
            <ScopeFeatureRow
              code="03"
              title="Testing Fungsional"
              desc="Uji klik tombol, form, & perubahan data."
              accentColor={TEAL_HEX}
            />
            <ScopeFeatureRow
              code="04"
              title="Git Commit"
              desc="Simpan checkpoint sebelum lanjut fitur baru."
              accentColor={CORAL_HEX}
            />
          </div>
        </div>

        <div
          style={{
            flex: 1,
            borderRadius: 24,
            background: TINT_YELLOW,
            border: `2px solid #E2B93B`,
            padding: '24px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: '#946200' }}>
            CHECKLIST SEBELUM COMMIT
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10, fontSize: 20, fontWeight: 650 }}>
            <div>✓ Fitur berjalan normal tanpa error console.</div>
            <div>✓ Tidak merusak fitur yang sudah dibuat sebelumnya.</div>
            <div>✓ Tampilan rapi di desktop maupun mobile.</div>
          </div>
        </div>
      </div>

      <div
        style={{
          ...abs(896, 236, 904, 710),
          borderRadius: 24,
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
              CONTOH RIWAYAT COMMIT URBANSTORE
            </span>
            <span style={{ fontFamily: MONO, fontSize: 16, color: '#7CE8E4' }}>
              Minimal 5 Commit
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <CommitRow
              step="COMMIT 01"
              msg="feat: build admin product management and add product form"
              desc="Admin dapat menginput produk pakaian baru ke dalam katalog."
            />
            <CommitRow
              step="COMMIT 02"
              msg="feat: render dynamic products and add size selector"
              desc="Katalog depan menampilkan produk dari admin lengkap dengan pilihan ukuran."
            />
            <CommitRow
              step="COMMIT 03"
              msg="feat: implement shopping cart with quantity and subtotal"
              desc="Keranjang belanja dapat menambah item, ubah qty, dan hitung total."
            />
            <CommitRow
              step="COMMIT 04"
              msg="feat: create checkout form and generate unique order record"
              desc="Formulir pengiriman customer menghasilkan nomor invoice unik."
            />
            <CommitRow
              step="COMMIT 05"
              msg="feat: build admin order dashboard and payment confirmation"
              desc="Admin dapat memantau pesanan masuk dan mengonfirmasi pembayaran lunas."
            />
          </div>
        </div>

        <div style={{ fontFamily: MONO, fontSize: 18, color: YELLOW }}>
          💡 Jika prompt berikutnya merusak kode, cukup kembali ke commit terakhir yang stabil.
        </div>
      </div>
    </Frame>
  );
};

const DemoStepTile = ({
  num,
  role,
  title,
  done,
  onClick,
}: {
  num: string;
  role: 'ADMIN' | 'CUSTOMER' | 'GIT';
  title: string;
  done: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s4-interactive"
    style={{
      borderRadius: 16,
      padding: '16px 18px',
      background: done ? TINT_TEAL : '#FFFFFF',
      border: `2px solid ${done ? TEAL_HEX : RULE}`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 148,
    }}
  >
    <div style={{ ...row, justifyContent: 'space-between' }}>
      <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX }}>
        {num}
      </span>
      <span
        style={{
          padding: '3px 10px',
          borderRadius: 6,
          background:
            role === 'ADMIN' ? INK_HEX : role === 'CUSTOMER' ? TINT_YELLOW : TINT_PINK,
          color: role === 'ADMIN' ? '#FFFFFF' : role === 'CUSTOMER' ? '#946200' : CORAL_HEX,
          fontFamily: MONO,
          fontSize: 13,
          fontWeight: 780,
        }}
      >
        {role}
      </span>
    </div>
    <div style={{ fontSize: 19, fontWeight: 680, lineHeight: 1.32, color: INK }}>{title}</div>
  </div>
);

const Slide14MentorDemo: Page = () => {
  const [d0, setD0] = useState(true);
  const [d1, setD1] = useState(true);
  const [d2, setD2] = useState(true);
  const [d3, setD3] = useState(false);
  const [d4, setD4] = useState(false);
  const [d5, setD5] = useState(false);
  const [d6, setD6] = useState(false);
  const [d7, setD7] = useState(false);
  const [d8, setD8] = useState(false);

  const count = [d0, d1, d2, d3, d4, d5, d6, d7, d8].filter(Boolean).length;

  return (
    <Frame>
      <Eyebrow>Demo Mentor · End-to-End Live Walkthrough</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(48) }}>
        Simulasi langsung alur{' '}
        <Highlight color={HIGHLIGHT_TEAL}>Penjual &amp; Pembeli</Highlight> di UrbanStore.
      </h2>

      <div
        style={{
          ...abs(X0, 236, 1140, 710),
          borderRadius: 24,
          background: TINT_NEUTRAL,
          padding: '26px 30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
                LIVE DEMO CHECKLIST
              </div>
              <h3 style={{ ...headline(34), marginTop: 4 }}>9 Langkah Demo Instruktur</h3>
            </div>
            <span
              style={{
                padding: '6px 16px',
                borderRadius: 99,
                background: '#FFFFFF',
                fontFamily: MONO,
                fontSize: 18,
                fontWeight: 760,
              }}
            >
              {count} / 9 Selesai
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            <DemoStepTile
              num="01"
              role="ADMIN"
              title="Masuk ke halaman Admin & tambah produk baru 'Urban Oversized Tee'."
              done={d0}
              onClick={() => setD0(!d0)}
            />
            <DemoStepTile
              num="02"
              role="CUSTOMER"
              title="Buka katalog toko & pastikan produk baru langsung tampil."
              done={d1}
              onClick={() => setD1(!d1)}
            />
            <DemoStepTile
              num="03"
              role="CUSTOMER"
              title="Pilih ukuran 'L' pada detail produk & klik Tambah ke Keranjang."
              done={d2}
              onClick={() => setD2(!d2)}
            />
            <DemoStepTile
              num="04"
              role="CUSTOMER"
              title="Buka Cart Drawer, ubah jumlah menjadi 2 pcs, & cek subtotal."
              done={d3}
              onClick={() => setD3(!d3)}
            />
            <DemoStepTile
              num="05"
              role="CUSTOMER"
              title="Isi form Checkout dengan nama, WhatsApp, & alamat pengiriman."
              done={d4}
              onClick={() => setD4(!d4)}
            />
            <DemoStepTile
              num="06"
              role="CUSTOMER"
              title="Lihat halaman Invoice (#URB-2026-001) & rekening BCA toko."
              done={d5}
              onClick={() => setD5(!d5)}
            />
            <DemoStepTile
              num="07"
              role="CUSTOMER"
              title="Klik tombol 'Saya Sudah Transfer' pada halaman Invoice."
              done={d6}
              onClick={() => setD6(!d6)}
            />
            <DemoStepTile
              num="08"
              role="ADMIN"
              title="Buka Dashboard Admin, cek pesanan masuk, & klik Konfirmasi Lunas."
              done={d7}
              onClick={() => setD7(!d7)}
            />
            <DemoStepTile
              num="09"
              role="GIT"
              title="Simpan perubahan fitur yang sudah teruji dengan Git Commit."
              done={d8}
              onClick={() => setD8(!d8)}
            />
          </div>
        </div>

        <div style={{ fontSize: 18, color: BODY }}>
          Klik kartu untuk menandai tahapan demo yang sedang berlangsung.
        </div>
      </div>

      <div
        style={{
          ...abs(1292, 236, 508, 710),
          borderRadius: 24,
          background: INK_HEX,
          color: '#FFFFFF',
          padding: '32px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 18,
              fontWeight: 780,
              color: YELLOW,
              marginBottom: 10,
            }}
          >
            TARGET HASIL DEMO
          </div>
          <h3 style={{ ...headline(40), color: '#FFFFFF', lineHeight: 1.14, marginBottom: 20 }}>
            UrbanStore Fullstack MVP
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 20, color: '#E2E1DD' }}>
            <div>✓ Produk dari Admin tampil di katalog.</div>
            <div>✓ Pilihan ukuran &amp; keranjang akurat.</div>
            <div>✓ Checkout menghasilkan Order ID unik.</div>
            <div>✓ Invoice menampilkan instruksi transfer.</div>
            <div>✓ Admin dapat mengonfirmasi lunas.</div>
            <div>✓ Riwayat commit Git tercatat rapi.</div>
          </div>
        </div>

        <div
          style={{
            borderRadius: 16,
            background: 'rgba(255,255,255,0.08)',
            padding: '18px 20px',
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 16, color: '#7CE8E4', marginBottom: 6 }}>
            PROGRESS DEMO
          </div>
          <div
            style={{
              height: 10,
              borderRadius: 99,
              background: 'rgba(255,255,255,0.16)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(count / 9) * 100}%`,
                height: '100%',
                background: '#7CE8E4',
                transition: 'width 0.25s ease',
              }}
            />
          </div>
        </div>
      </div>
    </Frame>
  );
};

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
      borderRadius: 20,
      background: tint,
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div>
      <div style={{ ...row, justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: accent }}>
          {num}
        </span>
        <span
          style={{
            padding: '3px 10px',
            borderRadius: 99,
            background: '#FFFFFF',
            fontFamily: MONO,
            fontSize: 14,
            fontWeight: 760,
            color: INK,
          }}
        >
          {role}
        </span>
      </div>
      <h3 style={{ ...headline(26), marginBottom: 8 }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 18, lineHeight: 1.38, color: BODY }}>{desc}</p>
    </div>
  </div>
);

const Slide15HandsOnChallenge: Page = () => {
  return (
    <Frame>
      <Eyebrow>Praktik &amp; Hands-on Challenge · Sesi 4</Eyebrow>
      <h2 style={{ ...abs(X0, 128, W), ...headline(54) }}>
        Saatnya Membangun <Highlight color={HIGHLIGHT_TEAL}>UrbanStore Web App!</Highlight>
      </h2>

      <div
        style={{
          ...abs(X0, 224, W, 526),
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: '1fr 1fr',
          gap: 20,
        }}
      >
        <ChallengeCard
          num="CHALLENGE 01"
          role="STORE ADMIN"
          title="Tambah & Kelola Produk"
          desc="Buat form admin untuk input produk baru (Nama, Kategori, Harga, Ukuran S–XL, Stok, & Foto)."
          tint={TINT_TEAL}
          accent={TEAL_HEX}
        />
        <ChallengeCard
          num="CHALLENGE 02"
          role="CUSTOMER"
          title="Katalog Dinamis & Size Picker"
          desc="Tampilkan produk yang diinput admin ke etalase utama lengkap dengan pemilihan ukuran."
          tint={TINT_YELLOW}
          accent="#946200"
        />
        <ChallengeCard
          num="CHALLENGE 03"
          role="CUSTOMER"
          title="Shopping Cart Interaktif"
          desc="Implementasikan Add to Cart, pengubah kuantitas (+ / -), hapus item, dan kalkulasi subtotal."
          tint={TINT_BLUE}
          accent="#2B6CB0"
        />
        <ChallengeCard
          num="CHALLENGE 04"
          role="CUSTOMER"
          title="Checkout & Halaman Invoice"
          desc="Buat form pengiriman, generate Order ID unik, dan tampilkan rekening transfer bank."
          tint={TINT_PINK}
          accent={CORAL_HEX}
        />
        <ChallengeCard
          num="CHALLENGE 05"
          role="STORE ADMIN"
          title="Order Dashboard & Konfirmasi"
          desc="Buat tabel pesanan masuk di Admin dan tombol Konfirmasi Lunas untuk mengubah status."
          tint={TINT_GREEN}
          accent="#2F7A43"
        />
        <ChallengeCard
          num="CHALLENGE 06"
          role="GIT WORKFLOW"
          title="Minimal 5 Commit Terstruktur"
          desc="Uji setiap fitur di browser dan simpan kemajuannya dengan minimal 5 commit Git yang rapi."
          tint={TINT_NEUTRAL}
          accent={INK_HEX}
        />
      </div>

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
            FINAL OUTPUT SESI 4 · URBANSTORE MVP
          </div>
          <h3 style={{ ...headline(36), color: '#FFFFFF', marginBottom: 6 }}>
            Aplikasi E-Commerce Fungsional Siap Digunakan
          </h3>
          <p style={{ margin: 0, fontSize: 20, lineHeight: 1.38, color: '#E2E1DD' }}>
            Admin Input Produk → Katalog Dinamis → Shopping Cart → Checkout → Invoice Manual →
            Admin Order Confirmation → Minimal 5 Git Commits.
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
};

export const meta: SlideMeta = {
  title: '[VCB Batch 4] Sesi 4 - Build Web Application',
  createdAt: '2026-11-11T16:40:00.000Z',
  theme: 'swiss-japanese',
};

export const notes: (string | undefined)[] = [
  `Selamat datang di Sesi 4 Vibe Coding Bootcamp Batch 4: Build Web Application (From Landing Page to Functional Web Application).`,
  `Mulai hari ini kita tidak lagi membuat halaman statis. Kita membangun aplikasi web fungsional yang menghubungkan Store Admin (Penjual) dan Customer (Pembeli).`,
  `UrbanStore MVP memiliki dua peran: Store Admin menginput produk & mengonfirmasi pembayaran, sedangkan Customer memilih ukuran, mengelola keranjang, dan melakukan checkout.`,
  `Sebelum membuat fitur, terapkan Database Thinking. Pahami 6 entitas utama: Products, Categories, Cart Items, Orders, Order Items, dan Payment Status.`,
  `Pelajari relasi antar entitas dan 7 tahap alur transaksi mulai dari Admin menginput produk baru hingga Admin mengonfirmasi pembayaran lunas.`,
  `Ingatkan peserta prinsip One Prompt = One Feature. Jangan meminta AI membuat seluruh aplikasi dalam satu prompt raksasa.`,
  `Pisahkan akses Store Admin (/admin) dan Customer (Guest Checkout tanpa wajib login rumit di awal).`,
  `Fitur 1: Admin Tambah & Kelola Produk. Begitu produk disimpan oleh Admin, produk otomatis tayang di katalog Customer.`,
  `Fitur 2: Customer memilih ukuran pakaian (S, M, L, XL) dan mengelola kuantitas di Shopping Cart dengan kalkulasi subtotal otomatis.`,
  `Fitur 3: Customer mengisi form Checkout pengiriman dan sistem menghasilkan Order ID unik beserta snapshot harga item.`,
  `Fitur 4: Gunakan pembayaran transfer bank manual untuk MVP agar fokus pada validasi alur bisnis tanpa terhambat integrasi payment gateway.`,
  `Fitur 5: Store Admin memantau pesanan masuk di dashboard dan menekan tombol Konfirmasi Lunas setelah memverifikasi transfer.`,
  `Terapkan disiplin Git Workflow: setiap selesai dan menguji 1 fitur, langsung lakukan git commit dengan pesan yang jelas.`,
  `Lakukan live demo end-to-end mulai dari input produk di Admin, belanja sebagai Customer, hingga verifikasi pembayaran di Admin.`,
  `Saatnya Hands-on Challenge! Peserta mengerjakan 6 challenge berurutan dan menghasilkan minimal 5 commit Git yang terstruktur.`,
];

export default [
  Slide01Cover,
  Slide02Objectives,
  Slide03UrbanStoreMVPScope,
  Slide04DatabaseThinking,
  Slide05EntityAndBusinessFlow,
  Slide06IncrementalDevelopment,
  Slide07AuthAndRole,
  Slide08AdminProductManagement,
  Slide09ShoppingCartAndSize,
  Slide10CheckoutAndOrderCreation,
  Slide11InvoiceAndManualPayment,
  Slide12AdminOrderDashboard,
  Slide13GitWorkflow,
  Slide14MentorDemo,
  Slide15HandsOnChallenge,
] satisfies Page[];

