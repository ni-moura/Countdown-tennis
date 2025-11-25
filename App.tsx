import React, { useState, useEffect } from 'react';
import { calculateTimeLeft, calculateProgress } from './utils/timeUtils';
import { TARGET_DATE_ISO, START_DATE_ISO } from './constants';
import { TimeLeft } from './types';
import CountdownTimer from './components/CountdownTimer';
import TennisTree from './components/TennisTree';
import Snowfall from './components/Snowfall';

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(TARGET_DATE_ISO));
  const [progress, setProgress] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Initial calculation
    setProgress(calculateProgress(START_DATE_ISO, TARGET_DATE_ISO));
    
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft(TARGET_DATE_ISO);
      setTimeLeft(remaining);
      setProgress(calculateProgress(START_DATE_ISO, TARGET_DATE_ISO));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isClient) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-tennis-green/20 to-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Elements */}
      <Snowfall />
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-tennis-court/20 to-transparent pointer-events-none" />
      
      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
        
        {/* Header */}
        <header className="text-center space-y-2 mb-8 relative z-30">
          <h1 className="text-5xl md:text-7xl font-festive text-white drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]">
            Match Point <span className="text-tennis-yellow">Christmas</span>
          </h1>
          <p className="text-slate-300 font-mono text-sm md:text-base tracking-widest uppercase bg-slate-900/50 inline-block px-4 py-1 rounded-full backdrop-blur-sm border border-white/10">
            Dec 19, 2025 &bull; 19:00 BRT
          </p>
        </header>

        {/* Visualization Stack */}
        <div className="relative w-full flex flex-col items-center justify-center">
          
          {/* The Tree (Background of the counter) */}
          <div className="relative z-10 scale-100 md:scale-110 origin-bottom transform transition-transform duration-700">
            <TennisTree progress={progress} />
          </div>

          {/* The Digital Timer (Overlaid at the bottom) */}
          <div className="relative z-20 -mt-16 sm:-mt-24 w-full">
            <CountdownTimer timeLeft={timeLeft} />
          </div>

        </div>
        
        {/* Footer/Message */}
        <footer className="mt-12 text-center max-w-2xl text-slate-400 font-light relative z-20">
          <p className="drop-shadow-md">
            The court is set, the tree is growing. 
            <br className="hidden sm:block"/>
            Wait for the final serve on December 19th!
          </p>
        </footer>

      </main>
    </div>
  );
};

export default App;