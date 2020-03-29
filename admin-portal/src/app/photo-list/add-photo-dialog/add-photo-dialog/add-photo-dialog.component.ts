import { Component, OnInit, Inject } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { environment } from "src/environments/environment";
import { PhotoService } from "src/app/services";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TMTPhoto } from "packages/objects";

const URL = environment.apiUrl;

@Component({
  selector: "app-add-photo-dialog",
  templateUrl: "./add-photo-dialog.component.html",
  styleUrls: ["./add-photo-dialog.component.css"]
})
export class AddPhotoDialogComponent implements OnInit {
  public selectedPhoto: TMTPhoto;
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "attachment",
    method: "post"
  });
  public selectedStyle = "";
  public selectedType = "";
  public styles: string[];
  constructor(
    public photoService: PhotoService,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {}

  public get canSave(): boolean {
    return (
      this.selectedPhoto.type === "" || this.selectedPhoto.pocketStyle === ""
    );
  }

  ngOnInit(): void {
    this.photoService.getPocketStyles().subscribe((styles: string[]) => {
      this.styles = styles;
    });
    if (this.data != null) {
      this.selectedPhoto = this.data.selectedColor;
    } else {
      this.selectedPhoto = new TMTPhoto();
    }
  }
}
