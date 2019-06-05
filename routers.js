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
//   - If the _post_ with the specified `id` is not found:
//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.


router.get('/:id', async (req, res)=> {
    try {
        const post = await Posts.findById(req.params.id);
        if (post) {
            res.status(200).json(post);
          } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
          }
          return

    }
    catch(err){
        res.status(404).json({
            message: "The post with the specified ID does not exist." 
          });
    }

    
})

//GET the comments for the specific blog post id
// If the _post_ with the specified `id` is not found:
//     - return HTTP status code `404` (Not Found).
//     - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

// - If there's an error in retrieving the _comments_ from the database:
//     - cancel the request.
//     - respond with HTTP status code `500`.
//     - return the following JSON object: `{ error: "The comments information could not be retrieved." }`.

router.get('/:id/comments', async (req, res) =>{

    try {
       const post = await Posts.findById(req.params.id);

        if (post) {
           
            const comments = await Posts.findPostComments(req.params.id);
            
            if (comments) {

                res.status(200).json(comments);

             }
            else {
                res.status(500).json({ error: "The comments information could not be retrieved." });
                
                return

            }
            
          } 
          
          else {
              
            res.status(404).json({ message: "The post with the specified ID does not exist." });

            return
            
          }    

    }
    catch(err){
        res.status(404).json({
            message: "The post with the specified ID does not exist." 
          });
    }

})

// ****** POSTS ********** //

// create a new blogpost 
router.post('/', async (req, res) => {
    try {
      const post = await Posts.insert(req.body);      

        if(!req.body.contents || !req.body.title){

            res.status(400).json({ errorMessage: "Please provide title and contents for the post."});
            
            return
        }
        else {
            res.status(201).json(post);
        }

    } 
    
    catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database" 
      });
    }

})

// create comment for the blog post at specific id
router.post('/:id', async (req, res) => {

    try { 
        
         const post = await Posts.findById(req.params.id)

        if (post) {
            
            const comment = await post.insertComment(req.body)
        
            if(!req.body.text){

                res.status(400).json({ errorMessage: "Please provide text for the comment."});
                
                return
            }
            else {
                res.status(201).json(comment);
            }

    } 
    
    catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database" 
      });
    }

})

//****** DELETE*****//

//DELETE the post with the specific ID
router.delete('/:id', async (req, res)=>{
    try {
        const count = await Posts.remove(req.params.id);

        if (count > 0) {
          res.status(200).json({ message: 'The post has been deleted' });
        } 
        else {
          res.status(404).json({ message: "The post with the specified ID does not exist." });
          return
        }

      } catch (error) {
        // log error to database
        res.status(500).json({
            error: 'The post could not be removed',
        });
      }

})


//***** UPDATE*****//

//UPDATE post with specific ID:
// CHECK THIS WITH SOLUTION CODE 

router.put('/:id', async (req, res)=>{
    //grab the id from the url
    try {
        const post = await Posts.update(req.params.id, req.body);

        if (post) {

            if(!req.body.contents || !req.body.title){

                res.status(400).json({ errorMessage: "Please provide title and contents for the post."});
                
                return
            }
            else {
                res.status(200).json(post);

            }
         
        } 
        
        else {
          res.status(404).json({ message: "The post with the specified ID does not exist."});
          return

        }
      } catch (error) {
        // log error to database
        
        res.status(500).json({
            error: "The post information could not be modified.",
        });
      }

})


module.exports= router;