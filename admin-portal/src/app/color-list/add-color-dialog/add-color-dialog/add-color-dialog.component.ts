import { Component, OnInit, Input, Inject } from "@angular/core";
import { TMTColor } from "packages/objects";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-add-color-dialog",
  templateUrl: "./add-color-dialog.component.html",
  styleUrls: ["./add-color-dialog.component.css"],
})
export class AddColorDialogComponent implements OnInit {
  public selectedColor: TMTColor = new TMTColor();

  constructor(@Inject(MAT_DIALOG_DATA) public data?: any) {}

  public get saveDisabled(): boolean {
    return (
      this.selectedColor.name === "" ||
      this.selectedColor.hexValue === "" ||
      this.selectedColor.hexValue === "" ||
      this.selectedColor.h == null ||
      this.selectedColor.s == null ||
      this.selectedColor.l == null ||
      // tslint:disable-next-line:radix
      !(this.selectedColor.hexValue.length === 6) ||
      this.selectedColor.hexValue.includes("#")
    );
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.selectedColor = JSON.parse(JSON.stringify(this.data.selectedColor));
      this.selectedColor.hexValue = this.selectedColor.hexValue.replace(
        "#",
        ""
      );
    } else {
      this.selectedColor = new TMTColor();
    }
  }
}
