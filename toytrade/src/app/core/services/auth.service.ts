import { Injectable } from '@angular/core';

interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
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

  public setUser(user: { uid: string, email: string, displayName: string, photoURL: string }) {
    this.user = user;
  }
}
