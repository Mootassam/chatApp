import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../_models/post';
const BASEURL ='http://localhost:3000/api/chatapp'; 

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http :HttpClient) { }
  addPost(body :any):Observable<any> { 
    return this.http.post(`${BASEURL}/post/add-post`,  body)
  }

  getAllPosts() :Observable<any>{ 
    return this.http.get(`${BASEURL}/posts`); 
  }

  addLike(body :any):Observable<any> { 
 
    console.log(body);
    
    return this.http.post(`${BASEURL}/post/add-like`,body)
  }

  addComment(postId :any ,comment :any):Observable<any> { 
     
    return this.http.post(`${BASEURL}/post/add-comment`,{ 
      postId, 
      comment, 
    })
  }

  EditPost(body:any):Observable<any>{ 
    return this.http.put(`${BASEURL}/post/edit-post`,body)
  }
  DeletePost(id:any):Observable<any>{   
    return this.http.delete(`${BASEURL}/post/delete-post/${id}`); 
  }

  GetComment(postId:any):Observable<any>{ 
    return this.http.get(`${BASEURL}/get-comments/${postId}`); 
    
  }

  UpdateComment(body : any):Observable<any>{ 
    return this.http.put(`${BASEURL}/comment-update/`,body)
  }

}
