import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageViewComponent }      from './components/pageview/pageview.component';
import { DetailComponent } from './components/detail/detail.component';
import { DashboardComponent }     from './components/dashboard/dashboard.component';
import { TestComponent } from './components/test/test.component';
import {DeepDivePage} from './webpages/deep-dive-page/deep-dive.page';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/homepage',
    pathMatch: 'full'

  },
  {
    path: 'players',
    component: PageViewComponent
  },
  {
    path: 'homepage',
    component: DeepDivePage
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  },
  {
    path: 'test',
    component: TestComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
