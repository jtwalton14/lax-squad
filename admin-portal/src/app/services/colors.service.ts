import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { TMTColor, TmTUser } from "packages/objects";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Http, Response } from "@angular/http";
const API_URL = environment.apiUrl;
const route = "/colors/";

@Injectable({
  providedIn: "root"
})
export class ColorsService {
  constructor(private http: Http) {}

  public getColors(): Observable<TMTColor[]> {
    return this.http.get(API_URL + route).pipe(
      map((response: Response) => {
        const todos: TMTColor[] = response.json();

        return todos;
      })
    );
  }

  public addColor(newColor: TMTColor): Observable<TMTColor> {
    return this.http.post(API_URL + route, newColor).pipe(
      map((response: Response) => {
        const todos: any = response.json();

        return todos;
      })
    );
    // .toPromise(Obsservable<TMTColor>)
    // .catch(this.handleError);
  }

  public putColor(newColor: TMTColor): Observable<TMTColor> {
    return this.http.put(API_URL + route + newColor.id, newColor).pipe(
      map((response: Response) => {
        const todos: any = response.json();

        return todos;
      })
    );
    // .toPromise()
    // .catch(this.handleError);
  }

  public removeColor(colorKey: string): Observable<TMTColor> {
    return this.http.delete(API_URL + route + colorKey).pipe(
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
