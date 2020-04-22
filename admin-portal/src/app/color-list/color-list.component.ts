import { Component, OnInit } from "@angular/core";
import { ColorsService } from "../services";
import { TMTColor, TmTUser } from "packages/objects";
import { AddColorDialogComponent } from "./add-color-dialog/add-color-dialog/add-color-dialog.component";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { ConfirmDeleteDialogComponent } from "../confirm-delete-dialog/confirm-delete-dialog.component";

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

  public busy = false;

  public colors: TMTColor[] = [];

  constructor(public colorService: ColorsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadColors();
  }

  public startEdit(color: TMTColor): void {
    const dialogRef: MatDialogRef<AddColorDialogComponent> = this.dialog.open(
      AddColorDialogComponent,
      {
        data: { selectedColor: color }
      }
    );
    dialogRef.afterClosed().subscribe((newColor: TMTColor) => {
      if (newColor) {
        this.saveColor(newColor);
      }
    });
  }

  public addColor(): void {
    const dialogRef: MatDialogRef<AddColorDialogComponent> = this.dialog.open(
      AddColorDialogComponent
    );
    dialogRef.afterClosed().subscribe((newColor: TMTColor) => {
      if (newColor) {
        this.saveNewColor(newColor);
        this.loadColors();
      }
    });
  }

  public startDelete(selectedColor: TMTColor): void {
    const dialogRef: MatDialogRef<ConfirmDeleteDialogComponent> = this.dialog.open(
      ConfirmDeleteDialogComponent
    );
    dialogRef.afterClosed().subscribe((confirmDelete: boolean) => {
      if (confirmDelete) {
        this.deleteColor(selectedColor);
      }
    });
  }

  public deleteColor(color: TMTColor): void {
    this.colorService
      .removeColor(color.id)
      .subscribe((deletedColor: TMTColor) => {
        this.loadColors();
      });
  }

  public saveColor(newColor: TMTColor): void {
    this.colorService.putColor(newColor).subscribe((savedColor: TMTColor) => {
      console.log(savedColor);
      this.loadColors();
    });
  }

  public saveNewColor(newColor: TMTColor): void {
    this.colorService.addColor(newColor).subscribe((savedColor: TMTColor) => {
      this.loadColors();
    });
  }

  public loadColors(): void {
    this.busy = true;
    this.colorService.getColors().subscribe((stuff: TMTColor[]) => {
      this.colors = stuff;
      this.busy = false;
    });
  }
}
