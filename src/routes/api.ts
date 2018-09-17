import { Request, Response, Router } from 'express'
import { bingo, computerspil } from "../controllers/status";
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  computerspil(req, res);  
});

router.get('/bingo', (req: Request, res: Response) => {
  bingo(req, res);
});

export const Api: Router = router;
