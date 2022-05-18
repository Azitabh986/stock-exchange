package com.cts.stockdata.model;

import java.util.List;



public class CompanyDetails {
	
	private long id;
	private String code;
	private String name;
	private String ceo;
	private float trunOver;
	private String website;
	private String stockExchange;
	private List<StockPrice> stockPrice;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCeo() {
		return ceo;
	}
	public void setCeo(String ceo) {
		this.ceo = ceo;
	}
	public float getTrunOver() {
		return trunOver;
	}
	public void setTrunOver(float trunOver) {
		this.trunOver = trunOver;
	}
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}
	public String getStockExchange() {
		return stockExchange;
	}
	public void setStockExchange(String stockExchange) {
		this.stockExchange = stockExchange;
	}
	public List<StockPrice> getStockPrice() {
		return stockPrice;
	}
	public void setStockPrice(List<StockPrice> stockPrice) {
		this.stockPrice = stockPrice;
	}
	@Override
	public String toString() {
		return "CompanyDetails [id=" + id + ", code=" + code + ", name=" + name + ", ceo=" + ceo + ", trunOver="
				+ trunOver + ", website=" + website + ", stockExchange=" + stockExchange + ", stockPrice=" + stockPrice
				+ "]";
	}
	
	
}
