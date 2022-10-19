import { POKEMONS } from "../../pokemon/datas/pokemon-list";
import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
  providedIn: "root",
})
export class InMemoryDataService implements InMemoryDbService {
  // méthode qui va permettre de simuler une base de données
  createDb(): any {
    const pokemons = POKEMONS;
    return { pokemons };
  }
}
