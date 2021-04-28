import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

interface MessageGroup {
  otherUserId: string;
  otherUsername: string;
  otherProfileUrl: string;
  objectId: string;
  date: Date;
}

interface Message {
  messageGroupId: string;
  text: string;
  senderId: string;
  senderUsername: string;
  date: Date;
}

interface Toy {
  id: string;
  title: string;
}

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  messageGroups: MessageGroup[] = [];
  currentMessageGroup: MessageGroup = {
    otherUserId: "",
    otherUsername: "",
    otherProfileUrl: "",
    objectId: "",
    date: new Date()
  };
  messages: Message[] = [];

  addMessageForm: FormGroup;
  transactionForm: FormGroup;

  currentMessageGroupId: string = "";

  myToys: Toy[] = [];
  theirToys: Toy[] = [];

  constructor(private fb: FormBuilder, public httpService : HttpService, public uauth: AuthService, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentMessageGroupId = this._Activatedroute.snapshot.paramMap.get("messageGroupId");

    this.initializeForms();

    this.httpService.getMessageGroups(this.uauth.user.uid).subscribe((data) => {
      for (let entry of Object.entries(data)) {
        this.messageGroups.push({
          otherUserId: entry[1].otherUserId,
          otherUsername: entry[1].otherUsername,
          otherProfileUrl: entry[1].otherProfileUrl,
          objectId: entry[1].messageGroupId,
          date: new Date(entry[1].date)
        });
      }
      console.log("message groups")
      console.log(this.messageGroups)

      if (this.currentMessageGroupId == null) {
        this.getMessages(this.messageGroups[0]);
        this.currentMessageGroup = this.messageGroups[0];
        this.currentMessageGroupId = this.currentMessageGroup.objectId;
      } else {
        console.log("currentMessageGroupId:");
        console.log(this.currentMessageGroupId);

        for (let i = 0; i < this.messageGroups.length; i++) {
          if (this.messageGroups[i].objectId == this.currentMessageGroupId) {
            this.currentMessageGroup = this.messageGroups[i];
          }
        }

        this.messages = [];
        this.httpService.getMessages(this.currentMessageGroupId).subscribe((data) => {
          for (let entry of Object.entries(data)) {
            this.messages.push({
              messageGroupId: entry[1].messageGroupId,
              text: entry[1].text,
              senderId: entry[1].senderId,
              senderUsername: entry[1].senderUsername,
              date: new Date(entry[1].date)
            });
          }
          console.log(data);
        });
      }

      this.transactionForm.controls['messageGroupId'].setValue(this.currentMessageGroup.objectId);
      this.transactionForm.controls['user1Id'].setValue(this.uauth.user.uid);
      this.transactionForm.controls['user2Id'].setValue(this.currentMessageGroup.otherUserId);
    });
  }

  initializeForms(): void {
    this.addMessageForm = this.fb.group({
      messageGroupId: "",
      text: "",
      senderId: this.uauth.user.uid,
      receiverId: "",
      date: new Date()
    });

    this.transactionForm = this.fb.group({
      messageGroupId: "",
      user1Id: "",
      user2Id: "",
      user1Toy: "",
      user2Toy: "",
      date: new Date(),
      status: ""
    });
  }

  changeMyToy(event: any): void {
    let myToyId = event.target.value;
    this.transactionForm.controls['user1Toy'].setValue(myToyId);
    console.log(myToyId);
  }

  changeTheirToy(event: any): void {
    let theirToyId = event.target.value;
    this.transactionForm.controls['user2Toy'].setValue(theirToyId);
    console.log(theirToyId);
  }

  public changeColor(messageGroupId: string) {
    var elements = document.getElementsByClassName("chat_list");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("highlight");
    }
    document.getElementById("message-group-" + messageGroupId).classList.add("highlight");
  }

  // When you click on a message group
  public getMessages(messageGroup: MessageGroup) {
    this.transactionForm.controls['messageGroupId'].setValue(this.currentMessageGroup.objectId);
    this.transactionForm.controls['user1Id'].setValue(this.uauth.user.uid);
    this.transactionForm.controls['user2Id'].setValue(this.currentMessageGroup.otherUserId);

    this.messages = [];
    console.log(messageGroup);
    this.currentMessageGroup = messageGroup;

    this.httpService.getMessages(this.currentMessageGroup.objectId).subscribe((data) => {
      for (let entry of Object.entries(data)) {
        this.messages.push({
          messageGroupId: entry[1].messageGroupId,
          text: entry[1].text,
          senderId: entry[1].senderId,
          senderUsername: entry[1].senderUsername,
          date: new Date(entry[1].date)
        });
      }
      console.log(data);
    });
  }

  public postMessage() {
    // set the message group id to the current one
    this.addMessageForm.controls['messageGroupId'].setValue(this.currentMessageGroup.objectId);
    this.addMessageForm.controls['receiverId'].setValue(this.currentMessageGroup.otherUserId);

    console.log("addMessageForm:");
    console.log(this.addMessageForm.getRawValue());
    this.httpService.addMessage(this.addMessageForm.getRawValue()).subscribe((data) => {
      console.log(data);
      console.log("messageGroupId:" + data[0].messageGroupId);

      let messageAdded = {
        messageGroupId: data[0].messageGroupId,
        text: data[0].text,
        senderId: this.uauth.user.uid,
        senderUsername: data[0].senderUsername,
        date: new Date(data[0].date)
      }
      this.messages.push(messageAdded);
    });
    this.addMessageForm.controls['text'].setValue("");
  }

  public makeTransaction() {
    console.log("Make transaction");

    this.transactionForm.controls['date'].setValue(new Date());
    this.transactionForm.controls['status'].setValue("pending");

    console.log("transactionForm:");
    console.log(this.transactionForm.getRawValue());

    let transactionToAdd = this.transactionForm.getRawValue();

    this.httpService.makeTransaction(transactionToAdd).subscribe((data) => {
      console.log(data);
    });
  }

  public getOurToys() {
    // Reading My Toys from MongoDB
    this.myToys = [];
    this.httpService.getUserToys(this.uauth.user.uid).subscribe((data) => {
      for (let entry of Object.entries(data)) {
        this.myToys.push({
          id: entry[1]._id,
          title: entry[1].title
        });
      }
    });

    // Reading Their Toys from MongoDB
    this.theirToys = [];
    this.httpService.getUserToys(this.currentMessageGroup.otherUserId).subscribe((data) => {
      for (let entry of Object.entries(data)) {
        this.theirToys.push({
          id: entry[1]._id,
          title: entry[1].title
        });
      }
    });
  }
}
