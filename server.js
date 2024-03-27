const express = require('express');

const userRouter = require("./router/userRouter");

const server = express();

server.use(express.json());


server.use('/api/v1/users', userRouter);

server.listen(5555, ()=>{
    console.log('Server is running on port 5555');
})