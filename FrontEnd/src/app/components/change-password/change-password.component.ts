import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validator, Validators} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordFrom!: FormGroup; 
  message : any

  constructor(private fb: FormBuilder,private userService : UsersService) { }

  ngOnInit(): void {
    this.init(); 
  }

  init(){ 
    this.passwordFrom = this.fb.group({
      cpassword :['',Validators.required],
      newPassword : ['',Validators.required],
      confirmPassword : ['',Validators.required],
    },{ 
      validator :this.validate.bind(this)
    })
  }


  ChangePassword(){ 
this.userService.changePassword(this.passwordFrom.value).subscribe(data => { 

  this.message =data.message
  this.passwordFrom.reset();

},err => console.log(err)
)
  }

  validate(passwordFromGroup :FormGroup){
    const new_password = passwordFromGroup.controls.newPassword.value; 
    const confirmPassword = passwordFromGroup.controls.confirmPassword.value; 

if(confirmPassword.length <= 0){ 
  return null ; 
}
if(confirmPassword !== new_password){ 
  return { 
    doesNotMatch : true 
  }
}

return null ; 

  }
}
