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

const SLIDE_ID = 'vibe-coding-sesi-6';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..800&family=Newsreader:ital,opsz,wght@1,6..72,400&family=JetBrains+Mono:wght@500;700&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;
const KEYFRAMES = `
@keyframes s6-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes s6-fade { from { opacity: 0 } to { opacity: 1 } }
.s6-interactive { transition: transform 0.18s cubic-bezier(0, 0, 0.2, 1), box-shadow 0.18s cubic-bezier(0, 0, 0.2, 1), background-color 0.18s ease; cursor: pointer; user-select: none; }
.s6-interactive:hover { transform: translateY(-2px); }
.s6-interactive:active { transform: translateY(0); }
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
  const id = `s6${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
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
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={6} />
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
    style={{ animation: live ? `s6-draw ${dur}s ${EASE_OUT} ${delay}s both` : undefined }}
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
        <span>Vibe Coding Bootcamp · Batch 4 · Sesi 6</span>
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
/* SLIDE 01 — COVER (Sesi 5 Centered Hero Layout + Sesi 2 Hand-Drawn Ink Art)   */
/* ============================================================================ */

const CoverSesi6ProductionArt = ({ live }: { live: boolean }) => (
  <Ink width={1600} height={428} wobble={2.0} style={abs(160, 524)}>
    {/* Soft Pastel Backdrop Blobs (Sesi 2 Reference Style) */}
    <circle cx="800" cy="212" r="196" fill={TINT_TEAL} stroke="none" />
    <circle cx="545" cy="148" r="106" fill={TINT_YELLOW} stroke="none" />
    <circle cx="1055" cy="236" r="98" fill={TINT_PINK} stroke="none" />
    <circle cx="330" cy="222" r="82" fill={TINT_BLUE} stroke="none" />

    {/* Continuous Hand-Drawn Ground Baseline */}
    <path
      d="M140 398 Q620 392 1040 396 T1460 395"
      stroke={INK_HEX}
      strokeWidth={3}
      strokeLinecap="round"
    />

    {/* Center Hero Device: UrbanStore Checkout & Mayar.id Gateway */}
    <g transform="translate(610, 32)">
      <rect
        x="0"
        y="0"
        width="380"
        height="350"
        rx="28"
        fill="#FFFFFF"
        stroke={INK_HEX}
        strokeWidth={3.4}
      />
      {/* Top Speaker / Window Dots + Bag Icon */}
      <circle cx="30" cy="28" r="6" fill={CORAL_HEX} stroke="none" />
      <circle cx="50" cy="28" r="6" fill={YELLOW} stroke="none" />
      <circle cx="70" cy="28" r="6" fill={TEAL_HEX} stroke="none" />
      <rect x="98" y="16" width="150" height="24" rx="8" fill={TINT_TEAL} stroke="none" />
      <path d="M114 28h118" stroke={TEAL_HEX} strokeWidth={3} strokeLinecap="round" />
      <path
        d="M326 20l4 14h22l4-14zM334 20v-5a5 5 0 0 1 10 0v5"
        fill="none"
        stroke={INK_HEX}
        strokeWidth={2.4}
      />
      <path d="M0 54h380" stroke={RULE} strokeWidth={2} />

      {/* Left Column inside Device: UrbanStore Product Item (Sesi 2 Hoodie Motif) */}
      <rect
        x="24"
        y="74"
        width="148"
        height="182"
        rx="16"
        fill="#F8F8F6"
        stroke={RULE}
        strokeWidth={2}
      />
      <path
        d="M66 102 C82 114 114 114 130 102 L152 122 L138 140 L126 134 L126 200 L70 200 L70 134 L58 140 L44 122 Z"
        fill={TEAL_HEX}
        stroke={INK_HEX}
        strokeWidth={2.8}
        strokeLinejoin="round"
      />
      <path d="M48 220h88" stroke={INK_HEX} strokeWidth={3.2} strokeLinecap="round" />
      <path d="M48 236h58" stroke={SOFT} strokeWidth={2.4} strokeLinecap="round" />

      {/* Right Column inside Device: Mayar.id QRIS & Verified Status */}
      <rect
        x="190"
        y="74"
        width="166"
        height="182"
        rx="16"
        fill={TINT_YELLOW}
        stroke={INK_HEX}
        strokeWidth={2.4}
      />
      {/* Stylized QRIS Matrix */}
      <rect x="224" y="92" width="98" height="98" rx="12" fill="#FFFFFF" stroke={INK_HEX} strokeWidth={2.2} />
      <rect x="238" y="106" width="22" height="22" rx="4" fill={INK_HEX} stroke="none" />
      <rect x="286" y="106" width="22" height="22" rx="4" fill={INK_HEX} stroke="none" />
      <rect x="238" y="154" width="22" height="22" rx="4" fill={INK_HEX} stroke="none" />
      <rect x="266" y="134" width="16" height="16" rx="3" fill={TEAL_HEX} stroke="none" />
      <rect x="288" y="156" width="18" height="18" rx="3" fill={CORAL_HEX} stroke="none" />
      {/* Pay Method Chips */}
      <rect x="210" y="206" width="126" height="32" rx="9" fill={INK_HEX} stroke="none" />
      <path d="M234 222h78" stroke={YELLOW} strokeWidth={3} strokeLinecap="round" />

      {/* Bottom Device Action CTA */}
      <rect x="24" y="274" width="332" height="46" rx="14" fill={CORAL_HEX} stroke="none" />
      <path d="M110 297h160" stroke="#FFFFFF" strokeWidth={3.4} strokeLinecap="round" />

      {/* Floating Lunas Check Circle on Top Right Corner */}
      <circle cx="372" cy="48" r="32" fill={TEAL_HEX} stroke={INK_HEX} strokeWidth={3.2} />
      <path d="M358 48l10 10 20-20" stroke="#FFFFFF" strokeWidth={3.8} strokeLinecap="round" />
    </g>

    {/* Left Tilted Floating Card: Google Authentication */}
    <g transform="translate(228, 126) rotate(-5)">
      <rect width="232" height="134" rx="18" fill="#FFFFFF" stroke={INK_HEX} strokeWidth={3} />
      <rect x="20" y="20" width="110" height="26" rx="8" fill={TINT_BLUE} stroke="none" />
      <path d="M32 33h86" stroke="#2B6CB0" strokeWidth={2.8} strokeLinecap="round" />
      {/* Lock / Shield Icon */}
      <rect x="20" y="64" width="44" height="44" rx="12" fill={TINT_TEAL} stroke={TEAL_HEX} strokeWidth={2.4} />
      <path d="M34 84v-6a8 8 0 0 1 16 0v6" fill="none" stroke={INK_HEX} strokeWidth={2.6} />
      <rect x="31" y="84" width="22" height="16" rx="4" fill={TEAL_HEX} stroke={INK_HEX} strokeWidth={2.2} />
      {/* Lines */}
      <path d="M80 76h126M80 96h94" stroke={INK_HEX} strokeWidth={3.2} strokeLinecap="round" />
    </g>

    {/* Right Tilted Floating Card: E2E & AI Skill Quality Audit */}
    <g transform="translate(1136, 140) rotate(4)">
      <rect width="242" height="142" rx="18" fill="#FFFFFF" stroke={INK_HEX} strokeWidth={3} />
      <rect x="20" y="20" width="118" height="26" rx="8" fill={TINT_PINK} stroke="none" />
      <path d="M32 33h94" stroke={CORAL_HEX} strokeWidth={2.8} strokeLinecap="round" />
      {/* 3 Audit Check Rows */}
      <path d="M24 72l6 6 12-12" stroke={TEAL_HEX} strokeWidth={3} strokeLinecap="round" />
      <path d="M54 72h156" stroke={INK_HEX} strokeWidth={3} strokeLinecap="round" />
      <path d="M24 96l6 6 12-12" stroke={TEAL_HEX} strokeWidth={3} strokeLinecap="round" />
      <path d="M54 96h132" stroke={INK_HEX} strokeWidth={3} strokeLinecap="round" />
      <path d="M24 120l6 6 12-12" stroke={CORAL_HEX} strokeWidth={3} strokeLinecap="round" />
      <path d="M54 120h144" stroke={INK_HEX} strokeWidth={3} strokeLinecap="round" />
    </g>

    {/* Dashed Curved Strategy Flow Connectors (Sesi 2 Style) */}
    <Stroke
      d="M466 196 C524 206 558 186 604 156"
      color={CORAL_HEX}
      width={3}
      live={live}
      delay={0.45}
      dur={0.65}
    />
    <Stroke
      d="M998 242 C1048 246 1082 230 1130 206"
      color={TEAL_HEX}
      width={3}
      live={live}
      delay={0.55}
      dur={0.65}
    />

    {/* Hand-Drawn Sparkles */}
    <Sparkle x={306} y={76} s={0.95} fill={YELLOW} />
    <Sparkle x={538} y={72} s={1.1} fill={TEAL_HEX} />
    <Sparkle x={1074} y={88} s={1.05} fill={YELLOW} />
    <Sparkle x={1402} y={240} s={0.88} fill={PINK} />
    <Sparkle x={472} y={326} s={0.82} fill={CORAL_HEX} />
  </Ink>
);

const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <Frame hideFooter>
      {/* Top Meta Bar (Exact Sesi 5 Rhythm) */}
      <div
        style={{
          ...abs(X0, 74, W, 44),
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <CodepolitanLogo height={36} />
        <span
          style={{
            padding: '7px 22px',
            borderRadius: 99,
            background: TINT_TEAL,
            color: TEAL_HEX,
            fontFamily: MONO,
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          VIBE CODING BOOTCAMP · BATCH 4 · SESI 6
        </span>
        <span style={{ fontSize: 20, fontWeight: 700, color: BODY }}>
          UrbanStore · Production Launch
        </span>
      </div>

      {/* Centered Hero Title */}
      <h1
        style={{
          ...abs(160, 148, 1600),
          ...headline(92),
          textAlign: 'center',
          lineHeight: 1.04,
        }}
      >
        Payment Gateway
        <br />
        &amp; Code Quality.
      </h1>

      {/* Flank Sparkles + Hand-Drawn Underline */}
      <Ink width={44} height={44} style={abs(290, 174)} wobble={1.2}>
        <Sparkle x={22} y={22} s={1.15} fill={YELLOW} />
      </Ink>
      <Ink width={44} height={44} style={abs(1584, 248)} wobble={1.2}>
        <Sparkle x={22} y={22} s={1.1} fill={CORAL_HEX} />
      </Ink>
      <UnderlineDoodle x={630} y={338} w={660} color={TEAL_HEX} live={live} delay={0.35} />

      {/* Centered Serif Italic Tagline */}
      <p
        style={{
          ...abs(260, 380, 1400),
          margin: 0,
          textAlign: 'center',
          fontSize: 36,
          fontFamily: SERIF,
          fontStyle: 'italic',
          lineHeight: 1.35,
          color: INK,
        }}
      >
        From <Highlight color={HIGHLIGHT_TEAL}>MVP</Highlight> to{' '}
        <Highlight>Production Ready</Highlight>
      </p>

      {/* Centered Concise Description */}
      <p
        style={{
          ...abs(370, 444, 1180),
          margin: 0,
          textAlign: 'center',
          fontSize: 23,
          lineHeight: 1.5,
          color: BODY,
        }}
      >
        Menyempurnakan <strong style={{ color: INK }}>UrbanStore</strong> dengan{' '}
        <strong style={{ color: INK }}>Google Authentication</strong>,{' '}
        <strong style={{ color: INK }}>Payment Gateway Mayar.id</strong> secara real-time,{' '}
        <strong style={{ color: INK }}>End-to-End Testing</strong>, dan{' '}
        <strong style={{ color: INK }}>AI Skill Audit</strong>.
      </p>

      {/* Wide Sesi 2-Style Hand-Drawn Illustration Centerpiece (No Material Text Boxes) */}
      <CoverSesi6ProductionArt live={live} />

      {/* Bottom Centered Credit */}
      <div
        style={{
          ...abs(X0, 974, W, 32),
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 650,
          color: SOFT,
        }}
      >
        by CODEPOLITAN · UrbanStore Production Launch
      </div>
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
    className="s6-interactive"
    style={{
      ...abs(760, top, 1040, 120),
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
          fontSize: 24,
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
  const [selected, setSelected] = useState(1);

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
        Hari ini kita bukan menambah banyak fitur baru, tetapi menyempurnakan{' '}
        <Highlight color={HIGHLIGHT_TEAL}>UrbanStore</Highlight> agar siap dipakai secara nyata.
      </p>

      <Ink width={420} height={50} style={abs(X0, 412)}>
        <TallyBox x={0} />
        <TallyBox x={56} accent />
        <TallyBox x={112} />
        <TallyBox x={168} accent />
        <TallyBox x={224} />
        <TallyBox x={280} />
      </Ink>

      <div style={{ ...abs(X0, 484, 580), fontSize: 19, fontWeight: 780, color: INK }}>
        FONDASI PRODUCTION READY
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
            01 · AUTH &amp; PAYMENT
          </span>
          <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 700, color: INK }}>
            Google + Mayar.id
          </span>
        </div>
        <div>
          <div style={{ ...headline(28), marginBottom: 6 }}>Akses Cepat &amp; Kasir Otomatis</div>
          <div style={{ fontSize: 19, lineHeight: 1.38, color: BODY }}>
            Login 1-klik dengan Google OAuth dan verifikasi bayar real-time lewat Webhook.
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
            02 · QUALITY &amp; TESTING
          </span>
          <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 700, color: CORAL_HEX }}>
            E2E + AI Skill
          </span>
        </div>
        <div>
          <div style={{ ...headline(28), marginBottom: 6 }}>Enhancement &amp; Audit Kode</div>
          <div style={{ fontSize: 19, lineHeight: 1.38, color: BODY }}>
            Perbaiki detail UI/UX, uji seluruh alur pengguna, dan audit kualitas dengan Skill.
          </div>
        </div>
      </div>

      <ObjectiveRow
        top={152}
        code="01"
        text="Mengintegrasikan Google Authentication untuk Customer & Admin."
        tag="Google OAuth"
        active={selected === 0}
        onClick={() => setSelected(0)}
      />
      <ObjectiveRow
        top={276}
        code="02"
        text="Meng-upgrade transfer manual ke Payment Gateway Mayar.id."
        tag="Payment Gateway"
        accent
        active={selected === 1}
        onClick={() => setSelected(1)}
      />
      <ObjectiveRow
        top={400}
        code="03"
        text="Memahami arsitektur transaksi real-time (Token & Webhook)."
        tag="Webhook Flow"
        active={selected === 2}
        onClick={() => setSelected(2)}
      />
      <ObjectiveRow
        top={524}
        code="04"
        text="Melakukan End-to-End Testing seluruh alur UrbanStore."
        tag="E2E Testing"
        active={selected === 3}
        onClick={() => setSelected(3)}
      />
      <ObjectiveRow
        top={648}
        code="05"
        text="Meningkatkan kualitas aplikasi menggunakan AI Skill Audit."
        tag="Code Quality"
        accent
        active={selected === 4}
        onClick={() => setSelected(4)}
      />
      <ObjectiveRow
        top={772}
        code="06"
        text="Menyiapkan aplikasi menuju standar Production Ready."
        tag="Production Ready"
        active={selected === 5}
        onClick={() => setSelected(5)}
      />
      <div style={{ ...abs(760, 896, 1040), borderTop: `1.5px solid ${RULE}` }} />
      <UnderlineDoodle x={X0} y={282} w={340} color={TEAL_HEX} live={live} />
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 03 — STUDI KASUS URBANSTORE (SESI 3-5 -> SESI 6)                       */
/* ============================================================================ */

const ExistingItemRow = ({
  sesi,
  title,
}: {
  sesi: string;
  title: string;
}) => (
  <div
    style={{
      borderRadius: 14,
      background: '#FFFFFF',
      border: `1.5px solid ${RULE}`,
      padding: '15px 20px',
      ...row,
      justifyContent: 'space-between',
    }}
  >
    <div style={{ ...row, gap: 14 }}>
      <span style={{ color: '#2F7A43', fontWeight: 800, fontSize: 22 }}>✓</span>
      <span style={{ fontSize: 21, fontWeight: 700, color: INK }}>{title}</span>
    </div>
    <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, color: BODY }}>{sesi}</span>
  </div>
);

const UpgradeTile = ({
  code,
  title,
  desc,
  accent,
}: {
  code: string;
  title: string;
  desc: string;
  accent: string;
}) => (
  <div
    style={{
      borderRadius: 16,
      background: '#FFFFFF',
      border: `2px solid ${accent}`,
      padding: '16px 22px',
    }}
  >
    <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 780, color: accent, marginBottom: 4 }}>
      {code}
    </div>
    <div style={{ fontSize: 22, fontWeight: 760, color: INK, marginBottom: 4 }}>{title}</div>
    <div style={{ fontSize: 18, color: BODY, lineHeight: 1.38 }}>{desc}</div>
  </div>
);

