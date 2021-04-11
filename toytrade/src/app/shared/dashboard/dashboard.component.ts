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
      console.log("Data")
      console.log(data)
      // let myUsername = "";
      // let userImage = "";
      for (let entry of Object.entries(data)) {
        // myUsername = Object.entries(data)[0][1].username;
        // userImage = Object.entries(data)[0][1].photoURL;

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
          username: entry[1].username,
          profileUrl: entry[1].profileUrl
        });
      }
    });
  }

  public requestToy(toy: Toy) {
    console.log(toy);
    let today = new Date();
    let request = {
      type: "request",
      senderId: this.uauth.user.uid,
      receiverId: toy.userId,
      toyId: toy.objectId,
      date: today,
      archived: false
    }
    this.httpService.requestToy(request).subscribe((data) => {
      console.log(data);
    });
  }
}
