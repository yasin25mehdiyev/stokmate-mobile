FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY src/StokMate.Api/StokMate.Api.csproj src/StokMate.Api/
RUN dotnet restore src/StokMate.Api/StokMate.Api.csproj

COPY src/StokMate.Api/ src/StokMate.Api/
RUN dotnet publish src/StokMate.Api/StokMate.Api.csproj -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app .

ENV ASPNETCORE_ENVIRONMENT=Production
ENTRYPOINT ["dotnet", "StokMate.Api.dll"]
