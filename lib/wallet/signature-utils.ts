import { ethers } from "ethers";

/**
 * Verifies that a wallet signature is valid.
 * 
 * @param walletAddress The wallet address that supposedly signed the message
 * @param message The original message that was signed
 * @param signature The signature to verify
 * @returns True if the signature is valid for the given address, false otherwise
 */
export async function verifyWalletSignature(
  walletAddress: string,
  message: string,
  signature: string
): Promise<boolean> {
  try {
    // Normalize the wallet address
    const normalizedAddress = ethers.getAddress(walletAddress);
    
    // Recover the address from the signature
    const messageBytes = ethers.toUtf8Bytes(message);
    const recoveredAddress = ethers.recoverAddress(ethers.hashMessage(messageBytes), signature);
    
    // Check if the recovered address matches the provided address
    return normalizedAddress.toLowerCase() === recoveredAddress.toLowerCase();
  } catch (error) {
    console.error("Error verifying wallet signature:", error);
    return false;
  }
}

/**
 * Creates a standard message for wallet authentication.
 * 
 * @param nonce A unique nonce to prevent replay attacks
 * @param origin The site origin
 * @returns A formatted message for the user to sign
 */
export function createWalletAuthMessage(nonce: string, origin: string): string {
  const timestamp = Math.floor(Date.now() / 1000);
  return `Sign this message to authenticate with VeritasVault.net.\n\nNonce: ${nonce}\nTimestamp: ${timestamp}\nOrigin: ${origin}\n\nThis signature will not trigger any blockchain transactions or incur gas fees.`;
}

/**
 * Generates a secure nonce for authentication.
 * 
 * @returns A random nonce
 */
export function generateNonce(): string {
  return crypto.randomUUID();
}