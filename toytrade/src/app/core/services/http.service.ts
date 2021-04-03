import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiserver = "http://localhost:3000/api/v1";

  constructor(private httpClient: HttpClient) { }

  public addUser(user: { uid: String, email: String, displayName: String, photoURL: String }) {
    return this.httpClient.post(this.apiserver + "/users/" + user.uid, user);
  }

  public addToy(toyToAdd: Object) {
    return this.httpClient.post(this.apiserver + "/toys", toyToAdd);
  }

  public getToys() {
    return this.httpClient.get(this.apiserver + "/toys");
  }

  public getUserToys(userId: String) {
    return this.httpClient.get(this.apiserver + "/toys/users/" + userId);
  }

  public getUser(userId: String) {
    return this.httpClient.get(this.apiserver + "/users/" + userId);
  }

  public addNewUser(newUser: { userId: String, username: String, zipcode: String, bio: String }) {
    return this.httpClient.put(this.apiserver + "/users/" + newUser.userId, newUser);
  }
}
