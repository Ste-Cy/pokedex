import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from "rxjs";
import { Pokemon } from "../../models/pokemon";
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: "app-search-pokemon",
  templateUrl: "./search-pokemon.component.html",
})
export class SearchPokemonComponent implements OnInit {
  searchTerms$ = new Subject<string>(); // flux de recherche dans le temps
  pokemons$!: Observable<Pokemon[]>; // permet de construire le flux de résultat

  constructor(
    private _router: Router,
    private _pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms$.pipe(
      debounceTime(300), // delais 300ms
      distinctUntilChanged(), // prendre en compte que les changements
      switchMap((term) => this._pokemonService.searchPokemonList(term))
    );
  }

  // rechercher un pokemon
  search(term: string): void {
    this.searchTerms$.next(term);
  }

  // aller sur la page du pokemon
  goTo(pokemon: Pokemon): void {
    const url = ["/pokemon", pokemon.id];
    this._router.navigate(url);
  }
}
