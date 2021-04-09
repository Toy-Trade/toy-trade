import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualPageComponent } from './data-visual-page.component';

describe('DataVisualPageComponent', () => {
  let component: DataVisualPageComponent;
  let fixture: ComponentFixture<DataVisualPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataVisualPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataVisualPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
