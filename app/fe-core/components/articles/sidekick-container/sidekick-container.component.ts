import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'sidekick-container-component',
    templateUrl: './app/fe-core/components/articles/sidekick-container/sidekick-container.component.html',
    inputs: ['trending']
})

export class SidekickContainerComponent implements OnInit{
    isSmall:boolean = false;
    @Input() scope: string;
    isProSport = true;

    onResize(event) {
      this.isSmall = event.target.innerWidth < 640;
    }
    ngOnInit() {
      this.isProSport = this.scope == 'nfl' ? true : false;
      this.isSmall = window.innerWidth < 640;
    }
}
