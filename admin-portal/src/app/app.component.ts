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
    if (this.cookieService.get("authed") === "true") {
      this.authed = true;
      this.letThrough();
    }
  }

  public checkAuth(isAuthed: boolean): void {
    this.authed = isAuthed;
    if (isAuthed) {
      this.letThrough();
    }
  }

  public letThrough(): void {
    this.router.navigate(["./photo-list"]);
  }
}
