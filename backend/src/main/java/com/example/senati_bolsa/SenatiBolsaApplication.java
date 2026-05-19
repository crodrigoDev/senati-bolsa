package com.example.senati_bolsa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
@EntityScan(basePackages = "com.example.senati_bolsa")
@EnableJpaRepositories(basePackages = "com.example.senati_bolsa")
public class SenatiBolsaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SenatiBolsaApplication.class, args);
	}

}
