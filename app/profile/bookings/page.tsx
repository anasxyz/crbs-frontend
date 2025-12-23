'use client';

import { useEffect, useState } from 'react';
import { BookingService } from '@/lib/apiServices';
import { Booking } from '@/types/api';
import { useAuth } from '@/context/AuthProvider';
import Link from 'next/link';
import _loader from '@/components/ui/_loader';

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.userId) return;
      try {
        const res = await BookingService.getByUserId(user.userId);
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user?.userId]);

  if (loading) return <_loader text="Retrieving Records..." />;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <header className="mb-12">
        <Link
          href="/profile"
          className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity flex items-center mb-4"
        >
          ← Back to profile
        </Link>
        <h1 className="text-3xl font-bold tracking-tighter pb-2">My Bookings</h1>
        <p className="text-xs uppercase tracking-[0.2em] opacity-50">Manage your bookings</p>
      </header>

      <div className="flex flex-col">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Link
              key={booking.bookingId}
              href={`/profile/bookings/${booking.bookingId}`}
              className="group flex items-center justify-between py-6 border border-white/30 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors px-6 rounded-xl mb-2"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-medium tracking-tight group-hover:translate-x-1 transition-transform uppercase">
                    Booking #{booking.bookingId.toString().slice(-4)}
                  </h2>
                  <span className={`text-[8px] px-2 py-0.5 rounded-full border transition-transform group-hover:translate-x-1 ${booking.status === 'CONFIRMED'
                      ? 'border-green-500/50 text-green-500'
                      : 'border-yellow-500/50 text-yellow-500'
                    }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="flex gap-4 group-hover:translate-x-1 transition-transform">
                  <p className="text-[10px] uppercase tracking-widest opacity-40">
                    Date: {booking.bookingDate}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">
                    Paid: £{booking.finalPrice?.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xl opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-20 text-center border border-dashed border-white/20 rounded-xl">
            <p className="text-xs uppercase tracking-widest opacity-30 mb-4">No bookings found</p>
            <Link href="/locations" className="text-[10px] underline uppercase tracking-widest opacity-60 hover:opacity-100">
              Browse Locations
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
