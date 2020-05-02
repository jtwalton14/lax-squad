import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PhotoListComponent } from "./photo-list/photo-list.component";
import { ColorListComponent } from "./color-list/color-list.component";
import { PocketTypeListComponent } from "./pocket-type-list/pocket-type-list/pocket-type-list.component";
import { LoginPageComponent } from "./login-page/login-page.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "photo-list", component: PhotoListComponent },
  { path: "color-list", component: ColorListComponent },
  { path: "pocket-type-list", component: PocketTypeListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
