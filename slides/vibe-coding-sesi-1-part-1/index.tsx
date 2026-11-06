import {
  type DesignSystem,
  MorphElement,
  type Page,
  type SlideMeta,
  type SlideTransition,
  Step,
  Steps,
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
  typeScale: { hero: 136, body: 32 },
  radius: 24,
};

const SLIDE_ID = 'vibe-coding-sesi-1-part-1';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..800&family=Newsreader:ital,opsz,wght@1,6..72,400&family=JetBrains+Mono:wght@500;700&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;
const KEYFRAMES = `
@keyframes fw-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes fw-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes fw-rise { from { transform: scaleY(0) } to { transform: scaleY(1) } }
@keyframes fw-grow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
.fw-interactive { transition: transform 0.2s cubic-bezier(0, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0, 0, 0.2, 1); cursor: pointer; user-select: none; }
.fw-interactive:hover { transform: translateY(-3px); }
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
const RULE = 'rgba(25,25,25,0.12)';
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
const MORPH_MS = 760;

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

const morphTransition: SlideTransition = {
  duration: 280,
  exit: { duration: 300, easing: EASE_IN, keyframes: HOLD },
  enter: { duration: 300, easing: EASE_OUT, keyframes: [{ opacity: 0 }, { opacity: 1 }] },
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
  letterSpacing: size >= 100 ? '-0.04em' : '-0.03em',
  wordSpacing: '0.04em',
});

const Ink = ({
  width,
  height,
  viewBox,
  style,
  wobble = 2.2,
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
    <Stroke d={loopPath(w, h)} color={color} width={3.6} live={live} delay={delay} dur={0.8} />
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
    <Stroke
      d={`M32 32C${w * 0.4} 22 ${w * 0.72} 34 ${w - 42} 26`}
      color={color}
      live={live}
      delay={delay + 0.2}
      width={2.4}
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

const Mark = ({ size = 24 }: { size?: number }) => (
  <svg
    aria-hidden
    width={size}
    height={size}
    viewBox="0 0 28 28"
    style={{ display: 'block' }}
  >
    <rect x="2" y="2" width="24" height="24" rx="7" fill={INK_HEX} />
    <path
      d="M17 9.5C15.6 8.3 13.7 8.1 12 8.9C10 9.8 8.8 11.8 8.8 14C8.8 16.2 10 18.2 12 19.1C13.7 19.9 15.6 19.7 17 18.5"
      stroke="#FFFEFC"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="19" cy="14" r="2.5" fill={TEAL_HEX} />
  </svg>
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
        <span>Vibe Coding Bootcamp · Batch 4 · Sesi 1 Part 1</span>
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
  top = 112,
  color = TEAL,
}: {
  children: ReactNode;
  top?: number;
  color?: string;
}) => (
  <div
    style={{
      ...abs(X0, top),
      fontSize: 26,
      fontWeight: 680,
      color,
      letterSpacing: '-0.01em',
    }}
  >
    {children}
  </div>
);

const CheckMark = ({ color = TEAL_HEX }: { color?: string }) => (
  <Ink width={30} height={30} wobble={1.4}>
    <path d="M5 16L12 23L26 6" stroke={color} strokeWidth={3.6} />
  </Ink>
);

const CrossMark = ({ color = CORAL_HEX, live = false }: { color?: string; live?: boolean }) => (
  <Ink width={30} height={30} wobble={1.4}>
    <Stroke d="M7 7L23 23M23 7L7 23" color={color} width={3.6} live={live} delay={0.3} dur={0.4} />
  </Ink>
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

const Figure = ({ x, y, shirt }: { x: number; y: number; shirt: string }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M-34 -86L-30 -4L-6 -4L0 -58L6 -4L30 -4L34 -86Z" fill={INK_HEX} />
    <path d="M-30 -3L-40 -2M30 -3L40 -2" />
    <path d="M-32 -160Q0 -171 32 -160L38 -84L-38 -84Z" fill={shirt} />
    <path d="M-31 -155Q-52 -120 -42 -90" />
    <path d="M31 -155Q54 -132 30 -112" />
    <path d="M4 -144L38 -148L42 -100L8 -96Z" fill="#FFFFFF" />
    <path d="M16 -136h16M17 -124h14M18 -112h9" strokeWidth={2.4} />
    <path d="M0 -175L0 -163" />
    <circle cx="0" cy="-202" r="27" fill="#FFFFFF" />
    <path
      d="M-28 -202Q-31 -233 0 -233Q31 -233 28 -205Q18 -216 2 -213Q-14 -213 -28 -202Z"
      fill={INK_HEX}
    />
    <circle cx="-9" cy="-198" r="2.6" fill={INK_HEX} stroke="none" />
    <circle cx="9" cy="-198" r="2.6" fill={INK_HEX} stroke="none" />
    <path d="M-7 -186Q0 -181 7 -186" strokeWidth={2.6} />
  </g>
);

// ============================================================================
// SLIDE 01 — Cover (Fieldwork Cover layout + Doodle illustration)
// ============================================================================
const CoverArt = ({ live }: { live: boolean }) => (
  <Ink width={820} height={700} style={abs(980, 150)}>
    <circle cx="430" cy="340" r="245" fill={TINT_TEAL} stroke="none" />
    <circle cx="560" cy="210" r="110" fill={YELLOW} stroke="none" />
    {/* Browser / Terminal Window Doodle */}
    <rect x="80" y="190" width="480" height="330" rx="18" fill="#FFFFFF" />
    <path d="M80 242H560" />
    <circle cx="114" cy="216" r="7" fill={CORAL_HEX} stroke="none" />
    <circle cx="138" cy="216" r="7" fill={YELLOW} stroke="none" />
    <circle cx="162" cy="216" r="7" fill={GREEN} stroke="none" />
    {/* Prompt box inside window */}
    <rect x="112" y="270" width="416" height="84" rx="10" fill={TINT_TEAL} />
    <path d="M136 300h180M136 326h280" stroke={TEAL_HEX} strokeWidth={3.4} />
    {/* Generated UI Cards inside window */}
    <rect x="112" y="378" width="126" height="110" rx="10" fill={TINT_YELLOW} />
    <rect x="257" y="378" width="126" height="110" rx="10" fill={TINT_PINK} />
    <rect x="402" y="378" width="126" height="110" rx="10" fill={TINT_BLUE} />
    <path d="M132 456h76M277 456h76M422 456h76" strokeWidth={2.8} />
    {/* Sparkles & Developer Figure */}
    <Sparkle x={640} y={130} s={1.15} fill={YELLOW} />
    <Sparkle x={150} y={120} s={0.75} fill={TEAL_HEX} />
    <Sparkle x={680} y={290} s={0.7} fill={PINK} />
    <Figure x={680} y={610} shirt={TEAL_HEX} />
    <path d="M30 612Q300 606 560 610T800 609" />
    <Stroke
      d="M520 140C580 110 630 150 610 210M610 210L594 192M610 210L628 196"
      color={CORAL_HEX}
      live={live}
      delay={0.5}
    />
  </Ink>
);

const Slide01Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <Frame hideFooter>
      <div style={{ ...abs(X0, 100), ...row, gap: 16 }}>
        <CodepolitanLogo height={42} />
        <span
          style={{
            marginLeft: 8,
            padding: '6px 18px',
            borderRadius: 99,
            background: TINT_TEAL,
            color: TEAL_HEX,
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          Batch 4 · Sesi 1 — PART 1
        </span>
      </div>

      <h1 style={{ ...abs(X0, 226, 920), ...headline(128), fontSize: 'var(--osd-size-hero)' }}>
        Vibe Coding
        <br />
        Bootcamp.
      </h1>

      <p
        style={{
          ...abs(X0, 560, 820),
          margin: 0,
          fontSize: 36,
          lineHeight: 1.42,
          color: BODY,
        }}
      >
        Intro to <Highlight color={HIGHLIGHT_TEAL}>Vibe Coding</Highlight>,{' '}
        <Highlight>Prompt Engineering</Highlight> &amp; AI Workflow.
      </p>

      <div style={{ ...abs(X0, 720, 780), fontSize: 26, lineHeight: 1.5, color: BODY }}>
        Berpikir seperti developer dan berkomunikasi dengan AI untuk membangun produk nyata:{' '}
        <span style={{ color: INK, fontWeight: 700 }}>UrbanStore</span>.
      </div>

      <div style={{ ...abs(X0, 860), ...row, gap: 14 }}>
        <span
          style={{
            padding: '10px 20px',
            borderRadius: 99,
            background: TINT_TEAL,
            fontSize: 21,
            fontWeight: 720,
            color: TEAL_HEX,
          }}
        >
          01 · Vibe Coding Mindset
        </span>
        <span
          style={{
            padding: '10px 20px',
            borderRadius: 99,
            background: TINT_YELLOW,
            fontSize: 21,
            fontWeight: 720,
            color: '#9E6B0E',
          }}
        >
          02 · RTF · RTCF · RISE
        </span>
        <span
          style={{
            padding: '10px 20px',
            borderRadius: 99,
            background: TINT_PINK,
            fontSize: 21,
            fontWeight: 720,
            color: CORAL_HEX,
          }}
        >
          03 · Systematic AI Workflow
        </span>
      </div>

      <CoverArt live={live} />
      <CircleDoodle x={98} y={346} w={660} h={164} color={CORAL_HEX} live={live} delay={0.45} />
    </Frame>
  );
};

// ============================================================================
// SLIDE 02 — Learning Objectives (Fieldwork ?p=3 Scorecard layout!)
// ============================================================================
const ObjectiveScoreRow = ({
  top,
  code,
  title,
  sub,
  tag,
  accent = false,
  active = false,
  onClick,
}: {
  top: number;
  code: string;
  title: string;
  sub: string;
  tag: string;
  accent?: boolean;
  active?: boolean;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className="fw-interactive"
    style={{
      ...abs(760, top, 1040, 124),
      borderTop: `1.5px solid ${RULE}`,
      background: active ? TINT_TEAL : 'transparent',
      borderRadius: active ? 12 : 0,
      padding: '0 16px',
    }}
  >
    <div
      style={{
        ...abs(16, 22, 620),
        fontSize: 26,
        fontWeight: 680,
        letterSpacing: '-0.015em',
        color: INK,
        whiteSpace: 'nowrap',
      }}
    >
      {title}
    </div>
    <div style={{ ...abs(16, 68, 620), fontSize: 21, color: SOFT, whiteSpace: 'nowrap' }}>
      {sub}
    </div>
    <div
      style={{
        ...abs(650, 28, 120),
        textAlign: 'right',
        fontSize: 54,
        fontWeight: 780,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        color: accent ? CORAL_HEX : INK,
      }}
    >
      {code}
    </div>
    <div
      style={{
        ...abs(810, 42, 210),
        ...row,
        gap: 10,
        fontSize: 22,
        fontWeight: 680,
        color: accent ? CORAL_HEX : BODY,
        whiteSpace: 'nowrap',
      }}
    >
      <CheckMark color={accent ? CORAL_HEX : TEAL_HEX} />
      <span>{tag}</span>
    </div>
  </div>
);

const Slide02Objectives: Page = () => {
  const live = useIsActivePage();
  const [selected, setSelected] = useState(3);

  return (
    <Frame>
      <Eyebrow>Learning objectives</Eyebrow>
      <h2 style={{ ...abs(X0, 160, 580), ...headline(96), lineHeight: 0.98 }}>
        Enam target
        <br />
        sesi ini.
      </h2>
      <p
        style={{
          ...abs(X0, 396, 560),
          margin: 0,
          fontSize: 27,
          lineHeight: 1.5,
          color: BODY,
        }}
      >
        Hari ini kita tidak sekadar belajar menggunakan AI untuk membuat aplikasi. Kita belajar{' '}
        <Highlight>berpikir seperti developer</Highlight> dan berkomunikasi dengan AI untuk
        membangun sebuah produk.
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

      <ObjectiveScoreRow
        top={150}
        code="01"
        title="Memahami konsep dan cara kerja Vibe Coding"
        sub="Paradigma AI sebagai partner pengembangan software"
        tag="Mindset"
        active={selected === 0}
        onClick={() => setSelected(0)}
      />
      <ObjectiveScoreRow
        top={274}
        code="02"
        title="Memahami bagaimana AI memproses prompt"
        sub="Context, Instruction, Pattern Recognition & Prediction"
        tag="LLM Core"
        active={selected === 1}
        onClick={() => setSelected(1)}
      />
      <ObjectiveScoreRow
        top={398}
        code="03"
        title="Menulis prompt yang jelas, terstruktur & efektif"
        sub="Role, Task, Context, Output, Rules & Constraints"
        tag="Clarity"
        active={selected === 2}
        onClick={() => setSelected(2)}
      />
      <ObjectiveScoreRow
        top={522}
        code="04"
        title="Menggunakan formula RTF, RTCF, dan RISE"
        sub="Tiga kerangka kerja utama sesuai kompleksitas task"
        tag="Key Formula"
        accent
        active={selected === 3}
        onClick={() => setSelected(3)}
      />
      <ObjectiveScoreRow
        top={646}
        code="05"
        title="Membangun workflow AI Coding yang sistematis"
        sub="Understand → Plan → Prompt → Generate → Review → Iterate"
        tag="Workflow"
        active={selected === 4}
        onClick={() => setSelected(4)}
      />
      <ObjectiveScoreRow
        top={770}
        code="06"
        title="Mengubah kebutuhan project menjadi instruksi AI"
        sub="Studi kasus e-commerce fashion modern: UrbanStore"
        tag="Product"
        accent
        active={selected === 5}
        onClick={() => setSelected(5)}
      />
      <div style={{ ...abs(760, 894, 1040), borderTop: `1.5px solid ${RULE}` }} />
      <CircleDoodle x={1476} y={540} w={90} h={82} color={CORAL_HEX} live={live} delay={0.5} />
    </Frame>
  );
};

// ============================================================================
// SLIDE 03 — What is Vibe Coding? (Fieldwork Summary + Interactive Flow)
// ============================================================================
const VibeFlowCard = ({
  code,
  title,
  desc,
  tint,
  selected,
  onClick,
}: {
  code: string;
  title: string;
  desc: string;
  tint: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="fw-interactive"
    style={{
      flex: 1,
      borderRadius: 24,
      background: tint,
      padding: '26px 26px',
      position: 'relative',
      boxShadow: selected ? `inset 0 0 0 3px ${INK_HEX}` : 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ ...row, justifyContent: 'space-between' }}>
      <span style={{ fontSize: 22, fontWeight: 750, color: SOFT }}>{code}</span>
      <span style={{ fontSize: 24, fontWeight: 700, color: INK }}>→</span>
    </div>
    <div>
      <div style={{ ...headline(40), marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 23, lineHeight: 1.38, color: BODY }}>{desc}</div>
    </div>
  </div>
);

const Slide03WhatIsVibeCoding: Page = () => {
  const live = useIsActivePage();
  const [activeStep, setActiveStep] = useState(1);

  return (
    <Frame>
      <Eyebrow>What is Vibe Coding?</Eyebrow>
      <h2 style={{ ...abs(X0, 160), ...headline(104) }}>Apa itu Vibe Coding?</h2>
      <p
        style={{
          ...abs(X0, 296, 1340),
          margin: 0,
          fontSize: 32,
          lineHeight: 1.48,
          color: BODY,
        }}
      >
        Vibe Coding adalah pendekatan pengembangan software dengan memanfaatkan{' '}
        <Highlight color={HIGHLIGHT_TEAL}>AI sebagai partner</Highlight> untuk menerjemahkan ide,
        instruksi, dan kebutuhan menjadi sebuah aplikasi. Kita tidak harus menulis seluruh kode
        secara manual — sebaliknya kita fokus pada:
      </p>

      {/* 5 Interactive Cards */}
      <div style={{ ...abs(X0, 466, W, 270), display: 'flex', gap: 22 }}>
        <VibeFlowCard
          code="01"
          title="Idea"
          desc="Menentukan ide dan tujuan aplikasi."
          tint={TINT_YELLOW}
          selected={activeStep === 0}
          onClick={() => setActiveStep(0)}
        />
        <VibeFlowCard
          code="02"
          title="Prompt"
          desc="Mengomunikasikan kebutuhan kepada AI."
          tint={TINT_TEAL}
          selected={activeStep === 1}
          onClick={() => setActiveStep(1)}
        />
        <VibeFlowCard
          code="03"
          title="Generate"
          desc="Membiarkan AI membantu menghasilkan kode."
          tint={TINT_BLUE}
          selected={activeStep === 2}
          onClick={() => setActiveStep(2)}
        />
        <VibeFlowCard
          code="04"
          title="Review"
          desc="Memeriksa hasil yang dibuat AI."
          tint={TINT_PINK}
          selected={activeStep === 3}
          onClick={() => setActiveStep(3)}
        />
        <VibeFlowCard
          code="05"
          title="Improve"
          desc="Melakukan iterasi dan perbaikan."
          tint={TINT_GREEN}
          selected={activeStep === 4}
          onClick={() => setActiveStep(4)}
        />
      </div>

      {/* Visual Flow Bar */}
      <div
        style={{
          ...abs(X0, 772, 1080),
          ...row,
          gap: 14,
          fontSize: 23,
          fontWeight: 750,
          letterSpacing: '-0.01em',
        }}
      >
        <span>IDEA</span>
        <span style={{ color: SOFT }}>→</span>
        <span style={{ color: TEAL_HEX }}>PROMPT</span>
        <span style={{ color: SOFT }}>→</span>
        <span>AI GENERATE</span>
        <span style={{ color: SOFT }}>→</span>
        <span>REVIEW</span>
        <span style={{ color: SOFT }}>→</span>
        <span>IMPROVE</span>
        <span style={{ color: SOFT }}>→</span>
        <Highlight>WORKING PRODUCT</Highlight>
      </div>

      <UnderlineDoodle x={X0} y={806} w={1020} color={TEAL_HEX} live={live} delay={0.5} />

      <div
        style={{
          ...abs(X0, 862, 1560),
          fontSize: 27,
          lineHeight: 1.42,
          color: BODY,
        }}
      >
        <span style={{ color: INK, fontWeight: 720 }}>Catatan Penting:</span> Vibe Coding bukan
        berarti berhenti menjadi developer. Justru kita harus mampu{' '}
        <span style={{ color: INK, fontWeight: 680 }}>
          mengarahkan, mengevaluasi, dan mengontrol
        </span>{' '}
        hasil pekerjaan AI.
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 04 — Mengapa Prompt Engineering Penting? (Fieldwork Learnings layout)
// ============================================================================
const PromptCompareArt = ({
  live,
  mode,
  setMode,
}: {
  live: boolean;
  mode: 'bad' | 'good';
  setMode: (m: 'bad' | 'good') => void;
}) => (
  <div style={abs(1060, 160, 740, 740)}>
    {/* Mode switcher pill */}
    <div style={{ ...row, gap: 14, marginBottom: 24 }}>
      <div
        onClick={() => setMode('bad')}
        className="fw-interactive"
        style={{
          padding: '12px 24px',
          borderRadius: 99,
          background: mode === 'bad' ? TINT_PINK : '#F3F2EE',
          boxShadow: mode === 'bad' ? `inset 0 0 0 2.5px ${INK_HEX}` : 'none',
          fontSize: 22,
          fontWeight: 720,
        }}
      >
        Bad Prompt
      </div>
      <div
        onClick={() => setMode('good')}
        className="fw-interactive"
        style={{
          padding: '12px 24px',
          borderRadius: 99,
          background: mode === 'good' ? TINT_GREEN : '#F3F2EE',
          boxShadow: mode === 'good' ? `inset 0 0 0 2.5px ${INK_HEX}` : 'none',
          fontSize: 22,
          fontWeight: 720,
        }}
      >
        Good Prompt
      </div>
      <span style={{ fontSize: 20, color: SOFT, marginLeft: 8 }}>← Klik untuk coba</span>
    </div>

    {/* Bad Prompt Card */}
    <div
      onClick={() => setMode('bad')}
      className="fw-interactive"
      style={{
        borderRadius: 24,
        background: TINT_PINK,
        padding: '26px 32px',
        marginBottom: 22,
        opacity: mode === 'bad' ? 1 : 0.65,
        boxShadow: mode === 'bad' ? `inset 0 0 0 2.5px ${CORAL_HEX}` : 'none',
      }}
    >
      <div style={{ ...row, justifyContent: 'space-between' }}>
        <span style={{ fontSize: 20, fontWeight: 750, color: CORAL_HEX }}>01 · TANPA ARAHAN</span>
        <CrossMark live={live} />
      </div>
      <div style={{ ...headline(34), marginTop: 12, whiteSpace: 'nowrap' }}>
        BAD PROMPT <span style={{ color: SOFT, fontWeight: 400 }}>→</span>{' '}
        <span style={{ color: CORAL_HEX }}>VAGUE OUTPUT</span>
      </div>
      <div style={{ fontSize: 23, color: BODY, marginTop: 12, lineHeight: 1.42 }}>
        Ketika informasi tidak lengkap, AI membuat asumsi sendiri dan menghasilkan output yang
        kabur.
      </div>
    </div>

    {/* Good Prompt Card */}
    <div
      onClick={() => setMode('good')}
      className="fw-interactive"
      style={{
        borderRadius: 24,
        background: TINT_GREEN,
        padding: '26px 32px',
        opacity: mode === 'good' ? 1 : 0.65,
        boxShadow: mode === 'good' ? `inset 0 0 0 2.5px ${TEAL_HEX}` : 'none',
      }}
    >
      <div style={{ ...row, justifyContent: 'space-between' }}>
        <span style={{ fontSize: 20, fontWeight: 750, color: '#2F6F4E' }}>
          02 · INSTRUKSI JELAS
        </span>
        <CheckMark color="#2F6F4E" />
      </div>
      <div style={{ ...headline(34), marginTop: 12, whiteSpace: 'nowrap' }}>
        GOOD PROMPT <span style={{ color: SOFT, fontWeight: 400 }}>→</span>{' '}
        <span style={{ color: '#2F6F4E' }}>BETTER OUTPUT</span>
      </div>
      <div style={{ fontSize: 23, color: BODY, marginTop: 12, lineHeight: 1.42 }}>
        Semakin baik prompt yang diberikan, semakin relevan dan presisi output yang dihasilkan.
      </div>
    </div>

    {/* Hand-drawn summary note */}
    <div style={{ marginTop: 32, position: 'relative' }}>
      <div style={{ ...headline(44), letterSpacing: '-0.03em', whiteSpace: 'nowrap' }}>
        Better Prompt = <Highlight color={HIGHLIGHT_TEAL}>Better Output</Highlight>
      </div>
    </div>
  </div>
);

const Slide04WhyPromptMatters: Page = () => {
  const live = useIsActivePage();
  const [mode, setMode] = useState<'bad' | 'good'>('good');

  return (
    <Frame>
      <Eyebrow color={CORAL_HEX}>Mengapa Prompt Engineering Penting?</Eyebrow>
      <blockquote
        style={{
          ...abs(X0, 160, 860),
          margin: 0,
          fontFamily: SERIF,
          fontStyle: 'italic',
          fontSize: 72,
          lineHeight: 1.12,
          letterSpacing: '-0.01em',
        }}
      >
        “AI-nya kurang pintar.”
      </blockquote>
      <div style={{ ...abs(X0, 268, 860), fontSize: 24, lineHeight: 1.4, color: BODY }}>
        Kalimat yang paling sering diucapkan —{' '}
        <span style={{ color: INK, fontWeight: 680 }}>
          padahal instruksi kita yang bisa jadi masalahnya.
        </span>
      </div>

      <div style={{ ...abs(X0, 344, 860), borderTop: `1.5px solid ${RULE}` }} />

      <div style={{ ...abs(X0, 386, 860), display: 'flex', gap: 26 }}>
        <div
          style={{
            width: 110,
            ...headline(64),
            color: CORAL_HEX,
            letterSpacing: '-0.04em',
          }}
        >
          01
        </div>
        <div style={{ flex: 1, fontSize: 28, lineHeight: 1.42, color: BODY, paddingTop: 4 }}>
          Padahal yang sering terjadi adalah:{' '}
          <Highlight color={HIGHLIGHT_PINK}>Prompt yang diberikan tidak cukup jelas.</Highlight>
        </div>
      </div>

      <div style={{ ...abs(X0, 536, 860), display: 'flex', gap: 26 }}>
        <div style={{ width: 110, ...headline(64), letterSpacing: '-0.04em' }}>02</div>
        <div style={{ flex: 1, fontSize: 28, lineHeight: 1.42, color: BODY, paddingTop: 4 }}>
          AI bekerja berdasarkan informasi dan instruksi yang diberikan. Ketika informasi tidak
          lengkap, <span style={{ color: INK, fontWeight: 680 }}>AI membuat asumsi sendiri.</span>
        </div>
      </div>

      <div style={{ ...abs(X0, 696, 860), display: 'flex', gap: 26 }}>
        <div
          style={{
            width: 110,
            ...headline(64),
            color: TEAL_HEX,
            letterSpacing: '-0.04em',
          }}
        >
          03
        </div>
        <div style={{ flex: 1, fontSize: 28, lineHeight: 1.42, color: BODY, paddingTop: 4 }}>
          Semakin baik prompt yang diberikan:{' '}
          <Highlight color={HIGHLIGHT_TEAL}>Semakin relevan output yang dihasilkan.</Highlight>
        </div>
      </div>

      <PromptCompareArt live={live} mode={mode} setMode={setMode} />
    </Frame>
  );
};

// ============================================================================
// SLIDE 05 — Cara AI Memahami Prompt (Scorecard + Interactive Prompt Toggle)
// ============================================================================
const LlmRow = ({
  top,
  num,
  title,
  desc,
}: {
  top: number;
  num: string;
  title: string;
  desc: string;
}) => (
  <div style={{ ...abs(X0, top, 760, 114), borderTop: `1.5px solid ${RULE}`, ...row, gap: 24 }}>
    <div style={{ width: 72, ...headline(48), color: TEAL_HEX }}>{num}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 30, fontWeight: 720, letterSpacing: '-0.015em' }}>{title}</div>
      <div style={{ fontSize: 22, color: BODY, marginTop: 4, lineHeight: 1.35 }}>{desc}</div>
    </div>
  </div>
);

const Slide05HowAIUnderstands: Page = () => {
  const live = useIsActivePage();
  const [isClear, setIsClear] = useState(true);

  return (
    <Frame>
      <Eyebrow>Cara AI Memahami Prompt</Eyebrow>
      <h2 style={{ ...abs(X0, 154, 680), ...headline(68), lineHeight: 1.04 }}>
        AI tidak bisa
        <br />
        membaca pikiran kita.
      </h2>
      <UnderlineDoodle x={X0} y={306} w={420} color={TEAL_HEX} live={live} delay={0.5} />
      <p style={{ ...abs(X0, 344, 700), margin: 0, fontSize: 25, lineHeight: 1.45, color: BODY }}>
        Large Language Model (LLM) memproses teks berdasarkan konteks dan pola bahasa untuk{' '}
        <Highlight>memprediksi token berikutnya</Highlight>:
      </p>

      <LlmRow top={446} num="01" title="Context" desc="Informasi yang diberikan kepada AI." />
      <LlmRow
        top={558}
        num="02"
        title="Instruction"
        desc="Perintah atau tugas yang harus dilakukan."
      />
      <LlmRow
        top={670}
        num="03"
        title="Pattern Recognition"
        desc="AI mengenali pola berdasarkan konteks & pengetahuan."
      />
      <LlmRow
        top={782}
        num="04"
        title="Prediction"
        desc="AI menghasilkan respons berdasarkan probabilitas."
      />
      <div style={{ ...abs(X0, 894, 760), borderTop: `1.5px solid ${RULE}` }} />

      {/* Right Interactive Prompt Box */}
      <div style={abs(960, 154, 840, 770)}>
        <div style={{ ...row, justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontSize: 25, fontWeight: 740 }}>Contoh Prompt: UrbanStore</div>
          <div style={{ ...row, gap: 12 }}>
            <div
              onClick={() => setIsClear(false)}
              className="fw-interactive"
              style={{
                padding: '10px 20px',
                borderRadius: 99,
                background: !isClear ? TINT_PINK : '#F3F2EE',
                boxShadow: !isClear ? `inset 0 0 0 2px ${INK_HEX}` : 'none',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Prompt Kurang Jelas
            </div>
            <div
              onClick={() => setIsClear(true)}
              className="fw-interactive"
              style={{
                padding: '10px 20px',
                borderRadius: 99,
                background: isClear ? TINT_TEAL : '#F3F2EE',
                boxShadow: isClear ? `inset 0 0 0 2px ${INK_HEX}` : 'none',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Prompt Lebih Jelas
            </div>
          </div>
        </div>

        {!isClear ? (
          <div
            style={{
              borderRadius: 24,
              background: TINT_PINK,
              padding: 40,
              height: 680,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: 22, fontWeight: 720, color: CORAL_HEX }}>
                PROMPT KURANG JELAS
              </div>
              <blockquote
                style={{
                  margin: '24px 0',
                  fontFamily: SERIF,
                  fontStyle: 'italic',
                  fontSize: 64,
                  lineHeight: 1.15,
                }}
              >
                “Buatkan website toko online.”
              </blockquote>
              <p style={{ fontSize: 28, lineHeight: 1.5, color: BODY, marginTop: 28 }}>
                Jika prompt kurang jelas, AI akan membuat asumsi sendiri berdasarkan informasi yang
                tersedia.
              </p>
            </div>

            <div
              style={{
                borderRadius: 18,
                background: '#FFFFFF',
                padding: 28,
                boxShadow: `inset 0 0 0 2px ${INK_HEX}`,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 750, color: CORAL_HEX }}>DAMPAKNYA:</div>
              <div style={{ fontSize: 26, color: INK, marginTop: 8, lineHeight: 1.4 }}>
                AI bebas menentukan sendiri desain, fitur, struktur halaman, dan pengalaman
                pengguna.
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              borderRadius: 24,
              background: TINT_TEAL,
              padding: 40,
              height: 680,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: 22, fontWeight: 720, color: TEAL_HEX }}>
                PROMPT LEBIH JELAS
              </div>
              <div
                style={{
                  marginTop: 20,
                  fontSize: 28,
                  lineHeight: 1.52,
                  color: INK,
                  fontWeight: 560,
                }}
              >
                “Buatkan website toko online bernama <Highlight>UrbanStore</Highlight> yang menjual
                produk fashion pria dan wanita. Gunakan{' '}
                <Highlight color="#FFFFFF">desain modern minimalis</Highlight> dengan dominasi warna
                hitam dan putih. Website harus memiliki{' '}
                <Highlight>
                  homepage, katalog produk, detail produk, shopping cart, dan checkout
                </Highlight>
                . Gunakan <Highlight color="#FFFFFF">React dan Tailwind CSS</Highlight> dengan
                desain responsive.”
              </div>
            </div>

            <div
              style={{
                borderRadius: 18,
                background: '#FFFFFF',
                padding: 28,
                boxShadow: `inset 0 0 0 2px ${INK_HEX}`,
              }}
            >
              <div style={{ ...row, gap: 12 }}>
                <CheckMark color={TEAL_HEX} />
                <span style={{ fontSize: 22, fontWeight: 750, color: TEAL_HEX }}>HASILNYA:</span>
              </div>
              <div style={{ fontSize: 26, color: INK, marginTop: 8, lineHeight: 1.4 }}>
                AI mendapatkan konteks dan arahan yang jauh lebih jelas.
              </div>
            </div>
          </div>
        )}
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 06 — Anatomy of a Good Prompt (Fieldwork Bets Card Grid)
// ============================================================================
const AnatomyCard = ({
  x,
  tint,
  index,
  tag,
  question,
  example,
}: {
  x: number;
  tint: string;
  index: string;
  tag: string;
  question: string;
  example: string;
}) => (
  <div
    className="fw-interactive"
    style={{
      ...abs(x, 340, 396, 510),
      borderRadius: 24,
      background: tint,
      padding: 36,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div>
      <div style={{ ...row, justifyContent: 'space-between' }}>
        <span style={{ fontSize: 24, fontWeight: 750, color: SOFT }}>{index}</span>
        <span
          style={{
            padding: '6px 14px',
            borderRadius: 99,
            background: '#FFFFFF',
            boxShadow: `inset 0 0 0 2px ${INK_HEX}`,
            fontSize: 18,
            fontWeight: 750,
          }}
        >
          {tag}
        </span>
      </div>
      <div style={{ ...headline(52), marginTop: 28 }}>{tag}</div>
      <p style={{ margin: '18px 0 0', fontSize: 27, lineHeight: 1.4, color: BODY }}>{question}</p>
    </div>

    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 16,
        padding: '20px 22px',
        boxShadow: `inset 0 0 0 1.5px ${RULE}`,
      }}
    >
      <div style={{ fontSize: 19, fontWeight: 700, color: SOFT }}>CONTOH</div>
      <div style={{ fontSize: 23, fontWeight: 650, color: INK, marginTop: 6, lineHeight: 1.35 }}>
        {example}
      </div>
    </div>
  </div>
);

const Slide06Anatomy: Page = () => {
  const live = useIsActivePage();
  return (
    <Frame>
      <Eyebrow>Anatomy of a Good Prompt</Eyebrow>
      <h2 style={{ ...abs(X0, 160, 920), ...headline(82) }}>Empat komponen utama.</h2>
      <div
        style={{
          ...abs(1120, 178, 680),
          ...row,
          justifyContent: 'flex-end',
          gap: 14,
          fontSize: 26,
          fontWeight: 750,
        }}
      >
        <Highlight color={HIGHLIGHT_TEAL}>ROLE</Highlight>
        <span style={{ color: SOFT }}>→</span>
        <Highlight>TASK</Highlight>
        <span style={{ color: SOFT }}>→</span>
        <Highlight color={HIGHLIGHT_PINK}>CONTEXT</Highlight>
        <span style={{ color: SOFT }}>→</span>
        <Highlight>OUTPUT</Highlight>
      </div>

      <AnatomyCard
        x={120}
        tint={TINT_TEAL}
        index="01"
        tag="ROLE"
        question="AI berperan sebagai siapa?"
        example="Senior Frontend Developer."
      />
      <AnatomyCard
        x={548}
        tint={TINT_YELLOW}
        index="02"
        tag="TASK"
        question="Apa yang harus dikerjakan?"
        example="Membuat halaman homepage online store."
      />
      <AnatomyCard
        x={976}
        tint={TINT_BLUE}
        index="03"
        tag="CONTEXT"
        question="Project apa yang sedang dikerjakan?"
        example="UrbanStore, website e-commerce fashion untuk Gen Z."
      />
      <AnatomyCard
        x={1404}
        tint={TINT_PINK}
        index="04"
        tag="OUTPUT"
        question="Hasil seperti apa yang diinginkan?"
        example="React component menggunakan Tailwind CSS, responsive, dan siap diintegrasikan."
      />

      <div style={{ ...abs(X0, 892, W), fontSize: 28, color: BODY }}>
        Semakin jelas <span style={{ color: INK, fontWeight: 700 }}>instruksi, konteks,</span> dan{' '}
        <span style={{ color: INK, fontWeight: 700 }}>ekspektasi output</span>, semakin mudah AI
        menghasilkan sesuatu yang sesuai kebutuhan.
      </div>
      <UnderlineDoodle x={312} y={922} w={580} color={TEAL_HEX} live={live} delay={0.5} />
    </Frame>
  );
};

// ============================================================================
// SLIDE 07 — Empat Pilar Prompt Engineering (Morph Pair with Slide 08!)
// ============================================================================
const PillarCard = ({
  x,
  top,
  tint,
  num,
  title,
  question,
  example,
  morphId,
}: {
  x: number;
  top: number;
  tint: string;
  num: string;
  title: string;
  question: string;
  example: string;
  morphId?: string;
}) => {
  const cardBg = <div style={{ ...abs(0, 0, 820, 240), borderRadius: 24, background: tint }} />;
  return (
    <div style={abs(x, top, 820, 240)}>
      {morphId ? <MorphElement id={morphId}>{cardBg}</MorphElement> : cardBg}
      <div
        style={{
          ...abs(36, 24, 748, 54),
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, gap: 18 }}>
          <span style={{ fontSize: 22, fontWeight: 750, color: SOFT }}>{num}</span>
          <span style={{ ...headline(40) }}>{title}</span>
        </div>
        <div style={{ fontSize: 23, fontWeight: 650, color: BODY }}>{question}</div>
      </div>
      <div
        style={{
          ...abs(36, 98, 748, 114),
          background: '#FFFFFF',
          borderRadius: 16,
          padding: '18px 24px',
          fontSize: 24,
          lineHeight: 1.4,
          color: INK,
        }}
      >
        <span style={{ color: SOFT, fontWeight: 650 }}>Contoh: </span>
        {example}
      </div>
    </div>
  );
};

const Slide07FourPillars: Page = () => {
  const live = useIsActivePage();
  return (
    <Frame>
      <Eyebrow>Empat Pilar Prompt Engineering</Eyebrow>
      <h2 style={{ ...abs(X0, 160, 900), ...headline(82) }}>Empat pilar AI Coding.</h2>
      <div style={{ ...abs(1120, 174, 680), fontSize: 25, lineHeight: 1.42, color: BODY }}>
        Setiap prompt AI Coding sebaiknya memiliki keempat komponen ini agar tidak melenceng dari
        ekspektasi.
      </div>

      <PillarCard
        x={120}
        top={310}
        tint={TINT_TEAL}
        num="01"
        title="STRUCTURE"
        question="Apa yang harus dibuat?"
        example="Homepage dengan navbar, hero section, kategori produk, dan product catalog."
        morphId="pillar-box"
      />
      <PillarCard
        x={980}
        top={310}
        tint={TINT_YELLOW}
        num="02"
        title="CONTEXT"
        question="Project apa yang dikerjakan?"
        example="UrbanStore, website online store fashion modern."
      />
      <PillarCard
        x={120}
        top={576}
        tint={TINT_BLUE}
        num="03"
        title="RULES"
        question="Aturan teknis & standar"
        example="Gunakan React, Tailwind CSS, reusable components, dan responsive design."
      />
      <PillarCard
        x={980}
        top={576}
        tint={TINT_PINK}
        num="04"
        title="CONSTRAINTS"
        question="Batasan yang dilarang"
        example="Jangan mengubah struktur folder yang sudah ada dan jangan menghapus komponen existing."
      />

      <div
        style={{
          ...abs(X0, 868, W),
          ...row,
          justifyContent: 'space-between',
          fontSize: 26,
          fontWeight: 760,
        }}
      >
        <span>
          STRUCTURE + CONTEXT + RULES + CONSTRAINTS{' '}
          <span style={{ color: TEAL_HEX }}>→ BETTER AI CODING</span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500, color: SOFT }}>
          Tekan → untuk membedah contoh prompt UrbanStore
        </span>
      </div>
      <UnderlineDoodle x={X0} y={898} w={620} color={TEAL_HEX} live={live} delay={0.5} />
    </Frame>
  );
};

// ============================================================================
// SLIDE 08 — Structure, Context, Rules & Constraints (Fieldwork BranchesDeep!)
// ============================================================================
const DissectRow = ({
  top,
  num,
  label,
  text,
  tint,
  active,
  onClick,
}: {
  top: number;
  num: string;
  label: string;
  text: string;
  tint: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="fw-interactive"
    style={{
      ...abs(X0, top, 780, 128),
      borderRadius: 20,
      background: active ? tint : '#F6F5F2',
      boxShadow: active ? `inset 0 0 0 2.5px ${INK_HEX}` : 'none',
      padding: '18px 26px',
    }}
  >
    <div style={{ ...row, gap: 12 }}>
      <span style={{ fontSize: 20, fontWeight: 750, color: SOFT }}>{num}</span>
      <span style={{ fontSize: 24, fontWeight: 780 }}>{label}</span>
    </div>
    <div style={{ fontSize: 22, lineHeight: 1.38, color: BODY, marginTop: 6 }}>{text}</div>
  </div>
);

const Slide08Dissection: Page = () => {
  const live = useIsActivePage();
  const [selected, setSelected] = useState<number>(0);
  const after: CSSProperties = live
    ? { animation: `fw-fade 0.4s ease-out ${MORPH_MS}ms both` }
    : {};

  return (
    <Frame>
      <MorphElement id="pillar-box">
        <div style={{ ...abs(940, 110, 860, 840), borderRadius: 24, background: TINT_TEAL }} />
      </MorphElement>

      <div style={{ ...abs(0, 0, 1920, 1000), ...after }}>
        <div style={abs(990, 150, 760, 760)}>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontSize: 22, fontWeight: 750, color: TEAL_HEX }}>
              URBANSTORE PROMPT ANATOMY
            </span>
            <span style={{ fontSize: 20, color: BODY }}>Klik kartu di kiri untuk highlight</span>
          </div>

          <div
            style={{
              marginTop: 20,
              background: '#FFFFFF',
              borderRadius: 20,
              padding: 30,
              boxShadow: `inset 0 0 0 2px ${INK_HEX}`,
              fontSize: 24,
              lineHeight: 1.5,
            }}
          >
            <div
              onClick={() => setSelected(0)}
              className="fw-interactive"
              style={{
                padding: '10px 14px',
                borderRadius: 12,
                background: selected === 0 ? TINT_TEAL : 'transparent',
              }}
            >
              <strong style={{ color: TEAL_HEX }}>[STRUCTURE]</strong> Buat halaman katalog produk
              dengan grid layout, filter kategori, search bar, dan sorting harga.
            </div>

            <div
              onClick={() => setSelected(1)}
              className="fw-interactive"
              style={{
                marginTop: 12,
                padding: '10px 14px',
                borderRadius: 12,
                background: selected === 1 ? TINT_YELLOW : 'transparent',
              }}
            >
              <strong style={{ color: '#B07A12' }}>[CONTEXT]</strong> Project UrbanStore, sebuah
              website online store yang menjual produk fashion untuk target market Gen Z.
            </div>

            <div
              onClick={() => setSelected(2)}
              className="fw-interactive"
              style={{
                marginTop: 12,
                padding: '10px 14px',
                borderRadius: 12,
                background: selected === 2 ? TINT_BLUE : 'transparent',
              }}
            >
              <strong style={{ color: '#2B6CB0' }}>[RULES]</strong> Gunakan React, Tailwind CSS,
              responsive design, dan reusable components.
            </div>

            <div
              onClick={() => setSelected(3)}
              className="fw-interactive"
              style={{
                marginTop: 12,
                padding: '10px 14px',
                borderRadius: 12,
                background: selected === 3 ? TINT_PINK : 'transparent',
              }}
            >
              <strong style={{ color: CORAL_HEX }}>[CONSTRAINTS]</strong> Jangan mengubah halaman
              lain, jangan menggunakan data produk dari API eksternal, dan gunakan mock data
              terlebih dahulu.
            </div>
          </div>

          <div
            style={{
              marginTop: 22,
              fontSize: 22,
              lineHeight: 1.42,
              color: BODY,
              fontStyle: 'italic',
              fontFamily: SERIF,
            }}
          >
            “Perhatikan bahwa kita tidak hanya menyuruh AI membuat halaman. Kita juga memberikan
            konteks, aturan, dan batasan. Inilah yang membedakan prompt biasa dengan prompt
            development.”
          </div>
        </div>
      </div>

      <Eyebrow>Bedah Contoh Prompt</Eyebrow>
      <h2 style={{ ...abs(X0, 160), ...headline(82), lineHeight: 0.98 }}>
        Mari kita bedah
        <br />
        satu prompt.
      </h2>

      <DissectRow
        top={360}
        num="01"
        label="STRUCTURE"
        text="Buat halaman katalog produk dengan grid layout, filter kategori, search bar, dan sorting harga."
        tint={TINT_TEAL}
        active={selected === 0}
        onClick={() => setSelected(0)}
      />
      <DissectRow
        top={504}
        num="02"
        label="CONTEXT"
        text="Project UrbanStore, sebuah website online store yang menjual produk fashion untuk target market Gen Z."
        tint={TINT_YELLOW}
        active={selected === 1}
        onClick={() => setSelected(1)}
      />
      <DissectRow
        top={648}
        num="03"
        label="RULES"
        text="Gunakan React, Tailwind CSS, responsive design, dan reusable components."
        tint={TINT_BLUE}
        active={selected === 2}
        onClick={() => setSelected(2)}
      />
      <DissectRow
        top={792}
        num="04"
        label="CONSTRAINTS"
        text="Jangan mengubah halaman lain, jangan menggunakan data produk dari API eksternal, dan gunakan mock data terlebih dahulu."
        tint={TINT_PINK}
        active={selected === 3}
        onClick={() => setSelected(3)}
      />
    </Frame>
  );
};

Slide07FourPillars.transition = morphTransition;
Slide08Dissection.transition = morphTransition;

// ============================================================================
// SLIDE 09 — Formula Prompt #1: RTF (Fieldwork OKRs / Two-Column Editorial)
// ============================================================================
const RtfPart = ({
  code,
  label,
  body,
  tint,
}: {
  code: string;
  label: string;
  body: string;
  tint: string;
}) => (
  <div
    style={{
      borderRadius: 20,
      background: tint,
      padding: '20px 26px',
      marginBottom: 16,
    }}
  >
    <div style={{ ...row, gap: 12 }}>
      <span style={{ fontSize: 22, fontWeight: 780, color: TEAL_HEX }}>{code}</span>
      <span style={{ ...headline(32) }}>{label}</span>
    </div>
    <div style={{ fontSize: 24, lineHeight: 1.42, color: INK, marginTop: 8 }}>{body}</div>
  </div>
);

const UseCaseItem = ({ text, live }: { text: string; live: boolean }) => (
  <div
    style={{
      ...row,
      gap: 14,
      height: 58,
      fontSize: 22,
      fontWeight: 560,
      borderBottom: `1.5px solid ${RULE}`,
      whiteSpace: 'nowrap',
    }}
  >
    <CheckMark color={TEAL_HEX} />
    <span>{text}</span>
    <span
      style={{
        marginLeft: 'auto',
        flexShrink: 0,
        width: 64,
        height: 6,
        borderRadius: 3,
        background: TINT_TEAL,
      }}
    >
      <span
        style={{
          display: 'block',
          height: 6,
          width: '100%',
          borderRadius: 3,
          background: TEAL_HEX,
          transformOrigin: 'left center',
          animation: live ? `fw-grow 0.6s ${EASE_OUT} 0.2s both` : undefined,
        }}
      />
    </span>
  </div>
);

const Slide09FormulaRTF: Page = () => {
  const live = useIsActivePage();
  return (
    <Frame>
      <Eyebrow>Formula Prompt #1 · RTF</Eyebrow>
      <h2 style={{ ...abs(X0, 162, 920), ...headline(82) }}>Role, Task, Format.</h2>
      <div style={{ ...abs(1140, 172, 660), fontSize: 25, lineHeight: 1.42, color: BODY }}>
        Formula sederhana untuk memberikan instruksi yang jelas kepada AI:{' '}
        <strong style={{ color: INK }}>ROLE → TASK → FORMAT</strong>.
      </div>

      {/* Left: Contoh Prompt */}
      <div style={abs(X0, 300, 980)}>
        <RtfPart
          code="R"
          label="Role"
          body="Bertindaklah sebagai Senior Frontend Engineer."
          tint={TINT_TEAL}
        />
        <RtfPart
          code="T"
          label="Task"
          body="Buatkan landing page untuk website online store bernama UrbanStore yang menjual produk fashion pria dan wanita."
          tint={TINT_YELLOW}
        />
        <RtfPart
          code="F"
          label="Format"
          body="Output berupa kode React menggunakan Tailwind CSS. Desain harus responsive, modern, minimalis, dan memiliki struktur komponen yang rapi."
          tint={TINT_BLUE}
        />
      </div>

      {/* Right: Kapan Digunakan */}
      <div style={abs(1160, 300, 640)}>
        <div style={{ ...headline(40), marginBottom: 16 }}>Kapan digunakan?</div>
        <UseCaseItem text="Generate UI & halaman statis" live={live} />
        <UseCaseItem text="Membuat landing page" live={live} />
        <UseCaseItem text="Membuat komponen sederhana" live={live} />
        <UseCaseItem text="Kode dengan format tertentu" live={live} />

        <div
          style={{
            marginTop: 32,
            borderRadius: 20,
            background: '#F6F5F2',
            padding: '22px 26px',
            fontSize: 24,
            lineHeight: 1.45,
            color: BODY,
          }}
        >
          <Highlight>RTF cocok digunakan</Highlight> ketika kita ingin menghasilkan sesuatu dengan
          instruksi dan format yang jelas.
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 10 — Formula Prompt #2: RTCF
// ============================================================================
const CatalogTag = ({ label }: { label: string }) => (
  <div
    style={{
      ...row,
      gap: 10,
      background: '#FFFFFF',
      padding: '10px 16px',
      borderRadius: 12,
      boxShadow: `inset 0 0 0 1.5px ${INK_HEX}`,
      fontSize: 20,
      fontWeight: 650,
    }}
  >
    <span style={{ color: TEAL_HEX }}>✓</span>
    <span>{label}</span>
  </div>
);

const Slide10FormulaRTCF: Page = () => {
  const live = useIsActivePage();
  return (
    <Frame>
      <Eyebrow>Formula Prompt #2 · RTCF</Eyebrow>
      <h2 style={{ ...abs(X0, 154, 880), ...headline(54) }}>Role, Task, Context, Format.</h2>
      <div style={{ ...abs(1080, 162, 720), fontSize: 24, lineHeight: 1.42, color: BODY }}>
        Formula yang lebih lengkap karena memberikan informasi mengenai{' '}
        <Highlight color={HIGHLIGHT_TEAL}>project yang sedang dikerjakan</Highlight>.
      </div>

      {/* Left Column: Role, Task, Format */}
      <div style={abs(X0, 276, 540)}>
        <RtfPart
          code="R"
          label="Role"
          body="Bertindak sebagai Senior Product Designer dan Frontend Engineer."
          tint={TINT_TEAL}
        />
        <RtfPart
          code="T"
          label="Task"
          body="Buatkan halaman katalog produk untuk UrbanStore."
          tint={TINT_YELLOW}
        />
        <RtfPart
          code="F"
          label="Format"
          body="Gunakan React dan Tailwind CSS. Buat desain responsive dengan reusable components dan layout yang konsisten."
          tint={TINT_BLUE}
        />
      </div>

      {/* Middle Column: Context Highlight */}
      <div
        style={{
          ...abs(690, 276, 590, 584),
          borderRadius: 24,
          background: TINT_PINK,
          padding: 34,
          boxShadow: `inset 0 0 0 2.5px ${CORAL_HEX}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontSize: 21, fontWeight: 780, color: CORAL_HEX }}>C · CONTEXT</span>
            <span style={{ fontSize: 19, fontWeight: 700, color: BODY }}>UrbanStore Project</span>
          </div>
          <p style={{ fontSize: 23, lineHeight: 1.45, color: INK, margin: '16px 0 22px' }}>
            UrbanStore adalah website online store fashion untuk Gen Z. Website memiliki desain
            modern minimalis dengan <strong>Swiss Style Design</strong>, dominasi warna hitam dan
            putih, serta pengalaman belanja yang sederhana.
          </p>
          <div style={{ fontSize: 21, fontWeight: 750, marginBottom: 14 }}>
            Halaman katalog harus memiliki:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <CatalogTag label="Search bar" />
            <CatalogTag label="Filter kategori" />
            <CatalogTag label="Product card" />
            <CatalogTag label="Harga produk" />
            <CatalogTag label="Informasi diskon" />
            <CatalogTag label="Tombol Add to Cart" />
          </div>
        </div>
        <div style={{ fontSize: 19, fontWeight: 700, color: CORAL_HEX }}>
          ✓ Konteks menjaga konsistensi desain &amp; fitur
        </div>
      </div>

      {/* Right Column: Kapan Digunakan */}
      <div style={abs(1310, 276, 490)}>
        <div style={{ ...headline(38), marginBottom: 14 }}>Kapan digunakan?</div>
        <UseCaseItem text="Fitur sesuai konteks project" live={live} />
        <UseCaseItem text="Membuat halaman aplikasi" live={live} />
        <UseCaseItem text="Mengembangkan fitur baru" live={live} />
        <UseCaseItem text="Melanjutkan project existing" live={live} />

        <div
          style={{
            marginTop: 28,
            borderRadius: 18,
            background: '#F6F5F2',
            padding: '20px 24px',
            fontSize: 22,
            lineHeight: 1.45,
            color: BODY,
          }}
        >
          RTCF lebih lengkap daripada RTF karena AI memahami{' '}
          <strong style={{ color: INK }}>project yang sedang dikerjakan</strong>.
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 11 — Formula Prompt #3: RISE (Stepped Reveal + Interactive Steps)
// ============================================================================
const RiseStepPill = ({
  n,
  text,
  active,
  onClick,
}: {
  n: string;
  text: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="fw-interactive"
    style={{
      ...row,
      gap: 14,
      padding: '15px 20px',
      borderRadius: 16,
      background: active ? TINT_TEAL : '#FFFFFF',
      boxShadow: active ? `inset 0 0 0 2.5px ${INK_HEX}` : `inset 0 0 0 1.5px ${RULE}`,
      marginBottom: 12,
      fontSize: 22,
      fontWeight: active ? 720 : 560,
      whiteSpace: 'nowrap',
    }}
  >
    <span style={{ fontSize: 20, fontWeight: 780, color: TEAL_HEX, width: 30 }}>{n}</span>
    <span>{text}</span>
  </div>
);

const Slide11FormulaRISE: Page = () => {
  const live = useIsActivePage();
  const [stepIdx, setStepIdx] = useState(0);

  return (
    <Frame>
      <Eyebrow>Formula Prompt #3 · RISE</Eyebrow>
      <h2 style={{ ...abs(X0, 154, 880), ...headline(52) }}>Role, Input, Steps, Expectation.</h2>
      <div style={{ ...abs(1080, 162, 720), fontSize: 24, lineHeight: 1.42, color: BODY }}>
        Formula yang cocok untuk <Highlight>task kompleks</Highlight> yang membutuhkan analisis dan
        proses bertahap.
      </div>

      {/* Left Column: Role, Input, Expectation */}
      <div style={abs(X0, 276, 540)}>
        <RtfPart
          code="R"
          label="Role"
          body="Bertindak sebagai Senior Software Engineer dan Technical Product Manager."
          tint={TINT_TEAL}
        />
        <RtfPart
          code="I"
          label="Input"
          body="Saya memiliki PRD (Product Requirements Document) untuk project UrbanStore, sebuah website online store."
          tint={TINT_YELLOW}
        />
        <RtfPart
          code="E"
          label="Expectation"
          body="Hasil berupa development roadmap terstruktur, daftar fitur, prioritas pengerjaan, dan task panduan AI Coding."
          tint={TINT_GREEN}
        />
      </div>

      {/* Middle Column: 6 Steps */}
      <div style={abs(690, 276, 600)}>
        <div style={{ ...row, justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ ...headline(36) }}>S · Steps (6 Langkah)</span>
          <span style={{ fontSize: 19, color: SOFT }}>Klik langkah</span>
        </div>
        <RiseStepPill
          n="01"
          text="Analisis kebutuhan dan fitur dalam PRD."
          active={stepIdx === 0}
          onClick={() => setStepIdx(0)}
        />
        <RiseStepPill
          n="02"
          text="Identifikasi fitur utama yang masuk MVP."
          active={stepIdx === 1}
          onClick={() => setStepIdx(1)}
        />
        <RiseStepPill
          n="03"
          text="Kelompokkan fitur per halaman & modul."
          active={stepIdx === 2}
          onClick={() => setStepIdx(2)}
        />
        <RiseStepPill
          n="04"
          text="Tentukan urutan pengerjaan development."
          active={stepIdx === 3}
          onClick={() => setStepIdx(3)}
        />
        <RiseStepPill
          n="05"
          text="Identifikasi dependensi antarfitur."
          active={stepIdx === 4}
          onClick={() => setStepIdx(4)}
        />
        <RiseStepPill
          n="06"
          text="Buat task development secara bertahap."
          active={stepIdx === 5}
          onClick={() => setStepIdx(5)}
        />
      </div>

      {/* Right Column: Kapan Digunakan */}
      <div style={abs(1320, 276, 480)}>
        <div style={{ ...headline(38), marginBottom: 14 }}>Kapan digunakan?</div>
        <UseCaseItem text="Analisis dokumen PRD" live={live} />
        <UseCaseItem text="Project planning" live={live} />
        <UseCaseItem text="Development roadmap" live={live} />
        <UseCaseItem text="Memecah fitur kompleks" live={live} />
        <UseCaseItem text="Analisis kebutuhan app" live={live} />

        <div
          style={{
            marginTop: 22,
            borderRadius: 18,
            background: '#F6F5F2',
            padding: '18px 22px',
            fontSize: 22,
            lineHeight: 1.42,
            color: BODY,
          }}
        >
          RISE mengubah informasi kompleks menjadi{' '}
          <strong style={{ color: INK }}>langkah kerja terstruktur</strong>.
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 12 — Formula Mana yang Harus Digunakan? (3-Column Clean Card Layout!)
// ============================================================================
const FormulaColumnCard = ({
  x,
  tint,
  num,
  formula,
  standsFor,
  badgeColor,
  title,
  desc,
  example,
  active,
  onClick,
}: {
  x: number;
  tint: string;
  num: string;
  formula: string;
  standsFor: string;
  badgeColor: string;
  title: string;
  desc: string;
  example: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="fw-interactive"
    style={{
      ...abs(x, 294, 536, 596),
      borderRadius: 26,
      background: tint,
      padding: 36,
      boxShadow: active ? `inset 0 0 0 3px ${INK_HEX}` : 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div>
      <div style={{ ...row, justifyContent: 'space-between' }}>
        <span style={{ fontSize: 21, fontWeight: 780, color: badgeColor }}>
          FORMULA {num}
        </span>
        <span
          style={{
            padding: '6px 16px',
            borderRadius: 99,
            background: '#FFFFFF',
            boxShadow: `inset 0 0 0 2px ${INK_HEX}`,
            fontSize: 19,
            fontWeight: 780,
          }}
        >
          {formula}
        </span>
      </div>

      <div style={{ ...headline(64), marginTop: 20 }}>{formula}</div>
      <div style={{ fontSize: 21, fontWeight: 720, color: badgeColor, marginTop: 6 }}>
        {standsFor}
      </div>

      <div style={{ marginTop: 26, borderTop: `1.5px solid ${RULE}`, paddingTop: 22 }}>
        <div style={{ fontSize: 19, fontWeight: 760, color: SOFT }}>COCOK UNTUK</div>
        <div style={{ ...headline(32), marginTop: 8, lineHeight: 1.15 }}>{title}</div>
        <p style={{ fontSize: 23, lineHeight: 1.42, color: BODY, margin: '10px 0 0' }}>{desc}</p>
      </div>
    </div>

    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 18,
        padding: '20px 24px',
        boxShadow: `inset 0 0 0 2px ${INK_HEX}`,
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 780, color: badgeColor }}>CONTOH DI URBANSTORE</div>
      <div style={{ fontSize: 22, fontWeight: 660, color: INK, marginTop: 6, lineHeight: 1.38 }}>
        {example}
      </div>
    </div>
  </div>
);

const Slide12FormulaComparison: Page = () => {
  const [selected, setSelected] = useState(1);

  return (
    <Frame>
      <Eyebrow>Formula Mana yang Harus Digunakan?</Eyebrow>
      <h2 style={{ ...abs(X0, 162, 980), ...headline(74) }}>Tujuan beda, formula beda.</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 25, lineHeight: 1.42, color: BODY }}>
        Tidak ada satu formula untuk semua kondisi. Pilih berdasarkan{' '}
        <Highlight color={HIGHLIGHT_TEAL}>kompleksitas task</Highlight> yang dikerjakan.
      </div>

      <FormulaColumnCard
        x={120}
        tint={TINT_TEAL}
        num="01"
        formula="RTF"
        standsFor="Role · Task · Format"
        badgeColor={TEAL_HEX}
        title="UI & Komponen Sederhana"
        desc="Instruksi cepat untuk menghasilkan tampilan atau komponen dengan format spesifik."
        example="Membuat hero section pada halaman homepage."
        active={selected === 0}
        onClick={() => setSelected(0)}
      />

      <FormulaColumnCard
        x={692}
        tint={TINT_YELLOW}
        num="02"
        formula="RTCF"
        standsFor="Role · Task · Context · Format"
        badgeColor="#B07A12"
        title="Fitur dengan Konteks Project"
        desc="Membangun halaman atau fitur baru yang harus selaras dengan desain project."
        example="Membuat halaman katalog produk sesuai desain UrbanStore."
        active={selected === 1}
        onClick={() => setSelected(1)}
      />

      <FormulaColumnCard
        x={1264}
        tint={TINT_PINK}
        num="03"
        formula="RISE"
        standsFor="Role · Input · Steps · Expectation"
        badgeColor={CORAL_HEX}
        title="Analisis PRD & Planning"
        desc="Memecah dokumen kompleks menjadi tahapan analisis dan urutan pengerjaan."
        example="Menganalisis PRD UrbanStore & menyusun roadmap."
        active={selected === 2}
        onClick={() => setSelected(2)}
      />
    </Frame>
  );
};

// ============================================================================
// SLIDE 13 — Best Practice Prompt Engineering (Do's & Don'ts Tally)
// ============================================================================
const BestPracticeRow = ({
  text,
  good = true,
  live,
}: {
  text: string;
  good?: boolean;
  live: boolean;
}) => (
  <div
    style={{
      ...row,
      gap: 16,
      height: 64,
      fontSize: 23,
      borderBottom: `1.5px solid ${RULE}`,
      color: INK,
      fontWeight: 580,
      whiteSpace: 'nowrap',
    }}
  >
    <Ink width={32} height={32} wobble={1.5} style={{ flexShrink: 0 }}>
      <rect
        x="3"
        y="3"
        width="26"
        height="26"
        rx="6"
        fill="#FFFFFF"
        strokeWidth={2.5}
      />
      {good ? (
        <Stroke d="M7 16L14 23L26 6" color="#2F6F4E" width={3.4} live={live} delay={0.3} />
      ) : (
        <Stroke
          d="M8 8L24 24M24 8L8 24"
          color={CORAL_HEX}
          width={3.4}
          live={live}
          delay={0.4}
        />
      )}
    </Ink>
    <span>{text}</span>
  </div>
);

const Slide13BestPractices: Page = () => {
  const live = useIsActivePage();
  return (
    <Frame>
      <Eyebrow>Best Practice Prompt Engineering</Eyebrow>
      <h2 style={{ ...abs(X0, 162, 960), ...headline(76) }}>Garbage In, Garbage Out.</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 25, lineHeight: 1.42, color: BODY }}>
        Kualitas output AI sangat dipengaruhi oleh{' '}
        <Highlight>kualitas informasi dan instruksi</Highlight> yang kita berikan.
      </div>

      {/* Left: Do's */}
      <div
        style={{
          ...abs(X0, 294, 816, 596),
          borderRadius: 24,
          background: TINT_GREEN,
          padding: '30px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ ...headline(44), color: '#2F6F4E' }}>Do’s</span>
            <span
              style={{
                padding: '6px 16px',
                borderRadius: 99,
                background: '#FFFFFF',
                fontSize: 19,
                fontWeight: 740,
                color: '#2F6F4E',
              }}
            >
              6 Praktik Terbaik
            </span>
          </div>
          <BestPracticeRow good live={live} text="Berikan context project terlebih dahulu." />
          <BestPracticeRow good live={live} text="Jelaskan tujuan dan kebutuhan fitur." />
          <BestPracticeRow good live={live} text="Berikan instruksi yang spesifik & jelas." />
          <BestPracticeRow good live={live} text="Tentukan rules dan constraints sejak awal." />
          <BestPracticeRow good live={live} text="Sertakan ekspektasi format output." />
          <BestPracticeRow good live={live} text="Gunakan iterasi kecil dan bertahap." />
        </div>
        <div style={{ fontSize: 20, fontWeight: 720, color: '#2F6F4E' }}>
          ✓ Prompt terstruktur menghasilkan kode yang rapi &amp; konsisten
        </div>
      </div>

      {/* Right: Don'ts */}
      <div
        style={{
          ...abs(984, 294, 816, 596),
          borderRadius: 24,
          background: TINT_PINK,
          padding: '30px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ ...headline(44), color: CORAL_HEX }}>Don’ts</span>
            <span
              style={{
                padding: '6px 16px',
                borderRadius: 99,
                background: '#FFFFFF',
                fontSize: 19,
                fontWeight: 740,
                color: CORAL_HEX,
              }}
            >
              5 Kesalahan Umum
            </span>
          </div>
          <BestPracticeRow good={false} live={live} text="Menggunakan prompt pendek dan ambigu." />
          <BestPracticeRow
            good={false}
            live={live}
            text="Menggabungkan banyak task dalam satu prompt."
          />
          <BestPracticeRow good={false} live={live} text="Tidak menyebutkan konteks project." />
          <BestPracticeRow
            good={false}
            live={live}
            text="Tidak memberikan batasan teknis (constraints)."
          />
          <BestPracticeRow
            good={false}
            live={live}
            text="Menerima output AI tanpa melakukan review."
          />
        </div>

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '16px 22px',
            boxShadow: `inset 0 0 0 2px ${INK_HEX}`,
            fontSize: 21,
            fontWeight: 720,
            color: CORAL_HEX,
          }}
        >
          ⚠️ Prinsip Utama: Garbage Prompt In → Garbage Code Out
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 14 — Workflow AI Coding yang Efektif (Clean 4x2 Bento Pipeline!)
// ============================================================================
const WorkflowStepCard = ({
  x,
  top,
  code,
  stage,
  title,
  desc,
  tint,
  accentColor,
  active,
  onClick,
}: {
  x: number;
  top: number;
  code: string;
  stage: string;
  title: string;
  desc: string;
  tint: string;
  accentColor: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="fw-interactive"
    style={{
      ...abs(x, top, 396, 280),
      borderRadius: 24,
      background: tint,
      padding: '26px 28px',
      boxShadow: active ? `inset 0 0 0 3px ${INK_HEX}` : `inset 0 0 0 1.5px ${RULE}`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ ...row, justifyContent: 'space-between' }}>
      <span
        style={{
          padding: '5px 14px',
          borderRadius: 99,
          background: '#FFFFFF',
          boxShadow: `inset 0 0 0 1.5px ${INK_HEX}`,
          fontSize: 18,
          fontWeight: 780,
          color: accentColor,
        }}
      >
        STEP {code}
      </span>
      <span style={{ fontSize: 22, fontWeight: 750, color: SOFT }}>→</span>
    </div>

    <div>
      <div style={{ ...headline(36), letterSpacing: '-0.03em' }}>{stage}</div>
      <div style={{ fontSize: 22, fontWeight: 720, color: INK, marginTop: 8 }}>{title}</div>
      <div style={{ fontSize: 20, lineHeight: 1.38, color: BODY, marginTop: 6 }}>{desc}</div>
    </div>
  </div>
);

const Slide14Workflow: Page = () => {
  const live = useIsActivePage();
  const [selected, setSelected] = useState(2);

  return (
    <Frame>
      <Eyebrow>Workflow AI Coding yang Efektif</Eyebrow>
      <h2 style={{ ...abs(X0, 162, 980), ...headline(76) }}>Jangan langsung generate!</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 25, lineHeight: 1.42, color: BODY }}>
        Ikuti 7 tahapan sistematis di bawah ini. Klik kartu tahapan untuk melihat fokus utama di
        setiap langkah.
      </div>

      {/* Row 1: Steps 01 - 04 */}
      <WorkflowStepCard
        x={120}
        top={294}
        code="01"
        stage="UNDERSTAND"
        title="Pahami Kebutuhan"
        desc="Pelajari ide, masalah utama, dan target pengguna project."
        tint={TINT_YELLOW}
        accentColor="#9E6B0E"
        active={selected === 0}
        onClick={() => setSelected(0)}
      />
      <WorkflowStepCard
        x={548}
        top={294}
        code="02"
        stage="PLAN"
        title="Susun Rencana"
        desc="Tentukan daftar fitur, scope MVP, dan prioritas pengerjaan."
        tint={TINT_BLUE}
        accentColor="#2B6CB0"
        active={selected === 1}
        onClick={() => setSelected(1)}
      />
      <WorkflowStepCard
        x={976}
        top={294}
        code="03"
        stage="PROMPT"
        title="Tulis Instruksi"
        desc="Susun prompt dengan struktur, konteks, rules & constraints."
        tint={TINT_TEAL}
        accentColor={TEAL_HEX}
        active={selected === 2}
        onClick={() => setSelected(2)}
      />
      <WorkflowStepCard
        x={1404}
        top={294}
        code="04"
        stage="GENERATE"
        title="Eksekusi Bersama AI"
        desc="Biarkan AI menghasilkan kode komponen atau fitur target."
        tint={TINT_GREEN}
        accentColor="#2F6F4E"
        active={selected === 3}
        onClick={() => setSelected(3)}
      />

      {/* Row 2: Steps 05 - 07 + Golden Rule Card */}
      <WorkflowStepCard
        x={120}
        top={604}
        code="05"
        stage="REVIEW"
        title="Evaluasi Hasil"
        desc="Periksa apakah UI, kode, dan alur sudah sesuai kebutuhan."
        tint={TINT_PINK}
        accentColor={CORAL_HEX}
        active={selected === 4}
        onClick={() => setSelected(4)}
      />
      <WorkflowStepCard
        x={548}
        top={604}
        code="06"
        stage="ITERATE"
        title="Sempurnakan Bertahap"
        desc="Perbaiki detail UI atau tambahkan sub-fitur lewat prompt lanjutan."
        tint={TINT_YELLOW}
        accentColor="#9E6B0E"
        active={selected === 5}
        onClick={() => setSelected(5)}
      />
      <WorkflowStepCard
        x={976}
        top={604}
        code="07"
        stage="TEST"
        title="Uji Fungsionalitas"
        desc="Pastikan seluruh interaksi berjalan baik tanpa merusak fitur lain."
        tint={TINT_GREEN}
        accentColor="#2F6F4E"
        active={selected === 6}
        onClick={() => setSelected(6)}
      />

      {/* Card 08: Bootcamp Golden Rule */}
      <div
        style={{
          ...abs(1404, 604, 396, 280),
          borderRadius: 24,
          background: '#191919',
          color: '#FFFEFC',
          padding: '26px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <span
            style={{
              padding: '5px 14px',
              borderRadius: 99,
              background: CORAL_HEX,
              color: '#FFFFFF',
              fontSize: 17,
              fontWeight: 800,
            }}
          >
            RULE BOOTCAMP
          </span>
          <Ink width={32} height={32} viewBox="-20 -20 40 40">
            <Sparkle x={0} y={0} s={0.8} fill={YELLOW} />
          </Ink>
        </div>

        <div>
          <div style={{ ...headline(34), color: YELLOW, lineHeight: 1.1 }}>
            ONE PROMPT =
            <br />
            ONE GOAL
          </div>
          <div style={{ fontSize: 20, lineHeight: 1.38, color: '#D6D5D0', marginTop: 10 }}>
            Jangan meminta AI membangun seluruh aplikasi sekaligus dalam satu prompt!
          </div>
        </div>
      </div>

      {live ? null : null}
    </Frame>
  );
};

// ============================================================================
// SLIDE 15 — Recap & Preview Part 2 (Clean Two-Column Card Layout!)
// ============================================================================
const TodoItem = ({
  done = false,
  live = false,
  tag,
  onClick,
  children,
}: {
  done?: boolean;
  live?: boolean;
  tag: string;
  onClick?: () => void;
  children: ReactNode;
}) => (
  <div
    onClick={onClick}
    className="fw-interactive"
    style={{
      ...row,
      gap: 16,
      height: 66,
      fontSize: 23,
      borderBottom: `1.5px solid ${RULE}`,
      whiteSpace: 'nowrap',
    }}
  >
    <Ink width={30} height={30} wobble={1.5} style={{ flexShrink: 0 }}>
      <rect x="3" y="3" width="24" height="24" rx="5" fill="#FFFFFF" strokeWidth={2.6} />
      {done ? (
        <Stroke d="M6 15L13 22L25 4" color={TEAL_HEX} width={3.4} live={live} delay={0.3} />
      ) : null}
    </Ink>
    <span
      style={{
        flex: 1,
        color: done ? SOFT : INK,
        textDecoration: done ? 'line-through' : 'none',
        fontWeight: 620,
      }}
    >
      {children}
    </span>
    <span
      style={{
        fontSize: 18,
        color: SOFT,
        fontFamily: MONO,
        background: '#FFFFFF',
        padding: '4px 10px',
        borderRadius: 8,
      }}
    >
      {tag}
    </span>
  </div>
);

const Part2GridCard = ({ num, title, sub }: { num: string; title: string; sub: string }) => (
  <div
    style={{
      background: '#FFFFFF',
      borderRadius: 16,
      padding: '16px 20px',
      boxShadow: `inset 0 0 0 2px ${INK_HEX}`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ ...row, justifyContent: 'space-between' }}>
      <span style={{ fontSize: 19, fontWeight: 800, color: CORAL_HEX }}>{num}</span>
      <span style={{ fontSize: 18, color: TEAL_HEX, fontWeight: 750 }}>Part 2</span>
    </div>
    <div style={{ fontSize: 22, fontWeight: 740, color: INK, marginTop: 6 }}>{title}</div>
    <div style={{ fontSize: 19, color: BODY, marginTop: 2 }}>{sub}</div>
  </div>
);

const Slide15RecapAndPreview: Page = () => {
  const live = useIsActivePage();
  const [doneList, setDoneList] = useState<boolean[]>([true, true, true, true, true, true]);

  const toggle = (idx: number) =>
    setDoneList((prev) => prev.map((v, i) => (i === idx ? !v : v)));

  return (
    <Frame>
      <Eyebrow>Recap &amp; Preview Part 2</Eyebrow>
      <h2 style={{ ...abs(X0, 162, 960), ...headline(78) }}>From Idea to Product.</h2>
      <div style={{ ...abs(1160, 168, 640), fontSize: 25, lineHeight: 1.42, color: BODY }}>
        <Highlight color={HIGHLIGHT_TEAL}>Klik kotak checklist</Highlight> di sebelah kiri untuk
        mereview 6 poin inti Sesi 1 Part 1 sebelum lanjut ke Part 2.
      </div>

      {/* Left Column: 6 Core Takeaways Checklist Card */}
      <div
        style={{
          ...abs(X0, 294, 816, 596),
          borderRadius: 24,
          background: '#F6F5F2',
          padding: '30px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ ...headline(38) }}>Recap Sesi 1 Part 1</span>
            <span style={{ fontSize: 19, fontWeight: 720, color: TEAL_HEX }}>
              6 Inti Pembelajaran
            </span>
          </div>

          <TodoItem done={doneList[0]} live={live} tag="Slide 03" onClick={() => toggle(0)}>
            Konsep &amp; Mindset Vibe Coding
          </TodoItem>
          <TodoItem done={doneList[1]} live={live} tag="Slide 04–05" onClick={() => toggle(1)}>
            Cara LLM Memahami Prompt &amp; Context
          </TodoItem>
          <TodoItem done={doneList[2]} live={live} tag="Slide 06–08" onClick={() => toggle(2)}>
            Anatomy &amp; 4 Pilar Prompt Engineering
          </TodoItem>
          <TodoItem done={doneList[3]} live={live} tag="Slide 09–12" onClick={() => toggle(3)}>
            Formula Prompt: RTF, RTCF &amp; RISE
          </TodoItem>
          <TodoItem done={doneList[4]} live={live} tag="Slide 13" onClick={() => toggle(4)}>
            Best Practice: Garbage In, Garbage Out
          </TodoItem>
          <TodoItem done={doneList[5]} live={live} tag="Slide 14" onClick={() => toggle(5)}>
            Workflow AI Coding (One Prompt = One Goal)
          </TodoItem>
        </div>

        <div style={{ fontSize: 20, fontWeight: 700, color: BODY }}>
          ✓ Klik item di atas untuk toggle status checklist
        </div>
      </div>

      {/* Right Column: Next Part 2 Case Study */}
      <div
        style={{
          ...abs(984, 294, 816, 596),
          borderRadius: 24,
          background: TINT_YELLOW,
          padding: '30px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontSize: 20, fontWeight: 780, color: CORAL_HEX }}>
              NEXT · HANDS-ON CASE STUDY (PART 2)
            </span>
            <Ink width={36} height={36} viewBox="-22 -22 44 44">
              <Sparkle x={0} y={0} s={0.85} fill={TEAL_HEX} />
            </Ink>
          </div>
          <div style={{ ...headline(40), marginTop: 8 }}>
            Studi Kasus: Website UrbanStore
          </div>
          <p style={{ fontSize: 22, color: BODY, margin: '8px 0 20px', lineHeight: 1.38 }}>
            Menerapkan formula prompt untuk membangun online store fashion modern:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Part2GridCard num="01" title="Project Brief & PRD" sub="Pahami konteks UrbanStore" />
            <Part2GridCard num="02" title="Fondasi via RTCF" sub="Setup struktur & navigasi" />
            <Part2GridCard num="03" title="Fitur via RTF" sub="One Prompt = One Feature" />
            <Part2GridCard num="04" title="Roadmap via RISE" sub="Breakdown task kompleks" />
            <Part2GridCard num="05" title="Meta-Prompting" sub="AI sebagai Prompt Engineer" />
            <Part2GridCard num="06" title="Debugging & Iterasi" sub="Fix error & sempurnakan UI" />
          </div>
        </div>

        <div style={{ ...row, justifyContent: 'space-between', paddingTop: 8 }}>
          <span style={{ fontSize: 21, fontWeight: 780 }}>UrbanStore · React + Tailwind CSS</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: TEAL_HEX }}>
            Let’s Build with AI! →
          </span>
        </div>
      </div>
    </Frame>
  );
};

export const meta: SlideMeta = {
  title: '[VCB Batch 4] Sesi 1 - Part 1',
  createdAt: '2026-11-04T08:46:31.154Z',
  theme: 'swiss-japanese',
};

export const notes: (string | undefined)[] = [
  `Selamat datang di Vibe Coding Bootcamp Batch 4 bersama CODEPOLITAN!
Pada Sesi 1 Part 1 ini kita akan membahas fondasi utama: Intro to Vibe Coding, Prompt Engineering, dan AI Workflow.`,
  `Enam target pembelajaran hari ini (layout bergaya Fieldwork Scorecard).
Ingat: Hari ini kita tidak sekadar belajar menggunakan AI untuk membuat aplikasi. Kita belajar bagaimana berpikir seperti developer dan berkomunikasi dengan AI untuk membangun sebuah produk.`,
  `Apa itu Vibe Coding? Pendekatan pengembangan software dengan memanfaatkan AI sebagai partner.
Kita fokus pada 5 tahapan: Idea, Prompt, Generate, Review, dan Improve hingga menjadi Working Product.`,
  `Mengapa Prompt Engineering penting? Banyak orang berkata "AI-nya kurang pintar", padahal instruksi kita yang kurang jelas.
Klik tombol Bad Prompt vs Good Prompt di sebelah kanan untuk melihat perbedaannya. Better Prompt = Better Output.`,
  `AI tidak bisa membaca pikiran kita. LLM memproses teks melalui Context, Instruction, Pattern Recognition, dan Prediction.
Gunakan tombol interaktif di kanan untuk membandingkan Prompt Kurang Jelas vs Prompt Lebih Jelas pada studi kasus UrbanStore.`,
  `Anatomy of a Good Prompt: ROLE (AI berperan sebagai siapa), TASK (Apa yang harus dikerjakan), CONTEXT (Project apa yang sedang dikerjakan), dan OUTPUT (Hasil seperti apa yang diinginkan).`,
  `Empat Pilar Prompt Engineering: 01. Structure, 02. Context, 03. Rules, dan 04. Constraints.
Ketika kita tekan tombol Next (→), kartu pertama akan melakukan Magic Move (MorphElement) menjadi panel bedah prompt di slide berikutnya.`,
  `Perhatikan bahwa kita tidak hanya menyuruh AI membuat halaman. Kita juga memberikan konteks, aturan, dan batasan. Inilah yang membedakan prompt biasa dengan prompt yang dirancang untuk kebutuhan development.`,
  `Formula Prompt #1: RTF (Role, Task, Format). Formula sederhana untuk memberikan instruksi yang jelas kepada AI, cocok untuk generate UI, landing page, dan komponen sederhana.`,
  `Formula Prompt #2: RTCF (Role, Task, Context, Format). Lebih lengkap karena memberikan informasi mengenai project UrbanStore yang sedang dikerjakan.`,
  `Formula Prompt #3: RISE (Role, Input, Steps, Expectation). Formula untuk task kompleks yang membutuhkan analisis PRD dan 6 langkah pengerjaan bertahap.`,
  `Setiap formula memiliki tujuan berbeda: RTF untuk komponen sederhana, RTCF untuk fitur dengan konteks project, dan RISE untuk analisis PRD serta roadmap development.`,
  `Best Practice Prompt Engineering: Do's & Don'ts. Ingat prinsip Garbage In, Garbage Out — kualitas output sangat dipengaruhi kualitas instruksi kita.`,
  `Workflow AI Coding yang efektif: 01. Understand → 02. Plan → 03. Prompt → 04. Generate → 05. Review → 06. Iterate → 07. Test.
Pegang teguh rule selama bootcamp: ONE PROMPT = ONE GOAL.`,
  `Recap 9 materi yang sudah kita pelajari hari ini (bisa di-checklist secara interaktif) dan preview menuju Part 2: Hands-on Case Study membangun website online store UrbanStore dengan AI. Let's Build with AI!`,
];

export default [
  Slide01Cover,
  Slide02Objectives,
  Slide03WhatIsVibeCoding,
  Slide04WhyPromptMatters,
  Slide05HowAIUnderstands,
  Slide06Anatomy,
  Slide07FourPillars,
  Slide08Dissection,
  Slide09FormulaRTF,
  Slide10FormulaRTCF,
  Slide11FormulaRISE,
  Slide12FormulaComparison,
  Slide13BestPractices,
  Slide14Workflow,
  Slide15RecapAndPreview,
] satisfies Page[];
