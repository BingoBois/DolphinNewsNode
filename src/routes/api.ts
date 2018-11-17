import { Request, Response, Router } from 'express'
import { get } from 'https';
import { runInNewContext } from 'vm';
import { logMessage } from '../controllers/elastic/logger';

const router: Router = Router();

//Standard Test Route
router.get('/', (req: Request, res: Response) => {
  logMessage('Visit on frontpage');
  res.json({
    message: 'Fisken er objektivt det daarligste stjernetegn',
    error: undefined
  })
});

export const api: Router = router;
