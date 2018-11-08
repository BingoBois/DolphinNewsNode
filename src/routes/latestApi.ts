import { Request, Response, Router } from 'express'
import { latestDigestedPostNumber } from '../controllers/mysql/queries/queries';
import { resolve } from 'url';
const router: Router = Router();

//Get latestDigested
router.get("/", (req, res) => {
  latestDigestedPostNumber().then((result: any) =>{
      if(result.lastCommentId > result.lastPostId){
        res.statusCode = 200
        res.json(`${result.lastCommentId}`);
      }else if(result.lastPostId > result.lastCommentId){
        res.statusCode = 200
        res.send(`${result.lastPostId}`);
      }
  }).catch(e => res.send(e))
})

export const latestApi: Router = router;
