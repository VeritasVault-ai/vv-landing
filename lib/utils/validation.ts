/**
 * Checks whether a string is a valid Ethereum address.
 *
 * An address is considered valid if it is a non-empty string that starts with "0x" followed by exactly 40 hexadecimal characters.
 *
 * @param address - The string to validate as an Ethereum address.
 * @returns `true` if {@link address} is a properly formatted Ethereum address; otherwise, `false`.
 */
export function isValidEthereumAddress(address: string): boolean {
  // Basic validation: Ethereum addresses are 42 characters long and start with '0x'
  if (!address || typeof address !== 'string') {
    return false;
  }
  
  // Check format with regex
  // This checks for:
  // - Starts with 0x
  // - Followed by 40 hex characters (case insensitive)
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Determines whether a value represents a positive number greater than a specified minimum and, optionally, less than or equal to a maximum.
 *
 * Accepts numbers or numeric strings. Returns `false` if the value is not a finite number, is less than or equal to {@link min}, or exceeds {@link max} (if provided). Also returns `false` if {@link max} is defined and less than {@link min}.
 *
 * @param value - The number or numeric string to validate.
 * @param min - The exclusive lower bound (default is 0).
 * @param max - The inclusive upper bound (optional).
 * @returns `true` if the value is a valid positive number within the specified bounds; otherwise, `false`.
 */
export function isValidPositiveNumber(
  value: number | string,
  min: number = 0,
  max?: number
): boolean {
  // Check if max is defined and less than min
  if (max !== undefined && max < min) {
    return false;
  }
  
  // For string values, ensure the entire string is a valid number
  if (typeof value === 'string') {
    // Check if the string is a valid number format with no trailing characters
    if (!/^-?\d*\.?\d+$/.test(value)) {
    return false;
  }
    value = parseFloat(value);
  }
  
  // Check if the value is a number
  if (typeof value !== 'number' || isNaN(value)) {
    return false;
}
  
  // Reject Infinity and -Infinity
  if (!Number.isFinite(value)) {
    return false;
  }
  
  // Check minimum bound
  if (value <= min) {
    return false;
  }
  
  // Check maximum bound if provided
  if (max !== undefined && value > max) {
    return false;
  }
  
  return true;
}