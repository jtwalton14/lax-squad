import { Component, OnInit } from "@angular/core";
import { PhotoService } from "../services";
import { TMTColor, TMTPhoto, PocketType } from "packages/objects";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { AddPhotoDialogComponent } from "./add-photo-dialog/add-photo-dialog/add-photo-dialog.component";
import { PocketStyle } from "packages/emuns/pocket-style";
import { State } from "packages/emuns/state";

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

  public startEdit(): void {
    this.photoService.getPhotos().subscribe((stuff: TMTPhoto[]) => {
      console.log(stuff);
    });
  }

  public startAdd(): void {
    const test: TMTPhoto = new TMTPhoto();
    test.photoUrl =
      "https://material.angular.io/assets/img/examples/shiba2.jpg";
    test.pocketStyle = PocketStyle.CLASSIC;
    test.state = State.AVAILABLE;
    test.type = PocketType.MALE;
    this.busy = true;
    this.photoService.addPhoto(test).subscribe((stuff: TMTPhoto) => {
      this.loadPhotos();
    });
  }

  public addPhoto(): void {
    const dialogRef: MatDialogRef<AddPhotoDialogComponent> = this.dialog.open(
      AddPhotoDialogComponent
    );
    dialogRef.afterClosed().subscribe((newColor: TMTColor) => {
      // this.saveColor(newColor);
    });
  }
}
