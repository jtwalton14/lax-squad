import { Component, OnInit } from "@angular/core";
import { ColorsService } from "../services";
import { TMTColor } from "packages/objects";

@Component({
  selector: "photo-list",
  templateUrl: "./photo-list.component.html",
  styleUrls: ["./photo-list.component.css"]
})
export class PhotoListComponent implements OnInit {
  photos: string[] = [
    "one pocket",
    "two pocket",
    "three pocket",
    "four pocket",
    "five pocket",
    "six pocket",
    "seven pocket",
    "eight pocket"
  ];

  constructor(public colorService: ColorsService) {}

  ngOnInit(): void {}

  public test(): void {
    console.log("hello");
  }

  public startEdit(): void {
    this.colorService.getColors().subscribe((stuff: TMTColor[]) => {
      console.log(stuff);
    });
  }

  public startAdd(): void {
    this.colorService.addColor().subscribe((stuff: TMTColor) => {
      console.log(stuff.name);
    });
  }
}
