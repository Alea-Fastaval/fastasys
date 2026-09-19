# Infrastructure

This directory holds version-controlled configuration for runtime dependencies, not their persisted data.

- `postgres/` is reserved for PostgreSQL server bootstrap concerns that EF Core does not own, such as roles or required extensions.
- Application schema changes belong in `backend/src/Fastasys.ApiService/Data/Migrations/` and are managed with EF Core.
- Keycloak configuration will be added here only when the realm, clients, and roles have been defined.

Do not commit credentials, database dumps, or Docker volume data.
