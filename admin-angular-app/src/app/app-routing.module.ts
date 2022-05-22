import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountModule } from './modules/account/account.module';

const routes: Routes = [
      { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
      { path: 'account', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
