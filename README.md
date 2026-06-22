# Fastasys

This project consists of a .NET Aspire orchestration app, a .NET ApiService backend, and an Angular frontend.

## How to Run the Project

### Running the entire project with .NET Aspire

To start the Aspire dashboard and launch all services (including the MySQL database, API service, and Angular frontend):

```powershell
dotnet run --project Fastasys.AppHost
```

Once running, open the Aspire Dashboard URL outputted in the terminal to view, monitor, and access the services.

### Running individual components

#### Backend API Service

To run the backend API service directly:

```powershell
dotnet run --project Fastasys.ApiService
```

#### Angular Frontend

To run the frontend service directly (outside Aspire):

```powershell
cd frontend
npm start
```

This runs the development server on `http://localhost:4200/`.

---

## How to Update the Project

### Updating Backend (.NET)

Restore dependencies and rebuild:

```powershell
dotnet restore
dotnet build
```

### Updating Frontend (Angular)

Install new npm packages or update existing ones:

```powershell
cd frontend
npm install
```

---

## Frontend Scripts (in `frontend` directory)

Run these commands from the `frontend` folder:

- **Start development server:** `npm start`
- **Build application:** `npm run build`
- **Build for production:** `npm run build:prod`
- **Lint code:** `npm run lint`
- **Fix lint issues:** `npm run lint:fix`
- **Run tests:** `npm test`
- **Format code:** `npm run format`
