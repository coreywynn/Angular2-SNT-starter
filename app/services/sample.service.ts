import { Injectable } from '@angular/core';

export interface Hero {
  id: number;
  name: string;
}

@Injectable()
export class SampleService {

  HEROES: Hero[] = [
    {id: 11, name: 'Awesome Sports Guy'}
  ];


  getHeroes(id?: number): Promise<Hero[]> {
    return Promise.resolve(this.HEROES);
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }
}
