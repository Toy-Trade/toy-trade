import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

interface MessageGroup {
  otherUserId: string;
  otherUsername: string;
  objectId: string;
}

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  messageGroups: MessageGroup[] = []; 

  constructor(public httpService : HttpService, public uauth: AuthService) { }

  ngOnInit(): void {

    this.httpService.getMessageGroups(this.uauth.user.uid).subscribe((data) => {
      for (let entry of Object.entries(data)) {
        this.messageGroups.push({
          otherUserId: entry[1].otherUserId,
          otherUsername: entry[1].otherUsername,
          objectId: entry[1].messageGroupId
        })

      }
    })

  }

}
