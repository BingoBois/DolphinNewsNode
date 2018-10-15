import { Request, Response, Router } from 'express'
import {selectAllPostAndComments_ByUser_name, selectAllPostAndComments_ByUser_id,
    selectAllPostAndComments_ByPost_id,
    selectAllPostAndComments_ByPost_title} from '../controllers/mysql/queries/postAndCommentsQueries'; 
const router: Router = Router();

//Retrieves Post and comments by UserName
router.get('/get/byUser/name/:username', (req, res) => {
    let userName= req.params.username;
    selectAllPostAndComments_ByUser_name(userName).then(resu =>{
      res.json({
        Post_And_Comments_By_User_Name: resu
      })
    })
  })

  //Retrieves Post and Comments by UserID
  router.get('/get/byUser/id/:userID', (req, res) => {
    let userID= req.params.userID;
    selectAllPostAndComments_ByUser_id(userID).then(resu =>{
      res.json({
        Post_And_Comments_By_User_Id: resu
      })
    })
  })

  //Retrives Post and comments by PostID
  router.get('/get/byPost/id/:postID', (req, res) => {
      let postID = req.params.postID;
      selectAllPostAndComments_ByPost_id(postID).then(resu =>{
          res.json({
            Post_And_Comments_By_Post: resu
          })
      })
  })

  //Retrives Post and comments by PostTitle
  router.get('/get/byPost/title/:postTitle', (req, res) => {
    
    let postTitle = req.params.postTitle;
    selectAllPostAndComments_ByPost_title(postTitle).then(resu =>{
        res.json({
          Post_And_Comments_By_Post: resu
        })
    })
})



export const postsAndCommentsApi: Router = router;