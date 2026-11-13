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

const SLIDE_ID = 'vibe-coding-sesi-2-part-1';
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
  lineHeight: 1.0,
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
        <span>Vibe Coding Bootcamp · Batch 4 · Sesi 2 Part 1</span>
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
  <div data-osd-interactive="true" style={root}>
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
    style={{
      ...abs(X0, top),
      fontSize: 25,
      fontWeight: 680,
      color: color,
      letterSpacing: '0.01em',
      lineHeight: 1.2,
    }}
  >
    {children}
  </div>
);

const TallyBox = ({
  x,
  miss = false,
  accent = false,
  live,
}: {
  x: number;
  miss?: boolean;
  accent?: boolean;
  live: boolean;
}) => (
  <g transform={`translate(${x} 0)`}>
    <rect
      x="3"
      y="3"
      width="52"
      height="52"
      rx="9"
      fill={miss ? TINT_PINK : accent ? TINT_TEAL : TINT_GREEN}
      strokeWidth={2.8}
    />
    {miss ? (
      <Stroke
        d="M17 17L41 41M41 17L17 41"
        color={CORAL_HEX}
        width={3.6}
        live={live}
        delay={0.7}
        dur={0.4}
      />
    ) : (
      <path d="M14 30L25 41L44 16" stroke={accent ? TEAL_HEX : INK_HEX} strokeWidth={3.4} />
    )}
  </g>
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
const ProductPlanningCoverArt = ({ live }: { live: boolean }) => (
  <Ink width={740} height={700} wobble={2.0} style={abs(1080, 150)}>
    {/* Soft Backdrop Blobs */}
    <circle cx="380" cy="360" r="240" fill={TINT_TEAL} stroke="none" />
    <circle cx="510" cy="220" r="115" fill={TINT_YELLOW} stroke="none" />
    <circle cx="210" cy="490" r="85" fill={TINT_PINK} stroke="none" />

    {/* Ground Baseline */}
    <path d="M40 670 Q340 664 580 668 T720 667" stroke={INK_HEX} strokeWidth={3} strokeLinecap="round" />

    {/* Mobile Smartphone Frame: UrbanStore App */}
    <rect x="190" y="150" width="330" height="500" rx="34" fill="#FFFFFF" stroke={INK_HEX} strokeWidth={3.4} />
    {/* Speaker Notch */}
    <rect x="295" y="164" width="120" height="10" rx="5" fill={INK_HEX} />

    {/* UrbanStore App Header */}
    <rect x="214" y="192" width="115" height="24" rx="6" fill={TINT_TEAL} />
    <path d="M228 204h85" stroke={TEAL_HEX} strokeWidth={3} strokeLinecap="round" />
    {/* Shopping Bag Icon */}
    <path d="M465 196l4 14h24l4 -14zM474 196v-5a5 5 0 0 1 10 0v5" fill="none" stroke={INK_HEX} strokeWidth={2.4} />

    {/* Fashion Outfit Product Card */}
    <rect x="214" y="232" width="282" height="220" rx="16" fill="#F8F8F6" stroke={RULE} strokeWidth={2} />
    {/* Hand-drawn Hoodie/Jacket */}
    <path
      d="M295 268 C320 286 370 286 395 268 L430 300 L408 328 L390 318 L390 420 L300 420 L300 318 L282 328 L260 300 Z"
      fill={TEAL_HEX}
      stroke={INK_HEX}
      strokeWidth={3}
      strokeLinejoin="round"
    />
    {/* Hanger / Collar */}
    <path d="M336 260 C345 248 350 244 344 236 C338 228 352 225 350 238 L348 260" fill="none" stroke={INK_HEX} strokeWidth={2.6} />

    {/* Product Info Lines */}
    <path d="M224 476h160" stroke={INK_HEX} strokeWidth={4} strokeLinecap="round" />
    <path d="M224 494h100" stroke={SOFT} strokeWidth={2.6} strokeLinecap="round" />

    {/* Price Tag Pill */}
    <rect x="224" y="512" width="116" height="30" rx="8" fill={TINT_YELLOW} />
    <path d="M240 527h84" stroke="#B07A12" strokeWidth={3} strokeLinecap="round" />

    {/* Add to Cart Button */}
    <rect x="356" y="512" width="138" height="30" rx="8" fill={CORAL_HEX} />
    <path d="M380 527h88" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" />

    {/* 3 Step Dots at bottom */}
    <circle cx="325" cy="576" r="5" fill={TEAL_HEX} />
    <circle cx="355" cy="576" r="5" fill={RULE} />
    <circle cx="385" cy="576" r="5" fill={RULE} />

    {/* Top-Left Floating Strategy Card: Problem */}
    <g transform="translate(60, 220) rotate(-4)">
      <rect width="180" height="96" rx="14" fill="#FFFFFF" stroke={INK_HEX} strokeWidth={2.8} />
      <rect x="16" y="16" width="84" height="20" rx="6" fill={TINT_PINK} />
      <path d="M24 26h68" stroke={CORAL_HEX} strokeWidth={2.6} />
      <path d="M16 52h140M16 70h96" stroke={INK_HEX} strokeWidth={3} strokeLinecap="round" />
    </g>

    {/* Bottom-Right Floating Strategy Card: MVP Scope */}
    <g transform="translate(470, 420) rotate(3)">
      <rect width="186" height="100" rx="14" fill="#FFFFFF" stroke={INK_HEX} strokeWidth={2.8} />
      <rect x="16" y="16" width="90" height="20" rx="6" fill={TINT_TEAL} />
      <path d="M24 26h74" stroke={TEAL_HEX} strokeWidth={2.6} />
      <path d="M16 52h146M16 70h102" stroke={INK_HEX} strokeWidth={3} strokeLinecap="round" />
    </g>

    {/* Connecting Dashed Strategy Flows */}
    <path d="M210 260 C250 250 270 230 300 210" stroke={CORAL_HEX} strokeWidth={2.8} strokeDasharray="6 6" fill="none" />
    <path d="M360 530 C410 530 440 500 480 470" stroke={TEAL_HEX} strokeWidth={2.8} strokeDasharray="6 6" fill="none" />

    {/* Sparkles */}
    <Sparkle x={130} y={150} s={0.9} fill={YELLOW} />
    <Sparkle x={610} y={170} s={1.1} fill={TEAL_HEX} />
    <Sparkle x={630} y={350} s={0.8} fill={PINK} />
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
            Batch 4 · Sesi 1 — PART 2
          </span>
          <span style={{ fontSize: 24, color: SOFT, fontWeight: 500 }}>
            {''}
          </span>
        </div>

        <h1 style={{ ...headline(110), letterSpacing: '-0.04em', lineHeight: 1.02 }}>
          Mindset, AI Coding
          <br />
          Fundamentals &
          <br />
          <span style={{ position: 'relative', display: 'inline-block', color: TEAL_HEX }}>
            Product Planning.
            <CircleDoodle
              x={-30}
              y={-18}
              w={920}
              h={146}
              color={CORAL_HEX}
              live={live}
              delay={0.4}
            />
          </span>
        </h1>

        <p
          style={{
            fontSize: 34,
            lineHeight: 1.45,
            color: BODY,
            margin: '8px 0 0',
            maxWidth: 960,
          }}
        >
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', color: INK_HEX }}>
            From Idea to Product Strategy —
          </span>{' '}
          Menentukan produk apa yang harus dibangun, untuk siapa, dan mengapa layak dibuat sebelum
          menulis kode.
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

      {/* Fresh Product Planning & UrbanStore Hand-drawn Art Composition */}
      <ProductPlanningCoverArt live={live} />
    </Frame>
  );
};

const Slide02Objectives: Page = () => {
  const live = useIsActivePage();
  const [selected, setSelected] = useState(0);

  const objectives = [
    { code: '01', title: 'Product Thinking vs Feature-First', sub: 'Berpikir dari akar masalah pengguna, bukan fitur semata', tag: 'Mindset' },
    { code: '02', title: 'Problem Discovery & UrbanStore Context', sub: 'Identifikasi 4 masalah belanja fashion online bagi Gen Z', tag: 'Discovery' },
    { code: '03', title: 'Idea Validation & 5 Pertanyaan Kunci', sub: 'Metode validasi evidence-based sebelum development', tag: 'Validation' },
    { code: '04', title: 'Target User, Persona & Problem Statement', sub: 'Mendefinisikan persona tajam dan formula problem presisi', tag: 'Definition' },
    { code: '05', title: 'Value Proposition & Success Metrics', sub: 'Diferensiasi penawaran dan metrik terukur keberhasilan', tag: 'Strategy' },
    { code: '06', title: 'MVP Scope, MoSCoW & User Journey', sub: 'Membatasi fitur prioritas dan memetakan alur Discover s/d Complete', tag: 'Roadmap' },
  ];

  return (
    <Frame>
      <Eyebrow>Learning Objectives · Sesi 2 Part 1</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 580), ...headline(96), lineHeight: 0.98 }}>
        Enam target
        <br />
        sesi ini.
      </h2>
      <p
        style={{ ...abs(X0, 396, 560), margin: 0, fontSize: 27, lineHeight: 1.5, color: BODY }}
      >
        Hari ini kita tidak sekadar belajar koding dengan AI. Kita belajar{' '}
        <Highlight>menentukan produk apa yang seharusnya dibangun</Highlight>, untuk siapa, dan
        mengapa layak dibuat sebelum mulai development.
      </p>

      <Ink width={420} height={60} style={abs(X0, 648)}>
        <TallyBox x={0} live={live} />
        <TallyBox x={70} live={live} />
        <TallyBox x={140} live={live} />
        <TallyBox x={210} accent live={live} />
        <TallyBox x={280} live={live} />
        <TallyBox x={350} accent live={live} />
      </Ink>
      <div style={{ ...abs(X0, 728, 560), fontSize: 21, color: SOFT }}>
        Klik baris di kanan untuk fokus pada poin pembelajaran
      </div>

      {objectives.map((obj, i) => {
        const top = 150 + i * 122;
        const active = selected === i;
        return (
          <div
            key={i}
            className="fw-interactive"
            onClick={() => setSelected(i)}
            style={{
              ...abs(760, top, 1040, 114),
              borderTop: `1.5px solid ${RULE}`,
              background: active ? TINT_TEAL : 'transparent',
              borderRadius: 16,
              padding: '16px 24px',
              ...row,
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, gap: 24 }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 26,
                  fontWeight: 750,
                  color: active ? TEAL_HEX : SOFT,
                }}
              >
                {obj.code}
              </span>
              <div>
                <div style={{ fontSize: 28, fontWeight: 720, color: INK_HEX, letterSpacing: '-0.02em' }}>
                  {obj.title}
                </div>
                <div style={{ fontSize: 21, color: BODY, marginTop: 4 }}>{obj.sub}</div>
              </div>
            </div>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 19,
                fontWeight: 650,
                padding: '6px 16px',
                borderRadius: 999,
                background: active ? TEAL_HEX : TINT_YELLOW,
                color: active ? '#FFFFFF' : INK_HEX,
              }}
            >
              {obj.tag}
            </span>
          </div>
        );
      })}
    </Frame>
  );
};

