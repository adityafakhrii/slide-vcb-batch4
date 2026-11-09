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
  typeScale: { hero: 118, body: 28 },
  radius: 24,
};

const SLIDE_ID = 'vibe-coding-sesi-3';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..800&family=Newsreader:ital,opsz,wght@1,6..72,400&family=JetBrains+Mono:wght@500;700&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;
const KEYFRAMES = `
@keyframes s3-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes s3-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes s3-grow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
.s3-interactive { transition: transform 0.18s cubic-bezier(0, 0, 0.2, 1), box-shadow 0.18s cubic-bezier(0, 0, 0.2, 1), background-color 0.18s ease; cursor: pointer; user-select: none; }
.s3-interactive:hover { transform: translateY(-2px); }
.s3-interactive:active { transform: translateY(0); }
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
  const id = `s3${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
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
    style={{ animation: live ? `s3-draw ${dur}s ${EASE_OUT} ${delay}s both` : undefined }}
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
        <span>Vibe Coding Bootcamp · Batch 4 · Sesi 3</span>
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

const CoverDualWebArt = ({ live }: { live: boolean }) => (
  <Ink width={820} height={720} style={abs(980, 140)}>
    <circle cx="430" cy="360" r="250" fill={TINT_TEAL} stroke="none" />
    <circle cx="590" cy="210" r="108" fill={YELLOW} stroke="none" />

    <rect x="230" y="120" width="440" height="290" rx="18" fill="#FFFFFF" />
    <path d="M230 166H670" />
    <circle cx="258" cy="143" r="6" fill={CORAL_HEX} stroke="none" />
    <circle cx="278" cy="143" r="6" fill={YELLOW} stroke="none" />
    <circle cx="298" cy="143" r="6" fill={GREEN} stroke="none" />
    <rect x="258" y="190" width="384" height="86" rx="10" fill={INK_HEX} />
    <path d="M284 222h170M284 248h110" stroke="#FFFFFF" strokeWidth={3.2} />
    <rect x="520" y="212" width="96" height="36" rx="8" fill={CORAL_HEX} stroke="none" />
    <rect x="258" y="294" width="118" height="90" rx="10" fill={TINT_NEUTRAL} />
    <rect x="391" y="294" width="118" height="90" rx="10" fill={TINT_YELLOW} />
    <rect x="524" y="294" width="118" height="90" rx="10" fill={TINT_PINK} />

    <rect x="60" y="290" width="450" height="310" rx="18" fill="#FFFFFF" />
    <path d="M60 336H510" />
    <circle cx="88" cy="313" r="6" fill={CORAL_HEX} stroke="none" />
    <circle cx="108" cy="313" r="6" fill={YELLOW} stroke="none" />
    <circle cx="128" cy="313" r="6" fill={GREEN} stroke="none" />
    <circle cx="138" cy="408" r="36" fill={TINT_TEAL} />
    <circle cx="138" cy="398" r="12" fill={TEAL_HEX} stroke="none" />
    <path d="M118 428Q138 412 158 428" stroke={TEAL_HEX} strokeWidth={3.2} />
    <path d="M196 388h180M196 414h250M196 438h140" strokeWidth={3.2} />
    <rect x="92" y="472" width="184" height="98" rx="10" fill={TINT_TEAL} />
    <rect x="294" y="472" width="184" height="98" rx="10" fill={TINT_BLUE} />
    <path d="M114 542h110M316 542h110" strokeWidth={2.8} />

    <Sparkle x={150} y={210} s={0.95} fill={TEAL_HEX} />
    <Sparkle x={710} y={130} s={1.1} fill={YELLOW} />
    <Sparkle x={720} y={340} s={0.75} fill={PINK} />

    <Figure x={660} y={640} shirt={TEAL_HEX} />
    <path d="M20 642Q300 636 560 640T790 639" />
    <Stroke
      d="M170 250C140 195 180 150 220 165"
      color={TEAL_HEX}
      live={live}
      delay={0.45}
    />
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
          VIBE CODING BOOTCAMP · BATCH 4 · SESI 3
        </span>
      </div>

      <h1 style={{ ...abs(X0, 210, 880), ...headline(108) }}>
        Build Portfolio &amp;
        <br />
        Landing Page.
      </h1>

      <p
        style={{
          ...abs(X0, 488, 820),
          margin: 0,
          fontSize: 38,
          fontFamily: SERIF,
          fontStyle: 'italic',
          lineHeight: 1.35,
          color: INK,
        }}
      >
        From <Highlight color={HIGHLIGHT_TEAL}>Personal Brand</Highlight> to{' '}
        <Highlight>Product Presence</Highlight>
      </p>

      <p
        style={{
          ...abs(X0, 578, 800),
          margin: 0,
          fontSize: 25,
          lineHeight: 1.52,
          color: BODY,
        }}
      >
        Merancang konsep UI di <strong style={{ color: INK }}>Google Stitch</strong> dan membangun
        dua website fungsional di <strong style={{ color: INK }}>Google AI Studio</strong>:
        Personal Portfolio (<span style={{ fontFamily: MONO, fontSize: 22 }}>adityafakhri.id</span>)
        dan Product Landing Page (<strong style={{ color: INK }}>UrbanStore</strong>).
      </p>

      <div style={{ ...abs(X0, 760), ...row, gap: 14 }}>
        <span
          style={{
            padding: '10px 20px',
            borderRadius: 99,
            background: TINT_TEAL,
            fontSize: 20,
            fontWeight: 720,
            color: TEAL_HEX,
          }}
        >
          01 · Personal Portfolio Website
        </span>
        <span
          style={{
            padding: '10px 20px',
            borderRadius: 99,
            background: TINT_YELLOW,
            fontSize: 20,
            fontWeight: 720,
            color: '#946200',
          }}
        >
          02 · UrbanStore Landing Page
        </span>
        <span
          style={{
            padding: '10px 20px',
            borderRadius: 99,
            background: TINT_PINK,
            fontSize: 20,
            fontWeight: 720,
            color: CORAL_HEX,
          }}
        >
          Google Stitch + AI Studio
        </span>
      </div>

      <div style={{ ...abs(X0, 880), fontSize: 21, fontWeight: 650, color: SOFT }}>
        by CODEPOLITAN
      </div>

      <CoverDualWebArt live={live} />
      <CircleDoodle x={104} y={320} w={740} h={146} color={CORAL_HEX} live={live} delay={0.4} />
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
    className="s3-interactive"
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
  const [selected, setSelected] = useState(3);

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
          fontSize: 23,
          lineHeight: 1.46,
          color: BODY,
        }}
      >
        Hari ini kita menghasilkan <Highlight color={HIGHLIGHT_TEAL}>dua website</Highlight> dengan
        tujuan berbeda.
      </p>

      <Ink width={420} height={50} style={abs(X0, 396)}>
        <TallyBox x={0} />
        <TallyBox x={56} />
        <TallyBox x={112} />
        <TallyBox x={168} accent />
        <TallyBox x={224} />
        <TallyBox x={280} accent />
        <TallyBox x={336} />
      </Ink>

      <div style={{ ...abs(X0, 474, 580), fontSize: 20, fontWeight: 780, color: INK }}>
        DUA OUTPUT SESI 3
      </div>

      <div
        style={{
          ...abs(X0, 514, 580, 194),
          borderRadius: 22,
          background: TINT_TEAL,
          border: `2px solid ${TEAL_HEX}`,
          padding: '22px 26px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 760, color: TEAL_HEX }}>
            01 · PERSONAL BRAND
          </span>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: INK }}>
            adityafakhri.id
          </span>
        </div>
        <div>
          <div style={{ ...headline(32), marginBottom: 8 }}>Personal Portfolio Website</div>
          <div style={{ fontSize: 21, lineHeight: 1.38, color: BODY }}>
            Memperkenalkan diri, skill, pengalaman, dan project.
          </div>
        </div>
      </div>

      <div
        style={{
          ...abs(X0, 728, 580, 194),
          borderRadius: 22,
          background: TINT_YELLOW,
          border: `2px solid #E2B93B`,
          padding: '22px 26px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between' }}>
          <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 760, color: '#946200' }}>
            02 · PRODUCT PRESENCE
          </span>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: CORAL_HEX }}>
            UrbanStore
          </span>
        </div>
        <div>
          <div style={{ ...headline(32), marginBottom: 8 }}>Product Landing Page</div>
          <div style={{ fontSize: 21, lineHeight: 1.38, color: BODY }}>
            Memperkenalkan produk dan mengajak pengunjung melakukan tindakan.
          </div>
        </div>
      </div>

      <ObjectiveRow
        top={146}
        code="01"
        text="Memahami fungsi dan struktur Personal Portfolio Website."
        tag="Portfolio Core"
        active={selected === 0}
        onClick={() => setSelected(0)}
      />
      <ObjectiveRow
        top={254}
        code="02"
        text="Menentukan konten utama untuk memperkenalkan diri secara profesional."
        tag="Content Prep"
        active={selected === 1}
        onClick={() => setSelected(1)}
      />
      <ObjectiveRow
        top={362}
        code="03"
        text="Mencari dan menganalisis referensi desain website."
        tag="Reference"
        active={selected === 2}
        onClick={() => setSelected(2)}
      />
      <ObjectiveRow
        top={470}
        code="04"
        text="Membuat konsep UI menggunakan Google Stitch."
        tag="Google Stitch"
        accent
        active={selected === 3}
        onClick={() => setSelected(3)}
      />
      <ObjectiveRow
        top={578}
        code="05"
        text="Menyusun copywriting dengan bantuan AI."
        tag="Copywriting"
        active={selected === 4}
        onClick={() => setSelected(4)}
      />
      <ObjectiveRow
        top={686}
        code="06"
        text="Mengembangkan website menggunakan Google AI Studio."
        tag="AI Studio"
        accent
        active={selected === 5}
        onClick={() => setSelected(5)}
      />
      <ObjectiveRow
        top={794}
        code="07"
        text="Melakukan review dan refinement terhadap hasil AI."
        tag="Quality Check"
        active={selected === 6}
        onClick={() => setSelected(6)}
      />
      <div style={{ ...abs(760, 902, 1040), borderTop: `1.5px solid ${RULE}` }} />
      <UnderlineDoodle x={X0} y={282} w={340} color={TEAL_HEX} live={live} />
    </Frame>
  );
};

const QuestionRow = ({
  code,
  text,
  accentColor,
}: {
  code: string;
  text: string;
  accentColor: string;
}) => (
  <div
    style={{
      ...row,
      gap: 14,
      background: '#FFFFFF',
      padding: '12px 18px',
      borderRadius: 12,
      fontSize: 22,
      fontWeight: 640,
      color: INK,
    }}
  >
    <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: accentColor }}>
      {code}
    </span>
    <span>{text}</span>
  </div>
);

