package com.cts.stockdata.exception;

import java.util.Date;

public class GlobalExceptionModel {
	
	private Date timeStamp; 
	private String info;
	private String description;
	
	public GlobalExceptionModel() {}
	
	
	
	public GlobalExceptionModel(Date timeStamp, String info, String description) {
		super();
		this.timeStamp = timeStamp;
		this.info = info;
		this.description = description;
	}



	public Date getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(Date timeStamp) {
		this.timeStamp = timeStamp;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
}

