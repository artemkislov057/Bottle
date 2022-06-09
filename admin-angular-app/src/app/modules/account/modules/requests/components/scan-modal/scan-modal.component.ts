import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-scan-modal',
  templateUrl: './scan-modal.component.html',
  styleUrls: ['./scan-modal.component.css']
})
export class ScanModalComponent implements OnInit{
    @Input()id!: string;
    private img!: Blob;
    public viewPdf!: any;
    public loading: boolean = true;
    public pdfSrc = "";
    @Output() change: EventEmitter<string> = new EventEmitter();
    
    constructor(
      private requestsService: RequestsService,
    ){}
    
    public ngOnInit(): void {
      this.requestsService.getPdf(this.id).subscribe(pdf => {
        this.pdfSrc = URL.createObjectURL(pdf);
        this.createPdfFromBlob(pdf);
      })
    }

    public onAccept() {
      this.requestsService.acceptRequest(this.id).subscribe(() => {
        this.change.emit();
      })
    }

    public onReject() {
      this.requestsService.rejectRequest(this.id).subscribe(() => {
        this.change.emit();
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
        //reader.readAsDataURL(pdf);
        reader.readAsArrayBuffer(pdf);
      }
   }
    
}
