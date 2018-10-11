import { Request, Response, Router } from 'express'
import {PostObject} from '../types/post'
import UserObject from '../types/user'
import { createUser, getUser, createPost } from '../controllers/mysql/queries'

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
    const tempPost: PostObject = req.body;
    // check if the given user exists before we let them post
    getUser(tempPost.username, tempPost.pwd_hash).then((r) => {
        // if it doesn't, we're gonna add them to the user pool
        if(r === null){
            const tempUser: UserObject = {
                username: tempPost.username,
                email: tempPost.username,
                password: tempPost.pwd_hash,
                role: 'member',
                karma: 0
            }
            createUser(tempUser).then((r) => {
                // once the user is created, we create the post belonging to that user
                createPost(tempPost);
            })
        }else{
            //if user exists we post anyway, thanks chris
            createPost(tempPost);
        }
    })
});

router.post('/vote', (req: Request, res: Response) => {
    
});


export const postRouter: Router = router;