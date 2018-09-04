import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { AuthService } from './../../services/auth.service';
import {FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  hide = true;

  email: string;
  password: string;
  errorMsg: string;

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, public snackBar: MatSnackBar, private fb: FormBuilder) {
    this.loginForm = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl
    })
   }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  getEmailErrorMsg(){
    return this.emailFormControl.hasError('required') ? 'Email required' :
      this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }
  
  getPasswordErrorMsg(){
    return this.passwordFormControl.hasError('required') ? 'Password required' :
      this.passwordFormControl.hasError('minlength') ? 'Password too short!' : '';
  }
  
  
  toStartUp(){
    this.router.navigate(['startup']);
  }

  logIn(){
    const email = this.email;
    const password = this.password;

    this.authService.login(email, password)
      .then(success => console.log("success"))
      .catch(error => this.snackBar.open(error.message, '', {
        duration: 3000,
     }));
  }

  matcher = new MyErrorStateMatcher();
}
