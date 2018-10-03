import { Request, Response, Router } from 'express'
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Det er tid',
    error: undefined
})
});

export const Api: Router = router;
