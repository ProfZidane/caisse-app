import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapManagementComponent } from './recap-management.component';

describe('RecapManagementComponent', () => {
  let component: RecapManagementComponent;
  let fixture: ComponentFixture<RecapManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecapManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
