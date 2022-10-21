const express=require('express');
const app = express();
const helmet = require('helmet');
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const cors = require('cors');
const { readdirSync } = require("fs");
const router = require('./routes/api');


// middlewares
app.use(helmet())
app.use(express.static('public'));
app.use(express.json({limit:'50mb'}))

app.use(express.urlencoded({ extended: false,limit:'50mb' }));
app.use(morgan("dev"));
app.use(cors());

// DB Connection
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("DB Error => ", err));

// routes middleware
// readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)));
app.use("/api/v1",router)
// server
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App is  running on port ${port}`);
});
