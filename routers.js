const db = require('./data/db.js');

const express = require('express');

const router=express.Router();


//GET ALL BLOG POSTS

router.get('/', async (req, res)=>{
    try {

    }
    catch (error) {

    }

})

//GET the specific blog post id

router.get('/:id', (req, res)=>{

    //grab the id from the url
    const { id } = req.params;
    
    //the below returns all users with the specified id
    db.findById(id)
    //then we feed what was returned into .then
    .then(user => {
        if(user){
            res.json(user)
        }
        else{
            res.status(404).json({
                success:false,
                message:'The user with the specified ID does not exist.',
            })
        }
    })
    .catch(err => {
        res.status(404).json({
            success:false,
            message
        })
    })

})

//GET the comments for the specific blog post id

router.get('/:id/comments', (req, res)=>{

    //grab the id from the url
    const { id } = req.params;
    
    //the below returns all users with the specified id
    db.findById(id)
    //then we feed what was returned into .then
    .then(user => {
        if(user){
            res.json(user)
        }
        else{
            res.status(404).json({
                success:false,
                message:'The user with the specified ID does not exist.',
            })
        }
    })
    .catch(err => {
        res.status(404).json({
            success:false,
            message
        })
    })

})

// ****** POSTS ********** //

// create a new blogpost 
router.post('/', (req, res) =>{
    //grab the id from the url
    const user=req.body;
    if(!user.name | !user.bio){
        res.status(400).json({
            success:false,
            message:'Please provide name and bio for the user.'
        })
        return;
    }
    db.insert(user)
    .then(newUser => {
        if(newUser){
            res.status(201).json(newUser);
        }
        else{
            res.status(500).json({
                success:false,
                message:"There was an error while saving the user to the database"
            })
            return
        }
    })
    .catch(err => {
        res.status(404).json({
            success:false,
            message
        })
    })

})

// create comment for the blog post at specific id
router.post('/:id/comments', (req, res) =>{
    //grab the id from the url
    const user=req.body;
    if(!user.name | !user.bio){
        res.status(400).json({
            success:false,
            message:'Please provide name and bio for the user.'
        })
        return;
    }
    db.insert(user)
    .then(newUser => {
        if(newUser){
            res.status(201).json(newUser);
        }
        else{
            res.status(500).json({
                success:false,
                message:"There was an error while saving the user to the database"
            })
            return
        }
    })
    .catch(err => {
        res.status(404).json({
            success:false,
            message
        })
    })

})

//****** DELETE*****//

//DELETE the post with the specific ID
router.delete('/:id', (req, res)=>{

    //grab the id from the url
    const { id } = req.params;
    
    //the below returns all users with the user at specific id removed
    db.remove(id)
    //then we feed what was returned into .then
    .then(deletedUser => {
        if(deletedUser){
            res.json(deletedUser)
        }
        else{
            res.status(404).json({
                success:false,
                message:'The user with the specified ID does not exist.',
            })
        }
    })
    .catch(err => {
        res.status(404).json({
            success:false,
            message
        })
    })

})


//***** UPDATE*****//

//UPDATE post with specific ID
router.put('/:id', (req, res)=>{
    //grab the id from the url
    const { id } = req.params;
    const user=req.body;
    if (!user){
        res.status(404).json({
            success:false,
            message:'The user with the specified ID does not exist.'
        })
        return;

    }
    else if(!user.name | !user.bio){
        res.status(400).json({
            success:false,
            message:'Please provide name and bio for the user.'
        })
        return;
    }
    
    db.update(id,user)
    .then(updatedUser => {
        if(updatedUser){
            res.status(200).json(updatedUser)
        }
        else{
            res.status(500).json({
                success:false,
                message:'The user with the specified ID does not exist.',
            })
            return
        }
    })
    .catch(err => {
        res.status(500).json({
            success:false,
            message
        })
    })

})


module.exports= router;