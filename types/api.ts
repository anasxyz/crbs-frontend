export interface User {
  userId: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER' | string;
}

export interface Booking {
  bookingId: string;
  userId: string;
  roomId: string;
  bookingDate: string;
  basePrice: number;
  operationalCost: number;
  finalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | string;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  locationId: string;
  roomId: string;
  roomName: string;
  capacity: number;
  basePrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  locationId: string;
  name: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

export interface Weather {
  // TODO: add weather data
  locationId: string;
  date: string;
  forecastedTemperatureC: number;
}