// ============================================================================
// SLIDE 03 — THE AI CODING PARADOX
// ============================================================================
const Slide03AICodingParadox: Page = () => {
  const [toggle, setToggle] = useState<'trap' | 'mindset'>('trap');

  return (
    <Frame>
      <Eyebrow color={CORAL_HEX}>The AI Coding Paradox</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(78), minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '1009.93px', height: '77.92px', translate: '0px 0px' }}>Bisa coding ≠ Produk sukses</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 24, lineHeight: 1.45, color: BODY, textAlign: 'right', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '600.96px', height: '104.4px', translate: '39.05px 0px' }}>
        AI mempercepat eksekusi 10x. Namun tanpa arah produk yang jelas, kita hanya mempercepat{' '}
        <Highlight color={HIGHLIGHT_PINK}>pembuatan produk yang salah</Highlight>.
      </div>

      {/* Left Card: 816 x 580 */}
      <div
        style={{ ...abs(X0, 284, 816, 580), borderRadius: 24, background: TINT_YELLOW, padding: '40px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '816px', height: '661.99px', translate: '0px 0px' }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 750, color: BODY }}>
              CORE PRINCIPLE
            </span>
            <Sparkle x={0} y={0} s={0.9} fill="#B07A12" />
          </div>

          <div
            style={{
              fontFamily: SERIF,
              fontSize: 54,
              fontStyle: 'italic',
              fontWeight: 600,
              color: INK_HEX,
              margin: '32px 0 20px',
              lineHeight: 1.12,
            }}
          >
            “Bisa membuat aplikasi bukan berarti membuat produk yang baik.”
          </div>

          <p style={{ fontSize: 26, lineHeight: 1.5, color: INK_HEX, margin: 0 }}>
            Sekarang siapa pun bisa membuat web dalam hitungan menit bersama AI. Tetapi apakah orang
            benar-benar membutuhkan aplikasi tersebut?
          </p>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 18,
            padding: '22px 26px',
            boxShadow: `inset 0 0 0 1.5px ${RULE}`,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 750, color: SOFT, fontFamily: MONO }}>
            KEY TAKEAWAY
          </div>
          <div style={{ fontSize: 22, fontWeight: 650, color: INK_HEX, marginTop: 6, lineHeight: 1.38 }}>
            AI menghemat waktu eksekusi. Tugas manusia adalah memastikan solusi yang dibangun benar-benar
            memiliki nilai nyata bagi pengguna.
          </div>
        </div>
      </div>

      {/* Right Card: 816 x 580 */}
      <div
        style={{ ...abs(984, 284, 816, 580), borderRadius: 24, background: '#FFFFFF', border: `1.5px solid ${RULE}`, boxShadow: '0 12px 36px rgba(0,0,0,0.04)', padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '816px', height: '661.99px', translate: '0px 0px' }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 20 }}>
            <span style={{ fontSize: 22, fontWeight: 750, color: SOFT, fontFamily: MONO }}>
              PERBANDINGAN REALITA
            </span>
            <div style={{ ...row, gap: 8, background: '#F4F4F2', padding: 5, borderRadius: 14 }}>
              <button
                type="button"
                onClick={() => setToggle('trap')}
                style={{
                  padding: '10px 20px',
                  borderRadius: 10,
                  fontSize: 19,
                  fontWeight: 750,
                  border: 'none',
                  cursor: 'pointer',
                  background: toggle === 'trap' ? CORAL_HEX : 'transparent',
                  color: toggle === 'trap' ? '#FFFFFF' : BODY,
                  transition: 'all 0.2s',
                }}
              >
                Jebakan Umum ✕
              </button>
              <button
                type="button"
                onClick={() => setToggle('mindset')}
                style={{
                  padding: '10px 20px',
                  borderRadius: 10,
                  fontSize: 19,
                  fontWeight: 750,
                  border: 'none',
                  cursor: 'pointer',
                  background: toggle === 'mindset' ? TEAL_HEX : 'transparent',
                  color: toggle === 'mindset' ? '#FFFFFF' : BODY,
                  transition: 'all 0.2s',
                }}
              >
                Product Mindset ✓
              </button>
            </div>
          </div>

          {toggle === 'trap' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { title: 'Banyak Fitur, Nol Solusi', desc: 'Bikin puluhan halaman tapi user bingung cara pakainya.' },
                { title: 'Tampilan Keren, Tanpa Value', desc: 'Desain aesthetic tetapi alur belanja berbelit & macet.' },
                { title: 'Target Pengguna Bias', desc: 'Dibuat hanya berdasarkan asumsi pribadi tanpa validasi pasar.' },
                { title: 'Development Tanpa Kompas', desc: 'Koding cepat tanpa tahu ukuran keberhasilan produk.' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    ...row,
                    gap: 18,
                    padding: '16px 20px',
                    borderRadius: 16,
                    background: TINT_PINK,
                    border: '1px solid rgba(255, 95, 124, 0.25)',
                  }}
                >
                  <CrossMark />
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 750, color: INK_HEX }}>{item.title}</div>
                    <div style={{ fontSize: 20, color: BODY, marginTop: 4 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { title: 'Problem-First Approach', desc: 'Mulai dari rasa sakit pengguna, baru rancang fitur pendukung.' },
                { title: 'Value Before Visual', desc: 'Fokus kejelasan fungsi dan kenyamanan transaksi belanja.' },
                { title: 'Validasi Evidence-Based', desc: 'Bicara ke user nyata & amati perilaku belanja mereka.' },
                { title: 'Goal & Metric Terukur', desc: 'Tahu persis apa yang ingin dicapai (misal: checkout sukses >65%).' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    ...row,
                    gap: 18,
                    padding: '16px 20px',
                    borderRadius: 16,
                    background: TINT_TEAL,
                    border: '1px solid rgba(60, 165, 161, 0.3)',
                  }}
                >
                  <CheckMark />
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 750, color: INK_HEX }}>{item.title}</div>
                    <div style={{ fontSize: 20, color: BODY, marginTop: 4 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ fontSize: 19, color: SOFT, textAlign: 'center' }}>
          💡 Klik tombol toggle di kanan atas untuk membandingkan pola pikir
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 04 — PRODUCT THINKING
// ============================================================================
const Slide04ProductThinking: Page = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { code: '01', title: 'PROBLEM', q: 'Masalah apa yang dialami?', ex: 'Gen Z kesulitan menemukan fashion sesuai selera & budget.', color: YELLOW, tint: TINT_YELLOW },
    { code: '02', title: 'USER', q: 'Siapa yang mengalami?', ex: 'Gen Z usia 18–30 tahun yang aktif belanja lewat HP.', color: BLUE, tint: TINT_BLUE },
    { code: '03', title: 'OPPORTUNITY', q: 'Mengapa layak diselesaikan?', ex: 'Pasar fashion online besar tapi toko lain rumit & tidak transparan.', color: PINK, tint: TINT_PINK },
    { code: '04', title: 'SOLUTION', q: 'Solusi apa yang ditawarkan?', ex: 'Online store fashion terkurasi dengan info size super jelas.', color: GREEN, tint: TINT_GREEN },
    { code: '05', title: 'PRODUCT', q: 'Produk seperti apa dibuat?', ex: 'UrbanStore Web App yang mobile-friendly, cepat, & estetik.', color: TEAL_HEX, tint: TINT_TEAL },
    { code: '06', title: 'FEATURE', q: 'Fitur apa yang diperlukan?', ex: 'Filter kategori, size chart visual, 1-click cart & checkout.', color: CORAL_HEX, tint: TINT_PINK },
  ];

  return (
    <Frame>
      <Eyebrow>Urutan Berpikir · Product Thinking</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(78), minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '1058.95px', height: '96.79px', translate: '0px 0px' }}>Mulai dari masalah, bukan fitur</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 24, lineHeight: 1.45, color: BODY, textAlign: 'right', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '573.61px', height: '69.6px', translate: '66.4px 0px' }}>
        Urutan berpikir terstruktur dari akar masalah pengguna hingga menghasilkan fitur yang relevan.
      </div>

      {/* 6 Step Cards Filling Width */}
      <div style={{ ...abs(X0, 284, W, 220), display: 'flex', gap: 18 }}>
        {steps.map((st, i) => (
          <div
            key={i}
            className="fw-interactive"
            onClick={() => setActiveStep(i)}
            style={{
              flex: 1,
              background: activeStep === i ? st.tint : '#FFFFFF',
              border: `2.5px solid ${activeStep === i ? st.color : RULE}`,
              borderRadius: 20,
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div>
              <div style={{ ...row, justifyContent: 'space-between' }}>
                <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 750, color: SOFT }}>
                  {st.code}
                </span>
                {activeStep === i && (
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: st.color }} />
                )}
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: INK_HEX, marginTop: 14 }}>
                {st.title}
              </div>
            </div>
            <div style={{ fontSize: 19, color: BODY, lineHeight: 1.35 }}>{st.q}</div>
          </div>
        ))}
      </div>

      {/* Expansive Hero Inspection Box: 528 to 868 */}
      <div
        style={{ ...abs(X0, 528, W, 340), background: steps[activeStep].tint, borderRadius: 24, border: `2px solid ${steps[activeStep].color}`, padding: '36px 44px', ...row, justifyContent: 'space-between' }}
      >
        <div style={{ maxWidth: 1100 }}>
          <div style={{ ...row, gap: 16 }}>
            <span
              style={{
                background: steps[activeStep].color,
                color: activeStep === 0 || activeStep === 2 ? INK_HEX : '#FFFFFF',
                padding: '6px 18px',
                borderRadius: 999,
                fontFamily: MONO,
                fontSize: 19,
                fontWeight: 750,
              }}
            >
              TAHAP {steps[activeStep].code} · {steps[activeStep].title}
            </span>
            <span style={{ fontSize: 25, color: BODY, fontWeight: 650 }}>
              {steps[activeStep].q}
            </span>
          </div>

          <div style={{ fontSize: 36, fontWeight: 780, color: INK_HEX, marginTop: 20, lineHeight: 1.2, minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '1031.81px', height: '86.4px', translate: '0px 0px' }}>
            Contoh UrbanStore: “{steps[activeStep].ex}”
          </div>

          <p style={{ fontSize: 23, color: BODY, marginTop: 14, lineHeight: 1.45, minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '848.79px', height: '66.7px', translate: '0px 0px' }}>
            Hindari langsung loncat ke koding fitur sebelum tahap 01 hingga 04 terjawab dengan bukti
            validasi yang jelas.
          </p>
        </div>

        <div style={{ textAlign: 'right', minWidth: 320 }}>
          <div style={{ fontSize: 19, color: SOFT, fontFamily: MONO }}>PRINSIP KUNCI</div>
          <div
            style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontSize: 32,
              color: INK_HEX,
              marginTop: 10,
              lineHeight: 1.2,
            }}
          >
            Feature is the output.
            <br />
            Problem is the origin.
          </div>
        </div>
      </div>

      <div style={{ ...abs(X0, 890, W), fontSize: 24, color: BODY }}>
        💡 Klik salah satu tahap (01–06) di atas untuk melihat penerapan pada UrbanStore
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 05 — PROBLEM DISCOVERY: URBANSTORE
// ============================================================================
const Slide05ProblemDiscovery: Page = () => {
  const problems = [
    {
      num: '01',
      title: 'Product Discovery',
      headline: 'Sulit Menemukan Outfit Pas',
      desc: 'Banyak online store memiliki ribuan produk campur aduk tanpa kurasi gaya yang jelas.',
      tag: 'Curation Gap',
      tint: TINT_YELLOW,
      accent: '#B07A12',
    },
    {
      num: '02',
      title: 'Product Information',
      headline: 'Detail Ukuran & Bahan Minim',
      desc: 'Deskripsi produk sangat minim, size chart sulit dipahami, dan foto pakaian tidak memperlihatkan tekstur kain.',
      tag: 'Information Void',
      tint: TINT_BLUE,
      accent: '#2B6CB0',
    },
    {
      num: '03',
      title: 'Shopping Experience',
      headline: 'Checkout Mobile Berbelit',
      desc: 'Harus mengisi formulir berulang-ulang, loading lambat, dan alur pembayaran tidak nyaman dilakukan di smartphone.',
      tag: 'UX Friction',
      tint: TINT_PINK,
      accent: CORAL_HEX,
    },
    {
      num: '04',
      title: 'Trust & Confidence',
      headline: 'Ragu Kualitas Sebelum Beli',
      desc: 'Tidak ada ulasan foto pemakaian real, menimbulkan keraguan produk berbeda saat barang sampai di rumah.',
      tag: 'Trust Barrier',
      tint: TINT_TEAL,
      accent: TEAL_HEX,
    },
  ];

  return (
    <Frame>
      <Eyebrow>Case Study · UrbanStore Discovery</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(78) }}>4 masalah belanja fashion</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 24, lineHeight: 1.45, color: BODY, textAlign: 'right' }}>
        Riset terhadap kebiasaan belanja online Gen Z ditemukan 4 hambatan utama yang harus diselesaikan.
      </div>

      {/* 4 Large Columns Filling 580px Height */}
      <div style={{ ...abs(X0, 284, W, 580), display: 'flex', gap: 24 }}>
        {problems.map((p, i) => (
          <div
            key={i}
            className="fw-interactive"
            style={{
              flex: 1,
              borderRadius: 24,
              background: p.tint,
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ ...row, justifyContent: 'space-between' }}>
                <span style={{ fontSize: 24, fontWeight: 780, color: p.accent }}>{p.num}</span>
                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: 99,
                    background: '#FFFFFF',
                    boxShadow: `inset 0 0 0 1.5px ${INK_HEX}`,
                    fontSize: 18,
                    fontWeight: 750,
                  }}
                >
                  {p.tag}
                </span>
              </div>
              <div style={{ ...headline(44), marginTop: 28, lineHeight: 1.15 }}>{p.headline}</div>
              <p style={{ margin: '18px 0 0', fontSize: 23, lineHeight: 1.45, color: BODY }}>
                {p.desc}
              </p>
            </div>

            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: '20px 22px',
                boxShadow: `inset 0 0 0 1.5px ${RULE}`,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 750, color: p.accent }}>FOKUS AREA</div>
              <div style={{ fontSize: 22, fontWeight: 660, color: INK_HEX, marginTop: 4 }}>
                {p.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...abs(X0, 890, W), fontSize: 24, color: BODY }}>
        {''}<strong>Catatan Kritis:</strong> Keempat masalah ini adalah <em>hipotesis awal</em> yang
        wajib divalidasi ke calon pembeli sebelum membangun solusinya.
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 06 — IDEA VALIDATION
// ============================================================================
const Slide06IdeaValidation: Page = () => {
  const [activeQ, setActiveQ] = useState(0);

  const questions = [
    { num: '01', title: 'Problem', q: 'Apakah masalah ini benar-benar ada?', sub: 'Bukan sekadar asumsi pembuat produk, tetapi fakta nyata yang dialami calon pengguna.', evidence: 'Riset ulasan toko fashion: 68% pembeli mengeluh ukuran baju tidak pas saat sampai.' },
    { num: '02', title: 'Frequency', q: 'Seberapa sering masalah terjadi?', sub: 'Apakah masalah ini terjadi berulang kali dalam satu bulan atau hanya insidentil?', evidence: 'Gen Z berbelanja fashion online rata-rata 1–3 kali dalam sebulan.' },
    { num: '03', title: 'Impact', q: 'Seberapa besar dampaknya bagi user?', sub: 'Apakah ketidaknyamanan ini membuat user membatalkan pembelian atau pindah toko?', evidence: 'Retur barang repot, uang tertahan, dan kecewa outfit tidak bisa dipakai saat acara.' },
    { num: '04', title: 'Existing Solution', q: 'Bagaimana user menyelesaikan saat ini?', sub: 'Melihat solusi alternatif yang sedang digunakan dan apa kelemahan utamanya.', evidence: 'Beli di marketplace raksasa tetapi harus scroll ribuan barang non-kurasi.' },
    { num: '05', title: 'Willingness to Pay', q: 'Apakah user mau membeli solusinya?', sub: 'Apakah produk ini memiliki alasan kuat bagi user untuk bertransaksi secara nyata?', evidence: 'User rela membeli produk jika ada garansi kurasi gaya & kemudahan retur size.' },
  ];

  return (
    <Frame>
      <Eyebrow>Evidence Before Execution</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(78) }}>Validasi sebelum eksekusi</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 24, lineHeight: 1.45, color: BODY, textAlign: 'right' }}>
        Jangan jatuh cinta pada ide sendiri. Uji dengan 5 pertanyaan validasi sebelum membuat produk.
      </div>

      {/* Left Column: 5 Big Interactive Question Rows */}
      <div
        style={{ ...abs(X0, 284, 760, 580), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        {questions.map((q, i) => {
          const active = activeQ === i;
          return (
            <div
              key={i}
              className="fw-interactive"
              onClick={() => setActiveQ(i)}
              style={{
                height: 102,
                borderRadius: 20,
                background: active ? TINT_TEAL : '#FFFFFF',
                border: `2px solid ${active ? TEAL_HEX : RULE}`,
                padding: '0 28px',
                ...row,
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <div style={{ ...row, gap: 20 }}>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 24,
                    fontWeight: 750,
                    color: active ? TEAL_HEX : SOFT,
                  }}
                >
                  {q.num}
                </span>
                <div>
                  <div style={{ fontSize: 26, fontWeight: 750, color: INK_HEX }}>{q.title}</div>
                  <div style={{ fontSize: 20, color: BODY, marginTop: 4 }}>{q.q}</div>
                </div>
              </div>
              {active && <CheckMark />}
            </div>
          );
        })}
      </div>

      {/* Right Column: Hero Audit Card */}
      <div
        style={{ ...abs(920, 284, 880, 580), borderRadius: 24, background: '#FFFFFF', border: `2px solid ${RULE}`, boxShadow: '0 12px 36px rgba(0,0,0,0.04)', padding: '40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '880px', height: '655.98px', translate: '0px 0px' }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span
              style={{
                background: TINT_YELLOW,
                color: INK_HEX,
                padding: '6px 18px',
                borderRadius: 999,
                fontFamily: MONO,
                fontSize: 19,
                fontWeight: 750,
              }}
            >
              PERTANYAAN VALIDASI #{questions[activeQ].num}
            </span>
            <span style={{ fontSize: 20, color: SOFT, fontFamily: MONO }}>URBANSTORE AUDIT</span>
          </div>

          <h3 style={{ ...headline(46), margin: '24px 0 12px', lineHeight: 1.15 }}>
            {questions[activeQ].q}
          </h3>

          <p style={{ fontSize: 25, color: BODY, lineHeight: 1.48, margin: 0 }}>
            {questions[activeQ].sub}
          </p>

          <div
            style={{
              marginTop: 28,
              background: TINT_TEAL,
              borderRadius: 20,
              border: `2px solid ${TEAL_HEX}`,
              padding: '24px 28px',
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: TEAL_HEX }}>
              BUKTI LAPANGAN (CASE EVIDENCE)
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: INK_HEX, marginTop: 8 }}>
              “{questions[activeQ].evidence}”
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 19, fontWeight: 750, color: SOFT, marginBottom: 12 }}>
            METODE VALIDASI YANG DIGUNAKAN:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {['User Interview', 'Online Survey', 'Competitor Audit', 'Marketplace Reviews'].map(
              (m, idx) => (
                <span
                  key={idx}
                  style={{
                    background: '#F4F4F2',
                    padding: '10px 20px',
                    borderRadius: 999,
                    fontSize: 19,
                    fontWeight: 650,
                    color: INK_HEX,
                  }}
                >
                  ✓ {m}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 07 — COMPETITOR & MARKET RESEARCH
// ============================================================================
const Slide07CompetitorResearch: Page = () => {
  const dimensions = [
    {
      dim: 'Katalog & Kurasi',
      bigMarketplace: 'Jutaan produk campur aduk, sulit cari yang trendy',
      localBrand: 'Katalog sangat terbatas pada 1 brand saja',
      urbanStore: 'Kurasi fashion Gen Z terarah & update tren terkini',
    },
    {
      dim: 'Informasi Produk',
      bigMarketplace: 'Format acak antar seller, size chart sering salah',
      localBrand: 'Lengkap tetapi navigasi website sering lambat',
      urbanStore: 'Standard size chart visual & panduan bahan jelas',
    },
    {
      dim: 'Mobile Checkout',
      bigMarketplace: 'Banyak pop-up promo, iklan, dan step pembayaran rumit',
      localBrand: 'Harus registrasi panjang & form checkout kaku',
      urbanStore: 'Simpel, tanpa distraksi, 3-step checkout cepat',
    },
    {
      dim: 'Value Utama',
      bigMarketplace: 'Pilihan banyak & perang harga diskon',
      localBrand: 'Brand loyalty eksklusif tapi harga premium',
      urbanStore: 'Shopping experience praktis, stylish & harga terjangkau',
    },
  ];

  return (
    <Frame>
      <Eyebrow>Market Intelligence · Benchmarking</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(78) }}>Kenali peta kompetitor</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 24, lineHeight: 1.45, color: BODY, textAlign: 'right' }}>
        Bandingkan alternatif pasar untuk mencari celah diferensiasi nyata bagi UrbanStore.
      </div>

      {/* Large Table: 284 to 864 (Height 580px, completely visible Row 4!) */}
      <div
        style={{
          ...abs(X0, 284, W, 580),
          background: '#FFFFFF',
          borderRadius: 24,
          border: `2px solid ${RULE}`,
          boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr 1fr 1.25fr',
            background: '#F9F9F7',
            borderBottom: `2px solid ${RULE}`,
            padding: '16px 28px',
            fontSize: 20,
            fontWeight: 750,
            color: INK_HEX,
            fontFamily: MONO,
          }}
        >
          <div>DIMENSI ANALISIS</div>
          <div style={{ color: BODY }}>MARKETPLACE BESAR</div>
          <div style={{ color: BODY }}>WEBSITE BRAND LOKAL</div>
          <div style={{ color: TEAL_HEX }}>PELUANG URBANSTORE ✓</div>
        </div>

        {dimensions.map((d, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '280px 1fr 1fr 1.25fr',
              borderBottom: i < dimensions.length - 1 ? `1.5px solid ${RULE}` : 'none',
              padding: '18px 28px',
              fontSize: 22,
              lineHeight: 1.4,
              background: i % 2 === 1 ? 'rgba(0,0,0,0.015)' : 'transparent',
              alignItems: 'center',
            }}
          >
            <div style={{ fontWeight: 750, color: INK_HEX }}>{d.dim}</div>
            <div style={{ color: BODY, paddingRight: 24 }}>{d.bigMarketplace}</div>
            <div style={{ color: BODY, paddingRight: 24 }}>{d.localBrand}</div>
            <div>
              <span
                style={{
                  color: INK_HEX,
                  fontWeight: 700,
                  background: TINT_TEAL,
                  padding: '8px 16px',
                  borderRadius: 10,
                  display: 'inline-block',
                }}
              >
                {d.urbanStore}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...abs(X0, 890, W), fontSize: 24, color: BODY }}>
        💡 <strong>Kesimpulan:</strong> Jangan tiru semua fitur kompetitor. Cukup ungguli di{' '}
        <strong style={{ color: TEAL_HEX }}>kejelasan produk & kemudahan mobile checkout</strong>.
      </div>
    </Frame>
  );
};

