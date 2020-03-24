import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TMTPhoto } from "packages/objects";
import { Http, Response } from "@angular/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
const API_URL = environment.apiUrl;
const route = "/photos/";

@Injectable({
  providedIn: "root"
})
export class PhotoService {
  constructor(private http: Http) {}

  public getPhotos(): Observable<TMTPhoto[]> {
    return this.http.get(API_URL + route).pipe(
      map((response: Response) => {
        const todos: any = response.json();

        return todos;
      })
    );
  }

  public getPocketStyles(): Observable<string[]> {
    return this.http.get(API_URL + "/pocketStyles/").pipe(
      map((response: Response) => {
        const todos: any = response.json();

        return todos;
      })
    );
  }

  public addPhoto(newPhoto: TMTPhoto): Observable<TMTPhoto> {
    return this.http.post(API_URL + route, newPhoto).pipe(
      map((response: Response) => {
        const todos: any = response.json();

        return todos;
      })
    );
  }

  public savePhoto(newPhoto: TMTPhoto): Observable<TMTPhoto> {
    return this.http.put(API_URL + route, newPhoto).pipe(
      map((response: Response) => {
        const todos: any = response.json();

        return todos;
      })
    );
  }

  public removePhoto(photo: TMTPhoto): Observable<TMTPhoto> {
    return this.http.post(API_URL + route, photo).pipe(
      map((response: Response) => {
        const todos: any = response.json();

        return todos;
      })
    );
  }
}
