import { Request, Response, Router } from 'express'
import { latestDigestedPostNumber } from '../controllers/mysql/queries/queries';
import { resolve } from 'url';
const router: Router = Router();

//Get latestDigested
router.get("/", (req, res) => {
  latestDigestedPostNumber().then(result =>
   res.send(`${result}`)
    ).catch(e => {
      console.log(e)
    });

})

export const latestApi: Router = router;
