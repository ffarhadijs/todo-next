import { verify } from "jsonwebtoken";

export default function verifyToken(token: string, secretKey: string) {
  if (!token) {
    return false;
  }
  const result = verify(token!, secretKey!) as any;
  return result;
}
