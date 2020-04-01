import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PocketType } from "packages/objects";

const API_URL = environment.apiUrl;
const route = "/pocketType/";

@Injectable({
  providedIn: "root"
})
export class PocketTypeService {
  constructor(private http: Http) {}

  public getPocketTypes(): Observable<PocketType[]> {
    return this.http.get(API_URL + route).pipe(
      map((response: Response) => {
        const todos: PocketType[] = response.json();

        return todos;
      })
    );
  }

  public savePocketTypes(pocketList: string[]): Observable<PocketType[]> {
    return this.http.put(API_URL + route, pocketList).pipe(
      map((response: Response) => {
        const todos: any = response.json();

        return todos;
      })
    );
    // .toPromise()
    // .catch
  }

  public removePocketType(type: string): Observable<PocketType> {
    return this.http.delete(API_URL + route + type).pipe(
      map((response: Response) => {
        const todos: any = response.json();

        return todos;
      })
    );
    // .toPromise()
    // .catch
  }

  private handleError(error: Response | any) {
    console.error("ApiService::handleError", error);
    return Observable.throw(error);
  }
}
