import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

interface UserInfo {
  username: String;
  zipcode: String;
  bio: String;
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  photoURL: String = this.uauth.user.photoURL;

  userInfo: UserInfo = {
    username: "",
    zipcode: "",
    bio: ""
  };

  constructor(public uauth: AuthService, public httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getUser(this.uauth.user.uid).subscribe((data) => {
      console.log(data);
      let myUserInfo = Object.entries(data)[0];
      this.userInfo = {
        username: myUserInfo[1].username,
        zipcode: myUserInfo[1].zipcode,
        bio: myUserInfo[1].bio
      }
      console.log("User info:");
      console.log(this.userInfo);
    });
  }

}
