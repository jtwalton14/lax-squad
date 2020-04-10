import { Component, OnInit, Input, Inject } from "@angular/core";
import { TMTColor } from "packages/objects";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-add-color-dialog",
  templateUrl: "./add-color-dialog.component.html",
  styleUrls: ["./add-color-dialog.component.css"]
})
export class AddColorDialogComponent implements OnInit {
  public selectedColor: TMTColor = new TMTColor();

  constructor(@Inject(MAT_DIALOG_DATA) public data?: any) {}

  public get saveDisabled(): boolean {
    return (
      this.selectedColor.name === "" ||
      this.selectedColor.hexValue === "" ||
      this.selectedColor.hexValue === "" ||
      this.selectedColor.h === 0 ||
      this.selectedColor.s === 0 ||
      this.selectedColor.l === 0 ||
      // tslint:disable-next-line:radix
      !isNaN(parseInt(this.selectedColor.name)) ||
      this.selectedColor.hexValue.length === 6
    );
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.selectedColor = JSON.parse(JSON.stringify(this.data.selectedColor));
    } else {
      this.selectedColor = new TMTColor();
    }
  }
}
