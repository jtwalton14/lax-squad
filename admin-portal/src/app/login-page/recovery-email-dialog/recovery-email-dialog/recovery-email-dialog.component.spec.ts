import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryEmailDialogComponent } from './recovery-email-dialog.component';

describe('RecoveryEmailDialogComponent', () => {
  let component: RecoveryEmailDialogComponent;
  let fixture: ComponentFixture<RecoveryEmailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveryEmailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
