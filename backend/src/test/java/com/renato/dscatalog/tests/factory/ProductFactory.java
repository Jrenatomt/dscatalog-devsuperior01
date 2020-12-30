package com.renato.dscatalog.tests.factory;

import java.time.Instant;

import com.renato.dscatalog.dto.ProductDTO;
import com.renato.dscatalog.entities.Category;
import com.renato.dscatalog.entities.Product;

public class ProductFactory {
	
	public static Product createProduct() {
		Product product = new Product(1L, "phone", "good Phone", 200.0, "http://img.com/img.png", Instant.parse("2020-10-13T20:50:07.12345Z"));
		product.getCategories().add(new Category(1L, null));
		return product;
	}
	
	public static ProductDTO createProductDTO() {
		Product product = createProduct();
		return new ProductDTO(product, product.getCategories());
	}
	
	public static ProductDTO createProductDTO(Long id) {
		ProductDTO dto = createProductDTO();
		dto.setId(id);
		return dto;
	}
}
