FROM openjdk:8-jdk-alpine
EXPOSE 8082
ADD target/stockdata.jar stockdata
ENTRYPOINT ["java","-jar","/stockdata.jar"]