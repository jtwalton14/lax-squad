import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Http, Response } from "@angular/http";
import { Observable, from, of } from "rxjs";
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
    return this.formatNames(pocket, "out").pipe(
      mergeMap((t: TMTPocket) => this.http.put(API_URL + route + t.id, t)),
      map((response: Response) => {
        const todos: any = response.json();

        return todos;
      })
    );
    // .toPromise()
    // .catch
  }

  public saveNewPocket(pocket: TMTPocket): Observable<TMTPocket> {
    return this.formatNames(pocket, "out").pipe(
      mergeMap((t: TMTPocket) => this.http.post(API_URL + route, pocket)),
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

  public formatNames(
    newType: TMTPocket,
    stream: string
  ): Observable<TMTPocket> {
    console.log(newType);
    return from(newType.name).pipe(
      mergeMap((letter: string) => {
        if (letter === "_") {
          return " ";
        } else {
          return letter;
        }
      }),
      toArray(),
      map((changedString: string[]) => changedString.join(""))
    );
  }
  //   map((letter: string) => {
  //     console.log(letter);

  //     return newType;
  //     // if (stream === "in") {
  //     //   letter = letter.replace("_", "");
  //     //   return of(letter);
  //     // } else if (stream === "out") {
  //     //   letter = letter.replace(" ", "_");
  //     //   console.log(letter);
  //     //   return of(letter);
  //     // }
  //   })
  // );
}
