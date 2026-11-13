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

const SLIDE_ID = 'vibe-coding-sesi-7';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..800&family=Newsreader:ital,opsz,wght@1,6..72,400&family=JetBrains+Mono:wght@500;700&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;
const KEYFRAMES = `
@keyframes s7-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes s7-fade { from { opacity: 0 } to { opacity: 1 } }
.s7-interactive { transition: transform 0.18s cubic-bezier(0, 0, 0.2, 1), box-shadow 0.18s cubic-bezier(0, 0, 0.2, 1), background-color 0.18s ease; cursor: pointer; user-select: none; }
.s7-interactive:hover { transform: translateY(-2px); }
.s7-interactive:active { transform: translateY(0); }
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
const CORAL_TEXT = '#C42B4B';
const BODY = '#5F5E5B';
const SOFT = '#8E8D8A';
const RULE = 'rgba(25,25,25,0.12)';
const SERIF = '"Newsreader", "Iowan Old Style", Georgia, serif';
const MONO = '"JetBrains Mono", monospace';

const YELLOW = '#F8DA7E';
const PINK = '#F6C3CF';
const HIGHLIGHT = '#FCE38A';
const HIGHLIGHT_TEAL = '#D4F2F0';
const HIGHLIGHT_PINK = '#FADDE4';

const TINT_YELLOW = '#FBF3DB';
const TINT_BLUE = '#E7F3F8';
const TINT_PINK = '#FAF1F5';
const TINT_GREEN = '#EDF3EC';
const TINT_TEAL = '#EBF7F6';
const TINT_LAVENDER = '#F2EFFB';
const TINT_NEUTRAL = '#F5F4F0';

const AMBER_BORDER = '#E2BA4A';
const AMBER_TEXT = '#946200';
const BLUE_BORDER = '#7AAEC5';
const BLUE_TEXT = '#205E7A';
const GREEN_BORDER = '#5D9C6D';
const GREEN_TEXT = '#2F7A43';
const LAVENDER_BORDER = '#B6AAD8';
const LAVENDER_TEXT = '#5A4A96';

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
  const id = `s7${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
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
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={7} />
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
    style={{ animation: live ? `s7-draw ${dur}s ${EASE_OUT} ${delay}s both` : undefined }}
  />
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
        <span>Vibe Coding Bootcamp · Batch 4 · Sesi 7</span>
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

const CheckMark = ({ color = TEAL_HEX, size = 24 }: { color?: string; size?: number }) => (
  <Ink width={size} height={size} viewBox="0 0 30 30" wobble={1.2}>
    <path d="M5 16L12 23L26 6" stroke={color} strokeWidth={3.6} />
  </Ink>
);

const CrossMark = ({ color = CORAL_HEX, size = 22 }: { color?: string; size?: number }) => (
  <Ink width={size} height={size} viewBox="0 0 28 28" wobble={1.2}>
    <path d="M6 6L22 22M22 6L6 22" stroke={color} strokeWidth={3.4} />
  </Ink>
);

const LockIcon = ({ color = TEAL_HEX, size = 26 }: { color?: string; size?: number }) => (
  <Ink width={size} height={size} viewBox="0 0 28 28" wobble={1.1}>
    <rect x="5" y="12" width="18" height="12" rx="3" fill="#FFFFFF" stroke={color} strokeWidth={2.8} />
    <path d="M9 12V8.5a5 5 0 0 1 10 0V12" stroke={color} strokeWidth={2.8} />
  </Ink>
);

const GlobeIcon = ({ color = BLUE_TEXT, size = 26 }: { color?: string; size?: number }) => (
  <Ink width={size} height={size} viewBox="0 0 28 28" wobble={1.1}>
    <circle cx="14" cy="14" r="10" stroke={color} strokeWidth={2.6} />
    <ellipse cx="14" cy="14" rx="4.5" ry="10" stroke={color} strokeWidth={2.2} />
    <path d="M4.5 14h19" stroke={color} strokeWidth={2.2} />
  </Ink>
);

const ShieldIcon = ({ color = TEAL_HEX, size = 26 }: { color?: string; size?: number }) => (
  <Ink width={size} height={size} viewBox="0 0 28 28" wobble={1.1}>
    <path
      d="M14 3l9 3.6v6.8c0 5.6-3.8 10.2-9 11.6-5.2-1.4-9-6-9-11.6V6.6L14 3z"
      fill="#FFFFFF"
      stroke={color}
      strokeWidth={2.6}
    />
    <path d="M10 14l3 3 5.5-5.5" stroke={color} strokeWidth={2.8} />
  </Ink>
);

/* ============================================================================ */
/* SLIDE 01 — COVER (Sesi 7 Launch Panorama: Deploy · Domain · Security · Brand)*/
/* ============================================================================ */

const CoverSesi7LaunchArt = ({ live }: { live: boolean }) => (
  <Ink width={W} height={420} style={abs(X0, 504)}>
    {/* 4 Soft Pastel Backdrop Circles Representing the 4 Pillars */}
    <circle cx="210" cy="215" r="126" fill={TINT_BLUE} stroke="none" />
    <circle cx="620" cy="200" r="134" fill={TINT_TEAL} stroke="none" />
    <circle cx="1055" cy="205" r="146" fill={TINT_YELLOW} stroke="none" />
    <circle cx="1485" cy="210" r="126" fill={TINT_PINK} stroke="none" />

    {/* Gentle Hand-Drawn Horizon Baseline */}
    <path d="M24 374 Q 440 362 840 372 T 1656 368" opacity={0.45} />

    {/* ------------------------------------------------------------------------ */}
    {/* STATION 1: LOCAL PROJECT & .ENV (Laptop + Terminal + Env Key Badge)      */}
    {/* ------------------------------------------------------------------------ */}
    {/* Laptop Screen */}
    <rect x="86" y="128" width="236" height="154" rx="12" fill="#FFFFFF" />
    <rect x="104" y="146" width="200" height="118" rx="6" fill={TINT_NEUTRAL} strokeWidth={2} />
    {/* Code & Terminal Lines Inside Laptop */}
    <path d="M122 172 l14 10 l-14 10" stroke={BLUE_TEXT} strokeWidth={2.8} />
    <path d="M148 182 h94" stroke={INK_HEX} strokeWidth={2.8} />
    <path d="M122 210 h130 M122 232 h88" stroke={SOFT} strokeWidth={2.4} />
    {/* Floating .env Lock Tag */}
    <rect x="234" y="102" width="102" height="36" rx="10" fill={TINT_YELLOW} />
    <text
      x="285"
      y="126"
      textAnchor="middle"
      stroke="none"
      fill={AMBER_TEXT}
      fontSize="16"
      fontFamily={MONO}
      fontWeight="700"
    >
      .env key
    </text>
    {/* Laptop Keyboard Base */}
    <path d="M58 286 H350 L368 312 H40 Z" fill="#FFFFFF" />
    <path d="M174 298 H234" strokeWidth={2.6} />
    {/* Station Label */}
    <text
      x="204"
      y="350"
      textAnchor="middle"
      stroke="none"
      fill={BLUE_TEXT}
      fontSize="17"
      fontFamily={MONO}
      fontWeight="700"
    >
      localhost:3000
    </text>

    {/* Curved Coral Push Arrow (1 -> 2) */}
    <Stroke
      d="M366 198 C 414 130, 464 130, 502 176 M502 176 L484 166 M502 176 L498 156"
      color={CORAL_HEX}
      live={live}
      delay={0.35}
    />

    {/* ------------------------------------------------------------------------ */}
    {/* STATION 2: CLOUD DEPLOYMENT (Cloud + Rocket / Vercel Launch)             */}
    {/* ------------------------------------------------------------------------ */}
    {/* Puffy Hand-Drawn Cloud */}
    <path
      d="M520 278 C488 278, 474 248, 496 226 C494 190, 534 168, 566 184 C584 152, 646 150, 668 184 C706 178, 738 208, 728 242 C742 260, 724 278, 698 278 Z"
      fill="#FFFFFF"
    />
    {/* Launch Rocket Rising from Cloud */}
    <g transform="translate(618, 128)">
      {/* Rocket Exhaust Trail */}
      <path d="M-8 66 Q0 92 0 104 Q0 92 8 66" fill={YELLOW} stroke={AMBER_BORDER} strokeWidth={2.4} />
      {/* Fins */}
      <path d="M-20 44 L-36 62 L-16 62 Z" fill={TINT_PINK} />
      <path d="M20 44 L36 62 L16 62 Z" fill={TINT_PINK} />
      {/* Rocket Body */}
      <path d="M0 -34 C24 -8, 24 32, 18 62 H-18 C-24 32, -24 -8, 0 -34 Z" fill="#FFFFFF" />
      {/* Window */}
      <circle cx="0" cy="14" r="10" fill={TINT_TEAL} stroke={TEAL_HEX} strokeWidth={2.6} />
      {/* Nose Cone Accent */}
      <path d="M-12 -14 H12" stroke={TEAL_HEX} strokeWidth={2.6} />
    </g>
    <text
      x="616"
      y="350"
      textAnchor="middle"
      stroke="none"
      fill={TEAL_HEX}
      fontSize="17"
      fontFamily={MONO}
      fontWeight="700"
    >
      vercel deploy
    </text>

    {/* Curved Teal Connector Arrow (2 -> 3) */}
    <Stroke
      d="M746 198 C 786 152, 824 152, 858 190 M858 190 L840 182 M858 190 L852 172"
      color={TEAL_HEX}
      live={live}
      delay={0.55}
    />

    {/* ------------------------------------------------------------------------ */}
    {/* STATION 3: CUSTOM DOMAIN + SECURITY (Live Browser + .my.id + SSL Shield) */}
    {/* ------------------------------------------------------------------------ */}
    {/* Live Browser Frame */}
    <rect x="874" y="96" width="356" height="226" rx="16" fill="#FFFFFF" />
    <path d="M874 144 H1230" />
    <circle cx="902" cy="120" r="6" fill={CORAL_HEX} stroke="none" />
    <circle cx="924" cy="120" r="6" fill={YELLOW} stroke="none" />
    <circle cx="946" cy="120" r="6" fill={TEAL_HEX} stroke="none" />
    {/* Custom Domain URL Pill */}
    <rect x="968" y="106" width="244" height="28" rx="9" fill={TINT_TEAL} stroke={TEAL_HEX} strokeWidth={2} />
    <text
      x="1090"
      y="125"
      textAnchor="middle"
      stroke="none"
      fill={TEAL_HEX}
      fontSize="14"
      fontFamily={MONO}
      fontWeight="700"
    >
      https://urbanstore.my.id
    </text>
    {/* Inside Browser Storefront Hero */}
    <rect x="898" y="164" width="308" height="62" rx="10" fill={TINT_BLUE} />
    <path d="M920 186 h118 M920 206 h178" stroke={BLUE_TEXT} strokeWidth={2.8} />
    <rect x="898" y="242" width="146" height="58" rx="10" fill={TINT_YELLOW} />
    <rect x="1060" y="242" width="146" height="58" rx="10" fill={TINT_PINK} />

    {/* Floating HTTPS SSL Security Shield */}
    <g transform="translate(1196, 62) rotate(8)">
      <path
        d="M32 4 L60 15 V35 C60 52, 48 66, 32 71 C16 66, 4 52, 4 35 V15 L32 4 Z"
        fill="#FFFFFF"
        stroke={INK_HEX}
        strokeWidth={3}
      />
      <path d="M20 37 L29 46 L46 27" stroke={TEAL_HEX} strokeWidth={3.6} />
    </g>
    <text
      x="1052"
      y="350"
      textAnchor="middle"
      stroke="none"
      fill={AMBER_TEXT}
      fontSize="17"
      fontFamily={MONO}
      fontWeight="700"
    >
      jagoanhosting.com · SSL
    </text>

    {/* Curved Amber Connector Arrow (3 -> 4) */}
    <Stroke
      d="M1248 202 C 1286 154, 1326 154, 1362 192 M1362 192 L1344 184 M1362 192 L1356 174"
      color={AMBER_BORDER}
      live={live}
      delay={0.75}
    />

    {/* ------------------------------------------------------------------------ */}
    {/* STATION 4: BRANDING & LIVE PRODUCT (Palette Swatches, Favicon, OG Card)  */}
    {/* ------------------------------------------------------------------------ */}
    {/* Tilted Brand Identity & OG Share Card */}
    <g transform="translate(1376, 112) rotate(-3)">
      <rect x="0" y="0" width="234" height="196" rx="16" fill="#FFFFFF" />
      {/* Mini Storefront OG Preview Banner */}
      <rect x="18" y="18" width="198" height="72" rx="10" fill={TINT_TEAL} />
      <rect x="32" y="34" width="38" height="38" rx="8" fill="#FFFFFF" stroke={TEAL_HEX} strokeWidth={2.2} />
      <path d="M44 53 l6 6 l12 -14" stroke={TEAL_HEX} strokeWidth={2.6} />
      <path d="M84 44 h106 M84 64 h78" stroke={INK_HEX} strokeWidth={2.8} />
      {/* Brand Palette Swatches Row */}
      <circle cx="40" cy="126" r="14" fill={INK_HEX} stroke="none" />
      <circle cx="80" cy="126" r="14" fill={TEAL_HEX} stroke="none" />
      <circle cx="120" cy="126" r="14" fill={YELLOW} stroke={AMBER_BORDER} strokeWidth={2} />
      <circle cx="160" cy="126" r="14" fill={CORAL_HEX} stroke="none" />
      <path d="M26 164 h166" stroke={SOFT} strokeWidth={2.6} />
    </g>
    <text
      x="1498"
      y="350"
      textAnchor="middle"
      stroke="none"
      fill={CORAL_TEXT}
      fontSize="17"
      fontFamily={MONO}
      fontWeight="700"
    >
      brand &amp; open graph
    </text>

    {/* Celebratory Sparkles */}
    <Sparkle x={542} y={76} s={0.95} fill={YELLOW} />
    <Sparkle x={818} y={96} s={0.7} fill={TEAL_HEX} />
    <Sparkle x={1616} y={94} s={1.1} fill={YELLOW} />
    <Sparkle x={1646} y={248} s={0.75} fill={PINK} />
  </Ink>
);

const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <Frame hideFooter>
      {/* Top Bar: CODEPOLITAN Brand Left + Session Pill Right */}
      <div
        style={{
          ...abs(X0, 68, W),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CodepolitanLogo height={42} />
        <span
          style={{
            padding: '8px 22px',
            borderRadius: 99,
            background: TINT_TEAL,
            color: TEAL_HEX,
            fontSize: 20,
            fontWeight: 720,
            letterSpacing: '0.02em',
          }}
        >
          BATCH 4 · SESI 7
        </span>
      </div>

      {/* Centered Editorial Hero Block */}
      <div
        style={{
          ...abs(X0, 152, W),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 32, lineHeight: 1.3, color: BODY, marginBottom: 18 }}>
          From <Highlight color={HIGHLIGHT_TEAL}>Local Project</Highlight> to{' '}
          <Highlight>Live Product</Highlight>
        </div>

        <h1
          style={{
            ...headline(80),
            maxWidth: 1460,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
          }}
        >
          Deployment, Custom Domain,
          <br />
          Security &amp; Branding.
        </h1>

        <p
          style={{
            margin: '32px 0 0',
            maxWidth: 1120,
            fontSize: 25,
            lineHeight: 1.45,
            color: BODY,
          }}
        >
          Membawa <strong style={{ color: INK }}>UrbanStore</strong> keluar dari{' '}
          <span style={{ fontFamily: MONO, fontSize: 22, color: INK }}>localhost</span> menuju produk
          live via <strong style={{ color: INK }}>Vercel</strong>, domain{' '}
          <strong style={{ color: TEAL_HEX }}>.my.id</strong> (jagoanhosting.com), branding matang, &amp;
          audit keamanan.
        </p>
      </div>

      {/* Hand-Drawn Brush Underline Accent Under Hero Title */}
      <Ink width={480} height={20} style={{ ...abs(720, 388), pointerEvents: 'none' }}>
        <Stroke d="M12 12 Q 240 2 468 12" color={CORAL_HEX} width={4} live={live} delay={0.3} dur={0.6} />
      </Ink>

      {/* Panoramic 4-Pillar Launch Illustration */}
      <CoverSesi7LaunchArt live={live} />

      {/* Minimal Cover Footer */}
      <div
        style={{
          ...abs(X0, 964, W),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 18,
          fontWeight: 600,
          color: SOFT,
        }}
      >
        <span>by CODEPOLITAN</span>
        <span>Vibe Coding Bootcamp · Batch 4</span>
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 02 — LEARNING OBJECTIVES                                               */
/* ============================================================================ */

const ObjectiveArt = ({ num, accent }: { num: string; accent: string }) => {
  if (num === '01') {
    return (
      <Ink width={120} height={82}>
        <circle cx="66" cy="42" r="34" fill="#FFFFFF" stroke="none" />
        <path d="M36 58 C26 58, 22 48, 30 40 C30 28, 44 22, 56 28 C64 16, 86 16, 94 28 C108 26, 118 36, 112 48 C118 54, 110 58, 102 58 Z" fill="#FFFFFF" />
        <path d="M68 32 L82 54 H54 Z" fill={TINT_TEAL} stroke={accent} strokeWidth={2.4} />
      </Ink>
    );
  }
  if (num === '02') {
    return (
      <Ink width={120} height={82}>
        <circle cx="66" cy="42" r="34" fill="#FFFFFF" stroke="none" />
        <rect x="44" y="34" width="44" height="32" rx="8" fill="#FFFFFF" stroke={accent} strokeWidth={2.4} />
        <path d="M54 34 V26 A12 12 0 0 1 78 26 V34" stroke={accent} strokeWidth={2.4} />
        <circle cx="66" cy="50" r="4.5" fill={accent} stroke="none" />
      </Ink>
    );
  }
  if (num === '03') {
    return (
      <Ink width={120} height={82}>
        <circle cx="66" cy="42" r="34" fill="#FFFFFF" stroke="none" />
        <rect x="24" y="24" width="84" height="38" rx="10" fill="#FFFFFF" stroke={accent} strokeWidth={2.4} />
        <path d="M36 43 H74" stroke={accent} strokeWidth={2.6} />
        <circle cx="92" cy="43" r="6" fill={TINT_TEAL} stroke={TEAL_HEX} strokeWidth={2} />
      </Ink>
    );
  }
  if (num === '04') {
    return (
      <Ink width={120} height={82}>
        <circle cx="66" cy="42" r="34" fill="#FFFFFF" stroke="none" />
        <rect x="34" y="20" width="64" height="44" rx="10" fill="#FFFFFF" stroke={accent} strokeWidth={2.2} />
        <circle cx="50" cy="36" r="6" fill={TEAL_HEX} stroke="none" />
        <circle cx="68" cy="36" r="6" fill={YELLOW} stroke="none" />
        <circle cx="86" cy="36" r="6" fill={CORAL_HEX} stroke="none" />
        <path d="M44 52 H86" stroke={INK_HEX} strokeWidth={2.2} />
      </Ink>
    );
  }
  if (num === '05') {
    return (
      <Ink width={120} height={82}>
        <circle cx="66" cy="42" r="34" fill="#FFFFFF" stroke="none" />
        <path
          d="M66 14 L92 24 V42 C92 56, 80 68, 66 72 C52 68, 40 56, 40 42 V24 L66 14 Z"
          fill="#FFFFFF"
          stroke={accent}
          strokeWidth={2.4}
        />
        <path d="M55 43 L63 51 L78 34" stroke={TEAL_HEX} strokeWidth={2.8} />
      </Ink>
    );
  }
  return (
    <Ink width={120} height={82}>
      <circle cx="66" cy="42" r="34" fill="#FFFFFF" stroke="none" />
      <rect x="46" y="14" width="40" height="58" rx="9" fill="#FFFFFF" stroke={accent} strokeWidth={2.4} />
      <path d="M58 22 H74" stroke={SOFT} strokeWidth={2} />
      <circle cx="66" cy="44" r="10" fill={TINT_TEAL} stroke={TEAL_HEX} strokeWidth={2} />
      <path d="M61 44 L65 48 L72 40" stroke={TEAL_HEX} strokeWidth={2.2} />
    </Ink>
  );
};

const ObjectiveCard = ({
  num,
  title,
  sub,
  tint,
  accent,
}: {
  num: string;
  title: string;
  sub: string;
  tint: string;
  accent: string;
}) => (
  <div
    style={{
      borderRadius: 22,
      background: tint,
      border: `2px solid ${accent}`,
      padding: '24px 28px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: accent }}>
        GOAL {num}
      </span>
      <ObjectiveArt num={num} accent={accent} />
    </div>
    <div>
      <div style={{ ...headline(28), color: INK, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 20, color: BODY, lineHeight: 1.4 }}>{sub}</div>
    </div>
  </div>
);

const Slide02Objectives: Page = () => (
  <Frame>
    <Eyebrow>Learning Objectives · Sesi 7</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(54) }}>
      Setelah sesi ini kamu <Highlight color={HIGHLIGHT_TEAL}>mampu</Highlight>...
    </h2>

    <div
      style={{
        ...abs(X0, 232, W, 540),
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
      }}
    >
      <ObjectiveCard
        num="01"
        title="Deploy ke Vercel"
        sub="Publish UrbanStore dari GitHub ke URL publik."
        tint={TINT_TEAL}
        accent={TEAL_HEX}
      />
      <ObjectiveCard
        num="02"
        title="Cloud Environment"
        sub="Atur Env Vars & sinkronkan callback Auth + Mayar."
        tint={TINT_YELLOW}
        accent={AMBER_TEXT}
      />
      <ObjectiveCard
        num="03"
        title="Custom Domain .my.id"
        sub="Ganti .vercel.app testing ke domain jagoanhosting.com."
        tint={TINT_BLUE}
        accent={BLUE_TEXT}
      />
      <ObjectiveCard
        num="04"
        title="TLD, Branding & OG"
        sub="Pilih TLD tepat, kunci Favicon, & preview share."
        tint={TINT_PINK}
        accent={CORAL_HEX}
      />
      <ObjectiveCard
        num="05"
        title="Security Audit"
        sub="Cek kebocoran secret & audit dengan AI Skill."
        tint={TINT_LAVENDER}
        accent={LAVENDER_TEXT}
      />
      <ObjectiveCard
        num="06"
        title="Live Smoke Test"
        sub="Pastikan UrbanStore siap melayani transaksi publik."
        tint={TINT_GREEN}
        accent={GREEN_TEXT}
      />
    </div>

    {/* Rhythm Mantra Bar */}
    <div
      style={{
        ...abs(X0, 816, W, 118),
        borderRadius: 22,
        background: TINT_NEUTRAL,
        border: `2px solid ${RULE}`,
        padding: '0 36px',
        ...row,
        justifyContent: 'space-between',
      }}
    >
      <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: BODY }}>
        ALUR PELUNCURAN PRODUK
      </span>
      <div style={{ ...row, gap: 18, fontSize: 26, fontWeight: 780, color: INK }}>
        <span>Build it</span>
        <span style={{ color: TEAL_HEX }}>→</span>
        <span>Secure it</span>
        <span style={{ color: TEAL_HEX }}>→</span>
        <span>Brand it</span>
        <span style={{ color: TEAL_HEX }}>→</span>
        <Highlight>Launch it</Highlight>
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 03 — DARI LOCALHOST KE PRODUCTION                                      */
/* ============================================================================ */

const Slide03LocalToProd: Page = () => (
  <Frame>
    <Eyebrow>Transisi Environment · Dari Laptop ke Publik</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(52) }}>
      Membawa <Highlight color={HIGHLIGHT_TEAL}>UrbanStore</Highlight> keluar dari{' '}
      <code>localhost</code> ke internet.
    </h2>

    {/* Horizontal 5-Step Pipeline */}
    <div
      style={{
        ...abs(X0, 236, W, 210),
        borderRadius: 26,
        background: TINT_NEUTRAL,
        border: `2px solid ${RULE}`,
        padding: '28px 32px',
        display: 'grid',
        gridTemplateColumns: '1fr 44px 1fr 44px 1fr 44px 1fr 44px 1fr',
        alignItems: 'center',
      }}
    >
      {[
        { step: '01', label: 'Local Dev', sub: 'localhost:3000', tint: '#FFFFFF', border: RULE, accent: BODY },
        { step: '02', label: 'GitHub Repo', sub: 'git push origin', tint: TINT_BLUE, border: BLUE_BORDER, accent: BLUE_TEXT },
        { step: '03', label: 'Vercel', sub: 'Auto CI/CD', tint: TINT_YELLOW, border: AMBER_BORDER, accent: AMBER_TEXT },
        { step: '04', label: 'Prod Build', sub: 'Optimized Bundle', tint: TINT_LAVENDER, border: LAVENDER_BORDER, accent: LAVENDER_TEXT },
        { step: '05', label: 'Live Website', sub: 'urbanstore.my.id', tint: TINT_TEAL, border: TEAL_HEX, accent: TEAL_HEX },
      ].flatMap((node, idx) => {
        const card = (
          <div
            key={node.step}
            style={{
              borderRadius: 18,
              background: node.tint,
              border: `2px solid ${node.border}`,
              padding: '22px 20px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 780, color: node.accent }}>
              STEP {node.step}
            </div>
            <div style={{ fontSize: 25, fontWeight: 780, color: INK, marginTop: 6 }}>{node.label}</div>
            <div style={{ fontFamily: MONO, fontSize: 16, color: BODY, marginTop: 4 }}>{node.sub}</div>
          </div>
        );
        if (idx === 4) return [card];
        return [
          card,
          <div
            key={`arr-${idx}`}
            style={{ textAlign: 'center', fontFamily: MONO, fontSize: 26, fontWeight: 800, color: TEAL_HEX }}
          >
            →
          </div>,
        ];
      })}
    </div>

    {/* Side-by-Side Comparison */}
    <div
      style={{
        ...abs(X0, 480, 816, 286),
        borderRadius: 24,
        background: TINT_YELLOW,
        border: `2px solid ${AMBER_BORDER}`,
        padding: '32px 36px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: AMBER_TEXT }}>
        DEVELOPMENT ENVIRONMENT
      </div>
      <div style={{ ...headline(46), color: INK }}>localhost</div>
      <div style={{ fontSize: 22, color: BODY }}>
        Hanya terbuka di laptop developer · Data &amp; API untuk uji coba lokal.
      </div>
    </div>

    <div
      style={{
        ...abs(984, 480, 816, 286),
        borderRadius: 24,
        background: TINT_TEAL,
        border: `2.5px solid ${TEAL_HEX}`,
        padding: '32px 36px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX }}>
        PRODUCTION ENVIRONMENT
      </div>
      <div style={{ ...headline(46), color: INK }}>urbanstore.my.id</div>
      <div style={{ fontSize: 22, color: BODY }}>
        Terbuka 24/7 untuk Customer &amp; Admin · Transaksi Mayar &amp; AI aktif.
      </div>
    </div>

    {/* Bottom Insight */}
    <div
      style={{
        ...abs(X0, 804, W, 130),
        borderRadius: 22,
        background: TINT_BLUE,
        border: `2px solid ${BLUE_BORDER}`,
        padding: '0 36px',
        ...row,
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: BLUE_TEXT, marginBottom: 4 }}>
          INSIGHT
        </div>
        <div style={{ fontSize: 25, fontWeight: 700, color: INK }}>
          Aplikasi yang selesai di <code>localhost</code> belum otomatis aman dan siap dipakai publik.
        </div>
      </div>
      <GlobeIcon color={BLUE_TEXT} size={38} />
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 04 — DEPLOYMENT DENGAN VERCEL                                          */
/* ============================================================================ */

const Slide04VercelDeploy: Page = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { label: '01 · Push Code', desc: 'Commit & push kode UrbanStore ke branch utama.' },
    { label: '02 · GitHub', desc: 'Vercel membaca webhook repository otomatis.' },
    { label: '03 · Vercel Build', desc: 'Install dependencies & kompilasi bundle produksi.' },
    { label: '04 · Production', desc: 'Inject Environment Variables & deploy ke edge.' },
    { label: '05 · Live URL', desc: 'UrbanStore siap diakses online via HTTPS.' },
  ];

  return (
    <Frame>
      <Eyebrow>Deployment dengan Vercel · Automated CI/CD</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(52) }}>
        Apa yang terjadi saat <Highlight color={HIGHLIGHT_TEAL}>Vercel</Highlight> melakukan deploy?
      </h2>

      {/* Left Card: 5 Automated Actions */}
      <div
        style={{
          ...abs(X0, 232, 820, 560),
          borderRadius: 26,
          background: TINT_NEUTRAL,
          border: `2px solid ${RULE}`,
          padding: '30px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX }}>
          OTOMATIS DIJALANKAN VERCEL
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            'Mengambil source code terbaru dari GitHub',
            'Menginstall seluruh package dependencies',
            'Menjalankan perintah production build',
            'Menghasilkan bundle ringan & teroptimasi',
            'Menyediakan URL HTTPS aktif di internet',
          ].map((item, i) => (
            <div
              key={item}
              style={{
                borderRadius: 14,
                background: '#FFFFFF',
                border: `1.5px solid ${RULE}`,
                padding: '15px 20px',
                ...row,
                gap: 16,
                fontSize: 21,
                fontWeight: 620,
                color: INK,
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX }}>
                0{i + 1}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: MONO, fontSize: 16, color: BODY }}>
          Setiap git push ➔ preview / production terupdate otomatis.
        </div>
      </div>

      {/* Right Interactive Pipeline */}
      <div
        style={{
          ...abs(980, 232, 820, 560),
          borderRadius: 26,
          background: TINT_TEAL,
          border: `2.5px solid ${TEAL_HEX}`,
          padding: '30px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX }}>
            WORKFLOW DEPLOYMENT
          </span>
          <span style={{ fontFamily: MONO, fontSize: 15, color: BODY }}>Klik langkah untuk fokus</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {steps.map((s, idx) => {
            const active = activeStep === idx;
            return (
              <div
                key={s.label}
                onClick={() => setActiveStep(idx)}
                className="s7-interactive"
                style={{
                  borderRadius: 16,
                  background: active ? '#FFFFFF' : 'rgba(255,255,255,0.68)',
                  border: `2px solid ${active ? TEAL_HEX : RULE}`,
                  padding: '15px 22px',
                  ...row,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: TEAL_HEX }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: 19, fontWeight: active ? 700 : 540, color: INK, marginTop: 2 }}>
                    {s.desc}
                  </div>
                </div>
                {active && <CheckMark color={TEAL_HEX} size={24} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Target Strip */}
      <div
        style={{
          ...abs(X0, 820, W, 114),
          borderRadius: 22,
          background: TINT_YELLOW,
          border: `2px solid ${AMBER_BORDER}`,
          padding: '0 36px',
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: AMBER_TEXT }}>
            TARGET DEPLOYMENT:{' '}
          </span>
          <span style={{ fontSize: 24, fontWeight: 740, color: INK }}>
            UrbanStore dapat diakses online oleh Customer &amp; Store Admin dari mana saja.
          </span>
        </div>
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 05 — ENVIRONMENT VARIABLES DI CLOUD                                    */
/* ============================================================================ */

const EnvSeparationArt = () => (
  <Ink width={848} height={110}>
    {/* Source Code Card (GitHub Public/Private Safe) */}
    <rect x="8" y="16" width="290" height="78" rx="14" fill="#FFFFFF" />
    <path d="M28 42 h84 M28 58 h140 M28 72 h104" stroke={BLUE_TEXT} strokeWidth={2.6} />
    <rect x="206" y="28" width="76" height="24" rx="7" fill={TINT_BLUE} stroke={BLUE_BORDER} strokeWidth={1.8} />
    <text x="244" y="45" textAnchor="middle" stroke="none" fill={BLUE_TEXT} fontSize="13" fontFamily={MONO} fontWeight="700">
      Git Repo
    </text>

    {/* Clean Separation Wall */}
    <path d="M352 12 V98" stroke={CORAL_HEX} strokeWidth={3} strokeDasharray="6 5" />
    <circle cx="352" cy="55" r="14" fill={TINT_PINK} stroke={CORAL_HEX} strokeWidth={2.2} />
    <path d="M346 49 L358 61 M358 49 L346 61" stroke={CORAL_HEX} strokeWidth={2.4} />

    {/* Connector to Vercel Cloud Vault */}
    <path d="M402 55 H498 M498 55 L486 47 M498 55 L486 63" stroke={TEAL_HEX} strokeWidth={2.6} />

    {/* Cloud Env Vault */}
    <rect x="512" y="14" width="328" height="82" rx="14" fill={TINT_TEAL} stroke={TEAL_HEX} strokeWidth={2.2} />
    <rect x="534" y="42" width="28" height="24" rx="5" fill="#FFFFFF" stroke={TEAL_HEX} strokeWidth={2.2} />
    <path d="M540 42 v-5 a8 8 0 0 1 16 0 v5" stroke={TEAL_HEX} strokeWidth={2.2} />
    <text x="578" y="47" stroke="none" fill={TEAL_HEX} fontSize="15" fontFamily={MONO} fontWeight="700">
      Vercel Cloud Vault
    </text>
    <text x="578" y="69" stroke="none" fill={BODY} fontSize="14" fontFamily={MONO}>
      process.env.* injected
    </text>
  </Ink>
);

const CallbackSyncArt = () => (
  <Ink width={656} height={154}>
    <circle cx="116" cy="78" r="56" fill="#FFFFFF" stroke="none" opacity={0.8} />
    <circle cx="536" cy="78" r="56" fill={TINT_TEAL} stroke="none" />

    {/* Left: Localhost (Crossed Out) */}
    <rect x="34" y="34" width="166" height="86" rx="14" fill="#FFFFFF" stroke={RULE} strokeWidth={2.2} />
    <path d="M34 56 H200" strokeWidth={2} />
    <text x="117" y="82" textAnchor="middle" stroke="none" fill={SOFT} fontSize="15" fontFamily={MONO} fontWeight="700">
      localhost:3000
    </text>
    <path d="M62 96 H172" stroke={CORAL_HEX} strokeWidth={2.4} />

    {/* Arrow to Live Cloud Domain */}
    <path d="M222 77 H368 M368 77 L354 67 M368 77 L354 87" stroke={TEAL_HEX} strokeWidth={3} />
    <rect x="242" y="40" width="108" height="24" rx="8" fill={TINT_YELLOW} stroke={AMBER_BORDER} strokeWidth={1.8} />
    <text x="296" y="57" textAnchor="middle" stroke="none" fill={AMBER_TEXT} fontSize="13" fontFamily={MONO} fontWeight="700">
      update URI
    </text>

    {/* Right: Live Domain Connecting OAuth + Mayar */}
    <rect x="386" y="24" width="244" height="106" rx="16" fill="#FFFFFF" stroke={TEAL_HEX} strokeWidth={2.4} />
    <text x="508" y="52" textAnchor="middle" stroke="none" fill={TEAL_HEX} fontSize="15" fontFamily={MONO} fontWeight="700">
      https://urbanstore.my.id
    </text>
    <rect x="406" y="68" width="96" height="42" rx="9" fill={TINT_BLUE} stroke={BLUE_BORDER} strokeWidth={1.8} />
    <text x="454" y="94" textAnchor="middle" stroke="none" fill={BLUE_TEXT} fontSize="13" fontFamily={MONO} fontWeight="700">
      OAuth
    </text>
    <rect x="514" y="68" width="96" height="42" rx="9" fill={TINT_YELLOW} stroke={AMBER_BORDER} strokeWidth={1.8} />
    <text x="562" y="94" textAnchor="middle" stroke="none" fill={AMBER_TEXT} fontSize="13" fontFamily={MONO} fontWeight="700">
      Webhook
    </text>
  </Ink>
);

const Slide05EnvVarsCloud: Page = () => (
  <Frame>
    <Eyebrow>Environment Variables · Konfigurasi Cloud Vercel</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
      Pisahkan <Highlight color={HIGHLIGHT_TEAL}>Source Code</Highlight> dari{' '}
      <Highlight>Config &amp; Secret</Highlight> di cloud.
    </h2>

    {/* Left Column: Cloud Secret Keys + Visual Separation + Bad vs Good */}
    <div
      style={{
        ...abs(X0, 228, 920, 706),
        borderRadius: 26,
        background: TINT_NEUTRAL,
        border: `2px solid ${RULE}`,
        padding: '28px 34px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX, marginBottom: 14 }}>
          VERCEL DASHBOARD → SETTINGS → ENVIRONMENT VARIABLES
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}
        >
          {[
            'DATABASE_URL',
            'GEMINI_API_KEY',
            'GOOGLE_CLIENT_ID',
            'GOOGLE_CLIENT_SECRET',
            'MAYAR_API_KEY',
            'MAYAR_WEBHOOK_SECRET',
          ].map((env) => (
            <div
              key={env}
              style={{
                borderRadius: 14,
                background: '#FFFFFF',
                border: `1.5px solid ${RULE}`,
                padding: '14px 18px',
                ...row,
                gap: 12,
                fontFamily: MONO,
                fontSize: 18,
                fontWeight: 700,
                color: INK,
              }}
            >
              <LockIcon color={TEAL_HEX} size={22} />
              <span>{env}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Separation Illustration */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <EnvSeparationArt />
      </div>

      {/* Don't vs Do */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div
          style={{
            borderRadius: 18,
            background: TINT_PINK,
            border: `2px solid ${CORAL_HEX}`,
            padding: '18px 22px',
          }}
        >
          <div style={{ ...row, gap: 10, marginBottom: 8 }}>
            <CrossMark color={CORAL_HEX} size={20} />
            <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: CORAL_TEXT }}>
              JANGAN HARDCODE
            </span>
          </div>
          <code style={{ fontFamily: MONO, fontSize: 17, color: INK }}>
            const API_KEY = &quot;sk-123...&quot;
          </code>
        </div>

        <div
          style={{
            borderRadius: 18,
            background: TINT_TEAL,
            border: `2px solid ${TEAL_HEX}`,
            padding: '18px 22px',
          }}
        >
          <div style={{ ...row, gap: 10, marginBottom: 8 }}>
            <CheckMark color={TEAL_HEX} size={20} />
            <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: TEAL_HEX }}>
              GUNAKAN ENV
            </span>
          </div>
          <code style={{ fontFamily: MONO, fontSize: 17, color: INK }}>
            process.env.MAYAR_API_KEY
          </code>
        </div>
      </div>

      <div
        style={{
          borderRadius: 14,
          background: '#FFFFFF',
          border: `1.5px solid ${RULE}`,
          padding: '13px 20px',
          fontSize: 19,
          color: BODY,
        }}
      >
        <strong style={{ color: INK }}>Ingat:</strong> File <code>.env</code> lokal tidak di-push ke
        GitHub — wajib diinput di Vercel.
      </div>
    </div>

    {/* Right Column: Update Callback URLs + Diagram */}
    <div
      style={{
        ...abs(1076, 228, 724, 706),
        borderRadius: 26,
        background: TINT_BLUE,
        border: `2px solid ${BLUE_BORDER}`,
        padding: '28px 34px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: BLUE_TEXT, marginBottom: 8 }}>
          WAJIB UPDATE SAAT PINDAH KE CLOUD
        </div>
        <h3 style={{ ...headline(32), color: INK, marginBottom: 16 }}>
          Sinkronkan URL Callback Production
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              borderRadius: 18,
              background: '#FFFFFF',
              border: `2px solid ${BLUE_BORDER}`,
              padding: '16px 22px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 780, color: BLUE_TEXT }}>
              GOOGLE OAUTH REDIRECT URI
            </div>
            <div style={{ fontFamily: MONO, fontSize: 15, color: SOFT, marginTop: 6 }}>
              ✗ http://localhost:3000/api/auth/callback
            </div>
            <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 700, color: TEAL_HEX, marginTop: 4 }}>
              ✓ https://urbanstore.my.id/api/auth/callback
            </div>
          </div>

          <div
            style={{
              borderRadius: 18,
              background: '#FFFFFF',
              border: `2px solid ${AMBER_BORDER}`,
              padding: '16px 22px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 780, color: AMBER_TEXT }}>
              MAYAR.ID WEBHOOK ENDPOINT
            </div>
            <div style={{ fontFamily: MONO, fontSize: 15, color: SOFT, marginTop: 6 }}>
              ✗ http://localhost:3000/api/webhook/mayar
            </div>
            <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 700, color: TEAL_HEX, marginTop: 4 }}>
              ✓ https://urbanstore.my.id/api/webhook/mayar
            </div>
          </div>
        </div>
      </div>

      {/* Callback Transition Illustration */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CallbackSyncArt />
      </div>

      <div
        style={{
          borderRadius: 16,
          background: TINT_YELLOW,
          border: `2px solid ${AMBER_BORDER}`,
          padding: '15px 22px',
          fontSize: 19,
          fontWeight: 680,
          color: INK,
        }}
      >
        Setelah menambah Env Var di Vercel, jalankan <strong>Redeploy</strong> agar aktif.
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 06 — PRODUCTION CONFIGURATION                                          */
/* ============================================================================ */

const Slide06ProductionConfig: Page = () => (
  <Frame>
    <Eyebrow>Production Configuration · Kesiapan Deploy</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(52) }}>
      Development &amp; Production butuh{' '}
      <Highlight color={HIGHLIGHT_TEAL}>konfigurasi terpisah</Highlight>.
    </h2>

    {/* Left: Side-by-Side Dev vs Prod Comparison (Zero Vertical Void) */}
    <div
      style={{
        ...abs(X0, 234, 880, 700),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 22,
      }}
    >
      <div
        style={{
          borderRadius: 26,
          background: TINT_YELLOW,
          border: `2px solid ${AMBER_BORDER}`,
          padding: '30px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: AMBER_TEXT }}>
            DEVELOPMENT
          </div>
          <h3 style={{ ...headline(32), color: INK, marginTop: 6 }}>Laptop Lokal</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { k: 'HOST', v: 'localhost:3000' },
            { k: 'DATABASE', v: 'Test Database' },
            { k: 'API MODE', v: 'Sandbox / Dev Key' },
          ].map((rowItem) => (
            <div
              key={rowItem.k}
              style={{
                borderRadius: 16,
                background: '#FFFFFF',
                padding: '22px 22px',
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, color: AMBER_TEXT }}>
                {rowItem.k}
              </div>
              <div style={{ fontSize: 24, fontWeight: 780, color: INK, marginTop: 6 }}>
                {rowItem.v}
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 18, fontWeight: 600, color: BODY }}>
          Bebas uji coba tanpa mengganggu data pembeli asli.
        </div>
      </div>

      <div
        style={{
          borderRadius: 26,
          background: TINT_TEAL,
          border: `2.5px solid ${TEAL_HEX}`,
          padding: '30px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: TEAL_HEX }}>
            PRODUCTION
          </div>
          <h3 style={{ ...headline(32), color: INK, marginTop: 6 }}>Cloud Live</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { k: 'DOMAIN', v: 'urbanstore.my.id' },
            { k: 'DATABASE', v: 'Production DB' },
            { k: 'API MODE', v: 'Live Key & HTTPS' },
          ].map((rowItem) => (
            <div
              key={rowItem.k}
              style={{
                borderRadius: 16,
                background: '#FFFFFF',
                padding: '22px 22px',
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, color: TEAL_HEX }}>
                {rowItem.k}
              </div>
              <div style={{ fontSize: 24, fontWeight: 780, color: INK, marginTop: 6 }}>
                {rowItem.v}
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 18, fontWeight: 600, color: BODY }}>
          Aktif 24/7 melayani checkout Mayar &amp; AI CS nyata.
        </div>
      </div>
    </div>

    {/* Right: 5 Pre-Deploy Checklist */}
    <div
      style={{
        ...abs(1040, 234, 760, 700),
        borderRadius: 26,
        background: TINT_NEUTRAL,
        border: `2px solid ${RULE}`,
        padding: '30px 34px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
        CHECKLIST SEBELUM DEPLOY
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          'Seluruh Environment Variable tersedia di Vercel',
          'API Key & OAuth/Webhook URL sudah versi production',
          'Database production terhubung & tabel termigrasi',
          'Production build lokal (npm run build) sukses',
          'Tidak ada secret atau .env yang bocor di Git repo',
        ].map((item) => (
          <div
            key={item}
            style={{
              borderRadius: 16,
              background: '#FFFFFF',
              border: `1.5px solid ${RULE}`,
              padding: '18px 22px',
              ...row,
              gap: 16,
              fontSize: 21,
              fontWeight: 650,
              color: INK,
            }}
          >
            <CheckMark color={TEAL_HEX} size={24} />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div style={{ fontFamily: MONO, fontSize: 16, color: BODY }}>
        Pisahkan data uji coba agar laporan Sales Admin tetap bersih.
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 07 — CUSTOM DOMAIN (PARTNER: JAGOANHOSTING.COM)                        */
/* ============================================================================ */

const Slide07CustomDomain: Page = () => {
  const [domainView, setDomainView] = useState<'custom' | 'default'>('custom');

  return (
    <Frame>
      <Eyebrow>Custom Domain · Partner Resmi CODEPOLITAN: jagoanhosting.com</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        Ubah <code>.vercel.app</code> testing ke domain publik{' '}
        <Highlight color={HIGHLIGHT_TEAL}>urbanstore.my.id</Highlight>.
      </h2>

      {/* Top Interactive URL Bar Comparison */}
      <div
        style={{
          ...abs(X0, 232, W, 200),
          borderRadius: 26,
          background: TINT_BLUE,
          border: `2px solid ${BLUE_BORDER}`,
          padding: '28px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: BLUE_TEXT, marginBottom: 10 }}>
            BANDINGKAN URL TESTING VS PUBLIK
          </div>
          <div style={{ ...row, gap: 14 }}>
            <button
              type="button"
              onClick={() => setDomainView('default')}
              className="s7-interactive"
              style={{
                borderRadius: 12,
                border: `2px solid ${domainView === 'default' ? CORAL_HEX : RULE}`,
                background: domainView === 'default' ? TINT_PINK : '#FFFFFF',
                padding: '12px 22px',
                fontFamily: MONO,
                fontSize: 18,
                fontWeight: 700,
                color: INK,
              }}
            >
              urbanstore-v4.vercel.app
            </button>
            <button
              type="button"
              onClick={() => setDomainView('custom')}
              className="s7-interactive"
              style={{
                borderRadius: 12,
                border: `2px solid ${domainView === 'custom' ? TEAL_HEX : RULE}`,
                background: domainView === 'custom' ? TINT_TEAL : '#FFFFFF',
                padding: '12px 22px',
                fontFamily: MONO,
                fontSize: 18,
                fontWeight: 700,
                color: INK,
              }}
            >
              urbanstore.my.id
            </button>
          </div>
        </div>

        <div
          style={{
            width: 780,
            borderRadius: 20,
            background: '#FFFFFF',
            border: `2px solid ${domainView === 'custom' ? TEAL_HEX : CORAL_HEX}`,
            padding: '24px 30px',
            ...row,
            justifyContent: 'space-between',
          }}
        >
          <div style={{ ...row, gap: 14 }}>
            <LockIcon color={domainView === 'custom' ? TEAL_HEX : SOFT} size={26} />
            <span style={{ fontFamily: MONO, fontSize: 28, fontWeight: 780, color: INK }}>
              https://{domainView === 'custom' ? 'urbanstore.my.id' : 'urbanstore-v4.vercel.app'}
            </span>
          </div>
          <span
            style={{
              padding: '6px 14px',
              borderRadius: 99,
              background: domainView === 'custom' ? TINT_TEAL : TINT_PINK,
              color: domainView === 'custom' ? TEAL_HEX : CORAL_TEXT,
              fontFamily: MONO,
              fontSize: 15,
              fontWeight: 780,
            }}
          >
            {domainView === 'custom' ? 'PUBLIK & PROFESIONAL' : 'UNTUK TESTING'}
          </span>
        </div>
      </div>

      {/* Bottom Left: Partner + Flow */}
      <div
        style={{
          ...abs(X0, 464, 920, 470),
          borderRadius: 26,
          background: TINT_NEUTRAL,
          border: `2px solid ${RULE}`,
          padding: '30px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX }}>
              SUPPORT DOMAIN JAGOANHOSTING.COM
            </span>
            <span
              style={{
                padding: '6px 16px',
                borderRadius: 99,
                background: TINT_YELLOW,
                border: `1.5px solid ${AMBER_BORDER}`,
                fontFamily: MONO,
                fontSize: 16,
                fontWeight: 780,
                color: AMBER_TEXT,
              }}
            >
              .my.id ➔ .com
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 22, lineHeight: 1.48, color: INK, fontWeight: 600 }}>
            Kita memakai domain <strong style={{ color: TEAL_HEX }}>.my.id</strong> yang disupport
            partner CODEPOLITAN <strong style={{ color: TEAL_HEX }}>jagoanhosting.com</strong> untuk
            mengganti URL testing <code>.vercel.app</code>. Saat bisnis siap scale lebih serius,
            tinggal upgrade ke <strong style={{ color: INK }}>.com</strong> atau TLD lainnya.
          </p>
        </div>

        {/* 4-node Direct DNS Flow */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 36px 0.9fr 36px 0.9fr 36px 1fr',
            alignItems: 'center',
          }}
        >
          {[
            { t: 'jagoanhosting.com', sub: 'Domain .my.id', bg: TINT_YELLOW, bd: AMBER_BORDER },
            { t: 'DNS Panel', sub: 'A / CNAME', bg: TINT_BLUE, bd: BLUE_BORDER },
            { t: 'Vercel', sub: 'Host + SSL', bg: '#FFFFFF', bd: RULE },
            { t: 'UrbanStore', sub: 'urbanstore.my.id', bg: TINT_TEAL, bd: TEAL_HEX },
          ].flatMap((n, i) => {
            const el = (
              <div
                key={n.t}
                style={{
                  borderRadius: 16,
                  background: n.bg,
                  border: `2px solid ${n.bd}`,
                  padding: '18px 12px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 780, color: INK }}>{n.t}</div>
                <div style={{ fontFamily: MONO, fontSize: 14, color: BODY, marginTop: 4 }}>
                  {n.sub}
                </div>
              </div>
            );
            if (i === 3) return [el];
            return [
              el,
              <div
                key={`a${i}`}
                style={{ textAlign: 'center', fontFamily: MONO, fontSize: 22, fontWeight: 800, color: TEAL_HEX }}
              >
                →
              </div>,
            ];
          })}
        </div>
      </div>

      {/* Bottom Right: 4 Benefits */}
      <div
        style={{
          ...abs(1076, 464, 724, 470),
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 18,
        }}
      >
        {[
          { t: 'Branding Rapi', s: 'Jauh lebih profesional dari .vercel.app.', bg: TINT_TEAL, bd: TEAL_HEX },
          { t: 'Mulai .my.id', s: 'Didukung penuh jagoanhosting.com.', bg: TINT_YELLOW, bd: AMBER_BORDER },
          { t: 'Kepercayaan', s: 'Pembeli lebih yakin checkout Mayar.id.', bg: TINT_PINK, bd: CORAL_HEX },
          { t: 'Mudah Upgrade', s: 'Siap beralih ke .com saat scale bisnis.', bg: TINT_GREEN, bd: GREEN_BORDER },
        ].map((b) => (
          <div
            key={b.t}
            style={{
              borderRadius: 22,
              background: b.bg,
              border: `2px solid ${b.bd}`,
              padding: '26px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <CheckMark color={b.bd} size={24} />
            <div>
              <div style={{ ...headline(28), color: INK, marginBottom: 6 }}>{b.t}</div>
              <div style={{ fontSize: 20, color: BODY, lineHeight: 1.38 }}>{b.s}</div>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 08 — 5 REKOMENDASI EKSTENSI DOMAIN (TLD) POPULER                       */
/* ============================================================================ */

const Slide08DomainTlds: Page = () => (
  <Frame>
    <Eyebrow>Ekstensi Domain · 5 Rekomendasi TLD Populer</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(52) }}>
      Selain <Highlight color={HIGHLIGHT_TEAL}>.my.id</Highlight>, kenali{' '}
      <Highlight>5 domain TLD</Highlight> yang paling banyak dipakai.
    </h2>

    {/* Row 1: Top 3 TLDs (.com, .id, .my.id) */}
    <div
      style={{
        ...abs(X0, 232, W, 270),
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
      }}
    >
      {[
        {
          tld: '.com',
          badge: 'GLOBAL STANDARD',
          title: 'Komersial & Paling Dipercaya',
          desc: 'Ekstensi paling populer di dunia; pilihan utama ketika brand siap tampil makin mapan & komersial.',
          bg: TINT_BLUE,
          bd: BLUE_BORDER,
          accent: BLUE_TEXT,
        },
        {
          tld: '.id',
          badge: 'NATIONAL BRAND',
          title: 'Identitas Resmi Indonesia',
          desc: 'Singkat, bergengsi, & langsung menunjukkan kredibilitas tinggi di pasar lokal Indonesia.',
          bg: TINT_PINK,
          bd: CORAL_HEX,
          accent: CORAL_TEXT,
        },
        {
          tld: '.my.id',
          badge: 'DIPAKAI DI SESI 7',
          title: 'Praktis untuk MVP & Launch Awal',
          desc: 'Terjangkau & disupport jagoanhosting.com untuk mengganti .vercel.app saat mulai go live.',
          bg: TINT_TEAL,
          bd: TEAL_HEX,
          accent: TEAL_HEX,
        },
      ].map((item) => (
        <div
          key={item.tld}
          style={{
            borderRadius: 24,
            background: item.bg,
            border: `2.5px solid ${item.bd}`,
            padding: '28px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: MONO, fontSize: 44, fontWeight: 800, color: INK }}>
              {item.tld}
            </span>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: 99,
                background: '#FFFFFF',
                border: `1.5px solid ${item.bd}`,
                fontFamily: MONO,
                fontSize: 13,
                fontWeight: 780,
                color: item.accent,
              }}
            >
              {item.badge}
            </span>
          </div>
          <div>
            <div style={{ ...headline(25), color: INK, marginBottom: 6 }}>{item.title}</div>
            <div style={{ fontSize: 19, color: BODY, lineHeight: 1.42 }}>{item.desc}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Row 2: 2 Specialized TLDs (.co.id, .store) */}
    <div
      style={{
        ...abs(X0, 526, W, 260),
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 24,
      }}
    >
      {[
        {
          tld: '.co.id',
          badge: 'CORPORATE / PT',
          title: 'Resmi untuk Badan Usaha & Perusahaan',
          desc: 'Membutuhkan legalitas perusahaan/UMKM terdaftar sehingga memberi tingkat kepercayaan bisnis tertinggi di Indonesia.',
          bg: TINT_YELLOW,
          bd: AMBER_BORDER,
          accent: AMBER_TEXT,
        },
        {
          tld: '.store',
          badge: 'E-COMMERCE NICHE',
          title: 'Khusus Toko Online & Brand Ritel',
          desc: 'Ekstensi modern yang langsung menegaskan website sebagai toko online seperti UrbanStore dan mudah diingat pembeli.',
          bg: TINT_LAVENDER,
          bd: LAVENDER_BORDER,
          accent: LAVENDER_TEXT,
        },
      ].map((item) => (
        <div
          key={item.tld}
          style={{
            borderRadius: 24,
            background: item.bg,
            border: `2.5px solid ${item.bd}`,
            padding: '28px 34px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: MONO, fontSize: 44, fontWeight: 800, color: INK }}>
              {item.tld}
            </span>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: 99,
                background: '#FFFFFF',
                border: `1.5px solid ${item.bd}`,
                fontFamily: MONO,
                fontSize: 14,
                fontWeight: 780,
                color: item.accent,
              }}
            >
              {item.badge}
            </span>
          </div>
          <div>
            <div style={{ ...headline(26), color: INK, marginBottom: 6 }}>{item.title}</div>
            <div style={{ fontSize: 20, color: BODY, lineHeight: 1.44 }}>{item.desc}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Bottom Strategy Bar */}
    <div
      style={{
        ...abs(X0, 814, W, 120),
        borderRadius: 22,
        background: TINT_NEUTRAL,
        border: `2px solid ${RULE}`,
        padding: '0 36px',
        ...row,
        justifyContent: 'space-between',
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 680, color: INK }}>
        <strong style={{ color: TEAL_HEX }}>Rekomendasi Praktis:</strong> Launch cepat dengan{' '}
        <code>.my.id</code> dari <strong>jagoanhosting.com</strong>, lalu upgrade ke <code>.com</code>{' '}
        atau <code>.id</code> saat bisnis makin berkembang.
      </div>
      <span
        style={{
          padding: '8px 18px',
          borderRadius: 99,
          background: TINT_TEAL,
          fontFamily: MONO,
          fontSize: 16,
          fontWeight: 780,
          color: TEAL_HEX,
          whiteSpace: 'nowrap',
        }}
      >
        5 TLD TERPOPULER
      </span>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 09 — KONSEP & ALUR DNS (DOMAIN KE VERCEL)                             */
/* ============================================================================ */

const DnsStepArt = ({ step }: { step: '01' | '02' | '03' | '04' }) => {
  if (step === '01') {
    return (
      <Ink width={260} height={118}>
        <circle cx="130" cy="60" r="46" fill="#FFFFFF" stroke="none" opacity={0.75} />
        {/* Browser Search Bar Doodle */}
        <rect x="44" y="28" width="172" height="58" rx="14" fill="#FFFFFF" />
        <path d="M44 48 H216" strokeWidth={2.2} />
        <circle cx="60" cy="38" r="3.5" fill={CORAL_HEX} stroke="none" />
        <circle cx="72" cy="38" r="3.5" fill={YELLOW} stroke="none" />
        <circle cx="84" cy="38" r="3.5" fill={TEAL_HEX} stroke="none" />
        {/* Address Pill + Magnifying Glass */}
        <rect x="58" y="57" width="114" height="18" rx="6" fill={TINT_YELLOW} stroke={AMBER_BORDER} strokeWidth={2} />
        <path d="M68 66 h70" stroke={AMBER_TEXT} strokeWidth={2.4} />
        <circle cx="192" cy="66" r="8" fill={TINT_TEAL} stroke={TEAL_HEX} strokeWidth={2.2} />
        <path d="M198 72 l7 7" stroke={TEAL_HEX} strokeWidth={2.6} />
      </Ink>
    );
  }
  if (step === '02') {
    return (
      <Ink width={260} height={118}>
        <circle cx="130" cy="60" r="46" fill="#FFFFFF" stroke="none" opacity={0.8} />
        {/* DNS Signpost / Address Routing Doodle */}
        <path d="M130 20 V100" strokeWidth={3} />
        <rect x="64" y="28" width="102" height="24" rx="8" fill={TINT_YELLOW} stroke={AMBER_BORDER} strokeWidth={2.2} />
        <path d="M76 40 h66" stroke={AMBER_TEXT} strokeWidth={2.4} />
        <path d="M130 56 H204 L214 68 L204 80 H130 Z" fill="#FFFFFF" stroke={BLUE_TEXT} strokeWidth={2.4} />
        <path d="M144 68 h48" stroke={BLUE_TEXT} strokeWidth={2.6} />
        <circle cx="68" cy="84" r="10" fill={TINT_TEAL} stroke={TEAL_HEX} strokeWidth={2.2} />
        <path d="M84 82 Q 106 84 122 70" stroke={TEAL_HEX} strokeWidth={2.4} strokeDasharray="4 4" />
      </Ink>
    );
  }
  if (step === '03') {
    return (
      <Ink width={260} height={118}>
        <circle cx="130" cy="60" r="46" fill={TINT_TEAL} stroke="none" />
        {/* Cloud + Vercel Prism + Lock Doodle */}
        <path
          d="M72 82 C54 82, 46 66, 58 54 C58 36, 80 26, 98 34 C110 18, 144 18, 156 36 C178 32, 196 48, 190 66 C198 76, 188 82, 174 82 Z"
          fill="#FFFFFF"
        />
        {/* Vercel Triangle Motif */}
        <path d="M124 44 L144 74 H104 Z" fill={TINT_BLUE} stroke={INK_HEX} strokeWidth={2.4} />
        {/* Small Lock */}
        <rect x="172" y="56" width="24" height="20" rx="5" fill={TINT_YELLOW} stroke={AMBER_TEXT} strokeWidth={2.2} />
        <path d="M178 56 v-5 a6 6 0 0 1 12 0 v5" stroke={AMBER_TEXT} strokeWidth={2.2} />
      </Ink>
    );
  }
  return (
    <Ink width={260} height={118}>
      <circle cx="130" cy="60" r="46" fill="#FFFFFF" stroke="none" opacity={0.8} />
      {/* Live Website Checkmark Card */}
      <rect x="64" y="24" width="132" height="76" rx="12" fill="#FFFFFF" />
      <path d="M64 44 H196" strokeWidth={2.2} />
      <rect x="78" y="31" width="76" height="8" rx="4" fill={TINT_TEAL} stroke="none" />
      <circle cx="130" cy="70" r="18" fill={TINT_TEAL} stroke={TEAL_HEX} strokeWidth={2.4} />
      <path d="M122 70 l6 6 l12 -13" stroke={TEAL_HEX} strokeWidth={2.8} />
      <Sparkle x={208} y={30} s={0.75} fill={YELLOW} />
      <Sparkle x={48} y={76} s={0.55} fill={CORAL_HEX} />
    </Ink>
  );
};

const Slide09DnsVercel: Page = () => (
  <Frame>
    <Eyebrow>Konsep DNS · Dari Nama Domain ke Server</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(52) }}>
      <Highlight color={HIGHLIGHT_TEAL}>DNS</Highlight> menghubungkan custom domain langsung ke Vercel.
    </h2>

    {/* Top Row: 4 Simple Flow Cards with Hand-Drawn Illustrations */}
    <div
      style={{
        ...abs(X0, 224, W, 474),
        display: 'grid',
        gridTemplateColumns: '1fr 40px 1fr 40px 1fr 40px 1fr',
        alignItems: 'center',
      }}
    >
      {[
        {
          step: '01' as const,
          eyebrow: '01 · USER',
          title: 'Ketik Alamat',
          pill: 'urbanstore.my.id',
          desc: 'Pembeli membuka nama domain toko lewat browser HP atau laptop.',
          bg: TINT_YELLOW,
          bd: AMBER_BORDER,
          eyebrowColor: AMBER_TEXT,
          pillColor: AMBER_TEXT,
        },
        {
          step: '02' as const,
          eyebrow: '02 · DNS',
          title: 'Penunjuk Arah',
          pill: 'jagoanhosting.com',
          desc: 'DNS mencocokkan nama domain dengan lokasi server aplikasi.',
          bg: TINT_BLUE,
          bd: BLUE_BORDER,
          eyebrowColor: BLUE_TEXT,
          pillColor: BLUE_TEXT,
        },
        {
          step: '03' as const,
          eyebrow: '03 · HOSTING',
          title: 'Server Vercel',
          pill: 'App + Auto SSL',
          desc: 'Vercel menyajikan aplikasi UrbanStore sekaligus mengaktifkan HTTPS.',
          bg: '#FFFFFF',
          bd: RULE,
          eyebrowColor: BODY,
          pillColor: INK,
        },
        {
          step: '04' as const,
          eyebrow: '04 · LIVE',
          title: 'Website Terbuka',
          pill: 'https:// Aman',
          desc: 'Halaman UrbanStore tampil cepat & terpercaya di layar pembeli.',
          bg: TINT_TEAL,
          bd: TEAL_HEX,
          eyebrowColor: TEAL_HEX,
          pillColor: TEAL_HEX,
        },
      ].flatMap((node, idx) => {
        const card = (
          <div
            key={node.step}
            style={{
              height: '100%',
              borderRadius: 24,
              background: node.bg,
              border: `2px solid ${node.bd}`,
              padding: '24px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 780, color: node.eyebrowColor }}>
              {node.eyebrow}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
              <DnsStepArt step={node.step} />
            </div>

            <div>
              <div style={{ ...headline(28), color: INK, marginBottom: 10 }}>{node.title}</div>
              <span
                style={{
                  display: 'inline-block',
                  padding: '6px 14px',
                  borderRadius: 10,
                  background: '#FFFFFF',
                  border: `1.5px solid ${RULE}`,
                  fontFamily: MONO,
                  fontSize: 16,
                  fontWeight: 760,
                  color: node.pillColor,
                  marginBottom: 12,
                }}
              >
                {node.pill}
              </span>
              <div style={{ fontSize: 18, color: BODY, lineHeight: 1.45 }}>{node.desc}</div>
            </div>
          </div>
        );
        if (idx === 3) return [card];
        return [
          card,
          <div
            key={`dns-arr-${idx}`}
            style={{ textAlign: 'center', fontFamily: MONO, fontSize: 26, fontWeight: 800, color: TEAL_HEX }}
          >
            →
          </div>,
        ];
      })}
    </div>

    {/* Bottom Row: Simple Analogy + Practice Reminder */}
    <div
      style={{
        ...abs(X0, 728, W, 204),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 24,
      }}
    >
      <div
        style={{
          borderRadius: 24,
          background: TINT_NEUTRAL,
          border: `2px solid ${RULE}`,
          padding: '28px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: TEAL_HEX }}>
          ANALOGI SEDERHANA
        </div>
        <div>
          <div style={{ ...headline(30), color: INK, marginBottom: 8 }}>
            DNS = Buku Kontak Internet
          </div>
          <div style={{ fontSize: 20, color: BODY, lineHeight: 1.45 }}>
            Sama seperti menyimpan nama teman di HP agar tidak perlu menghafal nomor telepon, DNS
            mengubah <span style={{ fontFamily: MONO, color: INK }}>urbanstore.my.id</span> menjadi
            alamat server tujuan.
          </div>
        </div>
      </div>

      <div
        style={{
          borderRadius: 24,
          background: TINT_PINK,
          border: `2px solid ${CORAL_HEX}`,
          padding: '28px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: CORAL_TEXT }}>
            CATATAN PRAKTIK
          </span>
          <ShieldIcon color={CORAL_HEX} size={26} />
        </div>
        <div>
          <div style={{ ...headline(30), color: INK, marginBottom: 8 }}>
            Detail Teknis Dipandu saat Praktik
          </div>
          <div style={{ fontSize: 20, color: BODY, lineHeight: 1.45 }}>
            Pengaturan konkret antara panel <strong style={{ color: INK }}>jagoanhosting.com</strong>{' '}
            dan <strong style={{ color: INK }}>Vercel</strong> akan kita ikuti bareng di sesi
            praktik — jangan asal ubah sendiri.
          </div>
        </div>
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 09 — BRANDING URBANSTORE                                               */
/* ============================================================================ */

const Slide09Branding: Page = () => (
  <Frame>
    <Eyebrow>Brand Identity Polish · Visual Credibility</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(52) }}>
      Website live belum tentu terasa seperti{' '}
      <Highlight color={HIGHLIGHT_TEAL}>produk matang</Highlight>.
    </h2>

    {/* Left: 6 Branding Essentials Grid */}
    <div
      style={{
        ...abs(X0, 232, 980, 560),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 18,
      }}
    >
      {[
        { num: '01', t: 'Logo Tajam', d: 'Header toko & invoice pakai logo bersih.', bg: TINT_TEAL, bd: TEAL_HEX },
        { num: '02', t: 'Favicon Tab', d: 'Ganti ikon bawaan framework di browser tab.', bg: TINT_YELLOW, bd: AMBER_BORDER },
        { num: '03', t: 'Color Palette', d: 'Primer, aksen Teal, & netral konsisten.', bg: TINT_BLUE, bd: BLUE_BORDER },
        { num: '04', t: 'Typography', d: 'Hirarki judul & body seragam di semua page.', bg: TINT_PINK, bd: CORAL_HEX },
        { num: '05', t: 'Button Style', d: 'Radius, hover, & kontras tombol konsisten.', bg: TINT_LAVENDER, bd: LAVENDER_BORDER },
        { num: '06', t: 'UI Components', d: 'Katalog, Cart, & /admin dalam satu bahasa visual.', bg: TINT_GREEN, bd: GREEN_BORDER },
      ].map((b) => (
        <div
          key={b.num}
          style={{
            borderRadius: 20,
            background: b.bg,
            border: `2px solid ${b.bd}`,
            padding: '22px 26px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 780, color: BODY, marginBottom: 6 }}>
            BRAND ELEMENT {b.num}
          </div>
          <div style={{ ...headline(27), color: INK, marginBottom: 6 }}>{b.t}</div>
          <div style={{ fontSize: 19, color: BODY, lineHeight: 1.38 }}>{b.d}</div>
        </div>
      ))}
    </div>

    {/* Right: Visual Identity Card Mockup */}
    <div
      style={{
        ...abs(1136, 232, 664, 560),
        borderRadius: 26,
        background: TINT_NEUTRAL,
        border: `2px solid ${RULE}`,
        padding: '30px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX }}>
        CONTOH IDENTITAS URBANSTORE
      </div>

      {/* Browser Tab Preview */}
      <div
        style={{
          borderRadius: 18,
          background: '#FFFFFF',
          border: `2px solid ${RULE}`,
          padding: '18px 22px',
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 14, color: SOFT, marginBottom: 10 }}>
          BROWSER TAB &amp; FAVICON
        </div>
        <div
          style={{
            borderRadius: 12,
            background: TINT_TEAL,
            border: `1.5px solid ${TEAL_HEX}`,
            padding: '10px 16px',
            ...row,
            gap: 12,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: TEAL_HEX,
              color: '#FFFFFF',
              fontFamily: MONO,
              fontSize: 13,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            U
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, color: INK }}>
            UrbanStore — Minimalist Streetwear
          </span>
        </div>
      </div>

      {/* Color Swatches */}
      <div
        style={{
          borderRadius: 18,
          background: '#FFFFFF',
          border: `2px solid ${RULE}`,
          padding: '18px 22px',
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 14, color: SOFT, marginBottom: 12 }}>
          PALETTE &amp; BUTTON TOKENS
        </div>
        <div style={{ ...row, gap: 12 }}>
          {[
            { hex: '#191919', label: 'Ink' },
            { hex: '#3CA5A1', label: 'Teal' },
            { hex: '#F8DA7E', label: 'Amber' },
            { hex: '#FFFEFC', label: 'Paper', border: true },
          ].map((sw) => (
            <div key={sw.hex} style={{ flex: 1, textAlign: 'center' }}>
              <div
                style={{
                  height: 44,
                  borderRadius: 10,
                  background: sw.hex,
                  border: sw.border ? `1.5px solid ${RULE}` : 'none',
                }}
              />
              <div style={{ fontFamily: MONO, fontSize: 13, color: BODY, marginTop: 6 }}>
                {sw.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mantra */}
      <div
        style={{
          borderRadius: 16,
          background: TINT_YELLOW,
          border: `2px solid ${AMBER_BORDER}`,
          padding: '16px 22px',
          textAlign: 'center',
          fontSize: 22,
          fontFamily: SERIF,
          fontStyle: 'italic',
          fontWeight: 600,
          color: INK,
        }}
      >
        “Consistency creates credibility.”
      </div>
    </div>

    {/* Bottom Note */}
    <div
      style={{
        ...abs(X0, 822, W, 112),
        borderRadius: 22,
        background: TINT_TEAL,
        border: `2px solid ${TEAL_HEX}`,
        padding: '0 36px',
        ...row,
        justifyContent: 'space-between',
      }}
    >
      <span style={{ fontSize: 23, fontWeight: 700, color: INK }}>
        Cek tab browser, halaman Checkout Mayar.id, &amp; Admin Panel — pastikan tidak ada aset
        default yang tertinggal.
      </span>
      <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX }}>
        BRAND POLISH
      </span>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 10 — METADATA & OPEN GRAPH                                             */
/* ============================================================================ */

const Slide10MetadataOG: Page = () => {
  const [platform, setPlatform] = useState<'wa' | 'li'>('wa');

  return (
    <Frame>
      <Eyebrow>Metadata &amp; Open Graph · Social Share Preview</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        Pastikan link <Highlight color={HIGHLIGHT_TEAL}>urbanstore.my.id</Highlight> rapi saat
        dibagikan ke sosmed.
      </h2>

      {/* Left: Metadata & Open Graph Checklist */}
      <div
        style={{
          ...abs(X0, 232, 760, 700),
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: 24,
            background: TINT_BLUE,
            border: `2px solid ${BLUE_BORDER}`,
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: BLUE_TEXT }}>
            01 · HTML METADATA (SEO &amp; TAB)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { k: '<title>', v: 'Judul halaman singkat & jelas' },
              { k: 'description', v: 'Ringkasan 140–160 karakter di Google' },
              { k: 'keywords', v: 'Kata kunci fashion UrbanStore' },
            ].map((m) => (
              <div
                key={m.k}
                style={{
                  borderRadius: 14,
                  background: '#FFFFFF',
                  padding: '14px 18px',
                  ...row,
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 760, color: BLUE_TEXT }}>
                  {m.k}
                </span>
                <span style={{ fontSize: 19, color: INK }}>{m.v}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            borderRadius: 24,
            background: TINT_YELLOW,
            border: `2px solid ${AMBER_BORDER}`,
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: AMBER_TEXT }}>
            02 · OPEN GRAPH (WHATSAPP / LINKEDIN)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { k: 'og:title', v: 'Judul preview kartu share' },
              { k: 'og:description', v: 'Ajakan klik singkat & menarik' },
              { k: 'og:image', v: 'Banner visual rasio 1200 × 630 px' },
              { k: 'og:url', v: 'https://urbanstore.my.id' },
            ].map((m) => (
              <div
                key={m.k}
                style={{
                  borderRadius: 14,
                  background: '#FFFFFF',
                  padding: '12px 18px',
                  ...row,
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 760, color: AMBER_TEXT }}>
                  {m.k}
                </span>
                <span style={{ fontSize: 19, color: INK }}>{m.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Interactive Live Link Share Preview */}
      <div
        style={{
          ...abs(920, 232, 880, 700),
          borderRadius: 26,
          background: TINT_NEUTRAL,
          border: `2px solid ${RULE}`,
          padding: '30px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX }}>
            SIMULASI LINK PREVIEW
          </span>
          <div style={{ ...row, gap: 10 }}>
            {[
              { id: 'wa' as const, label: 'WhatsApp' },
              { id: 'li' as const, label: 'LinkedIn / X' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPlatform(tab.id)}
                className="s7-interactive"
                style={{
                  borderRadius: 99,
                  border: `2px solid ${platform === tab.id ? TEAL_HEX : RULE}`,
                  background: platform === tab.id ? TINT_TEAL : '#FFFFFF',
                  padding: '7px 18px',
                  fontFamily: MONO,
                  fontSize: 15,
                  fontWeight: 740,
                  color: INK,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mock Share Card */}
        <div
          style={{
            borderRadius: 22,
            background: '#FFFFFF',
            border: `2px solid ${RULE}`,
            overflow: 'hidden',
          }}
        >
          {/* OG Banner Artwork */}
          <div
            style={{
              height: 270,
              background: platform === 'wa' ? TINT_TEAL : TINT_BLUE,
              borderBottom: `1.5px solid ${RULE}`,
              padding: '28px 34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: TEAL_HEX }}>
                OG:IMAGE · 1200 × 630 PX
              </div>
              <div style={{ ...headline(40), color: INK, marginTop: 10 }}>UrbanStore.</div>
              <div style={{ fontSize: 21, color: BODY, marginTop: 6 }}>
                Minimalist Streetwear · AI Size Helper · QRIS Checkout
              </div>
            </div>
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: 24,
                background: '#FFFFFF',
                border: `2px solid ${INK_HEX}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: MONO,
                fontSize: 40,
                fontWeight: 800,
                color: TEAL_HEX,
              }}
            >
              US
            </div>
          </div>

          <div style={{ padding: '24px 32px' }}>
            <div style={{ fontFamily: MONO, fontSize: 15, color: TEAL_HEX, fontWeight: 700 }}>
              https://urbanstore.my.id
            </div>
            <div style={{ ...headline(28), color: INK, marginTop: 6 }}>
              UrbanStore — Fashion Minimalis Tanpa Ribet
            </div>
            <div style={{ fontSize: 20, color: BODY, marginTop: 8, lineHeight: 1.45 }}>
              Pilih ukuran pas bareng AI CS, belanja koleksi Essentials &amp; Outerwear, lalu bayar
              instan via QRIS.
            </div>
          </div>
        </div>

        <div style={{ fontFamily: MONO, fontSize: 16, color: BODY }}>
          {platform === 'wa'
            ? 'Tampilan bubble share WhatsApp dengan thumbnail rapi.'
            : 'Tampilan Social Card di LinkedIn & X meningkatkan CTR.'}
        </div>
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 11 — PRE-LAUNCH SECURITY CHECKLIST                                     */
/* ============================================================================ */

const SecurityPillarArt = ({ kind }: { kind: 'secret' | 'guard' | 'input' }) => {
  if (kind === 'secret') {
    return (
      <Ink width={440} height={96}>
        <circle cx="220" cy="48" r="38" fill="#FFFFFF" stroke="none" opacity={0.85} />
        <rect x="86" y="22" width="110" height="52" rx="10" fill="#FFFFFF" stroke={CORAL_HEX} strokeWidth={2.2} />
        <text x="141" y="54" textAnchor="middle" stroke="none" fill={CORAL_TEXT} fontSize="15" fontFamily={MONO} fontWeight="700">
          .env key
        </text>
        <path d="M206 48 H246" stroke={CORAL_HEX} strokeWidth={2.4} strokeDasharray="4 4" />
        <rect x="256" y="20" width="96" height="56" rx="12" fill="#FFFFFF" stroke={INK_HEX} strokeWidth={2.4} />
        <path d="M294 36 v-5 a10 10 0 0 1 20 0 v5" stroke={TEAL_HEX} strokeWidth={2.4} />
        <rect x="284" y="36" width="40" height="28" rx="6" fill={TINT_TEAL} stroke={TEAL_HEX} strokeWidth={2.2} />
      </Ink>
    );
  }
  if (kind === 'guard') {
    return (
      <Ink width={440} height={96}>
        <circle cx="220" cy="48" r="38" fill="#FFFFFF" stroke="none" opacity={0.85} />
        <rect x="84" y="24" width="112" height="48" rx="10" fill="#FFFFFF" stroke={TEAL_HEX} strokeWidth={2.2} />
        <text x="140" y="53" textAnchor="middle" stroke="none" fill={TEAL_HEX} fontSize="15" fontFamily={MONO} fontWeight="700">
          /admin
        </text>
        <path d="M220 12 L254 24 V48 C254 64, 240 78, 220 84 C200 78, 186 64, 186 48 V24 L220 12 Z" fill="#FFFFFF" stroke={INK_HEX} strokeWidth={2.6} />
        <path d="M208 48 L217 57 L234 38" stroke={TEAL_HEX} strokeWidth={2.8} />
        <rect x="272" y="24" width="92" height="48" rx="10" fill="#FFFFFF" stroke={BLUE_BORDER} strokeWidth={2.2} />
        <text x="318" y="53" textAnchor="middle" stroke="none" fill={BLUE_TEXT} fontSize="14" fontFamily={MONO} fontWeight="700">
          webhook
        </text>
      </Ink>
    );
  }
  return (
    <Ink width={440} height={96}>
      <circle cx="220" cy="48" r="38" fill="#FFFFFF" stroke="none" opacity={0.85} />
      <rect x="78" y="24" width="104" height="48" rx="10" fill="#FFFFFF" stroke={AMBER_BORDER} strokeWidth={2.2} />
      <text x="130" y="53" textAnchor="middle" stroke="none" fill={AMBER_TEXT} fontSize="14" fontFamily={MONO} fontWeight="700">
        Payload
      </text>
      <path d="M194 48 H246 M246 48 L236 41 M246 48 L236 55" stroke={AMBER_TEXT} strokeWidth={2.6} />
      <rect x="256" y="20" width="110" height="56" rx="12" fill="#FFFFFF" stroke={INK_HEX} strokeWidth={2.4} />
      <path d="M276 48 L286 58 L304 38" stroke={TEAL_HEX} strokeWidth={2.8} />
      <path d="M316 42 h34 M316 56 h26" stroke={INK_HEX} strokeWidth={2.4} />
    </Ink>
  );
};

const Slide11SecurityChecklist: Page = () => (
  <Frame>
    <Eyebrow>Security Verification · Kesiapan Production</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(52) }}>
      Verifikasi keamanan <Highlight color={HIGHLIGHT_PINK}>sebelum</Highlight> dibuka ke publik.
    </h2>

    <div
      style={{
        ...abs(X0, 232, W, 548),
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
      }}
    >
      {/* Pillar 1 */}
      <div
        style={{
          borderRadius: 26,
          background: TINT_PINK,
          border: `2px solid ${CORAL_HEX}`,
          padding: '26px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: CORAL_TEXT }}>
              01 · CLOUD &amp; REPO
            </span>
            <LockIcon color={CORAL_HEX} size={24} />
          </div>
          <h3 style={{ ...headline(32), marginBottom: 6 }}>Env &amp; Secret</h3>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.38, color: BODY }}>
            Jaga kredensial server agar tidak ikut terbuka ke publik.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SecurityPillarArt kind="secret" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'Git history bebas file .env',
            'Key tidak terekspos di client bundle',
            'Env Production & Preview terpisah',
          ].map((item) => (
            <div
              key={item}
              style={{
                borderRadius: 14,
                background: '#FFFFFF',
                padding: '14px 16px',
                ...row,
                gap: 12,
                fontSize: 19,
                fontWeight: 640,
                color: INK,
              }}
            >
              <CheckMark color={CORAL_HEX} size={19} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pillar 2 */}
      <div
        style={{
          borderRadius: 26,
          background: TINT_TEAL,
          border: `2.5px solid ${TEAL_HEX}`,
          padding: '26px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: TEAL_HEX }}>
              02 · AUTH &amp; WEBHOOK
            </span>
            <ShieldIcon color={TEAL_HEX} size={24} />
          </div>
          <h3 style={{ ...headline(32), marginBottom: 6 }}>Access Guard</h3>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.38, color: BODY }}>
            Pastikan hanya user berhak &amp; webhook resmi yang bisa masuk.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SecurityPillarArt kind="guard" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'OAuth whitelist hanya domain live',
            'Route /admin wajib cek role Admin',
            'Webhook Mayar validasi signature',
          ].map((item) => (
            <div
              key={item}
              style={{
                borderRadius: 14,
                background: '#FFFFFF',
                padding: '14px 16px',
                ...row,
                gap: 12,
                fontSize: 19,
                fontWeight: 640,
                color: INK,
              }}
            >
              <CheckMark color={TEAL_HEX} size={19} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pillar 3 */}
      <div
        style={{
          borderRadius: 26,
          background: TINT_YELLOW,
          border: `2px solid ${AMBER_BORDER}`,
          padding: '26px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: AMBER_TEXT }}>
              03 · INPUT &amp; API
            </span>
            <GlobeIcon color={AMBER_TEXT} size={24} />
          </div>
          <h3 style={{ ...headline(32), marginBottom: 6 }}>Server Validation</h3>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.38, color: BODY }}>
            Validasi ulang data penting di backend sebelum transaksi.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SecurityPillarArt kind="input" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'Validasi input checkout di server',
            'Error response aman (tanpa stack trace)',
            'Batasi spam request endpoint AI',
          ].map((item) => (
            <div
              key={item}
              style={{
                borderRadius: 14,
                background: '#FFFFFF',
                padding: '14px 16px',
                ...row,
                gap: 12,
                fontSize: 19,
                fontWeight: 640,
                color: INK,
              }}
            >
              <CheckMark color={AMBER_TEXT} size={19} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Golden Security Rule */}
    <div
      style={{
        ...abs(X0, 812, W, 122),
        borderRadius: 22,
        background: TINT_NEUTRAL,
        border: `2px solid ${INK_HEX}`,
        padding: '0 36px',
        ...row,
        justifyContent: 'space-between',
      }}
    >
      <span style={{ fontSize: 26, fontWeight: 780, color: INK }}>
        Aturan Emas: <Highlight color={HIGHLIGHT_PINK}>Never trust user input.</Highlight>
      </span>
      <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: BODY }}>
        Selalu validasi ulang harga, stok, &amp; role di backend.
      </span>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 12 — SECURITY AUDIT DENGAN AI SKILL                                    */
/* ============================================================================ */

const Slide12SecuritySkillAudit: Page = () => (
  <Frame>
    <Eyebrow>Security Skill Audit · Pemeriksaan Pre-Launch</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(52) }}>
      Gunakan <Highlight color={HIGHLIGHT_TEAL}>Security Skill</Highlight> untuk audit final
      sebelum rilis.
    </h2>

    {/* Left: 5 Security Audit Areas */}
    <div
      style={{
        ...abs(X0, 232, 920, 560),
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      {[
        { area: 'Secrets & Env', focus: 'Cek kebocoran API key di bundle & Git.', bg: TINT_PINK, bd: CORAL_HEX, tc: CORAL_TEXT },
        { area: 'Auth & Session', focus: 'Uji proteksi /admin & token sesi Google.', bg: TINT_TEAL, bd: TEAL_HEX, tc: TEAL_HEX },
        { area: 'Input & Webhook', focus: 'Sanitasi form, chat AI, & callback Mayar.', bg: TINT_YELLOW, bd: AMBER_BORDER, tc: AMBER_TEXT },
        { area: 'Dependencies', focus: 'Deteksi package rentan lewat npm audit.', bg: TINT_BLUE, bd: BLUE_BORDER, tc: BLUE_TEXT },
        { area: 'Headers & CORS', focus: 'Pastikan origin API & header HTTPS ketat.', bg: TINT_LAVENDER, bd: LAVENDER_BORDER, tc: LAVENDER_TEXT },
      ].map((rowItem) => (
        <div
          key={rowItem.area}
          style={{
            flex: 1,
            borderRadius: 18,
            background: rowItem.bg,
            border: `2px solid ${rowItem.bd}`,
            padding: '0 28px',
            ...row,
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 780, color: INK }}>{rowItem.area}</span>
          <span style={{ fontSize: 20, fontWeight: 560, color: BODY }}>{rowItem.focus}</span>
        </div>
      ))}
    </div>

    {/* Right: Security Audit Workflow */}
    <div
      style={{
        ...abs(1076, 232, 724, 560),
        borderRadius: 26,
        background: TINT_NEUTRAL,
        border: `2px solid ${RULE}`,
        padding: '30px 34px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX }}>
        WORKFLOW SECURITY AUDIT
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { label: 'UrbanStore', sub: 'Target repository', bg: '#FFFFFF' },
          { label: 'Security Skill', sub: 'Jalankan prompt audit keamanan', bg: TINT_BLUE },
          { label: 'Audit & Findings', sub: 'Daftar celah berprioritas', bg: TINT_YELLOW },
          { label: 'Fix & Retest', sub: 'Perbaiki & verifikasi ulang', bg: TINT_TEAL },
        ].flatMap((node, idx) => {
          const card = (
            <div
              key={node.label}
              style={{
                borderRadius: 14,
                background: node.bg,
                border: `1.5px solid ${RULE}`,
                padding: '14px 20px',
                ...row,
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 22, fontWeight: 760, color: INK }}>{node.label}</span>
              <span style={{ fontFamily: MONO, fontSize: 16, color: BODY }}>{node.sub}</span>
            </div>
          );
          if (idx === 3) return [card];
          return [
            card,
            <div
              key={`sa${idx}`}
              style={{ textAlign: 'center', fontFamily: MONO, fontSize: 18, lineHeight: 1, fontWeight: 800, color: TEAL_HEX }}
            >
              ↓
            </div>,
          ];
        })}
      </div>
    </div>

    {/* Bottom Insight */}
    <div
      style={{
        ...abs(X0, 818, W, 116),
        borderRadius: 22,
        background: TINT_YELLOW,
        border: `2px solid ${AMBER_BORDER}`,
        padding: '0 36px',
        ...row,
        justifyContent: 'space-between',
      }}
    >
      <div>
        <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: AMBER_TEXT }}>
          HUMAN IN THE LOOP:{' '}
        </span>
        <span style={{ fontSize: 23, fontWeight: 700, color: INK }}>
          AI Skill mempercepat temuan celah keamanan — hasil audit tetap wajib direview &amp;
          diverifikasi manual.
        </span>
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 13 — LIVE SMOKE TEST CHECKLIST                                         */
/* ============================================================================ */

const Slide13LiveCheck: Page = () => (
  <Frame>
    <Eyebrow>Live Production Check · Verifikasi di Domain Asli</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(52) }}>
      Final check langsung di <Highlight color={HIGHLIGHT_TEAL}>https://urbanstore.my.id</Highlight>.
    </h2>

    <div
      style={{
        ...abs(X0, 224, W, 580),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 20,
      }}
    >
      {[
        {
          tag: '01 · LIVE MOBILE & HTTPS',
          title: 'Akses Publik & SSL',
          items: ['Buka via HP asli di jaringan seluler', 'Ikon gembok HTTPS aktif (tanpa warning)', 'Layout rapi tanpa scroll horizontal'],
          bg: TINT_TEAL,
          bd: TEAL_HEX,
        },
        {
          tag: '02 · LIVE FLOW & INTEGRASI',
          title: 'Auth, AI, & Payment Live',
          items: ['Google Login di domain live berhasil', 'Webhook Mayar.id update status Lunas', 'Floating Chat CS & Admin AI merespons cepat'],
          bg: TINT_BLUE,
          bd: BLUE_BORDER,
        },
        {
          tag: '03 · LIVE SEO & SHARE CARD',
          title: 'Branding & Open Graph',
          items: ['Favicon & Page Title tampil di tab', 'Link preview rapi saat dishare ke WhatsApp', 'Tidak ada gambar broken (404)'],
          bg: TINT_YELLOW,
          bd: AMBER_BORDER,
        },
        {
          tag: '04 · SECURITY & PERFORMANCE',
          title: 'Stabil & Zero Console Error',
          items: ['Zero console error di DevTools production', 'Halaman /admin menolak akun non-admin', 'Bundle & asset gambar termuat cepat'],
          bg: TINT_PINK,
          bd: CORAL_HEX,
        },
      ].map((box) => (
        <div
          key={box.tag}
          style={{
            borderRadius: 22,
            background: box.bg,
            border: `2px solid ${box.bd}`,
            padding: '20px 26px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ ...headline(26), color: INK }}>{box.title}</div>
            <div style={{ fontFamily: MONO, fontSize: 14, fontWeight: 780, color: BODY }}>
              {box.tag}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {box.items.map((pt) => (
              <div
                key={pt}
                style={{
                  borderRadius: 11,
                  background: '#FFFFFF',
                  padding: '10px 16px',
                  ...row,
                  gap: 12,
                  fontSize: 19,
                  fontWeight: 620,
                  color: INK,
                }}
              >
                <CheckMark color={box.bd} size={18} />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div
      style={{
        ...abs(X0, 828, W, 102),
        borderRadius: 20,
        background: TINT_NEUTRAL,
        border: `2px solid ${RULE}`,
        padding: '0 34px',
        ...row,
        justifyContent: 'space-between',
      }}
    >
      <span style={{ fontSize: 22, fontWeight: 700, color: INK }}>
        Banyak bug rilis terjadi karena lupa update URL callback dari <code>localhost</code> ke domain
        live.
      </span>
      <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX }}>
        SMOKE TEST LIVE
      </span>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 14 — FINAL LAUNCH FLOW & DEFINITION OF DONE                            */
/* ============================================================================ */

const Slide14LaunchFlowDoD: Page = () => {
  const [checked, setChecked] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const dodItems = [
    'Bisa diakses publik via HTTPS',
    'Custom domain .my.id (jagoanhosting.com) aktif',
    'Branding, Favicon, & Open Graph lengkap',
    'Env Vars & secret aman di Vercel',
    'Security Audit tuntas & terverifikasi',
    'Live Auth, AI, & Mayar.id berjalan lancar',
  ];

  const toggleDod = (idx: number) =>
    setChecked((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));

  return (
    <Frame>
      <Eyebrow>Final Launch Flow · Definition of Done</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(52) }}>
        Dari commit terakhir hingga <Highlight color={HIGHLIGHT_TEAL}>UrbanStore</Highlight> resmi
        live.
      </h2>

      {/* Left: 8-Stage Timeline */}
      <div
        style={{
          ...abs(X0, 232, 860, 702),
          borderRadius: 26,
          background: TINT_NEUTRAL,
          border: `2px solid ${RULE}`,
          padding: '28px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX }}>
          FINAL LAUNCH PIPELINE
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
            { n: '01', t: 'Code Complete', bg: '#FFFFFF', bd: RULE },
            { n: '02', t: 'Git Push', bg: '#FFFFFF', bd: RULE },
            { n: '03', t: 'Deploy Vercel', bg: TINT_BLUE, bd: BLUE_BORDER },
            { n: '04', t: 'Env Variables', bg: TINT_BLUE, bd: BLUE_BORDER },
            { n: '05', t: 'Domain .my.id (jagoanhosting.com)', bg: TINT_YELLOW, bd: AMBER_BORDER },
            { n: '06', t: 'Branding & Open Graph', bg: TINT_YELLOW, bd: AMBER_BORDER },
            { n: '07', t: 'Security Audit', bg: TINT_PINK, bd: CORAL_HEX },
            { n: '08', t: 'Final Live Test ➔ LIVE', bg: TINT_TEAL, bd: TEAL_HEX },
          ].map((st) => (
            <div
              key={st.n}
              style={{
                borderRadius: 16,
                background: st.bg,
                border: `2px solid ${st.bd}`,
                padding: '20px 22px',
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 780, color: TEAL_HEX }}>
                STEP {st.n}
              </div>
              <div style={{ fontSize: 22, fontWeight: 760, color: INK, marginTop: 6 }}>{st.t}</div>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: MONO, fontSize: 16, color: BODY }}>
          Sesi 1–6 (Build &amp; Polish) ➔ Sesi 7 (Public Launch)
        </div>
      </div>

      {/* Right: Interactive Definition of Done */}
      <div
        style={{
          ...abs(1016, 232, 784, 702),
          borderRadius: 26,
          background: TINT_TEAL,
          border: `2.5px solid ${TEAL_HEX}`,
          padding: '28px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX }}>
            DEFINITION OF DONE ({checked.length}/{dodItems.length})
          </span>
          <span style={{ fontFamily: MONO, fontSize: 15, color: BODY }}>Klik untuk centang</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {dodItems.map((item, idx) => {
            const on = checked.includes(idx);
            return (
              <div
                key={item}
                onClick={() => toggleDod(idx)}
                className="s7-interactive"
                style={{
                  borderRadius: 16,
                  background: '#FFFFFF',
                  border: `2px solid ${on ? TEAL_HEX : RULE}`,
                  padding: '17px 22px',
                  ...row,
                  gap: 16,
                  fontSize: 21,
                  fontWeight: 680,
                  color: INK,
                }}
              >
                <CheckMark color={on ? TEAL_HEX : SOFT} size={24} />
                <span>{item}</span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            borderRadius: 16,
            background: TINT_YELLOW,
            border: `2px solid ${AMBER_BORDER}`,
            padding: '16px 22px',
            fontSize: 21,
            fontWeight: 760,
            color: INK,
            textAlign: 'center',
          }}
        >
          UrbanStore siap dibagikan ke portofolio &amp; pengguna nyata!
        </div>
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 16 — SAATNYA LAUNCH URBANSTORE! (Simple Core CTA + Illustration)       */
/* ============================================================================ */

const LaunchCelebrationArt = ({ live }: { live: boolean }) => (
  <Ink width={700} height={580}>
    {/* Soft Pastel Backdrop Circles */}
    <circle cx="380" cy="300" r="224" fill={TINT_TEAL} stroke="none" />
    <circle cx="510" cy="175" r="102" fill={TINT_YELLOW} stroke="none" />
    <circle cx="210" cy="400" r="88" fill={TINT_PINK} stroke="none" />

    {/* Browser Live Product Card */}
    <rect x="88" y="154" width="440" height="296" rx="20" fill="#FFFFFF" />
    <path d="M88 206 H528" />
    <circle cx="122" cy="180" r="7" fill={CORAL_HEX} stroke="none" />
    <circle cx="146" cy="180" r="7" fill={YELLOW} stroke="none" />
    <circle cx="170" cy="180" r="7" fill={TEAL_HEX} stroke="none" />
    {/* Live URL Address Pill */}
    <rect x="198" y="166" width="290" height="28" rx="9" fill={TINT_TEAL} stroke={TEAL_HEX} strokeWidth={2} />
    <text x="343" y="185" textAnchor="middle" stroke="none" fill={TEAL_HEX} fontSize="15" fontFamily={MONO} fontWeight="700">
      https://urbanstore.my.id
    </text>

    {/* Storefront Showcase Inside Window */}
    <rect x="118" y="228" width="380" height="86" rx="12" fill={TINT_BLUE} />
    <path d="M142 258 h150 M142 282 h224" stroke={BLUE_TEXT} strokeWidth={3} />
    <rect x="406" y="248" width="66" height="44" rx="10" fill="#FFFFFF" stroke={TEAL_HEX} strokeWidth={2.4} />
    <path d="M424 270 l9 9 l18 -20" stroke={TEAL_HEX} strokeWidth={3} />

    <rect x="118" y="334" width="178" height="88" rx="12" fill={TINT_YELLOW} />
    <rect x="320" y="334" width="178" height="88" rx="12" fill={TINT_PINK} />
    <path d="M142 366 h96 M142 388 h122" stroke={AMBER_TEXT} strokeWidth={2.6} />
    <path d="M344 366 h96 M344 388 h118" stroke={CORAL_TEXT} strokeWidth={2.6} />

    {/* Floating Launch Rocket Right */}
    <g transform="translate(556, 178) rotate(14)">
      <path d="M-9 72 Q0 104 0 116 Q0 104 9 72" fill={YELLOW} stroke={AMBER_BORDER} strokeWidth={2.4} />
      <path d="M-22 48 L-40 68 L-18 68 Z" fill={TINT_PINK} />
      <path d="M22 48 L40 68 L18 68 Z" fill={TINT_PINK} />
      <path d="M0 -42 C28 -10, 28 36, 20 68 H-20 C-28 36, -28 -10, 0 -42 Z" fill="#FFFFFF" />
      <circle cx="0" cy="14" r="11" fill={TINT_TEAL} stroke={TEAL_HEX} strokeWidth={2.6} />
    </g>

    {/* Curved Swoosh & Sparkles */}
    <Stroke
      d="M52 380 C24 300 44 200 108 134 M108 134 L88 136 M108 134 L106 154"
      color={CORAL_HEX}
      live={live}
      delay={0.35}
    />
    <Sparkle x={200} y={88} s={0.9} fill={TEAL_HEX} />
    <Sparkle x={596} y={76} s={1.15} fill={YELLOW} />
    <Sparkle x={620} y={376} s={0.85} fill={PINK} />
    <path d="M40 492 Q 350 482 652 490" />
  </Ink>
);

const Slide16LaunchCta: Page = () => {
  const live = useIsActivePage();
  return (
    <Frame>
      <Eyebrow>Praktik Peserta · Launch Time</Eyebrow>

      {/* Left Column: Simple Core CTA */}
      <div
        style={{
          ...abs(X0, 224, 880, 680),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 28,
        }}
      >
        <span
          style={{
            padding: '8px 22px',
            borderRadius: 99,
            background: TINT_TEAL,
            border: `1.5px solid ${TEAL_HEX}`,
            fontFamily: MONO,
            fontSize: 17,
            fontWeight: 780,
            color: TEAL_HEX,
          }}
        >
          BAWA KARYA DARI LOCALHOST KE DUNIA NYATA
        </span>

        <h2 style={{ ...headline(70), lineHeight: 1.06 }}>
          Saatnya Launch <Highlight color={HIGHLIGHT_TEAL}>UrbanStore</Highlight>!
        </h2>

        <p
          style={{
            margin: 0,
            maxWidth: 820,
            fontSize: 28,
            lineHeight: 1.5,
            color: BODY,
          }}
        >
          Rilis <strong style={{ color: INK }}>UrbanStore</strong> ke{' '}
          <strong style={{ color: INK }}>Vercel</strong>, aktifkan custom domain{' '}
          <strong style={{ color: TEAL_HEX }}>.my.id</strong> dari{' '}
          <strong style={{ color: INK }}>jagoanhosting.com</strong>, rapikan branding, &amp;
          pastikan keamanannya siap dibagikan ke publik!
        </p>

        <div
          style={{
            marginTop: 10,
            padding: '20px 30px',
            borderRadius: 20,
            background: TINT_YELLOW,
            border: `2px solid ${AMBER_BORDER}`,
            ...row,
            gap: 20,
          }}
        >
          <LockIcon color={TEAL_HEX} size={28} />
          <span style={{ fontFamily: MONO, fontSize: 28, fontWeight: 780, color: INK }}>
            https://urbanstore.my.id
          </span>
          <span
            style={{
              padding: '10px 22px',
              borderRadius: 12,
              background: TEAL_HEX,
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: 780,
            }}
          >
            UrbanStore is LIVE!
          </span>
        </div>
      </div>

      {/* Right Column: Launch Celebration Illustration */}
      <div style={{ ...abs(1060, 224, 740, 680), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LaunchCelebrationArt live={live} />
      </div>
    </Frame>
  );
};

export const meta: SlideMeta = {
  title: '[VCB Batch 4] Sesi 7 - Deployment, Custom Domain, Security & Branding',
  createdAt: '2026-11-13T15:42:00.000Z',
  theme: 'swiss-japanese',
};

export const notes: (string | undefined)[] = [
  `Selamat datang di Sesi 7 Vibe Coding Bootcamp Batch 4! Hari ini kita meluncurkan aplikasi UrbanStore dari localhost ke internet publik sebagai produk live.`,
  `Tujuan Sesi 7: Deploy ke Vercel, atur Environment Variables di cloud, ganti URL testing .vercel.app ke domain .my.id lewat jagoanhosting.com, pilih TLD yang tepat, lengkapi Branding & Open Graph, serta jalankan Security Audit pre-launch.`,
  `Tekankan perbedaan Development (localhost), URL testing sementara (.vercel.app), vs Production custom domain (urbanstore.my.id). Kode yang lancar di localhost belum tentu siap dibuka ke publik sebelum konfigurasi dan keamanannya dicek.`,
  `Jelaskan proses otomatis Vercel: tarik kode dari GitHub -> install dependencies -> build -> publish URL HTTPS. Klik tiap langkah di kanan sambil menjelaskan auto-deploy saat git push.`,
  `Di Sesi 5 dan 6 peserta sudah menyimpan key di .env lokal. Di Sesi 7, jelaskan bahwa .env lokal di-gitignore sehingga semua key wajib dimasukkan ke Vercel Dashboard, DAN Redirect URI Google OAuth serta Webhook URL Mayar.id harus diupdate ke domain live.`,
  `Bandingkan konfigurasi Development vs Production (localhost vs domain live, Test DB vs Production DB, Sandbox vs Live Key) dan tekankan cek npm run build lokal sebelum push.`,
  `Jelaskan bahwa .vercel.app dipakai untuk testing, dan lewat support partner resmi CODEPOLITAN jagoanhosting.com kita menggantinya dengan domain publik .my.id agar branding lebih profesional. Nantinya saat scale bisnis bisa upgrade ke .com atau TLD lainnya.`,
  `Kenalkan 5 rekomendasi ekstensi domain (TLD) yang paling banyak dipakai (.com, .id, .my.id, .co.id, .store) sebagai bekal peserta memilih atau meng-upgrade domain di jagoanhosting.com.`,
  `Jelaskan konsep alur DNS secara sederhana dengan analogi Buku Kontak Internet: user ketik domain urbanstore.my.id, DNS jagoanhosting.com mengarahkan ke server Vercel (+ Auto SSL), lalu website tampil. Ingatkan bahwa pengaturan teknisnya akan dipandu di sesi praktik.`,
  `Website live perlu identitas brand yang konsisten (Consistency creates credibility). Cek detail yang sering lupa: Favicon browser tab, logo header/invoice, color palette, typography, dan style tombol.`,
  `Simulasikan link share preview ke WhatsApp dan LinkedIn. Jelaskan peran HTML Metadata dan Open Graph (og:title, og:description, og:image 1200x630) agar link promosi UrbanStore tampil profesional.`,
  `Checklist keamanan khusus sebelum dibuka ke publik: Git history bersih dari secret, domain whitelist OAuth & validasi webhook signature Mayar aktif, serta validasi input server-side. Prinsip: Never trust user input.`,
  `Berbeda dengan Sesi 6 (audit kualitas kode umum), di Sesi 7 jalankan Security Skill khusus pre-launch: cek kebocoran env, proteksi /admin, sanitasi input, npm audit dependencies, dan header/CORS. Hasil audit AI tetap wajib direview manual.`,
  `Lakukan Live Smoke Test langsung di https://urbanstore.my.id (buka di HP asli, cek gembok HTTPS, uji Login Google, pembayaran Mayar.id, AI Chat CS, dan preview share WhatsApp).`,
  `Rangkum Final Launch Pipeline dan gunakan checklist Definition of Done interaktif di kanan bersama peserta sebelum menyatakan proyek siap rilis.`,
  `Tutup sesi dengan ajakan langsung praktik bersama meluncurkan UrbanStore dengan custom domain .my.id dari jagoanhosting.com dan membagikan URL live mereka.`,
];

export default [
  Slide01Cover,
  Slide02Objectives,
  Slide03LocalToProd,
  Slide04VercelDeploy,
  Slide05EnvVarsCloud,
  Slide06ProductionConfig,
  Slide07CustomDomain,
  Slide08DomainTlds,
  Slide09DnsVercel,
  Slide09Branding,
  Slide10MetadataOG,
  Slide11SecurityChecklist,
  Slide12SecuritySkillAudit,
  Slide13LiveCheck,
  Slide14LaunchFlowDoD,
  Slide16LaunchCta,
];

