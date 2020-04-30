import { Component, OnInit } from "@angular/core";
import { PocketTypeService } from "src/app/services/pocket-type.service";
import { from, Observable } from "rxjs";
import { mergeMap, toArray, map } from "rxjs/operators";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { AddPocketTypeDialogComponent } from "./add-pocket-type-dialog/add-pocket-type-dialog.component";
import { TMTPocket } from "packages/objects/pocketType";
import { ConfirmDeleteDialogComponent } from "src/app/confirm-delete-dialog/confirm-delete-dialog.component";
import { TmTUser } from "packages/objects";

@Component({
  selector: "pocket-type-list",
  templateUrl: "./pocket-type-list.component.html",
  styleUrls: ["./pocket-type-list.component.css"],
})
export class PocketTypeListComponent implements OnInit {
  public typeList: TMTPocket[];
  public busy = false;
  constructor(
    public pocketTypeService: PocketTypeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTypes();
  }

  public startEdit(type: TMTPocket): void {
    const dialogRef: MatDialogRef<AddPocketTypeDialogComponent> = this.dialog.open(
      AddPocketTypeDialogComponent,
      {
        data: { selectedType: type },
      }
    );
    dialogRef.afterClosed().subscribe((newType: TMTPocket) => {
      if (newType) {
        type.name = newType.name;
        this.saveList(type);
      }
    });
  }

  public confirmDelete(type: TMTPocket): void {
    const dialogRef: MatDialogRef<ConfirmDeleteDialogComponent> = this.dialog.open(
      ConfirmDeleteDialogComponent
    );
    dialogRef.afterClosed().subscribe((remove: boolean) => {
      if (remove) {
        this.deletePocket(type);
      }
    });
  }

  public deletePocket(type: TMTPocket): void {
    this.pocketTypeService
      .removePocketType(type.id)
      .subscribe((removedPocket: TMTPocket) => {
        this.loadTypes();
      });
  }

  public loadTypes(): void {
    this.busy = true;

    this.pocketTypeService
      .getPocketTypes()

      .subscribe((formattedList: TMTPocket[]) => {
        this.typeList = formattedList;
        this.busy = false;
      });
  }

  public saveList(newType: TMTPocket): void {
    this.pocketTypeService
      .savePocket(newType)
      .subscribe((newList: TMTPocket) => {
        this.loadTypes();
      });
  }

  public addNewType(): void {
    const dialogRef: MatDialogRef<AddPocketTypeDialogComponent> = this.dialog.open(
      AddPocketTypeDialogComponent
    );
    dialogRef.afterClosed().subscribe((newType: TMTPocket) => {
      if (newType) {
        newType.name = this.pocketTypeService.formatName(newType.name, "add");
        this.saveNewType(newType);
      }
    });
  }

  public saveNewType(newType: TMTPocket) {
    this.pocketTypeService
      .saveNewPocket(newType)
      .subscribe((savedPocket: TMTPocket) => {
        this.loadTypes();
      });
  }
}
