import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLandingComponent } from './universal/header-landing/header-landing.component';
import { HeaderComponent } from './universal/header/header.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AddToyPageComponent } from './pages/add-toy-page/add-toy-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewUserPageComponent } from './pages/new-user-page/new-user-page.component';
import { ProfileViewerPageComponent } from './pages/profile-viewer-page/profile-viewer-page.component';
import { DataVisualPageComponent } from './pages/data-visual-page/data-visual-page.component';

@NgModule({
  declarations: [
    HeaderLandingComponent,
    HeaderComponent,
    LandingPageComponent,
    HomePageComponent,
    ChatPageComponent,
    NotificationsPageComponent,
    ProfilePageComponent,
    AddToyPageComponent,
    NewUserPageComponent,
    ProfileViewerPageComponent,
    DataVisualPageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    HeaderLandingComponent,
    HeaderComponent,
    LandingPageComponent,
    HomePageComponent,
    ChatPageComponent,
    NotificationsPageComponent,
    ProfilePageComponent
  ]
})
export class CoreModule { }
