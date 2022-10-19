import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Pokemon } from "../../models/pokemon"; // type Pokemon
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: "app-edit-pokemon",
  templateUrl: "./edit-pokemon.component.html",
})
export class EditPokemonComponent implements OnInit {
  pokemon!: Pokemon | undefined;
  constructor(
    private _route: ActivatedRoute,
    private _pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    const pokemonId: string | null = this._route.snapshot.paramMap.get("id");
    if (pokemonId) {
      this._pokemonService
        .getPokemonById(+pokemonId)
        .subscribe((data) => (this.pokemon = data));
    } else {
      this.pokemon = undefined;
    }
  }
}
