"use client";

import React, { useState } from 'react';

import _button from '@/components/ui/_button';
import _navbar from '@/components/ui/_navbar';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="max-w-5xl mx-auto px-8 pt-32 pb-20">
        <h1 className="text-6xl md:text-8xl font-medium tracking-tighter mb-8">
          Design with <br />
          <span className="text-gray-400 italic">intention.</span>
        </h1>
        <p className="max-w-md text-lg leading-relaxed opacity-70">
          A minimalist starter template for Next.js projects.
        </p>
      </main>
    </div>
  );
}
