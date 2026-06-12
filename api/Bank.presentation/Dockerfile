FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Bank.presentation/Bank.presentation.csproj", "Bank.presentation/"]
COPY ["Bank.application/Bank.application.csproj", "Bank.application/"]
COPY ["Bank.domain/Bank.domain.csproj", "Bank.domain/"]
COPY ["Bank.infrastructure/Bank.infrastructure.csproj", "Bank.infrastructure/"]
RUN dotnet restore "Bank.presentation/Bank.presentation.csproj"
COPY . .
WORKDIR "/src/Bank.presentation"
RUN dotnet build "Bank.presentation.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Bank.presentation.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Bank.presentation.dll"]
