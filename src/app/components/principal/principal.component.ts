import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  
  @Output() pokemonEmitter:EventEmitter<any> = new EventEmitter();

  pokemonId:Array<number> = [];
  pokemon:any = [];
  selectedPokemon:any;

  constructor(private userService:UserService, private router:Router) 
  {
    for(let poke of this.userService.allPokemon)
    {
      if(poke.uid == this.userService.userLogged.id)
      {
        this.pokemon.push(poke);
      }
    }
  }

  ngOnInit(): void {
  }

  select(item:any)
  {
    if(item != '')
    {
      this.selectedPokemon = item;
    }
    else
    {
      this.selectedPokemon = undefined;
    }
  }

  logOut(){
    this.userService.logOut()
    .then(()=>{
      this.router.navigateByUrl('login');
    });
  }
}
