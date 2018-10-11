import { Request, Response, Router } from 'express'
import UserObject from '../types/user';
import { createUser, getUser } from '../controllers/mysql/queries'

const router: Router = Router();

router.post('/login', (req: Request, res: Response) => {
    const username:string = req.body.username;
    const password:string = req.body.password;
    getUser(username, password).then((r) => res.json(r))
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
        .catch((err) => res.json({ message: "error" }))
});

export const authRouter: Router = router;