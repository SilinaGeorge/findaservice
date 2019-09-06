const mongoose = require("mongoose");

// create the collection for appointments
const Schema = mongoose.Schema;
const Aptschema = new Schema({
  to: String,
  from: String,
  userId: String,
  serviceId: String,
  date: String,
  company: String,
  email: String,
  phonenumber: String,
  name: String,
  companyUsername: String
});

const Appointments = mongoose.model("Appointments", Aptschema);

module.exports = Appointments;
