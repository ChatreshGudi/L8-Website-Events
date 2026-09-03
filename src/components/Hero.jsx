import React from 'react';

export default function Hero({ onExecuteCommand }) {
  const quickCommands = [
    { label: '> list_events', cmd: 'list' },
    { label: '> inspect_ctf_2024', cmd: 'ctf-2024' },
    { label: '> view_workshops', cmd: 'workshop-crypto' },
    { label: '> help', cmd: 'help' },
    { label: '> whoami', cmd: 'whoami' },
    { label: 'clear', cmd: 'clear', variant: 'muted' }
  ];

  return (
    <section className="flex flex-col gap-6 pt-4">
      {/* Hero Title */}
      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs text-blue-500 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          // scheduled_operations_terminal
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-none tracking-tight text-white">
          Events Terminal
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mt-1">
          Explore Layer8 cybersecurity hackathons, CTF challenges, cryptanalysis workshops, and archived terminal logs. 
          Use quick commands or enter raw CLI queries below.
        </p>
      </div>

      {/* Interactive Quick Command Pills */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider mr-1">
          Quick Commands:
        </span>
        {quickCommands.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onExecuteCommand(item.cmd)}
            className={`font-mono text-xs px-3 py-1.5 rounded border transition-all duration-200 active:scale-95 ${
              item.variant === 'muted'
                ? 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border-[#1e293b] text-gray-400 hover:text-white'
                : 'bg-[#111722] hover:bg-[#1e293b] border-[#1e293b] hover:border-blue-500/50 text-blue-400 hover:text-blue-300 shadow-sm'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}
