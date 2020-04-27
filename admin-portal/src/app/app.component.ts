import { Component, OnInit } from "@angular/core";
import { LoginPageComponent } from "./login-page/login-page.component";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  public authed = false;
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.cookieService.delete("authed");
    if (this.cookieService.get("authed") === "true") {
      this.authed = true;
    } else {
      const dialogRef: MatDialogRef<LoginPageComponent> = this.dialog.open(
        LoginPageComponent,
        { disableClose: true }
      );
      dialogRef.afterClosed().subscribe((authed: boolean) => {
        console.log(this.cookieService.get("authed"));
        if (authed) {
          this.authed = authed;
          this.router.navigate(["./photo-list"]);
        }
      });
    }
  }
}
