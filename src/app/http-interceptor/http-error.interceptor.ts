import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../service/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private SpinnerService: NgxSpinnerService,private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Error",next,'request',request)
    return next.handle(request)
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        console.log(JSON.stringify(error))
          if(error.status==400){
            this.authService.setErroMsg(error.error?.info+'Please try again!!');
          }
           
          else if(error.status==401)
            this.authService.setErroMsg("Unauthorized Url");
          else
            this.authService.setErroMsg("Something went wrong! Please try again.")
          this.SpinnerService.hide();
          return throwError(error);
        // }
      }));
    
  }
}
