import {Component, OnInit} from '@angular/core';
import {CircleImage} from "../../images/circle-image";

@Component({
    selector: 'profileData-component',
    templateUrl: './app/fe-core/components/articles/profileData/profileData.component.html',
    directives: [CircleImage],
    inputs: ['articleData', 'articleType', 'articleSubType', 'index', 'imageLinks'],
})

export class ProfileDataComponent {
}