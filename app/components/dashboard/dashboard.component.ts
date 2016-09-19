import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SampleService, Hero } from '../../services/sample.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './app/components/dashboard/dashboard.component.html',
})

export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    private router: Router,
    private SampleService: SampleService) {

  }

  ngOnInit(): void {
    this.SampleService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }

}
