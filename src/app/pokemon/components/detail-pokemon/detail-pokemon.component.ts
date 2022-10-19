import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Pokemon } from "src/app/pokemon/models/pokemon"; // type Pokemon
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: "app-detail-pokemon",
  templateUrl: "./detail-pokemon.component.html",
})
export class DetailPokemonComponent implements OnInit {
  pokemonList!: Pokemon[];
  pokemon!: Pokemon | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    // récupération de l'identifiant passé en paramère de l'URL
    const pokemonId: string | null = this._route.snapshot.paramMap.get("id");
    // récupération de l'id du pokémon associé si il existe
    if (pokemonId) {
      this._pokemonService
        .getPokemonById(+pokemonId)
        .subscribe((data) => (this.pokemon = data));
    }
  }
  goBack(): void {
    // retour vers la page principal
    this._router.navigate(["/pokemons"]);
  }

  goToEdit(pokemon: Pokemon): void {
    this._router.navigate(["/edit/pokemon", pokemon.id]);
  }

  deletePokemon(pokemon: Pokemon): void {
    this._pokemonService
      .deletePokemonById(pokemon.id)
      .subscribe(() => this.goBack());
  }
}
