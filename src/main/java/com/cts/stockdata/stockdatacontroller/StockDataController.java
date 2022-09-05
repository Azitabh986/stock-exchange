package com.cts.stockdata.stockdatacontroller;





import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cts.stockdata.model.CompanyDetails;


//@Repository
public interface StockDataController extends JpaRepository<CompanyDetails, Long> {
	
	@Query(value = "Select * from company_details where code=?1",nativeQuery = true)
	CompanyDetails findByCode(String code);

}
