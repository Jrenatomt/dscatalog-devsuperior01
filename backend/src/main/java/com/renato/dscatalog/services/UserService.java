package com.renato.dscatalog.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.renato.dscatalog.dto.RoleDTO;
import com.renato.dscatalog.dto.UserDTO;
import com.renato.dscatalog.dto.UserInsertDTO;
import com.renato.dscatalog.dto.UserUpdateDTO;
import com.renato.dscatalog.entities.Role;
import com.renato.dscatalog.entities.User;
import com.renato.dscatalog.repositories.RoleRepository;
import com.renato.dscatalog.repositories.UserRepository;
import com.renato.dscatalog.services.exceptions.DatabaseException;
import com.renato.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService{
	
	@Autowired
	private BCryptPasswordEncoder passwordEnconder;
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(PageRequest pageRequest){
		Page<User> list = repository.findAll(pageRequest);
		return list.map(x -> new UserDTO(x));
	}
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Usuario não encontrado"));
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User entity = new User();
		copyDtoToEntity(dto, entity);
		entity.setPassword(passwordEnconder.encode(dto.getPassword()));
		entity = repository.save(entity);
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {
		try {
			 User entity = repository.getOne(id);
			 copyDtoToEntity(dto, entity);
			 entity = repository.save(entity);
			 return new UserDTO(entity);
			}
		     catch(EntityNotFoundException e) {
		    	throw new ResourceNotFoundException("id not found" + id);
		     }
       }

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("id not found" + id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Constraints Violation");
		}
	}
	
	private void copyDtoToEntity(UserDTO dto, User entity) {
		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.setEmail(dto.getEmail());
		
		entity.getRoles().clear();
		
		for (RoleDTO roleDto : dto.getRoles()) {
			Role role = roleRepository.getOne(roleDto.getId());
			entity.getRoles().add(role);
		}
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = repository.findByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException("email not found");
		}
		return user;
	}
  }
