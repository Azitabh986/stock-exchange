import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockIntroComponent } from './stock-intro.component';

describe('StockIntroComponent', () => {
  let component: StockIntroComponent;
  let fixture: ComponentFixture<StockIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
