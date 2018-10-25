import { Request, Response, Router } from 'express'
import { selectAllComments, selectGetAllCommentsWithVotes } from '../controllers/mysql/queries/commentsQueries';
import { vote } from '../controllers/mysql/queries/queries'
import VoteObject from '../types/vote'
const router: Router = Router();

//Get all comments with 
router.get('/get/all/withVote', (req, res) => {
  selectGetAllCommentsWithVotes().then(resu => {
    res.json({
      Comments: resu
    })
  })
})

router.get('/get/all', (req, res) => {
  selectAllComments().then(resu => {
    res.json({
      Comments: resu
    })
  })
})

router.post('/vote', (req: Request, res: Response) => {
  const tempVote: VoteObject = req.body;
  tempVote.vote_type = 'comment';
  vote(tempVote);
});

export const commentsApi: Router = router;