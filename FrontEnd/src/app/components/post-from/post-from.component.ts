import { PostService } from './../../services/post.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-post-from',
  templateUrl: './post-from.component.html',
  styleUrls: ['./post-from.component.css']
})
export class PostFromComponent implements OnInit {
  postForm! : FormGroup
  socket : any 
  
  constructor(private fg :FormBuilder ,private  postService :PostService) { 
    this.socket = io('http://localhost:3000'); 
  }

  ngOnInit(){
     this.init(); 
  }

  init(): void { 
    this.postForm = this.fg.group({ 
      post :['',Validators.required]
    })
  }

  submitPost(){ 
    
    this.postService.addPost(this.postForm.value).subscribe(data => { 
     this.socket.emit('refresh');

      this.postForm.reset(); 
    })
  }

}
