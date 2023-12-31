FROM mcr.microsoft.com/dotnet/aspnet:5.0 as base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

MAINTAINER Fernando Antivero (https://github.com/ferantivero)

WORKDIR /app
COPY delivery/Fabrikam.DroneDelivery.Common/*.csproj ./delivery/Fabrikam.DroneDelivery.Common/
COPY dronescheduler/Fabrikam.DroneDelivery.DroneSchedulerService/*.csproj ./dronescheduler/Fabrikam.DroneDelivery.DroneSchedulerService/
WORKDIR /app
RUN dotnet restore /app/delivery/Fabrikam.DroneDelivery.Common/
RUN dotnet restore /app/dronescheduler/Fabrikam.DroneDelivery.DroneSchedulerService/

WORKDIR /app
COPY delivery/Fabrikam.DroneDelivery.Common/. ./delivery/Fabrikam.DroneDelivery.Common/
COPY dronescheduler/Fabrikam.DroneDelivery.DroneSchedulerService/. ./dronescheduler/Fabrikam.DroneDelivery.DroneSchedulerService/

FROM build AS publish

MAINTAINER Fernando Antivero (https://github.com/ferantivero)

RUN find -type d -name bin -prune -exec rm -rf {} \; && find -type d -name obj -prune -exec rm -rf {} \;

WORKDIR /app
RUN dotnet publish /app/dronescheduler/Fabrikam.DroneDelivery.DroneSchedulerService/ -c release -o ./out

FROM base AS runtime

MAINTAINER Fernando Antivero (https://github.com/ferantivero)

LABEL Tags="Azure,AKS,DroneDelivery"

ARG user=deliveryuser

RUN useradd -m -s /bin/bash -U $user

WORKDIR /app
COPY --from=publish /app/out ./
COPY dronescheduler/scripts/. ./
RUN \
    # Ensures the entry point is executable
    chmod ugo+x /app/run.sh

RUN chown -R $user.$user /app

# Set it for subsequent commands
USER $user

ENTRYPOINT ["/bin/bash", "/app/run.sh"]
