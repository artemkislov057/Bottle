import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';

const routes: Routes = [
    { path: '', redirectTo: 'requests' },
    { path: 'requests', loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
