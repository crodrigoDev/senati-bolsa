package com.example.senati_bolsa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SenatiBolsaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SenatiBolsaApplication.class, args);
	}

}
