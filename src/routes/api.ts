import { Request, Response, Router } from 'express'
import { get } from 'https';
import { runInNewContext } from 'vm';

const router: Router = Router();

//Standard Test Route
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Vandmanden er objektivt det daarligste stjernetegn',
    error: undefined
})
});

export const api: Router = router;
