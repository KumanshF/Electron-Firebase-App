import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { NgxElectronModule } from 'ngx-electron';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth'

import { AppComponent } from './app.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { StartupComponent } from './components/startup/startup.component';
import { NavbarComponent } from './components/navbar/navbar.component'
import { FeedComponent } from './components/feed/feed.component';
import { UserlistComponent } from './components/userlist/userlist.component';

import { app } from '../../node_modules/firebase';
import { appRoutes } from '../routes';

import { ChatService } from './services/chat.service'
import { AuthService } from './services/auth.service';
import { SidenavService } from './services/sidenav.service';

import { MatSnackBarModule, MatSidenavModule, MatButtonModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { CarouselModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';





@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    LoginFormComponent,
    ChatroomComponent,
    NavbarComponent,
    StartupComponent,
    FeedComponent,
    UserlistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxElectronModule,
    AngularFireModule.initializeApp(environment.firebase,'chatApp'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    MatSnackBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    CarouselModule.forRoot(), 
    WavesModule.forRoot(), 
    ButtonsModule,
    MatSidenavModule,
    MatButtonModule
  ],
  providers: [
    ChatService,
    AuthService,
    SidenavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
