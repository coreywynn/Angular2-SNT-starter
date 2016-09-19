import {Component, Input, OnInit} from '@angular/core';
import {CircleImage} from '../images/circle-image';
import {CircleImageData} from '../images/image-data';
import {StatHyphenValuePipe} from '../../pipes/stat-hyphen.pipe';
import {ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

export interface GameInfoInput{
  gameHappened: boolean,
  inning:string;
  dataPointCategories:Array<string>;
  verticalContent:string;
  homeData:{
    homeTeamName:string;
    homeImageConfig:CircleImageData;
    homeLink:any;
    homeRecord:string;
    DP1:any;
    DP2:any;
    DP3:any;
  };
  awayData:{
    awayTeamName:string;
    awayImageConfig:CircleImageData;
    awayLink:any,
    awayRecord:string;
    DP1:any;
    DP2:any;
    DP3:any;
  };
}

@Component({
    selector: 'game-info',
    templateUrl: './app/fe-core/components/game-info/game-info.component.html',
    directives: [ROUTER_DIRECTIVES, CircleImage],
    pipes: [StatHyphenValuePipe],
})

export class GameInfo implements OnInit{
    @Input() gameInfo:GameInfoInput;
    homeInfo:Object;
    awayInfo:Object;
    constructor() {
    }

    ngOnInit(){
      this.homeInfo = this.gameInfo.homeData;
      this.awayInfo = this.gameInfo.awayData;
    }
    ngOnChanges(){
      if(this.gameInfo != null){
        this.homeInfo = this.gameInfo.homeData;
        this.awayInfo = this.gameInfo.awayData;
      }
    }
}
