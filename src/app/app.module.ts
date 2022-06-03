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
import { StockIntroComponent } from './stock-intro/stock-intro.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './ui-components/chart/chart.component';
import { FooterComponent } from './footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminPageComponent } from './admin-page/admin-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegistrationComponent,
    CompanyRegistrationComponent,
    PopupComponent,
    FilterDatePipe,
    StockIntroComponent,
    ChartComponent,
    FooterComponent,
    AdminPageComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    ChartsModule,
    NgxPaginationModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:HttpErrorInterceptor,multi:true},
    AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
