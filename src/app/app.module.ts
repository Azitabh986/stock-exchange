import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { HttpErrorInterceptor } from './http-interceptor/http-error.interceptor';
import { PopupComponent } from './popup/popup.component';
import { FilterDatePipe } from './pipe/filter-date.pipe';
import { FilterTimePipe } from './pipe/filter-time.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegistrationComponent,
    CompanyRegistrationComponent,
    PopupComponent,
    FilterDatePipe,
    FilterTimePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule  
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:HttpErrorInterceptor,multi:true},
    AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
