import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
  req: any; // HTTP request carrying the `Authorization` header
}

const prisma = new PrismaClient();

export const context = (req: any): Context => ({
  ...req,
  prisma: prisma,
});
