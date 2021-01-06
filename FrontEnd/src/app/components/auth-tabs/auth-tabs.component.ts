import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css'; 

@Component({
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.css']
})
export class AuthTabsComponent implements OnInit {

  constructor() { }

  ngOnInit(){
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.tabs');
      var instances = M.Tabs.init(elems, {});
    });
  
  }

} 
