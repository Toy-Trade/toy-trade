import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-toy-page',
  templateUrl: './add-toy-page.component.html',
  styleUrls: ['./add-toy-page.component.css']
})
export class AddToyPageComponent implements OnInit {
  conditions: string[] = [ "New", "Used: Like New", "Used: Very Good", "Used: Good" ];

  categories: string[] = [ "Action Figures", "Dolls", "Animals", "Cars", "Education", "Electronic Toys", "Games and Puzzles", "Other" ];

  ageRanges: string[] = [ "1-2", "2-3", "4-5", "6-7", "8+" ];

  brands: string[] = [ "Lego", "Barbie", "Hot Wheels", "American Girl", "Fisher-Price", "Nerf", "Hasbro", "Other" ];

  addToyForm: FormGroup;

  toyObjectId: string = "";

  displayAddToyForm: boolean = true;
  displayUploadImageForm: boolean = false;

  constructor(public uauth: AuthService, private fb: FormBuilder, public httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addToyForm = this.fb.group({
      title: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      category: ['', [Validators.required]],
      condition: ['', [Validators.required]],
      estimatedValue: ['', [Validators.required]],
      ageRange: ['', [Validators.required]],
      description: ['', [Validators.required]],
      userId: [this.uauth.user.uid]
    });
  }

  // Called when user makes a change to the dropdown
  changeCondition(event: any): void {
    let conditionName = event.target.value;
    this.addToyForm.controls['condition'].setValue(conditionName);
    console.log(conditionName);
  }

  changeBrand(event: any): void {
    let brandName = event.target.value;
    this.addToyForm.controls['brand'].setValue(brandName);
    console.log(brandName);
  }

  changeCategory(event: any): void {
    let categoryName = event.target.value;
    this.addToyForm.controls['category'].setValue(categoryName);
    console.log(categoryName);
  }

  changeAgeRange(event: any): void {
    let ageRangeSelected = event.target.value;
    this.addToyForm.controls['ageRange'].setValue(ageRangeSelected);
    console.log(ageRangeSelected);
  }

  changeImage(event: any): void {
    let toyImage = event.target.files.item(0);
    console.log(toyImage);
  }

  public validate() {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      form.classList.add('was-validated');

      return false;
    }
    return true;

  }

  onSubmit(): void {
    if (this.validate()) {
      let toyToAdd = this.addToyForm.getRawValue();
      console.log("Get Raw Value of addToyForm:");
      console.log(toyToAdd);
      this.httpService.addToy(toyToAdd).subscribe((data) => {
        this.toyObjectId = data.toString();
      });

      this.displayAddToyForm = false;
      this.displayUploadImageForm = true;
    }
  }
}
