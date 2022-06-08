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
    public viewImg!: any;
    public loading: boolean = true;
    @Output() change: EventEmitter<string> = new EventEmitter();
    
    constructor(
      private requestsService: RequestsService,
    ){}
    
    public ngOnInit(): void {
      this.requestsService.getImage(this.id).subscribe(img => {
        this.createImageFromBlob(img);
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

    private createImageFromBlob(image: Blob) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
          this.viewImg = reader.result;
          this.loading = false;
        }, false);
      if (image) {
         reader.readAsDataURL(image);
      }
   }
    
}
