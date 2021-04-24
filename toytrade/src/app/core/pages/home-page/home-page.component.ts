import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
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
    // { name: 'Pear', value: 'pear' },
    // { name: 'Plum', value: 'plum' },
    // { name: 'Kiwi', value: 'kiwi' },
    // { name: 'Apple', value: 'apple' },
    // { name: 'Lime', value: 'lime' }

    { name: 'conditions', value: 'New' },
    { name: 'conditions', value: 'Used: Like New' },
    { name: 'conditions', value: 'Used: Very Good' },
    { name: 'conditions', value: 'Used: Good' },

    { name: 'categories', value: 'Action Figures'},
    { name: 'categories', value: 'Dolls'},
    { name: 'categories', value: 'Animals'},
    { name: 'categories', value: 'Cars'},
    { name: 'categories', value: 'Education'},
    { name: 'categories', value: 'Electronic Toys'},
    { name: 'categories', value: 'Games and Puzzles'},
    { name: 'categories', value: 'Other'},

    { name: 'ageRanges', value: '1-2'},
    { name: 'ageRanges', value: '2-3'},
    { name: 'ageRanges', value: '4-5'},
    { name: 'ageRanges', value: '6-7'},
    { name: 'ageRanges', value: '8+'},

    { name: 'brands', value: 'Lego'},
    { name: 'brands', value: 'Barbie'},
    { name: 'brands', value: 'Hot Wheels'},
    { name: 'brands', value: 'American Girl'},
    { name: 'brands', value: 'Fisher-Price'},
    { name: 'brands', value: 'Nerf'},
    { name: 'brands', value: 'Hasbro'},
    { name: 'brands', value: 'Other'},
    
  ];

  form: FormGroup;

  // https://www.positronx.io/angular-checkbox-tutorial/

  constructor(public uauth: AuthService, private fb: FormBuilder) { 
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit(): void {
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
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

}
