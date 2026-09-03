import React from 'react';
import { Terminal, Github, Linkedin, Instagram, Mail, MessageSquare } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const pages = [
    { name: 'Blogs', id: 'blogs' },
    { name: 'Weekly CTFs', id: 'ctfs' },
    { name: 'Events', id: 'events' },
    { name: 'Resources', id: 'resources' },
    { name: 'Projects', id: 'projects' },
    { name: 'Core', id: 'core' },
    { name: 'Domains', id: 'domains' },
    { name: 'Legacy/Alumni', id: 'alumni' },
    { name: 'Hall of Fame', id: 'halloffame' }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Discord', icon: MessageSquare, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:layer8@pes.edu' }
  ];

  return (
    <footer className="w-full py-12 border-t border-[#1e293b] bg-[#080b11] text-gray-400 font-body mt-16">
      <div className="max-w-[1160px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Column 1: Brand & PES Partner Chip */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img
              alt="Logo White"
              className="h-6 w-auto mix-blend-screen opacity-90"
              src="/Logo_White.png"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="flex items-center gap-1.5">
              {/* <Terminal className="w-4 h-4 text-blue-500" /> */}
              <span className="font-display text-xl font-bold tracking-tighter text-white">
                LAYER8
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-body">
            Cybersecurity Club · PES University, Electronic City Campus, Bengaluru. Offense, defense, and a lot of capture the flag.
          </p>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              PART OF
            </span>
            <div className="bg-[rgba(255,255,255,0.03)] px-4 py-2 rounded-full border border-[#1e293b] w-max flex items-center gap-2">
              <img
                alt="PES University Logo"
                className="h-6 w-auto object-contain mix-blend-screen opacity-90"
                src="/PES_Logo.png"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {/* <span className="font-mono text-xs text-gray-300 font-semibold">
                PES UNIVERSITY
              </span> */}
            </div>
          </div>
        </div>

        {/* Column 2: Pages Links */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs text-white uppercase tracking-widest font-semibold">
            PAGES
          </span>
          <div className="grid grid-cols-1 gap-2 text-xs">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setActiveTab(p.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-gray-300 hover:text-blue-400 transition-colors font-mono"
              >
                &gt; {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Column 3: Elsewhere / Socials */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs text-white uppercase tracking-widest font-semibold">
            ELSEWHERE
          </span>
          <div className="grid grid-cols-1 gap-2.5 text-xs font-mono">
            {socialLinks.map((item) => {
              const IconComp = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <IconComp className="w-3.5 h-3.5 text-blue-500" />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-[1160px] mx-auto px-4 md:px-8 mt-12 pt-6 border-t border-[#1e293b] flex flex-col md:flex-row justify-between items-center text-xs font-mono text-gray-500 gap-4">
        <span>© 2026 Layer8 · built in the 8th layer</span>
        <span className="text-[11px] text-gray-600">
          PES University EC Campus · All Rights Reserved
        </span>
      </div>
    </footer>
  );
}
