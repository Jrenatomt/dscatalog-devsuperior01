package com.renato.dscatalog.tests.integration;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import com.renato.dscatalog.dto.ProductDTO;
import com.renato.dscatalog.services.ProductService;
import com.renato.dscatalog.services.exceptions.ResourceNotFoundException;

@SpringBootTest
@Transactional
public class ProductServiceIT {
	
	@Autowired
	private ProductService service;
	
	private Long existingId;
	private Long nonExistingId;
	private Long countTotalProducts;
	private Long countPCGamersProducts;
	private PageRequest pageRequest;
	
	
	@BeforeEach
	public void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
		countPCGamersProducts = 21L;
		pageRequest = PageRequest.of(0, 10);
	}
	
	@Test
	public void findAllPagedShouldReturnNothingWhenNameDoesNotExist() {
		
		String name = "camera";
		
		Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);
		
		Assertions.assertTrue(result.isEmpty());
	}
	
	@Test
	public void findAllPagedShouldReturnAllProductsWhenNameIsEmpty() {
		
		String name = "";
		
		Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findAllPagedShouldReturnProductsWhenNameIgnoreCase() {
		
		String name = "Pc gAMeR";
		
		Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamersProducts, result.getTotalElements());
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNorExist() {
		
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});
	}
	
	@Test
	public void deleteShouldDoNothingWhenIdExist() {
		
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});
	}
}