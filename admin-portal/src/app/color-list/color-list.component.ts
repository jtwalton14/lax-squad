import { Component, OnInit } from "@angular/core";
import { ColorsService } from "../services";
import { TMTColor } from "packages/objects";
import { AddColorDialogComponent } from "./add-color-dialog/add-color-dialog/add-color-dialog.component";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "color-list",
  templateUrl: "./color-list.component.html",
  styleUrls: ["./color-list.component.css"]
})
export class ColorListComponent implements OnInit {
  color: string[] = [
    "red",
    "yellow",
    "orange",
    "blue",
    "purple",
    "green",
    "light blue",
    "pink",
    "dark green",
    "grey",
    "white"
  ];
  //   public scopeVariable.options: any = {
  //     label: "Choose a color",
  //     icon: "brush",
  //     default: "#f00",
  //     genericPalette: false,
  //     history: false
  // };

  public colors: TMTColor[] = [];

  constructor(public colorService: ColorsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.colorService.getColors().subscribe((stuff: TMTColor[]) => {
      console.log(stuff);
      this.colors = stuff;
    });
  }

  public startEdit(selectedColor: string): void {}

  public addColor(): void {
    const dialogRef: MatDialogRef<AddColorDialogComponent> = this.dialog.open(
      AddColorDialogComponent
    );
    dialogRef.afterClosed().subscribe((newColor: TMTColor) => {
      // this.saveColor(newColor);
    });
  }

  public deleteColor(selectedColor: TMTColor): void {
    console.log(selectedColor);
  }
}
