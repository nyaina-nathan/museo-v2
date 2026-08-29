import { NextRequest } from "next/server";
import { ApiError } from "@/libs/api-error";
import type {
  JerseyInput,
  JerseyPatchInput,
  ListJerseysQuery,
} from "@/types/jersey.types";

async function parseJsonBody(req: NextRequest): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    throw new ApiError({
      title: "Bad Request",
      message: "Request body must be valid JSON",
      status: 400,
    });
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertRecord(body: unknown): Record<string, unknown> {
  if (!isRecord(body)) {
    throw new ApiError({
      title: "Validation Error",
      message: "Request body must be a JSON object",
      status: 422,
      details: { body: "expected an object" },
    });
  }

  return body;
}

function validateName(value: unknown): string {
  if (typeof value !== "string" || value.length < 1) {
    throw new ApiError({
      title: "Validation Error",
      message: "Invalid 'name' field",
      status: 422,
      details: { name: "must be a non-empty string" },
    });
  }

  return value;
}

function validateDescription(value: unknown): string | null {
  if (value !== null && typeof value !== "string") {
    throw new ApiError({
      title: "Validation Error",
      message: "Invalid 'description' field",
      status: 422,
      details: { description: "must be a string or null" },
    });
  }

  return value as string | null;
}

function validateIsPublic(value: unknown): boolean {
  if (typeof value !== "boolean") {
    throw new ApiError({
      title: "Validation Error",
      message: "Invalid 'is_public' field",
      status: 422,
      details: { is_public: "must be a boolean" },
    });
  }

  return value;
}

function validatePrice(value: unknown): number | null {
  if (value === null) {
    return null;
  }

  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    throw new ApiError({
      title: "Validation Error",
      message: "Invalid 'price' field",
      status: 422,
      details: { price: "must be an integer greater than or equal to 1, or null" },
    });
  }

  return value;
}

export async function validateCreateJerseyInput(req: NextRequest): Promise<JerseyInput> {
  const body = assertRecord(await parseJsonBody(req));

  if (body.name === undefined) {
    throw new ApiError({
      title: "Validation Error",
      message: "Missing required field: 'name'",
      status: 422,
      details: { name: "required" },
    });
  }

  const input: JerseyInput = {
    name: validateName(body.name),
  };

  if (body.description !== undefined) {
    input.description = validateDescription(body.description);
  }

  if (body.is_public !== undefined) {
    input.is_public = validateIsPublic(body.is_public);
  }

  if (body.price !== undefined) {
    input.price = validatePrice(body.price);
  }

  return input;
}

export async function validatePatchJerseyInput(req: NextRequest): Promise<JerseyPatchInput> {
  const body = assertRecord(await parseJsonBody(req));

  const patch: JerseyPatchInput = {};

  if (body.name !== undefined) {
    patch.name = validateName(body.name);
  }

  if (body.description !== undefined) {
    patch.description = validateDescription(body.description);
  }

  if (body.is_public !== undefined) {
    patch.is_public = validateIsPublic(body.is_public);
  }

  if (body.price !== undefined) {
    patch.price = validatePrice(body.price);
  }

  if (Object.keys(patch).length === 0) {
    throw new ApiError({
      title: "Validation Error",
      message: "Request body must contain at least one field to update",
      status: 422,
      details: { body: "at least one of 'name', 'description', 'is_public', 'price' is required" },
    });
  }

  return patch;
}

function parsePositiveInt(value: string, name: string): number {
  if (!/^\d+$/.test(value)) {
    throw new ApiError({
      title: "Validation Error",
      message: `Invalid '${name}' parameter`,
      status: 422,
      details: { [name]: "must be a positive integer" },
    });
  }

  const parsed = Number(value);

  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    throw new ApiError({
      title: "Validation Error",
      message: `Invalid '${name}' parameter`,
      status: 422,
      details: { [name]: "must be a positive integer" },
    });
  }

  return parsed;
}

export function validateListJerseyQuery(req: NextRequest): ListJerseysQuery {
  const { searchParams } = req.nextUrl;

  const query: ListJerseysQuery = {
    page: 1,
    limit: 20,
  };

  const name = searchParams.get("name");
  if (name !== null) {
    query.name = name;
  }

  const priceMin = searchParams.get("priceMin");
  if (priceMin !== null) {
    query.priceMin = parsePositiveInt(priceMin, "priceMin");
  }

  const priceMax = searchParams.get("priceMax");
  if (priceMax !== null) {
    query.priceMax = parsePositiveInt(priceMax, "priceMax");
  }

  const isPublic = searchParams.get("isPublic");
  if (isPublic !== null) {
    if (isPublic !== "true" && isPublic !== "false") {
      throw new ApiError({
        title: "Validation Error",
        message: "Invalid 'isPublic' parameter",
        status: 422,
        details: { isPublic: 'must be "true" or "false"' },
      });
    }
    query.isPublic = isPublic === "true";
  }

  const page = searchParams.get("page");
  if (page !== null) {
    query.page = parsePositiveInt(page, "page");
  }

  const limit = searchParams.get("limit");
  if (limit !== null) {
    const parsed = parsePositiveInt(limit, "limit");
    if (parsed > 100) {
      throw new ApiError({
        title: "Validation Error",
        message: "Invalid 'limit' parameter",
        status: 422,
        details: { limit: "must be less than or equal to 100" },
      });
    }
    query.limit = parsed;
  }

  return query;
}