import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,AfterViewInit {
toolbarElement :any; 

  constructor() { }

  ngOnInit(): void {
    this.toolbarElement = document.querySelector('.nav-content'); 
  }

  ngAfterViewInit(): void {
    this.toolbarElement.style.display = 'none'; 
  }

}
