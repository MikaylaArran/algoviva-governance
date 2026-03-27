import { useState, useEffect } from 'react';
import Header from './components/Header';
import Overview from './sections/Overview';
import RegMap from './sections/RegMap';
import BuildTrack from './sections/BuildTrack';
import Library from './sections/Library';
import IntelFeed from './sections/IntelFeed';

export default function App() {
  const [section, setSection] = useState('overview');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sections = {
    overview:   <Overview onNav={setSection} isMobile={isMobile} />,
    map:        <RegMap onNav={setSection} isMobile={isMobile} />,
    buildtrack: <BuildTrack isMobile={isMobile} />,
    library:    <Library isMobile={isMobile} />,
    intel:      <IntelFeed isMobile={isMobile} />,
  };

  return (
    <div>
      <Header activeSection={section} onNav={setSection} />
      <main style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: isMobile ? '16px' : '32px',
      }}>
        <div key={section} className="fade-in">
          {sections[section]}
        </div>
      </main>
    </div>
  );
}