const Slide08TargetUser: Page = () => {
  return (
    <Frame>
      <Eyebrow>Target User & User Persona</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(78) }}>Fokus pada target spesifik</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 24, lineHeight: 1.45, color: BODY, textAlign: 'right' }}>
        Jika produk dibuat untuk semua orang, tidak ada yang merasa produk tersebut dibuat khusus
        untuk mereka.
      </div>

      {/* Left Card: Broad vs Specific */}
      <div
        style={{ ...abs(X0, 284, 760, 580), borderRadius: 24, background: '#FFFFFF', border: `2px solid ${RULE}`, padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '760px', height: '677.93px', translate: '0px 0px' }}
      >
        <div>
          <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 750, color: SOFT }}>
            SEGMENTASI PASAR
          </span>

          <div
            style={{
              background: TINT_PINK,
              border: '2px solid rgba(255, 95, 124, 0.4)',
              borderRadius: 20,
              padding: '24px 28px',
              marginTop: 20,
            }}
          >
            <div style={{ ...row, gap: 12 }}>
              <CrossMark />
              <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: CORAL_HEX }}>
                TERLALU LUAS (HINDARI)
              </span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 750, color: INK_HEX, marginTop: 8 }}>
              “Semua orang yang suka belanja pakaian.”
            </div>
            <p style={{ fontSize: 21, color: BODY, margin: '8px 0 0', lineHeight: 1.4 }}>
              Membuat arah desain gamang, fitur terlalu banyak, dan pesan tidak mengena.
            </p>
          </div>

          <div
            style={{
              background: TINT_TEAL,
              border: `2px solid ${TEAL_HEX}`,
              borderRadius: 20,
              padding: '24px 28px',
              marginTop: 20,
            }}
          >
            <div style={{ ...row, gap: 12 }}>
              <CheckMark />
              <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: TEAL_HEX }}>
                SPESIFIK & TAJAM (URBANSTORE)
              </span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 750, color: INK_HEX, marginTop: 8 }}>
              “Gen Z 18–30 tahun aktif belanja mobile yang mencari fashion stylish ber-budget.”
            </div>
            <p style={{ fontSize: 21, color: BODY, margin: '8px 0 0', lineHeight: 1.4 }}>
              Menentukan keputusan UX: mobile-first, visual-heavy, dan checkout tanpa friksi.
            </p>
          </div>
        </div>

        <div style={{ fontSize: 20, color: BODY, borderTop: `1px solid ${RULE}`, paddingTop: 16 }}>
          🎯 Target user yang spesifik menyederhanakan ruang lingkup pengembangan aplikasi.
        </div>
      </div>

      {/* Right Card: Persona Card */}
      <div
        style={{ ...abs(920, 284, 880, 580), borderRadius: 24, background: '#FFFFFF', border: `2px solid ${RULE}`, boxShadow: '0 12px 36px rgba(0,0,0,0.04)', padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '880px', height: '677.93px', translate: '0px 0px' }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span
              style={{
                background: TINT_YELLOW,
                color: INK_HEX,
                padding: '6px 18px',
                borderRadius: 999,
                fontFamily: MONO,
                fontSize: 18,
                fontWeight: 750,
              }}
            >
              PRIMARY USER PERSONA
            </span>
            <span style={{ fontSize: 20, color: SOFT, fontFamily: MONO }}>URBANSTORE</span>
          </div>

          <div style={{ ...row, gap: 20, marginTop: 20 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: TINT_TEAL,
                border: `2.5px solid ${TEAL_HEX}`,
                ...row,
                justifyContent: 'center',
                fontSize: 38,
              }}
            >
              🧢
            </div>
            <div>
              <div style={{ fontSize: 34, fontWeight: 800, color: INK_HEX }}>Rian & Maya</div>
              <div style={{ fontSize: 22, color: BODY }}>19–25 Tahun · Mahasiswa & First-Jobber</div>
            </div>
          </div>

          <div
            style={{
              marginTop: 20,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 20,
              borderTop: `1.5px solid ${RULE}`,
              paddingTop: 18,
            }}
          >
            <div>
              <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 750, color: SOFT }}>
                PERILAKU BELANJA
              </div>
              <p style={{ fontSize: 21, color: INK_HEX, lineHeight: 1.4, margin: '6px 0 0' }}>
                Cari inspirasi outfit di medsos, belanja lewat smartphone saat waktu luang.
              </p>
            </div>

            <div>
              <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 750, color: TEAL_HEX }}>
                GOALS & EKSPEKTASI
              </div>
              <p style={{ fontSize: 21, color: INK_HEX, lineHeight: 1.4, margin: '6px 0 0' }}>
                Tampil stylish untuk kuliah/nongkrong tanpa menguras kantong.
              </p>
            </div>

            <div>
              <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 750, color: CORAL_HEX }}>
                PAIN POINTS
              </div>
              <p style={{ fontSize: 21, color: INK_HEX, lineHeight: 1.4, margin: '6px 0 0' }}>
                Takut salah ukuran, bahan tipis, dan malas isi form checkout panjang.
              </p>
            </div>

            <div>
              <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 750, color: SOFT }}>
                DEVICE & METODE
              </div>
              <p style={{ fontSize: 21, color: INK_HEX, lineHeight: 1.4, margin: '6px 0 0' }}>
                100% Smartphone Shopper · Pembayaran via QRIS & e-Wallet.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#F9F9F7',
            padding: '16px 22px',
            borderRadius: 16,
            fontSize: 21,
            color: BODY,
          }}
        >
          🎯 <strong>Dampak ke Produk:</strong> Tampilan UrbanStore wajib mobile-first, visual lookbook
          jelas, dan checkout QRIS 3-klik.
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 09 — PROBLEM STATEMENT FORMULA
// ============================================================================
const Slide09ProblemStatement: Page = () => {
  return (
    <Frame>
      <Eyebrow>Problem Formulation · Clarity</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(78), minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '1060.25px', height: '103px', translate: '0px 0px' }}>Rumuskan problem statement</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 24, lineHeight: 1.45, color: BODY, textAlign: 'right', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '499.18px', height: '69.6px', translate: '140.82px 0px' }}>
        Rumuskan masalah berfokus pada kebutuhan manusia, bukan pada tumpukan teknologi.
      </div>

      {/* Formula Hero Banner: 284 to 414 */}
      <div
        style={{ ...abs(X0, 284, W, 130), background: TINT_YELLOW, borderRadius: 24, border: '2.5px solid rgba(248, 218, 126, 0.8)', padding: '0 44px', ...row, justifyContent: 'space-between', translate: '0px 22.71px' }}
      >
        <span style={{ fontFamily: MONO, fontSize: 22, fontWeight: 750, color: BODY }}>
          STANDARD FORMULA
        </span>
        <div style={{ fontSize: 34, fontWeight: 780, color: INK_HEX }}>
          <span style={{ color: TEAL_HEX }}>[USER]</span> mengalami{' '}
          <span style={{ color: CORAL_HEX }}>[PROBLEM]</span> ketika{' '}
          <span style={{ color: INK_HEX }}>[SITUATION]</span>, sehingga membutuhkan{' '}
          <span style={{ color: TEAL_HEX }}>[NEED]</span>.
        </div>
      </div>

      {/* 4 Large Columns Breakdown: 436 to 706 */}
      <div style={{ ...abs(X0, 436, W, 270), display: 'flex', gap: 24, translate: '0px 40px' }}>
        {[
          { num: '01. USER', title: 'Gen Z Pembeli Online', sub: 'Mahasiswa & young professional yang aktif berbelanja lewat smartphone.', color: TEAL_HEX },
          { num: '02. PROBLEM', title: 'Sulit Cari Fashion Pas', sub: 'Informasi produk tersebar, size chart rancu, dan foto tidak representatif.', color: CORAL_HEX },
          { num: '03. SITUATION', title: 'Saat Scrolling di HP', sub: 'Waktu senggang singkat dengan koneksi mobile yang menginginkan kecepatan.', color: INK_HEX },
          { num: '04. NEED', title: 'Belanja Cepat & Jelas', sub: 'Katalog terkurasi gaya terkini + panduan ukuran visual yang terpercaya.', color: TEAL_HEX },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: '#FFFFFF',
              borderRadius: 20,
              border: `2px solid ${RULE}`,
              padding: '28px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
            }}
          >
            <div>
              <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: item.color }}>
                {item.num}
              </span>
              <div style={{ fontSize: 26, fontWeight: 750, color: INK_HEX, marginTop: 8 }}>
                {item.title}
              </div>
            </div>
            <p style={{ fontSize: 21, color: BODY, margin: '10px 0 0', lineHeight: 1.45 }}>
              {item.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Do & Don't Bottom: 728 to 864 */}
      <div style={{ ...abs(X0, 728, W, 136), ...row, gap: 24, translate: '0px 40px' }}>
        <div
          style={{
            flex: 1,
            background: TINT_PINK,
            borderRadius: 20,
            padding: '22px 28px',
            ...row,
            gap: 18,
          }}
        >
          <CrossMark />
          <span style={{ fontSize: 22, color: INK_HEX, lineHeight: 1.4 }}>
            <strong>Salah:</strong> “Kami butuh website fashion menggunakan React & AI.”{' '}
            <span style={{ color: BODY }}>(Ini solusi teknis, bukan pernyataan masalah pengguna).</span>
          </span>
        </div>

        <div
          style={{
            flex: 1,
            background: TINT_TEAL,
            borderRadius: 20,
            padding: '22px 28px',
            ...row,
            gap: 18,
          }}
        >
          <CheckMark />
          <span style={{ fontSize: 22, color: INK_HEX, lineHeight: 1.4 }}>
            <strong>Benar:</strong> Fokus pada kesulitan user menemukan outfit yang sesuai selera
            dan budget mereka secara praktis.
          </span>
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 10 — SOLUTION & VALUE PROPOSITION
// ============================================================================
const Slide10SolutionValueProp: Page = () => {
  return (
    <Frame>
      <Eyebrow>Value Proposition · Differentiation</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(78) }}>Dari masalah ke nilai produk</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 24, lineHeight: 1.45, color: BODY, textAlign: 'right' }}>
        Alasan utama mengapa pelanggan harus memilih UrbanStore dibandingkan alternatif lain.
      </div>

      {/* 3 Step Bridge Flow: 284 to 454 */}
      <div style={{ ...abs(X0, 284, W, 170), display: 'flex', gap: 24 }}>
        <div
          style={{ flex: 1, background: '#FFFFFF', borderRadius: 20, border: `2px solid ${RULE}`, padding: '24px 28px', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '469.9px', height: '204.83px', translate: '0px 15px' }}
        >
          <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 750, color: CORAL_HEX }}>
            01. PROBLEM
          </div>
          <div style={{ fontSize: 26, fontWeight: 750, color: INK_HEX, marginTop: 8 }}>
            Sulit temukan fashion yang sesuai gaya & budget secara praktis di HP.
          </div>
        </div>

        <div style={{ ...row, justifyContent: 'center', fontSize: 36, color: SOFT, translate: '0px 32.41px' }}>→</div>

        <div
          style={{ flex: 1, background: '#FFFFFF', borderRadius: 20, border: `2px solid ${RULE}`, padding: '24px 28px', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '469.93px', height: '206.34px', translate: '0.01px 15px' }}
        >
          <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 750, color: BLUE }}>
            02. SOLUTION
          </div>
          <div style={{ fontSize: 26, fontWeight: 750, color: INK_HEX, marginTop: 8 }}>
            Toko online fashion terkurasi dengan info size akurat & alur belanja ringkas.
          </div>
        </div>

        <div style={{ ...row, justifyContent: 'center', fontSize: 36, color: SOFT, translate: '0px 33.17px' }}>→</div>

        <div
          style={{ flex: 1.25, background: TINT_TEAL, borderRadius: 20, border: `2.5px solid ${TEAL_HEX}`, padding: '24px 32px', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '582.2px', height: '206.34px', translate: '0px 15px' }}
        >
          <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 750, color: TEAL_HEX }}>
            03. VALUE PROPOSITION
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: INK_HEX, marginTop: 8 }}>
            “UrbanStore membantu Gen Z tampil stylish setiap hari tanpa repot & tanpa ragu ukuran.”
          </div>
        </div>
      </div>

      {/* 4 Quadrants Value Framework: 478 to 868 */}
      <div style={{ ...abs(X0, 478, W, 390), display: 'flex', gap: 24, translate: '0px 62px', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '1680px', height: '291.98px' }}>
        {[
          { tag: 'FOR (TARGET)', title: 'Gen Z & Young Pros', sub: 'Yang mengutamakan gaya modern dan efisiensi waktu belanja online lewat smartphone.', tint: TINT_YELLOW },
          { tag: 'WHO (NEED)', title: 'Butuh Outfit Kurasi', sub: 'Bosan mencari di antara jutaan item non-kurasi di marketplace raksasa.', tint: TINT_PINK },
          { tag: 'OUR PRODUCT', title: 'UrbanStore Platform', sub: 'Menyediakan pakaian trendy siap pakai dengan panduan ukuran terpercaya.', tint: TINT_TEAL },
          { tag: 'UNLIKE (DIFF)', title: 'Tanpa Ribet & Distraksi', sub: 'Bebas iklan banner, checkout 3 klik, dan foto real lookbook.', tint: '#F4F4F2' },
        ].map((q, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: '#FFFFFF',
              borderRadius: 22,
              border: `2px solid ${RULE}`,
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
            }}
          >
            <div>
              <span
                style={{
                  background: q.tint,
                  color: INK_HEX,
                  padding: '6px 16px',
                  borderRadius: 8,
                  fontFamily: MONO,
                  fontSize: 18,
                  fontWeight: 750,
                }}
              >
                {q.tag}
              </span>
              <div style={{ fontSize: 28, fontWeight: 750, color: INK_HEX, marginTop: 22 }}>
                {q.title}
              </div>
            </div>
            <p style={{ fontSize: 22, color: BODY, lineHeight: 1.48, margin: 0 }}>{q.sub}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 11 — PRODUCT GOALS & SUCCESS METRICS
// ============================================================================
const Slide11GoalsAndMetrics: Page = () => {
  const metrics = [
    { label: 'Product Click Rate (CTR)', target: '12% industri', current: '25%', unit: 'Klik detail produk', status: 'Target' as const },
    { label: 'Add to Cart Rate', target: '4.5% e-commerce', current: '8.5%', unit: 'Pengunjung tambah cart', status: 'Good' as const },
    { label: 'Checkout Completion Rate', target: '40% industri', current: '65%', unit: 'Transaksi sukses bayar', status: 'Good' as const },
    { label: 'Cart Abandonment Rate', target: 'Maksimal 60%', current: '< 35%', unit: 'Drop-off di checkout', status: 'Watch' as const },
    { label: 'Time to First Purchase', target: '8 menit rata-rata', current: '< 3 mnt', unit: 'Waktu buka s/d bayar', status: 'Target' as const },
  ];

  return (
    <Frame>
      <Eyebrow>Measurable Outcomes · Goals & KPI</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(78), minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '1026.65px', height: '87.81px', translate: '0px 0px' }}>Tentukan metrik keberhasilan</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 24, lineHeight: 1.45, color: BODY, textAlign: 'right', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '492.86px', height: '69.6px', translate: '147.15px 0px' }}>
        Tiga product goals dan lima metrik keberhasilan (KPI) terukur.
      </div>

      {/* Left Column: 3 Big Goal Cards (680 x 580) */}
      <div
        style={{
          ...abs(X0, 284, 680, 580),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{ background: TINT_YELLOW, borderRadius: 20, padding: '24px 28px', border: '2px solid rgba(248, 218, 126, 0.8)' }}
        >
          <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: BODY }}>
            01 · DISCOVERABILITY
          </div>
          <div style={{ fontSize: 25, fontWeight: 750, color: INK_HEX, marginTop: 8 }}>
            Temukan produk fashion relevan dalam ≤ 30 detik.
          </div>
          <p style={{ fontSize: 20, color: BODY, margin: '6px 0 0' }}>
            Memudahkan pengguna mencari outfit sesuai gaya tanpa tersesat di katalog.
          </p>
        </div>

        <div
          style={{ background: TINT_TEAL, borderRadius: 20, padding: '24px 28px', border: `2px solid ${TEAL_HEX}`, translate: '0px 41.02px' }}
        >
          <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: TEAL_HEX }}>
            02 · SHOPPING CONFIDENCE
          </div>
          <div style={{ fontSize: 25, fontWeight: 750, color: INK_HEX, marginTop: 8 }}>
            Mengurangi keraguan ukuran dan kualitas bahan.
          </div>
          <p style={{ fontSize: 20, color: BODY, margin: '6px 0 0' }}>
            Memberikan foto lookbook asli dan size chart visual yang mudah dicocokkan.
          </p>
        </div>

        <div
          style={{ background: TINT_PINK, borderRadius: 20, padding: '24px 28px', border: '2px solid rgba(255, 95, 124, 0.4)', translate: '0px 85.81px' }}
        >
          <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 750, color: CORAL_HEX }}>
            03 · FAST CONVERSION
          </div>
          <div style={{ fontSize: 25, fontWeight: 750, color: INK_HEX, marginTop: 8 }}>
            Alur checkout singkat tanpa pendaftaran rumit.
          </div>
          <p style={{ fontSize: 20, color: BODY, margin: '6px 0 0' }}>
            Fokus menyelesaikan pesanan dalam 3 langkah dengan QRIS dan metode transfer instan.
          </p>
        </div>
      </div>

      {/* Right Column: 5 Fieldwork Scorecard Rows (960 x 580) */}
      <div
        style={{ ...abs(840, 284, 960, 580), background: '#FFFFFF', borderRadius: 24, border: `2px solid ${RULE}`, boxShadow: '0 8px 30px rgba(0,0,0,0.03)', padding: '28px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '960px', height: '665.82px', translate: '0px 0px' }}
      >
        <div style={{ ...row, justifyContent: 'space-between', paddingBottom: 14, borderBottom: `2px solid ${RULE}` }}>
          <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 750, color: SOFT }}>
            METRIK KEBERHASILAN (KPI)
          </span>
          <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 750, color: TEAL_HEX }}>
            BASELINE → TARGET
          </span>
        </div>

        {metrics.map((m, i) => (
          <div
            key={i}
            style={{
              ...row,
              justifyContent: 'space-between',
              padding: '16px 0',
              borderBottom: i < metrics.length - 1 ? `1px solid ${RULE}` : 'none',
            }}
          >
            <div>
              <div style={{ fontSize: 24, fontWeight: 750, color: INK_HEX }}>{m.label}</div>
              <div style={{ fontSize: 19, color: BODY, marginTop: 2 }}>{m.unit}</div>
            </div>

            <div style={{ ...row, gap: 24 }}>
              <span style={{ fontSize: 22, color: SOFT }}>{m.target}</span>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: m.status === 'Good' ? '#2F6F4E' : TEAL_HEX,
                  fontFamily: MONO,
                  minWidth: 100,
                  textAlign: 'right',
                }}
              >
                {m.current}
              </span>
            </div>
          </div>
        ))}

        <div style={{ fontSize: 19, color: SOFT, paddingTop: 10, borderTop: `1px solid ${RULE}` }}>
          💡 Metrik ini dievaluasi secara berkala pasca-peluncuran versi MVP.
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 12 — MVP DEFINITION (WHAT WE BUILD VS WHAT WE HOLD)
// ============================================================================
const Slide12MVPDefinition: Page = () => {
  const coreFeatures = [
    { title: 'Katalog Kurasi Mobile', desc: 'Grid foto outfit aesthetic, filter kategori pria/wanita, dan status stok.' },
    { title: 'Halaman Detail & Size Guide', desc: 'Foto pakaian resolusi tinggi, deskripsi bahan, dan panduan ukuran visual.' },
    { title: 'Shopping Cart Ringkas', desc: 'Daftar item belanja sementara, ubah kuantitas, dan hitung subtotal otomatis.' },
    { title: '3-Step Checkout & QRIS', desc: 'Form alamat pengiriman cepat, ringkasan ongkir, dan instruksi bayar QRIS.' },
  ];

  const futureFeatures = [
    { title: 'AI Virtual Stylist & Outfit Matcher', desc: 'Membutuhkan biaya API dan komputasi model AI yang cukup tinggi.' },
    { title: 'Multi-Seller Marketplace', desc: 'Operasional kurir dan verifikasi pedagang pihak ketiga terlalu rumit.' },
    { title: 'Virtual 3D Fitting Room (AR)', desc: 'Teknologi kompleks dan rawan memperlambat akses di smartphone.' },
    { title: 'Integrasi Paylater & Cicilan', desc: 'Butuh izin finansial dan verifikasi KYC yang memakan waktu.' },
  ];

  return (
    <Frame>
      <Eyebrow>MVP Scoping · Lean Development</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(78) }}>Definisikan MVP yang tepat</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 24, lineHeight: 1.45, color: BODY, textAlign: 'right', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '607.7px', height: '69.6px', translate: '32.3px 0px' }}>
        Minimum Viable Product bukan produk murahan, melainkan versi paling ringkas yang memberi nilai nyata.
      </div>

      {/* 2 Big Columns: 816 x 580 (Ending cleanly at top: 864px!) */}
      <div style={{ ...abs(X0, 284, W, 580), display: 'flex', gap: 48 }}>
        {/* Core MVP Card */}
        <div
          style={{
            flex: 1,
            borderRadius: 24,
            background: TINT_TEAL,
            border: `2.5px solid ${TEAL_HEX}`,
            padding: '28px 34px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ ...row, justifyContent: 'space-between' }}>
              <span
                style={{
                  background: TEAL_HEX,
                  color: '#FFFFFF',
                  padding: '5px 16px',
                  borderRadius: 999,
                  fontFamily: MONO,
                  fontSize: 17,
                  fontWeight: 750,
                }}
              >
                CORE MVP · WHAT WE BUILD (V1)
              </span>
              <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 750, color: TEAL_HEX }}>
                4 FITUR MUTLAK
              </span>
            </div>

            <div style={{ ...headline(34), margin: '14px 0 16px', color: INK_HEX }}>
              Fitur Esensial Siap Rilis
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {coreFeatures.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    ...row,
                    gap: 14,
                    background: '#FFFFFF',
                    padding: '11px 16px',
                    borderRadius: 14,
                    boxShadow: `inset 0 0 0 1.5px ${RULE}`,
                  }}
                >
                  <CheckMark />
                  <div>
                    <div style={{ fontSize: 21, fontWeight: 750, color: INK_HEX }}>{m.title}</div>
                    <div style={{ fontSize: 17, color: BODY, marginTop: 2 }}>{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.75)',
              borderRadius: 14,
              padding: '12px 18px',
              fontSize: 19,
              color: INK_HEX,
              border: '1.5px solid rgba(60, 165, 161, 0.3)',
            }}
          >
            🎯 <strong>Tujuan MVP:</strong>{' Membuktikan apakah Gen Z tertarik membeli pakaian disini.'}
          </div>
        </div>

        {/* Future Scope Card */}
        <div
          style={{
            flex: 1,
            borderRadius: 24,
            background: '#F7F6F3',
            border: `2px solid ${RULE}`,
            padding: '28px 34px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ ...row, justifyContent: 'space-between' }}>
              <span
                style={{
                  background: '#E2E1DE',
                  color: BODY,
                  padding: '5px 16px',
                  borderRadius: 999,
                  fontFamily: MONO,
                  fontSize: 17,
                  fontWeight: 750,
                }}
              >
                FUTURE SCOPE · WHAT WE HOLD (V2+)
              </span>
              <span style={{ fontSize: 17, color: SOFT, fontFamily: MONO, fontWeight: 750 }}>
                BACKLOG
              </span>
            </div>

            <div style={{ ...headline(34), margin: '14px 0 16px', color: BODY }}>
              Fitur Lanjutan Ditunda
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {futureFeatures.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    ...row,
                    gap: 14,
                    background: '#FFFFFF',
                    padding: '11px 16px',
                    borderRadius: 14,
                    boxShadow: `inset 0 0 0 1.5px ${RULE}`,
                    opacity: 0.85,
                  }}
                >
                  <span style={{ fontSize: 20, color: SOFT, fontWeight: 800 }}>⏸</span>
                  <div>
                    <div style={{ fontSize: 21, fontWeight: 750, color: BODY }}>{m.title}</div>
                    <div style={{ fontSize: 17, color: SOFT, marginTop: 2 }}>{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.75)',
              borderRadius: 14,
              padding: '12px 18px',
              fontSize: 19,
              color: BODY,
              border: `1.5px solid ${RULE}`,
            }}
          >
            💡 <strong>Prinsip:</strong> Tunda fitur kompleks sampai traksi awal terbukti nyata di pasar.
          </div>
        </div>
      </div>

      {/* Slide-level Takeaway (Ends at 920px with 26px clean gap from card bottom!) */}
      <div style={{ ...abs(X0, 890, W), fontSize: 24, color: BODY }}>{''}<strong>Kaidah Emas MVP:</strong> Bukan membangun semua yang kita bisa buat, tapi membangun apa yang paling dibutuhkan.
      </div>
    </Frame>
  );
};

