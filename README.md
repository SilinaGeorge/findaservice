# strawberryshortcakes

**Team Members:** Fauzan Kadri, Osama Alhaq, Silina George

### APP URL: https://strawberryshortcakes.herokuapp.com
### Docs: https://strawberryshortcakes.herokuapp.com/api-docs.md
### Video Demo: https://www.youtube.com/watch?v=tEhx89s041g&feature=youtu.be

### Description of web application:

This application allows users(clients) to search for services nearby or at a given location, and view the results as markers on a map. Each marker can be clicked upon to view more details about the service, and also enables the clients to schedule/book an appointment. Before booking an appointment, users must sign up as a client and verify their accounts. Users may also register as a  business(service provider) where they can set up their company information and adjust their booking form. Once an appointment is booked, that time slot would no longer be available, and both the service provider and Client would be able to see their appointments on the home page. Examples of services a client can book: haircut, car detailing, pool table mover/installation, pest control, maid, etc.

### Description of the key features that will be completed by the Beta version:

* Search for services based on a location and display results on a map and list
* Separate login for both clients and service providers and account verification
* Service providers can create their booking form and add company information

### Description of additional features that will be complete by the Final version:

* Display booking form and company details once service is selected
* Book appointments (client)
* View scheduled appointments on home page

### Description of the technology that you will use:

* React.js, Redux, Node.js, MongoDB, Bootstrap for React, Robo 3T, Webpack, Postman, Express
* Google Maps Api
* ES6, ESLint

### Description of the top 5 technical challenges:

1. Using React.js, Redux, and ES6 to implement this application
1. Searching for nearby services based on the device location or location entered, and display results as markers on the map
1. Creating a user-friendly interface for desktop and mobile
1. Allowing service providers to set up their booking form, and for clients to schedule time slots accordingly 
1. Prevents two users from booking the same time slot during the  same time.

### RUNNING APPLICATION (Dev):

1. npm i
1. webpack -w
1. npm run start:dev
1. check localhost:PORT and application will be running
