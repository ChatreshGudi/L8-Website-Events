import React, { useState } from 'react';
import { eventDatabase } from '../data/eventsData';
import { Search, Filter, Calendar, MapPin, Flag, ChevronRight } from 'lucide-react';

export default function EventsExplorer({ onExecuteCommand, onOpenModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'LIVE', 'WORKSHOPS', 'CTF', 'SEMINARS', 'ARCHIVED'];

  const allEvents = Object.values(eventDatabase);

  const filteredEvents = allEvents.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedCategory === 'ALL') return matchesSearch;
    if (selectedCategory === 'LIVE') return matchesSearch && ev.status === 'LIVE';
    if (selectedCategory === 'WORKSHOPS') return matchesSearch && ev.category === 'Workshop';
    if (selectedCategory === 'CTF') return matchesSearch && ev.category === 'CTF';
    if (selectedCategory === 'SEMINARS') return matchesSearch && ev.category === 'Seminar';
    if (selectedCategory === 'ARCHIVED') return matchesSearch && ev.status === 'ARCHIVED';

    return matchesSearch;
  });

  return (
    <section className="flex flex-col gap-6 pt-6 border-t border-[#1e293b]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
            <span>Operations &amp; Events Catalog</span>
            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
              {filteredEvents.length} RECORD(S)
            </span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Browse through active hackathons, workshops, and archived mission logs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, tags, dates..."
            className="w-full bg-[#111722] border border-[#1e293b] rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-gray-500 mr-1 flex-shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-blue-600 border-blue-500 text-white font-bold shadow-md shadow-blue-500/20'
                : 'bg-[#111722] border-[#1e293b] text-gray-400 hover:text-white hover:border-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full p-8 text-center border border-dashed border-[#1e293b] rounded-lg bg-[#0c1017]">
            <p className="font-mono text-sm text-gray-400">
              No operations or events match your filter query.
            </p>
          </div>
        ) : (
          filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-[#0c1017] border border-[#1e293b] rounded-lg p-5 flex flex-col justify-between hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/5 group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="font-display font-semibold text-base text-white group-hover:text-blue-400 transition-colors leading-snug">
                    {ev.title}
                  </span>
                  <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                    ev.status === 'LIVE'
                      ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : ev.status === 'PENDING'
                      ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                      : 'bg-gray-500/10 border-gray-500/30 text-gray-400'
                  }`}>
                    {ev.status}
                  </span>
                </div>

                <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed font-body">
                  {ev.desc}
                </p>

                <div className="space-y-1.5 pt-1 text-xs text-gray-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span className="truncate">{ev.venue}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {ev.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] bg-[#111722] border border-[#1e293b] text-gray-400 px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-[#1e293b] flex items-center justify-between gap-2">
                <button
                  onClick={() => onExecuteCommand(ev.id)}
                  className="font-mono text-xs text-blue-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>CLI Inspect</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenModal(ev)}
                  className="font-mono text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded transition-all font-bold"
                >
                  &gt; {ev.actionText}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