const Slide13FeaturePrioritization: Page = () => {
  const moscowCols = [
    {
      tier: 'MUST HAVE',
      tag: 'WAJIB (MVP)',
      desc: 'Fitur mutlak agar toko berfungsi.',
      tint: TINT_PINK,
      color: CORAL_HEX,
      items: ['Product Catalog', 'Product Detail & Sizing', 'Shopping Cart', 'Checkout & QRIS Pay'],
      why: 'Tanpa 4 fitur ini, toko online tidak bisa bertransaksi sama sekali.',
    },
    {
      tier: 'SHOULD HAVE',
      tag: 'PENTING',
      desc: 'Sangat meningkatkan kenyamanan.',
      tint: TINT_TEAL,
      color: TEAL_HEX,
      items: ['Search Bar Cepat', 'Filter Kategori', 'Product Sorting (Harga)', 'Pilihan Varian Warna'],
      why: 'Mempercepat pencarian bagi pembeli yang sudah tahu barang incaran.',
    },
    {
      tier: 'COULD HAVE',
      tag: 'TAMBAHAN',
      desc: 'Nilai tambah bila waktu ada.',
      tint: TINT_YELLOW,
      color: '#B07A12',
      items: ['Wishlist / Favorit', 'Ulasan & Rating Bintang', 'Recently Viewed Items', 'Share Outfit ke Medsos'],
      why: 'Meningkatkan retensi dan keterlibatan pengguna setelah fitur inti stabil.',
    },
    {
      tier: "WON'T HAVE",
      tag: 'TUNDA DULU',
      desc: 'Sengaja tidak dibuat sekarang.',
      tint: '#F4F4F2',
      color: SOFT,
      items: ['AI Personal Stylist Bot', 'Multi-seller Marketplace', 'Loyalty Tier Gamifikasi', 'Live Streaming Shopping'],
      why: 'Membutuhkan waktu berbulan-bulan dan berisiko menunda rilis MVP.',
    },
  ];

  return (
    <Frame>
      <Eyebrow>Feature Prioritization · MoSCoW Framework</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(78) }}>Prioritas fitur MoSCoW</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 24, lineHeight: 1.45, color: BODY, textAlign: 'right' }}>
        Prioritaskan nilai (value), bukan kuantitas fitur! Jaga agar fokus rilis MVP tidak terpecah.
      </div>

      {/* 4 Expansive Columns (Filling 580px Height!) */}
      <div style={{ ...abs(X0, 284, W, 580), display: 'flex', gap: 24 }}>
        {moscowCols.map((c, i) => (
          <div
            key={i}
            className="fw-interactive"
            style={{
              flex: 1,
              borderRadius: 24,
              background: c.tint,
              padding: '36px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
            }}
          >
            <div>
              <div style={{ ...row, justifyContent: 'space-between' }}>
                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: 99,
                    background: '#FFFFFF',
                    boxShadow: `inset 0 0 0 1.5px ${c.color}`,
                    fontSize: 17,
                    fontWeight: 750,
                    color: c.color,
                  }}
                >
                  {c.tag}
                </span>
                <span style={{ fontFamily: MONO, fontSize: 18, color: SOFT }}>TIER 0{i + 1}</span>
              </div>

              <div style={{ ...headline(38), marginTop: 24, color: INK_HEX }}>{c.tier}</div>
              <div style={{ fontSize: 19, color: BODY, marginTop: 6 }}>{c.desc}</div>

              <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.items.map((it, idx) => (
                  <div key={idx} style={{ ...row, gap: 10 }}>
                    <span style={{ color: c.color, fontWeight: 800, fontSize: 18 }}>➔</span>
                    <span style={{ fontSize: 22, fontWeight: 700, color: INK_HEX }}>{it}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: '18px 20px',
                boxShadow: `inset 0 0 0 1.5px ${RULE}`,
              }}
            >
              <div style={{ fontSize: 17, fontWeight: 750, color: SOFT, fontFamily: MONO }}>
                ALASAN PENENTUAN
              </div>
              <div style={{ fontSize: 20, color: INK_HEX, marginTop: 4, lineHeight: 1.35 }}>
                {c.why}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...abs(X0, 890, W), fontSize: 24, color: BODY }}>{''}<strong>Kaidah Emas:</strong> Prioritaskan Nilai (Value), bukan kuantitas fitur! MVP yang
        sukses adalah yang paling cepat tervalidasi.
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 14 — USER JOURNEY & CANVAS
// ============================================================================
const Slide14UserJourneyAndCanvas: Page = () => {
  const journeySteps = [
    { num: '01', stage: 'DISCOVER', desc: 'Menemukan toko dari medsos & melihat kurasi tren' },
    { num: '02', stage: 'EXPLORE', desc: 'Jelajahi katalog, filter kategori, & pilih outfit' },
    { num: '03', stage: 'EVALUATE', desc: 'Cek foto detail bahan, size chart, & transparansi harga' },
    { num: '04', stage: 'PURCHASE', desc: 'Masukkan keranjang & selesaikan checkout QRIS' },
    { num: '05', stage: 'COMPLETE', desc: 'Menerima konfirmasi invoice pesanan sukses' },
  ];

  const canvasItems = [
    { title: 'Target User', val: 'Gen Z 18-30 thn mobile fashion shopper' },
    { title: 'Problem', val: 'Kurasi minim & info ukuran membingungkan' },
    { title: 'Solution', val: 'Toko kurasi stylish + size chart transparan' },
    { title: 'Value Prop', val: 'Belanja fashion trendy tanpa ragu & praktis' },
    { title: 'Goals & Metric', val: 'CTR detail >25%, checkout selesai >65%' },
    { title: 'MVP Scope', val: 'Katalog, Detail, Cart, 3-step Checkout' },
    { title: 'MoSCoW Core', val: 'Fokus 4 fitur Must Have, tunda AI Stylist' },
    { title: 'User Journey', val: 'Alur 5 langkah dari Discover s/d Complete' },
  ];

  return (
    <Frame>
      <Eyebrow>Experience Mapping · Product Canvas</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(78), minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '1028.45px', height: '86.02px', translate: '0px 0px' }}>Petakan alur & canvas produk</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 24, lineHeight: 1.45, color: BODY, textAlign: 'right', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '503.63px', height: '69.6px', translate: '136.37px 0px' }}>
        Petakan 5 tahapan perjalanan pengguna untuk melengkapi 8 pilar Product Canvas.
      </div>

      {/* 5-Step Horizontal User Journey: 284 to 454 */}
      <div style={{ ...abs(X0, 284, W, 170), display: 'flex', gap: 20 }}>
        {journeySteps.map((j, i) => (
          <div
            key={i}
            className="fw-interactive"
            style={{
              flex: 1,
              background: i === 3 ? TINT_TEAL : '#FFFFFF',
              border: `2px solid ${i === 3 ? TEAL_HEX : RULE}`,
              borderRadius: 20,
              padding: '24px 22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ ...row, justifyContent: 'space-between' }}>
              <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 750, color: SOFT }}>
                STEP {j.num}
              </span>
              <span style={{ fontSize: 22, fontWeight: 800, color: i === 3 ? TEAL_HEX : INK_HEX }}>
                {j.stage}
              </span>
            </div>
            <div style={{ fontSize: 21, color: BODY, lineHeight: 1.35, marginTop: 10 }}>
              {j.desc}
            </div>
          </div>
        ))}
      </div>

      {/* 8-Item Product Planning Canvas: 474 to 854 */}
      <div
        style={{
          ...abs(X0, 474, W, 380),
          background: '#FFFFFF',
          borderRadius: 24,
          border: `2px solid ${RULE}`,
          boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
          padding: '32px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 20,
              fontWeight: 750,
              color: INK_HEX,
              background: TINT_YELLOW,
              padding: '6px 18px',
              borderRadius: 8,
            }}
          >
            PRODUCT PLANNING CANVAS URBANSTORE · 8 FONDASI SELESAI
          </span>
          <span style={{ fontSize: 20, color: SOFT, fontFamily: MONO }}>READY FOR PRD</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {canvasItems.map((c, idx) => (
            <div
              key={idx}
              style={{
                background: '#F9F9F7',
                borderRadius: 16,
                padding: '18px 20px',
                border: '1.5px solid rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 750, color: TEAL_HEX }}>
                ✓ {c.title}
              </div>
              <div style={{ fontSize: 21, fontWeight: 700, color: INK_HEX, marginTop: 6, lineHeight: 1.35 }}>
                {c.val}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...abs(X0, 890, W), fontSize: 24, color: BODY }}>
        {''}<strong>Catatan Penting:</strong> Ini adalah <em>Product Decisions</em>. Seluruh keputusan
        ini akan didokumentasikan menjadi PRD teknis di Part 2!
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 15 — RECAP & PREVIEW PART 2
// ============================================================================
const Slide15RecapAndPreview: Page = () => {
  const live = useIsActivePage();
  const [doneList, setDoneList] = useState<boolean[]>([true, true, true, true, true, true]);

  const toggle = (idx: number) =>
    setDoneList((prev) => prev.map((v, i) => (i === idx ? !v : v)));

  return (
    <Frame>
      <Eyebrow>Wrap-up & Next Roadmap</Eyebrow>
      <h2 style={{ ...abs(X0, 168, 980), ...headline(78), minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '1071.51px', height: '156px', translate: '0px 0px' }}>Fondasi kokoh sebelum coding</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 24, lineHeight: 1.45, color: BODY, textAlign: 'right', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '460.81px', height: '69.6px', translate: '179.2px 0px' }}>Seluruh keputusan produk hari ini akan kita tuangkan ke dalam PRD.</div>

      {/* Left Column: 6 Recap Items Checklist (816 x 580) */}
      <div
        style={{ ...abs(X0, 284, 816, 580), borderRadius: 24, background: '#F6F5F2', padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '816px', height: '625.99px', translate: '0px 0px' }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 18 }}>
            <span style={{ ...headline(38) }}>Recap Sesi 2 Part 1</span>
            <span style={{ fontSize: 20, fontWeight: 750, color: TEAL_HEX }}>
              6 Fondasi Utama
            </span>
          </div>

          {[
            { tag: 'Mindset', text: 'Fast Development ≠ Successful Product' },
            { tag: 'Discovery', text: '4 Masalah Fashion Online & Hipotesis Awal' },
            { tag: 'Validation', text: '5 Pertanyaan Validasi Evidence-Based' },
            { tag: 'Persona', text: 'Target User Gen Z & Persona Rian/Maya' },
            { tag: 'Formula', text: 'Problem & Solution Statement + Value Prop' },
            { tag: 'Roadmap', text: 'MVP Scoping, MoSCoW & User Journey' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="fw-interactive"
              onClick={() => toggle(idx)}
              style={{
                ...row,
                gap: 18,
                height: 54,
                fontSize: 22,
                fontWeight: 650,
                color: doneList[idx] ? INK_HEX : SOFT,
                cursor: 'pointer',
              }}
            >
              <Ink width={32} height={32} wobble={1.4}>
                <rect x="3" y="3" width="26" height="26" rx="6" fill="#FFFFFF" strokeWidth={2.8} />
                {doneList[idx] && <path d="M7 16L12 21L21 8" stroke={TEAL_HEX} strokeWidth={3.4} />}
              </Ink>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 16,
                  fontWeight: 700,
                  color: SOFT,
                  width: 90,
                }}
              >
                {item.tag}
              </span>
              <span style={{ textDecoration: doneList[idx] ? 'none' : 'line-through' }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 20, fontWeight: 700, color: BODY }}>
          ✓ Klik kotak checklist di atas untuk mereview pencapaian sesi ini
        </div>
      </div>

      {/* Right Column: Preview Part 2 Card (816 x 580) */}
      <div
        style={{ ...abs(984, 284, 816, 580), borderRadius: 24, background: TINT_YELLOW, padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '0px', minHeight: '0px', maxWidth: 'none', maxHeight: 'none', flexShrink: '0', flexGrow: '0', flexBasis: 'auto', width: '816px', height: '626px', translate: '0px 0px' }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span
              style={{
                background: CORAL_HEX,
                color: '#FFFFFF',
                padding: '6px 18px',
                borderRadius: 999,
                fontFamily: MONO,
                fontSize: 18,
                fontWeight: 750,
              }}
            >
              NEXT SESSION · PART 2
            </span>
            <Sparkle x={0} y={0} s={0.9} fill={TEAL_HEX} />
          </div>

          <h3
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: INK_HEX,
              margin: '20px 0 6px',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            Product Requirement Document (PRD)
          </h3>

          <div
            style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 26, color: '#B07A12', marginBottom: 16 }}
          >
            From Product Strategy to AI-Ready Specification
          </div>

          <p style={{ fontSize: 22, color: BODY, lineHeight: 1.45, margin: '0 0 18px' }}>
            Seluruh hasil Product Planning UrbanStore akan diubah menjadi spesifikasi teknis lengkap:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              'Product Overview & Goals',
              'User Stories & Scenarios',
              'Acceptance Criteria (Gherkin)',
              'Functional Scope (Feature Matrix)',
              'User Flow & Navigation Map',
              'Technical Stack & Architecture',
            ].map((p2, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 12,
                  padding: '12px 16px',
                  fontSize: 19,
                  fontWeight: 650,
                  color: INK_HEX,
                  boxShadow: `inset 0 0 0 1.5px ${RULE}`,
                }}
              >
                ➔ {p2}
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...row, justifyContent: 'space-between', paddingTop: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 750 }}>UrbanStore</span>
          <span style={{ fontSize: 24, fontWeight: 800, color: TEAL_HEX }}>
            Let’s Build with AI! →
          </span>
        </div>
      </div>
    </Frame>
  );
};

