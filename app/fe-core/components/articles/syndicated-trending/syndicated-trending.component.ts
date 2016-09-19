import {Component, Input} from '@angular/core';
import {Router,ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';
import {ShareLinksComponent} from "../shareLinks/shareLinks.component";
import {SanitizeHtml} from "../../../pipes/safe.pipe";
import {ResponsiveWidget} from '../../../components/responsive-widget/responsive-widget.component';
import {DeepDiveService} from '../../../../services/deep-dive.service';
import {ShareButtonComponent} from "../../share-button/share-button.component";

declare var moment;
declare var jQuery: any;

@Component({
    selector: 'syndicated-trending-component',
    templateUrl: './app/fe-core/components/articles/syndicated-trending/syndicated-trending.component.html',
    directives: [ShareLinksComponent, ROUTER_DIRECTIVES, ResponsiveWidget,ShareButtonComponent],
    inputs: ['trendingData', 'trendingImages'],
    pipes: [SanitizeHtml],
    providers: [DeepDiveService]
})

export class SyndicatedTrendingComponent {
    trending:boolean = true;
    public widgetPlace: string = "widgetForPage";
    public imageData: any;
    public articleData: any;
    public trendingLength: number = 2;
    @Input() geoLocation: string;
    @Input() currentArticleId: any;
    @Input() scope;
    

    constructor(
        private _router:Router,
        private _deepdiveservice:DeepDiveService
    ){}

    private getDeepDiveArticle(scope, numItems, state, currentArticleId) {
        var startNum=Math.floor((Math.random() * 29) + 1);

        this._deepdiveservice.getDeepDiveBatchService(scope, numItems, startNum, state).subscribe(
            data => {
                this.articleData = this._deepdiveservice.transformTrending(data.data, currentArticleId);

                if (this.trendingLength <= 20) {

                    this.trendingLength = this.trendingLength + 10;
                }
            }

        )

    }

    ngOnInit(){

        this.getDeepDiveArticle(this.scope, 10 , this.geoLocation, this.currentArticleId);
    }
    private onScroll(event) {
        if (jQuery(document).height() - window.innerHeight - jQuery("footer").height() <= jQuery(window).scrollTop() && this.trendingLength <= 20) {
            jQuery('#loadingArticles').show();
            this.getDeepDiveArticle(this.scope, this.trendingLength, this.geoLocation, this.currentArticleId);
            jQuery('#loadingArticles').hide();
        }
    }
    formatDate(date) {
        //moment(date, "YYYY-MM-Do").format("MM DD, YYYY at HH:MM A");
        return moment(date).format("MMMM DD, YYYY | h:mm A")

    }
}
