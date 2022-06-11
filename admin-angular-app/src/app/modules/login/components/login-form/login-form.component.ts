import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.minLength(5), Validators.required])
  });

  public loading: boolean = false;
  public showAlert: boolean = false;
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    this.loading = true;
    this.showAlert = false;
    this.loginService.login(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value,
      true
    ).subscribe(
      _ => {
        this.router.navigate(['account/requests/unchecked']);
        this.loading = false;
      },
      _ => {
        this.loading = false;
        this.showAlert = true;
      })
  }
}
