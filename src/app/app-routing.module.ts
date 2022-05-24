import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { StockIntroComponent } from './stock-intro/stock-intro.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:RegistrationComponent},
  {path:'search',component:StockIntroComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  { path: 'company-register', component: CompanyRegistrationComponent, canActivate : [AuthGuard] },
  {path:'**',component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
