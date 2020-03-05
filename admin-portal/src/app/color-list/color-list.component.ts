import { Component, OnInit } from "@angular/core";

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

  constructor() {}

  ngOnInit(): void {}

  public startEdit(selectedColor: string): void {
    console.log("clicked");
  }
}
