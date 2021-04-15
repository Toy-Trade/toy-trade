import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

interface MessageGroup {
  otherUserId: string;
  otherUsername: string;
  objectId: string;
}

interface Message {
  messageGroupId: string;
  text: string;
  senderId: string;
  senderUsername: string;
  date: string;
}

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  messageGroups: MessageGroup[] = [];
  currentMessageGroupId: string = "";
  messages: Message[] = [];

  addMessageForm: FormGroup;

  constructor(private fb: FormBuilder, public httpService : HttpService, public uauth: AuthService) { }

  ngOnInit(): void {

    this.initializeForm();

    this.httpService.getMessageGroups(this.uauth.user.uid).subscribe((data) => {
      for (let entry of Object.entries(data)) {
        this.messageGroups.push({
          otherUserId: entry[1].otherUserId,
          otherUsername: entry[1].otherUsername,
          objectId: entry[1].messageGroupId
        });
      }
    });
  }

  initializeForm(): void {
    this.addMessageForm = this.fb.group({
      messageGroupId: "",
      text: "",
      senderId: this.uauth.user.uid,
      date: new Date()
    });
  }

  public getMessages(objectId: string) {
    this.messages = [];
    console.log(objectId);
    this.currentMessageGroupId = objectId;

    this.httpService.getMessages(this.currentMessageGroupId).subscribe((data) => {
      for (let entry of Object.entries(data)) {
        this.messages.push({
          messageGroupId: entry[1].messageGroupId,
          text: entry[1].text,
          senderId: entry[1].senderId,
          senderUsername: entry[1].senderUsername,
          date: new Date(entry[1].date).toLocaleTimeString()
        });
      }
      console.log(data);
    });
  }

  public postMessage() {
    // set the message group id to the current one
    this.addMessageForm.controls['messageGroupId'].setValue(this.currentMessageGroupId);
    this.httpService.addMessage(this.addMessageForm.getRawValue()).subscribe((data) => {
      console.log(data);
      console.log("messageGroupId:" + data[0].messageGroupId);

      let messageAdded = {
        messageGroupId: data[0].messageGroupId,
        text: data[0].text,
        senderId: this.uauth.user.uid,
        senderUsername: data[0].senderUsername,
        date: new Date(data[0].date).toLocaleTimeString()
      }
      this.messages.push(messageAdded);
    });
  }
}
