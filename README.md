# Fastasys

This project consists of a .NET Aspire orchestration app, a .NET ApiService backend, and an Angular frontend.

## Prerequisites & Environment Setup

Before running the application, make sure your development environment has all required tools installed (.NET SDK 10.0, Docker/OrbStack, Node.js, npm).

You can run the environment check script to verify your setup and install missing frontend packages automatically:

  ```bash
  ./setup.sh
  ```

## How to Run the Project

### Running the entire project with .NET Aspire

To start the Aspire dashboard and launch all services (including the MySQL database, API service, and Angular frontend):

```powershell
dotnet run --project Fastasys.AppHost
```

Once running, open the Aspire Dashboard URL outputted in the terminal to view, monitor, and access the services.

---

## 🌐 Quick Reference: Project URLs & API Documentation

When the application is running (via Aspire or standalone), the following endpoints and documentation dashboards are available:

| Interface / Service | Primary URL (HTTP) | Secure URL (HTTPS) | Description |
| --- | --- | --- | --- |
| 🟪 **Scalar API Reference** | [http://localhost:5363/scalar/v1](http://localhost:5363/scalar/v1) | [https://localhost:7408/scalar/v1](https://localhost:7408/scalar/v1) | **Modern interactive API documentation & testing sandbox** (Supports JWT authorization) |
| 🟩 **Classic Swagger UI** | [http://localhost:5363/swagger](http://localhost:5363/swagger) | [https://localhost:7408/swagger](https://localhost:7408/swagger) | Traditional Swagger UI API catalog |
| 💻 **Angular Frontend** | [http://localhost:4200/](http://localhost:4200/) | N/A | Angular standalone single page application |
| 🛢️ **phpMyAdmin** | Dynamic (via Aspire Dashboard) | Dynamic | MySQL database administration tool |

---

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
npm run start
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

- **Start development server:** `npm run start`
- **Build application:** `npm run build`
- **Build for production:** `npm run build:prod`
- **Lint code:** `npm run lint`
- **Fix lint issues:** `npm run lint:fix`
- **Run tests:** `npm run test`
- **Format code:** `npm run format`
