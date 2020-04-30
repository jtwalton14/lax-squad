import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-recovery-email-dialog",
  templateUrl: "./recovery-email-dialog.component.html",
  styleUrls: ["./recovery-email-dialog.component.css"],
})
export class RecoveryEmailDialogComponent implements OnInit {
  public email = "";
  constructor() {}

  ngOnInit(): void {}
}
