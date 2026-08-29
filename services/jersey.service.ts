import { prisma } from "@/libs/prisma";
import { ApiError } from "@/libs/api-error";
import type {
  Jersey,
  JerseyInput,
  JerseyPatchInput,
  ListJerseysQuery,
  PaginatedJerseys,
} from "@/types/jersey.types";

type JerseyRow = {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean | null;
  price: number | null;
  created_at: Date | null;
  updated_at: Date | null;
};

function serializeJersey(row: JerseyRow): Jersey {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    is_public: row.is_public ?? true,
    price: row.price,
    created_at: row.created_at?.toISOString() ?? new Date().toISOString(),
    updated_at: row.updated_at?.toISOString() ?? null,
  };
}

export async function listJerseys(query: ListJerseysQuery): Promise<PaginatedJerseys> {
  const { name, priceMin, priceMax, isPublic, page, limit } = query;

  const price = {
    ...(priceMin !== undefined ? { gte: priceMin } : {}),
    ...(priceMax !== undefined ? { lte: priceMax } : {}),
  };

  const where = {
    ...(name ? { name: { contains: name, mode: "insensitive" as const } } : {}),
    ...(Object.keys(price).length > 0 ? { price } : {}),
    ...(isPublic !== undefined ? { is_public: isPublic } : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.jerseys.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.jerseys.count({ where }),
  ]);

  return {
    data: rows.map(serializeJersey),
    page,
    limit,
    total,
  };
}

export async function getJersey(id: string): Promise<Jersey> {
  const row = await prisma.jerseys.findUnique({ where: { id } });

  if (!row) {
    throw new ApiError({
      title: "Not Found",
      message: "Jersey not found",
      status: 404,
    });
  }

  return serializeJersey(row);
}

export async function createJersey(input: JerseyInput): Promise<Jersey> {
  const row = await prisma.jerseys.create({
    data: {
      name: input.name,
      description: input.description ?? null,
      is_public: input.is_public ?? true,
      price: input.price ?? null,
    },
  });

  return serializeJersey(row);
}

export async function updateJersey(id: string, patch: JerseyPatchInput): Promise<Jersey> {
  const existing = await prisma.jerseys.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError({
      title: "Not Found",
      message: "Jersey not found",
      status: 404,
    });
  }

  const row = await prisma.jerseys.update({
    where: { id },
    data: {
      ...(patch.name !== undefined ? { name: patch.name } : {}),
      ...(patch.description !== undefined ? { description: patch.description } : {}),
      ...(patch.is_public !== undefined ? { is_public: patch.is_public } : {}),
      ...(patch.price !== undefined ? { price: patch.price } : {}),
      updated_at: new Date(),
    },
  });

  return serializeJersey(row);
}

export async function deleteJersey(id: string): Promise<void> {
  const existing = await prisma.jerseys.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError({
      title: "Not Found",
      message: "Jersey not found",
      status: 404,
    });
  }

  await prisma.jerseys.delete({ where: { id } });
}