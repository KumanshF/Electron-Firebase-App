import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import * as firebase from 'firebase/app'
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  canSee = false;

  user: firebase.User;

  constructor(public router: Router, private afAuth: AngularFireAuth) { 

    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
        this.router.navigate(['chat'])
      }
      else{
        this.canSee = true;
      }
    });

  }

  ngOnInit() {
  }

  toSignUp(){
    this.router.navigate(['signup']);
  }

  toLogIn(){
    this.router.navigate(['login']);
  }

}
