import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorsComponent } from './components/sensors/sensors.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './shared/auth.guard';

const routes: Routes = 
		[
        {path:'sensors', component: SensorsComponent, canActivate:[authGuard]},
        {path:'', component: LoginComponent},
        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
