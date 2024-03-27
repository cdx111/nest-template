/**@param ms millisecond  */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
