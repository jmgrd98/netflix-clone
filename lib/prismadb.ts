import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client/wasm';

const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prismadb = client;

export default client;