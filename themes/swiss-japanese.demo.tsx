import { type DesignSystem, type Page, useSlidePageNumber } from '@open-slide/core';
import type { ReactNode } from 'react';

export const design: DesignSystem = {
  palette: { bg: '#FFFFFF', text: '#111111', accent: '#3CA5A1' },
  fonts: {
    display: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  typeScale: { hero: 88, body: 28 },
  radius: 16,
};

const Title = ({ children }: { children: ReactNode }) => (
  <h1
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 88,
      fontWeight: 800,
      lineHeight: 1.05,
      letterSpacing: '-0.03em',
      margin: 0,
      color: '#111111',
    }}
  >
    {children}
  </h1>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 40,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 16,
        fontWeight: 500,
        color: '#687076',
      }}
    >
      <span>CODEPOLITAN · SWISS × JAPANESE DESIGN SYSTEM</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#3CA5A1',
    }}
  >
    {children}
  </div>
);

const Cover: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      background: '#FFFFFF',
      color: '#111111',
      padding: 120,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      fontFamily: 'var(--osd-font-body)',
    }}
  >
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');`}</style>
    <Eyebrow>SWISS INTERNATIONAL × JAPANESE MINIMALISM</Eyebrow>
    <div style={{ marginTop: 20 }}>
      <Title>
        Clarity before <span style={{ color: '#3CA5A1' }}>decoration.</span>
      </Title>
    </div>
    <p style={{ fontSize: 28, color: '#2A2A2A', maxWidth: 960, marginTop: 28, lineHeight: 1.5 }}>
      Precision grid discipline, generous negative space, and purposeful geometric accents.
    </p>
    <Footer />
  </div>
);

const Content: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      background: '#FFFFFF',
      color: '#111111',
      padding: 120,
      boxSizing: 'border-box',
      fontFamily: 'var(--osd-font-body)',
    }}
  >
    <Eyebrow>COLOR & PROPORTION</Eyebrow>
    <h2 style={{ fontSize: 56, fontWeight: 800, margin: '16px 0 48px', letterSpacing: '-0.025em' }}>
      70% White · 20% Teal · 10% Coral Pink
    </h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
      <div style={{ padding: 32, borderRadius: 16, border: '1.5px solid #DDE2E5', background: '#F5F7F8' }}>
        <div style={{ fontSize: 44, fontWeight: 800, color: '#111111' }}>70%</div>
        <div style={{ fontSize: 22, fontWeight: 600, marginTop: 8 }}>Matte White Canvas</div>
      </div>
      <div style={{ padding: 32, borderRadius: 16, border: '1.5px solid #3CA5A1', background: '#EBF6F5' }}>
        <div style={{ fontSize: 44, fontWeight: 800, color: '#3CA5A1' }}>20%</div>
        <div style={{ fontSize: 22, fontWeight: 600, marginTop: 8 }}>Teal Brand Identity</div>
      </div>
      <div style={{ padding: 32, borderRadius: 16, border: '1.5px solid #FF5F7C', background: '#FFF0F3' }}>
        <div style={{ fontSize: 44, fontWeight: 800, color: '#FF5F7C' }}>10%</div>
        <div style={{ fontSize: 22, fontWeight: 600, marginTop: 8 }}>Coral Pink Emphasis</div>
      </div>
    </div>
    <Footer />
  </div>
);

export default [Cover, Content] satisfies Page[];

