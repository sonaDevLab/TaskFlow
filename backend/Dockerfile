FROM maven:3.8.1-openjdk-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21-slim
COPY --from=build /app/target/taskflow-app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]