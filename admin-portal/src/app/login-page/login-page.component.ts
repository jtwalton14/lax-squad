import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { RecoveryEmailDialogComponent } from "./recovery-email-dialog/recovery-email-dialog/recovery-email-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent implements OnInit {
  public loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  public canLogin = true;
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginPageComponent>,
    private snackBar: MatSnackBar,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  public submit(): void {
    if (this.canLogin) {
      this.login();
    } else {
      this.register();
    }
  }

  public login(): void {
    this.authService.login(this.loginForm.value).then(
      (res) => {
        this.dialogRef.close(true);
        this.cookieService.set("authed", "true", 0.5);
      },
      (err) => {
        this.snackBar.open(err.message, "close", { duration: 4000 });
      }
    );
  }

  public register(): void {
    this.authService.register(this.loginForm.value).then(
      (res) => {
        this.snackBar.open(res.user.email + "was added", "close", {
          duration: 2000,
        });
      },
      (err) => {
        this.snackBar.open("user not found", "close", { duration: 4000 });
      }
    );
  }

  public resetPassword(): void {
    const dialogRef: MatDialogRef<RecoveryEmailDialogComponent> = this.dialog.open(
      RecoveryEmailDialogComponent
    );
    dialogRef.afterClosed().subscribe((email: string) => {
      if (email) {
        this.authService.forgotPassword(email).then(
          (res) => {
            this.snackBar.open("Recovery email was sent to " + email, "close", {
              duration: 4000,
            });
          },
          (err) => {
            this.snackBar.open("user not found", "close", { duration: 4000 });
          }
        );
      }
    });
  }

  public toggleLogin(): void {
    this.canLogin = !this.canLogin;
  }
}
