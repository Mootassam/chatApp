import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import * as io from 'socket.io-client'
 import * as moment from 'moment'
import { User } from 'src/app/_models/user';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  user : any; 
  socket :any; 
  notifications :User[] = []; 
  constructor(private tokenService : TokenService,private userService :UsersService) { 
    this.socket=io('http://localhost:3000')
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload()
    this.Getuser();
    this.socket.on('refreshPage',()=> {
      this.Getuser();
    })
  }
Getuser(){ 
  this.userService.GetUserByName(this.user.username).subscribe( data => { 
    
   this.notifications=data.result.notifications.reverse();     


  })
}

TimeFromNow(time:any){ 
  return moment(time).fromNow();
}

MarkNotification(data:any):void{ 
this.userService.MarkNotification(data._id).subscribe(data =>{ 
this.socket.emit('refresh',{});   
})

}
DeleteNotification(data:any):void{ 
  this.userService.MarkNotification(data._id,true).subscribe(data =>{ 
    this.socket.emit('refresh',{});   

})
      
}

}