const Slide03UrbanStoreScope: Page = () => (
  <Frame>
    <Eyebrow>Studi Kasus · UrbanStore</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(48) }}>
      Dari fondasi <Highlight color={HIGHLIGHT_TEAL}>Sesi 3–5</Highlight> menuju aplikasi{' '}
      <Highlight>siap transaksi nyata</Highlight>.
    </h2>

    {/* Left Column: Already Built */}
    <div
      style={{
        ...abs(X0, 226, 816, 718),
        borderRadius: 26,
        background: TINT_NEUTRAL,
        border: `2px solid ${RULE}`,
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: '#2F7A43', marginBottom: 6 }}>
          SUDAH DIMILIKI URBANSTORE
        </div>
        <h3 style={{ ...headline(32), marginBottom: 20 }}>Hasil Sesi 3, Sesi 4, &amp; Sesi 5</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ExistingItemRow sesi="SESI 3" title="Landing Page & Branding UrbanStore" />
          <ExistingItemRow sesi="SESI 4" title="Store Admin: Kelola Produk & Order" />
          <ExistingItemRow sesi="SESI 4" title="Katalog, Size Picker, Cart & Checkout Manual" />
          <ExistingItemRow sesi="SESI 5" title="Floating Chat CS AI (Stok, BB/TB, Mix & Match)" />
          <ExistingItemRow sesi="SESI 5" title="Admin AI Deskripsi & Dokumen Analisis Penjualan" />
        </div>
      </div>

      <div style={{ fontFamily: MONO, fontSize: 16, color: BODY }}>
        Status saat ini: MVP fungsional + AI terintegrasi
      </div>
    </div>

    {/* Right Column: Sesi 6 Upgrades */}
    <div
      style={{
        ...abs(984, 226, 816, 718),
        borderRadius: 26,
        background: TINT_TEAL,
        border: `2.5px solid ${TEAL_HEX}`,
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX, marginBottom: 6 }}>
          PENYEMPURNAAN HARI INI (SESI 6)
        </div>
        <h3 style={{ ...headline(32), marginBottom: 18 }}>4 Pilar Menuju Production Ready</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <UpgradeTile
            code="01 · AUTH"
            title="Google Login"
            desc="Login cepat tanpa registrasi rumit & proteksi rute /admin."
            accent="#2B6CB0"
          />
          <UpgradeTile
            code="02 · PAYMENT"
            title="Mayar.id Gateway"
            desc="Ganti transfer manual Sesi 4 menjadi pembayaran otomatis."
            accent={TEAL_HEX}
          />
          <UpgradeTile
            code="03 · POLISH"
            title="Enhancement & E2E"
            desc="Responsive, empty/loading state, & uji seluruh perjalanan user."
            accent="#946200"
          />
          <UpgradeTile
            code="04 · QUALITY"
            title="AI Skill Audit"
            desc="Cek security, performance, SEO, accessibility, & refactor."
            accent={CORAL_HEX}
          />
        </div>
      </div>

      <div
        style={{
          borderRadius: 14,
          background: INK_HEX,
          color: '#FFFFFF',
          padding: '16px 22px',
          fontSize: 19,
          fontWeight: 680,
        }}
      >
        Target: Seluruh transaksi &amp; alur pengguna berjalan otomatis, aman, dan stabil.
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 04 — GOOGLE AUTHENTICATION                                             */
/* ============================================================================ */

