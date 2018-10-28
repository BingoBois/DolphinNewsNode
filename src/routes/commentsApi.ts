import { Request, Response, Router } from 'express'
import { selectAllComments, selectGetAllCommentsWithVotes } from '../controllers/mysql/queries/commentsQueries';
import { vote, unVote } from '../controllers/mysql/queries/queries'
import VoteObject from '../types/vote'
const router: Router = Router();

//Get all comments with 
router.get('/get/all/withvote', (req, res) =>{
    
    selectGetAllCommentsWithVotes().then(resu => {
      res.json(JSON.stringify(resu));

    })
  })
})

router.get('/get/all', (req, res) =>{
    
    selectAllComments().then(resu => {
      res.json(JSON.stringify(resu));
    })
  })
})

router.post('/vote', (req: Request, res: Response) => {
  const tempVote: VoteObject = req.body;
  tempVote.vote_type = 'comment';
  vote(tempVote);
});

router.delete('/unvote/id/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const vote_type = 'comment';
  unVote(id, vote_type);
});

export const commentsApi: Router = router;