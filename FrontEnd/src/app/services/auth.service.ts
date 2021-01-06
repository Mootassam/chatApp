import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const BASEURL ='http://localhost:3000/api/chatapp'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  registerUser(data: any){
    return this.http.post(`${BASEURL}/register`,data);  
  }

  loginUser(data :any){ 
    return this.http.post(`${BASEURL}/login`,data); 
  }
}
