import { TokenInterceptor } from './services/token-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { StreamsModule } from './modules/streams/streams.module';
import { StreamsRoutingModule } from './modules/streams-routing/streams-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations:[
    AppComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule, 
    AuthModule,
    AuthRoutingModule, 
    StreamsModule, 
    StreamsRoutingModule, 
    
  ],
  exports:[
    

  ],
  providers: [CookieService , { 
    provide : HTTP_INTERCEPTORS,
    useClass :TokenInterceptor,
    multi  : true 
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
