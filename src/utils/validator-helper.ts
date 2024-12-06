import { randomUUID } from "crypto";

export const errorMessage = (field: string): string => `${field} is required`;
export const invalidMessage = (field: string): string => `invalid ${field}`;

export function generateRandomUUID():string{
    return randomUUID()
}