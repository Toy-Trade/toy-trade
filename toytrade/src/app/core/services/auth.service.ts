import { Injectable } from '@angular/core';

interface User {
  uid: String;
  email: String;
  displayName: String;
  photoURL: String;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = {
    uid: "",
    email: "",
    displayName: "",
    photoURL: ""
  };

  constructor() { }

  public setUser(user: { uid: String, email: String, displayName: String, photoURL: String }) {
    this.user = user;
  }
}
