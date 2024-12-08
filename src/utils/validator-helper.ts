import { randomUUID } from "crypto";
import { ParsedQs } from "qs";
import { string } from "zod";
export const errorMessage = (field: string): string => `${field} is required`;
export const invalidMessage = (field: string): string => `invalid ${field}`;

export function generateRandomUUID(): string {
  return randomUUID();
}
type IQuery = string | string[] | ParsedQs | ParsedQs[] | undefined;

export function extractPageNumber(query: IQuery): number {
  if (typeof query !== "string") {
    return 1;
  }
  const pageNumber = parseInt(query, 10);
  return pageNumber < 1 || isNaN(pageNumber) ? 1 : pageNumber;
}

export const extractSearch = (query: IQuery): string =>
  typeof query == "string" ? query : "";

export const calculateSkip = (pageNumber: number, limit: number): number =>
  (pageNumber - 1) * limit;

export const calculateTotalPage = (totalCount: number, limit: number) =>
  Math.ceil(totalCount / limit);
