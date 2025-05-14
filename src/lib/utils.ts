import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges multiple class name values into a single string, resolving Tailwind CSS class conflicts.
 *
 * Accepts any combination of strings, arrays, or objects as class values, conditionally joining them and ensuring Tailwind CSS classes are merged without conflicts.
 *
 * @param inputs - Class values to combine and merge.
 * @returns A single string of merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}