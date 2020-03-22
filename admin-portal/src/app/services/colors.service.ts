import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { TMTColor } from "packages/objects";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Http, Response } from "@angular/http";
import { State } from "packages/emuns/state";
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

  public addColor(): Observable<TMTColor> {
    const newTodo: TMTColor = new TMTColor();
    newTodo.hexValue = 32;
    newTodo.name = "3sd";
    newTodo.state = State.AVAILABLE;
    newTodo.hsvValue = "weouarn";

    return this.http.post(API_URL + route, newTodo).pipe(
      map((response: Response) => {
        const todos: any = response.json();

        return todos;
      })
    );
    // .toPromise()
    // .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error("ApiService::handleError", error);
    return Observable.throw(error);
  }
}
