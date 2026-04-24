FROM maven:3.8.1-openjdk-21 AS build
WORKDIR /app
COPY backend/pom.xml .
RUN mvn dependency:go-offline -f pom.xml
COPY backend/src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENV PORT=8080
CMD ["java", "-jar", "app.jar"]