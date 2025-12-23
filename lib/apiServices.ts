import api from '@/lib/api';
import { Booking, Room, User, Location, Weather } from '@/types/api';

/**
 * booking service
 */
export const BookingService = {
  getAll: () => api.get<Booking[]>('/booking/all'),
  getById: (id: string) => api.get<Booking>(`/booking/${id}`),
  getByUserId: (userId: string) => api.get<Booking[]>(`/booking/user/${userId}`),
  create: (data: Partial<Booking>) => api.post<Booking>('/booking/new', data),
  update: (id: string, data: Partial<Booking>) => api.patch<Booking>(`/booking/${id}`, data),
  cancel: (id: string) => api.delete(`/booking/${id}`),
};

/**
 * user service
 */
export const UserService = {
  getProfile: (userId: string) => api.get<User>(`/user/${userId}`),
  updateProfile: (data: Partial<User>) => api.patch<User>('/user/profile', data),
  getSettings: () => api.get<any>('/user/settings'),
  updateSettings: (data: any) => api.patch<any>('/user/settings', data),
};

/**
 * location service
 */
export const LocationService = {
  getAll: () => api.get<Location[]>('location/all'),
  getById: (id: string) => api.get<Location>(`/location/${id}`),
  create: (data: Partial<Location>) => api.post<Location>('/location', data),
  update: (id: string, data: Partial<Location>) => api.patch<Location>(`/location/${id}`, data),
  delete: (id: string) => api.delete(`/location/${id}`),
};

/**
 * room service
 */
export const RoomService = {
  getAll: () => api.get<Room[]>('/room'),
  getById: (id: string) => api.get<Room>(`/room/${id}`),
  getByLocationId: (locationId: string) => api.get<Room[]>(`/location/${locationId}/rooms`),
  getAvailability: (roomId: string, date: string) =>
    api.get<any>(`/room/${roomId}/availability?date=${date}`),
  create: (data: Partial<Room>) => api.post<Room>('/room', data),
  update: (id: string, data: Partial<Room>) => api.patch<Room>(`/room/${id}`, data),
  delete: (id: string) => api.delete(`/room/${id}`),
};

/**
 * weather service
 */
export const WeatherService = {
  getForecast: (data: any) => api.post<Weather>(`/weather`, data),
};
