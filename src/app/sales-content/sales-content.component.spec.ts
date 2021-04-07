import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesContentComponent } from './sales-content.component';

describe('SalesContentComponent', () => {
  let component: SalesContentComponent;
  let fixture: ComponentFixture<SalesContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
