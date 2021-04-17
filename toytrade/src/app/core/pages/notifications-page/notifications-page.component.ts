import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en)

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
  archived: boolean,
  status: string,
  messageGroupId: string
}

interface Transaction {
  id: string;
  messageGroupId: string;
  user1Id: string;
  user2Id: string;
  user1Toy: string;
  user2Toy: string;
  date: Date;
  status: string;
}

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css']
})
export class NotificationsPageComponent implements OnInit {

  notifications: Notification[] = [];

  currentTransaction: Transaction = {
    id: "",
    messageGroupId: "",
    user1Id: "",
    user2Id: "",
    user1Toy: "",
    user2Toy: "",
    date: new Date(),
    status: ""
  }

  constructor(public httpService : HttpService, public uauth: AuthService) { }

  ngOnInit(): void {
    this.httpService.getNotifications(this.uauth.user.uid).subscribe((data) => {
      console.log(data)
      for (let entry of Object.entries(data)) {
        const timeAgo = new TimeAgo('en-US');

        this.notifications.push({
          id: entry[1]._id,
          type: entry[1].type,
          toyId: entry[1].toyId,
          toyName: entry[1].toyName,
          senderId: entry[1].senderId,
          receiverId: entry[1].receiverId,
          senderUsername: entry[1].senderUsername,
          transactionId: entry[1].transactionId,
          timeAgo: timeAgo.format(new Date(entry[1].date)),
          date: entry[1].date,
          archived: entry[1].archived,
          status: entry[1].status,
          messageGroupId: entry[1].messageGroupId
        });
      }

      console.log("notifications")
      console.log(this.notifications)
    });
  }

  public compare(a: Notification, b: Notification) {
    if (new Date(a.date).getTime() > new Date(b.date).getTime()) {
      return -1;
    }

    if (new Date(b.date).getTime() > new Date(a.date).getTime()) {
      return 1;
    }

    return 0;
  }

  public denyRequest(request: Notification) {
    console.log("Request has been denied");
    console.log(request);

    this.httpService.denyToyRequest(request.id).subscribe((data) => {
      console.log(data)
    });

    request.archived = true;
    request.status = "denied";
  }

  public acceptRequest(request: Notification) {
    console.log("Request has been accepted");

    // one of the notifications of the two that branched off
    let newNotification: Notification = {
      id: "",
      type: "",
      toyId: "",
      toyName: "",
      senderId: "",
      receiverId: "",
      senderUsername: "",
      transactionId: "",
      timeAgo: "",
      date: new Date(),
      archived: false,
      status: "",
      messageGroupId: ""
    };

    this.httpService.acceptToyRequest(request).subscribe((data) => {
      console.log(data); // the two notifications created
      newNotification.id = data[0]._id;
      newNotification.type = data[0].type;
      newNotification.toyId = data[0].toyId;
      newNotification.toyName = request.toyName;
      newNotification.senderId = data[0].senderId;
      newNotification.receiverId = data[0].receiverId;
      newNotification.senderUsername = request.senderUsername;
      const timeAgo = new TimeAgo('en-US');
      newNotification.timeAgo = timeAgo.format(new Date(data[0].date));
      newNotification.archived = data[0].archived;
      newNotification.messageGroupId = data[0].messageGroupId;
    });

    console.log("New Notification:");
    console.log(newNotification);

    this.notifications.push(newNotification);
    request.archived = true;
    request.status = "accepted";
  }

  public archiveNotification(notificationId: string) {
    this.httpService.archiveNotification(notificationId).subscribe((data) => {
      console.log(data);
    })
  }

  public getTransactionById(transactionId: string) {
    console.log("Get transaction by Id");

    this.httpService.getTransactionById(transactionId).subscribe((data) => {
      console.log(data);
      this.currentTransaction = {
        id: data[0]._id,
        messageGroupId: data[0].messageGroupId,
        user1Id: data[0].user1Id,
        user2Id: data[0].user2Id,
        user1Toy: data[0].user1ToyName,
        user2Toy: data[0].user2ToyName,
        date: data[0].date,
        status: data[0].status
      }
      console.log("Current transaction")
      console.log(this.currentTransaction);
    })
  }

  public denyTransaction(transactionId: string, notification: Notification) {
    this.httpService.denyTransaction(transactionId).subscribe((data) => {
      console.log(data);
    })
    notification.archived = true;
  }

  public confirmTransaction(transactionId: string, notification: Notification) {
    let newNotification: Notification = {
      id: "",
      type: "",
      toyId: "",
      toyName: "",
      senderId: "",
      receiverId: "",
      senderUsername: "",
      transactionId: "",
      timeAgo: "",
      date: new Date(),
      archived: false,
      status: "",
      messageGroupId: ""
    };

    let users = { senderId: this.uauth.user.uid, receiverId: notification.senderId };
    this.httpService.confirmTransaction(transactionId, users).subscribe((data) => {
      console.log(data);
      newNotification.id = data[0]._id;
      newNotification.type = data[0].type;
      newNotification.senderId = data[0].senderId;
      newNotification.receiverId = data[0].receiverId;
      newNotification.senderUsername = notification.senderUsername;
      const timeAgo = new TimeAgo('en-US');
      newNotification.timeAgo = timeAgo.format(new Date(data[0].date));
      newNotification.archived = data[0].archived;
      newNotification.transactionId = data[0].transactionId;
    })
    notification.archived = true;
    this.notifications.push(newNotification);
  }
}
