import { Component, OnInit } from "@angular/core";
import { PhotoService } from "../services";
import { TMTPhoto } from "packages/objects";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { AddPhotoDialogComponent } from "./add-photo-dialog/add-photo-dialog/add-photo-dialog.component";
import { ConfirmDeleteDialogComponent } from "../confirm-delete-dialog/confirm-delete-dialog.component";

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
        this.savePhoto(newPhoto);
      }
    });
  }

  public startAdd(): void {
    const dialogRef: MatDialogRef<AddPhotoDialogComponent> = this.dialog.open(
      AddPhotoDialogComponent
    );
    dialogRef.afterClosed().subscribe((newPhoto: TMTPhoto) => {
      this.savePhoto(newPhoto);
    });
  }

  public savePhoto(newPhoto: TMTPhoto): void {
    this.busy = true;
    this.photoService.addPhoto(newPhoto).subscribe((savedPhoto: TMTPhoto) => {
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
}
