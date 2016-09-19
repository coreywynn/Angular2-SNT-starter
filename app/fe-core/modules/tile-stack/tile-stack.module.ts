import {Component,OnInit,Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {SanitizeHtml} from "../../pipes/safe.pipe";

@Component({
  selector: 'tile-stack-module',
  templateUrl: './app/fe-core/modules/tile-stack/tile-stack.module.html',
  directives: [ROUTER_DIRECTIVES],
  pipes: [SanitizeHtml]
})

export class TileStackModule{
  @Input() tilestackData: any;
  ngOnInit() {}
}
