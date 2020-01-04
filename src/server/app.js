const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const cookie = require("cookie");
const dotenv = require("dotenv").config();
const validator = require("validator");

var ObjectId = require("mongodb").ObjectId;

// connect to our database
mongoose.connect(
  'mongodb://silina01:cSB42MnimhMneRSX@cshub-shard-00-00-vtf1l.mongodb.net:27017,cshub-shard-00-01-vtf1l.mongodb.net:27017,cshub-shard-00-02-vtf1l.mongodb.net:27017/findaservice?ssl=true&replicaSet=CSHub-shard-0&authSource=admin&retryWrites=true&w=majority'
    , { useNewUrlParser: true, useUnifiedTopology: true, }
);

// create session
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
app.use(
  session({
    secret: "StrawberryShortcakeS",
    store: new MongoStore({
      url: 'mongodb://silina01:cSB42MnimhMneRSX@cshub-shard-00-00-vtf1l.mongodb.net:27017,cshub-shard-00-01-vtf1l.mongodb.net:27017,cshub-shard-00-02-vtf1l.mongodb.net:27017/findaservice?ssl=true&replicaSet=CSHub-shard-0&authSource=admin&retryWrites=true&w=majority',
      ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    }),
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, sameSite: true, secure: false }
  })
);

const router = express.Router();

// import our models
const Appointments = require("./models/appointments.js");
const Services = require("./models/services.js");

// api routes
app.use("/api", router);
app.use("/api/services", router);
app.use("/api/appointments", router);

var cors = require('cors');
var corsOptions = {
    origin: 'https://find--a--service.herokuapp.com/',
    credentials: true };

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// where index.html is hosted
app.use(express.static(__dirname + "./../../"));

// helper function that gets data given a collection, query, callback
function findOne(name, query, cb) {
  mongoose.connection.db.collection(name, function(err, collection) {
    collection.findOne(query, cb);
  });
}

// helper function that gets data given a collection, query, callback
function remove(name, query, cb) {
  mongoose.connection.db.collection(name, function(err, collection) {
    collection.deleteOne(query, { multi: false }, cb);
  });
}

// helper function that gets data given a collection, query, callback
function find(name, query, cb) {
  mongoose.connection.db.collection(name, function(err, collection) {
    collection.find(query).toArray(cb);
  });
}

// helper function that updates data given a collection, query, callback
function update(name, query, modification, optional = {}, cb) {
  mongoose.connection.db.collection(name, function(err, collection) {
    collection.update(query, modification, optional, cb);
  });
}

// helper functions to generate salt and hash for encryption
function generateSalt() {
  return crypto.randomBytes(16).toString("base64");
}

function generateHash(password, salt) {
  var hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  return hash.digest("base64");
}

const isAuthenticated = function(req, res, next) {
  if (!req.session.username) return res.status(401).end("access denied");
  next();
};

const checkUsername = function(req, res, next) {
  if (!validator.isAlphanumeric(req.body.username))
    return res.status(400).end("bad input");
  next();
};

const checkField = function(field) {
  if (!validator.isAlphanumeric(field)) return res.status(400).end("bad input");
};

const sanitizeFeild = function(field) {
  return validator.escape(field);
};

const checkId = function(req, res, next) {
  if (!validator.isAlphanumeric(req.params.id))
    return res.status(400).end("bad input");
  next();
};

const checkTag = function(req, res, next) {
  if (!validator.isAlphanumeric(req.params.tag))
    return res.status(400).end("bad input");
  next();
};

const checkUser = function(req, res, next) {
  if (!validator.isAlphanumeric(req.params.user))
    return res.status(400).end("bad input");
  next();
};

const checkName = function(req, res, next) {
  if (!validator.isAlphanumeric(req.params.name))
    return res.status(400).end("bad input");
  next();
};

const checkCompany = function(req, res, next) {
  if (!validator.isAlphanumeric(req.params.company))
    return res.status(400).end("bad input");
  next();
};

const checkParams = function(req, res, next) {
  if (!validator.isAlphanumeric(req.params))
    return res.status(400).end("bad input");
  next();
};

app.post("/api/login", checkUsername, (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  // connect to users collection and find user
  findOne("users", { _id: username }, function(err, user) {
    if (err) return res.status(500).json({ message: "Server Error" });
    if (!user) return res.status(401).json({ message: "Invalid login" });
    if (user.hash !== generateHash(password, user.salt))
      return res.status(401).json({ message: "Invalid login" }); // invalid password
    // start a session
    req.session.username = user._id;
    return res.status(200).json({
      message: "Success",
      username,
      service: user.service,
      facebook: false,
      phonenumber: user.phonenumber,
      email: user.email,
      name: user.firstname + " " + user.lastname
    });
  });
});

