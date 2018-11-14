import { Request, Response, Router } from 'express'
import { selectAllComments, selectGetAllCommentsWithVotes, selectAllCommentsFromPostId } from '../controllers/mysql/queries/commentsQueries';
import { vote, unVote } from '../controllers/mysql/queries/voteQueries';
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

export const commentsApi: Router = router;