const AuthBenefitRow = ({
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
      border: `1.5px solid ${RULE}`,
      padding: '18px 22px',
      ...row,
      gap: 18,
    }}
  >
    <span style={{ fontFamily: MONO, fontSize: 22, fontWeight: 780, color: TEAL_HEX }}>{num}</span>
    <div>
      <div style={{ fontSize: 22, fontWeight: 760, color: INK }}>{title}</div>
      <div style={{ fontSize: 18, color: BODY, marginTop: 2 }}>{desc}</div>
    </div>
  </div>
);

const FlowPill = ({
  step,
  label,
  highlight = false,
}: {
  step: string;
  label: string;
  highlight?: boolean;
}) => (
  <div
    style={{
      borderRadius: 14,
      background: highlight ? TEAL_HEX : 'rgba(255,255,255,0.08)',
      border: `1.5px solid ${highlight ? TEAL_HEX : 'rgba(255,255,255,0.16)'}`,
      padding: '14px 20px',
      ...row,
      justifyContent: 'space-between',
    }}
  >
    <span style={{ fontSize: 21, fontWeight: 740, color: '#FFFFFF' }}>{label}</span>
    <span style={{ fontFamily: MONO, fontSize: 15, color: highlight ? '#FFFFFF' : YELLOW }}>{step}</span>
  </div>
);

