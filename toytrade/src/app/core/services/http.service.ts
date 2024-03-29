import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Notification {
  id: string,
  type: string,
  toyId: string,
  toyName: string,
  senderId: string,
  receiverId: string,
  senderUsername: string,
  transactionId: string,
  timeAgo: string,
  date: Date,
  archived: boolean
}

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

  // Joyce
  public getBrandsCSV() {
    return this.httpClient.get(this.apiserver + "/csv/brands");
  }

  public getToyRequestsCSV() {
    return this.httpClient.get(this.apiserver + "/csv/toyrequests");
  }

  //Tyler
  public getAgeRangeCSV() {
    return this.httpClient.get(this.apiserver + "/csv/ages");
  }

  public getUserandToysCSV(){
    return this.httpClient.get(this.apiserver + "csv/usertoys");
  }

  // Jody
  public getCategoriesCSV() {
    return this.httpClient.get(this.apiserver + "/csv/categories");
  }

  public getUserRequestsCSV() {
    return this.httpClient.get(this.apiserver + "/csv/userrequests");
  }

  public denyToyRequest(requestId: string) {
    return this.httpClient.put(this.apiserver + "/notifications/requests/deny/" + requestId, { id: requestId });
  }

  public acceptToyRequest(request: Notification) {
    return this.httpClient.post(this.apiserver + "/notifications/requests/accept/" + request.id, request);
  }

  public getMessageGroups(userId: string){
    return this.httpClient.get(this.apiserver + "/messagegroups/" + userId);
  }

  public addMessage(messageToAdd: Object) {
    return this.httpClient.post(this.apiserver + "/messages", messageToAdd);
  }

  public getMessages(messageGroupId: string) {
    return this.httpClient.get(this.apiserver + "/messages/" + messageGroupId);
  }

  public archiveNotification(notificationId: string) {
    return this.httpClient.put(this.apiserver + "/notifications/archives/" + notificationId, {id: notificationId});
  }

  public makeTransaction(transaction: Object) {
    return this.httpClient.post(this.apiserver + "/transactions", transaction);
  }

  // Colleen
  public getConditionsCSV() {
    return this.httpClient.get(this.apiserver + "/csv/conditions");
  }

  public getSentMessagesCSV() {
    return this.httpClient.get(this.apiserver + "/csv/sentmessages");
  }

  public getTransactionById(transactionId: string) {
    return this.httpClient.get(this.apiserver + "/transactions/" + transactionId);
  }

  public denyTransaction(transactionId: string) {
    return this.httpClient.put(this.apiserver + "/transactions/deny/" + transactionId, {id: transactionId});
  }

  public confirmTransaction(transactionId: string, users: Object) {
    return this.httpClient.put(this.apiserver + "/transactions/confirm/" + transactionId, users);
  }

  public getFilteredToys(refineForm: Object) {
    return this.httpClient.put(this.apiserver + "/toys/refine", refineForm);
  }
}
