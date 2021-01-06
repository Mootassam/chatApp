import { TokenService } from './token.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private TokenService  : TokenService){}

    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        const token = this.TokenService.GetToken();
        if(token){ 


        const headersConfig = { 
            'Content-Type' :'application/json',
            'Accept' : 'application/json',
            'Authorization' : `bearer ${token}`
        }; 
        const _req = req.clone({setHeaders : headersConfig}); 
        return next.handle(_req) ; 
                  
    } else { 
        const headersConfig = { 
            'Content-Type' :'application/json',
            'Accept' : 'application/json',
         
        }; 
        const _req = req.clone({setHeaders : headersConfig}); 
        return next.handle(_req) ;
    }


    }

}
 