import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {Router} from '@angular/router';

import { HttpService } from '../../core/services/http.service';

import { first } from 'rxjs/operators';

interface User {
  uid: String;
  email: String;
  displayName: String;
  photoURL: String;
}

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {
  @Input() blueButton: boolean = false;
  user: User = {
    uid: "",
    email: "",
    displayName: "",
    photoURL: ""
  };

  constructor(public auth: AngularFireAuth, private router: Router, private httpService: HttpService) {
  }
  
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((result) => {
      console.log(result.user.displayName + " has successfully logged in!");
      this.user = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL
      }
      this.httpService.addUser(this.user).subscribe((data) => {
        console.log(data);
      });
      this.router.navigateByUrl("/home");
    }).catch((error) => {
      console.log(error);
    });
  }

  isLoggedIn() {
    return this.auth.authState.pipe(first()).toPromise();
  }

  async checkLoggedIn() {
    const loggedIn = await this.isLoggedIn();

    if (loggedIn) {
      this.router.navigateByUrl("/home");
    }
  }

  logout() {
    this.auth.signOut();
    this.router.navigateByUrl("/");
  }

  ngOnInit(): void {
    this.checkLoggedIn();
  }

}
