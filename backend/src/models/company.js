const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema({
  Id: String,
  Company: String,
  "About Company": String,
  "CTC(in Lakhs)": {
    type: String,
    default: "Not Revealed",
  },
  CGPA: {
    type: String,
    default: "NA",
  },
  "Job Profile": String,
  Venue: String,
});

module.exports = mongoose.model("Company", companySchema);