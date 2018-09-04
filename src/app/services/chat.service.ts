import { User } from './../Models/user.model';
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
import { Item } from '../Models/Item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor(public afs: AngularFirestore) {
  

   }


}


