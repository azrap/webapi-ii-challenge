const Posts = require('./data/db.js');

const express = require('express');

const router=express.Router();


//GET ALL BLOG POSTS

router.get('/', async (req, res)=>{
    try {
        const posts= await Posts.find(req.query)
        //not sure why we are using req.query?
        res.status(200).json(posts);
    }
    catch (err) {
        // log error to database
        console.log(err);
        res.status(500).json({
          error: 'The posts information could not be retrieved.',
        });
      }
    });

//GET the specific blog post id

router.get('/:id', async (req, res)=> {
    try {

    }

    catch(err){

    }

    
})

//GET the comments for the specific blog post id

router.get('/:id/comments', (req, res)=>{

   try {
    

    }

    catch(err){
        
    }

})

// ****** POSTS ********** //

// create a new blogpost 
router.post('/', (req, res) =>{
    try {
    

    }

    catch(err){
        
    }

})

// create comment for the blog post at specific id
router.post('/:id/comments', (req, res) =>{
    try {
    

    }

    catch(err){
        
    }
   

})

//****** DELETE*****//

//DELETE the post with the specific ID
router.delete('/:id', (req, res)=>{

    //grab the id from the url
    try {
    

    }

    catch(err){
        
    }

})


//***** UPDATE*****//

//UPDATE post with specific ID
router.put('/:id', (req, res)=>{
    //grab the id from the url
    try {
    

    }

    catch(err){
        
    }

})


module.exports= router;