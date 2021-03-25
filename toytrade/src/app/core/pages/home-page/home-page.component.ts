import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user: String = this.uauth.user.displayName;

  constructor(public uauth: AuthService) { }

  ngOnInit(): void {
  }

}
