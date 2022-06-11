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
import { SearchComponent } from './components/search/search.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { CutPipe } from 'src/app/pipes/cut.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RejectReasonModalComponent } from './components/reject-reason-modal/reject-reason-modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    RequestsComponent,
    RequestListComponent,
    ScanModalComponent,
    SearchComponent,
    CutPipe,
    RejectReasonModalComponent,
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    PdfViewerModule,
    MatProgressSpinnerModule
  ],
  providers: [
    RequestsService,
  ]
})
export class RequestsModule { }
