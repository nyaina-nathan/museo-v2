import { NextRequest } from "next/server";
import { ApiError } from "@/libs/api-error";
import type { LoginInput, RegisterInput } from "@/types/user.types";

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

function validateEmail(value: unknown): string {
  if (typeof value !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new ApiError({
      title: "Validation Error",
      message: "Invalid 'email' field",
      status: 422,
      details: { email: "must be a valid email address" },
    });
  }

  return value;
}

function validateUsername(value: unknown): string {
  if (
    typeof value !== "string" ||
    value.length < 1 ||
    value.length > 100
  ) {
    throw new ApiError({
      title: "Validation Error",
      message: "Invalid 'username' field",
      status: 422,
      details: { username: "must be a string of length between 1 and 100" },
    });
  }

  return value;
}

function validatePassword(value: unknown): string {
  if (typeof value !== "string") {
    throw new ApiError({
      title: "Validation Error",
      message: "Invalid 'password' field",
      status: 422,
      details: { password: "must be a string" },
    });
  }

  return value;
}

function validateRegisterPassword(value: unknown): string {
  if (typeof value !== "string" || value.length < 8) {
    throw new ApiError({
      title: "Validation Error",
      message: "Invalid 'password' field",
      status: 422,
      details: { password: "must be a string of at least 8 characters" },
    });
  }

  return value;
}

export async function validateRegisterInput(req: NextRequest): Promise<RegisterInput> {
  const body = assertRecord(await parseJsonBody(req));

  const required: (keyof RegisterInput)[] = ["email", "username", "password"];

  for (const field of required) {
    if (body[field] === undefined) {
      throw new ApiError({
        title: "Validation Error",
        message: `Missing required field: '${field}'`,
        status: 422,
        details: { [field]: "required" },
      });
    }
  }

  return {
    email: validateEmail(body.email),
    username: validateUsername(body.username),
    password: validateRegisterPassword(body.password),
  };
}

export async function validateLoginInput(req: NextRequest): Promise<LoginInput> {
  const body = assertRecord(await parseJsonBody(req));

  const required: (keyof LoginInput)[] = ["email", "password"];

  for (const field of required) {
    if (body[field] === undefined) {
      throw new ApiError({
        title: "Validation Error",
        message: `Missing required field: '${field}'`,
        status: 422,
        details: { [field]: "required" },
      });
    }
  }

  return {
    email: validateEmail(body.email),
    password: validatePassword(body.password),
  };
}