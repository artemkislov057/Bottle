import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: '', component: LoginComponent}
    //path: '',
    //component: AccountComponent,
    //children: [
    //  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)}
    //]
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
