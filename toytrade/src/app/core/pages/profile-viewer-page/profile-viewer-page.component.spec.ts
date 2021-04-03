import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewerPageComponent } from './profile-viewer-page.component';

describe('ProfileViewerPageComponent', () => {
  let component: ProfileViewerPageComponent;
  let fixture: ComponentFixture<ProfileViewerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileViewerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileViewerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
