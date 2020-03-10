import { Component, OnInit } from "@angular/core";
import { ColorsService } from "../services";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "color-list",
  templateUrl: "./color-list.component.html",
  styleUrls: ["./color-list.component.css"]
})
export class ColorListComponent implements OnInit {
  colors: string[] = [
    "red",
    "yellow",
    "orange",
    "blue",
    "purple",
    "green",
    "light blue"
  ];

  constructor(public colorService: ColorsService) {}

  ngOnInit(): void {}

  public startEdit(selectedColor: string): void {
    this.colorService.getColors().subscribe((stuff: any) => {
      console.log(stuff);
    });
  }
}
