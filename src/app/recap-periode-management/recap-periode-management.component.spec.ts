import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapPeriodeManagementComponent } from './recap-periode-management.component';

describe('RecapPeriodeManagementComponent', () => {
  let component: RecapPeriodeManagementComponent;
  let fixture: ComponentFixture<RecapPeriodeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecapPeriodeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapPeriodeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
