import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-new',
  templateUrl: './pokemon-new.component.html',
  styleUrls: ['./pokemon-new.component.scss']
})
export class PokemonNewComponent implements OnInit {

  id:number = 0;
  error:string = '';
  success:string = '';

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  add(){
    if(this.id > 0 && this.id < 1000)
    {
      let types:Array<string>;
      let abilities:Array<string>;
      let evolutions:any;
    
      fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
      .then(res => res.json())
      .then(jsonPokemon => {
        types = [];
        abilities = [];
        
        for(let item of jsonPokemon.types)
        {
          types.push(item.type.name);
        }

        for(let item of jsonPokemon.abilities)
        {
          abilities.push(item.ability.name);
        }
        
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.id+1}`)
        .then(res => res.json())
        .then(jsonEvolution => {

          types = [];

          for(let item of jsonEvolution.types)
          {
            types.push(item.type.name);
          }

          evolutions = {lvl:jsonEvolution.base_experience, name:jsonEvolution.name, type: types};

          this.userService.uploadCollection('pokemon', {abilities:abilities, evolution:evolutions, image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id}.png`, 
          id:this.id, lvl:jsonPokemon.base_experience, name:jsonPokemon.name, type: types, uid: this.userService.userLogged.id}).then(()=>{

            this.error = '';
            this.success = 'Pokemon added successfully!';
          });
        });
        
      });
      
    }
    else
    {
      this.success = '';
      this.error = 'Invalid ID';
    }
  }
}
