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

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private SpinnerService: NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Error",next,'request',request)
    return next.handle(request)
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        // if (error.status === 401) {
        //   console.log(error)
        // } else {
          if(error.error?.info)
            alert(error.error?.info)
          else
            alert("Something went wrong! Please try again.")
          this.SpinnerService.hide();
          return throwError(error);
        // }
      }));
    
  }
}
