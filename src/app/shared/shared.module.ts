import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { HttpClientModule } from "@angular/common/http";
import { InMemoryDataService } from "./services/in-memory-data.service";
import { AuthService } from "./services/auth.service";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const sharedRoutes: Routes = [
  // route par défaut => redirection vers la page de login
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  // toutes autres routes non définies => redirection vers une page erreur 404
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  declarations: [LoginComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    // ajputer les routes du module au routing
    RouterModule.forChild(sharedRoutes),
  ],
  providers: [AuthService, InMemoryDataService],
})
export class SharedModule {}
