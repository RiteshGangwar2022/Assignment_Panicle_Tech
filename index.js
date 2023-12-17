const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const employeeRoutes = require("./routes/employee");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
//we need to include env file only in serverjs
dotenv.config();
//to connect backend to database
const connectdb = require("./Database/DBconnection");
connectdb();
app.use(bodyParser.json());

app.use(cors());

// Employee routes
app.use("/api/employee", employeeRoutes);


//to hanlde error cause to due to hitting of api which does not exist
app.use(notFound);
app.use(errorHandler);


//getting port from env file
const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log("server is running on port ");
});
