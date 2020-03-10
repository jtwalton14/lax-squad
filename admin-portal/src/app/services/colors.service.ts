import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { TMTColor, TMTPhoto } from "packages/objects";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { Http, Response } from "@angular/http";
import { State } from "packages/emuns/state";
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: "root"
})
export class ColorsService {
  constructor(private http: Http) {}

  public getColors(): Observable<TMTColor[]> {
    return this.http.get(API_URL + "/colors/").pipe(
      map((response: Response) => {
        const todos: TMTColor[] = response.json();

        return todos;
      })
    );
  }

  // public removeColor(colorString: string): Observable<TMTColor> {
  //   return of(void);
  // }

  public addColor(): Observable<TMTColor> {
    const newTodo: TMTColor = new TMTColor();
    newTodo.hexValue = 321;
    newTodo.name = "cda";
    newTodo.state = State.AVAILABLE;
    newTodo.hsvValue = "weouarn";

    return this.http.post(API_URL + "/colors", newTodo).pipe(
      map((response: Response) => {
        const todos: any = response.json();

        return todos;
      })
    );
  }

  private handleError(error: Response | any) {
    console.error("ApiService::handleError", error);
    return Observable.throw(error);
  }
}
