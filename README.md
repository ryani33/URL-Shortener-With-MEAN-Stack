#URL shortening service with MEAN stack

##Summary
This project is a URL shortening service similar to sites like bitly.com using Node.js, Express, MongoDB and Angular (MEAN stack). Express will be used to handle our routing and redirection, while MongoDB takes care of storing and looking up the shortened links.

##Requirement
- Node.js backend with Express and MongoDB
- AngularJS frontend
- Modular Angular components (controllers, services)

##Target
At a high level, the URL shortener works by taking a long URL and applying a hashing algorithm to spit out a shorter version of the URL and stores them in a database for later lookup.


- long URL -> short URL
- short URL -> long URL


Converting a unique integer ID (which is in base10) to it's equivalent in base59. The base59 alphabet we will be using is: `0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ`. It is just the numbers `0-9`, `a-z`, and `A-Z`, giving us a total of 59 characters, hence the 59 in base59. We are excluding `l`, `O` to avoid confusion when sharing the URL over the phone or copying it manually.

##Application Structure
```
- app
---- data.js
---- rules.js
- config
---- db.js 
- node_modules <!-- created by npm install -->
- public <!-- all frontend and angular stuff -->
---- css
---- js
-------- shared
-------- controllers <!-- angular controllers -->
-------- services <!-- angular services -->
-------- app.js <!-- angular application -->
---- img
---- views 
-------- index.html
- package.json <!-- tells npm which packages we need -->
- server.js <!-- set up our node application -->
```

##Useage
Please go to this site