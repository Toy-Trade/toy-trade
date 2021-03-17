import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './core/pages/about-page/about-page.component';
import { AddToyPageComponent } from './core/pages/add-toy-page/add-toy-page.component';
import { ChatPageComponent } from './core/pages/chat-page/chat-page.component';
import { HomePageComponent } from './core/pages/home-page/home-page.component';
import { NotificationsPageComponent } from './core/pages/notifications-page/notifications-page.component';
import { ProfilePageComponent } from './core/pages/profile-page/profile-page.component';

const routes: Routes = [
  { path: 'about', component: AboutPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'chat', component: ChatPageComponent },
  { path: 'notifications', component: NotificationsPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'addtoy', component: AddToyPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
