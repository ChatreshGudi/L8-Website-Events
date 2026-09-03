import React, { useState, useEffect, useRef } from 'react';
import { eventDatabase } from '../data/eventsData';
import { Terminal as TerminalIcon, CornerDownLeft, Copy, Check } from 'lucide-react';

export default function Terminal({
  commandTrigger,
  onOpenModal,
  terminalOutputRef
}) {
  const [history, setHistory] = useState([
    {
      id: 'init-1',
      type: 'system',
      content: (
        <div className="text-blue-400 space-y-1">
          <div>&gt;&gt; LAYER8 SECURITY OPERATIONS KERNEL v4.12.0</div>
          <div>
            &gt;&gt; Type <span className="text-white font-bold">help</span> or click quick-action pills above to query active events &amp; logs.
          </div>
        </div>
      )
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copiedId, setCopiedId] = useState(null);

  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const hasInitializedRef = useRef(false);

  // Auto-scroll to bottom whenever history updates
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  // Initial command execution sequence (runs strictly once)
  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      executeCommand('list');
    }
  }, []);

  // Listen to external command triggers from Quick Command pills or cards
  useEffect(() => {
    if (commandTrigger) {
      executeCommand(commandTrigger);
    }
  }, [commandTrigger]);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const executeCommand = (cmdStr) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    // Add command string to CLI history stack
    setCmdHistory((prev) => [...prev, cmdStr]);
    setHistoryIndex(-1);

    const cmdEntry = {
      id: `cmd-${Date.now()}-${Math.random()}`,
      type: 'command',
      commandText: cmdStr
    };

    let responseContent = null;

    if (cleanCmd === 'help' || cleanCmd === '?') {
      responseContent = (
        <div className="text-blue-400 space-y-2 py-1">
          <div className="font-bold text-white uppercase tracking-wider text-xs">
            AVAILABLE KERNEL COMMANDS:
          </div>
          <div className="pl-3 space-y-1.5 text-gray-300 font-mono text-xs">
            <div>
              • <span className="text-white font-bold">list</span> : Display all active &amp; archived events/workshops.
            </div>
            <div>
              • <span className="text-white font-bold">ctf-2024</span> : Inspect Layer8 CTF 2024 details.
            </div>
            <div>
              • <span className="text-white font-bold">workshop-crypto</span> : Inspect Cryptography Workshop.
            </div>
            <div>
              • <span className="text-white font-bold">zerotrust</span> : Inspect Zero Trust Seminar archive.
            </div>
            <div>
              • <span className="text-white font-bold">buffers</span> : Inspect Buffer Overflow Workshop archive.
            </div>
            <div>
              • <span className="text-white font-bold">web-sec-101</span> : Inspect Web Security OWASP 101 workshop.
            </div>
            <div>
              • <span className="text-white font-bold">whoami</span> : Display operator security credentials.
            </div>
            <div>
              • <span className="text-white font-bold">banner</span> : Render Layer8 ASCII terminal banner.
            </div>
            <div>
              • <span className="text-white font-bold">clear</span> : Clear terminal output log screen.
            </div>
          </div>
        </div>
      );
    } else if (cleanCmd === 'list' || cleanCmd === 'events' || cleanCmd === 'ls') {
      const activeEvents = Object.values(eventDatabase).filter(
        (ev) => ev.status === 'LIVE' || ev.status === 'PENDING'
      );
      const archivedEvents = Object.values(eventDatabase).filter(
        (ev) => ev.status === 'ARCHIVED'
      );

      responseContent = (
        <div className="space-y-4 my-1">
          {/* Active Events */}
          <div>
            <div className="text-blue-400 font-bold font-mono text-xs uppercase tracking-wider mb-2">
              [ACTIVE &amp; UPCOMING OPERATIONS]
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeEvents.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => executeCommand(ev.id)}
                  className="p-3 border border-[#1e293b] rounded bg-[#111722] hover:bg-[#1e293b] cursor-pointer transition-all hover:border-blue-500/50 group"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white font-bold group-hover:text-blue-400 transition-colors">
                      {ev.title}
                    </span>
                    <span className={`${ev.statusColor} font-mono font-bold`}>
                      [{ev.status}]
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 flex justify-between items-center font-mono">
                    <span>DATE: {ev.date}</span>
                    <span className="text-blue-400 text-[11px] opacity-80 group-hover:opacity-100">
                      &gt; Inspect
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Archived Logs */}
          <div>
            <div className="text-blue-400 font-bold font-mono text-xs uppercase tracking-wider mb-2">
              [ARCHIVED MISSION LOGS]
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {archivedEvents.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => executeCommand(ev.id)}
                  className="p-3 border border-[#1e293b] rounded bg-[#111722]/50 hover:bg-[#1e293b] cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white font-bold group-hover:text-blue-300">
                      {ev.title}
                    </span>
                    <span className="text-gray-500 font-mono font-bold">[ARCHIVED]</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 font-mono">
                    EXEC: {ev.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (eventDatabase[cleanCmd]) {
      const ev = eventDatabase[cleanCmd];
      responseContent = (
        <div className="p-4 border border-[#1e293b] rounded bg-[#111722] space-y-3 my-1">
          <div className="flex justify-between items-center border-b border-[#1e293b] pb-2">
            <span className="text-white font-bold text-base font-display">{ev.title}</span>
            <span className={`${ev.statusColor} font-mono font-bold text-xs`}>
              [ STATUS: {ev.status} ]
            </span>
          </div>

          <div className="text-xs text-gray-300 leading-relaxed space-y-1.5 font-mono">
            <div>
              <span className="text-blue-400">&gt; Description:</span> {ev.desc}
            </div>
            <div>
              <span className="text-blue-400">&gt; Venue:</span> {ev.venue}
            </div>
            <div>
              <span className="text-blue-400">&gt; Prerequisites:</span> {ev.prerequisites}
            </div>
            <div>
              <span className="text-blue-400">&gt; Target Flags/Reward:</span> {ev.flags}
            </div>
          </div>

          <div className="pt-3 border-t border-[#1e293b] flex flex-wrap justify-between items-center text-xs font-mono gap-2">
            <span className="text-gray-400">DATE: {ev.date}</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => copyToClipboard(`layer8 inspect ${ev.id}`, ev.id)}
                className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                title="Copy CLI command"
              >
                {copiedId === ev.id ? (
                  <Check className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedId === ev.id ? 'Copied!' : 'Share'}</span>
              </button>
              <button
                onClick={() => onOpenModal(ev)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded transition-colors font-bold text-xs shadow-sm"
              >
                &gt; {ev.actionText}
              </button>
            </div>
          </div>
        </div>
      );
    } else if (cleanCmd === 'clear' || cleanCmd === 'cls') {
      setHistory([]);
      return;
    } else if (cleanCmd === 'whoami') {
      responseContent = (
        <div className="p-3 border border-blue-900/50 bg-[#111722] rounded text-xs font-mono space-y-1 text-gray-300">
          <div><span className="text-blue-400">OPERATOR:</span> student_root@pesu-ec</div>
          <div><span className="text-blue-400">PRIVILEGES:</span> LAYER8_SECURITY_LEVEL_4 [AUTHORIZED]</div>
          <div><span className="text-blue-400">IP ADDRESS:</span> 10.8.0.254 (Encrypted Tunnel)</div>
          <div><span className="text-blue-400">SESSION TOKEN:</span> 0x8F92A1...ACTIVE</div>
        </div>
      );
    } else if (cleanCmd === 'banner') {
      responseContent = (
        <pre className="text-blue-400 font-mono text-[10px] sm:text-xs leading-none py-2 overflow-x-auto">
{`
  ██╗      █████╗ ██╗   ██╗███████╗██████╗  ██████╗ 
  ██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗██╔════╝ 
  ██║     ███████║ ╚████╔╝ █████╗  ██████╔╝███████╗ 
  ██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗██╔═══██╗
  ███████╗██║  ██║   ██║   ███████╗██║  ██║╚██████╔╝
  ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝ ╚═════╝ 
        [ PES UNIVERSITY CYBERSECURITY CLUB ]
`}
        </pre>
      );
    } else {
      responseContent = (
        <div className="text-red-400 text-xs font-mono py-1">
          &gt; command not recognized: "{cmdStr}". Type{' '}
          <button
            onClick={() => executeCommand('help')}
            className="text-white underline hover:text-blue-400 font-bold focus:outline-none"
          >
            help
          </button>{' '}
          for available operations list.
        </div>
      );
    }

    setHistory((prev) => [
      ...prev,
      cmdEntry,
      {
        id: `res-${Date.now()}-${Math.random()}`,
        type: 'response',
        content: responseContent
      }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        executeCommand(inputValue);
        setInputValue('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputValue(cmdHistory[nextIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= cmdHistory.length) {
          setHistoryIndex(-1);
          setInputValue('');
        } else {
          setHistoryIndex(nextIndex);
          setInputValue(cmdHistory[nextIndex] || '');
        }
      }
    }
  };

  return (
    <section className="terminal-window rounded-lg flex flex-col h-[520px] shadow-2xl overflow-hidden relative border border-[#1e293b]">
      {/* Terminal Window Top Header Bar */}
      <div className="terminal-header px-4 py-3 flex justify-between items-center border-b border-[#1e293b]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <div className="flex items-center gap-1.5 ml-3 font-mono text-xs text-gray-400">
            <TerminalIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>layer8 — ~/events</span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-gray-400">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span>SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div
        ref={scrollContainerRef}
        className="p-4 md:p-6 flex flex-col gap-3 grow overflow-y-auto custom-scrollbar font-mono text-sm text-gray-300"
      >
        {history.map((item) => (
          <div key={item.id} className="flex flex-col gap-1">
            {item.type === 'command' && (
              <div className="text-blue-400 font-bold flex items-center gap-1.5">
                <span>$</span>
                <span className="text-white">{item.commandText}</span>
              </div>
            )}
            {item.type !== 'command' && item.content}
          </div>
        ))}
      </div>

      {/* Terminal Input Prompt Bar */}
      <div className="p-3 bg-[#111722] border-t border-[#1e293b] flex items-center gap-2">
        <span className="text-blue-400 font-mono font-bold text-sm select-none">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type a command (e.g., list, ctf-2024, workshop-crypto, help)..."
          className="bg-transparent border-none outline-none text-white font-mono text-xs sm:text-sm w-full focus:ring-0 p-0 placeholder-gray-500"
        />
        <button
          onClick={() => {
            if (inputValue.trim()) {
              executeCommand(inputValue);
              setInputValue('');
            }
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs px-3.5 py-1.5 rounded transition-all flex items-center gap-1 uppercase tracking-wider"
        >
          <span>Execute</span>
          <CornerDownLeft className="w-3 h-3" />
        </button>
      </div>
    </section>
  );
}
