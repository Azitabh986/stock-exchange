FROM openjdk:8-jdk-alpine
EXPOSE 8080
ADD target/stock-data.jar stock-data.jar
ENTRYPOINT ["java","-jar","/stock-data.jar"]
