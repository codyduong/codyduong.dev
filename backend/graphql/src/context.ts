import type { ContextFunction } from '@apollo/server';
import type { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import { PrismaClient } from '@prisma/client';
import type express from 'express';

export interface Context {
  prisma: PrismaClient;
  req: express.Request;
}

const prisma = new PrismaClient();

export const context: ContextFunction<
  [ExpressContextFunctionArgument],
  Context
> = async (args) => ({
  ...args,
  prisma: prisma,
});
