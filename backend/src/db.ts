import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` to avoid hot-reload instantiations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    // log: ['query', 'error', 'warn'], // enable if needed
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
