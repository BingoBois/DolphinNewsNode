import { Request, Response, Router } from 'express'
import {
  selectUserFromID, selectAllUsers, selectAllAdmins, selectAllMembers,
  selectUsersAboveKarma, selectUsersBelowKarma
} from '../controllers/mysql/queries/userQueries';
import { logError } from '../controllers/elastic/logger';
const router: Router = Router();


router.get("/get/byid/:id", (req, res) => {
  let idNumber = req.params.id;
  selectUserFromID(idNumber).then(resu => {
    res.json(JSON.stringify(resu));
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
});

router.get('/get/all', (req, res) => {
  selectAllUsers().then(resu => {
    res.json(JSON.stringify(resu));
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
})

router.get('/get/alladmin', (req, res) => {
  selectAllAdmins().then(resu => {
    res.json(JSON.stringify(resu));
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
})

router.get('/get/allmembers', (req, res) => {
  selectAllMembers().then(resu => {
    res.json(JSON.stringify(resu));
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
})

router.get("/get/bykarma/above/:karma", (req, res) => {
  let karmaNumber = req.params.karma;
  selectUsersAboveKarma(karmaNumber).then(resu => {
    res.json(JSON.stringify(resu));
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
});

router.get("/get/bykarma/below/:karma", (req, res) => {
  let karmaNumber = req.params.karma;
  selectUsersBelowKarma(karmaNumber).then(resu => {
    res.json(JSON.stringify(resu));
  }).catch((err) => {
    logError(err, 500);
    res.status(500).json({ message: err, error: 500 });
  });
});

export const userApi: Router = router;
