import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import * as io from 'socket.io-client'; 
import { User } from 'src/app/_models/user';
@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
user : any ; 
socket : any;
  Following : User[]=[]; 
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
this.Following = data.result.following ; 

    },err => console.log(err)
    )
  }

  Unfollow(user:any){ 
  
    
this.userService.UnFollowUser(user._id).subscribe((data) => {
  console.log(data);
  this.socket.emit('refresh',{});
},err => console.log(err))

  }

}
