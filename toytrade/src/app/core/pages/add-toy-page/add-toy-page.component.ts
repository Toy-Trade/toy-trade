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

  categories: string[] = [ "Action Figures", "Dolls", "Animals", "Cars", "Education", "Electronic Toys", "Games and Puzzles" ];

  ageRanges: string[] = [ "1-2", "2-3", "4-5", "6-7", "8+" ];

  brands: string[] = [ "Lego", "Barbie", "Hot Wheels", "American Girl", "Fisher-Price", "Nerf", "Hasbro" ];

  addToyForm: FormGroup;

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
      userId: [this.uauth.user.uid],
      imageUrl: ['', [Validators.required]]
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
    ///////////////
    // File Upload
    ///////////////
    // this.addToyForm.controls['imageUrl'].setValue(imageUrlSelected);
    // Node has an fs module
    // Can write to files
    // Check if name already exists, reject upload or rename
    // Make an endpoint for image uploading
    // 1. Write image to assets folder
    // 2. Write into mongo the meta data (full path to image)
    //// Full path an who uploaded it
    //// Gives user ability to update/edit/delete the image they uploaded
    // Use toy id for name of image
    // Have to add to database first
    // OjectId.str
    // res.ops
    //////////////
    // Locations
    //////////////
    // Add the location of the user stored with the toy (lat and long from city/town name)
    // Geolocate? Google login info? Or make user enter location for toy form, or make user enter location
    // Redirect to profile if first time logging in with google (fill in approx. location, zip code? which can be converted to lat/long)
    // Users have ability to update location (if you have active toys, update them)
    // User id associated with toy so user can edit toy listing, including location, image, other info
    // Can manually delete listing, or it will get deleted after a transaction has been made
    // This is another thing they can filter by ("near me")
  }

  onSubmit(): void {
    let toyToAdd = this.addToyForm.getRawValue();
    console.log("Get Raw Value of addToyForm:");
    console.log(toyToAdd);
    // this.httpService.addToy(toyToAdd).subscribe((data) => {
    //   console.log(data);
    // });
    // this.router.navigateByUrl("/home", { skipLocationChange: true });
  }
}
