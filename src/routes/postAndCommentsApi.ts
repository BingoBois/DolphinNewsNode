import { Request, Response, Router } from 'express'
import {selectAllContentByPostId, selectAllContentByPostTitle,
   selectAllContentByUserId, selectAllContentByUsername} from '../controllers/mysql/queries/postAndCommentsQueries'; 
const router: Router = Router();

//Retrieves Post and comments by UserName
router.get('/get/byUser/name/:username', (req, res) => {
    let userName= req.params.username;
    selectAllContentByUsername(userName).then(resu =>{
      res.json({
        Post_And_Comments_By_User_Name: resu
      })
    })
  })

  //Retrieves Post and Comments by UserID
  router.get('/get/byUser/id/:userID', (req, res) => {
    let userID= req.params.userID;
    selectAllContentByUserId(userID).then(resu =>{
      res.json({
        Post_And_Comments_By_User_Id: resu
      })
    })
  })

  //Retrives Post and comments by PostID
  router.get('/get/byPost/id/:postID', (req, res) => {
      let postID = req.params.postID;
      selectAllContentByPostId(postID).then(resu =>{
          res.json({
            Post_And_Comments_By_Post: resu
          })
      })
  })

  //Retrives Post and comments by PostTitle
  router.get('/get/byPost/title/:postTitle', (req, res) => {
    
    let postTitle = req.params.postTitle;
    selectAllContentByPostTitle(postTitle).then(resu =>{
        res.json({
          Post_And_Comments_By_Post: resu
        })
    })
})



export const postsAndCommentsApi: Router = router;