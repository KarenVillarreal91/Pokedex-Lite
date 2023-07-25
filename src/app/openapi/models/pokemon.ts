/* tslint:disable */
/* eslint-disable */
import { PokemonAbilities } from './pokemon-abilities';
export interface Pokemon {
  abilities?: Array<PokemonAbilities>;
  evolutionId?: null | number;
  id?: null | number;
  image?: string;
  lvl?: number;
  name?: string;
  type?: Array<string>;
}
