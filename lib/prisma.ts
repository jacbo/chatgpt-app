import { PrismaClient } from "@/generated/client";
import { PrismaLibSql } from "@prisma/adapter-libsql"

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL as string
});

const prismaClientSingleton = () => {
    return new PrismaClient({
        adapter
    });
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClientSingleton | undefined }

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma