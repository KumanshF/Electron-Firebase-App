import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { User } from '../Models/user.model';
import {MatSnackBar} from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private authState: any;
  userCollection: AngularFirestoreCollection;
  

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore,
     private router: Router, public snackBar: MatSnackBar) {
      this.user = afAuth.authState;
      this.userCollection = db.collection('users');
  }


  get currentUserId(): string{
    return this.authState !== null ? this.authState.user.uid : '';
  }

  login(email: string, password: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user)=>{
        this.authState = user;
        const status = 'online';
        this.setUserStatus(status);
        this.router.navigate(['chat']);
        this.openSnackBar("LogIn Success");
      }).catch((e) => this.openSnackBar(e))
  }

  signUp(email: string, password: string, displayName: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user=>{
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
        this.router.navigate(['chat']);
        this.openSnackBar("SignIn Success");
      })).catch((e) => this.openSnackBar(e))
  }


  signOut(){
    this.afAuth.auth.signOut();
    this.router.navigate(['startup']);
    this.openSnackBar("Sign Out Success");
  }

  setUserData(email: string, displayName: string, status: string): void{
    const userId = this.currentUserId;
    const data= {
      email: email,
      displayName: displayName, 
      status: status
    }

    this.userCollection.doc(userId).set(data)
      .catch(error => console.log(error));
  }

  setUserStatus( status: string){
    const userId = this.currentUserId;
    const data= {
      status: status
    }

    this.userCollection.doc(userId).update(data)
      .catch(error => console.log(error));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {duration: 4000});
  }

}
