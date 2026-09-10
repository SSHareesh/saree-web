/**
 * Security & Obfuscation Utilities
 *
 * Keeps sensitive phone numbers and contact details encrypted so that
 * raw numbers never appear in plaintext in GitHub repositories.
 */

const CIPHER_KEY = 42;

/**
 * Decrypts a base64 XOR-obfuscated string
 */
export function decryptSecret(encryptedBase64: string, key: number = CIPHER_KEY): string {
  try {
    if (!encryptedBase64) return '';

    let decoded = '';
    if (typeof globalThis !== 'undefined' && typeof globalThis.atob === 'function') {
      decoded = globalThis.atob(encryptedBase64);
    } else {
      // Safe fallback for non-browser runtimes
      const globalObj = globalThis as unknown as { Buffer?: { from: (str: string, enc: string) => { toString: (enc: string) => string } } };
      if (globalObj.Buffer) {
        decoded = globalObj.Buffer.from(encryptedBase64, 'base64').toString('binary');
      }
    }

    return decoded
      .split('')
      .map((char) => String.fromCharCode(char.charCodeAt(0) ^ key))
      .join('');
  } catch {
    return '';
  }
}

/**
 * Encrypts a plaintext string into a base64 XOR-obfuscated string
 */
export function encryptSecret(plainText: string, key: number = CIPHER_KEY): string {
  try {
    if (!plainText) return '';

    const xorString = plainText
      .split('')
      .map((char) => String.fromCharCode(char.charCodeAt(0) ^ key))
      .join('');

    if (typeof globalThis !== 'undefined' && typeof globalThis.btoa === 'function') {
      return globalThis.btoa(xorString);
    }

    const globalObj = globalThis as unknown as { Buffer?: { from: (str: string, enc: string) => { toString: (enc: string) => string } } };
    if (globalObj.Buffer) {
      return globalObj.Buffer.from(xorString, 'binary').toString('base64');
    }

    return '';
  } catch {
    return '';
  }
}
