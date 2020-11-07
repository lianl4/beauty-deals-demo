# beauty-deals-demo

## Get started
Open up a ternimal window, go to the directory where you want to put the project code, and run:
```
$ git clone https://github.com/beauty-deals/beauty-deals-demo.git
$ cd beauty-deals-demo
```

## Run the backend with Spring Boot
In a terminal window, start the application with:
```
$ mvn spring-boot:run 

[...]
2020-11-05 20:58:01.441  INFO 66340 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2020-11-05 20:58:01.457  INFO 66340 --- [           main] com.beautydeals.demo.DemoApplication     : Started DemoApplication in 7.35 seconds (JVM running for 7.75)
2020-11-05 20:58:14.159  INFO 66340 --- [nio-8080-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2020-11-05 20:58:14.163  INFO 66340 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'

```
Open http://localhost:8080/, you should see a page with error messages, but it means the application is running correctly.

Then, in another terminal window, fetch http://localhost:8080/api/hello with curl or your web browser:
```
$ curl http://localhost:8080/api/hello
Hello, the time at the server is now Thu Nov 05 09:38:19 CEST 2020
```
We now have a rest service in Spring Boot up and running!

## Run the frontend with React
Now let's start the frontend. Go to a new terminal window and change to /frontend:
```
$ cd frontend/
```
Then:
```
$ npm install

[...]
$ npm start

[...]
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://172.16.25.84:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```
This will open a web browser on your desktop, and it should display something like this:

<img width="1042" alt="petclinic-screenshot" src="https://github.com/beauty-deals/beauty-deals-demo/blob/main/img/homepage.png?raw=true">

Success! We now have a React frontend that talks to our Spring Boot backend. 

## Datebase related logic

Currently, for searching, we only need to find the product linked to available URL.
Users will see those saved deals by searching products.Therefore, we can get access to the products using the URL provided by MakeUp API.

We need two kinds of table here.

```
Table1 URL_ProductID (
	URL, VARCHAR(100) NOT NULL,
	product_id, INT NOT NULL,
	PRIMARY KEY(URL)
)
```

Each product will have a table for its related deals

```
Table 2 Product_Deal (
	product_id, INT NOT NULL,
	discount_price, VARCHAR(10) NOT NULL,
        date, DATE,
	seller, VARCHAR(20) NOT NULL,
	PRIMARY KEY(product_id)
)
```

For comments, we can process them as the same way we process deals.
