import { Request, Response, Router } from 'express'
import { latestDigestedPostNumber } from '../controllers/mysql/queries/queries';
import { resolve } from 'url';
const router: Router = Router();

//Get latestDigested
router.get("/", (req, res) => {
  latestDigestedPostNumber().then(resu =>
    res.json({
      message: resu
    }));

})

export const latestApi: Router = router;