const Slide04GoogleAuth: Page = () => (
  <Frame>
    <Eyebrow>Google Authentication · OAuth</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
      Mengapa menggunakan <Highlight color={HIGHLIGHT_TEAL}>Google Login</Highlight> di UrbanStore?
    </h2>

    {/* Left Column: Benefits */}
    <div
      style={{
        ...abs(X0, 226, 860, 714),
        borderRadius: 26,
        background: TINT_NEUTRAL,
        border: `2px solid ${RULE}`,
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX, marginBottom: 14 }}>
          KEUNTUNGAN UNTUK URBANSTORE
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <AuthBenefitRow
            num="01"
            title="Tidak Perlu Registrasi Manual"
            desc="Customer tidak perlu mengisi formulir panjang atau mengingat password baru."
          />
          <AuthBenefitRow
            num="02"
            title="Checkout Lebih Cepat (Auto-Fill)"
            desc="Nama dan email dari akun Google otomatis mengisi form checkout."
          />
          <AuthBenefitRow
            num="03"
            title="Riwayat Pesanan Tersimpan"
            desc="Pembeli dapat melihat status order dan invoice lintas perangkat."
          />
          <AuthBenefitRow
            num="04"
            title="Proteksi Akses /admin"
            desc="Hanya email Store Admin yang terdaftar yang boleh masuk ke dashboard toko."
          />
        </div>
      </div>

      <div style={{ fontFamily: MONO, fontSize: 16, color: BODY }}>
        Standar aplikasi web modern: cepat untuk pembeli, aman untuk pemilik toko.
      </div>
    </div>

    {/* Right Column: Flow + Insight */}
    <div
      style={{
        ...abs(1016, 226, 784, 714),
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
        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: YELLOW, marginBottom: 14 }}>
          FLOW AUTHENTICATION
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <FlowPill step="STEP 01" label='Klik "Masuk dengan Google"' />
          <div style={{ textAlign: 'center', fontFamily: MONO, color: '#7CE8E4' }}>↓</div>
          <FlowPill step="STEP 02" label="Google OAuth Consent Screen" />
          <div style={{ textAlign: 'center', fontFamily: MONO, color: '#7CE8E4' }}>↓</div>
          <FlowPill step="STEP 03" label="Verifikasi Token & Identitas Google" />
          <div style={{ textAlign: 'center', fontFamily: MONO, color: '#7CE8E4' }}>↓</div>
          <FlowPill step="STEP 04" label="Session Aktif (Role: Customer / Admin)" highlight />
          <div style={{ textAlign: 'center', fontFamily: MONO, color: '#7CE8E4' }}>↓</div>
          <FlowPill step="STEP 05" label="Redirect ke Katalog / Checkout / /admin" />
        </div>
      </div>

      <div
        style={{
          borderRadius: 16,
          background: 'rgba(248,218,126,0.14)',
          border: `1.5px solid ${YELLOW}`,
          padding: '18px 22px',
          fontSize: 19,
          lineHeight: 1.42,
        }}
      >
        <strong style={{ color: YELLOW }}>Insight:</strong> Semakin mudah proses login, semakin tinggi
        kemungkinan pengunjung menyelesaikan transaksi sampai checkout.
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 05 — DEMO INTEGRASI GOOGLE AUTHENTICATION                              */
/* ============================================================================ */

const IntegrationStepItem = ({
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
        background: TINT_BLUE,
        color: '#2B6CB0',
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
      <div style={{ fontSize: 21, fontWeight: 760, color: INK }}>{title}</div>
      <div style={{ fontSize: 18, color: BODY, marginTop: 2 }}>{desc}</div>
    </div>
  </div>
);

const Slide05GoogleAuthSteps: Page = () => (
  <Frame>
    <Eyebrow>Implementasi · Integrasi Google Authentication</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
      Lima langkah memasang <Highlight color={HIGHLIGHT_TEAL}>Google OAuth</Highlight> di
      UrbanStore.
    </h2>

    {/* Left Column: 5 Steps */}
    <div
      style={{
        ...abs(X0, 226, 940, 716),
        borderRadius: 26,
        background: TINT_NEUTRAL,
        border: `2px solid ${RULE}`,
        padding: '26px 30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: '#2B6CB0' }}>
        LANGKAH INTEGRASI
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <IntegrationStepItem
          num="01"
          title="Setup Google OAuth Client"
          desc="Buat OAuth 2.0 Client di Google Cloud Console & atur Authorized Redirect URI."
        />
        <IntegrationStepItem
          num="02"
          title="Konfigurasi Client ID & Secret"
          desc="Simpan GOOGLE_CLIENT_ID dan GOOGLE_CLIENT_SECRET di file .env Backend."
        />
        <IntegrationStepItem
          num="03"
          title="Tambahkan Google Login Button"
          desc="Pasang tombol Masuk dengan Google di Header, Checkout, & gerbang /admin."
        />
        <IntegrationStepItem
          num="04"
          title="Verifikasi Session & Role"
          desc="Validasi token Google di server, lalu tentukan akses Customer atau Admin."
        />
        <IntegrationStepItem
          num="05"
          title="Redirect Otomatis"
          desc="Arahkan Customer ke katalog/checkout dan Store Admin ke dashboard /admin."
        />
      </div>
    </div>

    {/* Right Column: UI Mockup & Output */}
    <div
      style={{
        ...abs(1096, 226, 704, 716),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Login Modal Mockup */}
      <div
        style={{
          borderRadius: 26,
          background: '#FFFFFF',
          border: `2.5px solid ${INK_HEX}`,
          padding: '28px 32px',
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: TEAL_HEX, marginBottom: 8 }}>
          UI PREVIEW · URBANSTORE LOGIN
        </div>
        <div style={{ ...headline(30), marginBottom: 8 }}>Masuk ke UrbanStore</div>
        <p style={{ margin: '0 0 20px', fontSize: 18, color: BODY }}>
          Checkout lebih cepat dan pantau riwayat pesananmu kapan saja.
        </p>

        <div
          style={{
            borderRadius: 14,
            background: TINT_BLUE,
            border: `2px solid #2B6CB0`,
            padding: '16px 24px',
            ...row,
            justifyContent: 'center',
            gap: 14,
            fontSize: 21,
            fontWeight: 760,
            color: INK,
          }}
        >
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: 99,
              background: '#2B6CB0',
              color: '#FFFFFF',
              fontFamily: MONO,
              fontSize: 17,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            G
          </span>
          <span>Lanjutkan dengan Google</span>
        </div>
      </div>

      {/* Output Card */}
      <div
        style={{
          borderRadius: 26,
          background: INK_HEX,
          color: '#FFFFFF',
          padding: '28px 32px',
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: YELLOW, marginBottom: 14 }}>
          OUTPUT YANG DIHARAPKAN
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 21 }}>
          <div>
            <span style={{ color: '#7CE8E4', fontWeight: 800 }}>✓</span> Login menggunakan akun Google
            berhasil
          </div>
          <div>
            <span style={{ color: '#7CE8E4', fontWeight: 800 }}>✓</span> Profil Customer otomatis
            terisi saat checkout
          </div>
          <div>
            <span style={{ color: '#7CE8E4', fontWeight: 800 }}>✓</span> Halaman /admin terlindungi
            untuk pemilik toko
          </div>
        </div>
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 06 — PAYMENT GATEWAY MAYAR.ID (MANUAL VS OTOMATIS)                     */
/* ============================================================================ */

const FlowStepBox = ({
  text,
  tint,
  color,
}: {
  text: string;
  tint: string;
  color: string;
}) => (
  <div
    style={{
      borderRadius: 14,
      background: tint,
      padding: '15px 20px',
      fontSize: 21,
      fontWeight: 700,
      color,
      textAlign: 'center',
    }}
  >
    {text}
  </div>
);

const Slide06ManualVsMayar: Page = () => {
  const [focus, setFocus] = useState<'both' | 'manual' | 'mayar'>('both');

  return (
    <Frame>
      <Eyebrow>Payment Gateway · Mayar.id</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(48) }}>
        Upgrade dari <Highlight color={HIGHLIGHT_PINK}>Transfer Manual (Sesi 4)</Highlight> ke{' '}
        <Highlight color={HIGHLIGHT_TEAL}>Mayar.id Otomatis</Highlight>.
      </h2>

      {/* Left: Manual (Sesi 4) */}
      <div
        onClick={() => setFocus(focus === 'manual' ? 'both' : 'manual')}
        className="s6-interactive"
        style={{
          ...abs(X0, 224, 816, 560),
          borderRadius: 26,
          background: TINT_PINK,
          border: `2.5px solid ${focus === 'manual' ? INK_HEX : CORAL_HEX}`,
          opacity: focus === 'mayar' ? 0.5 : 1,
          padding: '26px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: CORAL_HEX }}>
              ✕ TRANSFER MANUAL · SESI 4 (MVP)
            </span>
            <span style={{ fontFamily: MONO, fontSize: 15, color: BODY }}>Lambat &amp; Manual</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
            <FlowStepBox text="Customer Checkout ➔ Tampil No. Rekening" tint="#FFFFFF" color={INK} />
            <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: CORAL_HEX }}>↓</div>
            <FlowStepBox text='Transfer Bank & Klik "Saya Sudah Transfer"' tint="#FFFFFF" color={INK} />
            <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: CORAL_HEX }}>↓</div>
            <FlowStepBox text="Admin Cek Mutasi Rekening Satu per Satu" tint="#FFFFFF" color={INK} />
            <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: CORAL_HEX }}>↓</div>
            <FlowStepBox text="Status Lama Berubah (Rawan Human Error)" tint={CORAL_HEX} color="#FFFFFF" />
          </div>
        </div>
      </div>

      {/* Right: Mayar.id (Sesi 6) */}
      <div
        onClick={() => setFocus(focus === 'mayar' ? 'both' : 'mayar')}
        className="s6-interactive"
        style={{
          ...abs(984, 224, 816, 560),
          borderRadius: 26,
          background: TINT_TEAL,
          border: `2.5px solid ${focus === 'mayar' ? INK_HEX : TEAL_HEX}`,
          opacity: focus === 'manual' ? 0.5 : 1,
          padding: '26px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: TEAL_HEX }}>
              ✓ MAYAR.ID · SESI 6 (PRODUCTION READY)
            </span>
            <span style={{ fontFamily: MONO, fontSize: 15, color: BODY }}>Otomatis 24/7</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
            <FlowStepBox text="Customer Checkout ➔ Klik Bayar Sekarang" tint="#FFFFFF" color={INK} />
            <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: TEAL_HEX }}>↓</div>
            <FlowStepBox text="Pilih Metode (QRIS, Virtual Account, E-Wallet)" tint="#FFFFFF" color={INK} />
            <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: TEAL_HEX }}>↓</div>
            <FlowStepBox text="Verifikasi Otomatis oleh Sistem Mayar.id" tint="#FFFFFF" color={INK} />
            <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: TEAL_HEX }}>↓</div>
            <FlowStepBox text="Status Real-Time Otomatis: Lunas & Diproses" tint={TEAL_HEX} color="#FFFFFF" />
          </div>
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
        <div style={{ fontSize: 22, lineHeight: 1.4 }}>
          <strong style={{ color: YELLOW }}>Insight:</strong> Payment Gateway menghilangkan proses
          verifikasi manual sehingga transaksi UrbanStore menjadi jauh lebih cepat, akurat, dan siap
          menerima order 24/7.
        </div>
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 07 — TAHAPAN INTEGRASI PAYMENT GATEWAY MAYAR.ID                        */
/* ============================================================================ */

const MayarStageCard = ({
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
      padding: '15px 22px',
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
      <div style={{ fontSize: 21, fontWeight: 760, color: INK }}>{title}</div>
      <div style={{ fontSize: 18, color: BODY, marginTop: 2 }}>{desc}</div>
    </div>
  </div>
);

const Slide07MayarIntegrationSteps: Page = () => (
  <Frame>
    <Eyebrow>Implementasi · Integrasi Payment Gateway Mayar.id</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
      Lima tahapan menghubungkan checkout ke <Highlight color={HIGHLIGHT_TEAL}>Mayar.id</Highlight>.
    </h2>

    {/* Left Column: 5 Stages */}
    <div
      style={{
        ...abs(X0, 226, 980, 716),
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
        TAHAPAN INTEGRASI DI BACKEND URBANSTORE
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <MayarStageCard
          num="01"
          title="Setup API Key & Webhook Secret Mayar.id"
          desc="Simpan kredensial di .env Backend — jangan pernah ekspos ke Frontend."
        />
        <MayarStageCard
          num="02"
          title="Generate Payment Link / Token"
          desc="Saat checkout, Backend mengirim nominal (Subtotal + Ongkir) ke API Mayar.id."
        />
        <MayarStageCard
          num="03"
          title="Redirect ke Halaman Pembayaran Mayar.id"
          desc="Customer memilih QRIS, Virtual Account, atau E-Wallet dan menyelesaikan bayar."
        />
        <MayarStageCard
          num="04"
          title="Terima Callback / Webhook"
          desc="Endpoint /api/webhook/mayar menerima notifikasi status pembayaran dari Mayar.id."
        />
        <MayarStageCard
          num="05"
          title="Update Status Order & Kurangi Stok"
          desc="Ubah status order menjadi Lunas & Siap Dikirim secara otomatis di database."
        />
      </div>
    </div>

    {/* Right Column: .env Security + Output */}
    <div
      style={{
        ...abs(1136, 226, 664, 716),
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
        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: YELLOW, marginBottom: 14 }}>
          KONFIGURASI .ENV BACKEND
        </div>
        <div
          style={{
            borderRadius: 16,
            background: 'rgba(255,255,255,0.08)',
            border: '1.5px solid rgba(255,255,255,0.16)',
            padding: '20px 24px',
            fontFamily: MONO,
            fontSize: 17,
            lineHeight: 1.7,
            color: '#7CE8E4',
          }}
        >
          GEMINI_API_KEY=...
          <br />
          GOOGLE_CLIENT_ID=...
          <br />
          GOOGLE_CLIENT_SECRET=...
          <br />
          <span style={{ color: YELLOW }}>MAYAR_API_KEY=...</span>
          <br />
          <span style={{ color: YELLOW }}>MAYAR_WEBHOOK_SECRET=...</span>
        </div>
      </div>

      <div>
        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: '#7CE8E4', marginBottom: 12 }}>
          OUTPUT INTEGRASI
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 20 }}>
          <div
            style={{
              borderRadius: 14,
              background: 'rgba(60,165,161,0.2)',
              border: `1.5px solid ${TEAL_HEX}`,
              padding: '15px 18px',
            }}
          >
            ✓ Status pembayaran di Invoice berubah otomatis tanpa klik manual.
          </div>
          <div
            style={{
              borderRadius: 14,
              background: 'rgba(248,218,126,0.14)',
              border: `1.5px solid ${YELLOW}`,
              padding: '15px 18px',
            }}
          >
            ✓ Data order lunas langsung masuk Dashboard Admin &amp; siap dianalisis AI (Sesi 5).
          </div>
        </div>
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 08 — ARSITEKTUR TRANSAKSI REAL-TIME                                    */
/* ============================================================================ */

