import { catchError, Observable, tap, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon"; // type Pokemon

@Injectable()
export class PokemonService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private _http: HttpClient) {}

  // obtenir la liste des pokémons
  getPokemonList(): Observable<Pokemon[]> {
    // requête get qui retourne un tableau de pokemon
    return this._http
      .get<Pokemon[]>("api/pokemons")
      .pipe(catchError((error) => this._handleError(error, "[]")));
  }

  // retourne un pokemon en fonction de son id
  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this._http
      .get<Pokemon>(`api/pokemons/${pokemonId}`)
      .pipe(catchError((error) => this._handleError(error, undefined)));
  }

  // mise à jour d'un pokemon
  updatePokemon(pokemon: Pokemon): Observable<null> {
    return this._http
      .put<Pokemon>("api/pokemons", pokemon, this.httpOptions)
      .pipe(catchError((error) => this._handleError(error, null)));
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this._http
      .post<Pokemon>("api/pokemons", pokemon, this.httpOptions)
      .pipe(catchError((error) => this._handleError(error, null)));
  }

  deletePokemonById(pokemonId: number): Observable<null> {
    return this._http
      .delete<Pokemon>(`api/pokemons/${pokemonId}`)
      .pipe(catchError((error) => this._handleError(error, null)));
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    if (term.length < 2) {
      // on retourne un tableau vide si la recherche fait moins de deux caractères
      return of([]);
    } else {
      // on effectue une requete sur la propriété name
      return this._http
        .get<Pokemon[]>(`api/pokemons/?name=${term}`)
        .pipe(catchError((error) => this._handleError(error, [])));
    }
  }

  private _handleError(error: Error, errorValue: any) {
    console.log(error);
    return of(errorValue);
  }

  // retourne une tableau contant les types de pokémon
  getPokemonTypeList(): string[] {
    return [
      "Plante",
      "Poison",
      "Feu",
      "Eau",
      "Insecte",
      "Normal",
      "Vol",
      "Electrik",
      "Fée",
      "Combat",
      "psy",
    ];
  }
}
