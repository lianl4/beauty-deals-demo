package com.beautydeals.demo;

import com.beautydeals.demo.database.BasicSearching;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {

		SpringApplication.run(DemoApplication.class, args);
		BasicSearching.testConnection();
	}

}
