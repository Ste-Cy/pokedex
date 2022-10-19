// formulaire d'édition d'un pokémon

import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Pokemon } from "../../models/pokemon"; // type Pokemon
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: "app-pokemon-form",
  templateUrl: "./pokemon-form.component.html",
  styleUrls: ["./pokemon-form.component.css"],
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  types!: string[]; // liste des types de pokémon
  isAddForm!: boolean; // permet de tester si il s'agit d'un formulaire d'ajout ou d'édition

  constructor(
    private _pokemonService: PokemonService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // récupération de la liste des types de pokémon
    this.types = this._pokemonService.getPokemonTypeList();
    this.isAddForm = this._router.url.includes("add");
  }

  // vérifie le pokémon est cours d'édition possède le type passé en paramètre. (Permet de pré-cocher les types du pokemon)
  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }
  // Méthode appelée quand l'utilisateur sélectionne un type
  selectType($event: Event, type: string): void {
    // vérifie si la case est cochée
    const isChecked = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      // ajoute le type à la liste des types du pokémon
      this.pokemon.types.push(type);
    } else {
      // supprime le type de la liste des types du pokémon
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  // règle validation pour les types (1 à 3 types)
  isTypesValid(type: string): boolean {
    // si le pokemon a un seul type on desactive la checkbox qui correspond à ce type pour empêcher l'utilisateur de la décocher
    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }
    // si le pokemon a au moins 3 type de coché on désactive les autres checkbox pour empêcher l'utilisateur de cocher une 4ème.
    if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }
    return true;
  }

  onSubmit(): void {
    if (this.isAddForm) {
      // on ajoute un pokemon
      this._pokemonService
        .addPokemon(this.pokemon)
        .subscribe((pokemon: Pokemon) => {
          // on redirige vers la page du pokemon
          this._router.navigate(["pokemon", pokemon.id]);
        });
    } else {
      // on modifie un pokemon
      this._pokemonService.updatePokemon(this.pokemon).subscribe(() => {
        this._router.navigate(["pokemon", this.pokemon.id]);
      });
    }
  }
}
