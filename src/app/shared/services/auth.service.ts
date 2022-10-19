import { Observable, delay, of, tap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn: boolean = false;

  login(name: string, password: string): Observable<boolean> {
    const isLoggedIn = name == "demo" && password == "demo";
    return of(isLoggedIn).pipe(
      delay(1000), // simulation d'un délais
      tap((isLoggedIn) => (this.isLoggedIn = isLoggedIn))
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