const RealtimeNode = ({
  num,
  title,
  sub,
  tint,
  accent,
  active,
  onClick,
}: {
  num: string;
  title: string;
  sub: string;
  tint: string;
  accent: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s6-interactive"
    style={{
      borderRadius: 22,
      background: active ? accent : tint,
      color: active ? '#FFFFFF' : INK,
      border: `2.5px solid ${accent}`,
      padding: '22px 26px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 230,
    }}
  >
    <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: active ? YELLOW : accent }}>
      {num}
    </div>
    <div>
      <div style={{ ...headline(28), color: active ? '#FFFFFF' : INK, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 18, lineHeight: 1.4, color: active ? '#F5F4F0' : BODY }}>{sub}</div>
    </div>
  </div>
);

const Slide08RealtimeArchitecture: Page = () => {
  const [step, setStep] = useState(4);

  return (
    <Frame>
      <Eyebrow>Arsitektur Transaksi Real-Time</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        Alur <Highlight color={HIGHLIGHT_TEAL}>Checkout ➔ Mayar.id ➔ Webhook</Highlight> tanpa
        verifikasi manual.
      </h2>

      {/* 3x2 Interactive Architecture Grid */}
      <div
        style={{
          ...abs(X0, 226, W, 500),
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: '1fr 1fr',
          gap: 24,
        }}
      >
        <RealtimeNode
          num="01 · CUSTOMER CHECKOUT"
          title="Klik Bayar Sekarang"
          sub="Customer mengisi alamat & metode kirim, lalu menekan tombol checkout UrbanStore."
          tint={TINT_NEUTRAL}
          accent={INK_HEX}
          active={step === 0}
          onClick={() => setStep(0)}
        />
        <RealtimeNode
          num="02 · PAYMENT TOKEN"
          title="Backend Request API"
          sub="Server membuat invoice & Payment Link ke Mayar.id sesuai total tagihan."
          tint={TINT_BLUE}
          accent="#2B6CB0"
          active={step === 1}
          onClick={() => setStep(1)}
        />
        <RealtimeNode
          num="03 · MAYAR.ID CHECKOUT"
          title="Customer Membayar"
          sub="Pembeli memilih QRIS, Virtual Account, atau E-Wallet di halaman Mayar.id."
          tint={TINT_YELLOW}
          accent="#946200"
          active={step === 2}
          onClick={() => setStep(2)}
        />
        <RealtimeNode
          num="04 · WEBHOOK CALLBACK"
          title="Notifikasi Real-Time"
          sub="Server Mayar.id langsung menembak /api/webhook/mayar begitu dana terkonfirmasi."
          tint={TINT_PINK}
          accent={CORAL_HEX}
          active={step === 3}
          onClick={() => setStep(3)}
        />
        <RealtimeNode
          num="05 · AUTO UPDATE ORDER"
          title="Status Resmi Lunas"
          sub="Backend memvalidasi signature webhook, mengubah status order, & mengurangi stok."
          tint={TINT_TEAL}
          accent={TEAL_HEX}
          active={step === 4}
          onClick={() => setStep(4)}
        />
        <RealtimeNode
          num="06 · REAL-TIME SYNC"
          title="Invoice & Admin Update"
          sub="Halaman invoice pembeli berubah Lunas dan pesanan muncul siap packing di /admin."
          tint={TINT_GREEN}
          accent="#2F7A43"
          active={step === 5}
          onClick={() => setStep(5)}
        />
      </div>

      {/* Bottom Insight Bar */}
      <div
        style={{
          ...abs(X0, 774, W, 166),
          borderRadius: 24,
          background: INK_HEX,
          color: '#FFFFFF',
          padding: '24px 36px',
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ maxWidth: 1280 }}>
          <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 780, color: YELLOW, marginBottom: 6 }}>
            MENGAPA WEBHOOK PENTING?
          </div>
          <div style={{ fontSize: 22, lineHeight: 1.4, color: '#F5F4F0' }}>
            Dengan Webhook Callback, sistem tidak perlu melakukan polling berulang dan Admin tidak
            perlu mengecek mutasi bank secara manual — status order selalu sinkron seketika.
          </div>
        </div>
        <span
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
          Zero Manual Check
        </span>
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 09 — ENHANCEMENT PROJECT                                               */
/* ============================================================================ */

const EnhancementCard = ({
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
      borderRadius: 22,
      background: tint,
      border: `2px solid ${accent}`,
      padding: '22px 26px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: accent }}>{num}</div>
    <div>
      <div style={{ ...headline(28), marginTop: 8, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 19, lineHeight: 1.4, color: BODY }}>{desc}</div>
    </div>
  </div>
);

const Slide09EnhancementProject: Page = () => (
  <Frame>
    <Eyebrow>Enhancement Project · Polish &amp; Detail</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
      Saat fitur utama sudah berjalan, perbaiki{' '}
      <Highlight color={HIGHLIGHT_TEAL}>detail yang sering terlewat</Highlight>.
    </h2>

    {/* 3x2 Grid */}
    <div
      style={{
        ...abs(X0, 226, W, 556),
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: '1fr 1fr',
        gap: 22,
      }}
    >
      <EnhancementCard
        num="01 · RESPONSIVE LAYOUT"
        title="Nyaman di Mobile & Desktop"
        desc="Pastikan Katalog, Cart Drawer, Floating Chat CS, Checkout, & Dashboard Admin rapi di layar HP."
        tint={TINT_TEAL}
        accent={TEAL_HEX}
      />
      <EnhancementCard
        num="02 · UI/UX IMPROVEMENT"
        title="Konsistensi Visual"
        desc="Rapikan spacing, kontras tombol, badge status order, & feedback pilihan ukuran S/M/L/XL."
        tint={TINT_YELLOW}
        accent="#946200"
      />
      <EnhancementCard
        num="03 · EMPTY STATE"
        title="Kondisi Kosong Informatif"
        desc="Tampilkan CTA jelas saat keranjang belanja kosong, pencarian nihil, atau belum ada order."
        tint={TINT_BLUE}
        accent="#2B6CB0"
      />
      <EnhancementCard
        num="04 · LOADING STATE"
        title="Skeleton & Indikator"
        desc="Berikan transisi mulus saat load produk, redirect Mayar.id, dan saat AI memproses respons."
        tint={TINT_PINK}
        accent={CORAL_HEX}
      />
      <EnhancementCard
        num="05 · VALIDASI & ERROR"
        title="Form & Error Handling"
        desc="Validasi nomor WhatsApp, email, alamat checkout, batas stok, serta pesan error ramah."
        tint={TINT_GREEN}
        accent="#2F7A43"
      />
      <EnhancementCard
        num="06 · PERFORMANCE"
        title="Cepat & Ringan"
        desc="Optimasi pemuatan gambar fashion dan hindari fetch data katalog atau AI secara berulang."
        tint={TINT_NEUTRAL}
        accent={INK_HEX}
      />
    </div>

    <div
      style={{
        ...abs(X0, 814, W, 130),
        borderRadius: 22,
        background: INK_HEX,
        color: '#FFFFFF',
        padding: '22px 34px',
        ...row,
        justifyContent: 'space-between',
      }}
    >
      <span style={{ fontSize: 23, fontWeight: 700 }}>
        <strong style={{ color: YELLOW }}>Target Enhancement:</strong> UrbanStore terasa halus,
        konsisten, dan meyakinkan calon pembeli seperti brand fashion profesional.
      </span>
      <span style={{ fontFamily: MONO, fontSize: 17, color: '#7CE8E4' }}>Detail Matters</span>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 10 — END-TO-END TESTING                                                */
/* ============================================================================ */

const E2EStepBadge = ({
  num,
  label,
  checked,
  onToggle,
}: {
  num: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
}) => (
  <div
    onClick={onToggle}
    className="s6-interactive"
    style={{
      borderRadius: 16,
      background: checked ? TINT_TEAL : '#FFFFFF',
      border: `2px solid ${checked ? TEAL_HEX : RULE}`,
      padding: '16px 20px',
      ...row,
      justifyContent: 'space-between',
    }}
  >
    <div style={{ ...row, gap: 14 }}>
      <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: TEAL_HEX }}>{num}</span>
      <span style={{ fontSize: 20, fontWeight: 740, color: INK }}>{label}</span>
    </div>
    <span
      style={{
        fontFamily: MONO,
        fontSize: 16,
        fontWeight: 780,
        color: checked ? '#2F7A43' : SOFT,
      }}
    >
      {checked ? '✓ PASS' : 'TEST'}
    </span>
  </div>
);

