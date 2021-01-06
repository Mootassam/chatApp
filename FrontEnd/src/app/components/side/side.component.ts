import { UsersService } from './../../services/users.service';
import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import  * as io from 'socket.io-client';
import { ThrowStmt } from '@angular/compiler';
import { User } from 'src/app/_models/user';
@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  socket :any
  user :any
   posts: User[]  = []
  following: User[] = []
  followers: User[] = []

  constructor(private tokenService : TokenService, private userService :UsersService) {
    this.socket = io('http://localhost:3000')
   }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload(); 
    this.GetUser(); 
    this.socket.on('refreshPage',() => { 
      this.GetUser(); 
    })
  }

  HetUser(){ 

  }
  GetUser():void{ 
    this.userService.GetUserById(this.user._id).subscribe(data => { 

      this.posts = data.result.posts
      this.following = data.result.following 
      this.followers = data.result.followers
    })
  }
}
