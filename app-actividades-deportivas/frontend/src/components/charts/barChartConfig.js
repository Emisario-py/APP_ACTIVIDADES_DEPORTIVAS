export const barChartData = [
  { year: 2024, month: 'diciembre', day: 30, time: 58 },
  { year: 2024, month: 'diciembre', day: 31, time: 42 },
  { year: 2024, month: 'enero', day: 1, time: 35 },
  { year: 2025, month: 'enero', day: 2, time: 51 },
  { year: 2025, month: 'enero', day: 3, time: 39 },
  { year: 2025, month: 'enero', day: 4, time: 54 },
  { year: 2025, month: 'enero', day: 5, time: 32 },
  { year: 2025, month: 'agosto', day: 6, time: 47 },
  { year: 2025, month: 'agosto', day: 7, time: 41 },
  { year: 2025, month: 'agosto', day: 8, time: 59 },
  { year: 2025, month: 'septiembre', day: 9, time: 38 },
  { year: 2025, month: 'octubre', day: 10, time: 45 },
]

export const monthsWithDays = [
  {
    month: 'enero',
    days: Array.from({ length: 31 }, (_, i) => i + 1),
  },
  {
    month: 'febrero',
    days: Array.from({ length: 29 }, (_, i) => i + 1),
    bis: true,
  },
  {
    month: 'febrero',
    days: Array.from({ length: 28 }, (_, i) => i + 1),
    bis: false,
  },
  {
    month: 'marzo',
    days: Array.from({ length: 31 }, (_, i) => i + 1),
  },
  {
    month: 'abril',
    days: Array.from({ length: 30 }, (_, i) => i + 1),
  },
  {
    month: 'mayo',
    days: Array.from({ length: 31 }, (_, i) => i + 1),
  },
  {
    month: 'junio',
    days: Array.from({ length: 30 }, (_, i) => i + 1),
  },
  {
    month: 'julio',
    days: Array.from({ length: 31 }, (_, i) => i + 1),
  },
  {
    month: 'agosto',
    days: Array.from({ length: 31 }, (_, i) => i + 1),
  },
  {
    month: 'septiembre',
    days: Array.from({ length: 30 }, (_, i) => i + 1),
  },
  {
    month: 'octubre',
    days: Array.from({ length: 31 }, (_, i) => i + 1),
  },
  {
    month: 'noviembre',
    days: Array.from({ length: 30 }, (_, i) => i + 1),
  },
  {
    month: 'diciembre',
    days: Array.from({ length: 31 }, (_, i) => i + 1),
  },
]
