import {
  type DesignSystem,
  MorphElement,
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
  typeScale: { hero: 110, body: 28 },
  radius: 20,
};

const SLIDE_ID = 'vibe-coding-sesi-2-part-2';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..800&family=Newsreader:ital,opsz,wght@1,6..72,400&family=JetBrains+Mono:wght@500;700&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;
const KEYFRAMES = `
@keyframes fw-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes fw-fade { from { opacity: 0 } to { opacity: 1 } }
.fw-interactive { transition: transform 0.2s cubic-bezier(0, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0, 0, 0.2, 1); cursor: pointer; user-select: none; }
.fw-interactive:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0,0,0,0.06); }
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
const SOFT = '#9B9A97';
const RULE = 'rgba(25, 25, 25, 0.12)';
const SERIF = '"Newsreader", "Iowan Old Style", Georgia, serif';
const MONO = '"JetBrains Mono", monospace';

const YELLOW = '#F8DA7E';
const BLUE = '#8DBDEB';
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

const X0 = 120;
const W = 1680;

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const HOLD: Keyframe[] = [{ opacity: 1 }, { opacity: 1 }];
const MORPH_MS = 600;

export const transition: SlideTransition = {
  duration: 240,
  exit: { duration: 240, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 240,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const morphTransition: SlideTransition = {
  duration: 260,
  exit: { duration: 280, easing: EASE_IN, keyframes: HOLD },
  enter: { duration: 280, easing: EASE_OUT, keyframes: [{ opacity: 0 }, { opacity: 1 }] },
  morph: { duration: MORPH_MS, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
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
  lineHeight: 1.05,
  letterSpacing: size >= 90 ? '-0.04em' : '-0.03em',
  wordSpacing: '0.02em',
});

// Hand-drawn SVG Ink Engine
const Ink = ({
  width,
  height,
  viewBox,
  style,
  wobble = 1.8,
  children,
}: {
  width: number;
  height: number;
  viewBox?: string;
  style?: CSSProperties;
  wobble?: number;
  children: ReactNode;
}) => {
  const id = `fw${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg
      aria-hidden
      width={width}
      height={height}
      viewBox={viewBox ?? `0 0 ${width} ${height}`}
      fill="none"
      stroke={INK_HEX}
      strokeWidth={3.2}
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
  delay = 0.3,
  dur = 0.7,
  color = INK_HEX,
  width = 3.2,
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
    style={{ animation: live ? `fw-draw ${dur}s ${EASE_OUT} ${delay}s both` : undefined }}
  />
);

const CircleDoodle = ({
  x,
  y,
  w,
  h,
  color = CORAL_HEX,
  live,
  delay = 0.4,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
  live: boolean;
  delay?: number;
}) => (
  <Ink width={w} height={h} style={{ ...abs(x, y), pointerEvents: 'none' }} wobble={1.6}>
    <Stroke
      d={`M${w * 0.3} ${h * 0.08}C${w * 0.55} ${h * 0.02} ${w * 0.9} ${h * 0.08} ${w * 0.96} ${h * 0.4}C${w} ${h * 0.7} ${w * 0.72} ${h * 0.94} ${w * 0.42} ${h * 0.93}C${w * 0.14} ${h * 0.92} ${w * 0.02} ${h * 0.74} ${w * 0.04} ${h * 0.5}C${w * 0.06} ${h * 0.26} ${w * 0.26} ${h * 0.1} ${w * 0.56} ${h * 0.05}`}
      color={color}
      width={3.6}
      live={live}
      delay={delay}
      dur={0.8}
    />
  </Ink>
);

const UnderlineDoodle = ({
  x,
  y,
  w = 360,
  color = TEAL_HEX,
  live,
  delay = 0.5,
}: {
  x: number;
  y: number;
  w?: number;
  color?: string;
  live: boolean;
  delay?: number;
}) => (
  <Ink width={w} height={36} style={{ ...abs(x, y), pointerEvents: 'none' }}>
    <Stroke
      d={`M6 22C${w * 0.28} 10 ${w * 0.62} 28 ${w - 8} 14`}
      color={color}
      live={live}
      delay={delay}
      width={3.6}
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
    style={{ height, width: 'auto', display: 'block', objectFit: 'contain' }}
  />
);

const pad2 = (n: number) => String(n).padStart(2, '0');

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        ...abs(X0, 1000, W, 32),
        ...row,
        justifyContent: 'space-between',
        fontSize: 21,
        color: SOFT,
      }}
    >
      <span style={{ ...row, gap: 14 }}>
        <CodepolitanLogo height={24} />
        <span style={{ color: RULE }}>·</span>
        <span>Vibe Coding Bootcamp · Batch 4 · Sesi 2 Part 2</span>
      </span>
      <span>
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
  top = 104,
  color = TEAL,
}: {
  children: ReactNode;
  top?: number;
  color?: string;
}) => (
  <div
    style={{ ...abs(X0, top), fontSize: 25, fontWeight: 680, color: color, letterSpacing: '0.01em', lineHeight: 1.2, translate: '0px -35.55px' }}
  >
    {children}
  </div>
);

