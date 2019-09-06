# Strawberryshortcakes REST API Documentation

## Authentication

### Create

- description: register a new user
- request: `POST /api/register`
    - content-type: `application/json`
    - body: object
        - firstname: (string) first name
        - lastname: (string) last name
        - phonenumber: (string) phone number
        - email: (string) email
        - username: (string) username
        - password: (string) password
- response: 200
    - content-type: `application/json`
    - body: object
        - message: (string) `Success`
        - username: (string) the registered username
        - service: (boolean) `True` if registered as a service, `False` if client
        - facebook: (boolean) `False`
        - phonenumber: (string) the registered phonenumber
        - email: (string) the registered email
        - name: (string) the registered full name
- response: 409
    - body: object
        - message: "Username already taken"
- response: 500:
    - body: object
        - message: "Server Error"
```
curl -H "Content-Type: application/json" 
    -X POST -d '{"username":"alice","password":"alice", "email": "alice@gmail.com", "phonenumber": "416 333 3333", "firstname": "Alice", "lastname": "Smith"}' 
    strawberryshortcakes.herokuapp.com/api/register
```

- description: register/login through Facebook
- request: `POST /api/login/facebook`
    - content-type: `application/json`
    - body: object
        - firstname: (string) first name
        - lastname: (string) last name
        - email: (string) email
        - username: (string) username
- response: 200
    - content-type: `application/json`
    - body: object
        - message: (string) `New Facebook User Created` or `Success`
        - username: (string) the registered username
        - service: (boolean) `False`
        - facebook: (boolean) `True`
        - phonenumber: (string) ` `
        - email: (string) the registered email
        - name: (string) the registered full name
- response: 500:
    - body: object
        - message: "Server Error"

```
curl -H "Content-Type: application/json" 
    -X POST -d '{"username":"124bv6372a34", "email": "alice@gmail.com", "firstname": "Alice", "lastname": "Smith"}' 
    strawberryshortcakes.herokuapp.com/api/login/facebook
```

- description: login to application
- request: `POST /api/login`
    - content-type: `application/json`
    - body: object
        - username: (string) username
        - password: (string) password
- response: 200
    - content-type: `application/json`
    - body: object
        - message: (string) `Success`
        - username: (string) the registered username
        - service: (boolean) `True` if registered as a service, `False` if client
        - facebook: (boolean) `False`
        - phonenumber: (string) the registered phonenumber
        - email: (string) the registered email
        - name: (string) the registered full name
- response: 401
    - body: "Invalid login"
- response: 500:
    - body: "Server error"

```
curl -H "Content-Type: application/json" 
    -X POST -d '{"username":"alice", "password":"alice"}' 
    strawberryshortcakes.herokuapp.com/api/login
```

### Read

- description: logout of session
- request: `GET /api/logout`
- response: 200
    - redirect to home page

```
curl  strawberryshortcakes.herokuapp.com/api/logout
```

## Service

### Create

- description: create a service
- request: `POST /api/services`
    - content-type: `application/json`
    - body: object
        - name: (string) username
        - companyArray: (object) includes the following:
            - Company: (string) company's name
            - Address: (string) company's address
            - Description: (string) company's description
            - Phone: (string) company's phone number
        - tagArray: (array of strings) tag's associated with the company
        - timeArray: (array of objects) available time slots for the company including
            - id: (string) id 
            - from: (string) start time
            - to: (string) end timecompany
- response: 200
    - body: object 
        - message: (string) "Success"
- response: 403
    - body: (string) "forbidden"
- response: 409
    - body: (string) "Not a valid service name"
- response: 409
    - body: (string) "servicec already has a company"
- response: 500
    - body: (string) "Server Error"
```
curl -H "Content-Type: application/json" 
    -X POST -d '{
	"companyArray" : {"Company":"Pest Control", "Address":"Canada, 523 caboto trail, Markham, Ontario, l3r5s2", "Description":"ghost buster, but for bugs",
	"Phone":"416 777 8888"},
	"tagArray": ["Pest", "Control", "Pest Control", "bugs", "house"],
	"timeArray": [{"id": "342243", "from": "12:00 PM", "to": "5:00 PM"}, {"id": "4747374", "from": "7:00 PM", "to": "10:00 PM"}],
	"name":"PestControlInc"
}' 
    strawberryshortcakes.herokuapp.com/api/services
```

### Read

- description: get company's matching the given tag
- request: `GET /api/services/:tag`
- response: 200
    - body: object
        - data: (object) companies that match the given tag, with their respective info including:
            - _id: (string) id of service/company
            - tags: (array of strings) tags asscociated with the company
            - times: (array of objects) available time slots for the company including
                - id: (string) id 
                - from: (string) start time
                - to: (string) end timecompany
            - company: (string) company name
            - address (string) address of the company
            - description:(string) description of the company
            - phone: (string) phone number of the company
            - name: (string) username
            - date: (string) date of company creation
- response: 500
    - body: (string) "Server Error"

``` 
$ curl strawberryshortcakes.herokuapp.com/api/services/Pest
``` 

- description: get service by username
- request: `GET /api/services/username/:name`
- response: 200
    - body: object
        - data: (object) matched company's data:
            - _id: (string) id of service/company
            - tags: (array) tags asscociated with the company
            - times: (array) available time slots for the company
            - company: (string) company name
            - address (string) address of the company
            - description:(string) description of the company
            - phone: (string) phone number of the company
            - name: (string) username
            - date: (string) date of company creation

- response: 500
    - body: (string) "Server Error"

```
$ curl strawberryshortcakes.herokuapp.com/api/services/username/PestControlInc
```

### Update

