/**
 * Validates if a string is a properly formatted Ethereum address
 * @param address The address to validate
 * @returns True if the address is valid, false otherwise
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
 * Validates if a value is a positive number within acceptable bounds
 * @param value The value to validate
 * @param min Optional minimum value (default: 0)
 * @param max Optional maximum value
 * @returns True if the value is valid, false otherwise
 */
export function isValidPositiveNumber(
  value: number | string,
  min: number = 0,
  max?: number
): boolean {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return false;
  }
  
  if (numValue <= min) {
    return false;
  }
  
  if (max !== undefined && numValue > max) {
    return false;
  }
  
  return true;
}