import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { AuthGuard } from './guards/auth.guard';
import { PokemonNewComponent } from './components/pokemon-new/pokemon-new.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"principal", component:PrincipalComponent, canActivate: [AuthGuard]},
  {path:"new", component:PokemonNewComponent, canActivate: [AuthGuard]},
  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path:"**", redirectTo:"/login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
