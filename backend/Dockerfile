FROM maven:3.9.6-eclipse-temurin-21

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:resolve

COPY src ./src

RUN mvn clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/TaskFlow-backend-1.0-SNAPSHOT.jar"]