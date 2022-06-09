import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule
  ]
})
export class AccountModule { }
