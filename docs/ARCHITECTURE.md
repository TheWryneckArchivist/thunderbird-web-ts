# Thunderbird Web Architecture

- Next.js + TypeScript player portal and marketing site.
- Browser communicates via gRPC-Web through Envoy.
- Contracts come from `@thunderbird/contracts` generated from protobuf source of truth.
- Auth and session data are fetched from ASP.NET gRPC backend.
