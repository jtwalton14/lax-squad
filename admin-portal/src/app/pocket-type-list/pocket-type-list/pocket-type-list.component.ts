import { Component, OnInit } from "@angular/core";
import { PocketTypeService } from "src/app/services/pocket-type.service";

@Component({
  selector: "pocket-type-list",
  templateUrl: "./pocket-type-list.component.html",
  styleUrls: ["./pocket-type-list.component.css"]
})
export class PocketTypeListComponent implements OnInit {
  public typeList: string[];
  constructor(public pocketTypeService: PocketTypeService) {}

  ngOnInit(): void {
    this.pocketTypeService.getPocketTypes().subscribe((list: string[]) => {
      console.log(list);
    });
  }
}
