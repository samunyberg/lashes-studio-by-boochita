import { AppointmentWithData } from '@/components/account/MyAppointments';
import { format } from 'date-fns';

export function formatDate(
  date: Date,
  locale: string,
  options?: Intl.DateTimeFormatOptions
) {
  return new Date(date).toLocaleDateString(locale, options);
}

export function formatTime(date: Date, locale: string) {
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
