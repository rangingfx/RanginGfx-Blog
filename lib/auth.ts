import { SignJWT, jwtVerify } from 'jose';

export const COOKIE_NAME = 'admin_token';

// Secret key for JWT signing - must be at least 32 bytes for HS256
const getSecretKey = () => {
  const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_rangin_2026_dev_min_32_chars';
  return new TextEncoder().encode(secret);
};

export const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'Rangin@123';

/**
 * Creates a signed JWT with 7-day expiration
 */
export async function createToken(payload: { role: string; [key: string]: unknown } = { role: 'admin' }): Promise<string> {
  const secretKey = getSecretKey();
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);
}

/**
 * Verifies JWT token and returns payload if valid, or null if invalid/expired
 */
export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    if (!token) return null;
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify(token, secretKey);
    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}
