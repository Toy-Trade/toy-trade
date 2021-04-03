import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { AuthService } from '../../core/services/auth.service';

interface Toy {
  objectId: string;
  title: string;
  brand: string;
  category: string;
  condition: string;
  estimatedValue: string;
  ageRange: string;
  description: string;
  userId: string;
  username: string;
  profileUrl: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  toys: Toy[] = [];

  constructor(public httpService : HttpService, public uauth: AuthService) { }

  ngOnInit(): void {
    // Reading Toys Data from MongoDB
    this.httpService.getToys().subscribe((data) => {
      for (let entry of Object.entries(data)) {
        this.httpService.getUser(entry[1].userId).subscribe((data) => {
          let myUsername = Object.entries(data)[0][1].username;
          let userImage = Object.entries(data)[0][1].photoURL;
          this.toys.push({
            objectId: entry[1]._id,
            title: entry[1].title,
            brand: entry[1].brand,
            category: entry[1].category,
            condition: entry[1].condition,
            estimatedValue: entry[1].estimatedValue,
            ageRange: entry[1].ageRange,
            description: entry[1].description,
            userId: entry[1].userId,
            username: myUsername,
            profileUrl: userImage
          });
        });
      }
    });
  }

  public requestToy(toy: Toy) {
    console.log(toy);
    let today = new Date();
    let request = {
      type: "request",
      requesterId: this.uauth.user.uid,
      receiverId: toy.userId,
      toyId: toy.objectId,
      date: today
    }
    this.httpService.requestToy(request).subscribe((data) => {
      console.log(data);
    });
  }
}
