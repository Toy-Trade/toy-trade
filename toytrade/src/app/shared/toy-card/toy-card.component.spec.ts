import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToyCardComponent } from './toy-card.component';

describe('ToyCardComponent', () => {
  let component: ToyCardComponent;
  let fixture: ComponentFixture<ToyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToyCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
