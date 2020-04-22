import { Component, OnInit } from "@angular/core";
import { PhotoService } from "../services";
import { TMTPhoto } from "packages/objects";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { AddPhotoDialogComponent } from "./add-photo-dialog/add-photo-dialog/add-photo-dialog.component";
import { ConfirmDeleteDialogComponent } from "../confirm-delete-dialog/confirm-delete-dialog.component";
import { ShowPictureDialogComponent } from "../show-picture-dialog/show-picture-dialog.component";

@Component({
  selector: "photo-list",
  templateUrl: "./photo-list.component.html",
  styleUrls: ["./photo-list.component.css"]
})
export class PhotoListComponent implements OnInit {
  public photos: TMTPhoto[];
  public busy = true;

  constructor(public photoService: PhotoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  public loadPhotos(): void {
    this.busy = true;
    this.photoService.getPhotos().subscribe((photos: TMTPhoto[]) => {
      this.photos = photos;
      this.busy = false;
    });
  }

  public startEdit(selectedPhoto: TMTPhoto): void {
    const dialogRef: MatDialogRef<AddPhotoDialogComponent> = this.dialog.open(
      AddPhotoDialogComponent,
      {
        data: { photo: selectedPhoto }
      }
    );
    dialogRef.afterClosed().subscribe((newPhoto: TMTPhoto) => {
      if (newPhoto) {
        this.updatePhoto(newPhoto);
      }
    });
  }

  public startAdd(): void {
    const dialogRef: MatDialogRef<AddPhotoDialogComponent> = this.dialog.open(
      AddPhotoDialogComponent
    );
    dialogRef.afterClosed().subscribe((newPhoto: TMTPhoto) => {
      this.saveNewPhoto(newPhoto);
    });
  }

  public saveNewPhoto(newPhoto: TMTPhoto): void {
    this.photoService.addPhoto(newPhoto).subscribe((savedPhoto: TMTPhoto) => {
      this.loadPhotos();
    });
  }

  public updatePhoto(newPhoto: TMTPhoto): void {
    this.photoService
      .updatePhoto(newPhoto)
      .subscribe((savedPhoto: TMTPhoto) => {
        this.loadPhotos();
      });
  }

  public startDelete(selectedPhoto: TMTPhoto): void {
    const dialogRef: MatDialogRef<ConfirmDeleteDialogComponent> = this.dialog.open(
      ConfirmDeleteDialogComponent
    );
    dialogRef.afterClosed().subscribe((confirmDelete: boolean) => {
      if (confirmDelete) {
        this.deletePhoto(selectedPhoto);
      }
    });
  }

  public deletePhoto(photo: TMTPhoto): void {
    this.photoService.removePhoto(photo).subscribe((deletedPhoto: TMTPhoto) => {
      this.loadPhotos();
    });
  }

  public showImage(selectedPhoto: TMTPhoto): void {
    const dialogRef: MatDialogRef<ShowPictureDialogComponent> = this.dialog.open(
      ShowPictureDialogComponent,
      {
        data: { photo: selectedPhoto }
      }
    );
  }
}
