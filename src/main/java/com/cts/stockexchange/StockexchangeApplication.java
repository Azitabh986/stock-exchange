package com.cts.stockexchange;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
// @EnableEurekaClient
@SpringBootApplication
public class StockexchangeApplication {

	public static void main(String[] args) {
		SpringApplication.run(StockexchangeApplication.class, args);
	}

}
