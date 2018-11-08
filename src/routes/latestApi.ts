import { Request, Response, Router } from 'express'
import { latestDigestedPostNumber } from '../controllers/mysql/queries/queries';
import { resolve } from 'url';
const router: Router = Router();

//Get latestDigested
router.get("/", (req, res) => {
  latestDigestedPostNumber().then((result: any) =>{
      res.send(`${Math.max(result.lastCommentId, result.lastPostId)}`);
  }).catch(e => res.send(0))
})

export const latestApi: Router = router;
