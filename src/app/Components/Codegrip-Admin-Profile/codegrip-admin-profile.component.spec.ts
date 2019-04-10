import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodegripAdminProfileComponent } from './codegrip-admin-profile.component';

describe('CodegripAdminProfileComponent', () => {
  let component: CodegripAdminProfileComponent;
  let fixture: ComponentFixture<CodegripAdminProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodegripAdminProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodegripAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
