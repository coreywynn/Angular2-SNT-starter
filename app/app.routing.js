"use strict";
var router_1 = require('@angular/router');
var pageview_component_1 = require('./components/pageview/pageview.component');
var detail_component_1 = require('./components/detail/detail.component');
var test_component_1 = require('./components/test/test.component');
var deep_dive_page_1 = require('./webpages/deep-dive-page/deep-dive.page');
var appRoutes = [
    {
        path: '',
        redirectTo: '/homepage',
        pathMatch: 'full'
    },
    {
        path: 'players',
        component: pageview_component_1.PageViewComponent
    },
    {
        path: 'homepage',
        component: deep_dive_page_1.DeepDivePage
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
//# sourceMappingURL=app.routing.js.map