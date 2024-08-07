// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const populateAppointments = async () => {
  const today = new Date();
  const threeMonthsFromToday = new Date(
    today.getTime() + 60 * 24 * 60 * 60 * 1000
  ); // Three months from today

  for (
    let date = new Date();
    date <= threeMonthsFromToday;
    date.setDate(date.getDate() + 1)
  ) {
    if (date.getDay() === 0 || date.getDay() === 6) {
      continue;
    } else {
      const fixedTimes = ['09:30', '13:00', '16:30'];
      for (const time of fixedTimes) {
        const ISODateTime = new Date(
          `${date.toISOString().split('T')[0]}T${time}`
        );
        await prisma.appointment.create({
          data: {
            dateTime: ISODateTime,
            status: 'AVAILABLE',
          },
        });
      }
    }
  }

  await prisma.$disconnect();
};

populateAppointments();
