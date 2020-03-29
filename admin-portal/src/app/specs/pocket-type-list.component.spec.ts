import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PocketTypeListComponent } from "../pocket-type-list/pocket-type-list/pocket-type-list.component";

describe("PocketTypeListComponent", () => {
  let component: PocketTypeListComponent;
  let fixture: ComponentFixture<PocketTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PocketTypeListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
