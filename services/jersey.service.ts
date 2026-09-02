import { prisma } from "@/libs/prisma";
import { ApiError } from "@/libs/api-error";
import type {
  Jersey,
  JerseyImage,
  JerseyImageInput,
  JerseyInput,
  JerseyPatchInput,
  JerseyWithImages,
  ListJerseysQuery,
  PaginatedJerseys,
} from "@/types/jersey.types";
import { deleteImageKitFile } from "@/libs/imagekit";

type JerseyRow = {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean | null;
  price: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  jersey_images?: Array<{
    url: string;
    is_primary: boolean | null;
  }>;
};

function serializeJersey(row: JerseyRow): Jersey {
  const primary =
    row.jersey_images?.find((image) => image.is_primary) ??
    row.jersey_images?.[0];

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    is_public: row.is_public ?? true,
    price: row.price,
    created_at: row.created_at?.toISOString() ?? new Date().toISOString(),
    updated_at: row.updated_at?.toISOString() ?? null,
    primary_image_url: primary?.url ?? null,
  };
}

export async function listJerseys(query: ListJerseysQuery): Promise<PaginatedJerseys> {
  const { name, priceMin, priceMax, isPublic, orderBy, order, page, limit } = query;

  const price = {
    ...(priceMin !== undefined ? { gte: priceMin } : {}),
    ...(priceMax !== undefined ? { lte: priceMax } : {}),
  };

  const where = {
    ...(name ? { name: { contains: name, mode: "insensitive" as const } } : {}),
    ...(Object.keys(price).length > 0 ? { price } : {}),
    ...(isPublic !== undefined ? { is_public: isPublic } : {}),
  };

  const prismaOrderBy = (() => {
    switch (orderBy) {
      case "name":
        return { name: order };
      case "price":
        return { price: order };
      case "createdAt":
      default:
        return { created_at: order };
    }
  })();

  const [rows, total] = await Promise.all([
    prisma.jerseys.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: prismaOrderBy,
      include: { jersey_images: true },
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

export async function getJerseyPriceRange(): Promise<{
  min: number | null;
  max: number | null;
}> {
  const result = await prisma.jerseys.aggregate({
    where: { is_public: true },
    _min: { price: true },
    _max: { price: true },
  });

  return {
    min: result._min.price ?? null,
    max: result._max.price ?? null,
  };
}

export async function getJersey(id: string): Promise<JerseyWithImages> {
  const row = await prisma.jerseys.findUnique({
    where: { id },
    include: { jersey_images: true },
  });

  if (!row) {
    throw new ApiError({
      title: "Not Found",
      message: "Jersey not found",
      status: 404,
    });
  }

  return {
    ...serializeJersey(row),
    images: row.jersey_images.map(serializeJerseyImage),
  };
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

type JerseyImageRow = {
  id: string;
  id_jersey: string;
  title: string;
  url: string;
  file_id: string | null;
  is_primary: boolean | null;
};

function serializeJerseyImage(row: JerseyImageRow): JerseyImage {
  return {
    id: row.id,
    id_jersey: row.id_jersey,
    title: row.title,
    url: row.url,
    file_id: row.file_id,
    is_primary: row.is_primary ?? false,
  };
}

async function assertJerseyExists(id: string): Promise<void> {
  const existing = await prisma.jerseys.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError({
      title: "Not Found",
      message: "Jersey not found",
      status: 404,
    });
  }
}

function defaultImageTitle(url: string): string {
  try {
    return (
      new URL(url).pathname.split("/").filter(Boolean).pop()?.trim() ?? ""
    );
  } catch {
    return "";
  }
}

export async function listJerseyImages(jerseyId: string): Promise<JerseyImage[]> {
  await assertJerseyExists(jerseyId);

  const rows = await prisma.jersey_images.findMany({
    where: { id_jersey: jerseyId },
  });

  return rows.map(serializeJerseyImage);
}

export async function createJerseyImage(
  jerseyId: string,
  input: JerseyImageInput
): Promise<JerseyImage> {
  await assertJerseyExists(jerseyId);

  if (input.is_primary === true) {
    await prisma.jersey_images.updateMany({
      where: { id_jersey: jerseyId },
      data: { is_primary: false },
    });
  }

  const row = await prisma.jersey_images.create({
    data: {
      id_jersey: jerseyId,
      title: input.title ?? defaultImageTitle(input.url),
      url: input.url,
      file_id: input.file_id ?? null,
      is_primary: input.is_primary ?? false,
    },
  });

  return serializeJerseyImage(row);
}

export async function getJerseyImage(
  jerseyId: string,
  imageId: string
): Promise<JerseyImage> {
  await assertJerseyExists(jerseyId);

  const row = await prisma.jersey_images.findFirst({
    where: { id: imageId, id_jersey: jerseyId },
  });

  if (!row) {
    throw new ApiError({
      title: "Not Found",
      message: "Jersey image not found",
      status: 404,
    });
  }

  return serializeJerseyImage(row);
}

export async function updateJerseyImage(
  jerseyId: string,
  imageId: string,
  input: { title: string }
): Promise<JerseyImage> {
  await assertJerseyExists(jerseyId);

  const row = await prisma.jersey_images.findFirst({
    where: { id: imageId, id_jersey: jerseyId },
  });

  if (!row) {
    throw new ApiError({
      title: "Not Found",
      message: "Jersey image not found",
      status: 404,
    });
  }

  const updated = await prisma.jersey_images.update({
    where: { id: imageId },
    data: { title: input.title },
  });

  return serializeJerseyImage(updated);
}

export async function setPrimaryJerseyImage(
  jerseyId: string,
  imageId: string
): Promise<JerseyImage> {
  await assertJerseyExists(jerseyId);

  const row = await prisma.jersey_images.findFirst({
    where: { id: imageId, id_jersey: jerseyId },
  });

  if (!row) {
    throw new ApiError({
      title: "Not Found",
      message: "Jersey image not found",
      status: 404,
    });
  }

  await prisma.jersey_images.updateMany({
    where: { id_jersey: jerseyId },
    data: { is_primary: false },
  });

  const updated = await prisma.jersey_images.update({
    where: { id: imageId },
    data: { is_primary: true },
  });

  return serializeJerseyImage(updated);
}

export async function deleteJerseyImage(
  jerseyId: string,
  imageId: string
): Promise<void> {
  await assertJerseyExists(jerseyId);

  const row = await prisma.jersey_images.findFirst({
    where: { id: imageId, id_jersey: jerseyId },
  });

  if (!row) {
    throw new ApiError({
      title: "Not Found",
      message: "Jersey image not found",
      status: 404,
    });
  }

  if (row.file_id) {
    try {
      await deleteImageKitFile(row.file_id);
    } catch (error) {
      console.error(`ImageKit cleanup failed for file ${row.file_id}:`, error);
    }
  }

  await prisma.jersey_images.delete({ where: { id: imageId } });
}