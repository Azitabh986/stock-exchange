package com.cts.stockdata.controller;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.stockdata.model.CompanyDetails;
import com.cts.stockdata.model.StockPrice;
import com.cts.stockdata.stockdatacontroller.StockDataController;
@RestController
@RequestMapping("/api/v1.0")
@ControllerAdvice
public class StockInfoController  {
	
	private final static Logger logger=LoggerFactory.getLogger(StockInfoController.class);
	
	@Autowired
	private StockDataController stockDataController;

	@GetMapping("/market/company/getall")
	public ResponseEntity<List<CompanyDetails>> getAllCompanyData(){
		List<CompanyDetails> companyDetails=(List<CompanyDetails>) stockDataController.getAllData();
		return new ResponseEntity<List<CompanyDetails>>(companyDetails,HttpStatus.OK);
	}
	
	@GetMapping("/market/company/info/{companycode}")
	public ResponseEntity<CompanyDetails> getCompanyDetailsByCompanyCode(@Valid @PathVariable String companycode){
		List<CompanyDetails> companyDetails=(List<CompanyDetails>) stockDataController.getAllData();
		logger.info("companyDetails:-- "+companyDetails.toString());
		
		System.out.println(companyDetails.stream().filter(i->i.getCode() == companycode));
		List<CompanyDetails> cd=companyDetails.stream().filter(i->i.getCode().equals(companycode)).collect(Collectors.toList());
		logger.info("companyDetails1:-- "+cd.toString());
		CompanyDetails cd1;
		if(cd.size()>0) {
			cd1=cd.get(0);
		}else {
			throw new RuntimeException("company code doesn't exits");
		}
		return new ResponseEntity<CompanyDetails>(cd1,HttpStatus.OK);
	}
	
	@GetMapping("/market/stock/get/{companycode}/{startdate}/{enddate}")
	public ResponseEntity<List<StockPrice>> getAllCompanyPriceList(@PathVariable("companycode") String companycode,@PathVariable("startdate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startdate,@DateTimeFormat(pattern = "yyyy-MM-dd")@PathVariable("enddate") Date enddate){
		List<StockPrice> filterSP;
		List<CompanyDetails> companyDetails=(List<CompanyDetails>) stockDataController.getAllData();
		List<CompanyDetails> cd=companyDetails.stream().filter(i->i.getCode().equals(companycode)).collect(Collectors.toList());
		if(cd.size()>0) {
			List<StockPrice> stockPrices=cd.get(0).getStockPrice();
			filterSP=stockPrices.stream()
					.filter(i->i.getUpdatedTime().after(startdate) && i.getUpdatedTime().before(enddate) ).collect(Collectors.toList());
		}else {
			throw new RuntimeException("Company doesn't exists!");
		}
		return new ResponseEntity<List<StockPrice>>(filterSP,HttpStatus.OK);
	}

}
