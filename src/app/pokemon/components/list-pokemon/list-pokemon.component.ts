import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Pokemon } from "../../models/pokemon"; // type Pokemon
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: "app-list-pokemon",
  templateUrl: "./list-pokemon.component.html",
})
export class ListPokemonComponent implements OnInit {
  pokemonList!: Pokemon[];

  constructor(
    private _router: Router,
    private _pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    // récupération de la liste des pokémons (abonnement au service)
    this._pokemonService
      .getPokemonList()
      .subscribe((data) => (this.pokemonList = data));
  }

  // navigation vers la page d'information d'un pokémon en fonction de son id
  goTo(pokemon: Pokemon): void {
    this._router.navigate(["/pokemon", pokemon.id]);
  }
}
