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
  archived: boolean
}

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css']
})
export class NotificationsPageComponent implements OnInit {

  notifications: Notification[] = [];

  constructor(public httpService : HttpService, public uauth: AuthService) { }

  ngOnInit(): void {
    this.httpService.getNotifications(this.uauth.user.uid).subscribe((data) => {
      console.log(data)
      for (let entry of Object.entries(data)) {
        let mysenderName = "";
        let myToyName = "";
        this.httpService.getUser(entry[1].senderId).subscribe((data) => {
          mysenderName = Object.entries(data)[0][1].username;
          this.httpService.getToy(entry[1].toyId).subscribe((data) => {
            myToyName = Object.entries(data)[0][1].title;
            const timeAgo = new TimeAgo('en-US');

            this.notifications.push({
              id: entry[1]._id,
              type: entry[1].type,
              toyId: entry[1].toyId,
              toyName: myToyName,
              senderId: entry[1].senderId,
              receiverId: entry[1].receiverId,
              senderUsername: mysenderName,
              transactionId: entry[1].transactionId,
              timeAgo: timeAgo.format(new Date(entry[1].date)),
              date: entry[1].date,
              archived: entry[1].archived
            });
          });
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
  }

  public acceptRequest(request: Notification) {
    console.log("Request has been accepted");

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
      archived: false
    };

    this.httpService.acceptToyRequest(request).subscribe((data) => {
      console.log(data); // the two notifications created
      newNotification.id = data[0]._id;
      newNotification.type = data[0].type;
      newNotification.toyId = data[0].toyId;
      this.httpService.getToy(data[0].toyId).subscribe((data) => {
        newNotification.toyName = Object.entries(data)[0][1].title;
      });
      newNotification.senderId = data[0].senderId;
      newNotification.receiverId = data[0].receiverId;
      this.httpService.getUser(data[0].senderId).subscribe((data) => {
        newNotification.senderUsername = Object.entries(data)[0][1].username;
      })
      newNotification.transactionId = "";
      const timeAgo = new TimeAgo('en-US');
      newNotification.timeAgo = timeAgo.format(new Date(data[0].date));
      newNotification.archived = data[0].archived;
    });

    console.log("New Notification:");
    console.log(newNotification);

    this.notifications.push(newNotification);
    request.archived = true;
  }
}
