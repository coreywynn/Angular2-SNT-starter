import {Component, Input, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ImageData} from '../../components/images/image-data';
import {DomSanitizationService} from '@angular/platform-browser';
import {VerticalGlobalFunctions} from '../../../global/vertical-global-functions';

@Component({
    selector: 'hover-image',
    templateUrl: './app/fe-core/components/images/hover-image.html',
    directives: [ROUTER_DIRECTIVES]
})
export class HoverImage {
    @Input() imageData: any;

    @Input() textOnly: boolean;

    imageUrl;
    errorIMG:any;
    public noImageUrl: string = VerticalGlobalFunctions.getBackroundImageUrlWithStockFallback(null);

    constructor(private _sanitizer: DomSanitizationService) {

      this.errorIMG = VerticalGlobalFunctions.getBackroundImageUrlWithStockFallback(null);
    }
    onError(event){
      event.src = this.errorIMG;
    }
    ngOnChanges() {
        if ( this.imageData && this.imageData.imageUrl ) {
            this.imageUrl = this._sanitizer.bypassSecurityTrustUrl(this.imageData.imageUrl);
        }
    }
}
