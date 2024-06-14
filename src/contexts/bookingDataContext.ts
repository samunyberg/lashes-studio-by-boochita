import { BookingData } from '@/components/booking/BookingForm';
import React, { Dispatch, SetStateAction } from 'react';

interface BookingDataContextType {
  bookingData: BookingData;
  setBookingData: Dispatch<SetStateAction<BookingData>>;
  bookingError: string;
}

const BookingDataContext = React.createContext<BookingDataContextType>(
  {} as BookingDataContextType
);

export default BookingDataContext;
