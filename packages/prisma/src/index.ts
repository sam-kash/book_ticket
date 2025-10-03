import { PrismaClient } from "@prisma/client/extension";
import { Prisma } from "../generated/prisma";

export const client = new PrismaClient()  