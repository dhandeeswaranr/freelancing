import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundContianerComponent } from './not-found-contianer.component';

describe('NotFoundContianerComponent', () => {
  let component: NotFoundContianerComponent;
  let fixture: ComponentFixture<NotFoundContianerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundContianerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundContianerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
