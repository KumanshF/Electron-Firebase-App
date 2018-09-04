import { SidenavService } from './../../services/sidenav.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { ElectronService } from 'ngx-electron';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  win: any;
  width:any;
  showMedia: boolean = false;

  @ViewChild('sidenav') public sidenav: MatSidenav;
  constructor(private sidenavService: SidenavService, private electronService: ElectronService, private authService: AuthService, private afAuth: AngularFireAuth, private router: Router,public snackBar: MatSnackBar) { }

  ngOnInit():void {
    this.sidenavService.setSidenav(this.sidenav);
  }


  signOut(){
    this.authService.signOut();
  }

  resize(){
    
    this.win = this.electronService.remote.getCurrentWindow();
    this.width = this.electronService.remote.getCurrentWindow().getBounds().width;
    console.log(this.width);
    if(this.width === 800){
      this.win.setSize(1000, 600);
      this.showMedia = true;
    }else{
      this.win.setSize(800, 600);
      this.showMedia = false;
    }
    
  }

  closeNav(){
    this.sidenav.close();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {duration: 4000});
  }
}
