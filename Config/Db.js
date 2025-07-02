const chalk = require("chalk");
const mongoose = require("mongoose");


const uri = process.env.DB_URI || "mongodb://127.0.0.1:27017";
const connectToDb = () => {
  mongoose
    .connect(uri, { dbName: "ripple" })
    .then(() => {
      console.log(chalk.bgGreenBright(chalk.yellow("successfully connect to databse")));
    })
    .catch((err) => {
      console.log(chalk.bgRed("failes to connect database " + err));
    });
};

module.exports = connectToDb;
