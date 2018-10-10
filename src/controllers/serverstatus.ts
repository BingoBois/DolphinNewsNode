
interface backendStatus {
    statusString: string,
    statusCode: number
}

let backendStatusObject : backendStatus;

export function SetServerStatus(status: string){
  if (status.toUpperCase() === "ALIVE"){
   backendStatusObject = JSON.parse('{"statusString": "Alive", "statusCode": 200}');
    return "OK"
  } else if(status.toUpperCase() === "UPDATE"){
    backendStatusObject = JSON.parse('{"statusString": "Update", "statusCode": 503}');
    return "OK"
  } else if(status.toUpperCase() === "DOWN"){
    backendStatusObject = JSON.parse('{"statusString": "Down", "statusCode": 404}');
    return "OK";
  } else {
    return "Unknown Status"  
  }
}

export function GetServerStatus(){
  return backendStatusObject;
}

