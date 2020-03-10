import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { TMTPhoto } from "packages/objects";

@Injectable({
  providedIn: "root"
})
export class PhotosService {
  constructor() {}

  // public getPhotos(): Observable<TMTPhoto[]> {
  //   return of(void);
  // }

  // public savePhoto(newPhoto: any): Observable<TMTPhoto> {
  //    return of(void);
  // }

  // public removePhoto(photoKey: string): Observable<TMTPhoto> {
  //   return of(void);
  // }
}
