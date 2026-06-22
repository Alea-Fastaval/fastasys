using Aspire.Hosting;

var builder = DistributedApplication.CreateBuilder(args);

var mysql = builder.AddMySql("mysql")
    .WithPhpMyAdmin()
    .WithLifetime(ContainerLifetime.Persistent);

var mysqldb = mysql.AddDatabase("fasta2026");

var apiService = builder.AddProject<Projects.Fastasys_ApiService>("apiservice")
    .WithReference(mysqldb)
    .WaitFor(mysqldb)
    .WithHttpHealthCheck("/health")
    ;

builder.AddJavaScriptApp("angular", "../frontend", runScriptName: "start")
    .WithReference(apiService)
    .WaitFor(apiService)
    .WithHttpEndpoint(port: 4200, isProxied: false)
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();
