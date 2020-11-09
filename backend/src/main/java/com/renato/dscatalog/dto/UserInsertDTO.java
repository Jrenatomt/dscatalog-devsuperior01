package com.renato.dscatalog.dto;

import javax.validation.constraints.NotBlank;

import com.renato.dscatalog.services.validation.UserInsertValid;

@UserInsertValid
public class UserInsertDTO extends UserDTO{
	private static final long serialVersionUID = 1L;
	
	@NotBlank(message = "Preenchimento Obrigatório")
	private String password;
	
	public UserInsertDTO() {
		super();
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	

}
