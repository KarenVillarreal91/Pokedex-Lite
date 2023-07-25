import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss']
})
export class PokemonInfoComponent implements OnInit {

  @Input() inputPokemon:any;
  @Output() pokemonEmitter:EventEmitter<any> = new EventEmitter();

  evolution:any;
  editedName:string = '';
  editor:boolean = false;

  constructor(private userService:UserService) { 

    setTimeout(() => {
      
      this.editedName = this.inputPokemon.name;
    }, 500);
  }

  ngOnInit(): void {
  }

  back(){
    this.pokemonEmitter.emit('');
  }
}
