import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingDetailsViewComponent } from './billing-details-view.component';

describe('BillingDetailsViewComponent', () => {
  let component: BillingDetailsViewComponent;
  let fixture: ComponentFixture<BillingDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
