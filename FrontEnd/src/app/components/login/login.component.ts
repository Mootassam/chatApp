import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage!:''; 
  showSpinner = false ; 
  loginForm! :FormGroup
  token :any; 
  tokens: any; 
  constructor(private AuthService : AuthService, private fb:FormBuilder ,private router : Router  ,private tokenService : TokenService) { }

  ngOnInit(): void {
    this.init(); 
  }

  init(){ 
  this.loginForm =this.fb.group({
    username :['',Validators.required], 
    password : ['',Validators.required]
  })
  } 

  loginUser(){ 
  this.AuthService.loginUser(this.loginForm.value).subscribe(data =>{
   
  
    this.token = data; 
    this.tokens = this.token.token
    this.tokenService.SetToken(this.tokens); 
    this.showSpinner = true
    this.loginForm.reset(); 
    setTimeout(()=>{ 
      this.router.navigate(['streams']); 
    },2000)

   },err => {
    this.showSpinner= false; 

    if(err.error.msg){ 
      
      this.errorMessage = err.error.msg; 
      
       }
    else if(err.error.message){ 
      this.errorMessage = err.error.message 
      console.log(this.errorMessage)
    }
  })
  
 

}

}

