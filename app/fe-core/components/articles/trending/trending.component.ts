import {Component, OnInit, Input} from '@angular/core';
import {Router,ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';
import {SanitizeHtml} from "../../../pipes/safe.pipe";
import {SidekickContainerComponent} from "../sidekick-container/sidekick-container.component";
import {ShareLinksComponent} from "../shareLinks/shareLinks.component";
import {HeadlineDataService} from "../../../../global/global-ai-headline-module-service";
import {GlobalFunctions} from "../../../../global/global-functions";
import {GlobalSettings} from "../../../../global/global-settings";
import {VerticalGlobalFunctions} from "../../../../global/vertical-global-functions";

declare var moment;
declare var jQuery:any;

@Component({
    selector: 'trending-component',
    templateUrl: './app/fe-core/components/articles/trending/trending.component.html',
    directives: [ShareLinksComponent, ROUTER_DIRECTIVES, SidekickContainerComponent],
    inputs: ['currentArticleId'],
    pipes: [SanitizeHtml],
})

export class TrendingComponent implements OnInit {
    @Input() currentArticleId:string;
    @Input() scope:string;
    isSmall:boolean = false;
    hasRun:boolean = false;
    throttle:any;
    isScroll:number = 0;
    public imageData:any;
    public trendingData:any;
    public trendingLength:number = 10;
    partnerID:string;

    constructor(private _router:Router,
                private _headlineDataService:HeadlineDataService) {
        GlobalSettings.getParentParams(_router, parentParams => {
            this.partnerID = parentParams.partnerID;
        });
    }

    private getTrendingArticles(count, currentArticleId) {
        this._headlineDataService.getAiHeadlineDataLeague(count, this.scope).subscribe(
            data => {
                if (!this.hasRun) {
                    this.hasRun = true;
                    this.trendingData = this.transformTrending(data['data'], currentArticleId);
                    if (this.trendingLength <= 100) {
                        this.trendingLength = this.trendingLength + 10;
                    }
                }
            }
        )
    }

    ngOnInit() {
        this.isSmall = window.innerWidth <= 639;
        this.getTrendingArticles(10, this.currentArticleId);
    }

    private onScroll(event) {
        this.hasRun = false;
        if (jQuery(document).height() - window.innerHeight - jQuery("footer").height() <= jQuery(window).scrollTop() && this.trendingLength <= 100) {
            this.getTrendingArticles(this.trendingLength, this.currentArticleId);
        }
    }

    onResize(event) {
        this.isSmall = event.target.innerWidth <= 639;
    }

    static convertToETMoment(easternDateString) {
        moment.tz.add('America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0');
        var date = moment(easternDateString).format('MMMM DD, YYYY');
        var time = moment(easternDateString).format('hh:mmA');
        return date + ' at ' + time;
    };

    transformTrending(data, currentArticleId) {
        var articles = [];
        data.forEach(function (val, index) {
            if (val.id != currentArticleId) {
                var date = TrendingComponent.convertToETMoment(val.last_updated);
                val["date"] = date + " EDT";
                articles[index] = {
                    title: val.title,
                    date: val["date"],
                    content: val.teaser,
                    eventId: val.event_id,
                    eventType: "pregame-report",
                    image: GlobalSettings.getImageUrl(val.image_url),
                    url: VerticalGlobalFunctions.formatArticleRoute("pregame-report", val.event_id),
                    rawUrl: window.location.protocol + "//" + window.location.host + "nfl/articles/pregame-report/" + val.event_id
                };
            }
        });
        return articles;
    }
}