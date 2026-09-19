FROM mcr.microsoft.com/dotnet/sdk:10.0 AS restore
WORKDIR /src

COPY nuget.config ./
COPY Fastasys.slnx Directory.Build.props .editorconfig ./
COPY .config/dotnet-tools.json .config/dotnet-tools.json
COPY backend/src/Fastasys.ApiService/Fastasys.ApiService.csproj backend/src/Fastasys.ApiService/
COPY backend/tests/Fastasys.Tests/Fastasys.Tests.csproj backend/tests/Fastasys.Tests/
RUN dotnet restore backend/tests/Fastasys.Tests/Fastasys.Tests.csproj && dotnet tool restore

FROM restore AS build
COPY backend/src/Fastasys.ApiService/ backend/src/Fastasys.ApiService/
COPY backend/tests/Fastasys.Tests/ backend/tests/Fastasys.Tests/
RUN dotnet build backend/tests/Fastasys.Tests/Fastasys.Tests.csproj --no-restore -c Release

FROM build AS publish
RUN dotnet publish backend/src/Fastasys.ApiService/Fastasys.ApiService.csproj --no-build --no-restore -c Release -o /app/publish

FROM build AS migrations
ENTRYPOINT ["dotnet", "tool", "run", "dotnet-ef", "database", "update", "--project", "backend/src/Fastasys.ApiService/Fastasys.ApiService.csproj", "--startup-project", "backend/src/Fastasys.ApiService/Fastasys.ApiService.csproj", "--configuration", "Release", "--no-build"]

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Fastasys.ApiService.dll"]
