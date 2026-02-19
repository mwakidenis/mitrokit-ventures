import { JWTPayload } from 'jose';

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  // Your token verification logic here
}
