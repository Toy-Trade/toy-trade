import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

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

  user: string = this.uauth.user.displayName;
  conditions: string[] = [ "New", "Used: Like New", "Used: Very Good", "Used: Good" ];
  categories: string[] = [ "Action Figures", "Dolls", "Animals", "Cars", "Education", "Electronic Toys", "Games and Puzzles", "Other" ];
  ageRanges: string[] = [ "1-2", "2-3", "4-5", "6-7", "8+" ];
  brands: string[] = [ "Lego", "Barbie", "Hot Wheels", "American Girl", "Fisher-Price", "Nerf", "Hasbro", "Other" ];

  Data: Array<any> = [

    { name: 'Condition', value: 'New' },
    { name: 'Condition', value: 'Used: Like New' },
    { name: 'Condition', value: 'Used: Very Good' },
    { name: 'Condition', value: 'Used: Good' },

    { name: 'Category', value: 'Action Figures'},
    { name: 'Category', value: 'Dolls'},
    { name: 'Category', value: 'Animals'},
    { name: 'Category', value: 'Cars'},
    { name: 'Category', value: 'Education'},
    { name: 'Category', value: 'Electronic Toys'},
    { name: 'Category', value: 'Games and Puzzles'},
    { name: 'Category', value: 'Other'},

    { name: 'Age Range', value: '1-2'},
    { name: 'Age Range', value: '2-3'},
    { name: 'Age Range', value: '4-5'},
    { name: 'Age Range', value: '6-7'},
    { name: 'Age Range', value: '8+'},

    { name: 'Brand', value: 'Lego'},
    { name: 'Brand', value: 'Barbie'},
    { name: 'Brand', value: 'Hot Wheels'},
    { name: 'Brand', value: 'American Girl'},
    { name: 'Brand', value: 'Fisher-Price'},
    { name: 'Brand', value: 'Nerf'},
    { name: 'Brand', value: 'Hasbro'},
    { name: 'Brand', value: 'Other'},

  ];

  refineForm: FormGroup;

  constructor(public httpService : HttpService, public uauth: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.initializeForm();

    // Reading Toys Data from MongoDB
    this.httpService.getToys().subscribe((data) => {
      console.log("Data")
      console.log(data)
      for (let entry of Object.entries(data)) {
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

  initializeForm(): void {
    this.refineForm = this.fb.group({
      brands: this.fb.array([]),
      categories: this.fb.array([]),
      conditions: this.fb.array([]),
      ageRanges: this.fb.array([])
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

  public onCheckboxChange(e: any, arrayName: string, i: any) {
    var temp = this.refineForm.getRawValue()[arrayName];
    var index = temp.indexOf(e.target.value);
    console.log(index);

    if(index == -1) {
      (this.refineForm.get(arrayName) as FormArray).push(new FormControl(e.target.value));
      console.log(this.refineForm.getRawValue());
      document.getElementById(arrayName+"-"+i).classList.add("active");
    }
    else {
      (this.refineForm.get(arrayName) as FormArray).removeAt(index);
      console.log(this.refineForm.getRawValue());
      document.getElementById(arrayName+"-"+i).classList.remove("active");
    }
  }

  public submitForm() {
    this.toys = []
    this.httpService.getFilteredToys(this.refineForm.getRawValue()).subscribe((data) => {
      console.log(data);
      for (let entry of Object.entries(data)) {
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
}
