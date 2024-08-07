import { AppointmentWithData } from '@/lib/types';
import { format } from 'date-fns';

export function formatDate(
  date: Date,
  locale: string,
  options?: Intl.DateTimeFormatOptions
) {
  return new Date(date).toLocaleDateString(locale, options);
}

export function formatDSTAdjustedTime(date: Date, locale: string) {
  const adjustedDate = adjustForDST(new Date(date));
  return adjustedDate.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function groupAppointmentsByMonth(appointments: AppointmentWithData[]) {
  const groupedAppointments: Record<string, AppointmentWithData[]> = {};
  appointments.forEach((app) => {
    const month = format(app.dateTime, 'yyyy-MM');
    if (!groupedAppointments[month]) groupedAppointments[month] = [];
    groupedAppointments[month].push(app);
  });

  return groupedAppointments;
}

function isDST(date: Date) {
  return date.getTimezoneOffset() === -180;
}

function adjustForDST(date: Date) {
  const dstOffset = 3 * 60;
  const standardOffset = 2 * 60;
  const offsetDifference = dstOffset - standardOffset;

  if (!isDST(date)) {
    date.setMinutes(date.getMinutes() + offsetDifference);
  }

  return date;
}

export function formatTimeAgo(date: Date) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  let interval = Math.floor(seconds / 31_536_000);

  if (interval >= 1) {
    return interval === 1 ? '1 year ago' : `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2_592_000);
  if (interval >= 1) {
    return interval === 1 ? '1 month ago' : `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86_400);
  if (interval >= 1) {
    return interval === 1 ? '1 day ago' : `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3_600);
  if (interval >= 1) {
    return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
  }
  return 'just now';
}

export function isBookedLessThanOneHourAgo(time: Date) {
  return new Date().getTime() - new Date(time).getTime() <= 60 * 60 * 1000;
}

export function startsInLessThanOneHour(time: Date) {
  const currentTime = new Date();
  const oneHourInMS = 3_600_000;
  return new Date(time).getTime() - currentTime.getTime() < oneHourInMS;
}

export function getFirstAndLastDateOfMonth(year: number, month: number) {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);
  return { firstDate, lastDate };
}
