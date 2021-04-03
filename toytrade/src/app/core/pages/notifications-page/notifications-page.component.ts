import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


interface Notification {
  type: string,
  toyId: string,
  requesterId: string,
  receiverId: string,
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
        this.notifications.push({
          type: entry[1].type,
          toyId: entry[1].toyId,
          requesterId: entry[1].requesterId,
          receiverId: entry[1].receiverId,
          transactionId: entry[1].transactionId,
          date: entry[1].date
        });
      }
    });
  }

}
