import { TokenService } from './services/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as M from 'materialize-css'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private router :Router ,private TokenService :TokenService){}
  ngOnInit(){
    const token = this.TokenService.GetToken(); 
    if(token){ 
      this.router.navigate(['streams'])
    }
    else { 
      this.router.navigate(['']); 
    }
  }
}
