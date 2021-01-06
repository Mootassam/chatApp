import { TokenService } from './../../services/token.service';
import { User } from './../../_models/user';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash'; 
import * as io from 'socket.io-client'; 
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  users! :User[]; 
  loggedInUser:any
  userArr! :[]; 
  socket : any
  constructor(private usersService: UsersService ,private tokenService: TokenService) { 
    this.socket =io("http://localhost:3000")
  }

  ngOnInit(): void {
    this.loggedInUser = this.tokenService.GetPayload(); 
    this.GetUsers(); 
    this.GetUser(); 

    this.socket.on('refreshPage',()=>{ 
      this.GetUsers(); 
      this.GetUser(); 
    })
  }

  GetUsers(){ 
  
    this.usersService.GetAllUser().subscribe(data => { 
    _.remove(data.result , {username: this.loggedInUser.username})
     this.users = data.result ; 
      
    })
  }

  GetUser(){ 
  
    this.usersService.GetUserById(this.loggedInUser._id).subscribe(data => { 
      this.userArr = data.result.following ;       
        })
  }

  FollowUser(user:any){ 
this.usersService.FollowUser(user._id).subscribe(data => { 
  this.socket.emit('refresh',{}); 
})}

checkInArray(userArr:any,id:any){ 


    const result =_.find(this.userArr,['userFollowed._id',id])

    if(result){ 
     return true; 
    }
    else { 
      return false ; 
    }
    
  }

}
