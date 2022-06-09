import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    private account: AccountService
  ) { }

  ngOnInit(): void {
    
  }

  get currentUrl() : string {
    return this.router.url;
  }

  public logout(): void {
    this.account.logout().subscribe(() => this.router.navigate([''])); 
  }
}
