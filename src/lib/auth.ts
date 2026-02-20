import { JWTPayload } from 'jose';
import { verifyToken as verifyTokenFromJwt } from './jwt';

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  return verifyTokenFromJwt(token);
}
