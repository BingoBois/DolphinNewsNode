import { Request, Response, Router } from 'express'
import {selectAllContentByPostId, selectAllContentByPostTitle,
   selectAllContentByUserId, selectAllContentByUsername} from '../controllers/mysql/queries/postAndCommentsQueries'; 
const router: Router = Router();

//Retrieves Post and comments by the UserName
router.get('/get/byuser/name/:username', (req, res) => {
    let userName= req.params.username;
    selectAllContentByUsername(userName).then(resu =>{
      res.json(JSON.stringify(resu));
    })
  })

  //Retrieves Post and Comments by UserID
  router.get('/get/byuser/id/:userid', (req, res) => {
    let userID= req.params.userid;
    selectAllContentByUserId(userID).then(resu =>{
      res.json(JSON.stringify(resu));
    })
  })

  //Retrives Post and comments by PostID
  router.get('/get/bypost/id/:postid', (req, res) => {
      let postID = req.params.postid;
      selectAllContentByPostId(postID).then(resu =>{
        res.json(JSON.stringify(resu));
      })
  })

  //Retrives Post and comments by PostTitle
  router.get('/get/bypost/title/:posttitle', (req, res) => {
    
    let postTitle = req.params.posttitle;
    selectAllContentByPostTitle(postTitle).then(resu =>{
      res.json(JSON.stringify(resu));
    })
})



export const postsAndCommentsApi: Router = router;