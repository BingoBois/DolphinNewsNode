import { Request, Response, Router } from 'express'
import {latestDigestedPostNumber} from '../controllers/mysql/queries';
import { resolve } from 'url';
const router: Router = Router();

router.get('/standard', (req: Request, res: Response) => {
  res.json({
    message: 'Buy 12 bread',
    error: undefined
})
});

//Get latestDigested
router.get("/", (req, res) => {
  latestDigestedPostNumber().then(resu => 
    res.json({
      message: resu
    }));
  
})



export const latestApi: Router = router;
