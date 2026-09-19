# PostgreSQL infrastructure

The application database schema is managed by EF Core migrations in the API project. Add files here only when PostgreSQL itself needs a versioned bootstrap concern that does not belong to the application schema, for example an approved extension or operational role setup.
