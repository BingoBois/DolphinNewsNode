import { Request, Response, Router } from 'express'
import {PostObject} from '../types/post'
import UserObject from '../types/user'
import { createUser, getUser, createPost } from '../controllers/mysql/queries/queries'
import {selectPostsFromId,selectAllUsersAndPosts,selectPostsFromTitle,selectSpecificUsersContentCount,selectUserIdFromPost,selectUsernameFromPosts}
     from '../controllers/mysql/queries/postQueries';

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
    const tempPost: PostObject = req.body;
    // check if the given user exists before we let them post
    getUser(tempPost.username, tempPost.pwd_hash).then((r) => {
        // if it doesn't, we're gonna add them to the user pool
        if(r === null){
            const tempUser: UserObject = {
                username: tempPost.username,
                email: tempPost.username,
                password: tempPost.pwd_hash,
                role: 'member',
                karma: 0
            }
            createUser(tempUser).then((r) => {
                // once the user is created, we create the post belonging to that user
                createPost(tempPost);
            })
        }else{
            //if user exists we post anyway, thanks chris
            createPost(tempPost);
        }
    })
});

router.post('/vote', (req: Request, res: Response) => {
    
});

router.get('/get/All/', (req, res) => {
    selectAllUsersAndPosts().then(resu => {
      res.json({
        Post: resu
      })
    })
  })

 router.get('/get/all/commentamount', (req,res) =>{
   selectSpecificUsersContentCount().then(resu =>{
     res.json({
       Post: resu
     })
   })
 }) 


router.get('/get/ByUser/id/:id', (req, res) =>{
  let userID = req.params.id;
  selectUserIdFromPost(userID).then(resu => {
    res.json({
      User: resu
    })
  })
})

router.get('/get/ByUser/name/:name', (req, res) => {
  let userName = req.params.name;
  selectUsernameFromPosts(userName).then(resu => {
    res.json({
      User: resu
    })
  })
})

router.get('/get/byTitle/:title', (req, res) => {
  let postTitle = req.params.title;
  selectPostsFromTitle(postTitle).then(resu => {
    res.json({
      Post: resu
    })
  })
})

router.get('/get/byID/:id', (req, res) => {
  let postID = req.params.id;
  selectPostsFromId(postID).then(resu => {
    res.json({
      Post: resu
    })
  })
})


export const postRouter: Router = router;