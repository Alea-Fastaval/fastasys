# Fastasys

A modern mono-repo application with a .NET backend and Angular frontend.

## Project Structure

```
fastasys/
├── backend/                    # .NET 9 Backend
│   ├── Fastasys.Api/          # Web API project
│   ├── Fastasys.Api.Tests/    # Test project with Shouldly
│   └── Fastasys.sln           # Solution file
├── frontend/                   # Frontend applications
│   └── fastasys-app/          # Angular 20.3 application with Vitest
├── .vscode/                    # VS Code settings (if needed)
├── fastasys.code-workspace    # VS Code workspace file
└── README.md                   # This file
```

## Technology Stack

### Backend
- **.NET 9.0**: Latest stable .NET version
- **ASP.NET Core Web API**: RESTful API framework
- **xUnit**: Testing framework
- **Shouldly**: Assertion library for more readable tests

### Frontend
- **Angular 20.3.9**: Latest Angular framework
- **TypeScript 5.9**: Static typing for JavaScript
- **SCSS**: Stylesheet preprocessor
- **Vitest**: Fast unit test framework
- **RxJS**: Reactive programming library

## Getting Started

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0) or later
- [Node.js 20+](https://nodejs.org/) and npm
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)

### Opening the Project

1. Open the workspace file in VS Code:
   ```bash
   code fastasys.code-workspace
   ```

2. Install recommended VS Code extensions when prompted.

### Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

#### Build the backend:
```bash
dotnet build
```

#### Run tests:
```bash
dotnet test
```

#### Run the API:
```bash
cd Fastasys.Api
dotnet run
```

The API will be available at `https://localhost:5001` (HTTPS) and `http://localhost:5000` (HTTP).

### Frontend Setup

Navigate to the frontend application directory:

```bash
cd frontend/fastasys-app
```

#### Install dependencies:
```bash
npm install
```

#### Run the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`.

#### Build for production:
```bash
npm run build
```

#### Run tests:
```bash
npm test
```

#### Run tests in watch mode:
```bash
npm run test:watch
```

## Development Workflow

### VS Code Tasks

The workspace includes pre-configured tasks accessible via `Ctrl+Shift+B` (Windows/Linux) or `Cmd+Shift+B` (Mac):

- **Build All**: Builds both backend and frontend
- **Test All**: Runs tests for both backend and frontend
- **Build Backend**: Builds the .NET solution
- **Test Backend**: Runs .NET tests
- **Build Frontend**: Builds the Angular application
- **Test Frontend**: Runs Vitest tests
- **Start Frontend Dev Server**: Starts the Angular dev server

### Testing

#### Backend Testing
The backend uses **xUnit** with **Shouldly** for more expressive assertions:

```csharp
using Shouldly;

[Fact]
public void Test_Example()
{
    var result = 2 + 2;
    result.ShouldBe(4);
}
```

#### Frontend Testing
The frontend uses **Vitest** for fast unit testing:

```typescript
import { describe, it, expect } from 'vitest';

describe('Example Test', () => {
  it('should pass', () => {
    expect(2 + 2).toBe(4);
  });
});
```

## Project Commands Summary

### Backend
| Command | Description |
|---------|-------------|
| `dotnet build` | Build the solution |
| `dotnet test` | Run all tests |
| `dotnet run` | Run the API (from Fastasys.Api directory) |
| `dotnet watch` | Run with hot reload |

### Frontend
| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |

## Best Practices

### Backend
- Follow Microsoft's [C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- Use dependency injection for service management
- Write tests using Shouldly for readable assertions
- Keep controllers thin, business logic in services
- Use async/await for I/O operations

### Frontend
- Follow [Angular Style Guide](https://angular.dev/style-guide)
- Use standalone components (Angular 20 default)
- Write tests with Vitest for fast feedback
- Use TypeScript strict mode
- Leverage RxJS for reactive programming
- Keep components focused and small

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Ensure all tests pass
5. Submit a pull request

## License

This project is licensed under the MIT License.
