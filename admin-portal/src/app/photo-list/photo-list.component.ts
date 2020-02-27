import { Component, OnInit } from "@angular/core";

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

  constructor() {}

  ngOnInit(): void {}

  public test(): void {
    console.log("hello");
  }
}
