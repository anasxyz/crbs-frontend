'use client';

import { useEffect, useState, use } from 'react';
import { RoomService } from '@/lib/apiServices';
import { Room } from '@/types/api';
import Link from 'next/link';
import _loader from '@/components/ui/_loader';

export default function LocationRoomsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await RoomService.getByLocationId(id);
        setRooms(res.data);
      } catch (err) {
        console.error("Failed to fetch rooms", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [id]);

  if (loading) return <_loader text="Initializing Sector..." />;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <header className="mb-12">
        <Link
          href="/locations"
          className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity flex items-center mb-4"
        >
          ← Back to locations
        </Link>
        <h1 className="text-3xl font-bold tracking-tighter pb-2">Available Rooms</h1>
        <p className="text-xs uppercase tracking-[0.2em] opacity-50">Location ID: {id}</p>
      </header>

      <div className="flex flex-col">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <Link
              key={room.roomId}
              href={`/locations/${id}/rooms/${room.roomId}`}
              className="group flex items-center justify-between py-6 border border-white/30 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors px-6 rounded-xl mb-2"
            >
              <div className="space-y-1">
                <h2 className="text-lg font-medium tracking-tight group-hover:translate-x-1 transition-transform uppercase">
                  {room.roomName}
                </h2>
                <div className="flex gap-4 group-hover:translate-x-1 transition-transform">
                  <p className="text-[10px] uppercase tracking-widest opacity-40">
                    Capacity: {room.capacity}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest opacity-40">
                    Base Price: £{room.basePrice}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 pr-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-500 dark:text-gray-400">
                  Book Now
                </span>
                <span className="text-xl">→</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-20 text-center border border-dashed border-white/20 rounded-xl">
            <p className="text-xs uppercase tracking-widest opacity-30">No rooms registered for this location</p>
          </div>
        )}
      </div>
    </div>
  );
}