app.post("/api/register/", checkUsername, function(req, res, next) {
  const firstname = sanitizeFeild(req.body.firstname);
  const lastname = sanitizeFeild(req.body.lastname);
  const phonenumber = sanitizeFeild(req.body.phonenumber);
  const email = sanitizeFeild(req.body.email);
  const username = req.body.username;
  const password = req.body.password;
  let service = req.body.service;
  const facebook = false;
  if (typeof service != "boolean") {
    service = false;
  }

  findOne("users", { _id: username }, function(err, user) {
    if (err) return res.status(500).json({ message: "Server Error" });
    if (user) {
      return res.status(409).json({ message: "Username is already taken" });
    }
    const salt = generateSalt();
    const hash = generateHash(password, salt);
    update(
      "users",
      { _id: username },
      {
        _id: username,
        salt,
        hash,
        firstname,
        lastname,
        phonenumber,
        email,
        facebook,
        service
      },
      { upsert: true },
      function(err) {
        if (err) return res.status(500).json({ message: "Server Error" });
        // start a session
        req.session.username = username;
        return res.status(200).json({
          message: "Success",
          username,
          service,
          facebook,
          phonenumber: phonenumber,
          email: email,
          name: firstname + " " + lastname
        });
      }
    );
  });
});

app.post("/api/login/facebook", checkUsername, function(req, res, next) {
  const firstname = sanitizeFeild(req.body.firstname);
  const lastname = sanitizeFeild(req.body.lastname);
  const email = sanitizeFeild(req.body.email);
  const username = req.body.username;
  const service = false;
  const facebook = true;

  findOne("users", { _id: username }, function(err, user) {
    if (err) return res.status(500).json({ message: "Server Error" });
    if (user) {
      // start a session
      req.session.username = username;

      return res.status(200).json({
        message: "Success",
        username,
        facebook,
        user,
        service,
        name: firstname + " " + lastname,
        phonenumber: "",
        email
      });
    }
    update(
      "users",
      { _id: username },
      {
        _id: username,
        firstname,
        lastname,
        phonenumber: "",
        email,
        facebook,
        service
      },
      { upsert: true },
      function(err) {
        if (err) return res.status(500).json({ message: "Server Error" });
        // start a session
        req.session.username = username;
        return res.status(200).json({
          message: "New Facebook User Created",
          username,
          service,
          facebook,
          name: firstname + " " + lastname,
          phonenumber: "",
          email
        });
      }
    );
  });
});

app.get("/api/logout/", function(req, res, next) {
  req.session.destroy();
  res.redirect("/");
});

// get all services that match the given tag
app.get("/api/services/:tag", checkTag, function(req, res, next) {
  find(
    "services",
    {
      tags: {
        $elemMatch: {
          $regex: req.params.tag,
          $options: "i"
        }
      }
    },
    function(err, services) {
      if (err) return res.status(500).end("Server Error");
      res.json({ data: services });
    }
  );
});

// get a service based on username
app.get("/api/services/username/:name", checkName, function(req, res, next) {
  findOne("services", { name: req.params.name }, function(err, service) {
    if (err) return res.status(500).end("Server Error");
    res.json({ data: service });
  });
});

// create the service form
app.post("/api/services", isAuthenticated, function(req, res, next) {
  var services = new Services();
  services.company = sanitizeFeild(req.body.companyArray.Company);
  services.address = sanitizeFeild(req.body.companyArray.Address);
  services.description = sanitizeFeild(req.body.companyArray.Description);
  services.phone = sanitizeFeild(req.body.companyArray.Phone);
  services.tags = [];
  for (var tag of req.body.tagArray) {
    services.tags.push(sanitizeFeild(tag));
  }
  services.times = [];
  for (var time of req.body.timeArray) {
    var to = sanitizeFeild(time.to);
    var from = sanitizeFeild(time.from);
    var id = sanitizeFeild(time.id);
    services.times.push({ to, from, id });
  }
  services.name = sanitizeFeild(req.body.name);
  services.date = new Date(Date.now()).toLocaleString().split(",")[0];

  findOne("users", { _id: services.name }, function(err, user) {
    if (err) return res.status(500).send("Server Error");
    if (!user || !user.service) {
      return res.status(409).send("Not a valid service name");
    }
    if (req.body.name !== req.session.username)
      return res.status(403).end("forbidden");
    findOne("services", { name: services.name }, function(err, service) {
      if (err) return res.status(500).send("Server Error");
      if (service) return res.status(409).send("service already has a company");

      services.save(function(err) {
        if (err) {
          return res.status(500).send("Server Error");
        }
        res.json({ message: "Success" });
      });
    });
  });
});

