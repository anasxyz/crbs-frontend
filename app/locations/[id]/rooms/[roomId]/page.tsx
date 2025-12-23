'use client';

import { useEffect, useState, use } from 'react';
import { RoomService, BookingService, WeatherService } from '@/lib/apiServices';
import { Room } from '@/types/api';
import { useAuth } from '@/context/AuthProvider';
import _button from '@/components/ui/_button';
import _loader from '@/components/ui/_loader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BookingPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const { user } = useAuth();
  const router = useRouter();

  const [room, setRoom] = useState<Room | null>(null);
  const [date, setDate] = useState('');
  const [forecastTemp, setForecastTemp] = useState<number | null>(null);
  const [additionalCharge, setAdditionalCharge] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await RoomService.getById(roomId);
        setRoom(res.data);
      } catch (err) {
        console.error("Failed to fetch room details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomId]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!date || !room?.locationId) return;

      try {
        const res = await WeatherService.getForecast({
          locationId: room.locationId,
          date
        });
        const temp = res.data.forecastedTemperatureC;
        console.log(temp);
        setForecastTemp(Number(temp));
        calculatePricing(Number(temp));
      } catch (err) {
        console.error("Weather service unavailable", err);
        setForecastTemp(null);
        setAdditionalCharge(0);
      }
    };
    fetchWeather();
  }, [date, room?.locationId]);

  const calculatePricing = (temp: number) => {
    const diff = Math.abs(temp - 21);
    let percentage = 0;

    if (diff >= 20) percentage = 0.5;
    else if (diff >= 10) percentage = 0.3;
    else if (diff >= 5) percentage = 0.2;
    else if (diff >= 2) percentage = 0.1;

    setAdditionalCharge(percentage);
  };

  const finalPrice = room ? room.basePrice * (1 + additionalCharge) : 0;

  const handleBooking = async () => {
    if (!date || !room || !user) return;
    setIsSubmitting(true);
    try {
      await BookingService.create({
        roomId: room.roomId,
        userId: user.userId,
        bookingDate: date,
        status: 'BOOKED',
        basePrice: room.basePrice,
        operationalCost: room.basePrice * additionalCharge,
        finalPrice: finalPrice
      });
      router.push('/profile/bookings');
    } catch (err) { console.error(err); }
    finally { setIsSubmitting(false); }
  };

  if (loading) return <_loader text="Syncing Systems..." />;
  if (!room) return <div className="text-center py-20 uppercase tracking-widest opacity-30 text-xs">Room not found</div>;

  return (
    <>
      {isSubmitting && <_loader text="Processing Reservation..." />}

      <div className="max-w-5xl mx-auto py-12 px-6">
        <header className="mb-12">
          <Link href={`/locations/${room.locationId}`} className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity flex items-center mb-4">
            ← Back to rooms
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter pb-2">Confirm Booking</h1>
          <p className="text-xs uppercase tracking-[0.2em] opacity-50">Reservation for {room.roomName}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* summary column */}
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-bold ml-1">Summary</h2>
            <div className="p-8 border border-white/30 dark:border-white/10 rounded-2xl space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Base Price</p>
                  <p className="text-2xl font-medium">£{room.basePrice}</p>
                </div>
                {forecastTemp !== null && (
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1 font-bold">Forecast</p>
                    <p className="text-sm font-medium uppercase">{forecastTemp}°C</p>
                  </div>
                )}
              </div>

              {forecastTemp !== null && (
                <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p className="text-[10px] uppercase tracking-widest text-blue-400">Temperature Difference</p>
                    <p className="text-[10px] font-bold text-blue-400">{forecastTemp - 21}°C</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[10px] uppercase tracking-widest text-blue-400">Climate Adjustment Fee</p>
                    <p className="text-[10px] font-bold text-blue-400">+{additionalCharge * 100}%</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Total Estimate</p>
                <p className="text-4xl font-bold tracking-tighter">£{finalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* configuration column */}
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-bold ml-1">Configuration</h2>
            <div className="space-y-2">
              <div className="group flex flex-col py-4 border border-white/30 dark:border-white/10 px-6 rounded-xl transition-colors focus-within:border-black dark:focus-within:border-white/30">
                <label className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Selection Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-transparent outline-none text-lg font-medium tracking-tight uppercase cursor-pointer"
                />
              </div>

              <div className="group flex flex-col py-4 border border-white/30 dark:border-white/10 px-6 rounded-xl opacity-60">
                <label className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Booking Identity</label>
                <p className="text-lg font-medium tracking-tight uppercase">{user?.username}</p>
              </div>

              <div className="pt-6">
                <_button
                  text="Confirm Reservation"
                  className="w-full py-4 rounded-xl text-xs uppercase tracking-[0.2em]"
                  onClick={handleBooking}
                  disabled={!date || isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
