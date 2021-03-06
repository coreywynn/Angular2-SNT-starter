//Created by Victoria on 2/19/2016.
import {Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'carousel-button',
    templateUrl: './app/fe-core/components/buttons/carousel/carousel.button.html',
    
    outputs: ['scrollRight', 'scrollLeft']
})
export class CarouselButton{
    public scrollRight = new EventEmitter();
    public scrollLeft = new EventEmitter();

    left(){
        this.scrollLeft.next(true);
    }
    right(){
        this.scrollRight.next(true);
    }
}
