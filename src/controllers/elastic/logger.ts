import client from './connection.js';  

export function logError(errorMessage: string, errorCode: number){
  client.index({ 
    index: 'dolphin-backend-error',
    type: 'error',
    body: {
      "ErrorMessage": JSON.stringify(errorMessage),
      "ErrorCode": errorCode,
      "Time": new Date()
    }
  }, (err: any, resp: any) => {
    if(err){
      console.log(err);
    }
  });
}

export function logMessage(message: string){
  client.index({ 
    index: 'dolphin-backend-message',
    type: 'statusmessage',
    body: {
      "Message": message,
      "Time": new Date()
    }
  }, (err: any, resp: any) => {
    console.log(resp);
    if(err){
      console.log(err);
    }
  });
}