const CheckMark = ({ color = TEAL_HEX }: { color?: string }) => (
  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M4 12.5L9.5 18L20 6"
      stroke={color}
      strokeWidth={3.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CrossMark = ({ color = CORAL_HEX }: { color?: string }) => (
  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M5 5L19 19M19 5L5 19"
      stroke={color}
      strokeWidth={3.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ============================================================================
// SLIDE 01 — COVER
// ============================================================================
const PRDCoverArt = ({ live }: { live: boolean }) => (
  <Ink width={740} height={700} wobble={2.0} style={abs(1080, 150)}>
    {/* Soft Backdrop Blobs */}
    <circle cx="380" cy="360" r="240" fill={TINT_TEAL} stroke="none" />
    <circle cx="510" cy="220" r="115" fill={TINT_YELLOW} stroke="none" />
    <circle cx="210" cy="490" r="85" fill={TINT_PINK} stroke="none" />

    {/* Ground Baseline */}
    <path d="M40 670 Q340 664 580 668 T720 667" stroke={INK_HEX} strokeWidth={3} strokeLinecap="round" />

    {/* PRD Markdown Document Sheet */}
    <rect x="180" y="140" width="360" height="490" rx="20" fill="#FFFFFF" stroke={INK_HEX} strokeWidth={3.4} />

    {/* File Header Bar */}
    <rect x="180" y="140" width="360" height="48" rx="20" fill="#FAF9F6" stroke="none" />
    <path d="M180 188h360" stroke={RULE} strokeWidth={2} />
    {/* Window dots */}
    <circle cx="210" cy="164" r="6" fill={CORAL_HEX} />
    <circle cx="230" cy="164" r="6" fill={YELLOW} />
    <circle cx="250" cy="164" r="6" fill={TEAL_HEX} />
    {/* File title pill */}
    <rect x="280" y="152" width="160" height="24" rx="6" fill={TINT_TEAL} />
    <path d="M295 164h130" stroke={TEAL_HEX} strokeWidth={3} strokeLinecap="round" />

    {/* Markdown Content Lines in Document */}
    {/* H1 Heading */}
    <rect x="214" y="214" width="70" height="18" rx="4" fill={TINT_YELLOW} />
    <path d="M224 223h50" stroke="#B07A12" strokeWidth={3} strokeLinecap="round" />
    <path d="M296 223h180" stroke={INK_HEX} strokeWidth={4} strokeLinecap="round" />

    {/* Section 1: Overview */}
    <path d="M214 260h240" stroke={BODY} strokeWidth={3} strokeLinecap="round" />
    <path d="M214 278h190" stroke={SOFT} strokeWidth={2.4} strokeLinecap="round" />

    {/* Feature Spec Card: FR-01 Checkout */}
    <rect x="214" y="310" width="292" height="130" rx="14" fill={TINT_TEAL} stroke={TEAL_HEX} strokeWidth={2} />
    <rect x="230" y="326" width="90" height="20" rx="6" fill="#FFFFFF" />
    <path d="M240 336h70" stroke={TEAL_HEX} strokeWidth={3} strokeLinecap="round" />
    {/* Checklist items inside card */}
    <circle cx="240" cy="368" r="5" fill={TEAL_HEX} />
    <path d="M256 368h180" stroke={INK_HEX} strokeWidth={2.8} strokeLinecap="round" />
    <circle cx="240" cy="396" r="5" fill={TEAL_HEX} />
    <path d="M256 396h150" stroke={INK_HEX} strokeWidth={2.8} strokeLinecap="round" />
    <circle cx="240" cy="424" r="5" fill={TEAL_HEX} />
    <path d="M256 424h190" stroke={INK_HEX} strokeWidth={2.8} strokeLinecap="round" />

    {/* Acceptance Criteria Box */}
    <rect x="214" y="460" width="292" height="90" rx="14" fill="#FAF9F6" stroke={RULE} strokeWidth={2} />
    <rect x="230" y="474" width="110" height="18" rx="6" fill={TINT_PINK} />
    <path d="M240 483h90" stroke={CORAL_HEX} strokeWidth={2.8} strokeLinecap="round" />
    <path d="M230 508h220" stroke={BODY} strokeWidth={2.6} strokeLinecap="round" />
    <path d="M230 526h170" stroke={BODY} strokeWidth={2.6} strokeLinecap="round" />

    {/* 3 Status Dots */}
    <circle cx="340" cy="580" r="5" fill={TEAL_HEX} />
    <circle cx="365" cy="580" r="5" fill={RULE} />
    <circle cx="390" cy="580" r="5" fill={RULE} />

    {/* Left Floating Card: AI-Ready Specs */}
    <g transform="translate(60, 240) rotate(-5)">
      <rect width="180" height="96" rx="14" fill="#FFFFFF" stroke={INK_HEX} strokeWidth={2.8} />
      <rect x="16" y="16" width="94" height="20" rx="6" fill={TINT_PINK} />
      <path d="M24 26h78" stroke={CORAL_HEX} strokeWidth={2.6} />
      <path d="M16 52h140M16 70h96" stroke={INK_HEX} strokeWidth={3} strokeLinecap="round" />
    </g>

    {/* Right Floating Badge: AI Agent Execution */}
    <g transform="translate(480, 390) rotate(4)">
      <rect width="190" height="110" rx="14" fill="#FFFFFF" stroke={INK_HEX} strokeWidth={2.8} />
      <rect x="16" y="16" width="100" height="22" rx="6" fill={TINT_TEAL} />
      <path d="M24 27h84" stroke={TEAL_HEX} strokeWidth={3} />
      <path d="M16 54h150M16 74h110M16 94h70" stroke={INK_HEX} strokeWidth={2.8} strokeLinecap="round" />
    </g>

    {/* Connecting Flow Lines */}
    <path d="M200 280 C240 270 260 250 290 230" stroke={CORAL_HEX} strokeWidth={2.8} strokeDasharray="6 6" fill="none" />
    <path d="M380 500 C430 500 450 470 490 440" stroke={TEAL_HEX} strokeWidth={2.8} strokeDasharray="6 6" fill="none" />

    {/* Sparkles */}
    <Sparkle x={130} y={160} s={0.9} fill={YELLOW} />
    <Sparkle x={620} y={180} s={1.1} fill={TEAL_HEX} />
    <Sparkle x={630} y={360} s={0.8} fill={PINK} />
  </Ink>
);

const Slide01Cover: Page = () => {
  const live = useIsActivePage();

  return (
    <Frame hideFooter>
      <div style={{ ...abs(X0, 88), ...row, gap: 16 }}>
        <CodepolitanLogo height={32} />
        <span style={{ color: RULE, fontSize: 26 }}>·</span>
        <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '0.04em', color: BODY }}>
          VIBE CODING BOOTCAMP · BATCH 4
        </span>
      </div>

      <div
        style={{
          ...abs(X0, 240, 1060),
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <div style={{ ...row, gap: 12 }}>
          <span
            style={{
              background: TINT_TEAL,
              color: TEAL_HEX,
              padding: '6px 18px',
              borderRadius: 999,
              fontFamily: MONO,
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            Batch 4 · Sesi 2 — PART 2
          </span>
          <span style={{ fontSize: 24, color: SOFT, fontWeight: 500 }}>
            {''}<br />{''}
          </span>
        </div>

        <h1 style={{ ...headline(106), letterSpacing: '-0.04em', lineHeight: 1.02 }}>
          Product Requirement
          <br />
          Document (PRD) for
          <br />
          <span style={{ position: 'relative', display: 'inline-block', color: TEAL_HEX }}>
            AI-Ready Specs.
            <CircleDoodle
              x={-30}
              y={-18}
              w={940}
              h={146}
              color={CORAL_HEX}
              live={live}
              delay={0.4}
            />
          </span>
        </h1>

        <p
          style={{
            fontSize: 32,
            lineHeight: 1.45,
            color: BODY,
            margin: '8px 0 0',
            maxWidth: 960,
          }}
        >
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', color: INK_HEX }}>
            From Product Strategy to Technical Specification —
          </span>{' '}
          Menerjemahkan keputusan produk menjadi aturan sistem yang jelas, terstruktur, dan presisi
          agar AI Agent tidak menebak-nebak kebutuhan Anda.
        </p>

        <div style={{ ...row, gap: 24, marginTop: 16, fontSize: 23, color: SOFT }}>
          <span style={{ ...row, gap: 10, color: INK_HEX, fontWeight: 650 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: TEAL_HEX }} />
            Case Study: UrbanStore
          </span>
          <span>·</span>
          <span>Gen Z Online Fashion Store</span>
          <span>·</span>
          <span>Presented by CODEPOLITAN</span>
        </div>
      </div>

      <PRDCoverArt live={live} />
    </Frame>
  );
};

// ============================================================================
// SLIDE 02 — FROM PRODUCT PLANNING TO PRODUCT SPECIFICATION
// ============================================================================
const Slide02Bridge: Page = () => {
  return (
    <Frame>
      <Eyebrow>Bridge: Part 1 → Part 2 · Product Lifecycle</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(72), translate: '0px -59.2px' }}>Strateginya sudah ada, sekarang dokumentasikan</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 23, lineHeight: 1.45, color: BODY, textAlign: 'right', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '661.61px', height: '100.06px', translate: '-21.6px -0.01px' }}>
        Product Planning menjawab <Highlight color={HIGHLIGHT_TEAL}>"apa & mengapa"</Highlight>.<br />PRD menjawab{' '}
        <Highlight color={HIGHLIGHT_PINK}>"bagaimana perilakunya & kriteria selesainya"</Highlight>.
      </div>

      {/* Left Card: Part 1 Product Decisions (816 x 660) */}
      <div
        style={{
          ...abs(X0, 284, 816, 660),
          borderRadius: 24,
          background: TINT_YELLOW,
          padding: '36px 40px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: 20, translate: '0px 39.52px' }}>
          <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 750, color: '#B07A12' }}>
            PART 1 RECAP · PRODUCT DECISIONS
          </span>
        </div>

        <h3 style={{ fontSize: 36, fontWeight: 780, color: INK_HEX, margin: '0 0 16px', lineHeight: 1.2, translate: '0px 39.52px' }}>
          Keputusan Makro UrbanStore
        </h3>
        <p style={{ fontSize: 22, color: BODY, margin: '0 0 24px', lineHeight: 1.4, translate: '0px 39.52px' }}>
          Di sesi sebelumnya, kita telah menyelesaikan fondasi strategis produk:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, translate: '0px 42.41px' }}>
          {[
            { label: 'Target User', val: 'Gen Z 18–30 thn mobile shopper' },
            { label: 'Core Problem', val: 'Kurasi minim & info size membingungkan' },
            { label: 'Value Prop', val: 'Belanja trendy tanpa ragu & praktis' },
            { label: 'Product Goals', val: 'CTR detail >25%, checkout >65%' },
            { label: 'MVP Scope', val: 'Katalog, Detail, Cart, 3-Step Checkout' },
            { label: 'User Journey', val: '5 alur: Discover s/d Complete' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: 14,
                padding: '16px 20px',
                border: `1.5px solid ${RULE}`,
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 16, color: TEAL_HEX, fontWeight: 700 }}>
                ✓ {item.label}
              </div>
              <div style={{ fontSize: 18, fontWeight: 650, color: INK_HEX, marginTop: 4 }}>
                {item.val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Card: Part 2 Product Requirements (816 x 660) */}
      <div
        style={{
          ...abs(984, 284, 816, 660),
          borderRadius: 24,
          background: TINT_TEAL,
          padding: '36px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: `2px solid ${TEAL_HEX}`,
        }}
      >
        <div>
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 750, color: TEAL_HEX }}>
              PART 2 MISSION · SPECIFICATION
            </span>
          </div>

          <h3 style={{ fontSize: 36, fontWeight: 780, color: INK_HEX, margin: '0 0 16px', lineHeight: 1.2 }}>
            Sekarang Masuk ke Tahap PRD
          </h3>
          <p style={{ fontSize: 22, color: BODY, margin: '0 0 24px', lineHeight: 1.4 }}>
            Menerjemahkan keputusan produk menjadi acuan teknis yang presisi:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                q: 'Apa yang harus dibangun?',
                desc: 'Definisi fitur eksplisit (Katalog dengan filter pria/wanita, cart subtotal dinamis).',
              },
              {
                q: 'Bagaimana perilakunya (behavior)?',
                desc: 'Validasi form, penanganan stok habis, dan alur transisi antar halaman.',
              },
              {
                q: 'Bagaimana kriteria selesainya (acceptance)?',
                desc: 'Kondisi terukur kapan sebuah fitur dinyatakan selesai dan siap dirilis.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 16,
                  padding: '18px 22px',
                  border: `1.5px solid ${RULE}`,
                }}
              >
                <div style={{ fontSize: 21, fontWeight: 750, color: TEAL_HEX }}>
                  {item.q}
                </div>
                <div style={{ fontSize: 18, color: BODY, marginTop: 4, lineHeight: 1.4 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Message Bottom Banner */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '16px 22px',
            ...row,
            justifyContent: 'space-between',
            border: `1.5px solid ${TEAL_HEX}`,
          }}
        >
          <div style={{ ...row, gap: 12 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: TEAL_HEX }} />
            <span style={{ fontSize: 20, fontWeight: 750, color: INK_HEX }}>
              Part 1 = Product Decisions
            </span>
          </div>
          <span style={{ color: TEAL_HEX, fontWeight: 800 }}>→</span>
          <div style={{ ...row, gap: 12 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: CORAL_HEX }} />
            <span style={{ fontSize: 20, fontWeight: 750, color: INK_HEX }}>
              Part 2 = Product Requirements
            </span>
          </div>
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 03 — APA ITU PRD?
// ============================================================================
const Slide03ApaItuPRD: Page = () => {
  const [activeStep, setActiveStep] = useState(0);

  const prdQuestions = [
    { num: '01', title: 'Product Purpose', q: 'Produk ini dibuat untuk apa?' },
    { num: '02', title: 'Target User', q: 'Siapa yang akan menggunakannya?' },
    { num: '03', title: 'Feature Scope', q: 'Fitur apa saja yang harus tersedia?' },
    { num: '04', title: 'System Behavior', q: 'Bagaimana setiap fitur bekerja?' },
    { num: '05', title: 'Rules & Constraints', q: 'Apa batasan dan aturan sistem?' },
    { num: '06', title: 'Acceptance Criteria', q: 'Bagaimana cara menguji bahwa hasilnya benar?' },
  ];

  const urbanStoreAlur = [
    { title: 'Katalog Kurasi', desc: 'Pengguna melihat daftar outfit pria/wanita dengan badge tren & harga' },
    { title: 'Detail & Size Guide', desc: 'Panduan ukuran visual transparan untuk cegah salah pilih size' },
    { title: 'Shopping Cart', desc: 'Kelola item, ubah kuantitas, kalkulasi subtotal instan' },
    { title: '3-Step Checkout', desc: 'Isi alamat ringkas, pilih pengiriman, dan instruksi bayar QRIS' },
  ];

  return (
    <Frame>
      <Eyebrow>Core Definition · Source of Truth</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(72), translate: '0px -49.55px' }}>
        Panduan produk yang<br />akan dibangun
      </h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 23, lineHeight: 1.45, color: BODY, textAlign: 'right' }}>
        PRD bukan sekadar daftar fitur. PRD menjelaskan <Highlight color={HIGHLIGHT}>kebutuhan dan perilaku produk</Highlight> secara terstruktur.
      </div>

      {/* Left Column: 6 Core Questions (780 x 660) */}
      <div
        style={{
          ...abs(X0, 284, 780, 660),
          borderRadius: 24,
          background: '#FFFFFF',
          border: `1.5px solid ${RULE}`,
          padding: '36px 38px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, gap: 12, marginBottom: 16 }}>
            <span style={{ fontFamily: MONO, fontSize: 18, color: TEAL_HEX, fontWeight: 700 }}>
              PRD CORE PURPOSE
            </span>
          </div>
          <p style={{ fontSize: 22, color: BODY, margin: '0 0 24px', lineHeight: 1.5 }}>
            <strong style={{ color: INK_HEX }}>Product Requirement Document (PRD)</strong> adalah dokumen acuan bersama yang menjelaskan kebutuhan, scope, perilaku, dan kriteria sukses sebuah produk.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
            {prdQuestions.map((item, idx) => (
              <div
                key={idx}
                style={{
                  ...row,
                  gap: 16,
                  padding: '12px 18px',
                  borderRadius: 14,
                  background: idx === activeStep ? TINT_TEAL : '#F8F9FA',
                  border: idx === activeStep ? `1.5px solid ${TEAL_HEX}` : '1.5px solid transparent',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveStep(idx)}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 18,
                    fontWeight: 750,
                    color: idx === activeStep ? TEAL_HEX : SOFT,
                  }}
                >
                  {item.num}
                </span>
                <span style={{ fontSize: 18, fontWeight: 700, color: INK_HEX, width: 220 }}>
                  {item.title}
                </span>
                <span style={{ fontSize: 18, color: BODY, flex: 1 }}>
                  {item.q}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 19, color: SOFT, fontFamily: MONO, translate: '0px 15px' }}>
          💡 Klik poin untuk meninjau fokus pertanyaan dalam PRD
        </div>
      </div>

      {/* Right Column: Kasus Nyata UrbanStore (860 x 660) */}
      <div
        style={{
          ...abs(940, 284, 860, 660),
          borderRadius: 24,
          background: TINT_BLUE,
          padding: '32px 36px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: BLUE }}>
            STUDI KASUS URBANSTORE
          </span>
        </div>

        <h3 style={{ fontSize: 28, fontWeight: 780, color: INK_HEX, margin: '0 0 10px', lineHeight: 1.25 }}>
          Bagaimana PRD Mengatur Alur Belanja?
        </h3>
        <p style={{ fontSize: 20, color: BODY, margin: '0 0 20px', lineHeight: 1.4 }}>
          PRD mendefinisikan ekspektasi konkret dari hulu ke hilir sehingga AI coding tidak menebak logika bisnis:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, translate: '0px 16.97px' }}>
          {urbanStoreAlur.map((step, idx) => (
            <div
              key={idx}
              className="fw-interactive"
              style={{
                background: '#FFFFFF',
                borderRadius: 14,
                padding: '14px 20px',
                border: `1.5px solid ${RULE}`,
                ...row,
                gap: 18,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: TINT_TEAL,
                  color: TEAL_HEX,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: MONO,
                  fontSize: 20,
                  fontWeight: 750,
                  flexShrink: 0,
                }}
              >
                {idx + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 750, color: INK_HEX }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 16, color: BODY, marginTop: 3, lineHeight: 1.35 }}>
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 04 — UNTUK APA PRD DIBUAT?
// ============================================================================
const Slide04FungsiPRD: Page = () => {
  const [selectedFunction, setSelectedFunction] = useState(0);

  const functions = [
    {
      code: '01',
      name: 'Alignment',
      desc: 'Menyamakan pemahaman antara product owner, developer, tester, dan AI Agent.',
    },
    {
      code: '02',
      name: 'Scope Control',
      desc: 'Mencegah scope creep dengan membedakan fitur yang dibuat sekarang vs ditunda.',
    },
    {
      code: '03',
      name: 'Development Reference',
      desc: 'Menjadi panduan tunggal saat menulis prompt dan mengarahkan AI Agent membangun fitur.',
    },
    {
      code: '04',
      name: 'Testing Reference',
      desc: 'Menjadi tolak ukur Acceptance Criteria untuk menguji apakah fitur sudah sesuai ekspektasi.',
    },
    {
      code: '05',
      name: 'Change Management',
      desc: 'Membantu mencatat perubahan kebutuhan dan dampaknya terhadap arsitektur aplikasi.',
    },
  ];

  return (
    <Frame>
      <Eyebrow>The Purpose of PRD · Efficiency & Alignment</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(72), translate: '0px -49.55px' }}>Kurangi tebakan, miskomunikasi & rework</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 23, lineHeight: 1.45, color: BODY, textAlign: 'right' }}>
        PRD bukan dokumen birokrasi formalitas. Dokumen ini menjaga{' '}
        <Highlight color={HIGHLIGHT_PINK}>arah pembangunan produk agar tepat sasaran</Highlight>.
      </div>

      {/* Left Column: 5 Main Functions (920 x 660) */}
      <div
        style={{ ...abs(X0, 284, 920, 660), display: 'flex', flexDirection: 'column', gap: 14, translate: '0px 18.29px' }}
      >
        {functions.map((fn, idx) => {
          const active = selectedFunction === idx;
          return (
            <div
              key={idx}
              className="fw-interactive"
              onClick={() => setSelectedFunction(idx)}
              style={{
                background: active ? TINT_TEAL : '#FFFFFF',
                borderRadius: 18,
                padding: '20px 24px',
                border: active ? `2px solid ${TEAL_HEX}` : `1.5px solid ${RULE}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <div style={{ ...row, gap: 14 }}>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 22,
                    fontWeight: 750,
                    color: active ? TEAL_HEX : SOFT,
                  }}
                >
                  {fn.code}
                </span>
                <span style={{ fontSize: 24, fontWeight: 780, color: INK_HEX }}>
                  {fn.name}
                </span>
              </div>
              <div style={{ fontSize: 19, color: BODY, lineHeight: 1.4, paddingLeft: 38 }}>
                {fn.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Column: Kasus Ambiguity of Checkout (720 x 660) */}
      <div
        style={{ ...abs(1080, 284, 720, 660), borderRadius: 24, background: TINT_YELLOW, padding: '36px 38px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', translate: '0px 18.29px' }}
      >
        <div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: '#B07A12' }}>
              REAL EXAMPLE: URBANSTORE
            </span>
          </div>

          <h3 style={{ fontSize: 30, fontWeight: 780, color: INK_HEX, margin: '0 0 16px', lineHeight: 1.25 }}>
            Tanpa PRD, Kata "Checkout" Terlalu Ambigu
          </h3>
          <p style={{ fontSize: 20, color: BODY, margin: '0 0 20px', lineHeight: 1.45 }}>
            Jika kita hanya memberi prompt <em>"Buat halaman checkout"</em>, AI akan menebak secara liar:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Apakah pembeli wajib register akun atau boleh Guest?',
              'Form input apa saja yang mutlak harus diisi?',
              'Bagaimana kalkulasi ongkir & diskon dihitung?',
              'Apa yang terjadi setelah tombol "Place Order" diklik?',
            ].map((q, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 14,
                  padding: '14px 18px',
                  ...row,
                  gap: 12,
                  border: `1.5px solid ${RULE}`,
                }}
              >
                <CrossMark color={CORAL_HEX} />
                <span style={{ fontSize: 18, color: INK_HEX, fontWeight: 600 }}>{q}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '18px 22px',
            border: `2px solid ${TEAL_HEX}`,
            ...row,
            gap: 14,
          }}
        >
          <CheckMark color={TEAL_HEX} />
          <div style={{ fontSize: 19, color: INK_HEX, lineHeight: 1.4 }}>
            <strong>Solusi PRD:</strong> Membuat seluruh ekspektasi eksplisit sehingga AI mengeksekusi sistem dengan zero guessing.
          </div>
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 05 — KENAPA PRD PENTING UNTUK AI AGENT?
// ============================================================================
const Slide05PRDUntukAIAgent: Page = () => {
  return (
    <Frame>
      <Eyebrow color={CORAL_HEX}>AI Agent Context · Prompt vs Specification</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(72), translate: '0px -51.15px' }}>AI bisa membangun, tapi butuh arah presisi</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 23, lineHeight: 1.45, color: BODY, textAlign: 'right', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '714.81px', height: '100.06px', translate: '-74.81px -0.01px' }}>
        AI Agent membaca workspace dan mengedit file dengan cepat. Tanpa dokumen spesifikasi, AI berhalusinasi membuat aturan sendiri.
      </div>

      {/* Left Card: Risiko Tanpa PRD (816 x 660) */}
      <div
        style={{ ...abs(X0, 284, 816, 660), borderRadius: 24, background: TINT_PINK, padding: '34px 38px', display: 'flex', flexDirection: 'column', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '816px', height: '594.88px', translate: '0px 29.92px' }}
      >
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: CORAL_HEX }}>
            RISIKO TANPA SPESIFIKASI
          </span>
        </div>

        <h3 style={{ fontSize: 30, fontWeight: 780, color: INK_HEX, margin: '0 0 10px', lineHeight: 1.25 }}>
          Ketika AI Berasumsi Sendiri
        </h3>
        <p style={{ fontSize: 19, color: BODY, margin: '0 0 20px', lineHeight: 1.4 }}>
          Tanpa panduan tertulis, AI Agent memiliki kecenderungan:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'Menebak kebutuhan & logika yang belum dijelaskan.',
            'Membuat fitur kompleks di luar scope MVP (Scope Creep).',
            'Menghasilkan alur data yang tidak konsisten antar komponen.',
            'Menggunakan asumsi pribadi untuk aturan bisnis dan harga.',
            'Mengubah file/kode yang sebenarnya tidak perlu diubah.',
            'UI terlihat sudah selesai, tetapi fungsionalitasnya rapuh.',
          ].map((risk, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: 14,
                padding: '13px 18px',
                ...row,
                gap: 14,
                border: `1px solid rgba(255, 95, 124, 0.2)`,
              }}
            >
              <CrossMark color={CORAL_HEX} />
              <span style={{ fontSize: 17, color: INK_HEX, fontWeight: 600, lineHeight: 1.35 }}>{risk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Card: PRD sebagai 5 Pilar Kemudi AI Agent (816 x 660) */}
      <div
        style={{ ...abs(984, 284, 816, 660), borderRadius: 24, background: TINT_TEAL, padding: '34px 38px', display: 'flex', flexDirection: 'column', border: `2px solid ${TEAL_HEX}`, minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '816px', height: '594.88px', translate: '0px 29.92px' }}
      >
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: TEAL_HEX }}>
            PRD AS SOURCE OF TRUTH
          </span>
        </div>

        <h3 style={{ fontSize: 30, fontWeight: 780, color: INK_HEX, margin: '0 0 10px', lineHeight: 1.25 }}>
          5 Pilar Acuan untuk AI Agent
        </h3>
        <p style={{ fontSize: 19, color: BODY, margin: '0 0 20px', lineHeight: 1.4 }}>
          Dengan menyediakan PRD, AI Agent memiliki pegangan absolut:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, translate: '0px 12.11px' }}>
          {[
            { label: 'Context', desc: 'Produk apa yang sedang dibangun & siapa penggunanya.' },
            { label: 'Requirements', desc: 'Kemampuan spesifik apa yang harus disediakan sistem.' },
            { label: 'Rules', desc: 'Bagaimana logika bisnis & batasan stok harus berperilaku.' },
            { label: 'Constraints', desc: 'Batasan arsitektur, teknologi, dan dependensi proyek.' },
            { label: 'Acceptance Criteria', desc: 'Kondisi pasti yang menentukan kapan tugas selesai.' },
          ].map((pilar, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: 14,
                padding: '13px 18px',
                ...row,
                gap: 16,
                border: `1.5px solid ${RULE}`,
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 16,
                  fontWeight: 750,
                  color: TEAL_HEX,
                  width: 175,
                  flexShrink: 0,
                }}
              >
                ✓ {pilar.label}
              </span>
              <span style={{ fontSize: 17, color: BODY, lineHeight: 1.35, flex: 1 }}>
                {pilar.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 06 — FORMAT MARKDOWN (.md) UNTUK PRD
// ============================================================================
const Slide06MarkdownFormat: Page = () => {
  return (
    <Frame>
      <Eyebrow>Format Choice · Human & AI Synergy</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(72), translate: '0px -59.2px' }}>Markdown: Standar spesifikasi AI modern</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 23, lineHeight: 1.45, color: BODY, textAlign: 'right', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '718.13px', height: '100.06px', translate: '-78.12px -0.01px' }}>
        Markdown (<Highlight color={HIGHLIGHT_TEAL}>.md</Highlight>) adalah format teks ringan yang membuat spesifikasi mudah dibaca manusia dan langsung dipahami AI Agent.
      </div>

      {/* Left Column: 5 Alasan Format .md (760 x 660) */}
      <div
        style={{
          ...abs(X0, 284, 760, 660),
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {[
          {
            num: '01',
            title: 'Plain Text Universal',
            desc: 'Dapat dibuka di sistem apa pun tanpa software dokumen khusus, sangat cepat di-parse oleh LLM.',
          },
          {
            num: '02',
            title: 'Clear Semantic Hierarchy',
            desc: 'Struktur #, ##, bullet points, dan checkbox memudahkan AI memisahkan konteks dan aturan.',
          },
          {
            num: '03',
            title: 'Easy to Edit in IDE',
            desc: 'Langsung diedit bersama kode program di VS Code / Antigravity tanpa harus bolak-balik buka tab lain.',
          },
          {
            num: '04',
            title: 'Repository & Agent Native',
            desc: 'Tersimpan di root workspace sehingga AI Agent otomatis menyerapnya sebagai project context.',
          },
          {
            num: '05',
            title: 'Version Controlled via Git',
            desc: 'Setiap revisi spesifikasi dapat dilacak baris demi baris menggunakan git history.',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="fw-interactive"
            style={{
              background: '#FFFFFF',
              borderRadius: 18,
              padding: '18px 24px',
              border: `1.5px solid ${RULE}`,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 750, color: TEAL_HEX }}>
                {item.num}
              </span>
              <span style={{ fontSize: 22, fontWeight: 780, color: INK_HEX }}>
                {item.title}
              </span>
            </div>
            <div style={{ fontSize: 18, color: BODY, marginTop: 4, paddingLeft: 34, lineHeight: 1.4 }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Right Column: Visual Snippet PRD_UrbanStore.md (880 x 660) */}
      <div
        style={{
          ...abs(920, 284, 880, 660),
          borderRadius: 24,
          background: '#1E1E24',
          padding: '32px 36px',
          color: '#E0E0E0',
          fontFamily: MONO,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: `2px solid ${RULE}`,
        }}
      >
        <div>
          {/* Mock Window Header */}
          <div style={{ ...row, justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ ...row, gap: 10 }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F' }} />
            </div>
            <span style={{ fontSize: 16, color: '#A0A0A0', fontWeight: 600 }}>
              docs/PRD_UrbanStore.md
            </span>
            <span style={{ fontSize: 14, color: TEAL_HEX, background: 'rgba(60, 165, 161, 0.15)', padding: '2px 8px', borderRadius: 4 }}>
              Markdown
            </span>
          </div>

          {/* Snippet Content */}
          <div style={{ fontSize: 18, lineHeight: 1.7, marginTop: 20, whiteSpace: 'pre-wrap' }}>
            <span style={{ color: '#E06C75', fontWeight: 700 }}># UrbanStore — PRD</span>{'\n'}
            <span style={{ color: '#E5C07B', fontWeight: 700 }}>## 1. Product Overview</span>{'\n'}
            <span style={{ color: '#ABB2BF' }}>UrbanStore adalah online store fashion Gen Z dengan kurasi terarah...</span>{'\n\n'}
            <span style={{ color: '#E5C07B', fontWeight: 700 }}>## 2. Functional Requirements</span>{'\n'}
            <span style={{ color: '#61AFEF', fontWeight: 700 }}>### FR-01 — Product Catalog</span>{'\n'}
            <span style={{ color: '#98C379' }}>- Sistem harus menampilkan grid pakaian dengan foto, harga, dan kategori.</span>{'\n'}
            <span style={{ color: '#98C379' }}>- Pengguna dapat memfilter berdasarkan kategori pria dan wanita.</span>{'\n'}
            <span style={{ color: '#98C379' }}>- Produk habis harus memiliki label stok transparan.</span>{'\n\n'}
            <span style={{ color: '#61AFEF', fontWeight: 700 }}>### FR-02 — Shopping Cart</span>{'\n'}
            <span style={{ color: '#98C379' }}>- Pengguna dapat menambah kuantitas dan menghitung subtotal instan.</span>{'\n'}
          </div>
        </div>

        {/* Footnote inside Editor */}
        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 14,
            padding: '14px 20px',
            fontSize: 16,
            color: '#B0B0B0',
            lineHeight: 1.45,
            borderLeft: `4px solid ${TEAL_HEX}`,
          }}
        >
          <strong style={{ color: '#FFFFFF' }}>Catatan Penting:</strong> Markdown bukan sihir yang otomatis bikin AI lebih pintar. Keunggulannya adalah struktur yang rapi, transparan, dan mudah diproses oleh developer maupun AI Agent.
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 07 — WORKFLOW MENYUSUN PRD DENGAN PROMPT
// ============================================================================
const Slide07WorkflowPrompt: Page = () => {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    {
      step: '01',
      title: 'Siapkan Konteks',
      badge: 'Input',
      desc: 'Ambil hasil Product Planning Canvas UrbanStore (Target User, Problem, Solusi, MVP Scope).',
      detail: 'Konteks produk dari Part 1 menjadi fondasi utama agar AI tidak menyimpang dari visi bisnis.',
    },
    {
      step: '02',
      title: 'Jalankan Prompt PRD',
      badge: 'AI Draft',
      desc: 'Gunakan template prompt PRD terstruktur yang sudah disiapkan untuk meng-generate dokumen.',
      detail: 'Prompt menginstruksikan AI menyusun bagian-bagian standar PRD secara komprehensif.',
    },
    {
      step: '03',
      title: 'Review & Validasi',
      badge: 'Human Touch',
      desc: 'Periksa kelengkapan, validasi aturan bisnis, dan pangkas asumsi AI yang berlebihan.',
      detail: 'Peran vital kita: memastikan alur checkout, aturan stok, dan kriteria selesai masuk akal bagi user.',
    },
    {
      step: '04',
      title: 'Simpan PRD (.md)',
      badge: 'Artifact',
      desc: 'Simpan hasil review ke dalam file docs/PRD_UrbanStore.md di dalam repository proyek.',
      detail: 'File ini menjadi kontrak kerja resmi yang akan diakses oleh AI coding tool.',
    },
    {
      step: '05',
      title: 'Handoff ke AI Agent',
      badge: 'Execution',
      desc: 'Berikan PRD sebagai project context saat meminta AI Agent mengimplementasikan fitur.',
      detail: 'AI Agent bekerja membaca aturan yang sudah dipagari di PRD. Eksekusi presisi, zero miscommunication.',
    },
  ];

  return (
    <Frame>
      <Eyebrow>Generation Workflow · Human in the Loop</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(72), translate: '0px -49.55px' }}>
        Tidak perlu mulai dari<br />halaman kosong
      </h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 23, lineHeight: 1.45, color: BODY, textAlign: 'right' }}>
        Gunakan prompt PRD terstruktur untuk draf awal, lalu lakukan{' '}
        <Highlight color={HIGHLIGHT}>review kritis sebagai Product Manager</Highlight>.
      </div>

      {/* 5-Step Pipeline Cards (1680 x 420) */}
      <div
        style={{
          ...abs(X0, 284, W, 430),
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 16,
        }}
      >
        {steps.map((st, i) => {
          const active = activeStep === i;
          return (
            <div
              key={i}
              className="fw-interactive"
              onClick={() => setActiveStep(i)}
              style={{
                background: active ? TINT_TEAL : '#FFFFFF',
                borderRadius: 22,
                padding: '28px 24px',
                border: active ? `2px solid ${TEAL_HEX}` : `1.5px solid ${RULE}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ ...row, justifyContent: 'space-between', marginBottom: 16 }}>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 26,
                      fontWeight: 800,
                      color: active ? TEAL_HEX : SOFT,
                    }}
                  >
                    {st.step}
                  </span>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 15,
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: active ? TEAL_HEX : '#F0F0EE',
                      color: active ? '#FFFFFF' : BODY,
                      fontWeight: 700,
                    }}
                  >
                    {st.badge}
                  </span>
                </div>

                <div style={{ fontSize: 24, fontWeight: 780, color: INK_HEX, marginBottom: 12, lineHeight: 1.2 }}>
                  {st.title}
                </div>
                <div style={{ fontSize: 18, color: BODY, lineHeight: 1.45 }}>
                  {st.desc}
                </div>
              </div>

              <div style={{ fontSize: 15, fontFamily: MONO, color: active ? TEAL_HEX : SOFT, marginTop: 16 }}>
                {active ? '● Sedang ditinjau' : 'Klik untuk detail'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Step Detail Inspector Banner (1680 x 180) */}
      <div
        style={{
          ...abs(X0, 740, W, 200),
          borderRadius: 22,
          background: TINT_YELLOW,
          padding: '28px 36px',
          ...row,
          justifyContent: 'space-between',
          border: `1.5px solid ${RULE}`,
        }}
      >
        <div style={{ maxWidth: 1180 }}>
          <div style={{ ...row, gap: 14, marginBottom: 8 }}>
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: '#B07A12' }}>
              TAHAP {steps[activeStep].step} DETAIL
            </span>
            <span style={{ fontSize: 22, fontWeight: 780, color: INK_HEX }}>
              {steps[activeStep].title}
            </span>
          </div>
          <div style={{ fontSize: 21, color: INK_HEX, lineHeight: 1.45 }}>
            {steps[activeStep].detail}
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '18px 24px',
            textAlign: 'right',
            flexShrink: 0,
            border: `1.5px solid ${RULE}`,
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 16, color: SOFT }}>PRINSIP UTAMA</div>
          <div style={{ fontSize: 20, fontWeight: 750, color: TEAL_HEX, marginTop: 4 }}>
            AI Creates Draft. Human Decides.
          </div>
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 08 — BAGIAN 1: PRODUCT OVERVIEW & PRODUCT GOALS
// ============================================================================
const Slide08OverviewAndGoals: Page = () => {
  return (
    <Frame>
      <Eyebrow>PRD Core Structure · Anatomy Section 01</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(72), translate: '0px -49.55px' }}>
        Jelaskan produk &<br />tujuan capaian
      </h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 23, lineHeight: 1.45, color: BODY, textAlign: 'right' }}>
        Fondasi pembuka dokumen PRD untuk memberikan orientasi nilai kepada AI Agent, bukan sekadar instruksi tampilan.
      </div>

      {/* 3 Pillars Cards (1680 x 510) */}
      <div
        style={{
          ...abs(X0, 284, W, 500),
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 20,
        }}
      >
        {/* Card 1: Product Overview */}
        <div
          style={{
            background: TINT_BLUE,
            borderRadius: 22,
            padding: '34px 34px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: BLUE }}>
                SECTION 01
              </span>
            </div>
            <h3 style={{ fontSize: 30, fontWeight: 780, color: INK_HEX, margin: '0 0 14px' }}>
              Product Overview
            </h3>
            <p style={{ fontSize: 20, color: BODY, lineHeight: 1.5, margin: 0 }}>
              Menjelaskan gambaran umum produk, target audiens, dan proposisi nilai yang ditawarkan.
            </p>

            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: '18px 20px',
                marginTop: 20,
                border: `1.5px solid ${RULE}`,
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 15, color: TEAL_HEX, fontWeight: 700, marginBottom: 6 }}>
                CONTOH URBANSTORE
              </div>
              <div style={{ fontSize: 18, color: INK_HEX, lineHeight: 1.45 }}>
                Online store fashion pria & wanita untuk Gen Z dengan kurasi terarah, informasi ukuran transparan, dan tampilan modern minimalis.
              </div>
            </div>
          </div>

          <div style={{ fontSize: 17, color: SOFT, fontFamily: MONO, translate: '0px 17px' }}>
            ✓ Memberi pemahaman "what & who" ke AI
          </div>
        </div>

        {/* Card 2: Product Goals */}
        <div
          style={{
            background: TINT_YELLOW,
            borderRadius: 22,
            padding: '34px 34px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: '#B07A12' }}>
                SECTION 02
              </span>
            </div>
            <h3 style={{ fontSize: 30, fontWeight: 780, color: INK_HEX, margin: '0 0 14px' }}>
              Product Goals
            </h3>
            <p style={{ fontSize: 20, color: BODY, lineHeight: 1.5, margin: 0 }}>
              Menjelaskan sasaran fungsional utama yang ingin diwujudkan oleh sistem bagi pengguna.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
              {[
                'Memudahkan user menemukan outfit stylish tanpa tersesat katalog.',
                'Menyediakan panduan ukuran visual yang jelas & terpercaya.',
                'Menyelesaikan checkout mobile dengan cepat tanpa hambatan.',
              ].map((g, i) => (
                <div
                  key={i}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 12,
                    padding: '12px 16px',
                    fontSize: 17,
                    color: INK_HEX,
                    lineHeight: 1.4,
                    border: `1.5px solid ${RULE}`,
                  }}
                >
                  <strong style={{ color: TEAL_HEX }}>Goal {i + 1}:</strong> {g}
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 17, color: SOFT, fontFamily: MONO, translate: '0px 17px' }}>
            ✓ Menjaga fokus fitur tetap relevan
          </div>
        </div>

        {/* Card 3: Success Metrics */}
        <div
          style={{
            background: TINT_TEAL,
            borderRadius: 22,
            padding: '34px 34px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: `2px solid ${TEAL_HEX}`,
          }}
        >
          <div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: TEAL_HEX }}>
                SECTION 03
              </span>
            </div>
            <h3 style={{ fontSize: 30, fontWeight: 780, color: INK_HEX, margin: '0 0 14px' }}>
              Success Metrics
            </h3>
            <p style={{ fontSize: 20, color: BODY, lineHeight: 1.5, margin: 0 }}>
              Indikator kuantitatif untuk mengevaluasi apakah produk berhasil saat dioperasikan.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 }}>
              {[
                { m: 'Click Rate', target: '> 25%', desc: 'Katalog ke Detail' },
                { m: 'Cart Rate', target: '> 15%', desc: 'Detail ke Cart' },
                { m: 'Checkout Rate', target: '> 65%', desc: 'Cart ke Sukses' },
                { m: 'Cart Drop-off', target: '< 30%', desc: 'Maks. Abandonment' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 14,
                    padding: '12px 14px',
                    border: `1.5px solid ${RULE}`,
                  }}
                >
                  <div style={{ fontFamily: MONO, fontSize: 14, color: BODY }}>{item.m}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: TEAL_HEX }}>{item.target}</div>
                  <div style={{ fontSize: 13, color: SOFT }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 17, color: SOFT, fontFamily: MONO, translate: '0px 17px' }}>
            ✓ Indikator evaluasi hasil rilis
          </div>
        </div>
      </div>

      {/* Bottom Takeaway Callout (1680 x 120) */}
      <div
        style={{ ...abs(X0, 810, W, 130), borderRadius: 20, background: '#FFFFFF', border: `1.5px solid ${RULE}`, padding: '24px 36px', ...row, justifyContent: 'space-between', translate: '0px 15.48px' }}
      >
        <div style={{ ...row, gap: 16 }}>
          <Sparkle x={0} y={0} s={0.9} fill={TEAL_HEX} />
          <div>
            <div style={{ fontSize: 21, fontWeight: 780, color: INK_HEX }}>
              Kenapa AI Agent Sangat Membutuhkan Bagian Ini?
            </div>
            <div style={{ fontSize: 18, color: BODY, marginTop: 4 }}>
              Agar AI memahami konteks produk dan alasan di balik pembuatan fitur, bukan hanya merender tombol dan layout kosong.
            </div>
          </div>
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 16,
            background: TINT_TEAL,
            color: TEAL_HEX,
            padding: '8px 18px',
            borderRadius: 10,
            fontWeight: 700,
          }}
        >
          Product Context &gt; Random Code
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 09 — BAGIAN 2: USER REQUIREMENTS & USER STORIES
// ============================================================================
const Slide09UserStories: Page = () => {
  return (
    <Frame>
      <Eyebrow>PRD Core Structure · Anatomy Section 02</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(72), translate: '0px -49.55px' }}>
        Kebutuhan pengguna &<br />user stories
      </h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 23, lineHeight: 1.45, color: BODY, textAlign: 'right' }}>
        Jelaskan <Highlight color={HIGHLIGHT_TEAL}>siapa penggunanya</Highlight>, apa tujuannya, dan <Highlight color={HIGHLIGHT_PINK}>benefit nyata apa</Highlight> yang mereka dapatkan.
      </div>

      {/* Left Card: User Requirements (780 x 660) */}
      <div
        style={{
          ...abs(X0, 284, 780, 660),
          borderRadius: 24,
          background: '#FFFFFF',
          border: `1.5px solid ${RULE}`,
          padding: '36px 38px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: TEAL_HEX }}>
            SECTION 04 · CAPABILITIES
          </span>
        </div>

        <h3 style={{ fontSize: 32, fontWeight: 780, color: INK_HEX, margin: '0 0 14px' }}>
          Daftar Kebutuhan Pengguna
        </h3>
        <p style={{ fontSize: 20, color: BODY, margin: '0 0 20px', lineHeight: 1.45 }}>
          Menjelaskan kemampuan fungsional apa yang harus bisa dilakukan oleh pengunjung UrbanStore:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, translate: '0px 20.86px' }}>
          {[
            'Pengunjung dapat melihat daftar katalog produk fashion terkini.',
            'Pengunjung dapat mencari dan memfilter produk per kategori (Pria/Wanita).',
            'Pengunjung dapat melihat panduan ukuran visual di halaman detail.',
            'Pengguna dapat mengelola item dan melihat subtotal di keranjang.',
            'Pengguna dapat menyelesaikan pembayaran via checkout 3 langkah ringkas.',
          ].map((text, idx) => (
            <div
              key={idx}
              style={{
                background: '#F9F9F8',
                borderRadius: 14,
                padding: '15px 20px',
                ...row,
                gap: 16,
                border: `1px solid ${RULE}`,
              }}
            >
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: TEAL_HEX,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 18, color: INK_HEX, fontWeight: 600, lineHeight: 1.4, flex: 1 }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Card: User Stories & Formula (860 x 660) */}
      <div
        style={{
          ...abs(940, 284, 860, 660),
          borderRadius: 24,
          background: TINT_YELLOW,
          padding: '36px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: '#B07A12' }}>
              SECTION 05 · INTENT & BENEFIT
            </span>
          </div>

          <h3 style={{ fontSize: 32, fontWeight: 780, color: INK_HEX, margin: '0 0 14px' }}>
            Formula Standar User Story
          </h3>
          <p style={{ fontSize: 20, color: BODY, margin: '0 0 20px', lineHeight: 1.45 }}>
            Menjelaskan kebutuhan dari sudut pandang nyata persona pengguna:
          </p>

          {/* Formula Card */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 18,
              padding: '24px 28px',
              border: `2px solid ${TEAL_HEX}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div style={{ ...row, gap: 14 }}>
              <span style={{ fontFamily: MONO, fontSize: 18, background: TINT_TEAL, color: TEAL_HEX, padding: '4px 12px', borderRadius: 8, fontWeight: 700 }}>
                AS A
              </span>
              <span style={{ fontSize: 20, fontWeight: 700, color: INK_HEX }}>
                [Type of user / Persona]
              </span>
            </div>
            <div style={{ ...row, gap: 14 }}>
              <span style={{ fontFamily: MONO, fontSize: 18, background: TINT_YELLOW, color: '#B07A12', padding: '4px 12px', borderRadius: 8, fontWeight: 700 }}>
                I WANT
              </span>
              <span style={{ fontSize: 20, fontWeight: 700, color: INK_HEX }}>
                [Goal / Action yang ingin dilakukan]
              </span>
            </div>
            <div style={{ ...row, gap: 14 }}>
              <span style={{ fontFamily: MONO, fontSize: 18, background: TINT_PINK, color: CORAL_HEX, padding: '4px 12px', borderRadius: 8, fontWeight: 700 }}>
                SO THAT
              </span>
              <span style={{ fontSize: 20, fontWeight: 700, color: INK_HEX }}>
                [Benefit / Nilai yang didapatkan]
              </span>
            </div>
          </div>

          {/* Real UrbanStore Example */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              padding: '20px 24px',
              marginTop: 18,
              border: `1.5px solid ${RULE}`,
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 15, color: '#B07A12', fontWeight: 700, marginBottom: 8 }}>
              CONTOH KASUS URBANSTORE
            </div>
            <div
              style={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontSize: 22,
                color: INK_HEX,
                lineHeight: 1.45,
              }}
            >
              “As a customer, I want to filter products by category and see clear size measurements, so that I can find trendy outfits that fit my budget without hesitation.”
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.7)',
            borderRadius: 14,
            padding: '14px 20px',
            fontSize: 18,
            color: INK_HEX,
            lineHeight: 1.4,
          }}
        >
          <strong>Nilai Plus:</strong> User Stories membuat AI Agent mengerti <em>tujuan akhir</em> pengguna, bukan hanya menuruti baris instruksi kaku.
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 10 — BAGIAN 3: SCOPE & FUNCTIONAL REQUIREMENTS
// ============================================================================
const Slide10ScopeAndFR: Page = () => {
  return (
    <Frame>
      <Eyebrow>PRD Core Structure · Anatomy Section 03</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(72), translate: '0px -55.6px' }}>Terjemahkan ke perilaku sistem</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 23, lineHeight: 1.45, color: BODY, textAlign: 'right' }}>
        Batasi cakupan rilis MVP dan deskripsikan secara spesifik <Highlight color={HIGHLIGHT_TEAL}>bagaimana sistem merespons aksi pengguna</Highlight>.
      </div>

      {/* Left Column: Scope Definition (760 x 660) */}
      <div
        style={{
          ...abs(X0, 284, 760, 660),
          borderRadius: 24,
          background: '#FFFFFF',
          border: `1.5px solid ${RULE}`,
          padding: '36px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: TEAL_HEX }}>
              SECTION 06 · BOUNDARIES
            </span>
          </div>

          <h3 style={{ fontSize: 32, fontWeight: 780, color: INK_HEX, margin: '0 0 16px' }}>
            In-Scope vs Out-of-Scope
          </h3>

          {/* In Scope */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ ...row, gap: 10, marginBottom: 10, translate: '0px 10.78px' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: TEAL_HEX }} />
              <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 750, color: TEAL_HEX }}>
                IN SCOPE — MVP V1
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, translate: '0px 10.78px' }}>
              {['Homepage & Banner', 'Katalog Kurasi', 'Detail & Size Guide', 'Shopping Cart', '3-Step Checkout', 'Order Confirmation'].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: TINT_TEAL,
                    borderRadius: 10,
                    padding: '10px 14px',
                    fontSize: 16,
                    fontWeight: 650,
                    color: INK_HEX,
                    ...row,
                    gap: 8,
                  }}
                >
                  <CheckMark color={TEAL_HEX} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Out of Scope */}
          <div>
            <div style={{ ...row, gap: 10, marginBottom: 10, translate: '0px 14.06px' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: CORAL_HEX }} />
              <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 750, color: CORAL_HEX }}>
                OUT OF SCOPE — TUNDA V2
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, translate: '0px 14.06px' }}>
              {['AI Virtual Stylist', 'Multi-seller Platform', 'Virtual 3D Fitting Room', 'Integrasi Paylater & KYC'].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: TINT_PINK,
                    borderRadius: 10,
                    padding: '10px 14px',
                    fontSize: 16,
                    fontWeight: 600,
                    color: INK_HEX,
                    ...row,
                    gap: 8,
                  }}
                >
                  <CrossMark color={CORAL_HEX} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ fontSize: 17, color: SOFT, fontFamily: MONO }}>
          💡 Pagar scope mencegah AI Agent mengarang fitur tambahan
        </div>
      </div>

      {/* Right Column: Functional Requirements (880 x 660) */}
      <div
        style={{
          ...abs(920, 284, 880, 660),
          borderRadius: 24,
          background: TINT_TEAL,
          padding: '36px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: `2px solid ${TEAL_HEX}`,
        }}
      >
        <div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: TEAL_HEX }}>
              SECTION 07 · BEHAVIOR RULES
            </span>
          </div>

          <h3 style={{ fontSize: 32, fontWeight: 780, color: INK_HEX, margin: '0 0 16px' }}>
            Contoh Spesifikasi Fungsional Nyata
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* FR-01 */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: '20px 24px',
                border: `1.5px solid ${RULE}`,
              }}
            >
              <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 800, color: TEAL_HEX }}>
                  FR-01 — Product Catalog
                </span>
                <span style={{ fontFamily: MONO, fontSize: 14, background: TINT_YELLOW, color: '#B07A12', padding: '2px 10px', borderRadius: 6, fontWeight: 700 }}>
                  Catalog Page
                </span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 17, color: BODY, lineHeight: 1.5 }}>
                <li>Sistem harus menampilkan daftar produk dalam format grid responsive.</li>
                <li>Setiap kartu produk menampilkan foto aesthetic, nama, harga, dan kategori.</li>
                <li>Pengguna dapat memfilter berdasarkan kategori pria dan wanita.</li>
                <li>Produk tanpa stok harus menampilkan badge status "Habis" secara jelas.</li>
              </ul>
            </div>

            {/* FR-02 */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: '20px 24px',
                border: `1.5px solid ${RULE}`,
              }}
            >
              <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 800, color: TEAL_HEX }}>
                  FR-02 — Shopping Cart
                </span>
                <span style={{ fontFamily: MONO, fontSize: 14, background: TINT_BLUE, color: BLUE, padding: '2px 10px', borderRadius: 6, fontWeight: 700 }}>
                  Cart Drawer / Page
                </span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 17, color: BODY, lineHeight: 1.5 }}>
                <li>Pengguna dapat menambah produk ke keranjang dari halaman detail.</li>
                <li>Pengguna dapat mengubah jumlah item (qty) atau menghapus item langsung.</li>
                <li>Sistem harus mengupdate subtotal dan total biaya secara instan realtime.</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 14,
            padding: '16px 22px',
            fontSize: 18,
            color: INK_HEX,
            lineHeight: 1.4,
          }}
        >
          <strong>Dampak ke AI:</strong> Tanpa Functional Requirements, AI hanya mendesain tombol mati tanpa fungsi event handler atau state management yang benar.
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 11 — BAGIAN 4: USER FLOW, BUSINESS RULES & ACCEPTANCE CRITERIA
// ============================================================================
const Slide11FlowRulesAC: Page = () => {
  return (
    <Frame>
      <Eyebrow>PRD Core Structure · Anatomy Section 04</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(72), translate: '0px -55.6px' }}>
        Alur, aturan bisnis &<br />kriteria selesai
      </h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 23, lineHeight: 1.45, color: BODY, textAlign: 'right' }}>
        Tiga pilar penentu agar hasil development AI memiliki alur mulus, bebas celah logika, dan lolos uji verifikasi.
      </div>

      {/* 3 Columns Layout (1680 x 660) */}
      <div
        style={{
          ...abs(X0, 284, W, 660),
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 20,
        }}
      >
        {/* Column 1: User Flow */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 22,
            border: `1.5px solid ${RULE}`,
            padding: '34px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: TEAL_HEX }}>
                SECTION 08
              </span>
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 780, color: INK_HEX, margin: '0 0 10px' }}>
              User Flow
            </h3>
            <p style={{ fontSize: 18, color: BODY, margin: '0 0 20px', lineHeight: 1.45 }}>
              Urutan langkah pengguna saat menyelesaikan checkout belanja:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                '01. Product Detail (Pilih size)',
                '02. Click "Add to Cart"',
                '03. Review Shopping Cart',
                '04. Fill Checkout Form (Alamat)',
                '05. Review Order Summary',
                '06. Click "Place Order"',
                '07. Invoice & QRIS Confirmation',
              ].map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#F9F9F8',
                    borderRadius: 10,
                    padding: '8px 14px',
                    fontSize: 16,
                    fontWeight: 650,
                    color: INK_HEX,
                    ...row,
                    gap: 10,
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: TEAL_HEX }} />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 16, color: SOFT, fontFamily: MONO }}>
            ✓ Menjelaskan urutan screen
          </div>
        </div>

        {/* Column 2: Business Rules */}
        <div
          style={{
            background: TINT_YELLOW,
            borderRadius: 22,
            padding: '34px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: '#B07A12' }}>
                SECTION 09
              </span>
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 780, color: INK_HEX, margin: '0 0 10px' }}>
              Business Rules
            </h3>
            <p style={{ fontSize: 18, color: BODY, margin: '0 0 20px', lineHeight: 1.45 }}>
              Aturan logika wajib yang tidak boleh dilanggar oleh sistem:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { rule: 'Kuantitas Minimum', text: 'Jumlah produk yang ditambahkan ke cart minimal 1 item.' },
                { rule: 'Validasi Stok', text: 'Pengguna dilarang memesan melebihi stok yang tersedia.' },
                { rule: 'Kalkulasi Total', text: 'Total dihitung dari (Harga × Qty) + Ongkir flat promo.' },
                { rule: 'Validitas Pesanan', text: 'Order hanya berhasil jika field alamat dan no. HP valid.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 12,
                    padding: '12px 16px',
                    border: `1.5px solid ${RULE}`,
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 750, color: '#B07A12' }}>
                    {item.rule}
                  </div>
                  <div style={{ fontSize: 16, color: BODY, marginTop: 4, lineHeight: 1.35 }}>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 16, color: SOFT, fontFamily: MONO }}>
            ✓ Menjelaskan batasan sistem
          </div>
        </div>

        {/* Column 3: Acceptance Criteria */}
        <div
          style={{
            background: TINT_TEAL,
            borderRadius: 22,
            padding: '34px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: `2px solid ${TEAL_HEX}`,
          }}
        >
          <div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: TEAL_HEX }}>
                SECTION 10
              </span>
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 780, color: INK_HEX, margin: '0 0 10px' }}>
              Acceptance Criteria
            </h3>
            <p style={{ fontSize: 18, color: BODY, margin: '0 0 20px', lineHeight: 1.45 }}>
              Kondisi pasti yang menentukan fitur dinyatakan selesai (Format BDD):
            </p>

            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 14,
                padding: '18px 20px',
                border: `1.5px solid ${RULE}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 15, color: TEAL_HEX, fontWeight: 750 }}>
                SCENARIO: ADD TO CART
              </div>
              <div style={{ fontSize: 16, color: INK_HEX, lineHeight: 1.4 }}>
                <strong style={{ color: TEAL_HEX }}>GIVEN:</strong> Pengguna membuka halaman detail produk dengan stok tersedia.
              </div>
              <div style={{ fontSize: 16, color: INK_HEX, lineHeight: 1.4 }}>
                <strong style={{ color: '#B07A12' }}>WHEN:</strong> Pengguna memilih ukuran "M" dan menekan tombol "Add to Cart".
              </div>
              <div style={{ fontSize: 16, color: INK_HEX, lineHeight: 1.4 }}>
                <strong style={{ color: CORAL_HEX }}>THEN:</strong> Item masuk ke keranjang belanja & indikator badge cart bertambah.
              </div>
              <div style={{ fontSize: 16, color: INK_HEX, lineHeight: 1.4 }}>
                <strong style={{ color: BODY }}>AND:</strong> Subtotal keranjang belanja diperbarui secara akurat realtime.
              </div>
            </div>
          </div>

          <div style={{ fontSize: 16, color: SOFT, fontFamily: MONO }}>
            ✓ Tolak ukur pengujian developer & AI
          </div>
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 12 — BAGIAN 5: NFR, CONSTRAINTS & AGENT HANDOFF
// ============================================================================
const Slide12NFRAndHandoff: Page = () => {
  return (
    <Frame>
      <Eyebrow>Final Checklist & Implementation Pipeline</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(72), translate: '0px -29.55px' }}>Dari PRD ke eksekusi AI Agent</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 23, lineHeight: 1.45, color: BODY, textAlign: 'right' }}>
        PRD yang baik tidak berhenti pada fitur. Lengkapi batasan non-fungsional dan checklist kesiapan handoff ke AI.
      </div>

      {/* Top Split: NFR & Constraints (1680 x 300) */}
      <div
        style={{ ...abs(X0, 284, W, 270), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '1680px', height: '241.43px', translate: '0px 0px' }}
      >
        {/* NFR */}
        <div
          style={{
            background: TINT_BLUE,
            borderRadius: 20,
            padding: '24px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ marginBottom: 10 }}>
              <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 750, color: BLUE }}>
                11. NON-FUNCTIONAL REQUIREMENTS
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Responsive', desc: 'Sempurna di mobile, tablet & desktop' },
                { label: 'Accessibility', desc: 'Kontras teks nyaman & size font terbaca' },
                { label: 'Fast Loading', desc: 'Load time katalog < 2 detik' },
                { label: 'Clear Validation', desc: 'Pesan error form jelas & solutif' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#FFFFFF', borderRadius: 12, padding: '10px 14px', border: `1.5px solid ${RULE}` }}>
                  <div style={{ fontSize: 16, fontWeight: 750, color: INK_HEX }}>{item.label}</div>
                  <div style={{ fontSize: 14, color: BODY, marginTop: 2 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Constraints */}
        <div
          style={{
            background: TINT_YELLOW,
            borderRadius: 20,
            padding: '24px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ marginBottom: 10 }}>
              <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 750, color: '#B07A12' }}>
                12. TECHNICAL CONSTRAINTS
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Stack Proyek', desc: 'Gunakan Vite + React + Tailwind CSS' },
                { label: 'Data Source', desc: 'Gunakan local mock JSON sebelum backend' },
                { label: 'Design System', desc: 'Ikuti komponen UI & color palette yang rapi' },
                { label: 'No Payment Assumed', desc: 'Jangan asumsikan payment live tanpa API key' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#FFFFFF', borderRadius: 12, padding: '10px 14px', border: `1.5px solid ${RULE}` }}>
                  <div style={{ fontSize: 16, fontWeight: 750, color: INK_HEX }}>{item.label}</div>
                  <div style={{ fontSize: 14, color: BODY, marginTop: 2 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Middle: AI Agent Handoff Checklist (1680 x 240) */}
      <div
        style={{ ...abs(X0, 574, W, 230), borderRadius: 22, background: '#FFFFFF', border: `2px solid ${TEAL_HEX}`, padding: '24px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', translate: '0px -34px' }}
      >
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: TEAL_HEX }}>
            AI AGENT HANDOFF CHECKLIST · SEBELUM CODING DIMULAI
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            'PRD tersimpan sebagai file PRD_UrbanStore.md di repo.',
            'Requirement tidak saling bertentangan / kontradiktif.',
            'Scope MVP In-Scope vs Out-of-Scope sudah tegas.',
            'Business Rules & batasan logika telah dicantumkan.',
            'Acceptance Criteria tersedia untuk memverifikasi fitur.',
            'Hal yang belum diputuskan ditandai, bukan ditebak AI.',
          ].map((check, i) => (
            <div
              key={i}
              style={{
                ...row,
                gap: 12,
                background: '#F9F9F8',
                borderRadius: 12,
                padding: '12px 16px',
                border: `1.5px solid ${RULE}`,
              }}
            >
              <CheckMark color={TEAL_HEX} />
              <span style={{ fontSize: 16, color: INK_HEX, fontWeight: 650, lineHeight: 1.35 }}>
                {check}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Master Final Workflow Pipeline (1680 x 120) */}
      <div
        style={{ ...abs(X0, 824, W, 130), borderRadius: 20, background: TINT_TEAL, padding: '20px 32px', ...row, justifyContent: 'space-between', translate: '0px -34px' }}
      >
        <div style={{ ...row, gap: 14 }}>
          {[
            { step: 'PLANNING', desc: 'Product Decisions' },
            { step: 'PRD (.MD)', desc: 'AI-Ready Specs' },
            { step: 'AI AGENT', desc: 'Context Injection' },
            { step: 'CODE', desc: 'Precision Vibe Coding' },
            { step: 'TESTING', desc: 'Verify Against AC' },
          ].map((node, i) => (
            <div key={i} style={{ ...row, gap: 14 }}>
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 12,
                  padding: '10px 18px',
                  border: `1.5px solid ${TEAL_HEX}`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 800, color: TEAL_HEX }}>
                  {node.step}
                </div>
                <div style={{ fontSize: 13, color: BODY, marginTop: 2 }}>{node.desc}</div>
              </div>
              {i < 4 && <span style={{ color: TEAL_HEX, fontWeight: 800, fontSize: 20 }}>→</span>}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'right', maxWidth: 420 }}>
          <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 19, color: INK_HEX, lineHeight: 1.35 }}>
            “PRD yang jelas menghilangkan ruang bagi AI untuk menebak-nebak kebutuhan kita.”
          </div>
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 13 — AJAKAN PRAKTIK: BUAT & REVIEW PRD
// ============================================================================
const Slide13PraktikPRD: Page = () => {
  return (
    <Frame>
      <Eyebrow color={TEAL_HEX}>Hands-on Practice · Action Time</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(72), translate: '0px -20.47px' }}>
        Saatnya Praktik!
      </h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 24, lineHeight: 1.45, color: BODY, textAlign: 'right' }}>
        Mari langsung <Highlight color={HIGHLIGHT_TEAL}>susun dan review</Highlight> dokumen{' '}
        <Highlight color={HIGHLIGHT_PINK}>PRD UrbanStore bersama-sama</Highlight>.
      </div>

      {/* 3 Step Action Cards (1680 x 360) */}
      <div
        style={{
          ...abs(X0, 284, W, 360),
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 24,
        }}
      >
        {/* Step 1 */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            border: `1.5px solid ${RULE}`,
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontFamily: MONO, fontSize: 44, fontWeight: 800, color: TEAL_HEX }}>
              01
            </span>
            <h3 style={{ fontSize: 32, fontWeight: 780, color: INK_HEX, margin: '20px 0 12px', lineHeight: 1.2 }}>
              Jalankan Prompt PRD
            </h3>
            <p style={{ fontSize: 20, color: BODY, lineHeight: 1.45, margin: 0 }}>
              Masukkan konteks produk UrbanStore dari Part 1 ke AI untuk menghasilkan draf awal dokumen PRD.
            </p>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 16, color: TEAL_HEX, fontWeight: 700 }}>
            AI Draft Generation →
          </div>
        </div>

        {/* Step 2 */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            border: `1.5px solid ${RULE}`,
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontFamily: MONO, fontSize: 44, fontWeight: 800, color: '#B07A12' }}>
              02
            </span>
            <h3 style={{ fontSize: 32, fontWeight: 780, color: INK_HEX, margin: '20px 0 12px', lineHeight: 1.2 }}>
              Review & Validasi
            </h3>
            <p style={{ fontSize: 20, color: BODY, lineHeight: 1.45, margin: 0 }}>
              Kaji kritis scope MVP, aturan checkout, dan acceptance criteria agar realistis untuk pengguna.
            </p>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 16, color: '#B07A12', fontWeight: 700 }}>
            Human Validation →
          </div>
        </div>

        {/* Step 3 */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            border: `2px solid ${TEAL_HEX}`,
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontFamily: MONO, fontSize: 44, fontWeight: 800, color: CORAL_HEX }}>
              03
            </span>
            <h3 style={{ fontSize: 32, fontWeight: 780, color: INK_HEX, margin: '20px 0 12px', lineHeight: 1.2 }}>
              Simpan File .md
            </h3>
            <p style={{ fontSize: 20, color: BODY, lineHeight: 1.45, margin: 0 }}>
              Simpan dokumen final sebagai panduan resmi yang siap di-handoff ke AI coding di sesi berikutnya.
            </p>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 16, color: CORAL_HEX, fontWeight: 700 }}>
            docs/PRD_UrbanStore.md →
          </div>
        </div>
      </div>

      {/* Hero CTA Box (1680 x 220) */}
      <div
        style={{
          ...abs(X0, 680, W, 220),
          borderRadius: 24,
          background: TINT_TEAL,
          border: `2px solid ${TEAL_HEX}`,
          padding: '36px 48px',
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: 34, fontWeight: 800, color: INK_HEX, letterSpacing: '-0.02em' }}>Buka ChatGPT / Claude / Gemini Anda sekarang!</div>
          <div style={{ fontSize: 22, color: BODY, marginTop: 8 }}>
            Mari kita demonstrasikan dan susun PRD UrbanStore secara live.
          </div>
        </div>

        <div
          style={{
            background: TEAL_HEX,
            color: '#FFFFFF',
            padding: '18px 36px',
            borderRadius: 16,
            fontSize: 22,
            fontWeight: 800,
            fontFamily: MONO,
            letterSpacing: '0.02em',
          }}
        >
          Mulai Praktik Live →
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// METADATA & PRESENTER NOTES EXPORTS
// ============================================================================
export const meta: SlideMeta = {
  title: '[VCB Batch 4] Sesi 2 - Part 2',
  createdAt: '2026-11-06T07:00:00.000Z',
  theme: 'swiss-japanese',
};

