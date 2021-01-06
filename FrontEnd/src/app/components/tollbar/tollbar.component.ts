import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as io from 'socket.io-client';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/_models/user';
import * as moment from 'moment';
import * as _ from 'lodash'
import { Message } from 'src/app/_models/message';
@Component({
  selector: 'app-tollbar',
  templateUrl: './tollbar.component.html',
  styleUrls: ['./tollbar.component.css']
})
export class TollbarComponent implements OnInit {
  user!:any
  token :any; 
   notifications :User[] =[]; 
  socket:any; 
  count : any; 

  imgId :any;
  imgVersion :any ;
  chatlist :User[] =[]; 
  msgNumber = 0; 

  constructor(private tokenService : TokenService, private router : Router, private userService : UsersService) { 
    this.socket = io('http://localhost:3000')
  }

  ngOnInit(): void { 

    this.token = this.tokenService.GetToken(); 
    this.user = this.tokenService.GetPayload();  

      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init(elems, {
        alignment :'right', 
        hover : true,
        coverTrigger : false
  
    });


    var elems1 = document.querySelectorAll('.dropdown-trigger1');
    var instances1 = M.Dropdown.init(elems1, {
      alignment :'right', 
      hover : true,
      coverTrigger : false

  });


    this.socket.on('refreshPage',()=>{ 
      this.GetUser(); 
    })
    this.socket.emit('online',
    {room :'global', user: this.user.username}
    ); 
    this.GetUser();
  }

  GetUser(){
    this.userService.GetUserById(this.user._id).subscribe( data => { 
      this.notifications = data.result.notifications.reverse(); 
      this.imgId = data.result.picVersion
      this.imgVersion = data.result.picId
      var value = _.filter(this.notifications,['read' , false]); 
       this.count = value;
      this.chatlist = data.result.chatList ; 
       this.ChekIfread(this.chatlist); 
      console.log('msg not read',this.msgNumber);  
 
      
    },err => { console.log(err);
    })
  }

  logout(){ 
    this.tokenService.DeleteToken(); 
    this.router.navigate(['']); 
  }
  GoToHome(){ 
    this.router.navigate(['streams']); 
  }

  TimeFromNow(time : any){ 
return moment(time).fromNow(); 
  }


  MarkAll(){ 
    this.userService.MarkAllAsRead().subscribe(data =>{ 
this.socket.emit('refresh',{});       
    })
  }

  MessageDate(date :any){ 
    return moment(date).calendar(null,{ 
      sameDay : '[Today]', 
      lastDay : '[Yesterday]', 
      lastWeek : '[DD/MM/YYYY]', 
      sameElse : '[DD/MM/YYYY]'
    })
  }

  ChekIfread(arr :any) { 
    const checkArr =[]; 
    for(let i=0 ; i< arr.length ; i++){ 
      const receiver = arr[i].msgId.message[arr[i].msgId.message.length-1]; 
      console.log('receiver', receiver);
      if(this.router.url !== `/chat/${receiver.sendername}`){ 
        if( receiver.receivername === this.user.username && receiver.isRead === false){ 
          checkArr.push(1);      
          this.msgNumber = _.sum(checkArr); 
          console.log(this.msgNumber);
          
        }
      }
    }
  }
}
