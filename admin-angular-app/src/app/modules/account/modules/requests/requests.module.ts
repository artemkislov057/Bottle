import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ScanModalComponent } from './components/scan-modal/scan-modal.component';
import { RequestsService } from './services/requests.service';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    RequestsComponent,
    RequestListComponent,
    ScanModalComponent,
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [
    RequestsService
  ]
})
export class RequestsModule { }
