import { useState } from 'react';
import Header from './components/Header';
import Overview from './sections/Overview';
import RegMap from './sections/RegMap';
import BuildTrack from './sections/BuildTrack';
import Library from './sections/Library';
import IntelFeed from './sections/IntelFeed';

export default function App() {
  const [section, setSection] = useState('overview');

  const sections = {
    overview:   <Overview onNav={setSection} />,
    map:        <RegMap onNav={setSection} />,
    buildtrack: <BuildTrack />,
    library:    <Library />,
    intel:      <IntelFeed />,
  };

  return (
    <div>
      <Header activeSection={section} onNav={setSection} />
      <main style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: 'clamp(16px, 4vw, 32px)',
      }}>
        <div key={section} className="fade-in">
          {sections[section]}
        </div>
      </main>
    </div>
  );
}