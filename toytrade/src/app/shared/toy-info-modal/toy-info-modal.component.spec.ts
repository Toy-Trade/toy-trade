import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToyInfoModalComponent } from './toy-info-modal.component';

describe('ToyInfoModalComponent', () => {
  let component: ToyInfoModalComponent;
  let fixture: ComponentFixture<ToyInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToyInfoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToyInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
