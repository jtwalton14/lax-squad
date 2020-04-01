import { Component, OnInit } from "@angular/core";
import { PocketTypeService } from "src/app/services/pocket-type.service";
import { from, Observable } from "rxjs";
import { mergeMap, toArray, map } from "rxjs/operators";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { AddPocketTypeDialogComponent } from "./add-pocket-type-dialog/add-pocket-type-dialog.component";

@Component({
  selector: "pocket-type-list",
  templateUrl: "./pocket-type-list.component.html",
  styleUrls: ["./pocket-type-list.component.css"]
})
export class PocketTypeListComponent implements OnInit {
  public typeList: string[];
  public busy = false;
  constructor(
    public pocketTypeService: PocketTypeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTypes();
  }

  public startEdit(type: string, index: number): void {
    const dialogRef: MatDialogRef<AddPocketTypeDialogComponent> = this.dialog.open(
      AddPocketTypeDialogComponent,
      {
        data: { selectedType: type }
      }
    );
    dialogRef.afterClosed().subscribe((newType: string) => {
      this.saveList(newType, index);
    });
  }

  public deleteType(type: string): void {}

  public getDisplayText(type: string): Observable<string> {
    return from(type).pipe(
      mergeMap((letter: string) => {
        if (letter === "_") {
          return " ";
        } else {
          return letter;
        }
      }),
      toArray(),
      map((changedString: string[]) => changedString.join(""))
    );
  }

  public loadTypes(): void {
    this.busy = true;
    this.pocketTypeService
      .getPocketTypes()
      .pipe(
        mergeMap((list: string[]) => list),
        mergeMap((pocketType: string) => {
          return this.getDisplayText(pocketType);
        }),
        toArray()
      )
      .subscribe((formattedList: string[]) => {
        this.typeList = formattedList;
        this.busy = false;
      });
  }

  public saveList(newType: string, index: number): void {
    this.typeList[index] = newType;
    this.pocketTypeService
      .savePocketTypes(this.typeList)
      .subscribe((newList: string[]) => {
        this.loadTypes();
      });
  }
}
