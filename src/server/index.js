//const http = require("http");
const https = require("https");
const app = require("./app");
const fs = require("fs");
const dotenv = require("dotenv").config();

// create the sever and listen on that port
const port = /* process.env.PORT || */ 3000;
//const server = http.createServer(app);

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
  }, app).listen(port, () => {
    console.log('Listening...')
  })