const Slide10EndToEndTesting: Page = () => {
  const [stepIndex, setStepIndex] = useState(8);

  return (
    <Frame>
      <Eyebrow>End-to-End Testing · Uji Alur Utuh</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        Jangan hanya mengetes satu halaman — uji{' '}
        <Highlight color={HIGHLIGHT_TEAL}>seluruh perjalanan user</Highlight>.
      </h2>

      {/* Left: 8-Step E2E Interactive Flow */}
      <div
        style={{
          ...abs(X0, 226, 1080, 714),
          borderRadius: 26,
          background: TINT_NEUTRAL,
          border: `2px solid ${RULE}`,
          padding: '26px 30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX }}>
            ALUR E2E YANG WAJIB DIUJI DI URBANSTORE
          </span>
          <span style={{ fontFamily: MONO, fontSize: 15, color: BODY }}>Klik langkah untuk tandai uji</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <E2EStepBadge
            num="01"
            label="Landing Page & Katalog"
            checked={stepIndex >= 0}
            onToggle={() => setStepIndex(0)}
          />
          <E2EStepBadge
            num="02"
            label="Login Google (Customer)"
            checked={stepIndex >= 1}
            onToggle={() => setStepIndex(1)}
          />
          <E2EStepBadge
            num="03"
            label="Floating Chat AI (Stok / BB-TB)"
            checked={stepIndex >= 2}
            onToggle={() => setStepIndex(2)}
          />
          <E2EStepBadge
            num="04"
            label="Size Picker & Shopping Cart"
            checked={stepIndex >= 3}
            onToggle={() => setStepIndex(3)}
          />
          <E2EStepBadge
            num="05"
            label="Checkout & Mayar.id Payment"
            checked={stepIndex >= 4}
            onToggle={() => setStepIndex(4)}
          />
          <E2EStepBadge
            num="06"
            label="Webhook Status Otomatis Lunas"
            checked={stepIndex >= 5}
            onToggle={() => setStepIndex(5)}
          />
          <E2EStepBadge
            num="07"
            label="Admin /admin & AI Tools"
            checked={stepIndex >= 6}
            onToggle={() => setStepIndex(6)}
          />
          <E2EStepBadge
            num="08"
            label="Riwayat Order & Logout"
            checked={stepIndex >= 7}
            onToggle={() => setStepIndex(7)}
          />
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
          Status Uji: {Math.min(stepIndex + 1, 8)} / 8 tahap perjalanan pengguna terverifikasi
        </div>
      </div>

      {/* Right: Why E2E Matters */}
      <div
        style={{
          ...abs(1236, 226, 564, 714),
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
          <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: YELLOW, marginBottom: 12 }}>
            CEGAH BUG INTEGRASI
          </div>
          <h3 style={{ ...headline(32), color: '#FFFFFF', marginBottom: 18 }}>
            Kenapa Harus Tes Utuh?
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 19, lineHeight: 1.45, color: '#E2E1DD' }}>
            <div>• Halaman checkout bisa terlihat bagus, tapi nominal ongkir gagal terkirim ke Mayar.id.</div>
            <div>• Pembayaran sukses di Mayar.id, tapi Webhook gagal mengubah status di Dashboard Admin.</div>
            <div>• Admin baru input baju baru, tapi lupa dicek apakah Floating Chat CS langsung mengenalinya.</div>
          </div>
        </div>

        <div
          style={{
            borderRadius: 16,
            background: 'rgba(60,165,161,0.22)',
            border: `1.5px solid ${TEAL_HEX}`,
            padding: '18px 22px',
            fontSize: 19,
            lineHeight: 1.42,
          }}
        >
          <strong style={{ color: '#7CE8E4' }}>Aturan Uji:</strong> Satu bagian yang putus bisa
          menggagalkan transaksi nyata.
        </div>
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 11 — CODE QUALITY MENGGUNAKAN AI SKILL                                 */
/* ============================================================================ */

const SkillAreaTile = ({
  code,
  title,
  desc,
  tint,
  accent,
}: {
  code: string;
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
    <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 780, color: accent }}>{code}</div>
    <div>
      <div style={{ ...headline(26), marginTop: 6, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 17, color: BODY, lineHeight: 1.38 }}>{desc}</div>
    </div>
  </div>
);

const Slide11CodeQualitySkill: Page = () => (
  <Frame>
    <Eyebrow>Code Quality · Menggunakan AI Skill</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
      Audit seluruh project UrbanStore dengan <Highlight color={HIGHLIGHT_TEAL}>AI Skill</Highlight>.
    </h2>

    {/* Left 2x3 Grid of 6 Skills */}
    <div
      style={{
        ...abs(X0, 226, 1080, 714),
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: '1fr 1fr',
        gap: 18,
      }}
    >
      <SkillAreaTile
        code="01 · SECURITY"
        title="Keamanan Kredensial"
        desc="Cek proteksi .env (Gemini, Mayar, Google), validasi webhook, & guard /admin."
        tint={TINT_PINK}
        accent={CORAL_HEX}
      />
      <SkillAreaTile
        code="02 · PERFORMANCE"
        title="Kecepatan & Payload"
        desc="Optimasi ukuran gambar produk, bundle size, & efisiensi payload API."
        tint={TINT_YELLOW}
        accent="#946200"
      />
      <SkillAreaTile
        code="03 · ACCESSIBILITY"
        title="Aksesibilitas UI"
        desc="Pastikan kontras warna, label form checkout, & navigasi keyboard jelas."
        tint={TINT_TEAL}
        accent={TEAL_HEX}
      />
      <SkillAreaTile
        code="04 · REFACTOR"
        title="Struktur Kode Bersih"
        desc="Pecah komponen terlalu besar dan hapus logika yang terduplikasi."
        tint={TINT_BLUE}
        accent="#2B6CB0"
      />
      <SkillAreaTile
        code="05 · TESTING"
        title="Edge Case & Validasi"
        desc="Uji stok 0, pembayaran gagal/expired, dan sesi login habis."
        tint={TINT_GREEN}
        accent="#2F7A43"
      />
      <SkillAreaTile
        code="06 · SEO"
        title="Visibilitas Toko"
        desc="Lengkapi title halaman, meta description, & struktur heading UrbanStore."
        tint={TINT_NEUTRAL}
        accent={INK_HEX}
      />
    </div>

    {/* Right Dark Benefits Card */}
    <div
      style={{
        ...abs(1236, 226, 564, 714),
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
        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: YELLOW, marginBottom: 12 }}>
          MANFAAT SKILL AUDIT
        </div>
        <h3 style={{ ...headline(32), color: '#FFFFFF', marginBottom: 22 }}>
          Kualitas Standar Industri
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              borderRadius: 16,
              background: 'rgba(255,255,255,0.08)',
              padding: '18px 20px',
              fontSize: 20,
              fontWeight: 680,
            }}
          >
            <span style={{ color: '#7CE8E4', fontWeight: 800 }}>✓</span> Menemukan bug &amp; celah
            keamanan tersembunyi
          </div>
          <div
            style={{
              borderRadius: 16,
              background: 'rgba(255,255,255,0.08)',
              padding: '18px 20px',
              fontSize: 20,
              fontWeight: 680,
            }}
          >
            <span style={{ color: '#7CE8E4', fontWeight: 800 }}>✓</span> Memberikan rekomendasi
            perbaikan yang konkret
          </div>
          <div
            style={{
              borderRadius: 16,
              background: 'rgba(255,255,255,0.08)',
              padding: '18px 20px',
              fontSize: 20,
              fontWeight: 680,
            }}
          >
            <span style={{ color: '#7CE8E4', fontWeight: 800 }}>✓</span> Merapikan struktur project
            sebelum deploy
          </div>
        </div>
      </div>

      <div
        style={{
          borderRadius: 16,
          background: TEAL_HEX,
          padding: '18px 22px',
          fontSize: 19,
          fontWeight: 700,
        }}
      >
        Audit menyeluruh memastikan UrbanStore siap dipakai pengguna nyata.
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 12 — WORKFLOW QUALITY IMPROVEMENT                                      */
/* ============================================================================ */

const QualityStageTile = ({
  num,
  title,
  sub,
  active,
  onClick,
}: {
  num: string;
  title: string;
  sub: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s6-interactive"
    style={{
      borderRadius: 20,
      background: active ? TEAL_HEX : '#FFFFFF',
      color: active ? '#FFFFFF' : INK,
      border: `2.5px solid ${active ? TEAL_HEX : RULE}`,
      padding: '22px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 184,
    }}
  >
    <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 780, color: active ? YELLOW : TEAL_HEX }}>
      TAHAP {num}
    </div>
    <div>
      <div style={{ ...headline(28), color: active ? '#FFFFFF' : INK, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 18, color: active ? '#EBF7F6' : BODY, lineHeight: 1.35 }}>{sub}</div>
    </div>
  </div>
);

