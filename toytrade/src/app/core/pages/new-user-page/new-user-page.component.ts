import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-user-page',
  templateUrl: './new-user-page.component.html',
  styleUrls: ['./new-user-page.component.css']
})
export class NewUserPageComponent implements OnInit {
  addNewUserForm: FormGroup;

  constructor(public uauth: AuthService, private fb: FormBuilder, public httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addNewUserForm = this.fb.group({
      userId: [this.uauth.user.uid],
      username: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      bio: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    let userToAdd = this.addNewUserForm.getRawValue();
    console.log(userToAdd);
    this.httpService.addNewUser(userToAdd).subscribe((data) => {
      console.log(data);
    });
    this.router.navigateByUrl("/profile/" + this.uauth.user.uid, { skipLocationChange: true });
  }
}
