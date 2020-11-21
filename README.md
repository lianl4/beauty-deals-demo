# beauty-deals-demo

## Demo
The newest version of Beauty Deals:

https://beauty-deals.herokuapp.com/

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
2020-11-19 11:23:56.162  INFO 19505 --- [nio-5000-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2020-11-19 11:23:56.162  INFO 19505 --- [nio-5000-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2020-11-19 11:23:56.172  INFO 19505 --- [nio-5000-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 10 ms

```
Open http://localhost:5000/, you should see the home page. We now have Spring Boot up and running! If made changes in backend/server side, you need to rerun the `mvn spring-boot:run`.

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
This will open a web browser on http://localhost:3000/ on your desktop, and it should display something like this:

<img width="1042" alt="beautydeals-screenshot" src="https://github.com/beauty-deals/beauty-deals-demo/blob/main/img/WechatIMG73.png?raw=true">

Success! We now have a React frontend that talks to our Spring Boot backend. The change made in frontend code will compile immediately.

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
