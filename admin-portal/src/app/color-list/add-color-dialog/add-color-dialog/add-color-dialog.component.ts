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

  ngOnInit(): void {
    if (this.data != null) {
      this.selectedColor = this.data.selectedColor;
    } else {
      this.selectedColor = new TMTColor();
    }
  }

  public check(): void {
    console.log(this.selectedColor);
  }

  // public test(idk: any): void {
  //   console.log(idk.target.value);
  //   console.log(this.testt);
  // }
}
