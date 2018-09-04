import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { resolve } from 'dns';
import {MatSnackBar} from '@angular/material';
import {FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  hide = true;

  email: string;
  password: string;
  displayName: string;
  errorMsg: string;

  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, public snackBar: MatSnackBar, private fb: FormBuilder) {
    
   this.signupForm = new FormGroup({
     email: this.emailFormControl,
     password: this.passwordFormControl,
     username: this.usernameFormControl
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

  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);

  toStartUp(){
    this.router.navigate(['startup']);
  }

  signUp(){
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName; 

    this.authService.signUp(email, password, displayName)
      .then(success => console.log("success"))
      .catch(error => this.snackBar.open(error.message, '', {
        duration: 3000,
     }));
  }


  getEmailErrorMsg(){
    return this.emailFormControl.hasError('required') ? 'Email required' :
      this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }
  
  getPasswordErrorMsg(){
    return this.passwordFormControl.hasError('required') ? 'Password required' :
      this.passwordFormControl.hasError('minlength') ? 'Password too short!' : '';
  }
  
  getUsernameErrorMsg(){
    return this.usernameFormControl.hasError('required') ? 'Username required' : '';
  }
  

  
  

  matcher = new MyErrorStateMatcher();

}
