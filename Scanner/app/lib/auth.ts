import { SignJWT, jwtVerify, JWTPayload } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
const ALGORITHM = "HS256";

/**
 * Generate JWT Token
 * @param payload - Data to encode in JWT
 * @returns Signed JWT token
 */
export async function signToken(payload: JWTPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey);
}

/**
 * Verify JWT Token
 * @param token - JWT token to verify
 * @returns Decoded payload or null if invalid
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey, { algorithms: [ALGORITHM] });
    return payload;
  } catch (error) {
    return null;
  }
}
