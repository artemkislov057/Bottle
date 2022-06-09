import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { RequestsService } from '../../services/requests.service';
import { RejectReasonModalComponent } from '../reject-reason-modal/reject-reason-modal.component';

@Component({
  selector: 'app-scan-modal',
  templateUrl: './scan-modal.component.html',
  styleUrls: ['./scan-modal.component.css']
})
export class ScanModalComponent implements OnInit{
    @Input()id!: string;
    @Input()type!: 'unchecked' | 'rejected' | 'accepted';
    private img!: Blob;
    public viewPdf!: any;
    public loading: boolean = true;
    public pdfSrc = "";
    public change: Subject<void> = new Subject();
    
    constructor(
      private requestsService: RequestsService,
      private dialog: MatDialog,
    ){}
    
    public ngOnInit(): void {
      this.requestsService.getPdf(this.id).subscribe(pdf => {
        this.pdfSrc = URL.createObjectURL(pdf);
        this.createPdfFromBlob(pdf);
      })
    }

    public openScan() {
      const dialogRef = this.dialog.open(RejectReasonModalComponent);
      dialogRef.componentInstance.OnReject.subscribe(message => this.rejectRequest(message))
    }

    public onAccept() {
      this.requestsService.acceptRequest(this.id).subscribe(() => {
        this.change.next();
        this.change.complete();
      })
    }

    private rejectRequest(message: string) {
      this.requestsService.rejectRequest(this.id, message).subscribe(() => {
        this.change.next();
        this.change.complete();
      })
    }

    public showPdf() {
      window.open(this.pdfSrc);
    }
    
    private createPdfFromBlob(pdf: Blob) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
          this.viewPdf = reader.result;
          this.loading = false;
        }, false);
      if (pdf) {
        reader.readAsArrayBuffer(pdf);
      }
   }
    
}
