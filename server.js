const express = require('express');
const mongoose = require('mongoose');

const schoolRouter = require("./router/schoolRouter");

const server = express();

server.use(express.json());

mongoose.connect("mongodb://localhost:27017/school-system")
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err))


server.use('/api/v1/school', schoolRouter);

server.listen(5555, () => {
    console.log('Server is running on port 5555');
})