import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle, ShieldAlert, Terminal, Send } from 'lucide-react';

export default function EventModal({ event, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    emailOrSrn: '',
    teamName: '',
    prereqsChecked: false
  });
  const [submitted, setSubmitted] = useState(false);

  if (!event) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.emailOrSrn) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0c1017] border border-[#1e293b] rounded-xl w-full max-w-xl shadow-2xl overflow-hidden relative">
        {/* Modal Top Bar */}
        <div className="bg-[#111722] border-b border-[#1e293b] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-blue-400">
            <Terminal className="w-4 h-4" />
            <span>OPERATIONS LOG // {event.id.toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex justify-between items-start gap-3">
              <h3 className="font-display text-2xl font-bold text-white">
                {event.title}
              </h3>
              <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded border ${
                event.status === 'LIVE'
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : event.status === 'PENDING'
                  ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                  : 'bg-gray-500/10 border-gray-500/30 text-gray-400'
              }`}>
                [{event.status}]
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-body">
              {event.desc}
            </p>
          </div>

          {/* Details Metadata */}
          <div className="bg-[#111722] border border-[#1e293b] rounded-lg p-4 font-mono text-xs space-y-2 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400">DATE:</span>
              <span className="text-white">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400">VENUE:</span>
              <span className="text-white">{event.venue}</span>
            </div>
            <div className="flex items-start gap-2 pt-1 border-t border-[#1e293b]/60">
              <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-400">PREREQUISITES: </span>
                <span className="text-gray-200">{event.prerequisites}</span>
              </div>
            </div>
          </div>

          {/* Registration Form / Archived Notice */}
          {event.status === 'ARCHIVED' ? (
            <div className="p-4 border border-dashed border-[#1e293b] rounded-lg text-center space-y-2 bg-[#111722]/40">
              <CheckCircle className="w-8 h-8 text-gray-500 mx-auto" />
              <p className="font-mono text-xs text-gray-400">
                This operation has concluded. Presentation slides and challenge Writeups are available in the Layer8 GitHub archives.
              </p>
            </div>
          ) : submitted ? (
            <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-center space-y-3 font-mono">
              <CheckCircle className="w-10 h-10 text-green-400 mx-auto" />
              <h4 className="text-base font-bold text-white">ACCESS GRANTED // REGISTRATION CONFIRMED</h4>
              <p className="text-xs text-gray-300">
                Operator <span className="text-green-400 font-bold">{formData.name}</span> registered for {event.title}. 
                Confirmation telemetry dispatched to <span className="text-green-400">{formData.emailOrSrn}</span>.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="border-t border-[#1e293b] pt-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-blue-400" />
                  <span>Operator Registration Form</span>
                </h4>

                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-400 mb-1">FULL NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#111722] border border-[#1e293b] rounded p-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">PESU EMAIL / SRN *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. PES2UG24CS000@pesu.pes.edu"
                      value={formData.emailOrSrn}
                      onChange={(e) => setFormData({ ...formData, emailOrSrn: e.target.value })}
                      className="w-full bg-[#111722] border border-[#1e293b] rounded p-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {event.category === 'CTF' && (
                    <div>
                      <label className="block text-gray-400 mb-1">TEAM NAME (OPTIONAL)</label>
                      <input
                        type="text"
                        placeholder="e.g. 0xByteBusters"
                        value={formData.teamName}
                        onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                        className="w-full bg-[#111722] border border-[#1e293b] rounded p-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  )}

                  <label className="flex items-center gap-2 text-gray-400 pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.prereqsChecked}
                      onChange={(e) => setFormData({ ...formData, prereqsChecked: e.target.checked })}
                      className="rounded border-[#1e293b] bg-[#111722] text-blue-600 focus:ring-0"
                    />
                    <span>I confirm I meet the prerequisite system/skill requirements.</span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md shadow-blue-600/20"
                >
                  Submit Registration
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