// update company info
app.patch("/api/services/:id", checkId, isAuthenticated, function(
  req,
  res,
  next
) {
  const company = sanitizeFeild(req.body.company);
  const address = sanitizeFeild(req.body.address);
  const description = sanitizeFeild(req.body.description);
  const phone = sanitizeFeild(req.body.phone);
  var tags = [];
  for (var tag of req.body.tags) {
    tags.push(sanitizeFeild(tag));
  }
  var times = [];
  for (var time of req.body.times) {
    var to = sanitizeFeild(time.to);
    var from = sanitizeFeild(time.from);
    var id = sanitizeFeild(time.id);
    times.push({ to, from, id });
  }
  findOne("services", { _id: ObjectId(req.params.id) }, function(err, service) {
    if (err) return res.status(500).send("Server Error");
    if (!service) return res.status(404).send("service not found");
    if (service.name != req.session.username)
      return res.status(403).end("forbidden");
    update(
      "services",
      { _id: ObjectId(req.params.id) },
      { $set: { company, address, description, phone, tags, times } },
      { $multi: true },
      function(err) {
        if (err) return res.status(500).send("Server Error");
        return res.status(200).json({ message: "Success" });
      }
    );
  });
});

// create the appointment
app.post("/api/appointments", isAuthenticated, function(req, res, next) {
  checkField(req.body.userId);
  checkField(req.body.serviceId);
  var apt = new Appointments();
  apt.to = sanitizeFeild(req.body.to);
  apt.from = sanitizeFeild(req.body.from);
  apt.userId = req.body.userId;
  apt.serviceId = req.body.serviceId;
  apt.date = sanitizeFeild(req.body.date);
  apt.company = sanitizeFeild(req.body.company);
  apt.email = sanitizeFeild(req.body.email);
  apt.phonenumber = sanitizeFeild(req.body.phonenumber);
  apt.name = sanitizeFeild(req.body.name);
  apt.companyUsername = sanitizeFeild(req.body.companyUsername);

  if (apt.userId != req.session.username)
    return res.status(403).end("forbidden");

  findOne("services", { _id: ObjectId(req.body.serviceId) }, function(
    err,
    service
  ) {
    if (err) return res.status(500).send("Server Error");
    if (!service) return res.status(404).send("service not found");
    let valid = false;
    for (let time of service.times) {
      if (time.to == apt.to && time.from == apt.from) {
        valid = true;
        break;
      }
    }
    if (!valid) return res.status(409).send("time slot is not available");
    findOne(
      "appointments",
      { serviceId: apt.serviceId, to: apt.to, from: apt.from, date: apt.date },
      function(err, appointment) {
        if (err) return res.status(500).send("Server Error");
        if (appointment)
          return res.status(409).send("time slot is already taken");
        apt.save(function(err) {
          if (err) return res.status(500).end(err);
          return res.json({ message: "Success" });
        });
      }
    );
  });
});

// get all appointments for a specific serviceID
app.get("/api/appointments/company/:company", checkCompany, function(
  req,
  res,
  next
) {
  find("appointments", { serviceId: req.params.company }, function(err, data) {
    if (err) return res.status(500).end("Server Error");
    if (!data) {
      return res.json({ appointments: [] });
    }
    return res.json({ appointments: data });
  });
});

// get all appointments for a specific company username
app.get("/api/appointments/company/user/:company", checkCompany, function(
  req,
  res,
  next
) {
  find("appointments", { companyUsername: req.params.company }, function(
    err,
    data
  ) {
    if (err) return res.status(500).end("Server Error");
    if (!data) {
      return res.json({ appointments: [] });
    }
    return res.json({ appointments: data });
  });
});

// get all appointments that match the users name
app.get("/api/appointments/:user", checkUser, isAuthenticated, function(
  req,
  res,
  next
) {
  if (req.params.user != req.session.username)
    return res.status(403).end("forbidden");
  find("appointments", { userId: req.params.user }, function(err, data) {
    if (err) return res.status(500).end("Server Error");
    return res.json({ appointments: data });
  });
});

// delete an appointment
app.delete("/api/appointments/:id", checkId, isAuthenticated, function(
  req,
  res,
  next
) {
  findOne("appointments", { _id: ObjectId(req.params.id) }, function(
    err,
    data
  ) {
    if (err) return res.status(500).end("Server Error");
    if (!data)
      return res
        .status(404)
        .end("Item id #" + req.params.id + " does not exists");
    if (
      data.userId != req.session.username &&
      data.serviceId != req.session.username
    )
      return res.status(403).end("forbidden");
    remove("appointments", { _id: ObjectId(req.params.id) }, function(
      err,
      num
    ) {
      if (err) return res.status(500).end("Server Error");
      return res.json(data);
    });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;
