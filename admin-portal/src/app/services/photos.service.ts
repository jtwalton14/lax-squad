import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PhotosService {
  constructor() {}

  public getPhotos(): Observable<void> {
    return of(void);
  }

  public savePhoto(newPhoto: any): Observable<void> {
     return of(void);
  }

  public removePhoto(photoKey: string): Observable<void> {
    return of(void);
  }
}
