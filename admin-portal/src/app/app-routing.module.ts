import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PhotoListComponent } from "./photo-list/photo-list.component";
import { ColorListComponent } from "./color-list/color-list.component";

const routes: Routes = [
  { path: "", component: PhotoListComponent },
  { path: "photo-list", component: PhotoListComponent },
  { path: "color-list", component: ColorListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
