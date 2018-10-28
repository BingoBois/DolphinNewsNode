import { Request, Response, Router } from 'express'
import {selectUserFromID, selectAllUsers, selectAllAdmins, selectAllMembers,
 selectUsersAboveKarma, selectUsersBelowKarma} from '../controllers/mysql/queries/userQueries';
const router: Router = Router();

router.get("/get/byid/:id", (req, res) => {
    let idNumber = req.params.id;
    selectUserFromID(idNumber).then(resu => {
      res.json(JSON.stringify(resu));
    });
  });
  
  router.get('/get/all', (req, res) => {
    selectAllUsers().then(resu => {
      res.json(JSON.stringify(resu));
    })
  })

  router.get('/get/alladmin', (req, res) => {
    selectAllAdmins().then(resu => {
      res.json(JSON.stringify(resu));
    })
  })

  router.get('/get/allmembers', (req, res) => {
    selectAllMembers().then(resu => {
      res.json(JSON.stringify(resu));
    })
  })

  router.get("/get/bykarma/above/:karma", (req, res) => {
    let karmaNumber = req.params.karma;
    selectUsersAboveKarma(karmaNumber).then(resu => {
      res.json(JSON.stringify(resu));
    });
  });

  router.get("/get/bykarma/below/:karma", (req, res) => {
    let karmaNumber = req.params.karma;
    selectUsersBelowKarma(karmaNumber).then(resu => {
      res.json(JSON.stringify(resu));
    });
  });

  



export const userApi: Router = router;