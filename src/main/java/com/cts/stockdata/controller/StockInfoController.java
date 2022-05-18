package com.cts.stockdata.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.stockdata.model.CompanyDetails;
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
	

}
