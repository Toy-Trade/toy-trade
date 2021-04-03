import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

interface UserInfo {
  username: string;
  zipcode: string;
  bio: string;
}

interface Toy {
  objectId: string;
  title: string;
  brand: string;
  category: string;
  condition: string;
  estimatedValue: string;
  ageRange: string;
  description: string;
  username: string;
  profileUrl: string;
}


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  photoURL: string = this.uauth.user.photoURL;

  userInfo: UserInfo = {
    username: "",
    zipcode: "",
    bio: ""
  };

  toys: Toy[] = [];

  constructor(public uauth: AuthService, public httpService: HttpService) { }

  ngOnInit(): void {
    // Get username and bio from MongoDB
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

    // Reading Toys Data from MongoDB
    this.httpService.getUserToys(this.uauth.user.uid).subscribe((data) => {
      for (let entry of Object.entries(data)) {
        this.httpService.getUser(entry[1].userId).subscribe((data) => {
          let myUsername = Object.entries(data)[0][1].username;
          this.toys.push({
            objectId: entry[1]._id,
            title: entry[1].title,
            brand: entry[1].brand,
            category: entry[1].category,
            condition: entry[1].condition,
            estimatedValue: entry[1].estimatedValue,
            ageRange: entry[1].ageRange,
            description: entry[1].description,
            username: myUsername,
            profileUrl: this.uauth.user.photoURL
          });
        });
      }
    });
  }

}
