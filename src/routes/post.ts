import { Request, Response, Router } from 'express'
import { PostObject } from '../types/post'
import VoteObject from '../types/vote'
import UserObject from '../types/user'
import { createUser, getUser, createPost, createNonHelgePost } from '../controllers/mysql/queries/queries'
import {selectPostsFromId,selectAllUsersAndPosts,selectPostsFromTitle,showPostCommentAmount
  ,selectUserIdFromPost,selectUsernameFromPosts, showPostVotes}
     from '../controllers/mysql/queries/postQueries';
import { getPosts, vote, unVote, countComment, getPostVotes } from '../controllers/mysql/queries/queries'
 
 
const router: Router = Router();
 
router.post('/', (req: Request, res: Response) => {
  const tempPost: PostObject = {
      id: -1,
      hanesst_id: req.body.hanesst_id,
      post_parent: req.body.post_parent,
      post_text: req.body.post_text,
      post_title: req.body.post_title,
      post_type: req.body.post_type,
      post_url: req.body.post_url,
      pwd_hash: req.body.pwd_hash,
      username: req.body.username,
      time: ""
  }
  console.log(tempPost)
  // check if the given user exists before we let them post
  getUser(tempPost.username, tempPost.pwd_hash).then(r => {
      if(r){
          console.log("User exists")
          createPost(tempPost).then(r => {
              res.statusCode = 200;
                  res.json({
                      message: "Success"
                  })
          }).catch(e => console.log(e))
      }else{
          let tempUser: UserObject = {
              email: null,
              karma: 0,
              password: tempPost.pwd_hash,
              role: "member",
              username: tempPost.username
          }
          createUser(tempUser).then(r => {
              createPost(tempPost).then(r => {
                  res.statusCode = 200;
                  res.json({
                      message: "Success"
                  })
              }).catch(e => console.log(e))
          }).catch(e => console.log("Error creating user" + e))
      }
  });
});

//Used for posting new Stories and comments from the Frontend, in which the hanesst_id is set to 0 from the frontend
router.post('/nonhelge', (req: Request, res: Response) => {
    const tempPost: PostObject = {
        id: -1,
        hanesst_id: req.body.hanesst_id,
        post_parent: req.body.post_parent,
        post_text: req.body.post_text,
        post_title: req.body.post_title,
        post_type: req.body.post_type,
        post_url: req.body.post_url,
        pwd_hash: req.body.pwd_hash,
        username: req.body.username,
        time: ""
    }
    console.log(tempPost)
    // check if the given user exists before we let them post
    getUser(tempPost.username, tempPost.pwd_hash).then(r => {
        if(r){
            console.log("User exists")
            createNonHelgePost(tempPost).then(r => {
                res.statusCode = 200;
                    res.json({
                        message: "Success"
                    })
            }).catch(e => console.log(e))
        }else{
            let tempUser: UserObject = {
                email: null,
                karma: 0,
                password: tempPost.pwd_hash,
                role: "member",
                username: tempPost.username
            }
            createUser(tempUser).then(r => {
                createNonHelgePost(tempPost).then(r => {
                    res.statusCode = 200;
                    res.json({
                        message: "Success"
                    })
                }).catch(e => console.log(e))
            }).catch(e => console.log("Error creating user" + e))
        }
    });
  });
 
router.post('/vote', (req: Request, res: Response) => {
  const tempVote: VoteObject = req.body;
  tempVote.vote_type = 'post';
  tempVote.amount = 1;
  vote(tempVote);
});
 
 
router.delete('/unvote/userId/:userId/postId/:postId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  const postId = req.params.postId;
  const vote_type = 'post';
  unVote(userId, postId, vote_type);
});
 
router.post('/getPosts', (req: Request, res: Response) => {
    console.log("Getting posts amount " + req.body.index)
    getPosts(req.body.index, req.body.amount).then(r => {
        res.statusCode = 200;
        res.json({
            posts: r
        })
    }).catch((e) => {
        res.statusCode = 500;
        res.json({
            error: 500
        })
    })
})
 
router.post('/getVotes', (req: Request, res: Response) => {
    getPostVotes(req.body.postId).then(r => {
        res.statusCode = 200;
        res.json(r)
    }).catch((e) => {
        res.statusCode = 500;
        res.json({
            error: 500
        })
    })
})
 
router.post('/getCommentAmount', (req: Request, res: Response) => {
    console.log("Getting comment amount")
    countComment(req.body.postId).then(r => {
        res.statusCode = 200;
        res.json(r)
    }).catch((e) => {
        res.statusCode = 500;
        res.json({
            error: 500
        })
    })
})
 
router.get('/get/all/', (req, res) => {
    selectAllUsersAndPosts().then(resu => {
      res.json(JSON.stringify(resu));
    })
  })
 
  router.get('/get/all/postwithvotes', (req, res) => {
    showPostVotes().then(resu => {
      res.json(JSON.stringify(resu));
    })
  })
 
 router.get('/get/all/commentamount', (req,res) =>{
   showPostCommentAmount().then(resu =>{
    res.json(JSON.stringify(resu));
   })
 })
 
 
router.get('/get/byuser/id/:id', (req, res) =>{
  let userID = req.params.id;
  selectUserIdFromPost(userID).then(resu => {
    res.json(JSON.stringify(resu));
  })
})
 
router.get('/get/byuser/name/:name', (req, res) => {
  let userName = req.params.name;
  selectUsernameFromPosts(userName).then(resu => {
    res.json(JSON.stringify(resu));
  })
})
 
router.get('/get/bytitle/:title', (req, res) => {
  let postTitle = req.params.title;
  selectPostsFromTitle(postTitle).then(resu => {
    res.json(JSON.stringify(resu));
  })
})
 
router.get('/get/byid/:id', (req, res) => {
  let postID = req.params.id;
  selectPostsFromId(postID).then(resu => {
    res.json(JSON.stringify(resu));
  })
})
 
 
export const postRouter: Router = router;