- description: update the company given the company id
- request: `PATCH /api/services/:id`
    - content-type: `application/json`
    - body: object
        - company: (string) company's name
        - address: (string) company's address
        - description: (string) company's description
        - phone: (string) company's phone number
        - tags: (array of strings) tag's associated with the company
        - times: (array of objects) available time slots for the company including
            - id: (string) id 
            - from: (string) start time
            - to: (string) end time
- response: 200
    - body: object
        - message: (string) "Success"
- response: 403
    - body: (string) "forbidden"
- response: 404
    - body: (string) "service not found"
- response: 500
    - body: (string) "Server Error"

``` 
$ curl -X PATCH 
       -H 'Content-Type: application/json'
       -d '{
            "times": [{"to": "4:00 AM", "from": "7:30 AM", "id": "831935"}, {"to": "6:30 PM", "from": "4:30 PM", "id": "795805"}], 
            "tags": ["bugs", "pest"] , 
            "company":"Pest Control Inc", 
            "description":"got bugs? book us", 
            "phone":"416 424 6464", 
            "address":"Canada, 523 caboto trail, Markham, Ontario, l3r5s2"
            }'
       strawberryshortcakes.herokuapp.com/api/services/5abe8dbf1f486530b4c535a8'
```

## Appointments

### Create

- description: create an appointment
- request: `POST /api/appointments`
    - content-type: `application/json`
    - body: object
        - userId: (string) id of the user requesting an appointment
        - serviceId: (string) id of the service
        - from: (string) appointment's starting time
        - to: (string) appointment's ending time
        - date: (string) appointment's date
        - company: (object) the company's name
        - email: (string) user's email
        - phone: (string) user's phone number
        - name: (string) user's full name
        - companyUsername: (string) company's username
- response: 200
    - body: object
        - message (string) "Success"
- response: 403
    - body: (string) "forbidden"
- response: 404
    - body: (string) "service not found"
- response: 409
    - body: (string) "time slot not available"
- response: 409
    - body: (string) "time slot is already taken"
- response: 500
    - body: (string) "Server Error"

```
curl -H "Content-Type: application/json" 
    -X POST -d '{ "to": "4:00 AM",
  "from": "7:30 AM",
  "userId": "alice",
  "serviceId": "5abaad8cb5f62a2c503935e3",
  "date": "Sat, 10 Mar 2018 00:00:00 GMT",
  "company": "Pest Control Inc",
  "email": "alice@gmail.com",
  "phonenumber": "416 333 3333",
  "name": "Alice Smith",
  "companyUsername": "PestControlInc"
}' 
    strawberryshortcakes.herokuapp.com/api/appointments
```

### Read

- description: get all appointments given company's id
- request: `GET /api/appointments/company/:company`
- response: 200
    - body: object
        - appointments: (array of objects) all appointments of a company which include:
            - _id: id of appointment
            - userId: (string) id of the user requesting an appointment
            - serviceId: (string) id of the service
            - from: (string) appointment's starting time
            - to: (string) appointment's ending time
            - date: (string) appointment's date
            - company: (object) the company's name
            - email: (string) user's email
            - phone: (string) user's phone number
            - name: (string) user's full name
            - companyUsername: (string) company's username
- response: 500
    - body: (string) "Server Error"

```
$ curl strawberryshortcakes.herokuapp.com/api/appointments/company/5abaad8cb5f62a2c503935e3
```

- description: get all appointments for a specific company username
- request: `GET /api/appointments/company/user/:company`
- response: 200
    - body: object
        - appointments: (array of objects) all appointments of a company which include:
            - _id: id of appointment
            - userId: (string) id of the user requesting an appointment
            - serviceId: (string) id of the service
            - from: (string) appointment's starting time
            - to: (string) appointment's ending time
            - date: (string) appointment's date
            - company: (object) the company's name
            - email: (string) user's email
            - phone: (string) user's phone number
            - name: (string) user's full name
            - companyUsername: (string) company's username
- response: 500
    - body: (string) "Server Error"

```
$ curl strawberryshortcakes.herokuapp.com/api/appointments/company/user/PestControlInc
```

- description: get all appointments booked by user
- request: `GET /api/appointments/:user`
- response: 200
    - body: object
        - appointments: (array of objects) all appointments booked by user, object includes:
             - _id: id of appointment
            - userId: (string) id of the user requesting an appointment
            - serviceId: (string) id of the service
            - from: (string) appointment's starting time
            - to: (string) appointment's ending time
            - date: (string) appointment's date
            - company: (object) the company's name
            - email: (string) user's email
            - phone: (string) user's phone number
            - name: (string) user's full name
            - companyUsername: (string) company's username

- response: 500
    - body: (string) "Server Error"
- response: 403
    - body: (string) "forbidden"

```
$ curl strawberryshortcakes.herokuapp.com/api/appointments/alice
```

### Delete

- description: delete a booked appointment given appointment id
- request: `DELETE /api/appointments/:id`
- response: 200
    - body: (object) deleted appointment information
        - _id: id of appointment
        - userId: (string) id of the user requesting an appointment
        - serviceId: (string) id of the service
        - from: (string) appointment's starting time
        - to: (string) appointment's ending time
        - date: (string) appointment's date
        - company: (object) the company's name
        - email: (string) user's email
        - phone: (string) user's phone number
        - name: (string) user's full name
        - companyUsername: (string) company's username
- response: 403
    - body: (string) "forbidden"
- response: 404
    - body: (string) "Item id :id does not exist"
- response: 500
    - body: (string) "Server Error"


``` 
$ curl -X DELETE
       strawberryshortcakes.herokuapp.com/api/appointments/5ac11973b3f7400015ad70e1

``` 