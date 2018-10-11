import { Request, Response, Router } from 'express'
import { get } from 'https';
import { runInNewContext } from 'vm';

const router: Router = Router();


router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello and welcome to my guide',
    error: undefined
})
});

export const api: Router = router;
