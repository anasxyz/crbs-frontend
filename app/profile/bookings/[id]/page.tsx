'use client';

import { useEffect, useState, use } from 'react';
import { BookingService, RoomService } from '@/lib/apiServices';
import { Booking, Room } from '@/types/api';
import _loader from '@/components/ui/_loader';
import Link from 'next/link';

export default function BookingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingRes = await BookingService.getById(id);
        const bookingData = bookingRes.data;
        setBooking(bookingData);

        const roomRes = await RoomService.getById(bookingData.roomId);
        setRoom(roomRes.data);
      } catch (err) {
        console.error("Failed to fetch booking details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <_loader text="Fetching Receipt..." />;
  if (!booking || !room) return <div className="text-center py-20 uppercase tracking-widest opacity-30 text-xs">Record not found</div>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <header className="mb-12">
        <Link
          href="/profile/bookings"
          className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity flex items-center mb-4"
        >
          ← Back to bookings
        </Link>
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-3xl font-bold tracking-tighter">Reservation Details</h1>
          <span className={`text-[10px] px-3 py-1 rounded-full border ${booking.status === 'CONFIRMED' ? 'border-green-500/50 text-green-500' : 'border-yellow-500/50 text-yellow-500'
            }`}>
            {booking.status}
          </span>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] opacity-50">Reference: #{booking.bookingId}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* information column */}
        <div className="space-y-4">
          <h2 className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-bold ml-1">Asset Information</h2>
          <div className="p-8 border border-white/30 dark:border-white/10 rounded-2xl space-y-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Room Name</p>
              <p className="text-2xl font-medium uppercase tracking-tight">{room.roomName}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Scheduled Date</p>
              <p className="text-lg font-medium uppercase">{booking.bookingDate}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Location Context</p>
              <p className="text-sm opacity-60">Location ID: {room.locationId}</p>
            </div>
          </div>
        </div>

        {/* financial column */}
        <div className="space-y-4">
          <h2 className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-bold ml-1">Financial Summary</h2>
          <div className="p-8 border border-white/30 dark:border-white/10 rounded-2xl space-y-6 bg-gray-50/50 dark:bg-white/5">
            <div className="flex justify-between">
              <p className="text-[10px] uppercase tracking-widest opacity-40">Base Price</p>
              <p className="text-sm font-medium">£{booking.basePrice?.toFixed(2)}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-[10px] uppercase tracking-widest opacity-40">Operational Surcharge</p>
              <p className="text-sm font-medium">£{booking.operationalCost?.toFixed(2)}</p>
            </div>

            <div className="pt-6 border-t border-black/10 dark:border-white/10 flex justify-between items-end">
              <p className="text-[10px] uppercase tracking-widest font-bold">Total Settled</p>
              <p className="text-4xl font-bold tracking-tighter">£{booking.finalPrice?.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
