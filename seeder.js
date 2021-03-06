const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Load env vars

dotenv.config({ path: "./config/config.env" });

//Load models
const Bootcamp = require("./model/Bootcamp");
const Course = require("./model/Course");

//connect to Db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//Read JSOn file
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

//import JSON file into db
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);

    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Delete Data

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();

    console.log("Data destroyed..");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
