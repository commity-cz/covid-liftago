export function parseIsoDate(dateString: string): Date | null {
  return dateString ? new Date(dateString) : null;
}
