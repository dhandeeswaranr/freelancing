import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocAddComponent } from './stoc-add.component';

describe('StocAddComponent', () => {
  let component: StocAddComponent;
  let fixture: ComponentFixture<StocAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
