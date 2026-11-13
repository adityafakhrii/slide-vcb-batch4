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
  typeScale: { hero: 124, body: 30 },
  radius: 24,
};

const SLIDE_ID = 'vibe-coding-sesi-1-part-2';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..800&family=Newsreader:ital,opsz,wght@1,6..72,400&family=JetBrains+Mono:wght@500;700&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;
const KEYFRAMES = `
@keyframes fw2-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes fw2-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes fw2-grow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
.fw2-interactive { transition: transform 0.2s cubic-bezier(0, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0, 0, 0.2, 1); cursor: pointer; user-select: none; }
.fw2-interactive:hover { transform: translateY(-3px); }
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
  const id = `fw2${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
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
    style={{ animation: live ? `fw2-draw ${dur}s ${EASE_OUT} ${delay}s both` : undefined }}
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
  <svg aria-hidden width={size} height={size} viewBox="0 0 28 28" style={{ display: 'block' }}>
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
        <span>
          Vibe Coding Bootcamp · Batch 4 · Sesi 1 Part 2 (UrbanStore Case Study)
        </span>
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

const TallyBox = ({
  x,
  accent = false,
  live,
}: {
  x: number;
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
      fill={accent ? TINT_TEAL : TINT_GREEN}
      strokeWidth={2.8}
    />
    <Stroke
      d="M14 30L25 41L44 16"
      color={accent ? TEAL_HEX : INK_HEX}
      width={3.4}
      live={live}
      delay={0.4}
      dur={0.4}
    />
  </g>
);

// ============================================================================
// SLIDE 01 — Cover: Studi Kasus Prompt Engineering (UrbanStore)
// ============================================================================
const StoreCoverArt = ({ live }: { live: boolean }) => (
  <Ink width={840} height={700} style={abs(960, 150)}>
    <circle cx="440" cy="340" r="250" fill={YELLOW} stroke="none" />
    <circle cx="240" cy="220" r="110" fill={TINT_TEAL} stroke="none" />
    {/* Storefront / Browser Window */}
    <rect x="90" y="160" width="520" height="370" rx="18" fill="#FFFFFF" />
    <path d="M90 214H610" />
    <circle cx="122" cy="187" r="6.5" fill={CORAL_HEX} stroke="none" />
    <circle cx="144" cy="187" r="6.5" fill={YELLOW} stroke="none" />
    <circle cx="166" cy="187" r="6.5" fill={GREEN} stroke="none" />
    {/* URBANSTORE Header inside browser */}
    <path d="M126 244h140M480 244h94" strokeWidth={4} />
    {/* Hero Banner + Product Cards */}
    <rect x="124" y="272" width="452" height="96" rx="10" fill={TINT_TEAL} />
    <path d="M150 308h200M150 336h130" stroke={TEAL_HEX} strokeWidth={3.6} />
    <rect x="124" y="388" width="138" height="114" rx="10" fill={TINT_YELLOW} />
    <rect x="281" y="388" width="138" height="114" rx="10" fill={TINT_PINK} />
    <rect x="438" y="388" width="138" height="114" rx="10" fill={TINT_BLUE} />
    {/* Shopping Bag Doodle on Right */}
    <g transform="translate(560 320)">
      <path d="M52 54Q52 14 92 14Q132 14 132 54" strokeWidth={3.6} />
      <path d="M24 54L160 54L172 230Q172 246 156 246L28 246Q12 246 12 230Z" fill={CORAL_HEX} />
      <rect x="52" y="106" width="80" height="54" rx="8" fill="#FFFFFF" />
      <path d="M68 134h48" strokeWidth={3.4} />
    </g>
    <Sparkle x={680} y={130} s={1.15} fill={TEAL_HEX} />
    <Sparkle x={150} y={108} s={0.8} fill={YELLOW} />
    <path d="M40 612Q310 606 580 610T810 608" />
    <Stroke
      d="M520 110C580 90 620 120 600 170M600 170L586 152M600 170L618 156"
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
            background: TINT_PINK,
            color: CORAL_HEX,
            fontSize: 20,
            fontWeight: 720,
          }}
        >
          Batch 4 · Sesi 1 — PART 2
        </span>
      </div>

      <h1 style={{ ...abs(X0, 224, 920), ...headline(116), fontSize: 'var(--osd-size-hero)' }}>
        Studi Kasus
        <br />
        UrbanStore.
      </h1>

      <p
        style={{
          ...abs(X0, 536, 800),
          margin: 0,
          fontSize: 36,
          lineHeight: 1.42,
          color: BODY,
        }}
      >
        Studi Kasus <Highlight color={HIGHLIGHT_TEAL}>Prompt Engineering</Highlight>: Membangun
        Website Online Store dengan AI.
      </p>

      <div style={{ ...abs(X0, 696, 760), fontSize: 26, lineHeight: 1.48, color: BODY }}>
        Menerapkan formula <strong style={{ color: INK }}>RTCF, RTF, dan RISE</strong> menggunakan{' '}
        <Highlight>Google AI Studio</Highlight> &amp; <Highlight>Google Antigravity</Highlight>.
      </div>

      <StoreCoverArt live={live} />
      <CircleDoodle x={100} y={348} w={680} h={164} color={TEAL_HEX} live={live} delay={0.45} />
    </Frame>
  );
};

