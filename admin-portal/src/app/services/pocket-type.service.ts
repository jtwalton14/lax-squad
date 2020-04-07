import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Http, Response } from "@angular/http";
import { Observable, from, of, pipe } from "rxjs";
import { map, mergeMap, toArray } from "rxjs/operators";
import { TMTPocket } from "packages/objects/pocketType";

const API_URL = environment.apiUrl;
const route = "/pocketType/";

@Injectable({
  providedIn: "root"
})
export class PocketTypeService {
  constructor(private http: Http) {}

  public getPocketTypes(): Observable<TMTPocket[]> {
    return this.http.get(API_URL + route).pipe(
      map((response: Response) => {
        const todos: TMTPocket[] = response.json();

        return todos;
      })
    );
  }

  public savePocket(pocket: TMTPocket): Observable<TMTPocket> {
    return this.http.put(API_URL + route + pocket.id, pocket).pipe(
      map((response: Response) => {
        const todos: any = response.json();

        return todos;
      })
    );
    // .toPromise()
    // .catch
  }

  public saveNewPocket(pocket: TMTPocket): Observable<TMTPocket> {
    pocket.name = pocket.name.toLocaleUpperCase();

    return this.http.post(API_URL + route, pocket).pipe(
      map((response: Response) => {
        const todos: any = response.json();

        return todos;
      })
    );
  }

  public removePocketType(type: string): Observable<TMTPocket> {
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

  public formatName(name: string, stream: string): string {
    const searchString = stream === "remove" ? "_" : " ";
    const replaceString = stream === "remove" ? " " : "_";

    return name.replace(new RegExp(searchString, "g"), replaceString);
  }
}
