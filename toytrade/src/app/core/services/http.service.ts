import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiserver = "http://localhost:3000/api/v1";

  constructor(private httpClient: HttpClient) { }

  public addUser(user: { uid: string, email: string, displayName: string, photoURL: string }) {
    return this.httpClient.post(this.apiserver + "/users/" + user.uid, user);
  }

  public addToy(toyToAdd: Object) {
    return this.httpClient.post(this.apiserver + "/toys", toyToAdd);
  }

  public getToys() {
    return this.httpClient.get(this.apiserver + "/toys");
  }

  public getUserToys(userId: string) {
    return this.httpClient.get(this.apiserver + "/toys/users/" + userId);
  }

  public getUser(userId: string) {
    return this.httpClient.get(this.apiserver + "/users/" + userId);
  }

  public addNewUser(newUser: { userId: string, username: string, zipcode: string, bio: string }) {
    return this.httpClient.put(this.apiserver + "/users/" + newUser.userId, newUser);
  }

  public requestToy(request: Object) {
    return this.httpClient.post(this.apiserver + "/notifications", request);
  }

  public getNotifications(userId: string) {
    return this.httpClient.get(this.apiserver + "/notifications/users/" + userId);
  }

  public getToy(toyId: string) {
    return this.httpClient.get(this.apiserver + "/toys/" + toyId);
  }

  public getBrandsCSV() {
    return this.httpClient.get(this.apiserver + "/csv/brands");
  }

  public getCategoriesCSV() {
    return this.httpClient.get(this.apiserver + "/csv/categories");
  }

  public getUserRequestsCSV() {
    return this.httpClient.get(this.apiserver + "/csv/userrequests");
  }
}
