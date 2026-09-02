import bcrypt from "bcrypt";
import { prisma } from "@/libs/prisma";
import { ApiError } from "@/libs/api-error";
import { PrismaClientKnownRequestError } from "../prisma/generated/internal/prismaNamespace";
import type { LoginInput, RegisterInput, User } from "@/types/user.types";

const BCRYPT_ROUNDS = 10;

type UserRow = {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  created_at: Date | null;
  updated_at: Date | null;
};

function serializeUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    username: row.username,
    created_at: row.created_at?.toISOString() ?? new Date().toISOString(),
    updated_at: row.updated_at?.toISOString() ?? null,
  };
}

export async function registerUser(input: RegisterInput): Promise<User> {
  const password_hash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);

  let row: UserRow;

  try {
    row = await prisma.users.create({
      data: {
        email: input.email,
        username: input.username,
        password_hash,
      },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      throw new ApiError({
        title: "Conflict",
        message: "A user with this email or username already exists",
        status: 409,
      });
    }

    throw err;
  }

  return serializeUser(row);
}

export async function loginUser(input: LoginInput): Promise<User> {
  const row = await prisma.users.findUnique({
    where: { email: input.email },
  });

  if (!row) {
    throw new ApiError({
      title: "Unauthorized",
      message: "No account found for this email",
      status: 401,
    });
  }

  const passwordMatches = await bcrypt.compare(input.password, row.password_hash);

  if (!passwordMatches) {
    throw new ApiError({
      title: "Unauthorized",
      message: "Incorrect password",
      status: 401,
    });
  }

  return serializeUser(row);
}

export async function getUserById(id: string): Promise<User> {
  const row = await prisma.users.findUnique({ where: { id } });

  if (!row) {
    throw new ApiError({
      title: "Unauthorized",
      message: "Invalid session",
      status: 401,
    });
  }

  return serializeUser(row);
}

export async function listUsers(): Promise<User[]> {
  const rows = await prisma.users.findMany();

  return rows.map(serializeUser);
}

export async function deleteUser(id: string): Promise<void> {
  await prisma.$transaction(async (tx) => {
    const existing = await tx.users.findUnique({ where: { id } });

    if (!existing) {
      throw new ApiError({
        title: "Not Found",
        message: "User not found",
        status: 404,
      });
    }

    const total = await tx.users.count();

    if (total <= 1) {
      throw new ApiError({
        title: "Conflict",
        message: "Cannot delete the last remaining user",
        status: 409,
      });
    }

    await tx.users.delete({ where: { id } });
  });
}