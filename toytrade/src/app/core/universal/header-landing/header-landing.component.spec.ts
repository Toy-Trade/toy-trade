import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLandingComponent } from './header-landing.component';

describe('HeaderLandingComponent', () => {
  let component: HeaderLandingComponent;
  let fixture: ComponentFixture<HeaderLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
