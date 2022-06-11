import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from '../../services/requests.service';
import { ScanModalComponent } from '../scan-modal/scan-modal.component';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  public displayedColumns: string[] = ['position', 'company', 'name', 'inn', 'ogrn', 'scan'];
  public viewRequests!: RequestItem[];
  public paginatorOption!: PaginatorOptions;
  public AllRequests: RequestItem[] = [];
  public showPaginator: boolean = true;
  private type: 'rejected' | 'unchecked' | 'accepted' = 'unchecked';
  public loading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private requestsService: RequestsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(_ => {
      this.updateRequests();
    })
  }

  private updateRequests(): void {
    this.loading = true;
    this.updateType();
    const sub = this.requestsService.getRequests(this.type).pipe().subscribe(requests => {
      this.AllRequests = requests;
      this.viewRequests = this.AllRequests.slice(0, 10);
      this.paginatorOption = this.generatePageSizeOptions(10, this.AllRequests.length, 5);
      this.loading = false;
      sub.unsubscribe();
    })    
  }

  private updateType(): void {
    const type = this.route.snapshot.params['type'];
    if (type === 'unchecked' || type === 'rejected' || type === 'accepted') {
      this.type = type;
    } else {
      this.type = 'unchecked';
    }
  }

  public onPageChange(event: PageEvent) : void {
    const start = event.pageIndex * event.pageSize;
    let end = start + event.pageSize;
    if (end > event.length) {
      end = event.length;
    }
    this.viewRequests = this.AllRequests.slice(start, end);
  }

  openScans(id: string) {
    const dialogRef = this.dialog.open(ScanModalComponent);
    dialogRef.componentInstance.id = id;
    dialogRef.componentInstance.type = this.type;
    dialogRef.componentInstance.change.subscribe(result => {
      this.updateRequests();
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

export class RequestItem {
  position: string
  company: string;
  name: string;
  inn: number;
  ogrn: number;

  constructor(
    position: string,
    company: string,
    name: string,
    inn: number,
    ogrn: number
  ) {
    this.position = position;
    this.company = company;
    this.name = name;
    this.inn = inn;
    this.ogrn = ogrn;
  }
}
