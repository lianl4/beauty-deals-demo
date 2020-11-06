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

<img width="1042" alt="petclinic-screenshot" src="https://github.com/kantega/react-and-spring/raw/master/frontend.png">

Success! We now have a React frontend that talks to our Spring Boot backend. 
