import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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

import { HttpModule } from "@angular/http";
import { AddColorDialogComponent } from "./color-list/add-color-dialog/add-color-dialog/add-color-dialog.component";
import { AddPhotoDialogComponent } from "./photo-list/add-photo-dialog/add-photo-dialog/add-photo-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    PhotoListComponent,
    ColorListComponent,
    SideBarComponent,
    AddColorDialogComponent,
    AddPhotoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent, SideBarComponent]
})
export class AppModule {}
