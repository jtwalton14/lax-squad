import { Component, OnInit, Inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { PhotoService } from "src/app/services";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-add-pocket-type-dialog-dialog",
  templateUrl: "./add-pocket-type-dialog.component.html",
  styleUrls: ["./add-pocket-type-dialog.component.css"]
})
export class AddPocketTypeDialogComponent implements OnInit {
  public type = "";

  constructor(
    public photoService: PhotoService,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {}

  ngOnInit(): void {
    if (this.data.selectedType != null) {
      this.type = this.data.selectedType;
    }
  }
}
