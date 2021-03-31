import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http.service';

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
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  toys: Toy[] = [];

  constructor(public httpService : HttpService) { }

  ngOnInit(): void {
    // Reading Toys Data from MongoDB
    this.httpService.getToys().subscribe((data) => {
      for (let entry of Object.entries(data)) {
        this.httpService.getUser(entry[1].userId).subscribe((data) => {
          let displayName = Object.entries(data)[0][1].displayName;
          this.toys.push({
            objectId: "toy-" + entry[1]._id,
            title: entry[1].title,
            brand: entry[1].brand,
            category: entry[1].category,
            condition: entry[1].condition,
            estimatedValue: entry[1].estimatedValue,
            ageRange: entry[1].ageRange,
            description: entry[1].description,
            username: displayName
          });
        });
      }
    });
  }

}