// Morph transitions across paired slides
Slide04ProductThinking.transition = morphTransition;
Slide05ProblemDiscovery.transition = morphTransition;
Slide09ProblemStatement.transition = morphTransition;
Slide10SolutionValueProp.transition = morphTransition;
Slide12MVPDefinition.transition = morphTransition;
Slide13FeaturePrioritization.transition = morphTransition;

// ============================================================================
// METADATA & SPEAKER NOTES EXPORT
// ============================================================================
export const meta: SlideMeta = {
  title: '[VCB Batch 4] Sesi 2 - Part 1',
  createdAt: '2026-11-05T06:56:04.842Z',
  theme: 'swiss-japanese',
};

export const notes: (string | undefined)[] = [
  `Selamat datang di Vibe Coding Bootcamp Batch 4 - Sesi 2 Part 1!
Hari ini kita melangkah ke tahap fundamental sebelum coding: Mindset, AI Coding Fundamentals & Product Planning: From Idea to Product Strategy.
Sampaikan ke peserta: sebelum kita menulis prompt atau menghasilkan kode, kita harus tahu produk apa yang ingin dibangun dan mengapa produk tersebut layak dibuat. Studi kasus kita hari ini adalah UrbanStore.`,

  `Enam objektif pembelajaran utama sesi ini (Fieldwork scorecard format).
Ajak audiens melihat bahwa hari ini bukan tentang tool AI semata, melainkan cara berpikir seperti Product Manager & Developer. Klik baris di kanan untuk menyorot tiap area pembelajaran: dari Product Thinking, Problem Discovery, Validasi, Persona, Value Prop, hingga MVP & User Journey.`,

  `Reality Check: AI membuat development jauh lebih mudah dan kilat. Tapi fast development ≠ successful product.
Bisa membuat aplikasi bukan berarti bisa membuat produk yang baik. Jika arahnya salah, AI hanya mempercepat kita membuat hal yang tidak diinginkan siapa pun.
Gunakan tombol toggle di kanan untuk membandingkan Jebakan Umum vs Product Mindset.`,

  `Product Thinking: Urutan berpikir yang benar.
Jangan mulai dari fitur: "Ayo kita bikin website dengan fitur shopping cart AI!". Mulailah dari Problem → User → Opportunity → Solution → Product → Feature.
Klik tiap tahapan (01 s/d 06) untuk melihat contoh penerapannya pada studi kasus UrbanStore.`,

  `Problem Discovery: Tidak semua masalah layak dijadikan produk.
Tunjukkan 4 hipotesis masalah belanja fashion online yang dialami Gen Z:
01. Discovery (katalog jutaan item acak tanpa kurasi gaya),
02. Information (detail ukuran & bahan minim sehingga sering salah beli),
03. Experience (checkout berbelit di HP),
04. Trust (ragu kualitas sebelum barang sampai).
Tekankan: ini masih hipotesis, butuh validasi!`,

  `Idea Validation: Jangan jatuh cinta pada ide sendiri.
Validasi ide dengan 5 pertanyaan kunci: Problem (apakah nyata?), Frequency (seberapa sering dialami?), Impact (seberapa menyakitkan?), Existing Solution (bagaimana cara mereka atasi saat ini?), dan Willingness to Pay (apakah ada kemauan transaksi?).
Klik pertanyaan 01–05 di kiri untuk memperlihatkan data bukti lapangan UrbanStore di kanan.`,

  `Market & Competitor Research: Kenali pasar sebelum membangun.
Bandingkan UrbanStore dengan Marketplace Raksasa dan Website Brand Lokal.
Tunjukkan bahwa kita tidak perlu meniru semua fitur kompetitor. UrbanStore menang di kejelasan kurasi fashion Gen Z dan kemudahan mobile checkout tanpa distraksi iklan.`,

  `Menentukan Target User & Persona: Produk tidak harus dibuat untuk semua orang.
Hindari target terlalu luas ("semua orang suka baju"). Buat target tajam: "Gen Z usia 18–30 tahun, mobile-first shopper, stylish on budget".
Perkenalkan persona Rian & Maya, kebiasaan belanja lewat HP, ekspektasi outfit, dan pain point ketakutan salah ukuran.`,

  `Problem Statement Formula: Ubah masalah menjadi pernyataan yang presisi.
Gunakan formula: [USER] mengalami [PROBLEM] ketika [SITUATION], sehingga membutuhkan [NEED].
Bandingkan dengan anti-pattern "Kami butuh website React". React adalah tool teknis, bukan kebutuhan pengguna.`,

  `Solution & Value Proposition: Setelah masalah jelas, tentukan nilai yang ditawarkan.
Tunjukkan jembatan Problem → Solution → Value Proposition.
Bedah 4 kuadran: FOR (Target), WHO (Need), OUR PRODUCT (UrbanStore), dan UNLIKE (Diferensiasi tanpa ribet).
Value prop adalah janji utama kenapa pelanggan harus memilih UrbanStore.`,

  `Product Goals & Success Metrics: Produk yang baik memiliki tujuan terukur, bukan sekadar tebakan.
Jelaskan 3 goals utama UrbanStore (Discoverability, Shopping Experience, Conversion).
Di scorecard kanan, jelaskan metrik terukur seperti Click Rate, Add to Cart Rate, Checkout Completion Rate, dan batas toleransi Cart Abandonment.`,

  `MVP (Minimum Viable Product): Don't build everything. Build what matters first.
Jelaskan perbedaan tegas antara Inti MVP (Fase 1: Katalog, Detail, Cart, Checkout, Order Confirmation) vs Pengembangan Lanjutan (Fase 2: AI Stylist, Wishlist, Loyalty Points, Reviews).
MVP menguji asumsi dasar dengan usaha terukur.`,

  `Feature Prioritization dengan MoSCoW:
4 pilar MoSCoW: Must Have, Should Have, Could Have, dan Won't Have.
Jelaskan kepada peserta mengapa fitur seperti AI Stylist Chatbot sengaja dimasukkan ke Won't Have untuk versi MVP agar rilis tidak tertunda berbulan-bulan. Prioritize Value, Not Feature Quantity!`,

  `User Journey & Product Planning Canvas:
Petakan alur 5 langkah pengguna: 01. Discover → 02. Explore → 03. Evaluate → 04. Purchase → 05. Complete.
Tunjukkan 8 checklist Product Planning Canvas yang telah kita lengkapi. Ini adalah fondasi keputusan produk yang tervalidasi.`,

  `Recap & Preview Part 2:
Rekap perjalanan hari ini dari Idea → Validation → Product Strategy.
Berikan jembatan menarik ke Part 2: Product Requirement Document (PRD). Di Part 2 nanti, kita akan mengubah keputusan ini menjadi spesifikasi AI-ready (User Stories, Acceptance Criteria, User Flow) yang siap dieksekusi dengan Vibe Coding. Let's Build with AI!`,
];

export default [
  Slide01Cover,
  Slide02Objectives,
  Slide03AICodingParadox,
  Slide04ProductThinking,
  Slide05ProblemDiscovery,
  Slide06IdeaValidation,
  Slide07CompetitorResearch,
  Slide08TargetUser,
  Slide09ProblemStatement,
  Slide10SolutionValueProp,
  Slide11GoalsAndMetrics,
  Slide12MVPDefinition,
  Slide13FeaturePrioritization,
  Slide14UserJourneyAndCanvas,
  Slide15RecapAndPreview,
] satisfies Page[];
