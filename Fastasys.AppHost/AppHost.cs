using Aspire.Hosting;

var builder = DistributedApplication.CreateBuilder(args);

var mysql = builder.AddMySql("mysql")
    .WithPhpMyAdmin()
    .WithLifetime(ContainerLifetime.Persistent);

var mysqldb = mysql.AddDatabase("fasta2026");

var apiService = builder.AddProject<Projects.Fastasys_ApiService>("apiservice")
    .WithHttpEndpoint(port: 5363)
    .WithHttpsEndpoint(port: 7408)
    .WithReference(mysqldb)
    .WaitFor(mysqldb)
    .WithHttpHealthCheck("/health")
    ;

builder.AddJavaScriptApp("angular", "../frontend", runScriptName: "start")
    .WithHttpEndpoint(port: 4200, isProxied: false)
    .WithReference(apiService)
    .WaitFor(apiService)
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();
