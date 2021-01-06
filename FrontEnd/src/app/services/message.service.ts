import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASEURL ='http://localhost:3000/api/chatapp'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http : HttpClient) { }


  SendMessage(senderId :any , receivedId : any , receiverName:any, message : any):Observable<any>{ 
    return this.http.post(`${BASEURL}/chat-messages/${senderId}/${receivedId}`, { 
      receivedId,
      receiverName,
      message
    }); 


  }

 GetAllMessage(senderId :any , receivedId : any ):Observable<any>{ 
    return this.http.get(`${BASEURL}/chat-messages/${senderId}/${receivedId}`); 


  }


 
}