export const notes: (string | undefined)[] = [
  `Selamat datang di Vibe Coding Bootcamp Batch 4 - Sesi 2 Part 2: Product Requirement Document (PRD).
Hari ini kita melangkah dari Product Planning (Part 1) menuju Product Specification.
Jelaskan ke peserta: di sesi ini kita belajar mengubah keputusan bisnis menjadi dokumen PRD berbasis Markdown (.md) yang siap dibaca oleh AI Agent agar proses coding terarah tanpa tebakan. Studi kasus kita tetap konsisten: UrbanStore.`,

  `Jembatan dari Part 1 ke Part 2: Strategi sudah ada, sekarang saatnya dokumentasikan.
Di Part 1 kita menetapkan keputusan makro (Target User, Problem, Solusi, Goals, MVP Scope, Journey). Namun developer dan AI Agent tidak bisa langsung coding dari canvas semata.
Part 1 = Product Decisions. Part 2 = Product Requirements. Di Part 2 kita definisikan perilakunya (behavior) dan kriteria selesainya.`,

  `Definisi PRD: Product Requirement Document adalah panduan bersama tentang produk yang akan dibangun.
Tekankan ke peserta bahwa PRD bukan dokumen formalitas yang tebal dan berdebu. PRD menjawab 6 pertanyaan fundamental: purpose, user, features, behavior, rules, dan acceptance criteria.
Tunjukkan alur belanja UrbanStore dari katalog hingga checkout sebagai contoh nyata.`,

  `Untuk Apa PRD Dibuat? Kurangi tebakan, miskomunikasi, dan rework.
Jelaskan 5 fungsi utama PRD: Alignment, Scope Control, Development Reference, Testing Reference, dan Change Management.
Sorot kasus nyata "Ambiguity of Checkout": jika kita cuma bilang "buat fitur checkout", AI bisa menebak apakah butuh login, form apa saja, dan bagaimana order dibuat. PRD membuatnya eksplisit.`,

  `Kenapa PRD Sangat Penting untuk AI Agent?
AI Agent bisa coding sangat cepat dan membaca file proyek. Tetapi tanpa PRD, AI cenderung mengarang aturan bisnis, membuat fitur di luar scope, dan menghasilkan kode yang tampak jadi tapi logikanya salah.
PRD berfungsi sebagai Source of Truth: Context, Requirements, Rules, Constraints, dan Acceptance Criteria.`,

  `Kenapa Format Markdown (.md)? Standar emas spesifikasi AI modern.
Jelaskan 5 keunggulan .md: Plain text ringan, hierarki heading jelas, mudah diedit langsung di IDE (VS Code / Antigravity), native di dalam repo proyek, dan terlacak perubahannya di Git.
Tunjukkan potongan kode docs/PRD_UrbanStore.md di sebelah kanan. Tekankan bahwa Markdown bukan sihir, tapi format yang sangat efisien untuk manusia dan LLM.`,

  `Workflow Menyusun PRD dengan Prompt Terstruktur.
Ingatkan peserta: kita tidak mulai dari halaman kosong dan tidak perlu menulis dari nol. Kita sudah punya template prompt PRD dari sesi sebelumnya.
Jelaskan 5 langkah alur kerja: Siapkan Konteks → Generate via Prompt → Review & Validasi Manusia → Simpan .md → Handoff ke AI Agent. Tekankan: AI creates draft, human decides!`,

  `Bedah Struktur PRD Bagian 1: Product Overview & Product Goals.
Jelaskan 3 komponen pembuka: Product Overview (konteks UrbanStore), Product Goals (3 tujuan fungsional), dan Success Metrics (indikator angka keberhasilan).
Jelaskan mengapa AI Agent butuh ini: agar AI memahami intensi produk, bukan hanya mendesain tampilan kosmetik.`,

  `Bedah Struktur PRD Bagian 2: User Requirements & User Stories.
Bedakan User Requirements (kebutuhan kapabilitas umum) dengan User Stories (kebutuhan dari sudut pandang nyata persona).
Bedah formula standar: As a [User], I want [Goal], So that [Benefit]. Tunjukkan contoh konkrit UrbanStore di kartu kanan.`,

  `Bedah Struktur PRD Bagian 3: Scope & Functional Requirements (FR).
Jelaskan batas Scope: apa yang In-Scope untuk MVP V1 vs apa yang Out-of-Scope (tunda ke V2 seperti AI Stylist).
Bedah contoh Functional Requirements FR-01 (Product Catalog) dan FR-02 (Shopping Cart). Tanpa FR, AI hanya membuat tombol mati tanpa state management yang benar.`,

  `Bedah Struktur PRD Bagian 4: User Flow, Business Rules & Acceptance Criteria.
Tiga pilar penentu:
1. User Flow menjelaskan urutan 7 langkah checkout.
2. Business Rules menjelaskan aturan sistem (stok, minimum qty, kalkulasi total).
3. Acceptance Criteria menggunakan format BDD (Given / When / Then / And) untuk menguji apakah implementasi fitur sudah benar.`,

  `Bedah Struktur PRD Bagian 5: NFR, Technical Constraints & Final Handoff.
Jelaskan Non-Functional Requirements (responsive, speed, accessible) dan Technical Constraints (stack Vite React Tailwind, mock data).
Ajak peserta meninjau AI Agent Handoff Checklist (6 poin wajib centang) sebelum memulai sesi coding live berikutnya.
Tutup dengan Master Workflow: Product Planning → PRD (.md) → AI Agent → Implementation → Review & Testing!`,

  `Slide 13: Ajakan Praktik Membuat dan Review PRD.
Saatnya peserta langsung mempraktikkan materi hari ini!
Instruksikan peserta untuk:
1. Mengambil hasil Product Planning Canvas UrbanStore dari Part 1.
2. Menggunakan template prompt PRD terstruktur untuk meng-generate draf awal dokumen spesifikasi di AI.
3. Melakukan review kritis terhadap 5 bagian PRD: pastikan scope MVP tidak bocor (Scope Creep), aturan checkout realistis, dan acceptance criteria terukur.
4. Menyimpan dokumen final sebagai docs/PRD_UrbanStore.md di repo masing-masing.
Ajak peserta mencentang 6 checklist kesiapan PRD sebelum kita masuk ke sesi coding live bersama AI Agent di pertemuan berikutnya!`,
];

export default [
  Slide01Cover,
  Slide02Bridge,
  Slide03ApaItuPRD,
  Slide04FungsiPRD,
  Slide05PRDUntukAIAgent,
  Slide06MarkdownFormat,
  Slide07WorkflowPrompt,
  Slide08OverviewAndGoals,
  Slide09UserStories,
  Slide10ScopeAndFR,
  Slide11FlowRulesAC,
  Slide12NFRAndHandoff,
  Slide13PraktikPRD,
] satisfies Page[];

