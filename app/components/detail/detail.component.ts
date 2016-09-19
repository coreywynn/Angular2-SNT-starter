import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TestDetailComponent } from '../test-detail/test-detail.component';
import { SampleService, Hero } from '../../services/sample.service';

@Component({
  selector: 'my-detail',
  templateUrl: `./app/components/detail/detail.component.html`
})
export class DetailComponent implements OnInit {
  constructor(
    private SampleService: SampleService,
    private route: ActivatedRoute
  ) {}

  @Input()
  hero: Hero;

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.SampleService.getHero(id)
        .then(hero => this.hero = hero);
    });
  }

  goBack(): void {
    window.history.back();
  }
}
