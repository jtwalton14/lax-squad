import { Component, OnInit } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { environment } from "src/environments/environment";
import { PhotoService } from "src/app/services";

const URL = environment.apiUrl;

@Component({
  selector: "app-add-photo-dialog",
  templateUrl: "./add-photo-dialog.component.html",
  styleUrls: ["./add-photo-dialog.component.css"]
})
export class AddPhotoDialogComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "attachment",
    method: "post"
  });
  public styles: string[];
  constructor(public photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.getPocketStyles().subscribe((styles: string[]) => {
      this.styles = styles;
    });
  }

  public test(t: File): void {
    console.log(t);
    console.log("dbsjk");
  }
}
