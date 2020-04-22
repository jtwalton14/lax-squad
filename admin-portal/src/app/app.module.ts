import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PhotoListComponent } from "./photo-list/photo-list.component";
import { ColorListComponent } from "./color-list/color-list.component";
import { HttpClientModule } from "@angular/common/http";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { AppRoutingModule } from "./app-routing.module";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FileUploadModule } from "ng2-file-upload";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import * as firebase from "firebase";

import { HttpModule } from "@angular/http";
import { AddColorDialogComponent } from "./color-list/add-color-dialog/add-color-dialog/add-color-dialog.component";
import { AddPhotoDialogComponent } from "./photo-list/add-photo-dialog/add-photo-dialog/add-photo-dialog.component";
import { PocketTypeListComponent } from "./pocket-type-list/pocket-type-list/pocket-type-list.component";
import { AddPocketTypeDialogComponent } from "./pocket-type-list/pocket-type-list/add-pocket-type-dialog/add-pocket-type-dialog.component";
import { ConfirmDeleteDialogComponent } from "./confirm-delete-dialog/confirm-delete-dialog.component";
import { environment } from "src/environments/environment";
import { ShowPictureDialogComponent } from "./show-picture-dialog/show-picture-dialog.component";

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    PhotoListComponent,
    ColorListComponent,
    SideBarComponent,
    AddColorDialogComponent,
    AddPhotoDialogComponent,
    PocketTypeListComponent,
    AddPocketTypeDialogComponent,
    ConfirmDeleteDialogComponent,
    ShowPictureDialogComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatListModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    HttpModule,
    MatChipsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FileUploadModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent, SideBarComponent]
})
export class AppModule {}