const Slide12QualityWorkflow: Page = () => {
  const [stage, setStage] = useState(5);

  return (
    <Frame>
      <Eyebrow>Workflow Quality Improvement</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        Siklus disiplin menuju aplikasi{' '}
        <Highlight color={HIGHLIGHT_TEAL}>Production Ready</Highlight>.
      </h2>

      {/* 3x2 Interactive Workflow Grid */}
      <div
        style={{
          ...abs(X0, 232, W, 396),
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: '1fr 1fr',
          gap: 22,
        }}
      >
        <QualityStageTile
          num="01"
          title="Build Feature"
          sub="Integrasikan Google Auth & Mayar.id di atas fitur Sesi 3–5."
          active={stage === 0}
          onClick={() => setStage(0)}
        />
        <QualityStageTile
          num="02"
          title="End-to-End Testing"
          sub="Uji seluruh alur Customer, Payment Webhook, AI Chat, & Admin."
          active={stage === 1}
          onClick={() => setStage(1)}
        />
        <QualityStageTile
          num="03"
          title="Skill Audit"
          sub="Jalankan AI Skill untuk cek Security, Performance, SEO, & Bug."
          active={stage === 2}
          onClick={() => setStage(2)}
        />
        <QualityStageTile
          num="04"
          title="Refactor & Polish"
          sub="Perbaiki temuan audit, rapikan kode, & sempurnakan UI/UX."
          active={stage === 3}
          onClick={() => setStage(3)}
        />
        <QualityStageTile
          num="05"
          title="Retesting"
          sub="Uji ulang semua alur setelah perbaikan untuk pastikan nol regresi."
          active={stage === 4}
          onClick={() => setStage(4)}
        />
        <QualityStageTile
          num="06"
          title="Production Ready"
          sub="Aplikasi stabil, aman, & siap dipublikasikan ke pengguna nyata."
          active={stage === 5}
          onClick={() => setStage(5)}
        />
      </div>

      {/* Bottom Insight Panel */}
      <div
        style={{
          ...abs(X0, 672, W, 268),
          borderRadius: 26,
          background: INK_HEX,
          color: '#FFFFFF',
          padding: '32px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: YELLOW }}>
          KEY TAKEAWAY · AI AS QUALITY PARTNER
        </div>
        <div style={{ ...headline(42), color: '#FFFFFF', lineHeight: 1.2 }}>
          AI tidak hanya membantu membuat kode lebih cepat — AI juga membantu{' '}
          <span style={{ color: '#7CE8E4' }}>menjaga kualitas kode tetap bersih dan aman</span>.
        </div>
        <div style={{ fontFamily: MONO, fontSize: 17, color: '#D0CFCB' }}>
          Build ➔ Test ➔ Audit ➔ Refactor ➔ Retest ➔ Production Ready
        </div>
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 13 — DEMO MENTOR                                                       */
/* ============================================================================ */

const DemoRow = ({
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
    <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX, minWidth: 38 }}>
      {num}
    </span>
    <div>
      <span style={{ fontSize: 20, fontWeight: 740, color: INK }}>{title}: </span>
      <span style={{ fontSize: 19, color: BODY }}>{detail}</span>
    </div>
  </div>
);

const OutputCheckRow = ({ text }: { text: string }) => (
  <div
    style={{
      borderRadius: 14,
      background: 'rgba(255,255,255,0.08)',
      border: '1.5px solid rgba(255,255,255,0.14)',
      padding: '16px 20px',
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

const Slide13MentorDemo: Page = () => (
  <Frame>
    <Eyebrow>Demo Mentor · Live Walkthrough</Eyebrow>
    <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
      Live Demo: Menjadikan <Highlight color={HIGHLIGHT_TEAL}>UrbanStore</Highlight> siap rilis
      ke pengguna nyata.
    </h2>

    {/* Left Column */}
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
        <DemoRow
          num="01"
          title="Integrasi Google Login"
          detail="Setup Client ID di .env, pasang tombol login, & proteksi akses /admin."
        />
        <DemoRow
          num="02"
          title="Integrasi Mayar.id"
          detail="Setup API Key & buat endpoint payment link saat Customer checkout."
        />
        <DemoRow
          num="03"
          title="Simulasi Bayar & Webhook"
          detail="Uji pembayaran di Mayar.id dan lihat status order otomatis menjadi Lunas."
        />
        <DemoRow
          num="04"
          title="Testing Seluruh Flow"
          detail="Uji lengkap Google Login, Floating Chat AI, Cart, Bayar, sampai Admin AI."
        />
        <DemoRow
          num="05"
          title="Audit dengan AI Skill"
          detail="Jalankan Skill Audit untuk cek security .env, performance, & SEO."
        />
        <DemoRow
          num="06"
          title="Refactor & Git Commit"
          detail="Perbaiki temuan audit, retesting, dan commit perubahan ke Git."
        />
      </div>

      <div style={{ fontFamily: MONO, fontSize: 16, color: BODY }}>
        Repository: UrbanStore Web App (Lanjutan Sesi 5)
      </div>
    </div>

    {/* Right Column */}
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
          Hasil Penyempurnaan
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <OutputCheckRow text="Login menggunakan akun Google berhasil" />
          <OutputCheckRow text="Pembayaran Mayar.id sukses & status otomatis Lunas" />
          <OutputCheckRow text="Seluruh alur E2E Customer & Admin lulus uji" />
          <OutputCheckRow text="Skill Audit selesai & perbaikan diterapkan" />
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
        Lanjut cek Checklist Production Ready &amp; Praktik Peserta →
      </div>
    </div>
  </Frame>
);

/* ============================================================================ */
/* SLIDE 14 — CHECKLIST PRODUCTION READY                                        */
/* ============================================================================ */

const ProdCheckItem = ({
  code,
  title,
  desc,
  checked,
  onToggle,
}: {
  code: string;
  title: string;
  desc: string;
  checked: boolean;
  onToggle: () => void;
}) => (
  <div
    onClick={onToggle}
    className="s6-interactive"
    style={{
      borderRadius: 18,
      background: checked ? TINT_TEAL : '#FFFFFF',
      border: `2px solid ${checked ? TEAL_HEX : RULE}`,
      padding: '16px 22px',
      ...row,
      justifyContent: 'space-between',
      gap: 14,
    }}
  >
    <div style={{ ...row, gap: 16 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: checked ? TEAL_HEX : TINT_NEUTRAL,
          color: checked ? '#FFFFFF' : BODY,
          fontFamily: MONO,
          fontSize: 18,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {checked ? '✓' : code}
      </div>
      <div>
        <div style={{ fontSize: 20, fontWeight: 760, color: INK }}>{title}</div>
        <div style={{ fontSize: 16, color: BODY, marginTop: 2 }}>{desc}</div>
      </div>
    </div>
  </div>
);

const Slide14ProductionChecklist: Page = () => {
  const [checks, setChecks] = useState([true, true, true, true, true, true, true, true]);
  const toggle = (idx: number) =>
    setChecks((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  const passed = checks.filter(Boolean).length;

  return (
    <Frame>
      <Eyebrow>Checklist Production Ready</Eyebrow>
      <h2 style={{ ...abs(X0, 130, W), ...headline(50) }}>
        Pastikan seluruh poin terpenuhi{' '}
        <Highlight color={HIGHLIGHT_TEAL}>sebelum publikasi</Highlight>.
      </h2>

      {/* 2x4 Grid */}
      <div
        style={{
          ...abs(X0, 224, W, 556),
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'repeat(4, 1fr)',
          gap: 16,
        }}
      >
        <ProdCheckItem
          code="01"
          title="Google Authentication Berjalan"
          desc="Login Google lancar, profil checkout terisi, & rute /admin terproteksi."
          checked={checks[0]}
          onToggle={() => toggle(0)}
        />
        <ProdCheckItem
          code="02"
          title="Katalog, Size Picker & Cart Sinkron"
          desc="Varian S–XL dan subtotal keranjang sesuai stok produk nyata."
          checked={checks[1]}
          onToggle={() => toggle(1)}
        />
        <ProdCheckItem
          code="03"
          title="Checkout & Mayar.id Berhasil"
          desc="Nominal tagihan + ongkir cocok dan halaman bayar terbuka normal."
          checked={checks[2]}
          onToggle={() => toggle(2)}
        />
        <ProdCheckItem
          code="04"
          title="Webhook Real-Time Otomatis Lunas"
          desc="Status invoice & Dashboard Admin otomatis terupdate saat pembayaran sukses."
          checked={checks[3]}
          onToggle={() => toggle(3)}
        />
        <ProdCheckItem
          code="05"
          title="Floating Chat CS AI Akurat"
          desc="Menjawab stok, konsultasi BB/TB, & mix & match tanpa halusinasi."
          checked={checks[4]}
          onToggle={() => toggle(4)}
        />
        <ProdCheckItem
          code="06"
          title="Admin AI Tools Berjalan"
          desc="Generate deskripsi produk & dokumen analisis penjualan berfungsi rapi."
          checked={checks[5]}
          onToggle={() => toggle(5)}
        />
        <ProdCheckItem
          code="07"
          title="Responsive & UX Lengkap"
          desc="Nyaman di Mobile & Desktop lengkap dengan Empty, Loading, & Error state."
          checked={checks[6]}
          onToggle={() => toggle(6)}
        />
        <ProdCheckItem
          code="08"
          title="Bebas Error & Kredensial Aman"
          desc="Tidak ada error console dan seluruh API Key aman tersimpan di .env Backend."
          checked={checks[7]}
          onToggle={() => toggle(7)}
        />
      </div>

      {/* Bottom Insight Bar */}
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
        <div style={{ maxWidth: 1320, fontSize: 21, lineHeight: 1.4 }}>
          <strong style={{ color: YELLOW }}>Insight:</strong> Production Ready bukan berarti aplikasi
          sempurna tanpa ruang pengembangan, tetapi{' '}
          <strong style={{ color: '#7CE8E4' }}>seluruh alur utama berjalan stabil dan aman</strong>.
        </div>
        <span
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
          {passed} / 8 Ready
        </span>
      </div>
    </Frame>
  );
};

/* ============================================================================ */
/* SLIDE 15 — PRAKTIK & HANDS-ON SESSION (TO THE POINT)                         */
/* ============================================================================ */

const ActionStepCard = ({
  num,
  tag,
  title,
  action,
  tint,
  accent,
}: {
  num: string;
  tag: string;
  title: string;
  action: string;
  tint: string;
  accent: string;
}) => (
  <div
    style={{
      borderRadius: 20,
      background: tint,
      border: `2px solid ${accent}`,
      padding: '20px 26px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
    }}
  >
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 14,
        background: '#FFFFFF',
        border: `2px solid ${accent}`,
        color: accent,
        fontFamily: MONO,
        fontSize: 22,
        fontWeight: 780,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {num}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: MONO, fontSize: 14, fontWeight: 780, color: accent, marginBottom: 4 }}>
        {tag}
      </div>
      <div style={{ ...headline(25), marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 18, color: BODY, lineHeight: 1.35 }}>{action}</div>
    </div>
  </div>
);

const Slide15HandsOnSession: Page = () => (
  <Frame>
    <Eyebrow>Praktik &amp; Hands-on Session</Eyebrow>
    <h2 style={{ ...abs(X0, 128, W), ...headline(52) }}>
      Saatnya praktik! Jadikan <Highlight color={HIGHLIGHT_TEAL}>UrbanStore</Highlight> Production
      Ready.
    </h2>
    <p style={{ ...abs(X0, 200, 1400), margin: 0, fontSize: 23, color: BODY }}>
      Lanjutkan project UrbanStore dari Sesi 5 dan tuntaskan 6 langkah berikut:
    </p>

    {/* 2x3 Action Grid */}
    <div
      style={{
        ...abs(X0, 258, W, 520),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: 20,
      }}
    >
      <ActionStepCard
        num="01"
        tag="GOOGLE AUTHENTICATION"
        title="Pasang Google Login"
        action="Aktifkan Google OAuth untuk Customer & proteksi akses rute /admin."
        tint={TINT_BLUE}
        accent="#2B6CB0"
      />
      <ActionStepCard
        num="02"
        tag="PAYMENT GATEWAY"
        title="Integrasi Mayar.id + Webhook"
        action="Hubungkan Checkout ke Mayar.id dan update status otomatis menjadi Lunas."
        tint={TINT_TEAL}
        accent={TEAL_HEX}
      />
      <ActionStepCard
        num="03"
        tag="ENHANCEMENT UI/UX"
        title="Rapikan Detail & Validasi"
        action="Cek layout mobile/desktop, empty state, loading state, & validasi form."
        tint={TINT_YELLOW}
        accent="#946200"
      />
      <ActionStepCard
        num="04"
        tag="END-TO-END TESTING"
        title="Uji Seluruh Alur Aplikasi"
        action="Tes penuh dari Google Login, AI Chat, Cart, Bayar, sampai Admin."
        tint={TINT_GREEN}
        accent="#2F7A43"
      />
      <ActionStepCard
        num="05"
        tag="CODE QUALITY"
        title="Audit Menggunakan AI Skill"
        action="Audit Security, Performance, Accessibility, SEO, & Refactor kode."
        tint={TINT_PINK}
        accent={CORAL_HEX}
      />
      <ActionStepCard
        num="06"
        tag="FINALISASI"
        title="Perbaikan, Retest, & Git Commit"
        action="Bereskan seluruh temuan audit, uji ulang, lalu buat commit final."
        tint={TINT_NEUTRAL}
        accent={INK_HEX}
      />
    </div>

    {/* Compact CTA Banner */}
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
          TARGET AKHIR SESI 6
        </div>
        <div style={{ ...headline(32), color: '#FFFFFF' }}>
          UrbanStore siap dipublikasikan &amp; melayani transaksi nyata!
        </div>
      </div>
      <div
        style={{
          padding: '15px 28px',
          borderRadius: 14,
          background: TEAL_HEX,
          color: '#FFFFFF',
          fontSize: 21,
          fontWeight: 780,
          whiteSpace: 'nowrap',
        }}
      >
        Mulai Praktek →
      </div>
    </div>
  </Frame>
);

export const meta: SlideMeta = {
  title: '[VCB Batch 4] Sesi 6 - Payment Gateway, Enhancement & Code Quality',
  createdAt: '2026-11-13T14:44:09.969Z',
  theme: 'swiss-japanese',
};

export const notes: (string | undefined)[] = [
  `Selamat datang di Sesi 6 Vibe Coding Bootcamp Batch 4: Payment Gateway, Enhancement & Code Quality (From MVP to Production Ready).`,
  `Hari ini kita bukan menambah banyak fitur baru, tetapi menyempurnakan UrbanStore agar terasa seperti produk e-commerce sungguhan yang siap menerima transaksi nyata.`,
  `Review progres Sesi 3–5: UrbanStore sudah punya Landing Page, Store Admin, Katalog, Cart, Checkout manual, Floating Chat CS AI, dan Admin AI Tools. Hari ini kita lengkapi Google Auth, Mayar.id, Testing, dan Code Quality.`,
  `Mengapa pakai Google Login? Mengurangi friction saat checkout, auto-fill profil, menyimpan riwayat order lintas perangkat, sekaligus melindungi akses /admin.`,
  `Tunjukkan 5 langkah integrasi Google OAuth: Cloud Console, simpan Client ID & Secret di .env Backend, pasang tombol login, verifikasi session, dan redirect sesuai role.`,
  `Bandingkan transfer manual Sesi 4 (validasi MVP) dengan Payment Gateway Mayar.id Sesi 6: pembayaran terverifikasi otomatis 24/7 lewat QRIS, Virtual Account, maupun E-Wallet.`,
  `Jelaskan 5 tahap integrasi Mayar.id: simpan API Key & Webhook Secret di .env Backend, generate Payment Link, redirect customer, terima Webhook Callback, dan update status Lunas otomatis.`,
  `Pahami arsitektur transaksi real-time: Webhook Callback memastikan status di Invoice Customer dan Dashboard Admin langsung sinkron seketika tanpa Admin mengecek mutasi bank.`,
  `Enhancement Project: perbaiki detail yang sering terlewat seperti responsive mobile, empty state keranjang/pencarian, skeleton loading, validasi form checkout, dan performa gambar.`,
  `End-to-End Testing: jangan hanya mengetes satu halaman! Uji perjalanan lengkap mulai dari Landing Page, Google Login, Floating Chat CS, Cart, Bayar Mayar.id, Webhook Lunas, sampai Admin AI & Logout.`,
  `Gunakan AI Skill untuk mengaudit 6 aspek kualitas: Security (.env & webhook), Performance, Accessibility, Refactor, Testing edge case, dan SEO.`,
  `Terapkan siklus Quality Improvement: Build -> E2E Test -> Skill Audit -> Refactor -> Retest -> Production Ready.`,
  `Lakukan Live Demo mentor: integrasi Google Login, integrasi Mayar.id, simulasi pembayaran & webhook update status, uji flow penuh, dan jalankan Skill Audit.`,
  `Verifikasi 8 poin Checklist Production Ready bersama peserta sebelum rilis. Tekankan bahwa Production Ready berarti seluruh alur utama stabil, aman, dan siap melayani pengguna nyata.`,
  `Saatnya Hands-on Session! Ajak peserta melanjutkan repository UrbanStore Sesi 5 dengan 6 langkah praktis hingga Production Ready.`,
];

export default [
  Slide01Cover,
  Slide02Objectives,
  Slide03UrbanStoreScope,
  Slide04GoogleAuth,
  Slide05GoogleAuthSteps,
  Slide06ManualVsMayar,
  Slide07MayarIntegrationSteps,
  Slide08RealtimeArchitecture,
  Slide09EnhancementProject,
  Slide10EndToEndTesting,
  Slide11CodeQualitySkill,
  Slide12QualityWorkflow,
  Slide13MentorDemo,
  Slide14ProductionChecklist,
  Slide15HandsOnSession,
] satisfies Page[];

