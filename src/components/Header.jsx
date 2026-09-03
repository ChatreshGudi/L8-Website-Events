import React, { useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'BLOGS', id: 'blogs' },
    { name: 'WEEKLY CTFS', id: 'ctfs' },
    { name: 'EVENTS', id: 'events' },
    { name: 'RESOURCES', id: 'resources' },
    { name: 'PROJECTS', id: 'projects' },
    { name: 'CORE', id: 'core' },
    { name: 'DOMAINS', id: 'domains' },
    { name: 'LEGACY/ALUMNI', id: 'alumni' },
    { name: 'HALL OF FAME', id: 'halloffame' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#080b11]/90 backdrop-blur-md border-b border-[#1e293b] transition-all">
      <div className="max-w-[1160px] mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        {/* Brand Header */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('events')}>
          <img
            alt="Layer8 Logo"
            className="h-8 w-auto object-contain transition-transform hover:scale-105"
            src="/Logo_White.png"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="flex items-center gap-2">
            {/* <Terminal className="w-5 h-5 text-blue-500" /> */}
            <span className="font-display text-2xl font-bold tracking-tighter text-white">
              Layer8
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id || (link.id === 'events' && activeTab === 'events');
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`font-mono text-xs uppercase tracking-widest transition-colors duration-200 relative py-1 ${
                  isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_8px_#3b82f6] transition-all duration-300" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-gray-300 hover:text-white focus:outline-none p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c1017] border-b border-[#1e293b] px-6 py-4 flex flex-col gap-3 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left font-mono text-xs uppercase tracking-widest py-2 border-b border-[#1e293b]/50 ${
                  isActive ? 'text-blue-400 font-bold pl-2 border-l-2 border-blue-500' : 'text-gray-300 hover:text-white'
                }`}
              >
                &gt; {link.name}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
