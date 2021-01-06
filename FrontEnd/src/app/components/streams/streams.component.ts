import { TokenService } from 'src/app/services/token.service';
import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css'

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
token! :any; 
streamTab = false ; 
topStreamTab = false ; 
  constructor(private tokenService : TokenService) { }

  ngOnInit(): void { 
    this.streamTab = true ; 
this.token = this.tokenService.GetPayload(); 
document.addEventListener('DOMContentLoaded', function() {
  var tabs = document.querySelectorAll('.tabs');
  var instances = M.Tabs.init(tabs, {});
});
  }

  ChangeTabs(value :any){ 
     if(value === 'Streams'){ 
       this.streamTab= true ;
       this.topStreamTab= false ;
     }

     if(value === 'Top'){ 
      this.streamTab= false ;
      this.topStreamTab= true ;
    }
      
  }

 

}
