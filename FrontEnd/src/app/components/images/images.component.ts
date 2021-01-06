import { FileUploader } from 'ng2-file-upload';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
const URl = 'http://localhost:3000/api/chatapp/upload-image';
import * as io from 'socket.io-client'
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
user : any ; 
socket:any
images = [];
  uploader :FileUploader = new FileUploader({ 
    url : URl , 
    disableMultipart : true , 
  });
  slectedFile : any

  constructor(private userService : UsersService , private tokenService : TokenService) { 
    this.socket  = io('http://localhost:3000')
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload()
    this.GetUser()
    this.socket.on('refreshPage',()=>{ 
      this.GetUser();
    })
  } 


  OnFileSelected(event : any){ 
  const file : File = event[0];
  this.ReadAsBase64(file).then(result => { 
    this.slectedFile  = result
  }).catch(err=>console.log(err))
  }

  Upload(){ 
    if(this.slectedFile){
      this.userService.AddImage(this.slectedFile).subscribe( data => { 
        this.socket.emit('refresh',{})
        const filePath = <HTMLInputElement>document.getElementById('filepath'); 
        filePath.value = ''; 
      }, err => console.log(err)
      )
    }
    }

  ReadAsBase64(file:any): Promise<any> { 
    const reader = new FileReader(); 
    const filevalue = new Promise((resolve, reject) => {
      reader.addEventListener('load',()=>{
        resolve(reader.result)
      }); 
      reader.addEventListener('error', event => {
        reject(event)
       }); 
      reader.readAsDataURL(file);   
    }); 
    return filevalue; 

  }


  GetUser(){
    this.userService.GetUserById(this.user._id).subscribe( data => { 
      this.images = data.result.images
    }, err => console.log(err)
    )
  }


  SetProfileImage(image :any){ 
  this.userService.SetDeaultImage(image.imgId, image.imgVersion).subscribe( data => {
  this.socket.emit('refresh' ,{}); 
    console.log(data);

    
   },err => console.log(err)
  )
    
  }

}
