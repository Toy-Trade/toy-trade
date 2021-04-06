import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

interface UserInfo {
  username: string;
  zipcode: string;
  bio: string;
  profileUrl: string;
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
  selector: 'app-profile-viewer-page',
  templateUrl: './profile-viewer-page.component.html',
  styleUrls: ['./profile-viewer-page.component.css']
})
export class ProfileViewerPageComponent implements OnInit {
  userId: string;

  userInfo: UserInfo = {
    username: "",
    zipcode: "",
    bio: "",
    profileUrl: ""
  };

  toys: Toy[] = [];

  constructor(public uauth: AuthService, public httpService: HttpService, private _Activatedroute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userId = this._Activatedroute.snapshot.paramMap.get("userId");

    console.log("this.userId: " + this.userId);
    console.log("this.uauth.user.uid: " + this.uauth.user.uid);
    if (this.userId == this.uauth.user.uid) {
      console.log("SAME USER ID");
      this.router.navigateByUrl("/profile", { skipLocationChange: true } );
    }

    else {
      // Get username and bio from MongoDB
      this.httpService.getUser(this.userId).subscribe((data) => {
        console.log(data);
        let myUserInfo = Object.entries(data)[0];
        this.userInfo = {
          username: myUserInfo[1].username,
          zipcode: myUserInfo[1].zipcode,
          bio: myUserInfo[1].bio,
          profileUrl: myUserInfo[1].photoURL
        }
        console.log("User info:");
        console.log(this.userInfo);
      });

      // Reading Toys Data from MongoDB
      this.httpService.getUserToys(this.userId).subscribe((data) => {
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
              profileUrl: this.userInfo.profileUrl
            });
          });
        }
      });
    }
  }
}
