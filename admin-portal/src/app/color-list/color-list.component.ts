import { Component, OnInit } from "@angular/core";

@Component({
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
}
