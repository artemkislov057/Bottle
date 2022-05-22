import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchControl = new FormControl('');
  @Output() searchChangeValue: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(value => {
      this.searchChangeValue.emit(value);
    })
  }

}
