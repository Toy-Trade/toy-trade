import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTransactionModalComponent } from './confirm-transaction-modal.component';

describe('ConfirmTransactionModalComponent', () => {
  let component: ConfirmTransactionModalComponent;
  let fixture: ComponentFixture<ConfirmTransactionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmTransactionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTransactionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
