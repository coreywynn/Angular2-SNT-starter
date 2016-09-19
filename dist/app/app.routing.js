"use strict";
var router_1 = require('@angular/router');
var pageview_component_1 = require('./components/pageview/pageview.component');
var detail_component_1 = require('./components/detail/detail.component');
var dashboard_component_1 = require('./components/dashboard/dashboard.component');
var test_component_1 = require('./components/test/test.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'players',
        component: pageview_component_1.PageViewComponent
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'detail/:id',
        component: detail_component_1.DetailComponent
    },
    {
        path: 'test',
        component: test_component_1.TestComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
