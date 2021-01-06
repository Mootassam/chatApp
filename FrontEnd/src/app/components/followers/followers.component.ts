import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import * as io from 'socket.io-client'
import { User } from 'src/app/_models/user';
@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  user : any ; 
  socket : any;
  followers : User[] =[]; 
    constructor(private userService : UsersService, private tokenService : TokenService) { 
  this.socket = io("http://localhost:3000")
    }
  
    ngOnInit(): void {
      this.user = this.tokenService.GetPayload(); 
      this.GetUser(); 
      this.socket.on('refreshPage',()=> {
        this.GetUser(); 
      })
   
    }
  
    GetUser(){ 
      this.userService.GetUserById(this.user._id).subscribe((data)=> {              
  this.followers = data.result.followers ; 
  console.log(this.followers);
  
  
      },err => console.log(err)
      )
    }



}
