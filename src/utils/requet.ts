import { FastifyRequest } from "fastify";

export function getParams<T>(request: FastifyRequest): T {
  return request.params as T;
};

export function getIdFromRequest(request: FastifyRequest): string {
  return getParams<{id: string}>(request).id;
};
