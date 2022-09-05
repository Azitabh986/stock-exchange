package com.cts.stockdata.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Min;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class StockPrice {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;
	private float stockPrice;
	
	private Date updatedTime;
	@ManyToOne(fetch = FetchType.LAZY,optional = false)
	@JoinColumn(name = "code",nullable=false)
	@JsonIgnore
	private CompanyDetails companyDetails;
	
	public StockPrice() {}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public float getStockPrice() {
		return stockPrice;
	}
	public void setStockPrice(float stockPrice) {
		this.stockPrice = stockPrice;
	}
	public Date getUpdatedTime() {
		return updatedTime;
	}
	public void setUpdatedTime(Date updatedTime) {
		this.updatedTime = updatedTime;
	}
	
	
	public CompanyDetails getCompanyDetails() {
		return companyDetails;
	}

	public void setCompanyDetails(CompanyDetails companyDetails) {
		this.companyDetails = companyDetails;
	}

	@Override
	public String toString() {
		return "StockPrice [id=" + id + ", stockPrice=" + stockPrice + ", updatedTime=" + updatedTime
				+ ", companyDetails= ]";
	}
	
	
}
