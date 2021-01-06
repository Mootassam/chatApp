import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment' ;
import * as io from 'socket.io-client'
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {
comments :any; 
  postId:any ; 
  socket : any
  user : any
  show = false ; 
  value :any ;
  comment : any

  commentId : any
  constructor(private postService : PostService, private router : ActivatedRoute, private tokenService : TokenService) { 
    this.socket = io('http://localhost:3000')
  }

  ngOnInit(): void {
    this.postId = this.router.snapshot.paramMap.get('id'); 
    this.AllcommentByPost(); 
    this.user = this.tokenService.GetPayload(); 
    this.socket.on('refreshPage',()=> { 
      this.AllcommentByPost(); 
    })
    

    
  }

  editComment(i :any){ 
this.show = true; 
this.value = i ; 


  }

  Resetc(i :any){ 
    this.show = false; 
    this.value = i ; 
  
  }

  trackByFn(index:any,item :any){
return item.id
return index; 
  }



  Update(item :any){ 
const body = { 
  comment : this.comment , 
  commentId: item._id, 
  postId : this.postId 
  
}
   console.log(body);
   this.postService.UpdateComment(body).subscribe( data => { 
     console.log({message :" the comment has added with success"});
     
   },err => console.log(err))

  }

  AllcommentByPost(){ 
    this.postService.GetComment(this.postId).subscribe( data => { 
      this.comments = data.data.comments;

      
    },err => console.log(err)
    ) 
  }

  TimeFromNow(time : any){ 
    return moment(time).fromNow(); 
  }
}
