import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferredUsersComponent } from './referred-users.component';

describe('ReferredUsersComponent', () => {
  let component: ReferredUsersComponent;
  let fixture: ComponentFixture<ReferredUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferredUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferredUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
