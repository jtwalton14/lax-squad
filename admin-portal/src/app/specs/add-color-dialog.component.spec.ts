import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddColorDialogComponent } from "../color-list/add-color-dialog/add-color-dialog/add-color-dialog.component";

describe("AddColorDialogComponent", () => {
  let component: AddColorDialogComponent;
  let fixture: ComponentFixture<AddColorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddColorDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddColorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
