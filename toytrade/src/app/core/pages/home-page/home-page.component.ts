import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

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

  constructor(public uauth: AuthService) { }

  ngOnInit(): void {
  }

}
