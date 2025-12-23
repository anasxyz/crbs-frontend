'use client';

import React from 'react';
import Link from 'next/link';
import _button from '@/components/ui/_button';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="max-w-5xl mx-auto px-8 pt-32 pb-20">
        <section className="mb-24">
          <h1 className="text-6xl md:text-8xl font-medium tracking-tighter mb-8 leading-[0.9]">
            Reserve with <br />
            <span className="text-gray-400 italic">precision.</span>
          </h1>
          <p className="max-w-md text-lg leading-relaxed opacity-50 uppercase text-[10px] tracking-[0.3em]">
            Better meetings, <br /> better temperatures.
          </p>
        </section>

        <div className="max-w-md">
          <Link
            href="/locations"
            className="group flex items-center justify-between py-8 border border-white/30 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all px-8 rounded-2xl"
          >
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 group-hover:translate-x-1 transition-transform">
                Available locations
              </p>
              <h2 className="text-2xl font-medium tracking-tight group-hover:translate-x-1 transition-transform uppercase">
                Browse Locations
              </h2>
            </div>
            <span className="text-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
              →
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
