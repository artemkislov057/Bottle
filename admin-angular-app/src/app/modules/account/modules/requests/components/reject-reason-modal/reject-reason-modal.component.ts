import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reject-reason-modal',
  templateUrl: './reject-reason-modal.component.html',
  styleUrls: ['./reject-reason-modal.component.css']
})
export class RejectReasonModalComponent implements OnInit {
  public OnReject: Subject<string> = new Subject<string>();
  public reasonControl = new FormControl();
  constructor(
  ) { }

  ngOnInit(): void {
  }

  public clickOK() : void{
    this.OnReject.next(this.reasonControl.value);
    this.OnReject.complete();
  }

}
