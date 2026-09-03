import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Terminal from './components/Terminal';
import EventsExplorer from './components/EventsExplorer';
import EventModal from './components/EventModal';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('events');
  const [commandTrigger, setCommandTrigger] = useState(null);
  const [selectedModalEvent, setSelectedModalEvent] = useState(null);

  const terminalRef = useRef(null);

  const handleExecuteCommand = (cmd) => {
    // Send command to Terminal component
    setCommandTrigger(cmd);

    // Smooth scroll to terminal window
    if (terminalRef.current) {
      terminalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleOpenModal = (event) => {
    setSelectedModalEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedModalEvent(null);
  };

  return (
    <div className="bg-[#080b11] text-gray-200 min-h-screen relative font-body overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* Background Cyber Visual Overlays */}
      <div className="fixed inset-0 grid-bg z-[-2] pointer-events-none"></div>
      <div className="fixed inset-0 scanline z-[-1] pointer-events-none"></div>
      <div className="fixed inset-0 vignette z-[-1] pointer-events-none"></div>

      {/* Top App Bar Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Container */}
      <main className="pt-24 pb-16 max-w-[1160px] mx-auto px-4 md:px-8 flex flex-col gap-12 min-h-[calc(100vh-200px)]">
        {activeTab === 'events' ? (
          <>
            {/* Hero Section */}
            <Hero onExecuteCommand={handleExecuteCommand} />

            {/* Interactive Terminal Emulator Section */}
            <div ref={terminalRef}>
              <Terminal
                commandTrigger={commandTrigger}
                onOpenModal={handleOpenModal}
              />
            </div>

            {/* Filterable Events Catalog Section */}
            <EventsExplorer
              onExecuteCommand={handleExecuteCommand}
              onOpenModal={handleOpenModal}
            />
          </>
        ) : (
          /* Placeholder View for other pages */
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 border border-[#1e293b] rounded-lg bg-[#0c1017] p-8 my-8 font-mono">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg">
              8
            </div>
            <h2 className="text-2xl font-bold font-display text-white uppercase">
              {activeTab.replace(/([A-Z])/g, ' $1')} Section
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-md">
              Target sector telemetry undergoing data synchronization. Switch to <span className="text-blue-400 font-bold">EVENTS</span> to query active terminal operations.
            </p>
            <button
              onClick={() => setActiveTab('events')}
              className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs px-4 py-2 rounded transition-colors"
            >
              &gt; Return to Events Terminal
            </button>
          </div>
        )}
      </main>

      {/* Detail / Registration Modal */}
      <EventModal event={selectedModalEvent} onClose={handleCloseModal} />

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
