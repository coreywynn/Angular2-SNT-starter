import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
declare var jQuery:any;

@Component({
    selector: 'article-sub-component',
    templateUrl: './app/fe-core/components/articles/sub-article/sub-article.component.html',
    styleUrls: ['./app/global/stylesheets/master.css'],
    directives: [ROUTER_DIRECTIVES],
    inputs: ['randomArticles', 'league', 'teamID'],
})

export class ArticleSubComponent {
}
