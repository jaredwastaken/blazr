'use server';

import {
  randomBytes,
  createCipheriv,
  scryptSync,
  createDecipheriv,
} from 'crypto';

const password = process.env.ENCRYPTION_KEY || 'SECRET_KEY';

export async function encrypt(input: string) {
  try {
    const algorithm = 'aes-256-ctr';
    const salt = randomBytes(16); // Generate a random salt
    const key = scryptSync(password, salt, 32); // Derive a 32-byte key
    const iv = randomBytes(16);
    const cipher = createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(input), cipher.final()]);

    // Concatenate salt, IV, and encrypted data
    const encryptedString = Buffer.concat([salt, iv, encrypted]).toString(
      'hex'
    );

    return encryptedString;
  } catch (error) {
    console.error('Encryption failed:', error);
    throw error;
  }
}

export async function decrypt(encryptedString: string) {
  try {
    const algorithm = 'aes-256-ctr';
    const data = Buffer.from(encryptedString, 'hex');
    const salt = data.slice(0, 16); // Extract salt from the beginning of the data
    const iv = data.slice(16, 32); // Extract IV from the data
    const encrypted = data.slice(32); // Extract encrypted data

    // Derive the key from the password and salt
    const key = scryptSync(password, salt, 32);

    const decipher = createDecipheriv(algorithm, key, iv);

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return decrypted.toString();
  } catch (error) {
    console.error('Decryption failed:', error);
    throw error;
  }
}
