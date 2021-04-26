import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
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

  form: FormGroup;

  constructor(public uauth: AuthService, private fb: FormBuilder, public httpService : HttpService) { 
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit(): void {
  }

  public onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      console.log(e.target.value)
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  public submitForm() {

    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    for(let i = 0; i < checkArray.length; i++) {

      if (this.conditions.indexOf(checkArray.value[i]) > -1 ) {
        console.log("conditions")
      }
      else if (this.categories.indexOf(checkArray.value[i]) > -1 ) {
        console.log("categories")
      }
      else if (this.ageRanges.indexOf(checkArray.value[i]) > -1 ) {
        console.log("ageRanges")
      }
      else if (this.brands.indexOf(checkArray.value[i]) > -1 ) {
        console.log("brands")
      }

    }

  }

}
