import { Request, Response, Router } from 'express'
import {selectUserFromID, selectAllUsers} from '../controllers/mysql/queries';
const router: Router = Router();

router.get("/getByID/:id", (req, res) => {
    let idNumber = req.params.id;
    selectUserFromID(idNumber).then(resu => {
      res.json({
        User: resu
      });
    });
  });
  
  router.get('/getAll', (req, res) => {
    selectAllUsers().then(resu => {
      res.json({
        Users: resu
      })
    })
  })

export const user: Router = router;