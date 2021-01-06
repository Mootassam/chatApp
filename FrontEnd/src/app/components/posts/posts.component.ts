import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Post } from './../../_models/post';
import { Router } from '@angular/router';
import { TokenService } from './../../services/token.service';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment' ;
import * as io from 'socket.io-client';
import * as _ from 'lodash'; 
import * as M from 'materialize-css'
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    socket : any 
    user :any
    posts! : Post[]; 
    editForm!: FormGroup; 
    postvalue : any; 
    elems: any ; 
    EditedPost!: String
  constructor(private postsService :PostService ,private tokenService :TokenService ,private router :Router ,private fb: FormBuilder)
   {
    this.socket = io('http://localhost:3000')
   }

  ngOnInit(): void {

  this.user = this.tokenService.GetPayload(); 
  this.allPosts(); 
  this.socket.on('refreshPage',(data: any) => { 
  this.allPosts(); 
   })

    this.elems = document.querySelector('.modal');
    var instances = M.Modal.init(this.elems, {});


  }

  allPosts(){ 
    this.postsService.getAllPosts().subscribe(data => { 
     this.posts = data.posts
    }, err => { 
         console.log("token expired",err);
         
      if(err.error.token === null){ 
        this.tokenService.DeleteToken(); 
        this.router.navigate(['/']);
      }
      
    })
  }

  LikePost(post :any){ 
  
    
   this.postsService.addLike(post).subscribe(data => { 
    this.socket.emit('refresh',{})
   },err => { 
     console.log(err);
     
   })
  }

  CheckInlikesArray(arr :[''] , username :any) { 
return _.some(arr ,{ username :username})
  }

  openCommentBox(posts :any)
  { 
this.router.navigate(['post' , posts. _id])
  }

  TimeFromNow(time : any){ 
    return moment(time).fromNow(); 
  }
  init(){ 
    this.editForm = this.fb.group({ 
      EditedPost :['', Validators.required]
    })
  }

  OpenEditModal(posts:any){ 
    this.postvalue = posts ; 
       }

  SubmiEditedtPost()
  {
          const body = { 
          id : this.postvalue._id, 
          post:this.EditedPost
  }
  
  this.postsService.EditPost(body).subscribe(data =>  {
    
    this.socket.emit('refresh', {}); 
    
  },err => console.log(err)
  )
  M.Modal.getInstance(this.elems).close(); 

  }

  CloseModal(){
    M.Modal.getInstance(this.elems).close(); 
 }


  DeletPost(){ 
    this.postsService.DeletePost(this.postvalue._id).subscribe(() => {   
      this.socket.emit('refresh', {}); 
    },err =>{
    console.log(err);
    
  })
  M.Modal.getInstance(this.elems).close(); 

 }


}
