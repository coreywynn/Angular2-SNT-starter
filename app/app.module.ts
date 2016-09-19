import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './components/app/app.component';
import { DetailComponent } from './components/detail/detail.component';
import { PageViewComponent }     from './components/pageview/pageview.component';
import { DashboardComponent }     from './components/dashboard/dashboard.component';
import { TestComponent } from './components/test/test.component';
import { SampleService, Hero }         from './services/sample.service';
//;import {DeepDivePage} from './webpages/deep-dive-page/deep-dive.page';
import {DeepDiveModule} from './webpages/deep-dive-page/deep-dive-page.module';
import {GlobalSettings} from "../../global/global-settings";
import {GlobalFunctions} from "../../global/global-functions";

import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    DeepDiveModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailComponent,
    PageViewComponent,
    TestComponent
  ],
  providers: [
    SampleService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
