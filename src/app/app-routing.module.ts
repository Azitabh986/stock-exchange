import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { StockIntroComponent } from './stock-intro/stock-intro.component';

const routes: Routes = [
  {path:'',component:StockIntroComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:RegistrationComponent},
  {path:'intro',component:StockIntroComponent},
  {path:'admin-page',component:AdminPageComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  { path: 'company-register', component: CompanyRegistrationComponent, canActivate : [AuthGuard] },
  {path:'**',component:StockIntroComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
