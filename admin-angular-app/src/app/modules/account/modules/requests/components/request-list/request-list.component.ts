import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { RequestsService } from '../../services/requests.service';
import { ScanModalComponent } from '../scan-modal/scan-modal.component';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  public displayedColumns: string[] = ['position', 'company', 'name', 'inn', 'ogrn', 'scan'];
  public viewRequests!: IRequestItem[];
  public paginatorOption!: PaginatorOptions;
  public AllRequests!: IRequestItem[];
  public showPaginator: boolean = true;

  constructor(
    public dialog: MatDialog,
    public requestsService: RequestsService
    ) { }

  ngOnInit(): void {
    this.requestsService.getRequests().pipe().subscribe(requests => {
      this.AllRequests = requests;
      this.viewRequests = this.AllRequests.slice(0, 10);
    })
    this.paginatorOption = this.generatePageSizeOptions(10, this.AllRequests.length, 5);
    
  }

  public onPageChange(event: PageEvent) : void {
    const start = event.pageIndex * event.pageSize;
    let end = start + event.pageSize;
    if (end > event.length) {
      end = event.length;
    }
    this.viewRequests = this.AllRequests.slice(start, end);
  }

  openScans() {
    const dialogRef = this.dialog.open(ScanModalComponent);
    console.log('open')
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  public onSearchChanges(value: string) {
    this.viewRequests = this.AllRequests.filter(request => {
      this.showPaginator = value === ''? true: false;
      return request.name.toLowerCase().includes(value.toLowerCase())
      || request.company.toLowerCase().includes(value.toLowerCase())
      || request.inn.toString().includes(value)
      || request.ogrn.toString().includes(value);
    })
  }

  private generatePageSizeOptions(start: number, stop: number, step: number) : number[] {
    const result: number[] = [];
    for (let i = start; i < stop; i += step) {
      result.push(i);
    }
    return result;
  }


}

type PaginatorOptions = number[]

export interface IRequestItem {
  position: number
  company: string;
  name: string;
  inn: number;
  ogrn: number;
}
