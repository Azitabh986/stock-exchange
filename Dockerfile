FROM openjdk:8-jdk-alpine
EXPOSE 8080
ADD target/stockexchange.jar stockexchange
ENTRYPOINT ["java","-jar","/stock-data.jar"]
