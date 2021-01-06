import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { PostService } from './../../services/post.service';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client'
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  tollbarElement :any
  commentForm! : FormGroup
  postId :any
  socket : any
  constructor(private fb :FormBuilder , private postService :PostService ,private route :ActivatedRoute) {
    this.socket = io('http://localhost:3000')
   }

  ngOnInit(): void {
    this.init();
    this.postId = this.route.snapshot.paramMap.get('id'); 
    this.tollbarElement = document.querySelector('.nav-content'); 
      }
      ngAfterViewInit(): void {
        this.tollbarElement.style.display = 'none'
      }
      init(){ 
        this.commentForm = this.fb.group({ 
          comment : ['',Validators.required ]
        })
      }

      AddComment(){ 

        this.postService.addComment(this.postId,this.commentForm.value.comment).subscribe(data => { 
        this.socket.emit('refresh',{})
            this.commentForm.reset();
        })
        
      }



}
