import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, ControlContainer } from '@angular/forms';
import { timeStamp } from 'node:console';
import { ExpectedConditions } from 'protractor';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user: string = this.uauth.user.displayName;
  // conditions: string[] = [ "New", "Used: Like New", "Used: Very Good", "Used: Good" ];
  // categories: string[] = [ "Action Figures", "Dolls", "Animals", "Cars", "Education", "Electronic Toys", "Games and Puzzles", "Other" ];
  // ageRanges: string[] = [ "1-2", "2-3", "4-5", "6-7", "8+" ];
  // brands: string[] = [ "Lego", "Barbie", "Hot Wheels", "American Girl", "Fisher-Price", "Nerf", "Hasbro", "Other" ];

  form: FormGroup;
  filterData = [
    {title: 'conditions', value: 'New'},
    {title: 'conditions', value: 'Used: Like New'},
    {title: 'conditions', value: 'Used: Very Good'},
    {title: 'conditions', value: 'Used: Good'},
    {title: 'categories', value: 'Action Figures'}
  ];

  get filtersFormArray() {
    return this.form.controls.orders as FormArray;
  }

  constructor(public uauth: AuthService, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      filters: new FormArray([])
    });

    this.addCheckBoxes();
  }

  private addCheckBoxes() {
    this.filterData.forEach(() => this.filtersFormArray.push(new FormControl(false)));
  }

  submit() {
    const selectedFilters = this.form.value.filters
      .map((checked, i) => checked ? this.filterData[i].value : null)
      .filter(v => v !== null);
    console.log(selectedFilters);
  }

  ngOnInit(): void {
  }

}
