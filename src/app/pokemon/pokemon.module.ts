// Gestion des pokémons
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListPokemonComponent } from "./components/list-pokemon/list-pokemon.component";
import { DetailPokemonComponent } from "./components/detail-pokemon/detail-pokemon.component";
import { PokemonFormComponent } from "./components/pokemon-form/pokemon-form.component";
import { BorderCardDirective } from "./directives/border-card.directive";
import { PokemonTypeColorPipe } from "./pipes/pokemon-type-color.pipe";
import { PokemonService } from "./services/pokemon.service";
import { EditPokemonComponent } from "./components/edit-pokemon/edit-pokemon.component";
import { AddPokemonComponent } from "./components/add-pokemon/add-pokemon.component";
import { SearchPokemonComponent } from "./components/search-pokemon/search-pokemon.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { AuthGuard } from "../shared/guards/auth.guard";

const pokemonRoutes: Routes = [
  {
    path: "edit/pokemon/:id",
    component: EditPokemonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pokemon/add",
    component: AddPokemonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pokemons",
    component: ListPokemonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pokemon/:id",
    component: DetailPokemonComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    DetailPokemonComponent,
    ListPokemonComponent,
    PokemonFormComponent,
    BorderCardDirective,
    PokemonTypeColorPipe,
    EditPokemonComponent,
    AddPokemonComponent,
    SearchPokemonComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // ajputer les routes du module au routing
    RouterModule.forChild(pokemonRoutes),
  ],
  providers: [PokemonService],
})
export class PokemonModule {}
