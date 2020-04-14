import { Component, OnInit, Inject } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { environment } from "src/environments/environment";
import { PhotoService } from "src/app/services";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TMTPhoto } from "packages/objects";
import { mergeMap, map, toArray } from "rxjs/operators";
import { PocketTypeService } from "src/app/services/pocket-type.service";
import { TMTPocket } from "packages/objects/pocketType";
import * as firebase from "firebase";

const URL = environment.firebase.databaseURL;

@Component({
  selector: "app-add-photo-dialog",
  templateUrl: "./add-photo-dialog.component.html",
  styleUrls: ["./add-photo-dialog.component.css"]
})
export class AddPhotoDialogComponent implements OnInit {
  public selectedPhoto: TMTPhoto = new TMTPhoto();
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "attachment",
    method: "post"
  });

  public selectedStyle = "";
  public selectedFile: File = null;
  public selectedType = "";
  public styles: string[];

  public downloadURL = "";
  private fbStorage: firebase.storage.Reference = null;
  private uploadT: firebase.storage.UploadTask;

  constructor(
    public photoService: PhotoService,
    public pocketTypeService: PocketTypeService,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {}

  public get canSave(): boolean {
    if (this.selectedPhoto) {
      return (
        this.selectedPhoto.type === "" ||
        this.selectedPhoto.pocketStyle === "" ||
        this.selectedPhoto.photoUrl == null
      );
    } else {
      return true;
    }
  }

  ngOnInit(): void {
    this.pocketTypeService
      .getPocketTypes()
      .pipe(
        mergeMap((types: TMTPocket[]) => types),
        map((type: TMTPocket) => type.name),
        toArray()
      )
      .subscribe((typeList: string[]) => {
        this.styles = typeList;
      });
    if (this.data != null) {
      this.selectedPhoto = JSON.parse(JSON.stringify(this.data.photo));
    }
  }

  public onFileSelected(event: File[]) {
    const file: File = event[0];

    this.selectedFile = file;

    this.uploadFile(this.selectedFile, this.selectedFile.name);
  }

  public setValues(): void {
    this.selectedPhoto.photoUrl = this.downloadURL;
  }

  public onSuccess(): void {
    this.uploadT.snapshot.ref.getDownloadURL().then((url: string) => {
      this.downloadURL = url;
      this.setValues();
    });
  }

  public uploadFile(file: Blob, fileName: string): void {
    this.fbStorage = firebase.storage().ref("pocketImages");
    this.upload(file, "put", fileName);
  }

  public upload(file: any, uploadfunction: string, name: string): void {
    this.uploadT = this.fbStorage.child(`${name}`).put(file);

    this.uploadT.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      this.onSuccess.bind(this)
    );
  }
}
