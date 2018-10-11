import {GetServerStatus, SetServerStatus } from '../controllers/serverstatus';
import { Request, Response, Router } from 'express'
import fetch from 'node-fetch';

const router: Router = Router();

//Alive check
//Status check
router.get('/', (req, res) => {
    res.status(GetServerStatus().statusCode).send(GetServerStatus().statusString);
  });


router.post('/set', (req, res) => {
    let request = req.body.status;
  
    if(SetServerStatus(request) === "OK"){
      res.status(200).send({"message": "Server status was updated!"}); 
    } else {
      res.status(400).send({"message": "Something went wrong!"});
    }
  })

  //FOR THE EXPRESS DOCKERFILE!!!
//Tested and simulated using the Backend + Postman, success!
//API ROUTE NEEDS TO BE CHANGED TO THE CORRECT ONE! PROBABLY <host>/status
//Please notice fetch import
router.get('/404', (req,res,err) => {
    //URL NEEDS TO BE CHANGED TO THE CORRECT ONE!
   fetch('http://localhost:3000/status').then
   (result => {
     switch(result.status){
       case 200:
       res.status(200).send("Alive")
       break;
  
       case 503:
       res.status(503).send("Update")
       break;
  
       case 404:
       res.status(404).send("Down")
       break;
  
       default:
       res.status(404).send("Something went terrible wrong...")
       break;
     }
   }).catch(err => res.status(404).send("Down"));
  
  })

  
export const status: Router = router;