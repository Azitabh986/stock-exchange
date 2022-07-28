package com.cts.stockdata.stockdatacontroller;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.cts.stockdata.model.CompanyDetails;


@CrossOrigin(origins = "*", maxAge = 3600)
@FeignClient(name = "STOCK-EXCHANGE")
public interface StockDataController {
	
	@GetMapping("/api/v1.0/market/company/getall")
	public List<CompanyDetails> getAllData();
}
