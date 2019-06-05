const express = require('express');
const PostsRouter = require('./router.js');

const server=express();




//middleware to use Json on req.body:
server.use(express.json());
server.use('/api/posts', PostsRouter);

server.get('/', (req,res)=> {
    res.send(
        '<h2>welcome to the Lambda blog posts API</h2>' 
    );
})




module.exports=server;