import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit {
  message: string = "VOus êtes déconnecté. (demo/demo)";
  name!: string;
  password!: string;
  auth!: AuthService;

  constructor(private _authService: AuthService, private _router: Router) {}
  ngOnInit(): void {
    this.auth = this._authService; // pour avoir accès à AuthService dans le template
  }

  // mis à jour du message
  setMessage(): void {
    if (this._authService.isLoggedIn) {
      this.message = "Vous êtes connecté";
    } else {
      this.message = "identifiant ou mot de passe incorrect";
    }
  }

  login(): void {
    this.message = "Connexion en cours...";
    // on envoie les codes saisies par l'utilisateur à AuthService
    this._authService
      .login(this.name, this.password)
      .subscribe((isLoggedIn: Boolean) => {
        this.setMessage();
        // si authentification réussi
        if (isLoggedIn) {
          this._router.navigate(["/pokemons"]);
        } else {
          this._router.navigate(["/login"]);
        }
      });
  }

  logout(): void {
    this._authService.logout();
    this.message = "vous ̂êtes déconnecté";
  }
}
