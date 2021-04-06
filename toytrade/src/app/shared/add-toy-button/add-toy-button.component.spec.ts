import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToyButtonComponent } from './add-toy-button.component';

describe('AddToyButtonComponent', () => {
  let component: AddToyButtonComponent;
  let fixture: ComponentFixture<AddToyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToyButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
