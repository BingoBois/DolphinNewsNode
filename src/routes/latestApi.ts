import { Request, Response, Router } from 'express'
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Buy 12 bread',
    error: undefined
})
});

export const latestApi: Router = router;
