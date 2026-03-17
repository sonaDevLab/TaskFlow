FROM maven:3.8.1-openjdk-21
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21-slim
WORKDIR /app
COPY --from=0 /app/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]