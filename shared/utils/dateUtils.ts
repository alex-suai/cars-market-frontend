export const normalizeDate = (value: string | Date | undefined | null): string => {
  if (!value) return '';
  return new Date(value).toISOString().split('T')[0]; // YYYY-MM-DD
};