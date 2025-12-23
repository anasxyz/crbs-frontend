'use client';

import { useEffect, useState } from 'react';
import { LocationService } from '@/lib/apiServices';
import { Location } from '@/types/api';
import Link from 'next/link';
import _loader from '@/components/ui/_loader';

export default function BrowseLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await LocationService.getAll();
        setLocations(res.data);
      } catch (err) {
        console.error("Failed to fetch locations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  if (loading) return <_loader />;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tighter pb-2">Locations</h1>
        <p className="text-xs uppercase tracking-[0.2em] opacity-50">Select a site to view available rooms</p>
      </header>

      <div className="flex flex-col border-white/30 dark:border-white/30">
        {locations.map((loc) => (
          <Link
            key={loc.locationId}
            href={`/locations/${loc.locationId}`}
            className="group flex items-center justify-between py-6 border border-white/30 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors px-2 rounded-xl mb-2"
          >
            <div className="pl-3 space-y-1">
              <h2 className="text-lg font-medium tracking-tight group-hover:translate-x-1 transition-transform">
                {loc.name}
              </h2>
              <p className="text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform opacity-40">
                {loc.city || 'NO CITY PROVIDED'}
              </p>
            </div>
            <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity pr-4">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