const Slide03TwoWebsites: Page = () => {
  const live = useIsActivePage();
  const [focusSide, setFocusSide] = useState<'both' | 'portfolio' | 'landing'>('both');

  return (
    <Frame>
      <Eyebrow>Dua Website, Dua Tujuan Berbeda</Eyebrow>
      <h2 style={{ ...abs(X0, 132, 1480), ...headline(66) }}>
        Website bukan hanya soal tampilan.{' '}
        <Highlight color={HIGHLIGHT_TEAL}>Setiap halaman harus punya tujuan.</Highlight>
      </h2>

      <div style={{ ...abs(1380, 84), ...row, gap: 10 }}>
        <button
          type="button"
          onClick={() => setFocusSide('both')}
          className="s3-interactive"
          style={{
            padding: '8px 18px',
            borderRadius: 99,
            border: `1.5px solid ${focusSide === 'both' ? INK_HEX : RULE}`,
            background: focusSide === 'both' ? INK_HEX : '#FFFFFF',
            color: focusSide === 'both' ? '#FFFFFF' : BODY,
            fontSize: 18,
            fontWeight: 680,
          }}
        >
          Bandingkan
        </button>
        <button
          type="button"
          onClick={() => setFocusSide('portfolio')}
          className="s3-interactive"
          style={{
            padding: '8px 18px',
            borderRadius: 99,
            border: `1.5px solid ${focusSide === 'portfolio' ? INK_HEX : RULE}`,
            background: focusSide === 'portfolio' ? INK_HEX : '#FFFFFF',
            color: focusSide === 'portfolio' ? '#FFFFFF' : BODY,
            fontSize: 18,
            fontWeight: 680,
          }}
        >
          01 · Portfolio
        </button>
        <button
          type="button"
          onClick={() => setFocusSide('landing')}
          className="s3-interactive"
          style={{
            padding: '8px 18px',
            borderRadius: 99,
            border: `1.5px solid ${focusSide === 'landing' ? INK_HEX : RULE}`,
            background: focusSide === 'landing' ? INK_HEX : '#FFFFFF',
            color: focusSide === 'landing' ? '#FFFFFF' : BODY,
            fontSize: 18,
            fontWeight: 680,
          }}
        >
          02 · Landing Page
        </button>
      </div>

      <div
        onClick={() => setFocusSide(focusSide === 'portfolio' ? 'both' : 'portfolio')}
        className="s3-interactive"
        style={{
          ...abs(X0, 286, 816, 548),
          borderRadius: 26,
          background: TINT_TEAL,
          border: `2.5px solid ${focusSide === 'portfolio' ? INK_HEX : TEAL_HEX}`,
          opacity: focusSide === 'landing' ? 0.55 : 1,
          padding: '28px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: MONO, fontSize: 21, fontWeight: 780, color: TEAL_HEX }}>
              01 · PERSONAL PORTFOLIO WEBSITE
            </span>
            <span
              style={{
                padding: '6px 16px',
                borderRadius: 99,
                background: '#FFFFFF',
                fontFamily: MONO,
                fontSize: 18,
                fontWeight: 700,
                color: INK,
              }}
            >
              Contoh: adityafakhri.id
            </span>
          </div>

          <h3 style={{ ...headline(40), marginBottom: 10 }}>Personal Portfolio Website</h3>
          <p style={{ margin: '0 0 18px', fontSize: 22, lineHeight: 1.4, color: BODY }}>
            <strong style={{ color: INK }}>Tujuan:</strong> memperkenalkan siapa kita dan
            menunjukkan kredibilitas.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <QuestionRow code="Q1" text="Siapa kamu?" accentColor={TEAL_HEX} />
            <QuestionRow code="Q2" text="Apa keahlianmu?" accentColor={TEAL_HEX} />
            <QuestionRow
              code="Q3"
              text="Apa pengalaman atau karya yang pernah dibuat?"
              accentColor={TEAL_HEX}
            />
            <QuestionRow
              code="Q4"
              text="Bagaimana orang bisa menghubungimu?"
              accentColor={TEAL_HEX}
            />
          </div>
        </div>

        <div
          style={{
            ...row,
            justifyContent: 'space-between',
            paddingTop: 12,
            borderTop: `1.5px solid ${RULE}`,
            fontSize: 19,
            fontWeight: 700,
            color: TEAL_HEX,
          }}
        >
          <span>Fokus: Profil, Skill, Bukti Karya &amp; Kredibilitas</span>
          <span>adityafakhri.id →</span>
        </div>
      </div>

      <div
        onClick={() => setFocusSide(focusSide === 'landing' ? 'both' : 'landing')}
        className="s3-interactive"
        style={{
          ...abs(984, 286, 816, 548),
          borderRadius: 26,
          background: TINT_YELLOW,
          border: `2.5px solid ${focusSide === 'landing' ? INK_HEX : '#E2B93B'}`,
          opacity: focusSide === 'portfolio' ? 0.55 : 1,
          padding: '28px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: MONO, fontSize: 21, fontWeight: 780, color: '#946200' }}>
              02 · PRODUCT LANDING PAGE
            </span>
            <span
              style={{
                padding: '6px 16px',
                borderRadius: 99,
                background: INK_HEX,
                fontFamily: MONO,
                fontSize: 18,
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              Studi kasus: UrbanStore
            </span>
          </div>

          <h3 style={{ ...headline(40), marginBottom: 10 }}>Product Landing Page</h3>
          <p style={{ margin: '0 0 18px', fontSize: 22, lineHeight: 1.4, color: BODY }}>
            <strong style={{ color: INK }}>Tujuan:</strong> memperkenalkan produk dan mendorong
            pengunjung melakukan tindakan.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <QuestionRow code="Q1" text="Produk apa yang ditawarkan?" accentColor={CORAL_HEX} />
            <QuestionRow code="Q2" text="Masalah apa yang diselesaikan?" accentColor={CORAL_HEX} />
            <QuestionRow code="Q3" text="Apa manfaat utamanya?" accentColor={CORAL_HEX} />
            <QuestionRow
              code="Q4"
              text="Apa yang harus dilakukan pengunjung selanjutnya?"
              accentColor={CORAL_HEX}
            />
          </div>
        </div>

        <div
          style={{
            ...row,
            justifyContent: 'space-between',
            paddingTop: 12,
            borderTop: `1.5px solid ${RULE}`,
            fontSize: 19,
            fontWeight: 700,
            color: '#946200',
          }}
        >
          <span>Fokus: Value Proposition, Koleksi &amp; Call to Action</span>
          <span>UrbanStore →</span>
        </div>
      </div>

      <div
        style={{
          ...abs(X0, 858, W, 96),
          borderRadius: 20,
          background: INK_HEX,
          color: '#FFFFFF',
          padding: '0 36px',
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...row, gap: 18, fontSize: 28, fontWeight: 720 }}>
          <span style={{ color: YELLOW }}>★</span>
          <span>
            Portfolio builds <span style={{ color: '#7CE8E4' }}>trust in you</span>. Landing page
            builds <span style={{ color: YELLOW }}>interest in your product</span>.
          </span>
        </div>
        <span style={{ fontFamily: MONO, fontSize: 19, color: '#C8C7C4' }}>
          Dua Tujuan · Satu Alur Kerja
        </span>
      </div>

      <UnderlineDoodle x={X0} y={252} w={520} color={TEAL_HEX} live={live} delay={0.4} />
    </Frame>
  );
};

const PersonaItem = ({ index, label, even }: { index: string; label: string; even?: boolean }) => (
  <div
    style={{
      ...row,
      gap: 16,
      background: '#FFFFFF',
      padding: '15px 20px',
      borderRadius: 14,
      border: `1.5px solid ${RULE}`,
      fontSize: 22,
      fontWeight: 630,
      color: INK,
    }}
  >
    <span
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: even ? TINT_TEAL : TINT_YELLOW,
        color: even ? TEAL_HEX : '#946200',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: MONO,
        fontSize: 17,
        fontWeight: 760,
      }}
    >
      {index}
    </span>
    <span>{label}</span>
  </div>
);

const PortfolioStructCard = ({
  num,
  title,
  desc,
  selected,
  onClick,
}: {
  num: string;
  title: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s3-interactive"
    style={{
      borderRadius: 16,
      padding: '18px 20px',
      background: selected ? TINT_TEAL : TINT_NEUTRAL,
      border: `2px solid ${selected ? TEAL_HEX : 'transparent'}`,
    }}
  >
    <div style={{ ...row, justifyContent: 'space-between', marginBottom: 6 }}>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 20,
          fontWeight: 780,
          color: selected ? TEAL_HEX : SOFT,
        }}
      >
        {num}
      </span>
      {selected && <span style={{ fontSize: 17, fontWeight: 750, color: TEAL_HEX }}>AKTIF</span>}
    </div>
    <div style={{ fontSize: 24, fontWeight: 740, color: INK, marginBottom: 6 }}>{title}</div>
    <div style={{ fontSize: 19, lineHeight: 1.36, color: BODY }}>{desc}</div>
  </div>
);

const Slide04PortfolioOverview: Page = () => {
  const [activeStruct, setActiveStruct] = useState(0);

  const previews = [
    '01 · HERO: Nama lengkap, professional headline, dan tombol CTA utama.',
    '02 · ABOUT ME: Ringkasan perjalanan karier, fokus bidang, dan nilai kerja.',
    '03 · SKILLS & EXPERTISE: TypeScript · React · Tailwind CSS · UI/UX Design.',
    '04 · PROJECTS: Karya nyata disertai masalah, peran, dan link demo.',
    '05 · EXPERIENCE / EDUCATION: Riwayat kerja, organisasi, atau pendidikan.',
    '06 · CONTACT & SOCIALS: Email profesional, LinkedIn, dan GitHub.',
  ];

  return (
    <Frame>
      <Eyebrow>Project 1 · Personal Portfolio Website</Eyebrow>
      <h2 style={{ ...abs(X0, 132, W), ...headline(56) }}>
        Jadikan kemampuan dan pengalamanmu{' '}
        <Highlight color={HIGHLIGHT_TEAL}>mudah ditemukan.</Highlight>
      </h2>
      <p
        style={{
          ...abs(X0, 208, 1460),
          margin: 0,
          fontSize: 24,
          lineHeight: 1.45,
          color: BODY,
        }}
      >
        Personal Portfolio Website adalah website yang merangkum identitas profesional, keahlian,
        pengalaman, dan hasil karya seseorang.
      </p>

      <div
        style={{
          ...abs(X0, 300, 680, 646),
          borderRadius: 24,
          background: TINT_NEUTRAL,
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 760, color: TEAL_HEX }}>
            TARGET PENGGUNA
          </div>
          <h3 style={{ ...headline(36), margin: '8px 0 20px' }}>
            Siapa yang Membutuhkan Portfolio?
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <PersonaItem index="1" label="Mahasiswa dan fresh graduate." even />
            <PersonaItem index="2" label="Programmer dan UI/UX designer." />
            <PersonaItem index="3" label="Freelancer dan consultant." even />
            <PersonaItem index="4" label="Mentor, speaker, dan content creator." />
            <PersonaItem index="5" label="Profesional yang ingin membangun personal brand." even />
          </div>
        </div>

        <div
          style={{
            borderRadius: 16,
            background: TINT_TEAL,
            border: `1.5px solid ${TEAL_HEX}`,
            padding: '16px 20px',
            fontSize: 21,
            lineHeight: 1.4,
            color: INK,
          }}
        >
          <strong style={{ color: TEAL_HEX }}>Output:</strong> Website personal yang membantu
          pengunjung memahami profil dan melihat bukti kemampuan pemiliknya.
        </div>
      </div>

      <div
        style={{
          ...abs(836, 300, 964, 646),
          borderRadius: 24,
          background: '#FFFFFF',
          border: `2px solid ${INK_HEX}`,
          padding: '28px 34px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 760, color: CORAL_HEX }}>
                ARSITEKTUR HALAMAN
              </div>
              <h3 style={{ ...headline(36), marginTop: 6 }}>Struktur Portfolio</h3>
            </div>
            <span style={{ fontSize: 19, color: SOFT }}>Klik section untuk melihat fungsi</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <PortfolioStructCard
              num="01"
              title="Hero / Introduction"
              desc="Nama lengkap, professional headline, dan tombol CTA utama."
              selected={activeStruct === 0}
              onClick={() => setActiveStruct(0)}
            />
            <PortfolioStructCard
              num="02"
              title="About Me"
              desc="Ringkasan latar belakang, fokus keahlian, dan nilai profesional."
              selected={activeStruct === 1}
              onClick={() => setActiveStruct(1)}
            />
            <PortfolioStructCard
              num="03"
              title="Skills & Expertise"
              desc="Daftar kemampuan utama, bahasa pemrograman, dan tools kerja."
              selected={activeStruct === 2}
              onClick={() => setActiveStruct(2)}
            />
            <PortfolioStructCard
              num="04"
              title="Projects / Portfolio"
              desc="Karya pilihan lengkap dengan konteks masalah, peran, dan link demo."
              selected={activeStruct === 3}
              onClick={() => setActiveStruct(3)}
            />
            <PortfolioStructCard
              num="05"
              title="Experience / Education"
              desc="Riwayat kerja, organisasi, pendidikan, atau sertifikasi relevan."
              selected={activeStruct === 4}
              onClick={() => setActiveStruct(4)}
            />
            <PortfolioStructCard
              num="06"
              title="Contact & Social Links"
              desc="Jalur komunikasi langsung via email, LinkedIn, dan GitHub."
              selected={activeStruct === 5}
              onClick={() => setActiveStruct(5)}
            />
          </div>
        </div>

        <div
          style={{
            borderRadius: 16,
            background: INK_HEX,
            color: '#FFFFFF',
            padding: '18px 24px',
            ...row,
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: 21, fontWeight: 650, color: '#FFFFFF' }}>
            {previews[activeStruct]}
          </div>
          <span style={{ fontFamily: MONO, fontSize: 18, color: YELLOW, whiteSpace: 'nowrap' }}>
            Section {activeStruct + 1}/6
          </span>
        </div>
      </div>
    </Frame>
  );
};

const RefElementTile = ({
  code,
  name,
  detail,
  active,
  onClick,
}: {
  code: string;
  name: string;
  detail: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s3-interactive"
    style={{
      borderRadius: 16,
      padding: '18px 20px',
      background: active ? TINT_TEAL : TINT_NEUTRAL,
      border: `2px solid ${active ? TEAL_HEX : 'transparent'}`,
    }}
  >
    <div style={{ ...row, justifyContent: 'space-between', marginBottom: 6 }}>
      <span style={{ fontSize: 24, fontWeight: 760, color: INK }}>{name}</span>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 17,
          fontWeight: 700,
          color: active ? TEAL_HEX : SOFT,
        }}
      >
        {code}
      </span>
    </div>
    <div style={{ fontSize: 20, lineHeight: 1.36, color: BODY }}>{detail}</div>
  </div>
);

const DiscussionRow = ({ num, text }: { num: string; text: string }) => (
  <div
    style={{
      ...row,
      gap: 14,
      background: '#FFFFFF',
      padding: '15px 18px',
      borderRadius: 14,
      fontSize: 21,
      fontWeight: 640,
      color: INK,
      lineHeight: 1.35,
    }}
  >
    <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 780, color: '#946200', minWidth: 28 }}>
      {num}
    </span>
    <span>{text}</span>
  </div>
);

const Slide05PortfolioReference: Page = () => {
  const [selectedEl, setSelectedEl] = useState(0);

  const obsTitles = [
    'Hero: nama, professional headline, dan CTA.',
    'About: ringkasan profil dan value profesional.',
    'Skills: area keahlian dan teknologi.',
    'Projects: karya yang menunjukkan pengalaman.',
    'Experience & Events: pengalaman profesional dan aktivitas.',
    'Contact: jalur untuk menghubungi pemilik website.',
  ];

  const obsNotes = [
    'Pengunjung langsung mengenali identitas pemilik website dan aksi utama sejak detik pertama.',
    'Narasi singkat membangun konteks siapa pemilik website dan fokus kontribusinya.',
    'Keahlian dikelompokkan secara rapi sehingga mudah dipindai oleh recruiter atau klien.',
    'Setiap project menampilkan bukti nyata yang memperkuat klaim keahlian.',
    'Dokumentasi aktivitas mengajar, berbicara, dan berkarya membangun kredibilitas.',
    'Tautan kontak dan media sosial ditempatkan jelas agar mudah dihubungi.',
  ];

  return (
    <Frame>
      <Eyebrow>Referensi Portfolio · Studi Kasus Nyata</Eyebrow>
      <h2 style={{ ...abs(X0, 132, 1100), ...headline(66) }}>
        Contoh nyata <Highlight color={HIGHLIGHT_TEAL}>Personal Portfolio Website</Highlight>
      </h2>

      <div
        style={{
          ...abs(1260, 136, 540, 62),
          borderRadius: 16,
          background: INK_HEX,
          color: '#FFFFFF',
          padding: '0 24px',
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 19, color: '#B8B7B4' }}>Website Referensi:</span>
        <span style={{ fontFamily: MONO, fontSize: 22, fontWeight: 700, color: '#7CE8E4' }}>
          https://adityafakhri.id
        </span>
      </div>

      <p style={{ ...abs(X0, 220, 1200), margin: 0, fontSize: 24, color: BODY }}>
        Amati bagaimana informasi personal dan profesional disusun dalam satu website.
      </p>

      <div
        style={{
          ...abs(X0, 282, 980, 670),
          borderRadius: 24,
          background: '#FFFFFF',
          border: `2.5px solid ${INK_HEX}`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            height: 54,
            background: TINT_NEUTRAL,
            borderBottom: `1.5px solid ${RULE}`,
            padding: '0 22px',
            ...row,
            justifyContent: 'space-between',
          }}
        >
          <div style={{ ...row, gap: 10 }}>
            <span style={{ width: 12, height: 12, borderRadius: 99, background: CORAL_HEX }} />
            <span style={{ width: 12, height: 12, borderRadius: 99, background: YELLOW }} />
            <span style={{ width: 12, height: 12, borderRadius: 99, background: GREEN }} />
            <span
              style={{
                marginLeft: 12,
                padding: '4px 16px',
                borderRadius: 8,
                background: '#FFFFFF',
                fontFamily: MONO,
                fontSize: 17,
                color: INK,
              }}
            >
              adityafakhri.id · Elemen yang Bisa Diamati
            </span>
          </div>
          <span style={{ fontSize: 17, fontWeight: 680, color: TEAL_HEX }}>
            Klik elemen untuk inspeksi
          </span>
        </div>

        <div
          style={{
            padding: '24px 28px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <RefElementTile
              code="01"
              name="Hero"
              detail="Nama, professional headline, dan CTA."
              active={selectedEl === 0}
              onClick={() => setSelectedEl(0)}
            />
            <RefElementTile
              code="02"
              name="About"
              detail="Ringkasan profil dan value profesional."
              active={selectedEl === 1}
              onClick={() => setSelectedEl(1)}
            />
            <RefElementTile
              code="03"
              name="Skills"
              detail="Area keahlian dan teknologi."
              active={selectedEl === 2}
              onClick={() => setSelectedEl(2)}
            />
            <RefElementTile
              code="04"
              name="Projects"
              detail="Karya yang menunjukkan pengalaman."
              active={selectedEl === 3}
              onClick={() => setSelectedEl(3)}
            />
            <RefElementTile
              code="05"
              name="Experience & Events"
              detail="Pengalaman profesional dan aktivitas."
              active={selectedEl === 4}
              onClick={() => setSelectedEl(4)}
            />
            <RefElementTile
              code="06"
              name="Contact"
              detail="Jalur untuk menghubungi pemilik website."
              active={selectedEl === 5}
              onClick={() => setSelectedEl(5)}
            />
          </div>

          <div
            style={{
              borderRadius: 18,
              background: TINT_TEAL,
              border: `1.5px solid ${TEAL_HEX}`,
              padding: '20px 24px',
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 18,
                fontWeight: 760,
                color: TEAL_HEX,
                marginBottom: 6,
              }}
            >
              CATATAN OBSERVASI · 0{selectedEl + 1}
            </div>
            <div style={{ fontSize: 23, fontWeight: 700, color: INK, marginBottom: 4 }}>
              {obsTitles[selectedEl]}
            </div>
            <div style={{ fontSize: 20, color: BODY }}>{obsNotes[selectedEl]}</div>
          </div>
        </div>
      </div>

      <div
        style={{
          ...abs(1132, 282, 668, 670),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            borderRadius: 24,
            background: TINT_YELLOW,
            border: `2px solid #E2B93B`,
            padding: '28px 32px',
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 760, color: '#946200' }}>
            ANALISIS REFERENSI
          </div>
          <h3 style={{ ...headline(36), margin: '8px 0 20px' }}>Diskusikan</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <DiscussionRow num="01" text="Informasi apa yang langsung terlihat?" />
            <DiscussionRow num="02" text="Bagian mana yang membangun kepercayaan?" />
            <DiscussionRow num="03" text="Bagaimana pengunjung diarahkan ke portfolio atau kontak?" />
            <DiscussionRow num="04" text="Apa yang bisa disederhanakan untuk portfolio pemula?" />
          </div>
        </div>

        <div
          style={{
            borderRadius: 22,
            background: TINT_PINK,
            border: `2px solid ${CORAL_HEX}`,
            padding: '22px 28px',
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 19,
              fontWeight: 780,
              color: CORAL_HEX,
              marginBottom: 6,
            }}
          >
            IMPORTANT
          </div>
          <div style={{ fontSize: 22, lineHeight: 1.42, fontWeight: 640, color: INK }}>
            Gunakan sebagai referensi struktur dan penyajian informasi. Jangan menyalin identitas,
            konten, atau desainnya secara mentah.
          </div>
        </div>
      </div>
    </Frame>
  );
};

const ContentChecklistCard = ({
  code,
  title,
  tint,
  accent,
  b1,
  b2,
  b3,
  b4,
  done,
  onClick,
}: {
  code: string;
  title: string;
  tint: string;
  accent: string;
  b1: string;
  b2: string;
  b3?: string;
  b4?: string;
  done: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s3-interactive"
    style={{
      borderRadius: 24,
      background: tint,
      border: `2px solid ${done ? INK_HEX : 'transparent'}`,
      padding: '24px 28px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div>
      <div style={{ ...row, justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 780, color: accent }}>
          {code} · CHECKLIST
        </span>
        <span
          style={{
            padding: '4px 12px',
            borderRadius: 99,
            background: done ? INK_HEX : '#FFFFFF',
            color: done ? '#FFFFFF' : BODY,
            fontSize: 16,
            fontWeight: 720,
          }}
        >
          {done ? '✓ Siap' : 'Klik Cek'}
        </span>
      </div>

      <h3 style={{ ...headline(33), marginBottom: 14 }}>{title}</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <div style={{ ...row, gap: 10, fontSize: 21, lineHeight: 1.32, color: INK, fontWeight: 560 }}>
          <span style={{ color: accent, fontWeight: 800 }}>•</span>
          <span>{b1}</span>
        </div>
        <div style={{ ...row, gap: 10, fontSize: 21, lineHeight: 1.32, color: INK, fontWeight: 560 }}>
          <span style={{ color: accent, fontWeight: 800 }}>•</span>
          <span>{b2}</span>
        </div>
        {b3 && (
          <div style={{ ...row, gap: 10, fontSize: 21, lineHeight: 1.32, color: INK, fontWeight: 560 }}>
            <span style={{ color: accent, fontWeight: 800 }}>•</span>
            <span>{b3}</span>
          </div>
        )}
        {b4 && (
          <div style={{ ...row, gap: 10, fontSize: 21, lineHeight: 1.32, color: INK, fontWeight: 560 }}>
            <span style={{ color: accent, fontWeight: 800 }}>•</span>
            <span>{b4}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const Slide06PortfolioContent: Page = () => {
  const [c0, setC0] = useState(true);
  const [c1, setC1] = useState(true);
  const [c2, setC2] = useState(false);
  const [c3, setC3] = useState(false);
  const [c4, setC4] = useState(false);

  return (
    <Frame>
      <Eyebrow>Menyiapkan Konten Portfolio · Portfolio Content Checklist</Eyebrow>
      <h2 style={{ ...abs(X0, 132, W), ...headline(56) }}>
        Sebelum membuat desain,{' '}
        <Highlight color={HIGHLIGHT}>siapkan bahan yang akan ditampilkan.</Highlight>
      </h2>

      <div
        style={{
          ...abs(X0, 260, W, 686),
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: '1fr 1fr',
          gap: 22,
        }}
      >
        <ContentChecklistCard
          code="01"
          title="Personal Identity"
          tint={TINT_TEAL}
          accent={TEAL_HEX}
          b1="Nama dan foto (opsional)."
          b2="Professional headline."
          b3="Deskripsi singkat tentang diri."
          done={c0}
          onClick={() => setC0(!c0)}
        />
        <ContentChecklistCard
          code="02"
          title="Skills & Expertise"
          tint={TINT_YELLOW}
          accent="#946200"
          b1="Skill utama."
          b2="Tools atau teknologi yang dikuasai."
          b3="Area spesialisasi."
          done={c1}
          onClick={() => setC1(!c1)}
        />
        <ContentChecklistCard
          code="03"
          title="Experience & Achievement"
          tint={TINT_BLUE}
          accent="#2B6CB0"
          b1="Pengalaman kerja atau organisasi."
          b2="Pendidikan atau sertifikasi."
          b3="Penghargaan atau pencapaian (jika ada)."
          done={c2}
          onClick={() => setC2(!c2)}
        />
        <ContentChecklistCard
          code="04"
          title="Projects"
          tint={TINT_PINK}
          accent={CORAL_HEX}
          b1="Nama project."
          b2="Masalah atau tujuan project."
          b3="Peran dan kontribusi."
          b4="Link demo atau repository (jika tersedia)."
          done={c3}
          onClick={() => setC3(!c3)}
        />
        <ContentChecklistCard
          code="05"
          title="Contact"
          tint={TINT_GREEN}
          accent="#2F7A43"
          b1="Email profesional."
          b2="LinkedIn, GitHub, atau media sosial relevan."
          done={c4}
          onClick={() => setC4(!c4)}
        />

        <div
          style={{
            borderRadius: 24,
            background: INK_HEX,
            color: '#FFFFFF',
            padding: '26px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 19,
                fontWeight: 780,
                color: YELLOW,
                marginBottom: 10,
              }}
            >
              TIPS · PRINSIP KEJUJURAN KONTEN
            </div>
            <h3 style={{ ...headline(32), color: '#FFFFFF', marginBottom: 12 }}>
              Jangan Mengarang Pengalaman atau Skill
            </h3>
            <p style={{ margin: 0, fontSize: 21, lineHeight: 1.46, color: '#E2E1DD' }}>
              Jika belum punya pengalaman kerja, tampilkan{' '}
              <span style={{ color: '#7CE8E4', fontWeight: 700 }}>
                project latihan, kontribusi, atau karya
              </span>{' '}
              yang benar-benar pernah dibuat.
            </p>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 18, color: YELLOW }}>
            Kredibilitas dibangun dari karya nyata.
          </div>
        </div>
      </div>
    </Frame>
  );
};

const StitchStepNode = ({
  step,
  label,
  sub,
  active,
  highlight = false,
  onClick,
}: {
  step: string;
  label: string;
  sub: string;
  active: boolean;
  highlight?: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s3-interactive"
    style={{
      flex: 1,
      borderRadius: 16,
      padding: '14px 18px',
      background: active ? (highlight ? TEAL_HEX : INK_HEX) : '#FFFFFF',
      color: active ? '#FFFFFF' : INK,
      border: `2px solid ${highlight ? TEAL_HEX : RULE}`,
    }}
  >
    <div
      style={{
        fontFamily: MONO,
        fontSize: 16,
        fontWeight: 760,
        color: active ? YELLOW : TEAL_HEX,
        marginBottom: 4,
      }}
    >
      {step}
    </div>
    <div style={{ fontSize: 21, fontWeight: 760, marginBottom: 2 }}>{label}</div>
    <div style={{ fontSize: 17, color: active ? '#E5E4E0' : SOFT }}>{sub}</div>
  </div>
);

const StitchUseItem = ({ num, text }: { num: string; text: string }) => (
  <div
    style={{
      ...row,
      gap: 16,
      background: '#FFFFFF',
      padding: '15px 20px',
      borderRadius: 14,
      fontSize: 22,
      fontWeight: 640,
      color: INK,
    }}
  >
    <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 780, color: TEAL_HEX }}>{num}</span>
    <span>{text}</span>
  </div>
);

const Slide07GoogleStitch: Page = () => {
  const [activeFlow, setActiveFlow] = useState(2);

  return (
    <Frame>
      <Eyebrow>Google Stitch · Visualisasikan Portfolio</Eyebrow>
      <h2 style={{ ...abs(X0, 132, W), ...headline(56) }}>
        Buat <Highlight color={HIGHLIGHT_TEAL}>konsep UI</Highlight> sebelum masuk ke proses
        development.
      </h2>
      <p style={{ ...abs(X0, 208, 1380), margin: 0, fontSize: 24, color: BODY }}>
        Google Stitch membantu mengeksplorasi konsep antarmuka dari deskripsi dan arahan visual.
      </p>

      <MorphElement id="portfolio-workflow-bar">
        <div
          style={{
            ...abs(X0, 278, W, 128),
            borderRadius: 22,
            background: TINT_NEUTRAL,
            border: `1.5px solid ${RULE}`,
          }}
        />
      </MorphElement>
      <div
        style={{
          ...abs(X0, 278, W, 128),
          padding: '0 24px',
          ...row,
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <StitchStepNode
          step="STEP 01"
          label="Portfolio Content"
          sub="Bahan & profil diri"
          active={activeFlow === 0}
          onClick={() => setActiveFlow(0)}
        />
        <span style={{ fontSize: 24, fontWeight: 780, color: SOFT }}>→</span>
        <StitchStepNode
          step="STEP 02"
          label="Design Reference"
          sub="Inspirasi struktur"
          active={activeFlow === 1}
          onClick={() => setActiveFlow(1)}
        />
        <span style={{ fontSize: 24, fontWeight: 780, color: SOFT }}>→</span>
        <StitchStepNode
          step="STEP 03"
          label="Google Stitch"
          sub="Eksplorasi konsep UI"
          highlight
          active={activeFlow === 2}
          onClick={() => setActiveFlow(2)}
        />
        <span style={{ fontSize: 24, fontWeight: 780, color: SOFT }}>→</span>
        <StitchStepNode
          step="STEP 04"
          label="Review UI Concept"
          sub="Pilih & sesuaikan"
          active={activeFlow === 3}
          onClick={() => setActiveFlow(3)}
        />
        <span style={{ fontSize: 24, fontWeight: 780, color: SOFT }}>→</span>
        <StitchStepNode
          step="STEP 05"
          label="Google AI Studio"
          sub="Build website"
          active={activeFlow === 4}
          onClick={() => setActiveFlow(4)}
        />
      </div>

      <div
        style={{
          ...abs(X0, 432, 816, 514),
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
          <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 780, color: TEAL_HEX }}>
            EKSPLORASI VISUAL
          </div>
          <h3 style={{ ...headline(38), margin: '8px 0 20px' }}>Gunakan untuk:</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <StitchUseItem num="01" text="Membuat konsep layout portfolio." />
            <StitchUseItem num="02" text="Mengeksplorasi hero section." />
            <StitchUseItem num="03" text="Mencoba variasi typography dan warna." />
            <StitchUseItem num="04" text="Menentukan susunan section." />
            <StitchUseItem num="05" text="Membandingkan beberapa alternatif desain." />
          </div>
        </div>
      </div>

      <div
        style={{
          ...abs(984, 432, 816, 514),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 22,
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: 24,
            background: TINT_YELLOW,
            border: `2px solid #E2B93B`,
            padding: '28px 34px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 19,
              fontWeight: 780,
              color: '#946200',
              marginBottom: 8,
            }}
          >
            TIPS EKSPLORASI UI
          </div>
          <h3 style={{ ...headline(34), marginBottom: 14 }}>Tips Arahan Visual Portfolio</h3>
          <p style={{ margin: 0, fontSize: 23, lineHeight: 1.48, color: INK, fontWeight: 560 }}>
            Tentukan karakter visual yang sesuai dengan profesi, pastikan informasi utama mudah
            ditemukan, gunakan hierarchy yang jelas, dan hindari dekorasi yang mengganggu
            keterbacaan.
          </p>
        </div>

        <div
          style={{
            borderRadius: 24,
            background: TINT_PINK,
            border: `2px solid ${CORAL_HEX}`,
            padding: '26px 34px',
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 19,
              fontWeight: 780,
              color: CORAL_HEX,
              marginBottom: 8,
            }}
          >
            IMPORTANT
          </div>
          <div style={{ fontSize: 23, lineHeight: 1.44, fontWeight: 660, color: INK }}>
            Hasil Google Stitch adalah konsep visual yang tetap perlu direview dan disesuaikan
            sebelum diimplementasikan.
          </div>
        </div>
      </div>
    </Frame>
  );
};

const PrepInputRow = ({
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
    className="s3-interactive"
    style={{
      ...row,
      justifyContent: 'space-between',
      padding: '12px 18px',
      borderRadius: 12,
      background: active ? TINT_TEAL : TINT_NEUTRAL,
      border: `1.5px solid ${active ? TEAL_HEX : 'transparent'}`,
    }}
  >
    <div style={{ ...row, gap: 14 }}>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 18,
          fontWeight: 780,
          color: active ? TEAL_HEX : SOFT,
        }}
      >
        {num}
      </span>
      <span style={{ fontSize: 22, fontWeight: 680, color: INK }}>{title}</span>
    </div>
    <span style={{ fontSize: 18, color: active ? TEAL_HEX : SOFT }}>→</span>
  </div>
);

const StudioWorkflowTile = ({
  stage,
  title,
  final = false,
  accent = false,
}: {
  stage: string;
  title: string;
  final?: boolean;
  accent?: boolean;
}) => (
  <div
    style={{
      borderRadius: 16,
      padding: '18px 20px',
      background: final ? INK_HEX : '#FFFFFF',
      color: final ? '#FFFFFF' : INK,
      border: `1.5px solid ${accent ? TEAL_HEX : RULE}`,
    }}
  >
    <div
      style={{
        fontFamily: MONO,
        fontSize: 17,
        fontWeight: 760,
        color: final ? YELLOW : TEAL_HEX,
        marginBottom: 6,
      }}
    >
      {stage}
    </div>
    <div style={{ fontSize: 22, fontWeight: 740, lineHeight: 1.3 }}>{title}</div>
  </div>
);

const Slide08BuildPortfolioAIStudio: Page = () => {
  const [selectedInput, setSelectedInput] = useState(0);

  const inputDetails = [
    'Tujuan website: memperkenalkan profil profesional dan menampilkan karya nyata.',
    'Konten portfolio: bio singkat, daftar skill, project pilihan, pengalaman, dan kontak.',
    'Referensi desain: inspirasi tata letak dan alur informasi (seperti adityafakhri.id).',
    'Konsep UI dari Google Stitch: arahan layout dan komposisi visual hasil eksplorasi.',
    'Struktur section: urutan Hero, About, Skills, Projects, Experience, hingga Contact.',
    'Warna dan typography: palet warna yang bersih dan font yang mudah dibaca.',
    'Kebutuhan responsive: tampilan rapi dan proporsional di layar desktop maupun mobile.',
  ];

  return (
    <Frame>
      <Eyebrow>Build Portfolio dengan Google AI Studio</Eyebrow>
      <h2 style={{ ...abs(X0, 132, W), ...headline(56) }}>
        Dari konsep UI menjadi{' '}
        <Highlight color={HIGHLIGHT_TEAL}>website yang bisa digunakan.</Highlight>
      </h2>
      <p style={{ ...abs(X0, 208, 1420), margin: 0, fontSize: 24, color: BODY }}>
        Gunakan Google AI Studio sebagai environment untuk membangun dan mengembangkan website
        dengan bantuan AI.
      </p>

      <div
        style={{
          ...abs(X0, 282, 820, 664),
          borderRadius: 24,
          background: '#FFFFFF',
          border: `2px solid ${INK_HEX}`,
          padding: '26px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 780, color: TEAL_HEX }}>
              INPUT PREPARATION
            </span>
            <span style={{ fontSize: 18, color: SOFT }}>Klik item untuk detail</span>
          </div>
          <h3 style={{ ...headline(36), marginBottom: 16 }}>Siapkan Sebelum Generate</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <PrepInputRow
              num="01"
              title="Tujuan website."
              active={selectedInput === 0}
              onClick={() => setSelectedInput(0)}
            />
            <PrepInputRow
              num="02"
              title="Konten portfolio."
              active={selectedInput === 1}
              onClick={() => setSelectedInput(1)}
            />
            <PrepInputRow
              num="03"
              title="Referensi desain."
              active={selectedInput === 2}
              onClick={() => setSelectedInput(2)}
            />
            <PrepInputRow
              num="04"
              title="Konsep UI dari Google Stitch."
              active={selectedInput === 3}
              onClick={() => setSelectedInput(3)}
            />
            <PrepInputRow
              num="05"
              title="Struktur section."
              active={selectedInput === 4}
              onClick={() => setSelectedInput(4)}
            />
            <PrepInputRow
              num="06"
              title="Warna dan typography."
              active={selectedInput === 5}
              onClick={() => setSelectedInput(5)}
            />
            <PrepInputRow
              num="07"
              title="Kebutuhan responsive."
              active={selectedInput === 6}
              onClick={() => setSelectedInput(6)}
            />
          </div>
        </div>

        <div
          style={{
            borderRadius: 14,
            background: TINT_TEAL,
            padding: '14px 18px',
            fontSize: 20,
            color: INK,
            fontWeight: 600,
          }}
        >
          {inputDetails[selectedInput]}
        </div>
      </div>

      <MorphElement id="portfolio-workflow-bar">
        <div
          style={{
            ...abs(976, 282, 824, 502),
            borderRadius: 24,
            background: TINT_NEUTRAL,
            border: `1.5px solid ${RULE}`,
          }}
        />
      </MorphElement>
      <div
        style={{
          ...abs(976, 282, 824, 664),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 22,
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: 24,
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 780, color: CORAL_HEX }}>
              DEVELOPMENT WORKFLOW
            </div>
            <h3 style={{ ...headline(36), margin: '8px 0 20px' }}>Workflow Google AI Studio</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <StudioWorkflowTile stage="TAHAP 01" title="Brief + Content + UI Reference" />
              <StudioWorkflowTile stage="TAHAP 02" title="Google AI Studio" accent />
              <StudioWorkflowTile stage="TAHAP 03" title="Generate Portfolio" />
              <StudioWorkflowTile stage="TAHAP 04" title="Review" />
              <StudioWorkflowTile stage="TAHAP 05" title="Refine & Fix" />
              <StudioWorkflowTile stage="TAHAP 06" title="Portfolio Version 1" final />
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
              fontSize: 19,
              fontWeight: 780,
              color: '#946200',
              marginBottom: 6,
            }}
          >
            BEST PRACTICE
          </div>
          <div style={{ fontSize: 23, lineHeight: 1.44, fontWeight: 650, color: INK }}>
            Mulai dari struktur dan tampilan utama. Review hasilnya terlebih dahulu sebelum meminta
            AI melakukan perubahan lanjutan.
          </div>
        </div>
      </div>
    </Frame>
  );
};

Slide07GoogleStitch.transition = morphTransition;
Slide08BuildPortfolioAIStudio.transition = morphTransition;

const QualityCheckTile = ({
  code,
  text,
  done,
  onClick,
}: {
  code: string;
  text: string;
  done: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s3-interactive"
    style={{
      borderRadius: 16,
      padding: '18px 20px',
      background: done ? TINT_TEAL : '#FFFFFF',
      border: `2px solid ${done ? TEAL_HEX : RULE}`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 156,
    }}
  >
    <div style={{ ...row, justifyContent: 'space-between' }}>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 18,
          fontWeight: 760,
          color: done ? TEAL_HEX : SOFT,
        }}
      >
        {code}
      </span>
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: done ? TEAL_HEX : TINT_NEUTRAL,
          color: '#FFFFFF',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 17,
          fontWeight: 800,
        }}
      >
        {done ? '✓' : ''}
      </span>
    </div>
    <div style={{ fontSize: 21, fontWeight: 660, lineHeight: 1.35, color: INK }}>{text}</div>
  </div>
);

const Slide09PortfolioQualityCheck: Page = () => {
  const [q0, setQ0] = useState(true);
  const [q1, setQ1] = useState(true);
  const [q2, setQ2] = useState(true);
  const [q3, setQ3] = useState(true);
  const [q4, setQ4] = useState(false);
  const [q5, setQ5] = useState(false);
  const [q6, setQ6] = useState(false);
  const [q7, setQ7] = useState(false);
  const [q8, setQ8] = useState(false);

  const completedCount = [q0, q1, q2, q3, q4, q5, q6, q7, q8].filter(Boolean).length;

  return (
    <Frame>
      <Eyebrow>Review Project 1 · Portfolio Quality Check</Eyebrow>
      <h2 style={{ ...abs(X0, 132, W), ...headline(56) }}>
        Website selesai dibuat{' '}
        <Highlight color={HIGHLIGHT_PINK}>bukan berarti sudah selesai dikerjakan.</Highlight>
      </h2>

      <div
        style={{
          ...abs(X0, 262, 1140, 684),
          borderRadius: 24,
          background: TINT_NEUTRAL,
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 780, color: TEAL_HEX }}>
                QUALITY ASSURANCE
              </div>
              <h3 style={{ ...headline(36), marginTop: 4 }}>Checklist Portfolio</h3>
            </div>
            <span
              style={{
                padding: '8px 18px',
                borderRadius: 99,
                background: completedCount === 9 ? TEAL_HEX : '#FFFFFF',
                color: completedCount === 9 ? '#FFFFFF' : INK,
                fontFamily: MONO,
                fontSize: 19,
                fontWeight: 760,
              }}
            >
              {completedCount} / 9 Tervalidasi
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            <QualityCheckTile
              code="01"
              text="Nama dan headline mudah ditemukan."
              done={q0}
              onClick={() => setQ0(!q0)}
            />
            <QualityCheckTile
              code="02"
              text="Pengunjung memahami siapa pemilik website."
              done={q1}
              onClick={() => setQ1(!q1)}
            />
            <QualityCheckTile
              code="03"
              text="About section menjelaskan profil secara ringkas."
              done={q2}
              onClick={() => setQ2(!q2)}
            />
            <QualityCheckTile
              code="04"
              text="Skills ditampilkan secara relevan dan jujur."
              done={q3}
              onClick={() => setQ3(!q3)}
            />
            <QualityCheckTile
              code="05"
              text="Project memiliki deskripsi dan konteks."
              done={q4}
              onClick={() => setQ4(!q4)}
            />
            <QualityCheckTile
              code="06"
              text="CTA dan contact mudah ditemukan."
              done={q5}
              onClick={() => setQ5(!q5)}
            />
            <QualityCheckTile
              code="07"
              text="Layout nyaman dibaca di desktop dan mobile."
              done={q6}
              onClick={() => setQ6(!q6)}
            />
            <QualityCheckTile
              code="08"
              text="Link dan tombol berfungsi."
              done={q7}
              onClick={() => setQ7(!q7)}
            />
            <QualityCheckTile
              code="09"
              text="Tidak ada teks placeholder atau konten fiktif."
              done={q8}
              onClick={() => setQ8(!q8)}
            />
          </div>
        </div>

        <div style={{ fontSize: 19, color: BODY }}>
          Klik kartu di atas untuk mencentang pemeriksaan kualitas portfolio.
        </div>
      </div>

      <div
        style={{
          ...abs(1292, 262, 508, 684),
          borderRadius: 24,
          background: INK_HEX,
          color: '#FFFFFF',
          padding: '34px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 19,
              fontWeight: 780,
              color: '#7CE8E4',
              marginBottom: 12,
            }}
          >
            OUTPUT PROJECT 1
          </div>
          <h3 style={{ ...headline(44), color: '#FFFFFF', lineHeight: 1.12, marginBottom: 20 }}>
            Personal Portfolio Website
          </h3>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 18px',
              borderRadius: 99,
              background: TEAL_HEX,
              color: '#FFFFFF',
              fontFamily: MONO,
              fontSize: 19,
              fontWeight: 760,
              marginBottom: 28,
            }}
          >
            Version 1
          </div>

          <p style={{ margin: 0, fontSize: 24, lineHeight: 1.48, color: '#E2E1DD' }}>
            Website sudah memiliki <strong style={{ color: '#FFFFFF' }}>identitas</strong>,{' '}
            <strong style={{ color: '#FFFFFF' }}>konten utama</strong>, dan{' '}
            <strong style={{ color: '#FFFFFF' }}>navigasi yang jelas</strong>.
          </p>
        </div>

        <div
          style={{
            borderRadius: 18,
            background: 'rgba(255,255,255,0.08)',
            padding: '20px 22px',
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 17, color: YELLOW, marginBottom: 8 }}>
            STATUS PENYELESAIAN
          </div>
          <div
            style={{
              height: 12,
              borderRadius: 99,
              background: 'rgba(255,255,255,0.16)',
              overflow: 'hidden',
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: `${(completedCount / 9) * 100}%`,
                height: '100%',
                background: '#7CE8E4',
                transition: 'width 0.25s ease',
              }}
            />
          </div>
          <div style={{ fontSize: 19, color: '#D0CFCC' }}>
            Pastikan seluruh 9 poin terpenuhi sebelum lanjut ke Project 2.
          </div>
        </div>
      </div>
    </Frame>
  );
};

const BrandDirRow = ({
  code,
  title,
  sub,
  active,
  onClick,
}: {
  code: string;
  title: string;
  sub: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s3-interactive"
    style={{
      borderRadius: 16,
      padding: '16px 20px',
      background: active ? INK_HEX : TINT_NEUTRAL,
      color: active ? '#FFFFFF' : INK,
    }}
  >
    <div style={{ ...row, justifyContent: 'space-between', marginBottom: 4 }}>
      <span style={{ fontSize: 23, fontWeight: 740 }}>{title}</span>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 17,
          color: active ? YELLOW : SOFT,
        }}
      >
        {code}
      </span>
    </div>
    <div style={{ fontSize: 19, color: active ? '#D8D7D4' : BODY }}>{sub}</div>
  </div>
);

const Slide10UrbanStoreOverview: Page = () => {
  const [selectedDir, setSelectedDir] = useState(0);

  return (
    <Frame>
      <Eyebrow>Project 2 · Product Landing Page UrbanStore</Eyebrow>
      <h2 style={{ ...abs(X0, 132, W), ...headline(58) }}>
        Sekarang, gunakan <Highlight color={HIGHLIGHT_TEAL}>workflow yang sama</Highlight> untuk
        memperkenalkan sebuah produk.
      </h2>

      <MorphElement id="urbanstore-banner">
        <div
          style={{
            ...abs(X0, 268, 820, 154),
            borderRadius: 22,
            background: INK_HEX,
          }}
        />
      </MorphElement>
      <div
        style={{
          ...abs(X0, 268, 820, 678),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div
          style={{
            borderRadius: 22,
            color: '#FFFFFF',
            padding: '24px 30px',
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 18,
              fontWeight: 780,
              color: YELLOW,
              marginBottom: 6,
            }}
          >
            STUDI KASUS · PROJECT 2
          </div>
          <h3 style={{ ...headline(38), color: '#FFFFFF', marginBottom: 8 }}>UrbanStore</h3>
          <p style={{ margin: 0, fontSize: 22, lineHeight: 1.42, color: '#E2E1DD' }}>
            UrbanStore adalah online store fashion untuk pria dan wanita yang menyasar Gen Z.
          </p>
        </div>

        <div
          style={{
            borderRadius: 22,
            background: TINT_TEAL,
            border: `1.5px solid ${TEAL_HEX}`,
            padding: '22px 30px',
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 18,
              fontWeight: 780,
              color: TEAL_HEX,
              marginBottom: 6,
            }}
          >
            TUJUAN LANDING PAGE
          </div>
          <div style={{ fontSize: 22, lineHeight: 1.42, fontWeight: 630, color: INK }}>
            Memperkenalkan UrbanStore, menampilkan nilai utama brand, dan mengarahkan pengunjung
            untuk melihat koleksi atau mulai berbelanja.
          </div>
        </div>

        <div
          style={{
            borderRadius: 22,
            background: TINT_YELLOW,
            border: `1.5px solid #E2B93B`,
            padding: '22px 30px',
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
            TARGET AUDIENCE
          </div>
          <div style={{ fontSize: 22, lineHeight: 1.42, fontWeight: 630, color: INK }}>
            Gen Z dan young adults yang mencari produk fashion stylish dengan pengalaman belanja
            online yang praktis.
          </div>
        </div>

        <div
          style={{
            borderRadius: 22,
            background: TINT_PINK,
            border: `2px solid ${CORAL_HEX}`,
            padding: '20px 30px',
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 18,
              fontWeight: 780,
              color: CORAL_HEX,
              marginBottom: 4,
            }}
          >
            IMPORTANT
          </div>
          <div style={{ fontSize: 20, lineHeight: 1.4, fontWeight: 640, color: INK }}>
            Gunakan keputusan produk dan konteks UrbanStore yang sudah disiapkan pada sesi
            sebelumnya. Jangan mengarang fitur atau klaim bisnis yang belum ditentukan.
          </div>
        </div>
      </div>

      <div
        style={{
          ...abs(976, 268, 824, 678),
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
              <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 780, color: CORAL_HEX }}>
                VISUAL IDENTITY
              </div>
              <h3 style={{ ...headline(36), marginTop: 4 }}>Brand Direction</h3>
            </div>
            <div style={{ ...row, gap: 8 }}>
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 99,
                  background: '#111111',
                  border: `1px solid ${RULE}`,
                }}
              />
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 99,
                  background: '#FFFFFF',
                  border: `1.5px solid ${INK_HEX}`,
                }}
              />
              <span style={{ width: 28, height: 28, borderRadius: 99, background: TEAL_HEX }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <BrandDirRow
              code="01"
              title="Modern Minimalist."
              sub="Fokus pada produk tanpa elemen dekoratif yang berlebihan."
              active={selectedDir === 0}
              onClick={() => setSelectedDir(0)}
            />
            <BrandDirRow
              code="02"
              title="Swiss Style × Japanese Design."
              sub="Grid terstruktur, asimetri editorial, dan ruang kosong yang lega."
              active={selectedDir === 1}
              onClick={() => setSelectedDir(1)}
            />
            <BrandDirRow
              code="03"
              title="Dominasi hitam dan putih."
              sub="Kontras tinggi yang menonjolkan foto koleksi fashion."
              active={selectedDir === 2}
              onClick={() => setSelectedDir(2)}
            />
            <BrandDirRow
              code="04"
              title="Clean layout dan strong typography."
              sub="Hierarki ukuran huruf yang tegas dan mudah dipindai."
              active={selectedDir === 3}
              onClick={() => setSelectedDir(3)}
            />
            <BrandDirRow
              code="05"
              title="Copywriting ringkas dengan karakter Gen Z."
              sub="Bahasa lugas, relevan, dan langsung ke manfaat utama."
              active={selectedDir === 4}
              onClick={() => setSelectedDir(4)}
            />
          </div>
        </div>

        <div
          style={{
            borderRadius: 16,
            background: TINT_NEUTRAL,
            padding: '16px 22px',
            ...row,
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: INK }}>
            URBANSTORE · SWISS × JAPANESE MINIMALISM
          </span>
          <span style={{ fontSize: 19, color: BODY }}>Klik baris untuk fokus</span>
        </div>
      </div>
    </Frame>
  );
};

const LandingSecTile = ({
  num,
  name,
  desc,
  even,
  active,
  onClick,
}: {
  num: string;
  name: string;
  desc: string;
  even?: boolean;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s3-interactive"
    style={{
      borderRadius: 22,
      padding: '24px 26px',
      background: active ? INK_HEX : even ? TINT_NEUTRAL : '#FFFFFF',
      color: active ? '#FFFFFF' : INK,
      border: `2px solid ${active ? INK_HEX : RULE}`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div>
      <div style={{ ...row, justifyContent: 'space-between', marginBottom: 12 }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 22,
            fontWeight: 780,
            color: active ? YELLOW : TEAL_HEX,
          }}
        >
          {num}
        </span>
        <span
          style={{
            fontSize: 16,
            fontFamily: MONO,
            color: active ? '#7CE8E4' : SOFT,
          }}
        >
          SECTION
        </span>
      </div>
      <h3
        style={{
          ...headline(29),
          color: active ? '#FFFFFF' : INK,
          marginBottom: 10,
          lineHeight: 1.18,
        }}
      >
        {name}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: 20,
          lineHeight: 1.4,
          color: active ? '#E2E1DD' : BODY,
        }}
      >
        {desc}
      </p>
    </div>

    <div
      style={{
        fontSize: 17,
        fontWeight: 700,
        color: active ? YELLOW : TEAL_HEX,
      }}
    >
      {active ? '● Sedang Dipilih' : 'Klik untuk fokus'}
    </div>
  </div>
);

const Slide11LandingPageStructure: Page = () => {
  const [activeSec, setActiveSec] = useState(0);

  return (
    <Frame>
      <Eyebrow>Struktur Landing Page yang Efektif · UrbanStore</Eyebrow>
      <h2 style={{ ...abs(X0, 132, 1580), ...headline(64) }}>
        Susun informasi agar pengunjung{' '}
        <Highlight color={HIGHLIGHT_TEAL}>memahami produk</Highlight> dan tahu langkah berikutnya.
      </h2>

      <div
        style={{
          ...abs(X0, 264, W, 556),
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: '1fr 1fr',
          gap: 20,
        }}
      >
        <LandingSecTile
          num="01"
          name="Hero Section"
          desc="Headline, subheadline, visual utama, dan CTA."
          even
          active={activeSec === 0}
          onClick={() => setActiveSec(0)}
        />
        <LandingSecTile
          num="02"
          name="Brand / Value Proposition"
          desc="Apa yang membuat UrbanStore relevan?"
          active={activeSec === 1}
          onClick={() => setActiveSec(1)}
        />
        <LandingSecTile
          num="03"
          name="Featured Collection / Products"
          desc="Tampilkan kategori atau contoh produk utama."
          even
          active={activeSec === 2}
          onClick={() => setActiveSec(2)}
        />
        <LandingSecTile
          num="04"
          name="Benefits / Features"
          desc="Manfaat pengalaman berbelanja di UrbanStore."
          active={activeSec === 3}
          onClick={() => setActiveSec(3)}
        />
        <LandingSecTile
          num="05"
          name="Brand Story / Why UrbanStore"
          desc="Karakter dan positioning brand."
          even
          active={activeSec === 4}
          onClick={() => setActiveSec(4)}
        />
        <LandingSecTile
          num="06"
          name="FAQ"
          desc="Jawab pertanyaan umum yang relevan."
          active={activeSec === 5}
          onClick={() => setActiveSec(5)}
        />
        <LandingSecTile
          num="07"
          name="Final CTA"
          desc="Arahkan pengunjung melihat koleksi atau mulai berbelanja."
          even
          active={activeSec === 6}
          onClick={() => setActiveSec(6)}
        />
        <LandingSecTile
          num="08"
          name="Footer"
          desc="Navigasi, informasi brand, dan tautan pendukung."
          active={activeSec === 7}
          onClick={() => setActiveSec(7)}
        />
      </div>

      <MorphElement id="urbanstore-banner">
        <div
          style={{
            ...abs(X0, 848, W, 98),
            borderRadius: 20,
            background: TINT_TEAL,
            border: `2px solid ${TEAL_HEX}`,
          }}
        />
      </MorphElement>
      <div
        style={{
          ...abs(X0, 848, W, 98),
          padding: '0 34px',
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 720, color: INK }}>
          “Landing page harus membantu pengunjung memahami produk, bukan sekadar menampilkan
          banyak section.”
        </div>
        <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 760, color: TEAL_HEX }}>
          Struktur UrbanStore · 01–08
        </span>
      </div>
    </Frame>
  );
};

Slide10UrbanStoreOverview.transition = morphTransition;
Slide11LandingPageStructure.transition = morphTransition;

const CopyDraftChip = ({ num, text }: { num: string; text: string }) => (
  <div
    style={{
      background: '#FFFFFF',
      padding: '12px 16px',
      borderRadius: 12,
      border: `1px solid ${RULE}`,
      fontSize: 19,
      fontWeight: 640,
      color: INK,
    }}
  >
    <span style={{ fontFamily: MONO, color: TEAL_HEX, marginRight: 8 }}>{num}</span>
    {text}
  </div>
);

const CopyPrincipleItem = ({ text }: { text: string }) => (
  <div style={{ ...row, gap: 12, fontSize: 20, fontWeight: 620, color: INK }}>
    <CheckMark color={TEAL_HEX} size={22} />
    <span>{text}</span>
  </div>
);

const Slide12CopywritingAI: Page = () => {
  const [highlightPart, setHighlightPart] = useState<'headline' | 'subheadline' | 'cta'>(
    'headline',
  );

  return (
    <Frame>
      <Eyebrow>Copywriting dengan Bantuan AI</Eyebrow>
      <h2 style={{ ...abs(X0, 132, 1520), ...headline(66) }}>
        Desain menarik perlu didukung <Highlight color={HIGHLIGHT}>pesan yang jelas.</Highlight>
      </h2>

      <div
        style={{
          ...abs(X0, 260, 780, 686),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <div
          style={{
            borderRadius: 22,
            background: TINT_NEUTRAL,
            padding: '24px 28px',
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 18,
              fontWeight: 780,
              color: TEAL_HEX,
              marginBottom: 8,
            }}
          >
            CAKUPAN COPYWRITING
          </div>
          <h3 style={{ ...headline(32), marginBottom: 14 }}>AI dapat membantu membuat draft:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <CopyDraftChip num="01" text="Headline dan subheadline." />
            <CopyDraftChip num="02" text="Product / brand description." />
            <CopyDraftChip num="03" text="Benefit statement." />
            <CopyDraftChip num="04" text="CTA." />
            <CopyDraftChip num="05" text="FAQ." />
            <CopyDraftChip num="06" text="Microcopy tombol / navigasi." />
          </div>
        </div>

        <div
          style={{
            flex: 1,
            borderRadius: 22,
            background: TINT_TEAL,
            border: `1.5px solid ${TEAL_HEX}`,
            padding: '24px 28px',
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
                color: TEAL_HEX,
                marginBottom: 6,
              }}
            >
              STANDAR KUALITAS TEKS
            </div>
            <h3 style={{ ...headline(32), marginBottom: 14 }}>Prinsip Copywriting</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <CopyPrincipleItem text="Spesifik dan mudah dipahami." />
              <CopyPrincipleItem text="Fokus pada manfaat pengguna." />
              <CopyPrincipleItem text="Sesuaikan tone dengan target audience." />
              <CopyPrincipleItem text="Hindari klaim yang tidak terbukti." />
              <CopyPrincipleItem text="Pastikan CTA menjelaskan tindakan yang akan dilakukan." />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          ...abs(936, 260, 864, 686),
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
            background: INK_HEX,
            color: '#FFFFFF',
            padding: '32px 38px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 780, color: YELLOW }}>
              CONTOH URBANSTORE · HERO SECTION
            </span>
            <div style={{ ...row, gap: 8 }}>
              <button
                type="button"
                onClick={() => setHighlightPart('headline')}
                className="s3-interactive"
                style={{
                  padding: '6px 14px',
                  borderRadius: 99,
                  border: 'none',
                  background: highlightPart === 'headline' ? TEAL_HEX : 'rgba(255,255,255,0.12)',
                  color: '#FFFFFF',
                  fontFamily: MONO,
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                HEADLINE
              </button>
              <button
                type="button"
                onClick={() => setHighlightPart('subheadline')}
                className="s3-interactive"
                style={{
                  padding: '6px 14px',
                  borderRadius: 99,
                  border: 'none',
                  background: highlightPart === 'subheadline' ? TEAL_HEX : 'rgba(255,255,255,0.12)',
                  color: '#FFFFFF',
                  fontFamily: MONO,
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                SUBHEADLINE
              </button>
              <button
                type="button"
                onClick={() => setHighlightPart('cta')}
                className="s3-interactive"
                style={{
                  padding: '6px 14px',
                  borderRadius: 99,
                  border: 'none',
                  background: highlightPart === 'cta' ? TEAL_HEX : 'rgba(255,255,255,0.12)',
                  color: '#FFFFFF',
                  fontFamily: MONO,
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                CTA
              </button>
            </div>
          </div>

          <div style={{ margin: 'auto 0' }}>
            <div
              onClick={() => setHighlightPart('headline')}
              className="s3-interactive"
              style={{
                padding: '16px 20px',
                borderRadius: 16,
                background:
                  highlightPart === 'headline' ? 'rgba(60,165,161,0.22)' : 'transparent',
                border: `2px solid ${
                  highlightPart === 'headline' ? '#7CE8E4' : 'rgba(255,255,255,0.12)'
                }`,
                marginBottom: 16,
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 16, color: '#7CE8E4', marginBottom: 4 }}>
                HEADLINE
              </div>
              <div style={{ ...headline(52), color: '#FFFFFF' }}>“Find Your Everyday Style.”</div>
            </div>

            <div
              onClick={() => setHighlightPart('subheadline')}
              className="s3-interactive"
              style={{
                padding: '16px 20px',
                borderRadius: 16,
                background:
                  highlightPart === 'subheadline' ? 'rgba(248,218,126,0.18)' : 'transparent',
                border: `2px solid ${
                  highlightPart === 'subheadline' ? YELLOW : 'rgba(255,255,255,0.12)'
                }`,
                marginBottom: 20,
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 16, color: YELLOW, marginBottom: 4 }}>
                SUBHEADLINE
              </div>
              <div style={{ fontSize: 24, lineHeight: 1.4, color: '#E8E7E3' }}>
                “Discover everyday essentials and modern fashion pieces that fit your style.”
              </div>
            </div>

            <div
              onClick={() => setHighlightPart('cta')}
              className="s3-interactive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px 28px',
                borderRadius: 14,
                background: highlightPart === 'cta' ? CORAL_HEX : '#FFFFFF',
                color: highlightPart === 'cta' ? '#FFFFFF' : INK_HEX,
                fontSize: 22,
                fontWeight: 780,
              }}
            >
              <span>CTA: “Explore Collection”</span>
              <span>→</span>
            </div>
          </div>
        </div>

        <div
          style={{
            borderRadius: 22,
            background: TINT_PINK,
            border: `2px solid ${CORAL_HEX}`,
            padding: '22px 30px',
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 18,
              fontWeight: 780,
              color: CORAL_HEX,
              marginBottom: 4,
            }}
          >
            IMPORTANT
          </div>
          <div style={{ fontSize: 22, fontWeight: 650, color: INK, lineHeight: 1.4 }}>
            AI menghasilkan draft. Periksa kembali fakta, gaya bahasa, dan kesesuaiannya dengan
            brand.
          </div>
        </div>
      </div>
    </Frame>
  );
};

const LandingInputRow = ({ num, text }: { num: string; text: string }) => (
  <div
    style={{
      ...row,
      gap: 16,
      background: '#FFFFFF',
      padding: '14px 20px',
      borderRadius: 14,
      border: `1.5px solid ${RULE}`,
      fontSize: 22,
      fontWeight: 640,
      color: INK,
    }}
  >
    <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: TEAL_HEX, minWidth: 28 }}>
      {num}
    </span>
    <span>{text}</span>
  </div>
);

const LandingWorkflowCard = ({
  code,
  label,
  active,
  final = false,
  onClick,
}: {
  code: string;
  label: string;
  active: boolean;
  final?: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s3-interactive"
    style={{
      borderRadius: 16,
      padding: '18px 18px',
      background: active ? TEAL_HEX : final ? INK_HEX : TINT_NEUTRAL,
      color: active || final ? '#FFFFFF' : INK,
      minHeight: 138,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div
      style={{
        fontFamily: MONO,
        fontSize: 17,
        fontWeight: 780,
        color: active || final ? YELLOW : TEAL_HEX,
      }}
    >
      {code}
    </div>
    <div style={{ fontSize: 20, fontWeight: 740, lineHeight: 1.28 }}>{label}</div>
  </div>
);

const Slide13BuildLandingPageAIStudio: Page = () => {
  const [activeNode, setActiveNode] = useState(4);

  return (
    <Frame>
      <Eyebrow>Build Landing Page dengan Google AI Studio</Eyebrow>
      <h2 style={{ ...abs(X0, 132, W), ...headline(56) }}>
        Terapkan workflow yang sama.{' '}
        <Highlight color={HIGHLIGHT_TEAL}>Ganti konteks dan tujuannya.</Highlight>
      </h2>

      <div
        style={{
          ...abs(X0, 260, 680, 686),
          borderRadius: 24,
          background: TINT_NEUTRAL,
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 780, color: TEAL_HEX }}>
            CHECKLIST INPUT
          </div>
          <h3 style={{ ...headline(36), margin: '8px 0 20px' }}>Siapkan Input</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <LandingInputRow num="01" text="Konteks dan tujuan UrbanStore." />
            <LandingInputRow num="02" text="Target audience." />
            <LandingInputRow num="03" text="Brand direction dan design system." />
            <LandingInputRow num="04" text="Struktur section landing page." />
            <LandingInputRow num="05" text="Copywriting." />
            <LandingInputRow num="06" text="Referensi visual." />
            <LandingInputRow num="07" text="Kebutuhan responsive." />
          </div>
        </div>
      </div>

      <div
        style={{
          ...abs(836, 260, 964, 686),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 22,
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: 24,
            background: '#FFFFFF',
            border: `2px solid ${INK_HEX}`,
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ ...row, justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 780, color: CORAL_HEX }}>
                  END-TO-END WORKFLOW
                </div>
                <h3 style={{ ...headline(34), marginTop: 4 }}>Workflow UrbanStore Landing Page</h3>
              </div>
              <span style={{ fontSize: 18, color: SOFT }}>Klik tahap untuk highlight</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              <LandingWorkflowCard
                code="01"
                label="UrbanStore Brief"
                active={activeNode === 0}
                onClick={() => setActiveNode(0)}
              />
              <LandingWorkflowCard
                code="02"
                label="Design Reference"
                active={activeNode === 1}
                onClick={() => setActiveNode(1)}
              />
              <LandingWorkflowCard
                code="03"
                label="Google Stitch UI Concept"
                active={activeNode === 2}
                onClick={() => setActiveNode(2)}
              />
              <LandingWorkflowCard
                code="04"
                label="Copywriting"
                active={activeNode === 3}
                onClick={() => setActiveNode(3)}
              />
              <LandingWorkflowCard
                code="05"
                label="Google AI Studio"
                active={activeNode === 4}
                onClick={() => setActiveNode(4)}
              />
              <LandingWorkflowCard
                code="06"
                label="Generate Landing Page"
                active={activeNode === 5}
                onClick={() => setActiveNode(5)}
              />
              <LandingWorkflowCard
                code="07"
                label="Review & Refinement"
                active={activeNode === 6}
                onClick={() => setActiveNode(6)}
              />
              <LandingWorkflowCard
                code="08"
                label="Landing Page Version 1"
                active={activeNode === 7}
                final
                onClick={() => setActiveNode(7)}
              />
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
              fontSize: 19,
              fontWeight: 780,
              color: '#946200',
              marginBottom: 6,
            }}
          >
            TIPS · BATASAN SCOPE SESI INI
          </div>
          <div style={{ fontSize: 22, lineHeight: 1.44, fontWeight: 660, color: INK }}>
            Bangun landing page terlebih dahulu. Jangan langsung meminta AI membuat seluruh fitur
            e-commerce seperti cart, checkout, dan payment gateway pada sesi ini.
          </div>
        </div>
      </div>
    </Frame>
  );
};

const DualCheckItem = ({
  text,
  done,
  color,
  onClick,
}: {
  text: string;
  done: boolean;
  color: string;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="s3-interactive"
    style={{
      ...row,
      gap: 14,
      background: '#FFFFFF',
      padding: '11px 18px',
      borderRadius: 12,
      fontSize: 21,
      fontWeight: 630,
      color: INK,
    }}
  >
    <span
      style={{
        width: 24,
        height: 24,
        borderRadius: 6,
        background: done ? color : TINT_NEUTRAL,
        color: '#FFFFFF',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        fontWeight: 800,
      }}
    >
      {done ? '✓' : ''}
    </span>
    <span>{text}</span>
  </div>
);

const LoopPill = ({ text, dark = false }: { text: string; dark?: boolean }) => (
  <span
    style={{
      padding: '10px 18px',
      borderRadius: 12,
      background: dark ? INK_HEX : '#FFFFFF',
      color: dark ? '#FFFFFF' : INK,
      border: `1.5px solid ${RULE}`,
      fontSize: 19,
      fontWeight: 720,
    }}
  >
    {text}
  </span>
);

const Slide14ReviewAndImprove: Page = () => {
  const [p0, setP0] = useState(true);
  const [p1, setP1] = useState(true);
  const [p2, setP2] = useState(true);
  const [p3, setP3] = useState(false);
  const [p4, setP4] = useState(false);
  const [p5, setP5] = useState(false);

  const [l0, setL0] = useState(true);
  const [l1, setL1] = useState(true);
  const [l2, setL2] = useState(true);
  const [l3, setL3] = useState(false);
  const [l4, setL4] = useState(false);
  const [l5, setL5] = useState(false);

  return (
    <Frame>
      <Eyebrow>Review &amp; Improve · Dua Website, Satu Workflow</Eyebrow>
      <h2 style={{ ...abs(X0, 132, W), ...headline(56) }}>
        Gunakan checklist yang sesuai dengan{' '}
        <Highlight color={HIGHLIGHT_TEAL}>tujuan masing-masing website.</Highlight>
      </h2>

      <div
        style={{
          ...abs(X0, 248, 816, 480),
          borderRadius: 24,
          background: TINT_TEAL,
          border: `2px solid ${TEAL_HEX}`,
          padding: '24px 30px',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between', marginBottom: 14 }}>
          <h3 style={{ ...headline(34) }}>Portfolio Checklist</h3>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 760, color: TEAL_HEX }}>
            01 · PERSONAL BRAND
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <DualCheckItem
            text="Identitas personal jelas."
            done={p0}
            color={TEAL_HEX}
            onClick={() => setP0(!p0)}
          />
          <DualCheckItem
            text="Profil dan keahlian mudah dipahami."
            done={p1}
            color={TEAL_HEX}
            onClick={() => setP1(!p1)}
          />
          <DualCheckItem
            text="Project ditampilkan dengan konteks."
            done={p2}
            color={TEAL_HEX}
            onClick={() => setP2(!p2)}
          />
          <DualCheckItem
            text="Kredibilitas dibangun melalui informasi yang nyata."
            done={p3}
            color={TEAL_HEX}
            onClick={() => setP3(!p3)}
          />
          <DualCheckItem
            text="Contact mudah ditemukan."
            done={p4}
            color={TEAL_HEX}
            onClick={() => setP4(!p4)}
          />
          <DualCheckItem
            text="Responsive dan semua link berfungsi."
            done={p5}
            color={TEAL_HEX}
            onClick={() => setP5(!p5)}
          />
        </div>
      </div>

      <div
        style={{
          ...abs(984, 248, 816, 480),
          borderRadius: 24,
          background: TINT_YELLOW,
          border: `2px solid #E2B93B`,
          padding: '24px 30px',
        }}
      >
        <div style={{ ...row, justifyContent: 'space-between', marginBottom: 14 }}>
          <h3 style={{ ...headline(34) }}>Landing Page Checklist</h3>
          <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 760, color: '#946200' }}>
            02 · URBANSTORE
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <DualCheckItem
            text="Produk dan value proposition jelas."
            done={l0}
            color="#946200"
            onClick={() => setL0(!l0)}
          />
          <DualCheckItem
            text="Hero section memiliki CTA yang relevan."
            done={l1}
            color="#946200"
            onClick={() => setL1(!l1)}
          />
          <DualCheckItem
            text="Informasi produk mudah dipahami."
            done={l2}
            color="#946200"
            onClick={() => setL2(!l2)}
          />
          <DualCheckItem
            text="Visual konsisten dengan brand."
            done={l3}
            color="#946200"
            onClick={() => setL3(!l3)}
          />
          <DualCheckItem
            text="Section tersusun dengan alur yang logis."
            done={l4}
            color="#946200"
            onClick={() => setL4(!l4)}
          />
          <DualCheckItem
            text="Responsive dan CTA berfungsi."
            done={l5}
            color="#946200"
            onClick={() => setL5(!l5)}
          />
        </div>
      </div>

      <div
        style={{
          ...abs(X0, 750, W, 114),
          borderRadius: 20,
          background: TINT_NEUTRAL,
          border: `1.5px solid ${RULE}`,
          padding: '0 26px',
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: CORAL_HEX }}>
          WORKFLOW IMPROVEMENT
        </span>
        <div style={{ ...row, gap: 12 }}>
          <LoopPill text="Generate" />
          <span style={{ fontSize: 20, fontWeight: 780, color: TEAL_HEX }}>→</span>
          <LoopPill text="Review" />
          <span style={{ fontSize: 20, fontWeight: 780, color: TEAL_HEX }}>→</span>
          <LoopPill text="Identify Issues" />
          <span style={{ fontSize: 20, fontWeight: 780, color: TEAL_HEX }}>→</span>
          <LoopPill text="Give Specific Feedback" dark />
          <span style={{ fontSize: 20, fontWeight: 780, color: TEAL_HEX }}>→</span>
          <LoopPill text="Refine" />
          <span style={{ fontSize: 20, fontWeight: 780, color: TEAL_HEX }}>→</span>
          <LoopPill text="Test Again" />
        </div>
      </div>

      <div
        style={{
          ...abs(X0, 882, W, 74),
          borderRadius: 16,
          background: INK_HEX,
          color: '#FFFFFF',
          padding: '0 32px',
          ...row,
          justifyContent: 'space-between',
          fontSize: 23,
          fontWeight: 680,
        }}
      >
        <span>
          “AI mempercepat pembuatan website. Kualitas akhirnya tetap bergantung pada keputusan dan
          review kita.”
        </span>
        <span style={{ fontFamily: MONO, fontSize: 18, color: YELLOW }}>Human-in-the-Loop</span>
      </div>
    </Frame>
  );
};

const ChallengeStepRow = ({
  num,
  text,
  accent,
  compact = false,
}: {
  num: string;
  text: string;
  accent: string;
  compact?: boolean;
}) => (
  <div
    style={{
      ...row,
      gap: 14,
      background: '#FFFFFF',
      padding: compact ? '11px 16px' : '13px 16px',
      borderRadius: 12,
      fontSize: 20,
      fontWeight: 640,
      color: INK,
    }}
  >
    <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 780, color: accent }}>{num}</span>
    <span>{text}</span>
  </div>
);

const Slide15HandsOnChallenge: Page = () => {
  return (
    <Frame>
      <Eyebrow>Hands-on Challenge &amp; Session Output</Eyebrow>
      <h2 style={{ ...abs(X0, 130, 1500), ...headline(68) }}>
        Saatnya <Highlight color={HIGHLIGHT_TEAL}>Bangun Dua Website!</Highlight>
      </h2>

      <div
        style={{
          ...abs(X0, 236, 540, 504),
          borderRadius: 24,
          background: TINT_TEAL,
          border: `2px solid ${TEAL_HEX}`,
          padding: '26px 28px',
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
              color: TEAL_HEX,
              marginBottom: 6,
            }}
          >
            CHALLENGE 1
          </div>
          <h3 style={{ ...headline(34), marginBottom: 18 }}>Personal Portfolio</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <ChallengeStepRow num="1." text="Siapkan konten personal." accent={TEAL_HEX} />
            <ChallengeStepRow num="2." text="Cari referensi portfolio." accent={TEAL_HEX} />
            <ChallengeStepRow
              num="3."
              text="Buat konsep UI menggunakan Google Stitch."
              accent={TEAL_HEX}
            />
            <ChallengeStepRow
              num="4."
              text="Generate website dengan Google AI Studio."
              accent={TEAL_HEX}
            />
            <ChallengeStepRow num="5." text="Review dan perbaiki hasilnya." accent={TEAL_HEX} />
          </div>
        </div>
      </div>

      <div
        style={{
          ...abs(690, 236, 540, 504),
          borderRadius: 24,
          background: TINT_YELLOW,
          border: `2px solid #E2B93B`,
          padding: '26px 28px',
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
              color: '#946200',
              marginBottom: 6,
            }}
          >
            CHALLENGE 2
          </div>
          <h3 style={{ ...headline(34), marginBottom: 16 }}>UrbanStore Landing Page</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <ChallengeStepRow
              num="1."
              text="Gunakan brief dan konteks UrbanStore."
              accent="#946200"
              compact
            />
            <ChallengeStepRow
              num="2."
              text="Cari referensi landing page fashion."
              accent="#946200"
              compact
            />
            <ChallengeStepRow
              num="3."
              text="Buat konsep UI menggunakan Google Stitch."
              accent="#946200"
              compact
            />
            <ChallengeStepRow num="4." text="Siapkan copywriting." accent="#946200" compact />
            <ChallengeStepRow
              num="5."
              text="Generate landing page dengan Google AI Studio."
              accent="#946200"
              compact
            />
            <ChallengeStepRow
              num="6."
              text="Review dan perbaiki hasilnya."
              accent="#946200"
              compact
            />
          </div>
        </div>
      </div>

      <div
        style={{
          ...abs(1260, 236, 540, 504),
          borderRadius: 24,
          background: '#FFFFFF',
          border: `2.5px solid ${INK_HEX}`,
          padding: '26px 28px',
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
              color: CORAL_HEX,
              marginBottom: 6,
            }}
          >
            DELIVERABLES
          </div>
          <h3 style={{ ...headline(34), marginBottom: 18 }}>Final Output Sesi 3</h3>

          <div
            style={{
              borderRadius: 16,
              background: TINT_TEAL,
              padding: '20px 22px',
              marginBottom: 16,
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
              01 · PERSONAL PORTFOLIO WEBSITE
            </div>
            <div style={{ fontSize: 21, fontWeight: 650, lineHeight: 1.38, color: INK }}>
              Website untuk memperkenalkan diri dan menampilkan karya.
            </div>
          </div>

          <div
            style={{
              borderRadius: 16,
              background: TINT_YELLOW,
              padding: '20px 22px',
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 18,
                fontWeight: 780,
                color: '#946200',
                marginBottom: 4,
              }}
            >
              02 · URBANSTORE PRODUCT LANDING PAGE
            </div>
            <div style={{ fontSize: 21, fontWeight: 650, lineHeight: 1.38, color: INK }}>
              Website untuk memperkenalkan brand dan mengarahkan pengunjung ke koleksi produk.
            </div>
          </div>
        </div>

        <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: TEAL_HEX }}>
          ✓ Siap dipresentasikan &amp; direview
        </div>
      </div>

      <div
        style={{
          ...abs(X0, 768, W, 184),
          borderRadius: 24,
          background: INK_HEX,
          color: '#FFFFFF',
          padding: '26px 38px',
          ...row,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ maxWidth: 1220 }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 18,
              fontWeight: 780,
              color: YELLOW,
              marginBottom: 8,
            }}
          >
            PREVIEW SESI 4 · NEXT SESSION
          </div>
          <h3 style={{ ...headline(40), color: '#FFFFFF', marginBottom: 8 }}>
            Build Web Application
          </h3>
          <p style={{ margin: 0, fontSize: 22, lineHeight: 1.4, color: '#E2E1DD' }}>
            Dari website yang berfungsi sebagai media informasi, kita akan melangkah ke aplikasi web
            dengan fitur dan interaksi yang lebih kompleks.
          </p>
        </div>
        <div
          style={{
            padding: '16px 28px',
            borderRadius: 16,
            background: TEAL_HEX,
            color: '#FFFFFF',
            fontSize: 22,
            fontWeight: 780,
            whiteSpace: 'nowrap',
          }}
        >
          Menuju Sesi 4 →
        </div>
      </div>
    </Frame>
  );
};

export const meta: SlideMeta = {
  title: '[VCB Batch 4] Sesi 3 - Build Portfolio & Landing Page',
  createdAt: '2026-11-09T11:23:12.517Z',
  theme: 'swiss-japanese',
};

export const notes: (string | undefined)[] = [
  `Selamat datang di Sesi 3 Vibe Coding Bootcamp Batch 4: Build Portfolio & Landing Page (From Personal Brand to Product Presence).`,
  `Hari ini kita menghasilkan dua website dengan tujuan berbeda. Portfolio membangun personal presence, sedangkan landing page membangun product presence.`,
  `Tekankan perbedaan tujuan: Personal Portfolio (contoh: adityafakhri.id) membangun kepercayaan terhadap diri kita, sementara Product Landing Page (studi kasus: UrbanStore) membangun ketertarikan terhadap produk.`,
  `Project 1 adalah Personal Portfolio Website. Bahas siapa saja yang membutuhkannya dan 6 struktur utamanya mulai dari Hero hingga Contact & Social Links.`,
  `Tunjukkan contoh nyata https://adityafakhri.id untuk mengamati elemen Hero, About, Skills, Projects, Experience & Events, dan Contact. Ingatkan peserta agar tidak menyalin identitas atau konten secara mentah.`,
  `Sebelum masuk ke desain, siapkan bahan melalui Portfolio Content Checklist (Personal Identity, Skills, Experience, Projects, Contact). Ingatkan untuk tidak mengarang pengalaman atau skill.`,
  `Gunakan Google Stitch untuk mengeksplorasi konsep UI dari deskripsi dan arahan visual sebelum masuk ke proses coding di Google AI Studio.`,
  `Gunakan Google AI Studio untuk mengubah konsep UI dan konten menjadi website portfolio versi pertama. Mulai dari struktur dan tampilan utama terlebih dahulu.`,
  `Lakukan Portfolio Quality Check dengan 9 poin pemeriksaan. Website selesai dibuat oleh AI bukan berarti sudah selesai dikerjakan sampai kita memvalidasinya.`,
  `Project 2: Product Landing Page UrbanStore. Gunakan keputusan produk dari Sesi 2 dengan Brand Direction Modern Minimalist (Swiss Style x Japanese Design) untuk Gen Z.`,
  `Pelajari 8 struktur Landing Page UrbanStore yang efektif agar pengunjung memahami nilai produk dan tahu langkah selanjutnya.`,
  `Manfaatkan AI untuk menyusun draft copywriting (Headline, Subheadline, CTA, FAQ). Selalu review kembali kesesuaiannya dengan karakter brand UrbanStore.`,
  `Terapkan workflow yang sama di Google AI Studio untuk membangun Landing Page UrbanStore Version 1. Ingatkan peserta untuk fokus pada landing page terlebih dahulu tanpa fitur cart/checkout/payment.`,
  `Gunakan checklist yang sesuai untuk memvalidasi Portfolio dan Landing Page, lalu jalankan siklus iterasi: Generate -> Review -> Identify Issues -> Give Specific Feedback -> Refine -> Test Again.`,
  `Saatnya Hands-on Challenge! Peserta membangun dua output utama Sesi 3: Personal Portfolio Website dan UrbanStore Product Landing Page, sebelum melangkah ke Sesi 4 (Build Web Application).`,
];

export default [
  Slide01Cover,
  Slide02Objectives,
  Slide03TwoWebsites,
  Slide04PortfolioOverview,
  Slide05PortfolioReference,
  Slide06PortfolioContent,
  Slide07GoogleStitch,
  Slide08BuildPortfolioAIStudio,
  Slide09PortfolioQualityCheck,
  Slide10UrbanStoreOverview,
  Slide11LandingPageStructure,
  Slide12CopywritingAI,
  Slide13BuildLandingPageAIStudio,
  Slide14ReviewAndImprove,
  Slide15HandsOnChallenge,
] satisfies Page[];
