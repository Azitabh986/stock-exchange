package com.cts.stockdata.model;

import java.util.Date;

public class StockPrice {
	private long id;
	private float stockPrice;
	private Date updatedTime;
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
	@Override
	public String toString() {
		return "StockPrice [id=" + id + ", stockPrice=" + stockPrice + ", updatedTime=" + updatedTime + "]";
	}
	
	
	
}
