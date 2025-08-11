import { customAlphabet } from "nanoid";

export function generateverificationCode() {
  const generateCode = customAlphabet("123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);
  return generateCode();
}
