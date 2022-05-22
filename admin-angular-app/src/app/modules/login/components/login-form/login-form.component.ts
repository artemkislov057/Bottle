import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  private readonly emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.pattern(this.emailRegex), Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required])
  });

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    this.router.navigate(['account']);
  }

}
