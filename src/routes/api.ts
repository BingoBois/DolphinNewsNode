import { Request, Response, Router } from 'express'
import {latestDigestedPostNumber} from '../controllers/mysql/queries';


const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello and welcome to my guide',
    error: undefined
})
});

//Alive check
router.get('/status', (req, res) => {
  res.status(200).send("Alive");
});

//Get latestDigested
router.get("/latest", (req, res) => {
  let result = latestDigestedPostNumber();
  console.log(result);
  //res.status(200).send(result);
  res.json({
    message: result
  })
})

export const api: Router = router;
