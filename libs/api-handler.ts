import { NextRequest } from "next/server";
import { ApiError } from "./api-error";

export type RouteContext = { params: Promise<Record<string, string>> };

export type RouteHandler = (
  req: NextRequest,
  ctx: RouteContext
) => Promise<Response> | Response;

export function handler(fn: RouteHandler) {
  return async (req: NextRequest, ctx: RouteContext): Promise<Response> => {
    try {
      return await fn(req, ctx);
    } catch (err) {
      
      console.error(err);

      if (err instanceof ApiError) {
        return Response.json(
          {
            title: err.title,
            message: err.message,
            origin: err.origin ?? req.nextUrl.pathname,
            status: err.status,
          },
          { status: err.status }
        );
      }

      return Response.json(
        {
          title: "Internal Server Error",
          message: "Something went wrong",
          origin: req.nextUrl.pathname,
          status: 500,
        },
        { status: 500 }
      );
    }
  };
}