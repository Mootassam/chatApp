import { UsersService } from './../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from './../../services/message.service';
import { TokenService } from './../../services/token.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client'
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit,AfterViewInit {

  receiver!:any ;
  user : any; 
  message! : String ;
  messagesArray! : any; 
  receiverData : any; 
  socket :any; 
  typingMessage : any; 
  typing = false

  constructor(
     private tokenService : TokenService,
     private msgService: MessageService,
     private route :ActivatedRoute,
     private usersService : UsersService
     ) 
     {
this.socket= io('http://localhost:3000')
   }

  ngOnInit(): void {
      this.user = this.tokenService.GetPayload(); 
      this.route.params.subscribe(params => { 
      this.receiver = params.name ; 
      this.getUserByUsername(this.receiver); 
      this.socket.on('refreshPage',() => { 
        this.getUserByUsername(this.receiver); 
      })
    })

    this.socket.on('is_typing',(data :any) => { 
      if(data.sender === this.receiver){ 
        this.typing= true ; 
        console.log(data);

      }

      
    })

    this.socket.on('has_stopped_typing',(data : any) => { 
      if(data.sender === this.receiver ){ 
        this.typing = false;  
      }
    })
  }
  ngAfterViewInit(){ 
     const params = { 
       room1 : this.user.username, 
       room2 : this.receiver
     }; 
     this.socket.emit('join chat',params); 
  }

  getUserByUsername(name:any){ 
    this.usersService.GetUserByName(name).subscribe(data => { 
    this.receiverData = data.result ;   
    this.GetMessages(this.user._id, data.result._id)   
    })
  }

  SendMessage(){ 
if(this.message){ 
  this.msgService.SendMessage(this.user._id,this.receiverData._id,this.receiverData.username,this.message).subscribe(data => { 
    this.socket.emit('refresh', {})
    this.message= '';    
  })
}
else{ 
  alert('please write something ... ')
}

  }

  GetMessages(senderId:any , receiverId:any){ 
    this.msgService.GetAllMessage(senderId,receiverId).subscribe( data => { 
      this.messagesArray = data.messages.message
       console.log(data);
       
    })  }

    IsTyping()
    { 
      this.socket.emit('start_typing',{
        sender : this.user.username, 
        receiver : this.receiver
      }); 

      if(this.typingMessage){ 
        clearTimeout(this.typingMessage); 
      }


      this.typingMessage = setTimeout( ()=> { 
        this.socket.emit('stop_typing' , { 
          sender :this.user.username ,
          receiver  : this.receiver
        })
      },500)

    }


}
