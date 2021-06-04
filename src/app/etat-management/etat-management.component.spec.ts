import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatManagementComponent } from './etat-management.component';

describe('EtatManagementComponent', () => {
  let component: EtatManagementComponent;
  let fixture: ComponentFixture<EtatManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
