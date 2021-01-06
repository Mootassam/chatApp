import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';

const BASEURL = 'http://localhost:3000/api/chatapp'; 
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  GetAllUser():Observable<any> { 
    return this.http.get(`${BASEURL}/users`); 
  }

  FollowUser(userFollowed :any):Observable<any>
  {
    return this.http.post(`${BASEURL}/follow-user`, {userFollowed})
   }
   UnFollowUser(userFollowed :any):Observable<any>
   {
     return this.http.post(`${BASEURL}/unfollow-user `, {userFollowed})
    }

    
   GetUserById(id :any):Observable<any>{ 
    return this.http.get(`${BASEURL}/users/${id}`); 
  }
  GetUserByName(username :any):Observable<any> { 
    return this.http.get(`${BASEURL}/users/name/${username}`); 
  }

  AddImage(image :any):Observable<any> { 
    return this.http.post(`${BASEURL}/upload-image`, { image})
  }
  SetDeaultImage(imgId:any, imgVersion:any):Observable<any> { 
        return this.http.get(`${BASEURL}/set-default-image/${imgId}/${imgVersion}`)
  }

  changePassword(body:any):Observable<any>{
    return this.http.post(`${BASEURL}/change-password`,body); 
  }


  MarkNotification(id:any,deleteVal?: boolean):Observable<any>{ 
    return this.http.post(`${BASEURL}/mark/${id}`,{ 
      id ,
      deleteVal,
    })
  }

  MarkAllAsRead():Observable<any> { 
    return this.http.post(`${BASEURL}/mark-all`,{
      all : true 
    })
  }
}
