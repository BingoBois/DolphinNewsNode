import { Request, Response, Router } from 'express'
import { PostObject } from '../types/post'
import VoteObject from '../types/vote'
import UserObject from '../types/user'
import { createUser, getUser, createPost } from '../controllers/mysql/queries/queries'
import {
  selectPostsFromId, selectAllUsersAndPosts, selectPostsFromTitle, showPostCommentAmount
  , selectUserIdFromPost, selectUsernameFromPosts, showPostVotes, createNonHelgePost
}
  from '../controllers/mysql/queries/postQueries';
import { getPosts, countComment, getPostVotes } from '../controllers/mysql/queries/queries'
import { vote, unVote, selectAllVotedPostIdsByUserId } from '../controllers/mysql/queries/voteQueries'
import { logError } from '../controllers/elastic/logger';


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
    if (r) {
      console.log("User exists")
      createPost(tempPost).then(r => {
        res.statusCode = 200;
        res.json({
          message: "Success"
        })
      }).catch((err) => {
        logError(err, 500);
        res.status(500).json({ message: err, error: 500 });
      });
    } else {
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
        }).catch((err) => {
          logError(err, 500);
          res.status(500).json({ message: err, error: 500 });
        });
      }).catch((err) => {
        logError(err, 500);
        res.status(500).json({ message: err, error: 500 });
      });
    }
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
});

// API-endpoint for posting new posts from the frontend
router.post('/nonhelge', (req: Request, res: Response) => {
  const tempPost = {
    userId: req.body.userId,
    postTitle: req.body.postTitle,
    postURL: req.body.postURL,
    postText: req.body.postText,
  }
  createNonHelgePost(tempPost)
    .then(() => {
      res.statusCode = 200;
      res.json({
        message: "Success"
      });
    }).catch(err => {
      logError(err, 500);
      res.status(500).json({ message: err, error: 500 });
    });
});

// API-endpoint for voting a post - recieves a vote in the request body and forwards it to "vote" in voteQueries.ts
router.post('/vote', (req: Request, res: Response) => {
  const tempVote: VoteObject = req.body;
  tempVote.vote_type = 'post';
  tempVote.amount = 1;
  vote(tempVote)
    .then(() => res.json({ succes: true }))
    .catch((err) => {
      logError(err, 500);
      res.status(500).json({ message: err, error: 500 });
    });
});

// API-endpoint for deleting a post vote - recieves an user ID and an post ID as params in the URL and forwards these to "unvote" in voteQueries.ts
router.delete('/unvote/userId/:userId/postId/:postId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  const postId = req.params.postId;
  const vote_type = 'post';
  unVote(userId, postId, vote_type)
    .then(() => res.json({ succes: true }))
    .catch((err) => {
      logError(err, 500);
      res.status(500).json({ message: err, error: 500 });
    });
});

// API-endpoint for getting post IDs for all voted posts for a specific user - recieves an user ID as param in the URL, forwards it to "selectAllVotedPostIdsByUserId" in voteQueries.ts and gets a list with post IDs of all voted posts in return
router.get('/get/all/postIds/userId/:userId', (req, res) => {
  const userId = req.params.userId;
  let postIds: Array<number> = [];
  selectAllVotedPostIdsByUserId(userId)
    //@ts-ignore
    .then(result => result.forEach(element => {
      postIds.push(element.fk_post);
    }))
    .then(() => res.json(postIds))
    .catch((e) => {
      res.statusCode = 500;
      res.json({
        error: 500
      })
    });
})

router.post('/getPosts', (req: Request, res: Response) => {
  console.log("Getting posts amount " + req.body.index)
  getPosts(req.body.index, req.body.amount).then(r => {
    res.statusCode = 200;
    res.json({
      posts: r
    })
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
})

router.post('/getVotes', (req: Request, res: Response) => {
  getPostVotes(req.body.postId).then(r => {
    res.statusCode = 200;
    res.json(r)
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
})

router.post('/getCommentAmount', (req: Request, res: Response) => {
  console.log("Getting comment amount")
  countComment(req.body.postId).then(r => {
    res.statusCode = 200;
    res.json(r)
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
})

router.get('/get/all/', (req, res) => {
  selectAllUsersAndPosts().then(resu => {
    res.json(JSON.stringify(resu));
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
})

router.get('/get/all/postwithvotes', (req, res) => {
  showPostVotes().then(resu => {
    res.json(JSON.stringify(resu));
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
})

router.get('/get/all/commentamount', (req, res) => {
  showPostCommentAmount().then(resu => {
    res.json(JSON.stringify(resu));
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
})


router.get('/get/byuser/id/:id', (req, res) => {
  let userID = req.params.id;
  selectUserIdFromPost(userID).then(resu => {
    res.json(JSON.stringify(resu));
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
})

router.get('/get/byuser/name/:name', (req, res) => {
  let userName = req.params.name;
  selectUsernameFromPosts(userName).then(resu => {
    res.json(JSON.stringify(resu));
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
})

router.get('/get/bytitle/:title', (req, res) => {
  let postTitle = req.params.title;
  selectPostsFromTitle(postTitle).then(resu => {
    res.json(JSON.stringify(resu));
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
})

router.get('/get/byid/:id', (req, res) => {
  let postID = req.params.id;
  selectPostsFromId(postID).then(resu => {
    res.json(JSON.stringify(resu));
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
})

export const postRouter: Router = router;
