/**
 * Pauses execution for a defined time (in milliseconds)
 * @param ms Time in milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
