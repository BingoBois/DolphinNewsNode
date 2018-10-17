import { Request, Response, Router } from 'express'
import {selectUserFromID, selectAllUsers, selectAllAdmins, selectAllMembers,
 selectUsersAboveKarma, selectUsersBelowKarma} from '../controllers/mysql/queries/userQueries';
const router: Router = Router();

router.get("/get/ByID/:id", (req, res) => {
    let idNumber = req.params.id;
    selectUserFromID(idNumber).then(resu => {
      res.json({
        User: resu
      });
    });
  });
  
  router.get('/get/All', (req, res) => {
    selectAllUsers().then(resu => {
      res.json({
        Users: resu
      })
    })
  })

  router.get('/get/AllAdmin', (req, res) => {
    selectAllAdmins().then(resu => {
      res.json({
        Users: resu
      })
    })
  })

  router.get('/get/AllMembers', (req, res) => {
    selectAllMembers().then(resu => {
      res.json({
        Users: resu
      })
    })
  })

  router.get("/get/ByKarma/Above/:karma", (req, res) => {
    let karmaNumber = req.params.karma;
    selectUsersAboveKarma(karmaNumber).then(resu => {
      res.json({
        User: resu
      });
    });
  });

  router.get("/get/ByKarma/Below/:karma", (req, res) => {
    let karmaNumber = req.params.karma;
    selectUsersBelowKarma(karmaNumber).then(resu => {
      res.json({
        User: resu
      });
    });
  });

  



export const userApi: Router = router;