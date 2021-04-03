import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


interface Notification {
  type: string,
  toyId: string,
  toyName: string,
  senderId: string,
  receiverId: string,
  senderUsername: string,
  transactionId: string,
  date: Date
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
      for (let entry of Object.entries(data)) {
      // console.log(data);
        let mysenderName = "";
        let myToyName = "";
        this.httpService.getUser(entry[1].senderId).subscribe((data) => {
          mysenderName = Object.entries(data)[0][1].username;
          this.httpService.getToy(entry[1].toyId).subscribe((data) => {
            myToyName = Object.entries(data)[0][1].title;
            this.notifications.push({
              type: entry[1].type,
              toyId: entry[1].toyId,
              toyName: myToyName,
              senderId: entry[1].senderId,
              receiverId: entry[1].receiverId,
              senderUsername: mysenderName,
              transactionId: entry[1].transactionId,
              date: new Date(entry[1].date)
            });
          });
        });
      }

      // this.notifications.sort(function(a, b) {
      //   if (a.date < b.date) {
      //     console.log("hi")
      //     return -1;
      //   } else if (a.date > b.date) {
      //     console.log("hi")
      //     return 1;
      //   } else {
      //     return 0;
      //   }
      // });
    });
  }
}
