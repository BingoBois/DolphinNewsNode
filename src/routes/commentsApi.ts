import { Request, Response, Router } from 'express'
import { selectAllComments, selectGetAllCommentsWithVotes, selectAllCommentsFromPostId } from '../controllers/mysql/queries/commentsQueries';
import { vote, unVote, selectAllVotedCommentIdsByUserId } from '../controllers/mysql/queries/voteQueries';
import VoteObject from '../types/vote';
const router: Router = Router();

//Get all comments with
router.get('/get/all/withvote', (req: Request, res: Response) => {
  selectGetAllCommentsWithVotes().then(resu => {
    res.json(JSON.stringify(resu));
  })
});

router.get('/get/all', (req: Request, res: Response) => {
  selectAllComments().then(resu => {
    res.json(JSON.stringify(resu));
  })
});

router.get('/get/bypost/:id', (req: Request, res: Response) => {
  selectAllCommentsFromPostId(req.params.id).then(resu => {
    res.json(JSON.stringify(resu));
  })
});

// API-endpoint for voting a comment - recieves a vote in the request body and forwards it to "vote" in voteQueries.ts
router.post('/vote', (req: Request, res: Response) => {
  const tempVote: VoteObject = req.body;
  tempVote.vote_type = 'comment';
  tempVote.amount = 1;
  vote(tempVote)
    .then(() => res.json({ succes: true }))
    .catch((e) => {
      res.statusCode = 500;
      res.json({
        error: 500
      })
    })
});

// API-endpoint for deleting a comment vote - recieves a user ID and a comment ID as params in the URL and forwards these to "unvote" in voteQueries.ts
router.delete('/unvote/userId/:userId/commentId/:commentId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  const commentId = req.params.commentId;
  const vote_type = 'comment';
  unVote(userId, commentId, vote_type)
    .then(() => res.json({ succes: true }))
    .catch((e) => {
      res.statusCode = 500;
      res.json({
        error: 500
      })
    })
});

// API-endpoint for getting post IDs for all voted comments for a specific user - recieves an user ID as param in the URL, forwards it to "selectAllVotedCommentIdsByUserId" in voteQueries.ts and gets a list with comment IDs of all voted comments in return
router.get('/get/all/commentIds/userId/:userId', (req, res) => {
  const userId = req.params.userId;
  let commentIds: Array<number> = [];
  selectAllVotedCommentIdsByUserId(userId)
    //@ts-ignore
    .then(result => result.forEach(element => {
      commentIds.push(element.fk_comment);
    }))
    .then(() => res.json(commentIds))
    .catch((e) => {
      res.statusCode = 500;
      res.json({
        error: 500
      })
    });
})

export const commentsApi: Router = router;
