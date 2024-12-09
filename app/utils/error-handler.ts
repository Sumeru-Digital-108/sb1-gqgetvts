export function handleError(error: Error, context: string): void {
  console.error(`Error in ${context}:`, error);
  // Add error reporting service integration here
}