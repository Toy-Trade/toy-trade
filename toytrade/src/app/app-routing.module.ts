import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './core/pages/about-page/about-page.component';
import { AddToyPageComponent } from './core/pages/add-toy-page/add-toy-page.component';
import { ChatPageComponent } from './core/pages/chat-page/chat-page.component';
import { DataVisualPageComponent } from './core/pages/data-visual-page/data-visual-page.component';
import { HomePageComponent } from './core/pages/home-page/home-page.component';
import { LandingPageComponent } from './core/pages/landing-page/landing-page.component';
import { NewUserPageComponent } from './core/pages/new-user-page/new-user-page.component';
import { NotificationsPageComponent } from './core/pages/notifications-page/notifications-page.component';
import { ProfilePageComponent } from './core/pages/profile-page/profile-page.component';
import { ProfileViewerPageComponent } from './core/pages/profile-viewer-page/profile-viewer-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'about', component: AboutPageComponent },
  { path: 'newuser', component: NewUserPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'profile/:userId', component: ProfileViewerPageComponent },
  { path: 'chat', component: ChatPageComponent },
  { path: 'notifications', component: NotificationsPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'addtoy', component: AddToyPageComponent },
  { path: 'datavisual', component: DataVisualPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
