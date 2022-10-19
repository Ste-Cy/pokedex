import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="center">
      <h1>Hey, cette page n'existe pas !</h1>
      <img
        src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png"
      />
      <!-- routerLink => directive qui permet de faire des redirections -->
      <p>
        <a routerLink="/pokemons" class="waves-effect waves-teal btn-flat">
          Retourner à l' accueil
        </a>
      </p>
    </div>
  `,
})
export class PageNotFoundComponent {}
