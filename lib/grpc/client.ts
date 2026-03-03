import { grpc } from "@improbable-eng/grpc-web";

const DEFAULT_GRPC_WEB_BASE = process.env.NEXT_PUBLIC_GRPC_WEB_BASE_URL ?? "http://localhost:8080";

export interface GrpcWebTransportOptions {
  baseUrl?: string;
  metadata?: Record<string, string>;
}

export function getGrpcWebBaseUrl(): string {
  return DEFAULT_GRPC_WEB_BASE;
}

export function withGrpcWebDefaults(options?: GrpcWebTransportOptions): Required<GrpcWebTransportOptions> {
  return {
    baseUrl: options?.baseUrl ?? DEFAULT_GRPC_WEB_BASE,
    metadata: options?.metadata ?? {},
  };
}

export { grpc };
