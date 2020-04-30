import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  public canActivate(): boolean {
    // navigate to the login page
    this.router
      .navigate(["/login"])
      .then(() => null)
      // tslint:disable-next-line:no-console
      .catch((reason: any) => console.error(reason));

    return false;
  }
}
