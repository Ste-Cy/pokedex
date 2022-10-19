import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  constructor(private _router: Router) {}
  goHome(): void {
    // retour vers la page principal
    this._router.navigate(["/pokemons"]);
  }
}
