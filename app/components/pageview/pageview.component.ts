import { Component, OnInit, Input } from '@angular/core';
import { SampleService, Hero } from '../../services/sample.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: './app/components/pageview/pageview.component.html',
})
export class PageViewComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private SampleService: SampleService,
    private router: Router
  ) {}

  getHeroes(): void {
    this.SampleService.getHeroes().then(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
