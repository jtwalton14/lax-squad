import { TestBed } from "@angular/core/testing";

import { PocketTypeService } from "../pocket-type.service";

describe("PocketTypeService", () => {
  let service: PocketTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketTypeService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
