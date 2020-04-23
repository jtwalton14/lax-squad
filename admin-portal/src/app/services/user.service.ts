import { Injectable } from "@angular/core";
import { TmTUser } from "packages/objects";
import { Observable } from "rxjs";
import { Http } from "@angular/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

const API_URL = environment.apiUrl;
const route = "/user/";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: Http) {}

  // public saveNewPocket(newUser: TmTUser): Observable<TmTUser> {
  //   return this.http.post(API_URL + route, newUser).pipe(map((response: Response) => {

  //   }));

  //     map((response: Response) => {
  //       const todos: any = response.json();

  //       return todos;
  //     })
  //   );
  // }
}
