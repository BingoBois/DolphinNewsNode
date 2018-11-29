import { Request, Response, Router } from 'express'
import UserObject from '../types/user';
import { createUser, getUser } from '../controllers/mysql/queries/queries'
import { logError } from '../controllers/elastic/logger';

const router: Router = Router();

router.post('/login', (req: Request, res: Response) => {
    const username: string = req.body.username;
    const password: string = req.body.password;
    getUser(username, password)
        .then((r) => res.json(r))
        .catch((err) => {
            logError(err, 500);
            res.status(500).json({ message: err, error: 500 });
        });
});

router.post('/register', (req: Request, res: Response) => {
    const tempUser: UserObject = req.body;
    createUser(tempUser)
        .then((r) =>
            res.json(
                {
                    message: "Success"
                }
            ))
        .catch((err) => {
            logError(err, 500);
            res.status(500).json({ message: err, error: 500 });
        });
});

export const authRouter: Router = router;
