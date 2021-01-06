import { Post } from './../../_models/post';
import { Router } from '@angular/router';
import { TokenService } from './../../services/token.service';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment' ;
import * as io from 'socket.io-client';
import * as _ from 'lodash'; 
@Component({
  selector: 'app-top-streams',
  templateUrl: './top-streams.component.html',
  styleUrls: ['./top-streams.component.css']
})
export class TopStreamsComponent implements OnInit {
  socket : any 
  user :any
  topposts! : Post[]; 
constructor(private postsService :PostService ,private tokenService :TokenService ,private router :Router) {
  this.socket = io('http://localhost:3000')
 }

ngOnInit(): void {

this.user = this.tokenService.GetPayload(); 
this.allPosts(); 
this.socket.on('refreshPage',(data: any) => { 
this.allPosts(); 

 })
}

allPosts(){ 
  this.postsService.getAllPosts().subscribe(data => { 
   this.topposts = data.top
  }, err => { 
       
    // if(err.error.token === null){ 
    //   this.tokenService.DeleteToken(); 
    //   this.router.navigate(['']);
    // }
    
  })
}

LikePost(post :any){ 
 this.postsService.addLike(post).subscribe(data => { 
  console.log('data:', data) 
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

}
