import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {
  @Input() blueButton: boolean = false;
  buttonText: String = "Login";

  constructor(public auth: AngularFireAuth, private router: Router) {
  }
  login() {
    this.buttonText = "Logout";
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    //TODO: Check for successful login
    this.router.navigateByUrl("/home");
  }
  logout() {
    this.buttonText = "Login";
    this.auth.signOut();
    this.router.navigateByUrl("/");
  }

  ngOnInit(): void {
  }

}