// ============================================================================
// SLIDE 02 — Memulai Development dari Project Brief (Scorecard ?p=3 Style!)
// ============================================================================
const BriefFeatureRow = ({
  top,
  code,
  feature,
  desc,
  tag,
  accent = false,
  active = false,
  onClick,
}: {
  top: number;
  code: string;
  feature: string;
  desc: string;
  tag: string;
  accent?: boolean;
  active?: boolean;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className="fw2-interactive"
    style={{
      ...abs(840, top, 960, 108),
      borderTop: `1.5px solid ${RULE}`,
      background: active ? TINT_TEAL : 'transparent',
      borderRadius: active ? 12 : 0,
      padding: '0 16px',
    }}
  >
    <div style={{ ...abs(16, 18), fontSize: 28, fontWeight: 720, letterSpacing: '-0.015em' }}>
      {feature}
    </div>
    <div style={{ ...abs(16, 58), fontSize: 21, color: SOFT }}>{desc}</div>
    <div
      style={{
        ...abs(620, 22, 120),
        textAlign: 'right',
        fontSize: 50,
        fontWeight: 780,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        color: accent ? TEAL_HEX : INK,
      }}
    >
      {code}
    </div>
    <div
      style={{
        ...abs(770, 36, 170),
        ...row,
        gap: 8,
        fontSize: 21,
        fontWeight: 680,
        color: accent ? TEAL_HEX : BODY,
        whiteSpace: 'nowrap',
      }}
    >
      <CheckMark color={accent ? TEAL_HEX : INK_HEX} />
      <span>{tag}</span>
    </div>
  </div>
);

const Slide02ProjectBrief: Page = () => {
  const live = useIsActivePage();
  const [tab, setTab] = useState<'identity' | 'problem' | 'design'>('identity');
  const [selectedFeat, setSelectedFeat] = useState(1);

  return (
    <Frame>
      <Eyebrow>Project Brief · UrbanStore</Eyebrow>
      <h2 style={{ ...abs(X0, 154, 660), ...headline(74), lineHeight: 1.0 }}>
        Pahami brief
        <br />
        sebelum prompt.
      </h2>

      <p style={{ ...abs(X0, 326, 660), margin: 0, fontSize: 24, lineHeight: 1.48, color: BODY }}>
        Sebelum membuka Google AI Studio, kita tidak perlu membuat PRD dulu. Gunakan{' '}
        <Highlight color={HIGHLIGHT_TEAL}>Project Brief</Highlight> sebagai sumber context:
      </p>

      {/* Interactive Tabs on Left */}
      <div style={{ ...abs(X0, 424), ...row, gap: 10 }}>
        <div
          onClick={() => setTab('identity')}
          className="fw2-interactive"
          style={{
            padding: '10px 20px',
            borderRadius: 99,
            background: tab === 'identity' ? TINT_TEAL : '#F3F2EE',
            boxShadow: tab === 'identity' ? `inset 0 0 0 2px ${INK_HEX}` : 'none',
            fontSize: 20,
            fontWeight: 720,
          }}
        >
          Profil &amp; Produk
        </div>
        <div
          onClick={() => setTab('problem')}
          className="fw2-interactive"
          style={{
            padding: '10px 20px',
            borderRadius: 99,
            background: tab === 'problem' ? TINT_PINK : '#F3F2EE',
            boxShadow: tab === 'problem' ? `inset 0 0 0 2px ${INK_HEX}` : 'none',
            fontSize: 20,
            fontWeight: 720,
          }}
        >
          Problem &amp; Goal
        </div>
        <div
          onClick={() => setTab('design')}
          className="fw2-interactive"
          style={{
            padding: '10px 20px',
            borderRadius: 99,
            background: tab === 'design' ? TINT_YELLOW : '#F3F2EE',
            boxShadow: tab === 'design' ? `inset 0 0 0 2px ${INK_HEX}` : 'none',
            fontSize: 20,
            fontWeight: 720,
          }}
        >
          Design Direction
        </div>
      </div>

      {/* Left Tab Content Card */}
      {tab === 'identity' ? (
        <div
          style={{
            ...abs(X0, 488, 660, 250),
            borderRadius: 22,
            background: TINT_TEAL,
            padding: '24px 28px',
            fontSize: 22,
            lineHeight: 1.48,
          }}
        >
          <div>
            <strong style={{ color: INK }}>Nama Project:</strong> UrbanStore (E-Commerce)
          </div>
          <div style={{ marginTop: 8 }}>
            <strong style={{ color: INK }}>Target User:</strong> Gen Z &amp; young adults (18–30
            thn)
          </div>
          <div style={{ marginTop: 8 }}>
            <strong style={{ color: INK }}>Produk:</strong> Fashion pria &amp; wanita — T-Shirt,
            Hoodie, Jacket, Pants, Accessories.
          </div>
        </div>
      ) : null}

      {tab === 'problem' ? (
        <div
          style={{
            ...abs(X0, 488, 660, 250),
            borderRadius: 22,
            background: TINT_PINK,
            padding: '24px 28px',
            fontSize: 22,
            lineHeight: 1.45,
          }}
        >
          <div>
            <strong style={{ color: CORAL_HEX }}>Problem:</strong> Belanja kurang nyaman, katalog
            kurang menarik, pilih produk rumit, info kurang jelas.
          </div>
          <div style={{ marginTop: 10 }}>
            <strong style={{ color: INK }}>Goal:</strong> Website online store modern yang
            sederhana, nyaman, dan mudah digunakan.
          </div>
        </div>
      ) : null}

      {tab === 'design' ? (
        <div
          style={{
            ...abs(X0, 488, 660, 250),
            borderRadius: 22,
            background: TINT_YELLOW,
            padding: '24px 28px',
            fontSize: 22,
            lineHeight: 1.48,
          }}
        >
          <div style={{ fontWeight: 740, marginBottom: 8 }}>Design Direction UrbanStore:</div>
          <div>• Modern Minimalist &amp; Swiss Style Design</div>
          <div>• Dominasi warna Hitam &amp; Putih</div>
          <div>• Responsive Design &amp; Clean UI</div>
        </div>
      ) : null}

      <Ink width={420} height={60} style={abs(X0, 768)}>
        <TallyBox x={0} live={live} />
        <TallyBox x={70} accent live={live} />
        <TallyBox x={140} live={live} />
        <TallyBox x={210} live={live} />
        <TallyBox x={280} live={live} />
        <TallyBox x={350} live={live} />
      </Ink>
      <div style={{ ...abs(X0, 842, 660), fontSize: 20, color: SOFT }}>
        Klik tab di atas untuk beralih konteks brief
      </div>

      {/* Right 6 Main Features Scorecard */}
      <BriefFeatureRow
        top={154}
        code="01"
        feature="Homepage"
        desc="Hero banner, koleksi terbaru & navigasi utama"
        tag="Core Page"
        active={selectedFeat === 0}
        onClick={() => setSelectedFeat(0)}
      />
      <BriefFeatureRow
        top={266}
        code="02"
        feature="Product Catalog"
        desc="Grid produk, search bar, filter kategori & sorting"
        tag="Key Feature"
        accent
        active={selectedFeat === 1}
        onClick={() => setSelectedFeat(1)}
      />
      <BriefFeatureRow
        top={378}
        code="03"
        feature="Product Detail"
        desc="Info produk jelas, ukuran, harga & tombol Add to Cart"
        tag="Core Page"
        active={selectedFeat === 2}
        onClick={() => setSelectedFeat(2)}
      />
      <BriefFeatureRow
        top={490}
        code="04"
        feature="Shopping Cart"
        desc="Daftar belanjaan, ubah jumlah & ringkasan harga"
        tag="Core Flow"
        active={selectedFeat === 3}
        onClick={() => setSelectedFeat(3)}
      />
      <BriefFeatureRow
        top={602}
        code="05"
        feature="Checkout"
        desc="Form alamat pengiriman, metode bayar & ringkasan order"
        tag="Conversion"
        accent
        active={selectedFeat === 4}
        onClick={() => setSelectedFeat(4)}
      />
      <BriefFeatureRow
        top={714}
        code="06"
        feature="Order Confirmation"
        desc="Status pesanan berhasil & detail konfirmasi"
        tag="Closing"
        active={selectedFeat === 5}
        onClick={() => setSelectedFeat(5)}
      />
      <div style={{ ...abs(840, 834, 960), borderTop: `1.5px solid ${RULE}` }} />

      <div style={{ ...abs(840, 856, 960), fontSize: 22, color: BODY }}>
        <strong style={{ color: INK }}>Insight:</strong> Semua informasi di atas menjadi{' '}
        <Highlight>context</Highlight> dalam setiap prompt development.
      </div>
      <CircleDoodle x={1488} y={276} w={110} h={86} color={TEAL_HEX} live={live} delay={0.5} />
    </Frame>
  );
};

// ============================================================================
// SLIDE 03 — Mengenal Tools AI Coding (Fieldwork Bets Style)
// ============================================================================
const PrimaryToolCard = ({
  x,
  tint,
  num,
  title,
  badge,
  items,
  active,
  onClick,
}: {
  x: number;
  tint: string;
  num: string;
  title: string;
  badge: string;
  items: string[];
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="fw2-interactive"
    style={{
      ...abs(x, 310, 540, 560),
      borderRadius: 24,
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
        <span style={{ fontSize: 22, fontWeight: 750, color: SOFT }}>PRIMARY TOOL · {num}</span>
        <span
          style={{
            padding: '6px 14px',
            borderRadius: 99,
            background: '#FFFFFF',
            boxShadow: `inset 0 0 0 2px ${INK_HEX}`,
            fontSize: 18,
            fontWeight: 740,
          }}
        >
          {badge}
        </span>
      </div>
      <div style={{ ...headline(48), marginTop: 22 }}>{title}</div>
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ ...row, gap: 12, fontSize: 24, color: INK }}>
          <CheckMark color={TEAL_HEX} />
          <span>{items[0]}</span>
        </div>
        <div style={{ ...row, gap: 12, fontSize: 24, color: INK }}>
          <CheckMark color={TEAL_HEX} />
          <span>{items[1]}</span>
        </div>
        <div style={{ ...row, gap: 12, fontSize: 24, color: INK }}>
          <CheckMark color={TEAL_HEX} />
          <span>{items[2]}</span>
        </div>
        <div style={{ ...row, gap: 12, fontSize: 24, color: INK }}>
          <CheckMark color={TEAL_HEX} />
          <span>{items[3]}</span>
        </div>
      </div>
    </div>

    <div style={{ fontSize: 21, fontWeight: 700, color: BODY }}>
      Digunakan sebagai tool utama Batch 4 →
    </div>
  </div>
);

const AltToolRow = ({ name, focus }: { name: string; focus: string }) => (
  <div
    style={{
      ...row,
      justifyContent: 'space-between',
      height: 76,
      borderBottom: `1.5px solid ${RULE}`,
      fontSize: 25,
    }}
  >
    <span style={{ fontWeight: 740 }}>{name}</span>
    <span style={{ color: BODY, fontSize: 22 }}>{focus}</span>
  </div>
);

const Slide03AICodingTools: Page = () => {
  const [selectedTool, setSelectedTool] = useState(0);

  return (
    <Frame>
      <Eyebrow>Mengenal Tools AI Coding</Eyebrow>
      <h2 style={{ ...abs(X0, 162, 920), ...headline(76) }}>Tools utama Batch 4.</h2>
      <div style={{ ...abs(1120, 174, 680), fontSize: 25, lineHeight: 1.42, color: BODY }}>
        Kita tidak hanya punya satu pilihan tools. Pada bootcamp ini kita fokus menggunakan{' '}
        <Highlight color={HIGHLIGHT_TEAL}>Google AI Studio</Highlight> dan{' '}
        <Highlight>Google Antigravity</Highlight>.
      </div>

      <PrimaryToolCard
        x={120}
        tint={TINT_TEAL}
        num="01"
        title="Google AI Studio"
        badge="Prototyping"
        items={[
          'Ide menjadi prototype aplikasi',
          'Generate UI & fitur via prompt',
          'Iterasi cepat hasil generate',
          'Uji kemampuan AI membangun app',
        ]}
        active={selectedTool === 0}
        onClick={() => setSelectedTool(0)}
      />

      <PrimaryToolCard
        x={690}
        tint={TINT_YELLOW}
        num="02"
        title="Google Antigravity"
        badge="Full IDE Agent"
        items={[
          'Melanjutkan development project',
          'Memahami & kelola struktur kode',
          'Kembangkan fitur bertahap',
          'Debugging, fix error & testing',
        ]}
        active={selectedTool === 1}
        onClick={() => setSelectedTool(1)}
      />

      {/* Right Column: Alternative Tools */}
      <div
        style={{
          ...abs(1260, 310, 540, 560),
          borderRadius: 24,
          background: '#F6F5F2',
          padding: 36,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: 22, fontWeight: 750, color: SOFT }}>ALTERNATIVE TOOLS</div>
          <div style={{ ...headline(40), marginTop: 14, marginBottom: 20 }}>Pilihan Lainnya</div>
          <AltToolRow name="Lovable" focus="AI-powered app builder" />
          <AltToolRow name="Bolt.new" focus="AI-powered web development" />
          <AltToolRow name="v0" focus="UI & frontend generation" />
        </div>

        <div style={{ fontSize: 23, lineHeight: 1.42, color: BODY }}>
          <strong style={{ color: INK }}>Key Message:</strong> Setiap tools punya keunggulan
          masing-masing. Kuasai fundamental prompt-nya!
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 04 — Generate Fondasi Aplikasi Menggunakan RTCF (Morph Pair -> Slide 05)
// ============================================================================
const RtcfBlock = ({
  code,
  title,
  body,
  tint,
  active,
  onClick,
}: {
  code: string;
  title: string;
  body: string;
  tint: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="fw2-interactive"
    style={{
      borderRadius: 20,
      background: tint,
      padding: '20px 26px',
      marginBottom: 16,
      boxShadow: active ? `inset 0 0 0 2.5px ${INK_HEX}` : 'none',
    }}
  >
    <div style={{ ...row, gap: 12 }}>
      <span style={{ fontSize: 22, fontWeight: 780, color: TEAL_HEX }}>{code}</span>
      <span style={{ ...headline(32) }}>{title}</span>
    </div>
    <div style={{ fontSize: 24, lineHeight: 1.4, color: INK, marginTop: 8 }}>{body}</div>
  </div>
);

const PagePill = ({ num, name, morphId }: { num: string; name: string; morphId?: string }) => {
  const pill = (
    <div
      style={{
        ...row,
        gap: 12,
        background: '#FFFFFF',
        padding: '12px 18px',
        borderRadius: 14,
        boxShadow: `inset 0 0 0 2px ${INK_HEX}`,
        fontSize: 22,
        fontWeight: 680,
      }}
    >
      <span style={{ color: TEAL_HEX, fontWeight: 800 }}>{num}</span>
      <span>{name}</span>
    </div>
  );
  return morphId ? <MorphElement id={morphId}>{pill}</MorphElement> : pill;
};

const Slide04FoundationRTCF: Page = () => {
  const live = useIsActivePage();
  const [activePart, setActivePart] = useState(2);

  return (
    <Frame>
      <Eyebrow>Langkah Pertama · Fondasi Aplikasi</Eyebrow>
      <h2 style={{ ...abs(X0, 164, 960), ...headline(70) }}>Bangun fondasi dengan RTCF.</h2>
      <div style={{ ...abs(1140, 168, 660), fontSize: 25, lineHeight: 1.42, color: BODY }}>
        Jangan langsung meminta AI membuat seluruh fitur detail. Mulai dari{' '}
        <Highlight color={HIGHLIGHT_TEAL}>fondasi aplikasi</Highlight> berdasarkan project brief.
      </div>

      {/* Left: Role, Task, Format */}
      <div style={abs(X0, 294, 760)}>
        <RtcfBlock
          code="R"
          title="Role"
          body="Bertindaklah sebagai Senior Fullstack Developer dan UI/UX Designer."
          tint={TINT_TEAL}
          active={activePart === 0}
          onClick={() => setActivePart(0)}
        />
        <RtcfBlock
          code="T"
          title="Task"
          body="Bangun fondasi awal website online store bernama UrbanStore."
          tint={TINT_YELLOW}
          active={activePart === 1}
          onClick={() => setActivePart(1)}
        />
        <RtcfBlock
          code="F"
          title="Format"
          body="Aplikasi web responsive dengan React & Tailwind CSS. Gunakan reusable components, clean code, nyaman di desktop & mobile."
          tint={TINT_BLUE}
          active={activePart === 3}
          onClick={() => setActivePart(3)}
        />

        <div
          style={{
            marginTop: 22,
            padding: '18px 24px',
            borderRadius: 18,
            background: '#F6F5F2',
            fontSize: 23,
            lineHeight: 1.42,
            color: BODY,
          }}
        >
          <strong style={{ color: INK }}>Kenapa RTCF?</strong> Karena AI memahami konteks project,
          target pengguna, dan ekspektasi hasilnya.
        </div>
      </div>

      {/* Right: Context Card with 6 Connected Pages */}
      <div
        onClick={() => setActivePart(2)}
        className="fw2-interactive"
        style={{
          ...abs(920, 294, 880, 610),
          borderRadius: 24,
          background: TINT_PINK,
          padding: 36,
          boxShadow: activePart === 2 ? `inset 0 0 0 3px ${INK_HEX}` : 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontSize: 22, fontWeight: 780, color: CORAL_HEX }}>
              C · CONTEXT (URBANSTORE BRIEF)
            </span>
            <span style={{ fontSize: 20, fontWeight: 700, color: BODY }}>
              ROLE → TASK → CONTEXT → FORMAT
            </span>
          </div>
          <p style={{ fontSize: 25, lineHeight: 1.45, color: INK, margin: '18px 0 24px' }}>
            Website e-commerce fashion pria &amp; wanita untuk Gen Z (18–30 thn). Desain{' '}
            <strong>modern minimalist Swiss Style</strong>, dominasi hitam &amp; putih. Gunakan{' '}
            <Highlight>mock data</Highlight> dan pastikan navigasi antarhalaman terhubung:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <PagePill num="01" name="Homepage" />
            <PagePill num="02" name="Product Catalog" morphId="catalog-focus" />
            <PagePill num="03" name="Product Detail" />
            <PagePill num="04" name="Shopping Cart" />
            <PagePill num="05" name="Checkout" />
            <PagePill num="06" name="Order Confirmation" />
          </div>
        </div>

        <div style={{ fontSize: 22, color: BODY, fontWeight: 650 }}>
          Tekan → untuk fokus mengembangkan halaman Product Catalog menggunakan RTF
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 05 — Generate Feature Menggunakan RTF (Morph from Slide 04!)
// ============================================================================
const SpecCheck = ({ label }: { label: string }) => (
  <div
    style={{
      ...row,
      gap: 12,
      background: '#FFFFFF',
      padding: '12px 18px',
      borderRadius: 14,
      boxShadow: `inset 0 0 0 1.5px ${RULE}`,
      fontSize: 22,
      fontWeight: 650,
    }}
  >
    <CheckMark color={TEAL_HEX} />
    <span>{label}</span>
  </div>
);

const Slide05FeatureRTF: Page = () => {
  const live = useIsActivePage();
  const after: CSSProperties = live
    ? { animation: `fw2-fade 0.4s ease-out ${MORPH_MS}ms both` }
    : {};

  return (
    <Frame>
      <Eyebrow>Setelah Fondasi Selesai · Formula RTF</Eyebrow>
      <h2 style={{ ...abs(X0, 162, 960), ...headline(76) }}>Satu fitur, satu prompt.</h2>
      <div style={{ ...abs(1180, 164, 620), textAlign: 'right' }}>
        <div style={{ fontSize: 22, fontWeight: 750, color: CORAL_HEX }}>RULE UTAMA</div>
        <div style={{ ...headline(48), marginTop: 4 }}>
          <Highlight>ONE PROMPT = ONE FEATURE</Highlight>
        </div>
      </div>

      {/* Left Column: Role & Format */}
      <div style={abs(X0, 296, 680)}>
        <div style={{ marginBottom: 18 }}>
          <MorphElement id="catalog-focus">
            <div
              style={{
                ...row,
                gap: 12,
                background: TINT_TEAL,
                padding: '14px 22px',
                borderRadius: 14,
                boxShadow: `inset 0 0 0 2.5px ${INK_HEX}`,
                fontSize: 24,
                fontWeight: 750,
              }}
            >
              <span style={{ color: TEAL_HEX }}>TARGET FEATURE:</span>
              <span>02 · Product Catalog Page</span>
            </div>
          </MorphElement>
        </div>

        <RtcfBlock
          code="R"
          title="Role"
          body="Bertindak sebagai Senior Frontend Developer."
          tint={TINT_TEAL}
          active={false}
          onClick={() => {}}
        />
        <RtcfBlock
          code="F"
          title="Format & Constraints"
          body="Gunakan React & Tailwind CSS, responsive grid konsisten, reusable components, dan mock data yang sudah tersedia."
          tint={TINT_BLUE}
          active={false}
          onClick={() => {}}
        />
        <div
          style={{
            borderRadius: 18,
            background: TINT_PINK,
            padding: '18px 24px',
            fontSize: 23,
            fontWeight: 700,
            color: CORAL_HEX,
          }}
        >
          ⚠️ Constraint: Jangan mengubah halaman lain yang sudah berjalan!
        </div>
      </div>

      {/* Right Column: Task Specification for Product Catalog */}
      <div
        style={{
          ...abs(840, 296, 960, 610),
          borderRadius: 24,
          background: TINT_YELLOW,
          padding: 36,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          ...after,
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontSize: 22, fontWeight: 780, color: '#B07A12' }}>
              T · TASK (HALAMAN KATALOG PRODUK)
            </span>
            <span style={{ fontSize: 20, fontWeight: 700, color: BODY }}>ROLE → TASK → FORMAT</span>
          </div>
          <div style={{ ...headline(40), marginTop: 12, marginBottom: 22 }}>
            Buat halaman katalog produk untuk UrbanStore:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <SpecCheck label="Search bar cari produk" />
            <SpecCheck label="Filter berdasarkan kategori" />
            <SpecCheck label="Sorting berdasarkan harga" />
            <SpecCheck label="Product card & Gambar" />
            <SpecCheck label="Nama & harga produk" />
            <SpecCheck label="Badge diskon" />
            <SpecCheck label="Tombol Add to Cart" />
            <SpecCheck label="Klik → ke Product Detail" />
          </div>
        </div>

        <div style={{ fontSize: 24, color: BODY }}>
          Mulai kembangkan fitur <strong style={{ color: INK }}>satu per satu</strong>. Jangan
          meminta AI membuat semua fitur sekaligus.
        </div>
      </div>
    </Frame>
  );
};

Slide04FoundationRTCF.transition = morphTransition;
Slide05FeatureRTF.transition = morphTransition;

// ============================================================================
// SLIDE 06 — Menggunakan RISE untuk Task yang Lebih Kompleks
// ============================================================================
const RiseStepButton = ({
  num,
  text,
  active,
  onClick,
}: {
  num: string;
  text: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="fw2-interactive"
    style={{
      ...row,
      gap: 14,
      padding: '13px 18px',
      borderRadius: 14,
      background: active ? TINT_TEAL : '#FFFFFF',
      boxShadow: active ? `inset 0 0 0 2.5px ${INK_HEX}` : `inset 0 0 0 1.5px ${RULE}`,
      marginBottom: 11,
      fontSize: 22,
      fontWeight: active ? 720 : 560,
    }}
  >
    <span style={{ color: TEAL_HEX, fontWeight: 800, width: 30 }}>{num}</span>
    <span>{text}</span>
  </div>
);

const ExpectRow = ({ text, live }: { text: string; live: boolean }) => (
  <div style={{ ...row, gap: 14, height: 56, fontSize: 24, borderBottom: `1.5px solid ${RULE}` }}>
    <CheckMark color={TEAL_HEX} />
    <span>{text}</span>
    <span style={{ marginLeft: 'auto', width: 64, height: 6, borderRadius: 3, background: TINT_TEAL }}>
      <span
        style={{
          display: 'block',
          height: 6,
          width: '100%',
          borderRadius: 3,
          background: TEAL_HEX,
          transformOrigin: 'left center',
          animation: live ? `fw2-grow 0.6s ${EASE_OUT} 0.2s both` : undefined,
        }}
      />
    </span>
  </div>
);

const Slide06ComplexRISE: Page = () => {
  const live = useIsActivePage();
  const [step, setStep] = useState(0);

  return (
    <Frame>
      <Eyebrow>Belum Tahu Mulai dari Mana? · Formula RISE</Eyebrow>
      <h2 style={{ ...abs(X0, 164, 960), ...headline(70) }}>Minta AI merencanakan dulu.</h2>
      <div style={{ ...abs(1140, 168, 660), fontSize: 25, lineHeight: 1.42, color: BODY }}>
        Jangan selalu meminta AI langsung membuat kode. Terkadang lebih efektif meminta AI{' '}
        <Highlight color={HIGHLIGHT_TEAL}>berpikir dan merencanakan</Highlight> terlebih dahulu.
      </div>

      {/* Left: Role & Input */}
      <div style={abs(X0, 296, 520)}>
        <RtcfBlock
          code="R"
          title="Role"
          body="Senior Software Engineer & Technical Product Manager."
          tint={TINT_TEAL}
          active={false}
          onClick={() => {}}
        />
        <RtcfBlock
          code="I"
          title="Input"
          body="Website UrbanStore (online store fashion pria & wanita) dengan 6 fitur: Homepage, Catalog, Detail, Cart, Checkout, Confirmation."
          tint={TINT_YELLOW}
          active={false}
          onClick={() => {}}
        />
        <div
          style={{
            borderRadius: 20,
            background: '#F6F5F2',
            padding: '20px 24px',
            fontSize: 22,
            lineHeight: 1.42,
            color: BODY,
          }}
        >
          <strong style={{ color: INK }}>Cocok untuk:</strong> Analisis kebutuhan, memecah fitur
          kompleks, urutan dev &amp; roadmap.
        </div>
      </div>

      {/* Middle: 6 Steps */}
      <div style={abs(670, 296, 590)}>
        <div style={{ ...row, justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ ...headline(36) }}>S · Steps (6 Langkah)</span>
          <span style={{ fontSize: 19, color: SOFT }}>Klik step</span>
        </div>
        <RiseStepButton
          num="01"
          text="Analisis seluruh kebutuhan fitur."
          active={step === 0}
          onClick={() => setStep(0)}
        />
        <RiseStepButton
          num="02"
          text="Kelompokkan fitur berdasarkan modul."
          active={step === 1}
          onClick={() => setStep(1)}
        />
        <RiseStepButton
          num="03"
          text="Identifikasi dependensi antarfitur."
          active={step === 2}
          onClick={() => setStep(2)}
        />
        <RiseStepButton
          num="04"
          text="Tentukan urutan pengerjaan."
          active={step === 3}
          onClick={() => setStep(3)}
        />
        <RiseStepButton
          num="05"
          text="Tentukan komponen reusable."
          active={step === 4}
          onClick={() => setStep(4)}
        />
        <RiseStepButton
          num="06"
          text="Buat daftar task development bertahap."
          active={step === 5}
          onClick={() => setStep(5)}
        />
      </div>

      {/* Right: Expectation */}
      <div style={abs(1290, 296, 510)}>
        <div style={{ ...headline(36), marginBottom: 14 }}>E · Expectation (Roadmap)</div>
        <ExpectRow text="Feature breakdown" live={live} />
        <ExpectRow text="Prioritas pengerjaan" live={live} />
        <ExpectRow text="Urutan development" live={live} />
        <ExpectRow text="Komponen yang dibutuhkan" live={live} />
        <ExpectRow text="Task siap dikerjakan AI Coding" live={live} />
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 07 — Bingung Menyusun Prompt? Minta AI Membuat Prompt Terlebih Dahulu
// ============================================================================
const MetaPromptBadge = ({ label }: { label: string }) => (
  <div
    style={{
      ...row,
      gap: 10,
      background: '#FFFFFF',
      padding: '10px 16px',
      borderRadius: 12,
      boxShadow: `inset 0 0 0 1.5px ${INK_HEX}`,
      fontSize: 20,
      fontWeight: 660,
    }}
  >
    <span style={{ color: TEAL_HEX }}>✓</span>
    <span>{label}</span>
  </div>
);

const Slide07AskAIToWritePrompt: Page = () => {
  const live = useIsActivePage();

  return (
    <Frame>
      <Eyebrow color={CORAL_HEX}>Meta-Prompting · AI sebagai Prompt Engineer</Eyebrow>
      <h2 style={{ ...abs(X0, 154, 680), ...headline(70), lineHeight: 1.02 }}>
        Bingung menyusun
        <br />
        prompt?
      </h2>

      <p style={{ ...abs(X0, 320, 680), margin: 0, fontSize: 24, lineHeight: 1.48, color: BODY }}>
        Kamu tidak harus selalu menulis prompt sendiri. Gunakan AI sebagai{' '}
        <Highlight color={HIGHLIGHT_TEAL}>Expert Prompt Engineer</Highlight> untuk merancang prompt
        terbaik bagi Google AI Studio.
      </p>

      {/* Left Callout Card */}
      <div
        style={{
          ...abs(X0, 444, 680, 410),
          borderRadius: 24,
          background: TINT_YELLOW,
          padding: 34,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span
            style={{
              padding: '6px 14px',
              borderRadius: 99,
              background: '#FFFFFF',
              boxShadow: `inset 0 0 0 1.5px ${INK_HEX}`,
              fontSize: 18,
              fontWeight: 780,
              color: '#9E6B0E',
            }}
          >
            TIPS JITU VIBE CODING
          </span>
          <div style={{ ...headline(44), marginTop: 18, lineHeight: 1.08 }}>
            Ask AI to write
            <br />
            <Highlight color="#FFFFFF">the prompt</Highlight> for you.
          </div>
          <p style={{ fontSize: 22, lineHeight: 1.42, color: BODY, margin: '14px 0 0' }}>
            Sebelum mulai coding di Google AI Studio, minta LLM menyusun prompt dengan formula RTCF
            yang lengkap, detail, dan terarah.
          </p>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '16px 20px',
            boxShadow: `inset 0 0 0 2px ${INK_HEX}`,
            fontSize: 20,
            fontWeight: 700,
            color: INK,
          }}
        >
          ✓ Output: Satu prompt final RTCF siap copy-paste!
        </div>
      </div>

      {/* Right Column: Contoh Meta-Prompt Card */}
      <div
        style={{
          ...abs(840, 154, 960, 700),
          borderRadius: 24,
          background: TINT_TEAL,
          padding: 34,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontSize: 21, fontWeight: 780, color: TEAL_HEX }}>
              CONTOH META-PROMPT (URBANSTORE CATALOG)
            </span>
            <Ink width={36} height={36} viewBox="-22 -22 44 44">
              <Sparkle x={0} y={0} s={0.85} fill={CORAL_HEX} />
            </Ink>
          </div>

          <div
            style={{
              marginTop: 16,
              background: '#FFFFFF',
              borderRadius: 18,
              padding: '20px 24px',
              boxShadow: `inset 0 0 0 2px ${INK_HEX}`,
              fontSize: 22,
              lineHeight: 1.46,
            }}
          >
            “Bertindaklah sebagai <Highlight>Expert Prompt Engineer</Highlight> dalam AI-assisted
            development. Saya ingin membangun website <strong style={{ color: INK }}>UrbanStore</strong>{' '}
            (fashion e-commerce modern minimalis) di <strong>Google AI Studio</strong>. Bantu saya
            membuat prompt AI Coding lengkap dengan formula <strong>RTCF</strong> untuk membangun
            fitur <Highlight color={HIGHLIGHT_TEAL}>Product Catalog</Highlight>.”
          </div>

          <div style={{ fontSize: 21, fontWeight: 750, margin: '20px 0 12px' }}>
            Minta AI menyertakan 8 komponen ini di dalam prompt:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <MetaPromptBadge label="01. Role AI" />
            <MetaPromptBadge label="02. Task spesifik" />
            <MetaPromptBadge label="03. Context project" />
            <MetaPromptBadge label="04. Kebutuhan fitur" />
            <MetaPromptBadge label="05. Design direction" />
            <MetaPromptBadge label="06. Technical specs" />
            <MetaPromptBadge label="07. Rules & constraints" />
            <MetaPromptBadge label="08. Expected output" />
          </div>
        </div>

        <div style={{ fontSize: 21, color: BODY, fontWeight: 650, paddingTop: 8 }}>
          ✓ Instruksi jelas &amp; tidak ambigu · ✓ Fokus 1 fitur · ✓ Tidak merusak fitur lain
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 08 — AI Debugging Workflow
// ============================================================================
const DebugFlowPill = ({
  num,
  label,
  active,
  onClick,
}: {
  num: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="fw2-interactive"
    style={{
      flex: 1,
      borderRadius: 16,
      background: active ? TINT_PINK : '#F3F2EE',
      boxShadow: active ? `inset 0 0 0 2.5px ${CORAL_HEX}` : `inset 0 0 0 1.5px ${RULE}`,
      padding: '12px 14px',
      textAlign: 'center',
    }}
  >
    <div style={{ fontSize: 17, fontWeight: 780, color: CORAL_HEX }}>{num}</div>
    <div style={{ fontSize: 18, fontWeight: 740, marginTop: 4, lineHeight: 1.2 }}>{label}</div>
  </div>
);

const Slide08DebuggingWorkflow: Page = () => {
  const live = useIsActivePage();
  const [activeStep, setActiveStep] = useState(3);

  return (
    <Frame>
      <Eyebrow color={CORAL_HEX}>AI Debugging Workflow</Eyebrow>
      <h2 style={{ ...abs(X0, 154, 920), ...headline(74) }}>Error adalah bagian dev.</h2>
      <div style={{ ...abs(1120, 162, 680), fontSize: 25, lineHeight: 1.42, color: BODY }}>
        Jangan panik ketika AI menghasilkan kode yang error. Pelajari cara memberikan{' '}
        <Highlight color={HIGHLIGHT_PINK}>instruksi debugging yang tepat</Highlight>.
      </div>

      {/* 7-Step Horizontal Debugging Pipeline */}
      <div style={{ ...abs(X0, 276, W, 84), display: 'flex', gap: 12 }}>
        <DebugFlowPill
          num="01"
          label="ERROR"
          active={activeStep === 0}
          onClick={() => setActiveStep(0)}
        />
        <DebugFlowPill
          num="02"
          label="READ MESSAGE"
          active={activeStep === 1}
          onClick={() => setActiveStep(1)}
        />
        <DebugFlowPill
          num="03"
          label="IDENTIFY"
          active={activeStep === 2}
          onClick={() => setActiveStep(2)}
        />
        <DebugFlowPill
          num="04"
          label="GIVE CONTEXT"
          active={activeStep === 3}
          onClick={() => setActiveStep(3)}
        />
        <DebugFlowPill
          num="05"
          label="ASK AI ANALYZE"
          active={activeStep === 4}
          onClick={() => setActiveStep(4)}
        />
        <DebugFlowPill
          num="06"
          label="APPLY FIX"
          active={activeStep === 5}
          onClick={() => setActiveStep(5)}
        />
        <DebugFlowPill
          num="07"
          label="TEST AGAIN"
          active={activeStep === 6}
          onClick={() => setActiveStep(6)}
        />
      </div>

      {/* Left: Bad vs Good Debugging */}
      <div
        style={{
          ...abs(X0, 396, 640, 500),
          borderRadius: 24,
          background: TINT_PINK,
          padding: 34,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: 21, fontWeight: 780, color: CORAL_HEX }}>
            JANGAN HANYA BERKATA:
          </div>
          <blockquote
            style={{
              margin: '18px 0',
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontSize: 46,
              lineHeight: 1.15,
            }}
          >
            “Website saya error, tolong perbaiki.”
          </blockquote>
          <p style={{ fontSize: 23, lineHeight: 1.48, color: BODY }}>
            Tanpa pesan error dan konteks kapan error terjadi, AI hanya akan menebak-nebak dan
            berisiko merusak kode lain.
          </p>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '20px 24px',
            boxShadow: `inset 0 0 0 2px ${INK_HEX}`,
            fontSize: 22,
            lineHeight: 1.4,
          }}
        >
          <strong style={{ color: TEAL_HEX }}>Solusi:</strong> Berikan{' '}
          <Highlight>Error Message</Highlight> + <Highlight>Context</Highlight> tombol/fitur apa
          yang memicu error tersebut.
        </div>
      </div>

      {/* Right: Structured Debugging Prompt */}
      <div
        style={{
          ...abs(800, 396, 1000, 500),
          borderRadius: 24,
          background: TINT_TEAL,
          padding: 34,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 21, fontWeight: 780, color: TEAL_HEX }}>
              CONTOH PROMPT DEBUGGING
            </div>
            <div
              style={{
                marginTop: 14,
                background: '#FFFFFF',
                borderRadius: 16,
                padding: 20,
                fontSize: 21,
                lineHeight: 1.45,
              }}
            >
              <div>
                <strong>Role:</strong> Senior React Developer &amp; Debugging Expert.
              </div>
              <div style={{ marginTop: 8 }}>
                <strong>Task:</strong> Analisis &amp; perbaiki error UrbanStore.
              </div>
              <div style={{ marginTop: 8 }}>
                <strong>Context:</strong> React + Tailwind. Error saat klik tombol{' '}
                <Highlight>Add to Cart</Highlight>.
              </div>
              <div
                style={{
                  marginTop: 10,
                  padding: '8px 12px',
                  borderRadius: 8,
                  background: TINT_PINK,
                  fontFamily: MONO,
                  fontSize: 16,
                  color: CORAL_HEX,
                }}
              >
                [Tempelkan pesan error di sini]
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              padding: 20,
              fontSize: 20,
              lineHeight: 1.45,
            }}
          >
            <div style={{ fontWeight: 780, color: TEAL_HEX, marginBottom: 8 }}>
              5 STEPS ANALISIS:
            </div>
            <div>1. Analisis penyebab error</div>
            <div>2. Identifikasi file &amp; komponen</div>
            <div>3. Jelaskan penyebab masalah</div>
            <div>4. Berikan solusi yang tepat</div>
            <div>5. Perbaiki tanpa merusak fitur lain</div>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              padding: 18,
              fontSize: 19,
              lineHeight: 1.4,
              boxShadow: `inset 0 0 0 2px ${INK_HEX}`,
            }}
          >
            <strong>Expectation:</strong> Penjelasan penyebab + solusi + bagian kode yang diperbaiki
            + hasil akhir.
          </div>
        </div>
      </div>

      {live ? null : null}
    </Frame>
  );
};

// ============================================================================
// SLIDE 09 — Prompt Iteration & Best Practice
// ============================================================================
const Slide09IterationAndBestPractice: Page = () => {
  const [iterated, setIterated] = useState(true);

  return (
    <Frame>
      <Eyebrow>Prompt Iteration &amp; Best Practice</Eyebrow>
      <h2 style={{ ...abs(X0, 154, 920), ...headline(74) }}>Iterasi menuju sempurna.</h2>
      <div style={{ ...abs(1120, 164, 680), fontSize: 25, lineHeight: 1.42, color: BODY }}>
        Prompt pertama tidak harus langsung sempurna. Dalam AI Coding, kita menyempurnakan fitur
        melalui <Highlight color={HIGHLIGHT_TEAL}>iterasi bertahap</Highlight>.
      </div>

      {/* Left: Interactive Checkout Iteration */}
      <div style={abs(X0, 286, 960, 570)}>
        <div style={{ ...row, justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontSize: 24, fontWeight: 760 }}>Studi Kasus: Halaman Checkout</span>
          <div style={{ ...row, gap: 10 }}>
            <div
              onClick={() => setIterated(false)}
              className="fw2-interactive"
              style={{
                padding: '9px 18px',
                borderRadius: 99,
                background: !iterated ? TINT_PINK : '#F3F2EE',
                boxShadow: !iterated ? `inset 0 0 0 2px ${INK_HEX}` : 'none',
                fontSize: 20,
                fontWeight: 720,
              }}
            >
              1. Prompt Awal
            </div>
            <div
              onClick={() => setIterated(true)}
              className="fw2-interactive"
              style={{
                padding: '9px 18px',
                borderRadius: 99,
                background: iterated ? TINT_TEAL : '#F3F2EE',
                boxShadow: iterated ? `inset 0 0 0 2px ${INK_HEX}` : 'none',
                fontSize: 20,
                fontWeight: 720,
              }}
            >
              2. Setelah Iterasi
            </div>
          </div>
        </div>

        {!iterated ? (
          <div
            style={{
              borderRadius: 24,
              background: TINT_PINK,
              padding: 34,
              height: 500,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: 21, fontWeight: 780, color: CORAL_HEX }}>PROMPT AWAL</div>
              <blockquote
                style={{
                  margin: '18px 0',
                  fontFamily: SERIF,
                  fontStyle: 'italic',
                  fontSize: 50,
                }}
              >
                “Buat halaman checkout UrbanStore.”
              </blockquote>
              <div style={{ fontSize: 23, fontWeight: 740, marginTop: 20, marginBottom: 10 }}>
                Hasil yang mungkin terjadi (Kekurangan):
              </div>
              <div style={{ fontSize: 23, lineHeight: 1.55, color: BODY }}>
                • Layout terlalu sederhana &amp; belum responsive
                <br />• Tidak ada ringkasan pesanan (order summary)
                <br />• Form alamat pengiriman belum tersedia
                <br />• Tidak ada pilihan metode pembayaran
              </div>
            </div>
            <div style={{ fontSize: 21, fontWeight: 700, color: CORAL_HEX }}>
              Klik “2. Setelah Iterasi” di atas untuk melihat prompt perbaikannya →
            </div>
          </div>
        ) : (
          <div
            style={{
              borderRadius: 24,
              background: TINT_TEAL,
              padding: 34,
              height: 500,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: 21, fontWeight: 780, color: TEAL_HEX }}>
                PROMPT SETELAH ITERASI (SENIOR FRONTEND DEVELOPER)
              </div>
              <div style={{ fontSize: 23, lineHeight: 1.45, marginTop: 12, color: INK }}>
                “Perbaiki halaman checkout UrbanStore yang sudah dibuat sebelumnya. Tambahkan
                komponen berikut dengan tetap mempertahankan design system:”
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                  marginTop: 18,
                }}
              >
                <SpecCheck label="Progress indicator checkout" />
                <SpecCheck label="Order summary" />
                <SpecCheck label="Daftar produk dibeli" />
                <SpecCheck label="Form alamat pengiriman" />
                <SpecCheck label="Pilihan metode pembayaran" />
                <SpecCheck label="Rincian subtotal & total" />
                <SpecCheck label="Tombol Place Order" />
                <SpecCheck label="Responsive & Jaga halaman lain" />
              </div>
            </div>
            <div style={{ fontSize: 21, fontWeight: 700, color: TEAL_HEX }}>
              ✓ Fokus memperbaiki 1 halaman tanpa merusak fitur yang sudah berjalan!
            </div>
          </div>
        )}
      </div>

      {/* Right: Best Practice DO & DON'T */}
      <div style={abs(1120, 286, 680, 570)}>
        <div
          style={{
            borderRadius: 22,
            background: TINT_GREEN,
            padding: '24px 28px',
            marginBottom: 20,
            height: 240,
            boxSizing: 'border-box',
          }}
        >
          <div style={{ fontSize: 21, fontWeight: 800, color: '#2F6F4E', marginBottom: 10 }}>
            DO — BEST PRACTICE AI CODING
          </div>
          <div style={{ fontSize: 20, lineHeight: 1.5, color: INK }}>
            ✓ Gunakan context project &amp; 1 prompt = 1 tujuan
            <br />✓ Bangun fitur bertahap &amp; review setiap hasil
            <br />✓ Testing setelah perubahan &amp; simpan prompt sukses
            <br />✓ Gunakan <strong>Git</strong> untuk mengelola perubahan kode
          </div>
        </div>

        <div
          style={{
            borderRadius: 22,
            background: TINT_PINK,
            padding: '24px 28px',
            height: 240,
            boxSizing: 'border-box',
          }}
        >
          <div style={{ fontSize: 21, fontWeight: 800, color: CORAL_HEX, marginBottom: 10 }}>
            DON’T — HINDARI INI
          </div>
          <div style={{ fontSize: 20, lineHeight: 1.5, color: INK }}>
            ✕ Generate seluruh aplikasi berkali-kali dari nol
            <br />✕ Mengubah banyak fitur sekaligus &amp; instruksi ambigu
            <br />✕ Mengabaikan error atau terima hasil tanpa review
            <br />✕ Melakukan perubahan tanpa memahami dampaknya
          </div>
        </div>
      </div>
    </Frame>
  );
};

// ============================================================================
// SLIDE 10 — Praktik & Challenge (Fieldwork Close + Interactive Checklist!)
// ============================================================================
const ChallengeCard = ({
  num,
  title,
  desc,
  tint,
  active,
  onClick,
}: {
  num: string;
  title: string;
  desc: string;
  tint: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="fw2-interactive"
    style={{
      borderRadius: 22,
      background: tint,
      padding: '22px 28px',
      marginBottom: 16,
      boxShadow: active ? `inset 0 0 0 3px ${INK_HEX}` : 'none',
    }}
  >
    <div style={{ ...row, justifyContent: 'space-between' }}>
      <span style={{ fontSize: 19, fontWeight: 780, color: SOFT }}>CHALLENGE {num}</span>
      <span style={{ fontSize: 19, fontWeight: 750 }}>Klik detail →</span>
    </div>
    <div style={{ ...headline(34), marginTop: 6 }}>{title}</div>
    <div style={{ fontSize: 21, lineHeight: 1.4, color: BODY, marginTop: 8 }}>{desc}</div>
  </div>
);

const OutputTodo = ({
  done,
  live,
  onClick,
  children,
}: {
  done: boolean;
  live: boolean;
  onClick: () => void;
  children: ReactNode;
}) => (
  <div
    onClick={onClick}
    className="fw2-interactive"
    style={{ ...row, gap: 16, height: 50, fontSize: 22 }}
  >
    <Ink width={28} height={28} wobble={1.5}>
      <rect x="3" y="3" width="22" height="22" rx="5" fill="#FFFFFF" strokeWidth={2.6} />
      {done ? (
        <Stroke d="M5 14L11 20L22 4" color={TEAL_HEX} width={3.4} live={live} delay={0.3} />
      ) : null}
    </Ink>
    <span
      style={{
        color: done ? SOFT : INK,
        textDecoration: done ? 'line-through' : 'none',
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  </div>
);

const Slide10ChallengeAndNext: Page = () => {
  const live = useIsActivePage();
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [checks, setChecks] = useState([true, true, false, false, false]);

  const toggleCheck = (i: number) =>
    setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <Frame>
      <Eyebrow color={CORAL_HEX}>Your First AI Coding Challenge · UrbanStore</Eyebrow>
      <h2 style={{ ...abs(X0, 154, 760), ...headline(76) }}>Saatnya praktik!</h2>
      <div style={{ ...abs(1000, 164, 800), fontSize: 24, lineHeight: 1.44, color: BODY }}>
        Terapkan formula prompt dan bangun prototype aplikasi pertamamu di{' '}
        <Highlight color={HIGHLIGHT_TEAL}>Google AI Studio</Highlight>.
      </div>

      {/* Left: 3 Challenges */}
      <div style={abs(X0, 280, 840)}>
        <ChallengeCard
          num="01"
          title="Build with AI (Google AI Studio)"
          desc="Buat fondasi awal UrbanStore (minimal: Homepage, Product Catalog, Product Detail, Shopping Cart) dengan formula RTF / RTCF / RISE."
          tint={TINT_TEAL}
          active={selectedChallenge === 0}
          onClick={() => setSelectedChallenge(0)}
        />
        <ChallengeCard
          num="02"
          title="AI sebagai Prompt Engineer"
          desc="Buat 1 meta-prompt yang meminta AI berperan sebagai Prompt Engineer untuk menyusun prompt fitur UrbanStore yang lengkap."
          tint={TINT_YELLOW}
          active={selectedChallenge === 1}
          onClick={() => setSelectedChallenge(1)}
        />
        <ChallengeCard
          num="03"
          title="Iteration & Refinement"
          desc="Lakukan minimal 1 iterasi pada hasil generate untuk memperbaiki UI/UX, Layout, Responsiveness, Fungsionalitas, atau Komponen."
          tint={TINT_PINK}
          active={selectedChallenge === 2}
          onClick={() => setSelectedChallenge(2)}
        />
      </div>

      {/* Right: Output Sesi 1 Checklist + Next Session Preview */}
      <div style={abs(1000, 280, 800, 590)}>
        <div
          style={{
            borderRadius: 24,
            background: '#F6F5F2',
            padding: '26px 32px',
            marginBottom: 20,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ ...headline(34) }}>Output Sesi 1</span>
            <span style={{ fontSize: 18, color: SOFT }}>Klik untuk checklist</span>
          </div>
          <OutputTodo done={checks[0]} live={live} onClick={() => toggleCheck(0)}>
            Pemahaman penggunaan Google AI Studio
          </OutputTodo>
          <OutputTodo done={checks[1]} live={live} onClick={() => toggleCheck(1)}>
            Fondasi awal website UrbanStore
          </OutputTodo>
          <OutputTodo done={checks[2]} live={live} onClick={() => toggleCheck(2)}>
            Prompt AI Coding pertama (RTF / RTCF / RISE)
          </OutputTodo>
          <OutputTodo done={checks[3]} live={live} onClick={() => toggleCheck(3)}>
            Prompt hasil bantuan AI Prompt Engineer
          </OutputTodo>
          <OutputTodo done={checks[4]} live={live} onClick={() => toggleCheck(4)}>
            Pengalaman melakukan iterasi &amp; debugging
          </OutputTodo>
        </div>

        {/* Next Session Banner */}
        <div
          style={{
            borderRadius: 24,
            background: TINT_BLUE,
            padding: '26px 32px',
            boxShadow: `inset 0 0 0 2.5px ${INK_HEX}`,
          }}
        >
          <div style={{ ...row, justifyContent: 'space-between' }}>
            <span style={{ fontSize: 19, fontWeight: 780, color: '#2B6CB0' }}>
              NEXT SESSION · SESI 2
            </span>
            <Ink width={36} height={36} viewBox="-22 -22 44 44">
              <Sparkle x={0} y={0} s={0.8} fill={YELLOW} />
            </Ink>
          </div>
          <div style={{ ...headline(38), marginTop: 8 }}>
            Product Requirements Document (PRD)
          </div>
          <p style={{ fontSize: 21, lineHeight: 1.42, color: BODY, margin: '8px 0 14px' }}>
            Menyusun PRD sebagai fondasi perencanaan product development sebelum mengembangkan
            aplikasi yang lebih kompleks.
          </p>
          <div style={{ ...row, justifyContent: 'space-between', fontSize: 22, fontWeight: 780 }}>
            <span>From Prompting to Product Planning.</span>
            <Highlight color={HIGHLIGHT_TEAL}>Let’s Build with AI! →</Highlight>
          </div>
        </div>
      </div>
    </Frame>
  );
};

export const meta: SlideMeta = {
  title: '[VCB Batch 4] Sesi 1 - Part 2',
  createdAt: '2026-11-04T09:22:37.406Z',
  theme: 'swiss-japanese',
};

export const notes: (string | undefined)[] = [
  `Selamat datang kembali di Sesi 1 Part 2! Sekarang kita masuk ke Studi Kasus Prompt Engineering: Membangun Website Online Store (UrbanStore) dengan AI.`,
  `Sebelum membuka Google AI Studio, pahami dulu aplikasi yang akan dibangun melalui Project Brief UrbanStore.
Klik tab di kiri (Profil & Produk, Problem & Goal, Design Direction) dan klik 6 fitur utama di kanan. Semua informasi ini adalah sumber Context kita.`,
  `Mengenal Tools AI Coding di Batch 4: Kita menggunakan dua tools utama — Google AI Studio untuk merancang prototype dari prompt, dan Google Antigravity untuk melanjutkan development, mengelola kode, dan debugging. Lovable, Bolt.new, dan v0 adalah alternatif lainnya.`,
  `Langkah Pertama: Bangun fondasi aplikasi UrbanStore menggunakan formula RTCF (Role, Task, Context, Format).
Perhatikan 6 halaman yang saling terhubung. Ketika kita tekan Next (→), pill "02 Product Catalog" akan melakukan Magic Move (Morph) ke slide berikutnya!`,
  `Setelah fondasi selesai, kembangkan fitur satu per satu menggunakan formula RTF (Role, Task, Format).
Ingat rule kita: ONE PROMPT = ONE FEATURE. Jangan lupa sertakan constraint: Jangan mengubah halaman lain yang sudah berjalan.`,
  `Bagaimana jika kita bingung harus mulai dari mana untuk fitur kompleks? Gunakan formula RISE (Role, Input, Steps, Expectation).
Jangan selalu menyuruh AI langsung menulis kode; minta AI berpikir dan menyusun development roadmap terlebih dahulu.`,
  `Tips jitu kalau bingung menyusun prompt: ASK AI TO WRITE THE PROMPT FOR YOU!
Jadikan AI sebagai Expert Prompt Engineer untuk membuatkan prompt RTCF yang lengkap dan siap dipakai di Google AI Studio.`,
  `Error adalah bagian normal dari development. Ikuti 7 langkah AI Debugging Workflow: Error → Read Message → Identify → Give Context → Ask AI Analyze → Apply Fix → Test Again.
Jangan cuma bilang "Website saya error", tapi sertakan pesan error dan konteksnya.`,
  `Prompt pertama tidak harus langsung sempurna. Bandingkan "1. Prompt Awal" vs "2. Setelah Iterasi" pada studi kasus halaman Checkout UrbanStore menggunakan tombol interaktif di atas kartu.`,
  `Saatnya praktik! Ada 3 Challenge utama untuk peserta: Build with AI di Google AI Studio, gunakan AI sebagai Prompt Engineer, dan lakukan minimal 1 iterasi.
Sampai jumpa di Sesi 2: Product Requirements Document (PRD). Let's Build with AI!`,
];

export default [
  Slide01Cover,
  Slide02ProjectBrief,
  Slide03AICodingTools,
  Slide04FoundationRTCF,
  Slide05FeatureRTF,
  Slide06ComplexRISE,
  Slide07AskAIToWritePrompt,
  Slide08DebuggingWorkflow,
  Slide09IterationAndBestPractice,
  Slide10ChallengeAndNext,
] satisfies Page[];
