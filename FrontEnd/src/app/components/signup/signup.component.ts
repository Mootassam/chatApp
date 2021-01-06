import { TokenService } from './../../services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm! :FormGroup; 
  errorMessage!:''
  showSpinner = false

  constructor(private AuthService :AuthService, private fb :FormBuilder, private router :Router, private tokenService :TokenService) { }
 
  ngOnInit(): void {
    this.init(); 
  }


  init(){
  this.signupForm = this.fb.group({
    username :['',Validators.required], 
    email:['',[Validators.email, Validators.required]], 
    password :['',Validators.required]
  }); 
   }


   registerUser(){ 
      this.showSpinner = true; 
      this.AuthService.registerUser(this.signupForm.value).subscribe(data =>{
        console.log(data);
        
      this.tokenService.SetToken(data); 
      this.signupForm.reset(); 
      setTimeout(()=> { 
          this.router.navigate(['streams']); 
        },3000);
      },
      err => {
        this.showSpinner= false; 
        console.log(err); 
        if(err.error.msg){ 
          this.errorMessage = err.error.msg; 
          console.log(this.errorMessage);
          }
        else if(err.error.message){ 
          this.errorMessage = err.error.message ; 
          console.log(this.errorMessage);
        }
      }
      )
  }

}
