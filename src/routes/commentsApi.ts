import { Request, Response, Router } from 'express'
import {selectAllComments, selectGetAllCommentsWithVotes} from '../controllers/mysql/queries/commentsQueries';
const router: Router = Router();

//Get all comments with 
router.get('/get/all/withVote', (req, res) =>{
    
    selectGetAllCommentsWithVotes().then(resu => {
      res.json({
        Comments: resu
      })
    })
  })


router.get('/get/all', (req, res) =>{
    
    selectAllComments().then(resu => {
      res.json({
        Comments: resu
      })
    })
  })



export const commentsApi: Router = router;