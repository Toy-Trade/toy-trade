import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToyPageComponent } from './add-toy-page.component';

describe('AddToyPageComponent', () => {
  let component: AddToyPageComponent;
  let fixture: ComponentFixture<AddToyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
