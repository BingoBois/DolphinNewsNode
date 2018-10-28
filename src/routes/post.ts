import { Request, Response, Router } from 'express'
import { PostObject } from '../types/post'
import VoteObject from '../types/vote'
import UserObject from '../types/user'

import { createUser, getUser, createPost } from '../controllers/mysql/queries/queries'
import {selectPostsFromId,selectAllUsersAndPosts,selectPostsFromTitle,showPostCommentAmount
  ,selectUserIdFromPost,selectUsernameFromPosts, showPostVotes}
     from '../controllers/mysql/queries/postQueries';
import { getPosts, vote, unVote, countComment, getPostVotes } from '../controllers/mysql/queries/queries'

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
  const tempPost: PostObject = req.body;
  // check if the given user exists before we let them post
  getUser(tempPost.username, tempPost.pwd_hash).then((r: any) => {
    // if it doesn't, we're gonna add them to the user pool
    if (r === null) {
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
    } else {
      //if user exists we post anyway, thanks chris
      createPost(tempPost);
    }
  })
});

router.post('/vote', (req: Request, res: Response) => {
  const tempVote: VoteObject = req.body;
  tempVote.vote_type = 'post';
  vote(tempVote);
});


router.delete('/unvote/id/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const vote_type = 'post';
  unVote(id, vote_type).then(result => {
    res.json({ succes: true })
  })
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

router.get('/get/all/commentamount', (req, res) => {
  showPostCommentAmount().then(resu => {

    res.json(JSON.stringify(resu));
  })
})

router.get('/get/byuser/id/:id', (req, res) => {
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