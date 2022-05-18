package com.cts.stockdata.exception;


import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalException extends ResponseEntityExceptionHandler{
	@ExceptionHandler(Exception.class)
	public final ResponseEntity<Object> handleGlobalException(Exception ex, WebRequest request){
		GlobalExceptionModel exceptionModel = new GlobalExceptionModel(new Date(),ex.getMessage().toString(),"Error Occured");
		return new ResponseEntity<>(exceptionModel,HttpStatus.BAD_REQUEST);
	}
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		GlobalExceptionModel exceptionModel = new GlobalExceptionModel(new Date(),ex.getBindingResult().toString(),"One of the your input is invalid.");
		return new ResponseEntity<>(exceptionModel,HttpStatus.BAD_REQUEST);
	}

}
